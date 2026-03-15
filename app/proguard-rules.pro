# Better GFN ProGuard rules
-keep class com.karmadev0.bettergfn.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
