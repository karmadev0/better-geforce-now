<p align="center">
  <img src="assets/logo.png" width="120" />
</p>

<h1 align="center">Better GFN</h1>

<p align="center">
  Mejoras de experiencia para GeForce NOW en navegador y Android<br>
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
  <a href="#instalación">
    <img src="https://img.shields.io/badge/⬇%20INSTALAR-76b900?style=for-the-badge&labelColor=0d1117" alt="Instalar">
  </a>
</p>

---

## ¿Qué es Better GFN?

Better GFN es una extensión de navegador y aplicación Android que mejora la experiencia de juego en [GeForce NOW](https://play.geforcenow.com) — el servicio de cloud gaming de NVIDIA.

La idea principal está inspirada en [**Better xCloud**](https://github.com/redphx/better-xcloud) de **@redphx**, un proyecto increíble que hace lo mismo para Xbox Cloud Gaming. Todo el crédito del concepto original pertenece a ese proyecto. Better GFN es una adaptación independiente orientada específicamente a GeForce NOW.

---

## Features actuales (v1.0.2)

### Timer de sesión
- Reloj en tiempo real siempre visible
- Contador de tiempo de sesión activa
- Tiempo restante con barra de progreso
- Alertas automáticas a los 50 min (amarillo) y 55 min (rojo)
- Reset automático cuando GFN se reinicia
- Timer persistente — si recargas la página la sesión continúa desde donde estaba

### (inestable) Eludir bloqueo de región
- Avisos visibles sobre qué hacer con tu propia VPN
- Aviso automático cuando la sesión se establece: **"Ya puedes desconectar tu VPN"**

### Optimización de mando
- Detección automática del tipo de mando: Xbox, PlayStation, Nintendo, Genérico
- Remapeo de botones al estándar Xbox que GFN espera
- **High-frequency polling** ajustable para reducir input lag en Bluetooth:
  - Nativo (~60 Hz)
  - Alto (~120 Hz)
  - Ultra (~250 Hz) — recomendado para BT
  - Max (sin límite)
- Opción A↔B para mandos PlayStation

### UI adaptativa
- Mini widget en esquina superior izquierda durante el juego en fullscreen
- Widget flotante con info completa fuera de fullscreen pero dentro del juego
- Botón FAB `⚙ BETTER GFN` en el menú principal
- Panel deslizable desde abajo con toda la configuración
- Toda la configuración se guarda automáticamente

### Autoupdater
- El script se actualiza automáticamente sin reinstalar nada
- Aviso en el panel cuando hay una nueva versión disponible
- Descarga y aplica la actualización con un solo click

---

## Instalación

<p align="center">
  <a href="https://github.com/karmadev0/better-geforce-now/releases/latest">
    <img src="https://img.shields.io/badge/⬇%20IR%20A%20RELEASES-76b900?style=for-the-badge&labelColor=0d1117" alt="Releases">
  </a>
</p>

### Opción A — Navegadores Chrome (PC / Android)
1. Instala [Tampermonkey](https://www.tampermonkey.net/) desde la tienda de extensiones
2. En Chrome ve a `chrome://extensions/` → Tampermonkey → **Detalles** → activa **"Permitir secuencias de comandos del usuario"**
3. Abre el archivo `.user.js` de la última release
4. Tampermonkey detecta el script automáticamente → click en **Instalar**

> El script se actualiza automáticamente cuando hay una nueva versión.

### Opción B — Kiwi Browser (Android) — sin Tampermonkey
1. Descarga el ZIP de la última release
2. Abre Kiwi Browser → `chrome://extensions/`
3. Activa **Modo desarrollador**
4. Click en **`+ (from .zip/.crx/.user.js)`**
5. Selecciona el ZIP descargado

### Opción C — APK Android
1. Ve a la última release y descarga el archivo APK
2. Instala el APK en tu dispositivo (necesitas permitir fuentes desconocidas)

---

## Roadmap

### v1.1.0 — Estadísticas, temas e historial
- [ ] Sistema de widgets configurables con posiciones (arriba izquierda, centro, abajo derecha, etc)
- [ ] Estadísticas completas del stream — latencia, bitrate, FPS, calidad de conexión, salud del servidor
- [ ] Auto-reportes de lag con timestamp y servidor
- [ ] Historial real de juego — tiempo jugado por título detectando actividad real
- [ ] Pre-juego inteligente — ping a todos los servidores antes de lanzar con recomendación automática
- [ ] Sistema de temas — modo oscuro OLED, modo claro, monocromático, y editor de tema propio con CSS o sliders
- [ ] Exportar / importar configuración completa en JSON

### v1.2.0 — Biblioteca y comunidad
- [ ] Biblioteca personalizada con colecciones, categorías e iconos por juego
- [ ] Notas privadas por juego
- [ ] BGFN Community — DB anónima en tiempo real con juegos más jugados y latencias de la comunidad
- [ ] Perfiles de usuario opcionales para sincronizar config entre dispositivos
- [ ] Soporte de múltiples idiomas

### v1.3.0 — Controles y logros
- [ ] Remapeo completo del OSC táctil de GFN en móvil
- [ ] Perfiles de layout de controles táctiles guardables por juego
- [ ] Integración con mando físico usando táctiles de 0 input lag
- [ ] Overlay de logros — interceptar notificaciones del SW de GFN
- [ ] Historial de logros por juego con fecha y sesión

### v1.4.0 — Sesión continua e integración
- [ ] Sesión continua — abrir cola en background antes de que termine la sesión actual
- [ ] Transición casi sin corte entre sesiones
- [ ] Integración con Discord — estado con juego y tiempo de sesión
- [ ] Notificaciones nativas de Android

### Futuro
- [ ] Modo streaming — ocultar UI de BGFN para grabaciones
- [ ] Modo accesibilidad — contraste, tamaño de texto, pantallas pequeñas
- [ ] Atajos de teclado/mando sin salir del juego
- [ ] Selector automático del mejor servidor con datos de la comunidad
- [ ] Investigar elusión del bloqueo de IP desde la app
- [ ] Alertas cuando un juego vuelve al catálogo de GFN
- [ ] Mini documentación dentro del panel
- [ ] Wiki en GitHub con guías y FAQ

---

## Aviso legal

El uso indebido de esta herramienta es responsabilidad exclusiva del usuario.
Better GFN está diseñado únicamente para mejorar la experiencia de juego en GeForce NOW.
GeForce NOW y todos sus servicios son propiedad de **NVIDIA Corporation**.
Better GFN no está afiliado ni respaldado por NVIDIA.

La idea original del concepto pertenece al proyecto [**Better xCloud**](https://github.com/redphx/better-xcloud) de **@redphx**.

---

**Karmadev0**
Si tienes ideas, sugerencias o encuentras bugs, abre un Issue en este repo.
