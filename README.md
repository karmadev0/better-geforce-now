<p align="center">
  <img src="assets/logo.png" width="120" />
</p>

<h1 align="center">Better GFN</h1>

<p align="center">
  Experience improvements for GeForce NOW on browser and Android<br>
  by <strong>Karmadev0</strong>
</p>

<p align="center">
  <a href="https://github.com/karmadev0/better-geforce-now/stargazers">
    <img src="https://img.shields.io/github/stars/karmadev0/better-geforce-now?style=flat&color=76b900&labelColor=0d1117" alt="Stars">
  </a>
  <a href="https://github.com/karmadev0/better-geforce-now/releases/latest">
    <img src="https://img.shields.io/github/v/release/karmadev0/better-geforce-now?style=flat&color=76b900&labelColor=0d1117" alt="Release">
  </a>
  <a href="https://github.com/karmadev0/better-geforce-now/releases/latest">
    <img src="https://img.shields.io/github/downloads/karmadev0/better-geforce-now/total?style=flat&color=76b900&labelColor=0d1117" alt="Downloads">
  </a>
  <a href="https://github.com/karmadev0/better-geforce-now/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/karmadev0/better-geforce-now?style=flat&color=76b900&labelColor=0d1117" alt="License">
  </a>
</p>

<p align="center">
  <a href="#installation">
    <img src="https://img.shields.io/badge/⬇%20INSTALL-76b900?style=for-the-badge&labelColor=0d1117" alt="Install">
  </a>
</p>

---

## What is Better GFN?

Better GFN is a browser extension and Android application that improves the gaming experience on [GeForce NOW](https://play.geforcenow.com) — NVIDIA's cloud gaming service.

The main idea is inspired by [**Better xCloud**](https://github.com/redphx/better-xcloud) by **@redphx**, an incredible project that does the same for Xbox Cloud Gaming. All credit for the original concept belongs to that project. Better GFN is an independent adaptation specifically aimed at GeForce NOW.

---

## Current features (v1.1.0)

### 🕐 Session timer
- Real-time clock always visible
- Active session time counter and remaining time with progress bar
- Automatic alerts at 50 min (yellow) and 55 min (red)
- Timer persists across page reloads — session continues from where it left off
- Auto-reset when GFN detects a new session

### 🌐 Smart pre-game
- Automatic analysis of all 22 GFN servers before launching a game
- Real-time ping to each server via direct RTT measurement
- Real-time queue data via the PrintedWaste API
- Best server recommendation based on ping, queue, or both combined
- Appears below the PLAY button on each game's page

### 🎮 Controller optimization
- Automatic controller type detection: Xbox, PlayStation, Nintendo, Generic
- Button remapping to the Xbox standard GFN expects
- Adjustable **high-frequency polling** to reduce input lag over Bluetooth:
  - Native (~60 Hz)
  - High (~120 Hz)
  - Ultra (~250 Hz) — recommended for Bluetooth
  - Max (no limit)
- A↔B swap for PlayStation controllers

### 🎨 Theme system
- 8 built-in presets: OLED Black, Nord, Dracula, Catppuccin, Tokyo Night, One Dark, Solarized, NVIDIA Green
- Custom theme editor with color picker for each UI element
- Live preview before saving
- Export / import themes as JSON

### 📊 Fullscreen widgets
- 10 widget types: Ping, FPS, Bitrate, Resolution, Session time, Remaining time, Clock, Connection health, Jitter, Packet loss
- 6 configurable screen positions
- Color options: use active theme accent or a fully custom color

### 🌍 Language support
- Spanish and English built-in
- Automatic browser language detection
- Exportable / importable language system as JSON — the community can add new languages
- Quick selection buttons: AUTO / ES / EN

### 🔔 VPN & region
- Automatic notice when a session is established: *"You can now disconnect your VPN"*
- Toggle to enable or disable the notice
- Informational text about region restrictions with a link to the issue tracker

### ⚙️ Full configuration
- Bottom slide-up panel with all settings
- Export / import complete configuration as JSON (includes themes, widgets, timer, controller)
- All settings saved automatically to localStorage

### 🔄 Auto-updater
- Automatically detects when a new version is available on GitHub
- **Tampermonkey:** automatic update via `@updateURL`
- **Kiwi / APK:** banner with direct download link for the new ZIP

---

## Installation

<p align="center">
  <a href="https://github.com/karmadev0/better-geforce-now/releases/latest">
    <img src="https://img.shields.io/badge/⬇%20GO%20TO%20RELEASES-76b900?style=for-the-badge&labelColor=0d1117" alt="Releases">
  </a>
</p>

### Option A — Kiwi Browser (Android)
1. Download `bgfn-extension.zip` from the [latest release](https://github.com/karmadev0/better-geforce-now/releases/latest)
2. Open Kiwi Browser → `chrome://extensions/`
3. Enable **Developer mode**
4. Tap **`+ (from .zip/.crx/.user.js)`**
5. Select the downloaded ZIP

### Option B — Tampermonkey (any browser)
1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Download `better-gfn.user.js` from the [latest release](https://github.com/karmadev0/better-geforce-now/releases/latest)
3. Tampermonkey will detect the script automatically and ask for confirmation
4. Future updates will install automatically

### Option C — Android APK
1. Go to the [latest release](https://github.com/karmadev0/better-geforce-now/releases/latest) and download the APK
2. Install the APK on your device (you need to allow unknown sources)

---

## Roadmap

### v1.1.0 ✅ Released
- [x] Smart pre-game — real-time ping + queue to all 22 servers with automatic recommendation
- [x] Theme system — 8 presets + custom editor + export/import JSON
- [x] Fullscreen widgets — 10 types, 6 positions, custom colors
- [x] Language system — ES/EN built-in, community-extensible via JSON
- [x] Full config export/import as JSON
- [x] Auto-updater — Tampermonkey automatic, Kiwi/APK banner with direct download

### v1.2.0 — In development
- [ ] **Active server detection** — read the currently selected server from GFN settings
- [ ] **Smart comparison** — pre-game shows ✓ or ⚠ comparing your active server with the recommended one
- [ ] **Real session history** — log game title, play time and server per session
- [ ] **APK JS auto-updater** — script updates automatically without reinstalling the app
- [ ] **Microphone support in APK** — runtime permission request so voice works over WebRTC

### v1.3.0 — Touch controls & achievements
- [ ] Customizable touch buttons in fullscreen
- [ ] Per-game control layout profiles
- [ ] Session achievement system with timestamp and server info
- [ ] Keyboard / controller shortcuts without leaving the game

### v1.4.0 — Notifications & integrations
- [ ] Discord webhooks — notify on session start / end with game name and duration
- [ ] Native Android OS notifications
- [ ] Continuous session mode — open queue in background before current session expires

### v1.5.0 — Community hub
- [ ] Online theme gallery shared by the community
- [ ] Download and install community themes directly from the panel
- [ ] Share your custom theme with one click
- [ ] Anonymous real-time community DB — most played games and server latencies

### Future
- [ ] Stream mode — hide Better GFN UI during recordings
- [ ] Accessibility mode — contrast, text size, small screen support
- [ ] Force maximum available resolution and bitrate
- [ ] Automatic best-server selector using community latency data
- [ ] Alert when a game returns to the GFN catalog
- [ ] Investigate region IP bypass directly from the app
- [ ] Built-in mini documentation panel
- [ ] GitHub Wiki with guides and FAQ

---

## Contributing

If you have ideas, find bugs, or want to add a new language:

1. **Issues:** open an issue with your bug report or suggestion
2. **Languages:** export the language JSON from the Better GFN panel (LANGUAGE section → Export), translate it, and send it as a Pull Request or attach it to an issue
3. **Pull Requests:** always welcome

---

## Legal notice

Misuse of this tool is the sole responsibility of the user.  
Better GFN is designed solely to improve the gaming experience on GeForce NOW.  
GeForce NOW and all its services are property of **NVIDIA Corporation**.  
Better GFN is not affiliated with or endorsed by NVIDIA.

The original concept belongs to the [**Better xCloud**](https://github.com/redphx/better-xcloud) project by **@redphx**.

---

**Karmadev0** — If you have ideas or find bugs, open an [issue](https://github.com/karmadev0/better-geforce-now/issues).
 
