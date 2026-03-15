package com.karmadev0.bettergfn;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
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

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private static final String GFN_URL = "https://play.geforcenow.com";

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Pantalla completa sin barra de título
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        setContentView(R.layout.activity_main);

        webView     = findViewById(R.id.webview);
        progressBar = findViewById(R.id.progress);

        setupWebView();
        webView.loadUrl(GFN_URL);
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void setupWebView() {
        WebSettings settings = webView.getSettings();

        // JavaScript habilitado
        settings.setJavaScriptEnabled(true);

        // Comportamiento nativo
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // User-Agent: Chrome en Android (GFN lo requiere)
        settings.setUserAgentString(
            "Mozilla/5.0 (Linux; Android 13; Pixel 7) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Mobile Safari/537.36"
        );

        // Permitir contenido mixto y zoom
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);

        // Cache
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        // Color de fondo negro (evita flash blanco al cargar)
        webView.setBackgroundColor(Color.BLACK);

        // Interfaz JavaScript para comunicación APK ↔ WebView
        webView.addJavascriptInterface(new BgfnBridge(), "BgfnNative");

        // WebViewClient — inyectar script al cargar cada página
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
                // Mantener todo dentro del WebView si es GFN
                if (url.contains("geforcenow.com") || url.contains("nvidia.com")) {
                    return false;
                }
                // Abrir links externos en el navegador del sistema
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            }
        });

        // WebChromeClient — permitir fullscreen y permisos de medios
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
                // Conceder permisos de audio/video para el stream
                request.grant(request.getResources());
            }

            // Soporte fullscreen nativo de GFN
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
                // Agregar la vista del stream como fullscreen
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

    // ── Inyectar el script BGFN ───────────────────────────────
    private void injectBgfnScript(WebView view) {
        String script = loadAssetScript("bgfn.js");
        if (script == null || script.isEmpty()) return;
        // Escapar el script para evaluateJavascript
        view.evaluateJavascript(script, null);
    }

    private String loadAssetScript(String filename) {
        try {
            InputStream is = getAssets().open(filename);
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            reader.close();
            return sb.toString();
        } catch (IOException e) {
            return null;
        }
    }

    // ── Bridge nativo ─────────────────────────────────────────
    // Permite que el script JS llame funciones nativas de Android
    public class BgfnBridge {
        @JavascriptInterface
        public String getAppVersion() {
            return "1.0.1";
        }

        @JavascriptInterface
        public void log(String message) {
            android.util.Log.d("BGFN", message);
        }
    }

    // ── Botón atrás ───────────────────────────────────────────
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
        webView.destroy();
        super.onDestroy();
    }
}
