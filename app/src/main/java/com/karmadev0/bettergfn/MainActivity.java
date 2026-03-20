package com.karmadev0.bettergfn;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;

    private static final String GFN_URL          = "https://play.geforcenow.com";
    private static final String BGFN_VERSION      = "1.1.0";
    private static final String BGFN_API_URL      = "https://api.github.com/repos/karmadev0/better-geforce-now/releases/latest";
    private static final String BGFN_SCRIPT_URL   = "https://github.com/karmadev0/better-geforce-now/releases/latest/download/better-gfn.user.js";
    private static final String PREFS_NAME        = "bgfn";
    private static final String KEY_CACHED_SCRIPT = "cached_script";
    private static final String KEY_CACHED_VER    = "cached_version";

    private static final int REQUEST_RECORD_AUDIO = 1001;

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        // Mantener pantalla encendida durante el stream
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        setContentView(R.layout.activity_main);

        webView     = findViewById(R.id.webview);
        progressBar = findViewById(R.id.progress);

        requestMicPermissionIfNeeded();

        setupWebView();
        webView.loadUrl(GFN_URL);

        // Revisar updates en background después de 8s
        mainHandler.postDelayed(this::checkForUpdates, 8000);
    }

    // ── Permiso de micrófono en runtime ──────────────────────────────────────
    private void requestMicPermissionIfNeeded() {
        if (checkSelfPermission(android.Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(
                new String[]{
                    android.Manifest.permission.RECORD_AUDIO,
                    android.Manifest.permission.CAMERA
                },
                REQUEST_RECORD_AUDIO
            );
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions,
                                           int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        // onPermissionRequest del WebChromeClient ya concede los recursos del WebView.
        // Solo necesitábamos el grant del sistema para desbloquear RECORD_AUDIO.
    }

    // ── Setup WebView ─────────────────────────────────────────────────────────
    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        settings.setUserAgentString(
            "Mozilla/5.0 (Linux; Android 13; Pixel 7) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Mobile Safari/537.36"
        );

        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setBackgroundColor(Color.BLACK);
        webView.addJavascriptInterface(new BgfnBridge(), "BgfnNative");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                progressBar.setVisibility(View.GONE);
                injectBgfnScript(view);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.contains("geforcenow.com") || url.contains("nvidia.com")) {
                    return false;
                }
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                return true;
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int progress) {
                if (progress < 100) {
                    progressBar.setVisibility(View.VISIBLE);
                    progressBar.setProgress(progress);
                } else {
                    progressBar.setVisibility(View.GONE);
                }
            }

            @Override
            public void onPermissionRequest(PermissionRequest request) {
                request.grant(request.getResources());
            }

            private View customView;

            @Override
            public void onShowCustomView(View view, CustomViewCallback callback) {
                customView = view;
                getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                );
                webView.setVisibility(View.GONE);
                getWindow().addContentView(view, new WindowManager.LayoutParams(
                    WindowManager.LayoutParams.MATCH_PARENT,
                    WindowManager.LayoutParams.MATCH_PARENT
                ));
            }

            @Override
            public void onHideCustomView() {
                if (customView != null) {
                    customView.setVisibility(View.GONE);
                    customView = null;
                }
                webView.setVisibility(View.VISIBLE);
                getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
            }
        });
    }

    // ── Inyección del script ──────────────────────────────────────────────────
    private void injectBgfnScript(WebView view) {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        String cachedScript  = prefs.getString(KEY_CACHED_SCRIPT, null);
        String cachedVersion = prefs.getString(KEY_CACHED_VER, "0.0.0");

        String scriptToInject;
        if (cachedScript != null && compareSemver(cachedVersion, BGFN_VERSION) > 0) {
            android.util.Log.d("BGFN", "Inyectando script cacheado v" + cachedVersion);
            scriptToInject = cachedScript;
        } else {
            android.util.Log.d("BGFN", "Inyectando script bundleado v" + BGFN_VERSION);
            scriptToInject = loadAssetScript("bgfn.js");
        }

        if (scriptToInject == null || scriptToInject.isEmpty()) return;
        view.evaluateJavascript(scriptToInject, null);
    }

    // ── Auto-updater ──────────────────────────────────────────────────────────
    private void checkForUpdates() {
        executor.execute(() -> {
            try {
                String latestVersion = fetchLatestVersion();
                if (latestVersion == null) return;

                SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
                String cachedVersion = prefs.getString(KEY_CACHED_VER, "0.0.0");

                // Versión que se está usando ahora mismo
                String currentVersion = compareSemver(cachedVersion, BGFN_VERSION) > 0
                    ? cachedVersion : BGFN_VERSION;

                android.util.Log.d("BGFN", "Versión actual: " + currentVersion + " | Última: " + latestVersion);

                if (compareSemver(latestVersion, currentVersion) > 0) {
                    android.util.Log.d("BGFN", "Update disponible: " + latestVersion + " — descargando...");
                    String newScript = fetchScript(BGFN_SCRIPT_URL);
                    if (newScript != null && newScript.length() > 1000) {
                        prefs.edit()
                            .putString(KEY_CACHED_SCRIPT, newScript)
                            .putString(KEY_CACHED_VER, latestVersion)
                            .apply();
                        android.util.Log.d("BGFN", "Script v" + latestVersion + " cacheado. Se aplicará en el próximo reload.");
                    }
                }
            } catch (Exception e) {
                android.util.Log.e("BGFN", "checkForUpdates error: " + e.getMessage());
            }
        });
    }

    private String fetchLatestVersion() {
        try {
            URL url = new URL(BGFN_API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(8000);
            conn.setReadTimeout(8000);
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestProperty("User-Agent", "BetterGFN-Android/" + BGFN_VERSION);

            if (conn.getResponseCode() != 200) return null;

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) sb.append(line);
            reader.close();
            conn.disconnect();

            // Extraer tag_name sin parsear JSON completo
            String json = sb.toString();
            int tagIdx = json.indexOf("\"tag_name\"");
            if (tagIdx == -1) return null;
            int start = json.indexOf("\"", tagIdx + 11) + 1;
            int end   = json.indexOf("\"", start);
            return json.substring(start, end).replace("v", "");
        } catch (Exception e) {
            return null;
        }
    }

    private String fetchScript(String scriptUrl) {
        try {
            URL url = new URL(scriptUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setInstanceFollowRedirects(true);
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(30000);
            conn.setRequestProperty("User-Agent", "BetterGFN-Android/" + BGFN_VERSION);

            if (conn.getResponseCode() != 200) return null;

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) sb.append(line).append("\n");
            reader.close();
            conn.disconnect();
            return sb.toString();
        } catch (Exception e) {
            android.util.Log.e("BGFN", "fetchScript error: " + e.getMessage());
            return null;
        }
    }

    // ── Comparador semver ("1.2.0" vs "1.1.0") ───────────────────────────────
    // Devuelve: 1 si a > b | 0 si a == b | -1 si a < b
    private int compareSemver(String a, String b) {
        try {
            String[] pa = a.replace("v", "").split("\\.");
            String[] pb = b.replace("v", "").split("\\.");
            for (int i = 0; i < 3; i++) {
                int na = i < pa.length ? Integer.parseInt(pa[i]) : 0;
                int nb = i < pb.length ? Integer.parseInt(pb[i]) : 0;
                if (na > nb) return 1;
                if (na < nb) return -1;
            }
            return 0;
        } catch (Exception e) {
            return 0;
        }
    }

    // ── Cargar asset bundleado ────────────────────────────────────────────────
    private String loadAssetScript(String filename) {
        try {
            InputStream is = getAssets().open(filename);
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) sb.append(line).append("\n");
            reader.close();
            return sb.toString();
        } catch (IOException e) {
            return null;
        }
    }

    // ── Bridge JS ↔ Android ───────────────────────────────────────────────────
    public class BgfnBridge {
        @JavascriptInterface
        public String getAppVersion() {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
            String cached = prefs.getString(KEY_CACHED_VER, "0.0.0");
            return compareSemver(cached, BGFN_VERSION) > 0 ? cached : BGFN_VERSION;
        }

        @JavascriptInterface
        public void log(String message) {
            android.util.Log.d("BGFN", message);
        }

        // Permite que el JS fuerce un re-chequeo de updates manualmente
        @JavascriptInterface
        public void checkUpdates() {
            checkForUpdates();
        }

        // Permite que el JS borre el caché (para forzar volver al bundleado)
        @JavascriptInterface
        public void clearScriptCache() {
            getSharedPreferences(PREFS_NAME, MODE_PRIVATE)
                .edit()
                .remove(KEY_CACHED_SCRIPT)
                .remove(KEY_CACHED_VER)
                .apply();
            android.util.Log.d("BGFN", "Script cache cleared");
        }
    }

    // ── Lifecycle ─────────────────────────────────────────────────────────────
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onPause() {
        super.onPause();
        webView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        webView.onResume();
    }

    @Override
    protected void onDestroy() {
        executor.shutdown();
        webView.destroy();
        super.onDestroy();
    }
}
