// Better GFN v1.1.0 — by Karmadev0
// https://github.com/karmadev0/better-geforce-now

(function () {


  // ── INTERNACIONALIZACIÓN ───────────────────────────────────────────────────
  const LANG = (() => {
    const BUILT_IN = {
      es: {
        // Panel principal
        'session.current': 'SESIÓN ACTUAL',
        'session.time': 'TIEMPO',
        'session.remaining': 'RESTANTE',
        'session.clock': 'RELOJ',
        'session.health': 'SALUD DE LA CONEXIÓN',
        'session.limit': 'Límite sesión (min)',
        'session.warn': 'Avisar a los (min)',
        'btn.save': 'GUARDAR',
        'btn.close': '✕ cerrar',
        'btn.cancel': 'CANCELAR',
        'btn.add': '+ AÑADIR',
        'btn.understood': 'ENTENDIDO',
        // Mando
        'gamepad.title': 'MANDO',
        'gamepad.none': 'Sin mando detectado',
        'gamepad.connect': 'Conecta un mando para ver opciones',
        'gamepad.polling': 'MODO DE POLLING',
        'gamepad.polling_current': 'Polling actual',
        'gamepad.remap': 'Remapeo de botones',
        'gamepad.remap_desc': 'Normaliza al estándar Xbox',
        'gamepad.swap': 'Intercambiar A↔B (PlayStation)',
        // Pre-juego
        'pregame.title': 'PRE-JUEGO INTELIGENTE',
        'pregame.show': 'Mostrar análisis de servidores',
        'pregame.show_desc': 'Aparece debajo del botón JUGAR',
        'pregame.list': 'MOSTRAR EN LA LISTA',
        'pregame.ping': 'Ping (ms)',
        'pregame.queue': 'Cola (personas en espera)',
        'pregame.eta': 'ETA (tiempo estimado de cola)',
        'pregame.priority': 'PRIORIDAD PARA RECOMENDAR',
        'pregame.analyzing': 'Analizando mejores servidores...',
        'pregame.best': 'MEJOR SERVIDOR',
        'pregame.see_all': 'VER TODOS LOS SERVIDORES ▾',
        'pregame.hide': 'OCULTAR ▴',
        // Timer
        'timer.title': 'CONFIGURACIÓN TIMER',
        // VPN
        'vpn.title': 'REGIÓN Y VPN',
        'vpn.toggle': 'Aviso "ya puedes desconectar VPN"',
        'vpn.toggle_desc': 'Aparece al establecer sesión',
        'vpn.notice_dot': '● SESIÓN ESTABLECIDA',
        'vpn.notice_text': 'Ya puedes desconectar tu VPN',
        'vpn.notice_sub': 'la sesión continuará activa',
        // Widgets
        'widgets.title': 'WIDGETS EN FULLSCREEN',
        'widgets.stream': 'WIDGETS EN STREAM',
        'widgets.select': 'SELECCIONAR WIDGET',
        'widgets.preview': 'PREVIEW EN STREAM',
        'widgets.color': 'COLOR DEL WIDGET',
        'widgets.color_theme': 'Usar color del tema activo',
        'widgets.color_custom': 'Color personalizado',
        'widgets.position': 'POSICIÓN EN PANTALLA',
        'widgets.type': 'TIPO DE DATO',
        // Temas
        'themes.title': 'TEMAS DISPONIBLES',
        'themes.custom': 'TEMAS PERSONALIZADOS',
        'themes.create': '+ CREAR NUEVO',
        'themes.name': 'NOMBRE DEL TEMA',
        'themes.try': '▶ PROBAR',
        'themes.save_apply': '💾 GUARDAR',
        // Config
        'config.title': 'CONFIGURACIÓN',
        'config.export': '⬆ EXPORTAR CONFIG',
        'config.import': '⬇ IMPORTAR CONFIG',
        'config.lang': 'IDIOMA',
        'config.lang_auto': 'Automático',
        // WIP
        'wip.title': 'EN CONSTRUCCIÓN',
        'wip.desc': 'estará disponible próximamente.',
        // Idioma (nuevo)
        'lang.title': 'IDIOMA / LANGUAGE',
        'lang.export': '⬆ Exportar idioma (JSON)',
        'lang.import': '⬇ Importar idioma (JSON)',
        'lang.current': 'Idioma activo',
        'gamepad.section': 'MANDO',
        'gamepad.disconnected': '○ DESCONECTADO',
        'session.none': '○ SIN SESIÓN ACTIVA',
        'vpn.community': 'Aún no sé cómo poder quitar la restricción de GeForce con el tema de países no admitidos. Si alguien sabe, por favor hagan un <a href="https://github.com/karmadev0/better-geforce-now/issues" target="_blank" style="color:var(--bgfn-accent,#76b900);text-decoration:none;font-weight:bold;">issue en el repo oficial</a> y cuéntenme la idea. 🙏',
        'poll.native_desc': '~60 Hz — navegador nativo',
        'poll.high_desc': '~120 Hz — buen balance',
        'poll.ultra_desc': '~250 Hz — recomendado Bluetooth',
        'poll.max_desc': 'Sin límite — máximo posible',
        'session.no_gamepad': '○ DESCONECTADO',
        'session.started': '▶ Sesión iniciada',
        'session.ended': '⏹ Sesión terminada',
        'session.saved': '✓ Configuración guardada',
        'widget.empty': 'No hay widgets activos. Añade uno con el botón +',
        'widget.add_title': '+ AÑADIR WIDGET',
        'widget.added': '✓ Widget añadido',
        'widget.data_type': 'TIPO DE DATO',
        'widget.position': 'POSICIÓN EN PANTALLA',
        'widget.type.ping': 'Ping',
        'widget.type.fps': 'FPS',
        'widget.type.bitrate': 'Bitrate',
        'widget.type.resolution': 'Resolución',
        'widget.type.session': 'Sesión',
        'widget.type.remaining': 'Restante',
        'widget.type.clock': 'Reloj',
        'widget.type.health': 'Conexión',
        'widget.type.jitter': 'Jitter',
        'widget.type.packets': 'Pkt perdidos',
        'pos.top-left': '↖ Arriba izquierda',
        'pos.top-center': '↑ Arriba centro',
        'pos.top-right': '↗ Arriba derecha',
        'pos.bottom-left': '↙ Abajo izquierda',
        'pos.bottom-center': '↓ Abajo centro',
        'pos.bottom-right': '↘ Abajo derecha',
        'export.done': '✓ Configuración exportada',
        'import.done': '✓ Config importada',
        'export.error': '✗ Error al exportar',
        'session.in_session': 'Inicia una sesión para ver estadísticas en tiempo real',
        'nav.history': 'Historial',
        'nav.stats': 'Estadísticas',
        'nav.themes': 'Temas',
        'nav.controls': 'Controles',
        'nav.community': 'BGFN Community',
        'nav.plugins': 'Plugins',
        'nav.settings': 'Better GFN',
        'theme.preview': 'VISTA PREVIA',
        'theme.active': 'Tema activo',
        'theme.accent': 'Acento',
        'theme.custom_section': 'Tema Personalizado',
        'theme.widget_select': '● Ping / Latencia',
        'wip.desc_full': 'estará disponible próximamente.',
        'footer.made_by': 'Hecho por',
        'lang.confirm': '¿Quieres usar el idioma ',
        'lang.confirm2': '? La página se reiniciará para aplicar los cambios.',
        'lang.accept': 'ACEPTAR',
        'lang.cancel_confirm': 'CANCELAR',
        'gamepad.connected': '● CONECTADO',
        'gamepad.starting': 'iniciando...',
        'gamepad.type.xbox': 'Xbox / Microsoft',
        'gamepad.type.ps': 'PlayStation (DualShock/Sense)',
        'gamepad.type.nintendo': 'Nintendo (Switch Pro)',
        'gamepad.type.generic': 'Genérico',
        'poll.label.native': 'Nativo',
        'poll.label.high': 'Alto',
        'poll.label.ultra': 'Ultra',
        'poll.label.max': 'Max',
        'health.good': 'Buena',
        'health.fair': 'Regular',
        'health.poor': 'Mala',
        'theme.name.oled': 'OLED Negro',
        'theme.name.nord': 'Nord',
        'theme.name.dracula': 'Dracula',
        'theme.name.catppuccin': 'Catppuccin',
        'theme.name.tokyo': 'Tokyo Night',
        'theme.name.onedark': 'One Dark',
        'theme.name.solarized': 'Solarized',
        'theme.name.nvidia': 'NVIDIA Green',
        'status.ingame': '● EN JUEGO',
        'status.idle': '○ SIN SESIÓN ACTIVA',
        'status.warn': '⏳ PREPÁRATE',
        'status.danger': '⚠ GUARDA YA',
        'session.warn_msg': 'min — prepárate para guardar',
        'file.invalid': 'Archivo inválido',
        'nav.wiki': 'Wiki',
        'nav.github': 'GitHub',
                'pregame.queue_label': 'cola',
        'pregame.best_available': 'Mejor servidor disponible',
        'pregame.col_queue': 'cola',
        'pregame.best_title': 'Mejor servidor disponible',
        'theme.color.bg': 'Fondo principal',
        'theme.color.surface': 'Superficies / Cards',
        'theme.color.accent': 'Color de acento',
        'theme.color.text': 'Texto principal',
        'theme.color.textmuted': 'Texto secundario',
        'theme.color.border': 'Bordes',
        'themes.close_editor': '✕ Cerrar',
                'footer.disclaimer': 'El uso indebido es responsabilidad exclusiva del usuario. GeForce NOW es propiedad de NVIDIA Corporation. No afiliado ni respaldado por NVIDIA.',
      },
      en: {
        'session.current': 'CURRENT SESSION',
        'session.time': 'TIME',
        'session.remaining': 'REMAINING',
        'session.clock': 'CLOCK',
        'session.health': 'CONNECTION HEALTH',
        'session.limit': 'Session limit (min)',
        'session.warn': 'Warn at (min)',
        'btn.save': 'SAVE',
        'btn.close': '✕ close',
        'btn.cancel': 'CANCEL',
        'btn.add': '+ ADD',
        'btn.understood': 'GOT IT',
        'gamepad.title': 'GAMEPAD',
        'gamepad.none': 'No gamepad detected',
        'gamepad.connect': 'Connect a gamepad to see options',
        'gamepad.polling': 'POLLING MODE',
        'gamepad.polling_current': 'Current polling',
        'gamepad.remap': 'Button remapping',
        'gamepad.remap_desc': 'Normalizes to Xbox standard',
        'gamepad.swap': 'Swap A↔B (PlayStation)',
        'pregame.title': 'SMART PRE-GAME',
        'pregame.show': 'Show server analysis',
        'pregame.show_desc': 'Appears below the PLAY button',
        'pregame.list': 'SHOW IN LIST',
        'pregame.ping': 'Ping (ms)',
        'pregame.queue': 'Queue (people waiting)',
        'pregame.eta': 'ETA (estimated queue time)',
        'pregame.priority': 'RECOMMENDATION PRIORITY',
        'pregame.analyzing': 'Analyzing best servers...',
        'pregame.best': 'BEST SERVER',
        'pregame.see_all': 'SEE ALL SERVERS ▾',
        'pregame.hide': 'HIDE ▴',
        'timer.title': 'TIMER SETTINGS',
        'vpn.title': 'REGION & VPN',
        'vpn.toggle': '"You can disconnect VPN" notice',
        'vpn.toggle_desc': 'Appears when session starts',
        'vpn.notice_dot': '● SESSION ESTABLISHED',
        'vpn.notice_text': 'You can now disconnect your VPN',
        'vpn.notice_sub': 'the session will continue active',
        'widgets.title': 'FULLSCREEN WIDGETS',
        'widgets.stream': 'STREAM WIDGETS',
        'widgets.select': 'SELECT WIDGET',
        'widgets.preview': 'STREAM PREVIEW',
        'widgets.color': 'WIDGET COLOR',
        'widgets.color_theme': 'Use active theme color',
        'widgets.color_custom': 'Custom color',
        'widgets.position': 'SCREEN POSITION',
        'widgets.type': 'DATA TYPE',
        'themes.title': 'AVAILABLE THEMES',
        'themes.custom': 'CUSTOM THEMES',
        'themes.create': '+ CREATE NEW',
        'themes.name': 'THEME NAME',
        'themes.try': '▶ PREVIEW',
        'themes.save_apply': '💾 SAVE',
        'config.title': 'SETTINGS',
        'config.export': '⬆ EXPORT CONFIG',
        'config.import': '⬇ IMPORT CONFIG',
        'config.lang': 'LANGUAGE',
        'config.lang_auto': 'Automatic',
        'wip.title': 'COMING SOON',
        'wip.desc': 'will be available soon.',
        'lang.title': 'IDIOMA / LANGUAGE',
        'lang.export': '⬆ Export language (JSON)',
        'lang.import': '⬇ Import language (JSON)',
        'lang.current': 'Active language',
        'gamepad.section': 'GAMEPAD',
        'gamepad.disconnected': '○ DISCONNECTED',
        'session.none': '○ NO ACTIVE SESSION',
        'vpn.community': 'We still don\'t know how to bypass GeForce\'s country restriction. If you know how, please open an <a href="https://github.com/karmadev0/better-geforce-now/issues" target="_blank" style="color:var(--bgfn-accent,#76b900);text-decoration:none;font-weight:bold;">issue on the official repo</a> and share your idea. 🙏',
        'poll.native_desc': '~60 Hz — browser native',
        'poll.high_desc': '~120 Hz — good balance',
        'poll.ultra_desc': '~250 Hz — recommended Bluetooth',
        'poll.max_desc': 'No limit — maximum possible',
        'session.no_gamepad': '○ DISCONNECTED',
        'session.started': '▶ Session started',
        'session.ended': '⏹ Session ended',
        'session.saved': '✓ Settings saved',
        'widget.empty': 'No active widgets. Add one with the + button',
        'widget.add_title': '+ ADD WIDGET',
        'widget.added': '✓ Widget added',
        'widget.data_type': 'DATA TYPE',
        'widget.position': 'SCREEN POSITION',
        'widget.type.ping': 'Ping',
        'widget.type.fps': 'FPS',
        'widget.type.bitrate': 'Bitrate',
        'widget.type.resolution': 'Resolution',
        'widget.type.session': 'Session',
        'widget.type.remaining': 'Remaining',
        'widget.type.clock': 'Clock',
        'widget.type.health': 'Connection',
        'widget.type.jitter': 'Jitter',
        'widget.type.packets': 'Pkt lost',
        'pos.top-left': '↖ Top left',
        'pos.top-center': '↑ Top center',
        'pos.top-right': '↗ Top right',
        'pos.bottom-left': '↙ Bottom left',
        'pos.bottom-center': '↓ Bottom center',
        'pos.bottom-right': '↘ Bottom right',
        'export.done': '✓ Config exported',
        'import.done': '✓ Config imported',
        'export.error': '✗ Export error',
        'session.in_session': 'Start a session to see real-time stats',
        'nav.history': 'History',
        'nav.stats': 'Statistics',
        'nav.themes': 'Themes',
        'nav.controls': 'Controls',
        'nav.community': 'BGFN Community',
        'nav.plugins': 'Plugins',
        'nav.settings': 'Better GFN',
        'theme.preview': 'PREVIEW',
        'theme.active': 'Active theme',
        'theme.accent': 'Accent',
        'theme.custom_section': 'Custom Theme',
        'theme.widget_select': '● Ping / Latency',
        'wip.desc_full': 'will be available soon.',
        'footer.made_by': 'Made by',
        'lang.confirm': 'Do you want to use ',
        'lang.confirm2': '? The page will reload to apply changes.',
        'lang.accept': 'ACCEPT',
        'lang.cancel_confirm': 'CANCEL',
        'gamepad.connected': '● CONNECTED',
        'gamepad.starting': 'starting...',
        'gamepad.type.xbox': 'Xbox / Microsoft',
        'gamepad.type.ps': 'PlayStation (DualShock/Sense)',
        'gamepad.type.nintendo': 'Nintendo (Switch Pro)',
        'gamepad.type.generic': 'Generic',
        'poll.label.native': 'Native',
        'poll.label.high': 'High',
        'poll.label.ultra': 'Ultra',
        'poll.label.max': 'Max',
        'health.good': 'Good',
        'health.fair': 'Fair',
        'health.poor': 'Poor',
        'theme.name.oled': 'OLED Black',
        'theme.name.nord': 'Nord',
        'theme.name.dracula': 'Dracula',
        'theme.name.catppuccin': 'Catppuccin',
        'theme.name.tokyo': 'Tokyo Night',
        'theme.name.onedark': 'One Dark',
        'theme.name.solarized': 'Solarized',
        'theme.name.nvidia': 'NVIDIA Green',
        'status.ingame': '● IN GAME',
        'status.idle': '○ NO ACTIVE SESSION',
        'status.warn': '⏳ GET READY',
        'status.danger': '⚠ SAVE NOW',
        'session.warn_msg': 'min — get ready to save',
        'file.invalid': 'Archivo inválido',
        'nav.wiki': 'Wiki',
        'nav.github': 'GitHub',
                'pregame.queue_label': 'queue',
        'pregame.best_available': 'Best server available',
        'pregame.col_queue': 'queue',
        'pregame.best_title': 'Best server available',
        'theme.color.bg': 'Background',
        'theme.color.surface': 'Surfaces / Cards',
        'theme.color.accent': 'Accent color',
        'theme.color.text': 'Main text',
        'theme.color.textmuted': 'Secondary text',
        'theme.color.border': 'Borders',
        'themes.close_editor': '✕ Close',
                'footer.disclaimer': 'Misuse is the sole responsibility of the user. GeForce NOW is property of NVIDIA Corporation. Not affiliated with or endorsed by NVIDIA.',
      }
    };

    let activeLang = null; // null = auto
    let customStrings = {}; // overrides del JSON importado

    function detectLang() {
      const saved = localStorage.getItem('bgfn_lang');
      if (saved && saved !== 'auto') return saved;
      return navigator.language?.startsWith('es') ? 'es' : 'en';
    }

    function t(key) {
      const lang = activeLang || detectLang();
      return customStrings[key] || BUILT_IN[lang]?.[key] || BUILT_IN['es']?.[key] || key;
    }

    function setLang(lang) {
      activeLang = lang === 'auto' ? null : lang;
      localStorage.setItem('bgfn_lang', lang || 'auto');
    }

    function exportJSON() {
      const lang = activeLang || detectLang();
      const data = { lang, strings: { ...BUILT_IN[lang], ...customStrings } };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `bgfn-lang-${lang}.json`; a.click();
      URL.revokeObjectURL(url);
    }

    function importJSON(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.strings) {
              customStrings = data.strings;
              if (data.lang) setLang(data.lang);
              localStorage.setItem('bgfn_lang_custom', JSON.stringify(customStrings));
              resolve(data.lang || 'custom');
            } else reject(new Error('Invalid format'));
          } catch(err) { reject(err); }
        };
        reader.readAsText(file);
      });
    }

    // Cargar custom strings guardados
    try {
      const saved = localStorage.getItem('bgfn_lang_custom');
      if (saved) customStrings = JSON.parse(saved);
    } catch(_) {}

    return { t, setLang, detectLang, exportJSON, importJSON, getLang: () => activeLang || detectLang() };
  })();

  // Shorthand global
  const t = LANG.t.bind(LANG);

  'use strict';

  const CFG = {
    SESSION_LIMIT_MIN : 60,
    WARN_AT_MIN       : 50,
    DANGER_AT_MIN     : 55,
  };

  let sessionStart  = null;
  let currentSessId = null;
  let alertedWarn   = false;
  let alertedDanger = false;
  let alertedVPN    = false;
  let inGame        = false;
  let isFullscreen  = false;
  let panelOpen     = false;

  const fmt = s => `${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;
  const get  = id => document.getElementById(id);
  const elapsed = () => sessionStart ? (Date.now()-sessionStart)/1000 : 0;

  // ── GAMEPAD ────────────────────────────────────────────────────────────────
  const GAMEPAD = (() => {
    const MODES = [
      { id:'native', label:t('poll.label.native'), descKey:'poll.native_desc', targetHz:60,   color:'#555'    },
      { id:'high',   label:t('poll.label.high'),   descKey:'poll.high_desc',   targetHz:120,  color:'#f59e0b' },
      { id:'ultra',  label:t('poll.label.ultra'),  descKey:'poll.ultra_desc',  targetHz:250,  color:'#76b900' },
      { id:'max',    label:t('poll.label.max'),    descKey:'poll.max_desc',     targetHz:null, color:'#3b82f6' },
    ];
    const PROFILES = [
      { name:t('gamepad.type.xbox'),              type:'xbox',        emoji:'🟢', match:/xbox|microsoft|xinput/i,                   buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:t('gamepad.type.ps'), type:'playstation', emoji:'🔵', match:/playstation|dualshock|dualsense|054c|sony/i, buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:t('gamepad.type.nintendo'),         type:'nintendo',    emoji:'🔴', match:/nintendo|switch|joy-con|057e/i,              buttons:[1,0,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:t('gamepad.type.generic'),                      type:'generic',     emoji:'🎮', match:/.*/,                                        buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
    ];

    let pad=null, profile=null, remap=true, mode=MODES[2];
    let snapshots={}, orig=null, ch=null, running=false;
    let count=0, hz=0, lastHz=0, lastPoll=0;

    const detectProfile = gp => gp ? PROFILES.find(p=>p.match.test((gp.id||'').toLowerCase()))||PROFILES[3] : null;
    const clonePad = gp => ({ id:gp.id, index:gp.index, connected:gp.connected, timestamp:gp.timestamp, mapping:gp.mapping, buttons:Array.from(gp.buttons).map(b=>({pressed:b.pressed,touched:b.touched||false,value:b.value})), axes:Array.from(gp.axes) });
    const buildSnapshot = (gp, pr) => !pr||pr.type==='xbox' ? clonePad(gp) : { id:gp.id, index:gp.index, connected:gp.connected, timestamp:gp.timestamp, mapping:'standard', buttons:pr.buttons.map(i=>{ const b=gp.buttons[i]; return b?{pressed:b.pressed,touched:b.touched||false,value:b.value}:{pressed:false,touched:false,value:0}; }), axes:[0,1,2,3].map(i=>gp.axes[i]||0) };

    function pollTick() {
      if (!running) return;
      const now = performance.now();
      if (mode.targetHz !== null && now-lastPoll < 1000/mode.targetHz) { ch.port1.postMessage(null); return; }
      lastPoll = now;
      try { Array.from(orig.call(navigator)).forEach((gp,i)=>{ if(gp) snapshots[i]=buildSnapshot(gp,detectProfile(gp)); }); } catch(_) {}
      if (++count, now-lastHz >= 1000) { hz=count; count=0; lastHz=now; updateHzUI(); }
      ch.port1.postMessage(null);
    }
    function startPoll() { if(running)stopPoll(); if(mode.id==='native')return; running=true; ch=new MessageChannel(); ch.port2.onmessage=pollTick; ch.port1.postMessage(null); }
    function stopPoll()  { running=false; hz=0; if(ch){try{ch.port1.close();ch.port2.close();}catch(_){}ch=null;} snapshots={}; updateHzUI(); }

    function updateHzUI() {
      const el=get('bgfn-gp-hz'); if(el){ el.textContent=mode.id==='native'?'60 Hz (native)':running?(hz+' Hz'):(pad?'starting...':'OFF'); el.style.color=hz>200?'#76b900':hz>100?'#f59e0b':'#555'; }

    }
    function updateModeUI() { MODES.forEach(m=>{ const b=get('bgfn-poll-'+m.id); if(!b)return; const a=m.id===mode.id; b.style.background=a?m.color:'#21262d'; b.style.color=a?'#000':'#888'; b.style.borderColor=a?m.color:'#30363d'; b.style.fontWeight=a?'bold':'normal'; }); }
    function updatePadUI() {
      const ne=get('bgfn-gp-name'), te=get('bgfn-gp-type'), se=get('bgfn-gp-status'), sw=get('bgfn-gp-swaprow');
      if (!ne) return;
      if (pad && profile) { ne.textContent=profile.emoji+' '+profile.name; ne.style.color='#76b900'; te.textContent=pad.id.substring(0,45)+(pad.id.length>45?'…':''); se.textContent=t('gamepad.connected'); se.style.color='#76b900'; if(sw)sw.style.display=profile.type==='playstation'?'flex':'none'; }
      else { ne.textContent=t('gamepad.none'); ne.style.color='#555'; te.textContent=t('gamepad.connect'); se.textContent=t('gamepad.disconnected'); se.style.color='#555'; if(sw)sw.style.display='none'; }
      updateHzUI(); updateModeUI();
    }

    return {
      init() {
        const desc=Object.getOwnPropertyDescriptor(Navigator.prototype,'getGamepads');
        orig=desc?desc.value:navigator.getGamepads.bind(navigator);
        Object.defineProperty(Navigator.prototype,'getGamepads',{ value:function(){ const r=orig.call(this); if(!remap||mode.id==='native'||!Object.keys(snapshots).length)return r; return Array.from(r).map((gp,i)=>gp?(snapshots[i]||gp):gp); }, configurable:true, writable:true });
        window.addEventListener('gamepadconnected',   e=>{ pad=e.gamepad; profile=detectProfile(e.gamepad); if(mode.id!=='native')startPoll(); updatePadUI(); showToast(`🎮 ${profile?.name} — ${mode.label}`,'ok',3000); });
        window.addEventListener('gamepaddisconnected',  ()=>{ pad=null; profile=null; stopPoll(); updatePadUI(); showToast('🎮 Gamepad disconnected','warn',2000); });
        try{ const s=localStorage.getItem('bgfn_poll'); if(s) mode=MODES.find(m=>m.id===s)||mode; }catch(_){}
        setTimeout(()=>{ try{ Array.from(orig.call(navigator)).forEach(gp=>{ if(gp&&!pad){pad=gp;profile=detectProfile(gp);if(mode.id!=='native')startPoll();} }); updatePadUI(); }catch(_){} },800);
      },
      setRemap(v)  { remap=v; if(!v)stopPoll(); else if(pad&&mode.id!=='native')startPoll(); },
      setSwapAB(v) { const ps=PROFILES.find(p=>p.type==='playstation'); if(ps){ps.buttons[0]=v?1:0;ps.buttons[1]=v?0:1;} },
      setMode(id)  { const m=MODES.find(x=>x.id===id); if(!m)return; mode=m; try{localStorage.setItem('bgfn_poll',id);}catch(_){} if(pad){stopPoll();if(id!=='native')startPoll();} updateModeUI(); },
      updateUI: updatePadUI,
      getModes()       { return MODES; },
      getCurrentMode() { return mode; },
    };
  })();

  // ── INYECTOR DE CONTEXTO DE PÁGINA ───────────────────────────────────────
  // Kiwi ejecuta extensiones en isolated world — necesitamos inyectar
  // el hook de RTCPeerConnection directamente en el contexto de GFN
  (function injectPageScript() {
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        if (window.__bgfnRTCHooked) return;
        window.__bgfnRTCHooked = true;
        window.__bgfnPCs = [];

        const OrigRTC = window.RTCPeerConnection;
        function HookedRTC(...args) {
          const pc = new OrigRTC(...args);
          window.__bgfnPCs.push(pc);
          return pc;
        }
        HookedRTC.prototype = OrigRTC.prototype;
        Object.defineProperty(HookedRTC, 'name', {value: 'RTCPeerConnection'});
        window.RTCPeerConnection = HookedRTC;
        if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = HookedRTC;

        // Publicar stats cada segundo via CustomEvent al isolated world
        setInterval(async () => {
          const pcs = window.__bgfnPCs;
          if (!pcs.length) return;
          const pc = pcs[pcs.length - 1];
          try {
            const stats = await pc.getStats();
            const result = {cp: null, video: null, audio: null, codecs: {}};
            stats.forEach(s => {
              if (s.type === 'candidate-pair' && s.currentRoundTripTime !== undefined) result.cp = s;
              if (s.type === 'inbound-rtp' && s.kind === 'video') result.video = s;
              if (s.type === 'inbound-rtp' && s.kind === 'audio') result.audio = s;
              if (s.type === 'codec') result.codecs[s.id] = s;
            });
            document.dispatchEvent(new CustomEvent('bgfn-rtc-stats', {detail: result}));
          } catch(_) {}
        }, 1000);

        console.log('[BGFN] RTC hook activo en página');

        // Sobreescribir el color de la barra de búsqueda
        // El selector de GFN usa _ngcontent dinámico en ::after del search-input-container
        // Lo interceptamos modificando las reglas CSS directamente
        document.addEventListener('bgfn-set-accent', (e) => {
          const accent = e.detail;
          if (!accent) return;
          const style = document.getElementById('bgfn-accent-override') || (() => {
            const s = document.createElement('style');
            s.id = 'bgfn-accent-override';
            document.head.appendChild(s);
            return s;
          })();
          // Sobreescribir TODAS las reglas que tengan el verde de NVIDIA
          style.textContent = '* { --mdc-theme-primary: ' + accent + ' !important; } ' +
            '.mdc-line-ripple::after { background-color: ' + accent + ' !important; } ' +
            'nv-app-bar .mdc-line-ripple::after { background-color: ' + accent + ' !important; } ' +
            '';
          
          // También modificar las reglas existentes en todos los stylesheets
          try {
            Array.from(document.styleSheets).forEach(sheet => {
              try {
                Array.from(sheet.cssRules || []).forEach(rule => {
                  if (rule.style && rule.style.borderBottomColor === 'rgb(118, 185, 0)') {
                    rule.style.setProperty('border-bottom-color', accent, 'important');
                  }
                  if (rule.style && rule.style.backgroundColor === 'rgb(118, 185, 0)') {
                    rule.style.setProperty('background-color', accent, 'important');
                  }
                });
              } catch(_) {}
            });
          } catch(_) {}
        });
      })();
    `;
    // Insertar lo antes posible
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  })();

  // ── ESTADÍSTICAS WEBRTC ───────────────────────────────────────────────────
  const STATS = (() => {
    let pc = null;
    let prev = {};
    let current = {
      ping: null, fps: null,
      bitrateVideo: null, bitrateAudio: null,
      packetsLost: null, jitter: null,
      resolution: null, codec: null,
      health: 'unknown', // good | warn | bad
    };

    // Escuchar stats publicadas por el hook de página via CustomEvent
    function hookRTC() {
      document.addEventListener('bgfn-rtc-stats', (e) => {
        const {cp, video, audio, codecs} = e.detail || {};

        // Ping
        if (cp) current.ping = Math.round((cp.currentRoundTripTime || 0) * 1000);

        // Video
        if (video) {
          current.fps = Math.round(video.framesPerSecond || 0);
          current.packetsLost = video.packetsLost || 0;
          current.jitter = Math.round((video.jitter || 0) * 1000);
          current.resolution = video.frameWidth && video.frameHeight
            ? video.frameWidth + '×' + video.frameHeight : null;

          // Bitrate video
          const prevVideo = prev['video'];
          if (prevVideo && video.bytesReceived > prevVideo.bytes) {
            const dt = (video.timestamp - prevVideo.ts) / 1000;
            const bps = (video.bytesReceived - prevVideo.bytes) * 8 / dt;
            current.bitrateVideo = Math.round(bps / 1_000_000 * 10) / 10;
          }
          prev['video'] = {bytes: video.bytesReceived, ts: video.timestamp};

          // Codec
          if (video.codecId && codecs[video.codecId]) {
            current.codec = codecs[video.codecId].mimeType?.replace('video/','') || null;
          }
        }

        // Audio bitrate
        if (audio) {
          const prevAudio = prev['audio'];
          if (prevAudio && audio.bytesReceived > prevAudio.bytes) {
            const dt = (audio.timestamp - prevAudio.ts) / 1000;
            const bps = (audio.bytesReceived - prevAudio.bytes) * 8 / dt;
            current.bitrateAudio = Math.round(bps / 1000);
          }
          prev['audio'] = {bytes: audio.bytesReceived, ts: audio.timestamp};
        }

        // Salud
        const ping = current.ping || 0;
        const lost = current.packetsLost || 0;
        const jitter = current.jitter || 0;
        if (ping > 150 || lost > 50 || jitter > 50) current.health = 'bad';
        else if (ping > 80 || lost > 10 || jitter > 20) current.health = 'warn';
        else if (ping > 0) current.health = 'good';

        updateStatsUI();
      });
    }

    function poll() {} // ya no necesario — eventos manejan el polling

    function updateStatsUI() {
      // Widget flotante
      const statsEl = document.getElementById('bgfn-float-stats');
      if (statsEl) {
        const healthColor = current.health==='good'?'#76b900':current.health==='warn'?'#f59e0b':'#ef4444';
        statsEl.innerHTML = [
          current.ping !== null ? `<span style="color:${healthColor};">⬤</span> ${current.ping}ms` : '',
          current.fps ? `${current.fps}fps` : '',
          current.bitrateVideo ? `${current.bitrateVideo}Mbps` : '',
          current.resolution || '',
        ].filter(Boolean).join(' · ');
      }

      // Página de estadísticas
      updateStatsPage();
    }

    function updateStatsPage() {
      const page = document.getElementById('bgfn-stats-content');
      if (!page) return;
      const healthColor = current.health==='good'?'#76b900':current.health==='warn'?'#f59e0b':'#ef4444';
      const healthLabel = current.health==='good'?t('health.good'):current.health==='warn'?t('health.fair'):t('health.poor');
      const na = '<span style="color:#555;">N/A</span>';

      page.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
          ${statCard('🟢 Latency', current.ping !== null ? current.ping+'ms' : na, healthColor)}
          ${statCard('🎬 FPS', current.fps || na, current.fps>=60?'#76b900':current.fps>=30?'#f59e0b':'#ef4444')}
          ${statCard('📡 Video', current.bitrateVideo ? current.bitrateVideo+' Mbps' : na, '#76b900')}
          ${statCard('🔊 Audio', current.bitrateAudio ? current.bitrateAudio+' kbps' : na, '#76b900')}
          ${statCard('📺 Resolution', current.resolution || na, '#ccc')}
          ${statCard('🎞 Codec', current.codec || na, '#ccc')}
          ${statCard('📦 Pkt lost', current.packetsLost !== null ? current.packetsLost : na, current.packetsLost>10?'#ef4444':'#76b900')}
          ${statCard('〰 Jitter', current.jitter !== null ? current.jitter+'ms' : na, current.jitter>20?'#f59e0b':'#76b900')}
        </div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px 14px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">${t('session.health')}</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:12px;height:12px;border-radius:50%;background:${healthColor};box-shadow:0 0 8px ${healthColor};"></div>
            <span style="font-size:14px;font-weight:bold;color:${healthColor};">${healthLabel}</span>
          </div>
        </div>
        ${!inGame ? `<div style="text-align:center;color:#555;font-size:12px;margin-top:16px;">${t('session.in_session')}</div>` : ''}
      `;
    }

    function statCard(label, value, color) {
      return `<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px;">
        <div style="font-size:9px;color:#555;margin-bottom:4px;">${label}</div>
        <div style="font-size:18px;font-weight:bold;color:${color};">${value}</div>
      </div>`;
    }

    return {
      init() {
        hookRTC();
        setInterval(poll, 1000); // poll vacío mantenido por compatibilidad
      },
      getCurrent() { return current; },
    };
  })();

  // ── WIDGETS ───────────────────────────────────────────────────────────────
  const WIDGETS = (() => {
    const WIDGET_TYPES = {
      ping:        { label:t('widget.type.ping'),         unit:'ms',   icon:'⬤', getValue: () => STATS.getCurrent().ping },
      fps:         { label:t('widget.type.fps'),          unit:'fps',  icon:'🎬', getValue: () => STATS.getCurrent().fps },
      bitrate:     { label:t('widget.type.bitrate'),      unit:'Mbps', icon:'📡', getValue: () => STATS.getCurrent().bitrateVideo },
      resolution:  { label:t('widget.type.resolution'),   unit:'',     icon:'📺', getValue: () => STATS.getCurrent().resolution },
      session:     { label:t('widget.type.session'),       unit:'',     icon:'⏱', getValue: () => sessionStart ? fmt(elapsed()) : null },
      remaining:   { label:t('widget.type.remaining'),     unit:'',     icon:'⏳', getValue: () => sessionStart ? fmt(Math.max(0, CFG.SESSION_LIMIT_MIN*60 - elapsed())) : null },
      clock:       { label:t('widget.type.clock'),        unit:'',     icon:'🕐', getValue: () => new Date().toLocaleTimeString(LANG.detectLang()==='es'?'es':'en',{hour12:false}) },
      health:      { label:t('widget.type.health'),     unit:'',     icon:'💚', getValue: () => STATS.getCurrent().health },
      jitter:      { label:t('widget.type.jitter'),       unit:'ms',   icon:'〰', getValue: () => STATS.getCurrent().jitter },
      packets:     { label:t('widget.type.packets'), unit:'',     icon:'📦', getValue: () => STATS.getCurrent().packetsLost },
    };

    const POSITIONS = {
      'top-left':      { label:t('pos.top-left'),  style:'top:8px;left:8px;align-items:flex-start;' },
      'top-center':    { label:t('pos.top-center'),      style:'top:8px;left:50%;transform:translateX(-50%);align-items:center;' },
      'top-right':     { label:t('pos.top-right'),     style:'top:8px;right:8px;align-items:flex-end;' },
      'bottom-left':   { label:t('pos.bottom-left'),   style:'bottom:8px;left:8px;align-items:flex-start;' },
      'bottom-center': { label:t('pos.bottom-center'),       style:'bottom:8px;left:50%;transform:translateX(-50%);align-items:center;' },
      'bottom-right':  { label:t('pos.bottom-right'),      style:'bottom:8px;right:8px;align-items:flex-end;' },
    };

    let widgets = []; // [{id, type, position}]
    let containers = {}; // position → DOM element

    function load() {
      try {
        widgets = JSON.parse(localStorage.getItem('bgfn_widgets') || '[]');
      } catch(_) { widgets = []; }
    }

    function save() {
      try { localStorage.setItem('bgfn_widgets', JSON.stringify(widgets)); } catch(_) {}
    }

    function getHealthColor(h) {
      return h === 'good' ? '#76b900' : h === 'warn' ? '#f59e0b' : h === 'bad' ? '#ef4444' : '#555';
    }

    function getWidgetAccent() {
      const mode = localStorage.getItem('bgfn_widget_color');
      if (mode === 'custom') return localStorage.getItem('bgfn_widget_custom_color') || '#76b900';
      // Usar el acento del tema activo
      try { return THEMES.getActive().colors.accent; } catch(_) { return '#76b900'; }
    }

    function getValueColor(type, value) {
      const accent = getWidgetAccent();
      if (type === 'ping') return value > 150 ? '#ef4444' : value > 80 ? '#f59e0b' : accent;
      if (type === 'fps') return value < 30 ? '#ef4444' : value < 60 ? '#f59e0b' : accent;
      if (type === 'health') return getHealthColor(value);
      if (type === 'packets') return value > 10 ? '#ef4444' : accent;
      if (type === 'jitter') return value > 20 ? '#f59e0b' : accent;
      return accent;
    }

    function buildContainers() {
      if (!document.body) { setTimeout(buildContainers, 100); return; }
      // Limpiar contenedores anteriores
      Object.values(containers).forEach(c => c.remove());
      containers = {};

      Object.entries(POSITIONS).forEach(([posId, pos]) => {
        const c = document.createElement('div');
        c.id = 'bgfn-wc-' + posId;
        c.style.cssText = [
          'position:fixed',
          'z-index:2147483646',
          'display:none',
          'flex-direction:column',
          'gap:4px',
          pos.style,
        ].join(';');
        document.body.appendChild(c);
        containers[posId] = c;
      });
    }

    function renderWidgets() {
      if (!Object.keys(containers).length) return; // contenedores no listos
      // Mostrar widgets cuando estamos en juego (fullscreen O no)
      if (!inGame) {
        Object.values(containers).forEach(c => c.style.display = 'none');
        return;
      }

      // Limpiar y reagrupar por posición
      Object.values(containers).forEach(c => { c.innerHTML = ''; c.style.display = 'none'; });

      const byPos = {};
      widgets.forEach(w => {
        if (!byPos[w.position]) byPos[w.position] = [];
        byPos[w.position].push(w);
      });

      Object.entries(byPos).forEach(([posId, wList]) => {
        const container = containers[posId];
        if (!container) return;
        container.style.display = 'flex';

        wList.forEach(w => {
          const def = WIDGET_TYPES[w.type];
          if (!def) return;
          const value = def.getValue();
          if (value === null || value === undefined) return;

          const el = document.createElement('div');
          const accent = getWidgetAccent();
          const accentRgb = accent.startsWith('#') ? 
            parseInt(accent.slice(1,3),16)+','+parseInt(accent.slice(3,5),16)+','+parseInt(accent.slice(5,7),16) 
            : '118,185,0';
          el.style.cssText = [
            'background:rgba(0,0,0,0.75)',
            'border:1px solid rgba('+accentRgb+',0.4)',
            'border-radius:5px',
            'padding:3px 8px',
            'font-family:monospace',
            'font-size:11px',
            'display:flex',
            'align-items:center',
            'gap:4px',
            'white-space:nowrap',
          ].join(';');

          const color = getValueColor(w.type, value);
          el.innerHTML = `<span style="color:${color};font-size:9px;">⬤</span><span style="color:#ccc;font-size:9px;">${def.label}</span><span style="color:${color};font-weight:bold;">${value}${def.unit ? ' '+def.unit : ''}</span>`;
          container.appendChild(el);
        });
      });
    }

    function addWidget(type, position) {
      const id = type + '_' + Date.now();
      widgets.push({id, type, position});
      save();
      renderWidgets();
      renderPanel();
    }

    function removeWidget(id) {
      widgets = widgets.filter(w => w.id !== id);
      save();
      renderWidgets();
      renderPanel();
    }

    function renderPanel() {
      const container = document.getElementById('bgfn-widgets-panel');
      if (!container) return;

      container.innerHTML = '';

      if (widgets.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'text-align:center;color:#555;font-size:12px;padding:16px 0;';
        empty.textContent = t('widget.empty');
        container.appendChild(empty);
        return;
      }

      widgets.forEach(w => {
        const def = WIDGET_TYPES[w.type];
        const pos = POSITIONS[w.position];
        if (!def || !pos) return;

        const row = document.createElement('div');
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:10px 12px;margin-bottom:6px;gap:8px;';

        // Info del widget
        const info = document.createElement('div');
        info.style.cssText = 'flex:1;min-width:0;';
        info.innerHTML = `
          <div style="font-size:13px;color:#ccc;">${def.icon} ${def.label}</div>
          <div style="font-size:9px;color:#555;margin-top:3px;">${pos.label}</div>`;

        // Selector de posición inline
        const posSelect = document.createElement('select');
        posSelect.style.cssText = 'background:#21262d;border:1px solid #30363d;color:#888;border-radius:5px;padding:4px 6px;font-size:10px;font-family:monospace;max-width:120px;';
        Object.entries(POSITIONS).forEach(([id, p]) => {
          const opt = document.createElement('option');
          opt.value = id;
          opt.textContent = p.label;
          opt.selected = id === w.position;
          posSelect.appendChild(opt);
        });
        posSelect.addEventListener('change', () => {
          w.position = posSelect.value;
          save();
          renderWidgets();
          // Actualizar el label sin re-renderizar todo
          info.querySelector('div:last-child').textContent = POSITIONS[w.position].label;
        });

        // Botón eliminar — addEventListener directo, sin onclick
        const delBtn = document.createElement('button');
        delBtn.style.cssText = 'background:#1c0000;border:1px solid #ef4444;color:#ef4444;border-radius:5px;padding:4px 10px;font-size:10px;cursor:pointer;font-family:monospace;flex-shrink:0;';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', () => removeWidget(w.id));

        row.appendChild(info);
        row.appendChild(posSelect);
        row.appendChild(delBtn);
        container.appendChild(row);
      });
    }

    function showAddModal() {
      const existing = document.getElementById('bgfn-widget-modal');
      if (existing) { existing.remove(); return; }

      const modal = document.createElement('div');
      modal.id = 'bgfn-widget-modal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.8);display:flex;align-items:flex-end;justify-content:center;';

      const typeOpts = Object.entries(WIDGET_TYPES).map(([id, def]) =>
        `<option value="${id}">${def.icon} ${def.label}</option>`).join('');
      const posOpts = Object.entries(POSITIONS).map(([id, pos]) =>
        `<option value="${id}">${pos.label}</option>`).join('');

      modal.innerHTML = `
        <div style="background:#0d1117;border:2px solid #76b900;border-radius:18px 18px 0 0;padding:20px;width:100%;max-width:420px;font-family:monospace;">
          <div style="font-size:13px;font-weight:bold;color:#76b900;margin-bottom:16px;letter-spacing:1px;">${t('widget.add_title')}</div>
          <div style="margin-bottom:12px;">
            <div style="font-size:9px;color:#555;margin-bottom:6px;">${t('widget.data_type')}</div>
            <select id="bgfn-w-type" style="width:100%;background:#161b22;border:1px solid #30363d;color:#ccc;padding:10px;border-radius:6px;font-family:monospace;font-size:13px;">${typeOpts}</select>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:9px;color:#555;margin-bottom:6px;">${t('widget.position')}</div>
            <select id="bgfn-w-pos" style="width:100%;background:#161b22;border:1px solid #30363d;color:#ccc;padding:10px;border-radius:6px;font-family:monospace;font-size:13px;">${posOpts}</select>
          </div>
          <div style="display:flex;gap:8px;">
            <button id="bgfn-w-cancel" style="flex:1;background:#21262d;color:#ccc;border:1px solid #30363d;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;cursor:pointer;">${t('btn.cancel')}</button>
            <button id="bgfn-w-confirm" style="flex:1;background:#76b900;color:#000;border:none;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;font-weight:bold;cursor:pointer;">${t('btn.add').replace('+ ','')}</button>
          </div>
        </div>`;

      document.body.appendChild(modal);
      document.getElementById('bgfn-w-cancel').addEventListener('click', () => modal.remove());
      document.getElementById('bgfn-w-confirm').addEventListener('click', () => {
        const type = document.getElementById('bgfn-w-type').value;
        const position = document.getElementById('bgfn-w-pos').value;
        addWidget(type, position);
        modal.remove();
        showToast(t('widget.added'), 'ok', 2000);
      });
      modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });
    }

    return {
      init() {
        load();
        buildContainers();
        renderWidgets();
        setInterval(() => {
          // Reconstruir contenedores si se perdieron
          if (!document.getElementById('bgfn-wc-top-left')) buildContainers();
          renderWidgets();
        }, 500); // cada 500ms para ser más reactivo
      },
      rebuild() {
        const missing = Object.values(containers).some(c => !document.body.contains(c));
        if (missing || !Object.keys(containers).length) buildContainers();
        renderWidgets();
      },
      getContainers() { return containers; },
      reload() { load(); renderWidgets(); renderPanel(); },
      applyTheme(color) {
        try { localStorage.setItem('bgfn_widget_accent', color); } catch(_) {}
        renderWidgets();
      },
      renderPanel,
      showAdd: showAddModal,
      remove: removeWidget,
      TYPES: WIDGET_TYPES,
      POSITIONS,
    };
  })();

  // ── TEMAS ─────────────────────────────────────────────────────────────────
  const THEMES = (() => {
    const PRESET_THEMES = {
      '1': {
        name: t('theme.name.oled'),
        emoji: '⚫',
        colors: { bg: '#000000', surface: '#0a0a0a', accent: '#76b900', text: '#ffffff', textMuted: '#888888', border: '#1a1a1a' }
      },
      '2': {
        name: t('theme.name.nord'),
        emoji: '🔵',
        colors: { bg: '#2e3440', surface: '#3b4252', accent: '#88c0d0', text: '#eceff4', textMuted: '#9099aa', border: '#434c5e' }
      },
      '3': {
        name: t('theme.name.dracula'),
        emoji: '🟣',
        colors: { bg: '#282a36', surface: '#343746', accent: '#bd93f9', text: '#f8f8f2', textMuted: '#6272a4', border: '#44475a' }
      },
      '4': {
        name: t('theme.name.catppuccin'),
        emoji: '🌸',
        colors: { bg: '#1e1e2e', surface: '#313244', accent: '#cba6f7', text: '#cdd6f4', textMuted: '#7f849c', border: '#45475a' }
      },
      '5': {
        name: t('theme.name.tokyo'),
        emoji: '🌃',
        colors: { bg: '#1a1b26', surface: '#24283b', accent: '#7aa2f7', text: '#c0caf5', textMuted: '#565f89', border: '#2f3549' }
      },
      '6': {
        name: t('theme.name.onedark'),
        emoji: '🔘',
        colors: { bg: '#21252b', surface: '#282c34', accent: '#61afef', text: '#abb2bf', textMuted: '#5c6370', border: '#3a3f4b' }
      },
      '7': {
        name: t('theme.name.solarized'),
        emoji: '🌅',
        colors: { bg: '#002b36', surface: '#073642', accent: '#859900', text: '#839496', textMuted: '#586e75', border: '#0d3c48' }
      },
      '8': {
        name: t('theme.name.nvidia'),
        emoji: '🟢',
        colors: { bg: '#0d1117', surface: '#161b22', accent: '#76b900', text: '#ffffff', textMuted: '#555555', border: '#30363d' }
      },
    };

    let activeTheme = '8'; // 1-99: presets, 100+: custom, preview: temporal, online_*: comunidad
    let customTheme = null;
    let previewMode = false;
    let originalStyles = {};

    function load() {
      try {
        const saved = JSON.parse(localStorage.getItem('bgfn_theme') || '{}');
        if (saved.active) activeTheme = saved.active;
        if (saved.custom) customTheme = saved.custom;
      } catch(_) {}
    }

    function save() {
      try { localStorage.setItem('bgfn_theme', JSON.stringify({active: activeTheme, custom: customTheme})); } catch(_) {}
    }

    function getActive() {
      // IDs 1-99: presets, 100+: custom local, 'preview': preview temporal, online_*: comunidad
      if (PRESET_THEMES[activeTheme]) return PRESET_THEMES[activeTheme];
      // Custom (100+) o preview — buscar en customTheme o lista guardada
      if (customTheme && (activeTheme === customTheme.id || activeTheme === 'preview')) return customTheme;
      // Buscar en lista de custom guardados
      try {
        const list = JSON.parse(localStorage.getItem('bgfn_custom_themes') || '[]');
        const found = list.find(t => t.id === activeTheme);
        if (found) return found;
      } catch(_) {}
      return PRESET_THEMES['8']; // fallback NVIDIA Green
    }

    function applyToGFN(colors, preview = false) {
      // Esperar a que document.head esté disponible
      const target = document.head || document.documentElement;
      if (!target) { setTimeout(() => applyToGFN(colors, preview), 100); return; }

      let styleEl = document.getElementById('bgfn-theme-style');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'bgfn-theme-style';
        target.appendChild(styleEl);
      }
      styleEl.textContent = `
        /* ═══════════════════════════════════════════════
           BGFN THEME ENGINE
           Orden: Fondos → Surface → Textos → Acentos → Componentes específicos
        ═══════════════════════════════════════════════ */

        /* ── FONDOS BASE ── */
        html,
        body,
        gfn-root,
        gfn-mall,
        gfn-navigation,
        .common-window-content,
        .mat-drawer-container,
        .mat-drawer-content,
        .common-container-overflow,
        .mat-drawer-container-explicit-backdrop { background-color: ${colors.bg} !important; }

        /* ── SURFACE (topbar, drawer, cards) ── */
        .main-toolbar,
        mat-toolbar,
        nv-app-bar,
        .appbar,
        .default-color,
        [class*="appbar"],
        [class*="app-bar"],
        .mat-drawer.main-sidebar-drawer,
        .mat-mdc-menu-panel,
        .mat-menu-panel,
        .cdk-overlay-pane .mat-mdc-menu-panel,
        mat-sidenav.filter-sidepanel,
        .filter-sidepanel,
        mat-expansion-panel.overlay-screen-mode,
        .filter-panel-groups,
        .search-input-container { background-color: ${colors.surface} !important; }

        /* Configuración — exterior bg, cards internas (settings-container) surface */
        gfn-settings { background-color: ${colors.bg} !important; }
        .settings-container,
        .new-settings-layout { background-color: ${colors.surface} !important; color: ${colors.text} !important; }
        gfn-settings .settings-button-link,
        gfn-settings mat-card,
        gfn-settings [class*="mat-card"] { background-color: ${colors.surface} !important; }

        /* Icono activo en tabs de configuración */
        .tab-button.selected-tab mat-icon,
        .tab-button.selected-tab .mat-icon { color: ${colors.accent} !important; }

        /* ── GRID Y PÁGINA PRINCIPAL ── */
        .games-grid-scroll-container,
        .gfngames-gfn-nav-page { background-color: ${colors.bg} !important; }

        /* ── CARDS DE JUEGOS ── */
        .gfngames-gfn-tile-card,
        .gfngames-gfn-tile-card.mobile-view { background-color: ${colors.surface} !important; }
        .game-title { background-color: ${colors.surface} !important; color: ${colors.text} !important; }
        /* gfngames-gfn-tile-card-tray-text solo para cards normales, no integration */
        .gfngames-gfn-tile-card-tray-text:not(.integration-tile-card *) { background-color: ${colors.surface} !important; color: ${colors.text} !important; }

        /* ── PROMO TAGS en cards pequeñas (Nueva Temporada, -60%, Gratis, etc) ── */
        .gfngames-gfn-tile-promo-tag-border { background-color: ${colors.accent} !important; }
        .gfngames-gfn-tile-promo-tag-container { background-color: ${colors.surface} !important; }
        .gfngames-gfn-tile-promo-tag { color: ${colors.text} !important; }

        /* ── PROMO TAGS en carrusel hero (marquee) — clases distintas ── */
        .marquee-promo-tag-border { background-color: ${colors.accent} !important; }
        .marquee-promo-tag-container { background-color: ${colors.surface} !important; }
        .marquee-promo-tag { color: ${colors.text} !important; }

        /* ── TILE DE CONEXIONES ── */
        /* Ocultar tray "Conexiones" — solo la imagen */
        /* Card de conexiones — recortar al tamaño exacto de la imagen */
        .integration-tile-card {
          overflow: hidden !important;
          max-height: 104px !important;
        }
        /* Imagen de conexiones cubre todo el container */
        .integration-tile-img { width: 100% !important; object-fit: cover !important; }

        /* ── DETALLE DE JUEGO ── */
        /* game-details y evidence-panel-container usan bg para unificarse con el fondo */
        .game-details,
        .game-detail-host-container,
        .evidence-panel-container { background-color: ${colors.bg} !important; }
        /* el modal (dialog) usa surface */
        .mat-mdc-dialog-surface,
        .mdc-dialog__surface { background-color: ${colors.surface} !important; }

        /* ── CHIPS DE FILTRO ACTIVOS ── */
        /* filter-chips es la barra con chips "Mi biblioteca × " etc */
        .filter-chips,
        .mat-mdc-chip-set,
        .mdc-evolution-chip-set__chips,
        mat-chip-row,
        .mat-mdc-chip.mat-primary,
        .mdc-evolution-chip { background-color: ${colors.surface} !important; color: ${colors.text} !important; }
        /* botón X dentro del chip */
        .mat-mdc-chip-remove { color: ${colors.textMuted} !important; }

        /* ── FILTER TILES ── */
        .filter-tile-content,
        [class*="filter-tile"] { background-color: ${colors.surface} !important; }

        /* ── CONFIGURACIÓN ── */
        /* botones de sección (Cuenta / Conexiones / Modo de juego) */
        .settings-button-link { background-color: ${colors.surface} !important; }
        .settings-button-link-text { background-color: ${colors.surface} !important; color: ${colors.text} !important; }
        /* tab activo usa clase selected-tab */
        .tab-button.selected-tab,
        .tab-button.selected-tab .mdc-button__label { color: ${colors.accent} !important; }
        /* border-bottom directo en el botón — más específico que ::after */
        .tab-button { border-bottom: 2px solid transparent !important; }
        .tab-button.selected-tab { border-bottom: 2px solid ${colors.accent} !important; }

        /* ── DROPDOWNS ── */
        .mat-mdc-menu-item,
        .mat-mdc-menu-item span { color: ${colors.text} !important; }

        /* ── DIVIDERS ── */
        mat-divider,
        .mat-divider,
        .grid-divider,
        [class*="divider"], hr { border-color: ${colors.border} !important; }

        /* ── MENÚ LATERAL NATIVO GFN ── */
        /* dummy-color-getter es el elemento que GFN lee para aplicar el acento (underline búsqueda, etc) */
        .dummy-color-getter { background-color: ${colors.accent} !important; color: ${colors.accent} !important; }
        /* Underline barra de búsqueda — solo el caret y border */
        .search-input-container { border-bottom: 2px solid ${colors.accent} !important; }
        input.search-input { caret-color: ${colors.accent} !important; }

        /* Items del drawer — forzar color y opacidad máxima */
        .nv-item-button-container,
        .nv-item-button-container .font-body2,
        .nv-item-labels,
        .nv-item-labels span,
        .nv-item-icon,
        .nv-item-icon mat-icon { color: ${colors.text} !important; opacity: 1 !important; filter: none !important; }

        .gfn-section-title,
        [class*="section-title"],
        .toolbar-title-text,
        .font-body1, .font-body2, .font-sub1, .font-sub2 { color: ${colors.text} !important; }

        .font-caption,
        .font-body3 { color: ${colors.textMuted} !important; }

        /* ── HOVER MENÚ ── */
        .nv-item-button-container:hover { background-color: ${colors.accent}22 !important; }

        /* ── BACKDROP ── */
        .mat-drawer-backdrop.mat-drawer-shown { background-color: ${colors.bg}99 !important; }

        /* ── LINKS ── */
        a, a:visited { color: ${colors.accent} !important; }
        *:focus-visible { outline-color: ${colors.accent} !important; }

        /* ══════════════════════════════════════════════
           ACENTOS — verde NVIDIA → color del tema
        ══════════════════════════════════════════════ */

        /* tabs activos (nav principal) */
        .mdc-tab-indicator .mdc-tab-indicator__content--underline,
        .mat-mdc-tab .mdc-tab-indicator__content { border-color: ${colors.accent} !important; background-color: ${colors.accent} !important; }
        .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label,
        .mat-mdc-tab.mdc-tab--active { color: ${colors.accent} !important; }

        /* botones primarios */
        .mdc-button--raised,
        .mdc-button--unelevated,
        .mat-mdc-raised-button,
        .mdc-button--unelevated.mat-primary,
        .marquee-tile-action-button { background-color: ${colors.accent} !important; color: #000 !important; }

        /* progress bars */
        .mdc-linear-progress__bar-inner,
        mat-progress-bar .mdc-linear-progress__bar-inner { border-color: ${colors.accent} !important; }

        /* spinner */
        mat-progress-spinner circle,
        mat-spinner circle,
        .mdc-circular-progress circle { stroke: ${colors.accent} !important; }

        /* carrusel — puntos */
        ul.marquee-indicators li { background-color: ${colors.textMuted} !important; }
        ul.marquee-indicators li.active { background-color: ${colors.accent} !important; }
        .carousel-button::after,
        .carousel-button-prev::after,
        .carousel-button-next::after { background-color: ${colors.surface} !important; }

        /* evidence highlighter (rayitas de color en detalle) */
        .evidence-panel-highlighter { background-color: ${colors.accent} !important; }

        /* underline del input de búsqueda al hacer focus */
        .mdc-text-field--filled .mdc-line-ripple::after,
        .mat-mdc-form-field .mdc-line-ripple::after { border-bottom-color: ${colors.accent} !important; }

        /* ── VARIABLES MDC (toggle, checkbox, slider, text-field) ── */
        * {
          --mdc-switch-selected-track-color: ${colors.accent} !important;
          --mdc-switch-selected-hover-track-color: ${colors.accent} !important;
          --mdc-switch-selected-pressed-track-color: ${colors.accent} !important;
          --mdc-switch-selected-focus-track-color: ${colors.accent} !important;
          --mdc-switch-selected-handle-color: #fff !important;
          --mdc-switch-selected-hover-handle-color: #fff !important;
          --mdc-switch-selected-pressed-handle-color: #fff !important;
          --mdc-switch-selected-focus-handle-color: #fff !important;
          --mdc-switch-unselected-track-color: ${colors.border} !important;
          --mdc-switch-unselected-handle-color: ${colors.textMuted} !important;

          --mdc-filled-text-field-active-indicator-color: ${colors.accent} !important;
          --mdc-filled-text-field-focus-active-indicator-color: ${colors.accent} !important;
          --mdc-filled-text-field-container-color: ${colors.surface} !important;
          --mdc-filled-text-field-label-text-color: ${colors.textMuted} !important;

          --mat-tab-header-active-label-text-color: ${colors.accent} !important;
          --mat-tab-header-active-ripple-color: ${colors.accent} !important;
          --mat-tab-header-ink-bar-color: ${colors.accent} !important;
          --mdc-tab-indicator-active-indicator-color: ${colors.accent} !important;

          --mdc-checkbox-selected-checkmark-color: #000 !important;
          --mdc-checkbox-selected-focus-icon-color: ${colors.accent} !important;
          --mdc-checkbox-selected-hover-icon-color: ${colors.accent} !important;
          --mdc-checkbox-selected-icon-color: ${colors.accent} !important;
          --mdc-checkbox-selected-pressed-icon-color: ${colors.accent} !important;

          --mat-slider-value-indicator-color: ${colors.accent} !important;
          --mdc-slider-handle-color: ${colors.accent} !important;
          --mdc-slider-active-track-color: ${colors.accent} !important;

          --mdc-protected-button-container-color: ${colors.accent} !important;
          --mdc-filled-button-container-color: ${colors.accent} !important;
          --mdc-protected-button-label-text-color: #000 !important;
          --mdc-filled-button-label-text-color: #000 !important;
        }

        /* ── OVERLAY tile no seleccionado ── */
        .not-selected-state-overlay { background-color: rgba(0,0,0,0.3) !important; }

        /* ── BGFN UI ── */
        :root { --bgfn-accent: ${colors.accent}; }
        #bgfn-panel { background: ${colors.bg} !important; border-color: ${colors.accent} !important; }
        #bgfn-fab { background: ${colors.accent} !important; color: #000 !important; }
        /* floating-nav — fondo oscuro semitransparente para que el texto sea legible en todos los temas */
        #bgfn-floating-nav { background: rgba(0,0,0,0.35) !important; }
        /* Colores del nav BGFN — siempre blanco fijo independiente del tema */
        #bgfn-floating-nav button { color: #fff !important; background: transparent !important; }
        #bgfn-floating-nav button:hover { background: rgba(255,255,255,0.1) !important; }
        #bgfn-floating-nav button svg,
        #bgfn-floating-nav button span { color: #fff !important; opacity: 1 !important; fill: #fff !important; }
      `;
    }

    function removeFromGFN() {
      const el = document.getElementById('bgfn-theme-style');
      if (el) el.remove();
    }

    function apply() {
      const theme = getActive();
      if (activeTheme === '8') { removeFromGFN(); return; } // NVIDIA Green = sin tema
      applyToGFN(theme.colors);
      applyToBGFNPanel(theme.colors);
      forceRepaintBadges();
    }

    function forceRepaintBadges() {
      const colors = getActive().colors;
      // Modificar directamente las reglas CSS de Angular que tienen _ngcontent
      // Estas tienen mayor especificidad que nuestro CSS y no podemos sobreescribirlas normalmente
      try {
        Array.from(document.styleSheets).forEach(sheet => {
          try {
            Array.from(sheet.cssRules || []).forEach(rule => {
              if (!rule.style) return;
              const sel = rule.selectorText || '';
              // Badge border del carrusel y cards — Angular inyecta el color con !important
              if ((sel.includes('marquee-promo-tag-border') || sel.includes('gfn-tile-promo-tag-border')) 
                  && sel.includes('_ngcontent')) {
                rule.style.setProperty('background-color', colors.accent, 'important');
              }
              // Container del badge
              if ((sel.includes('marquee-promo-tag-container') || sel.includes('gfn-tile-promo-tag-container'))
                  && sel.includes('_ngcontent') && !sel.includes('promo-tag-border') && !sel.includes('promo-tag[')) {
                rule.style.setProperty('background-color', colors.surface, 'important');
              }
              // Dots del carrusel — buscar por marquee-indicators li
              if (sel.includes('marquee-indicators')) {
                if (sel.includes('.active') || sel.includes('[class*="active"]')) {
                  rule.style.setProperty('background-color', colors.accent, 'important');
                } else if (sel.includes(' li') && !sel.includes('.active')) {
                  rule.style.setProperty('background-color', colors.textMuted, 'important');
                }
              }
            });
          } catch(_) {}
        });
      } catch(_) {}
    }

    function forceGFNCSSReload() {
      // Overlay suave mientras se recarga el CSS
      let overlay = document.getElementById('bgfn-reload-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'bgfn-reload-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,0);transition:background 0.2s;pointer-events:none;';
        document.body.appendChild(overlay);
      }
      // Fade in
      overlay.style.background = 'rgba(0,0,0,0.4)';

      setTimeout(() => {
        // Remover style para que Angular re-evalúe
        const styleEl = document.getElementById('bgfn-theme-style');
        if (styleEl) styleEl.remove();

        setTimeout(() => {
          // Re-inyectar con nuevo tema
          THEMES.apply();
          forceRepaintBadges();
          setTimeout(() => {
            forceRepaintBadges();
            // Fade out overlay
            overlay.style.background = 'rgba(0,0,0,0)';
            setTimeout(() => overlay.remove(), 200);
          }, 150);
        }, 80);
      }, 100);
    }

    function applyToBGFNPanel(colors) {
      const target = document.head || document.documentElement;
      if (!target) return;
      let panelStyle = document.getElementById('bgfn-panel-theme');
      if (!panelStyle) {
        panelStyle = document.createElement('style');
        panelStyle.id = 'bgfn-panel-theme';
        target.appendChild(panelStyle);
      }
      // Actualizar elementos dinámicos con nuevo acento
      const _vpnDot = document.getElementById('bgfn-vpn-dot');
      const _vpnStr = document.getElementById('bgfn-vpn-strong');
      const _vpnOk  = document.getElementById('bgfn-vpn-ok');
      const _vpnEl  = document.getElementById('bgfn-vpn-notice');
      if (_vpnDot) _vpnDot.style.color = colors.accent;
      if (_vpnStr) _vpnStr.style.color = colors.accent;
      if (_vpnOk)  _vpnOk.style.background = colors.accent;
      if (_vpnEl)  _vpnEl.style.borderColor = colors.accent;
      const _rd = document.getElementById('bgfn-gp-remap-dot');
      if (_rd && document.getElementById('bgfn-gp-remap')?.checked) _rd.style.background = colors.accent;
      const _sd = document.getElementById('bgfn-gp-swap-dot');
      if (_sd && document.getElementById('bgfn-gp-swapAB')?.checked) _sd.style.background = colors.accent;
      const _bar = document.getElementById('bgfn-bar');
      if (_bar) _bar.style.background = colors.accent;
      const _rem = document.getElementById('bgfn-remaining');
      if (_rem) _rem.style.color = colors.accent;

      panelStyle.textContent = `
        #bgfn-panel { border-color: ${colors.accent} !important; }
        #bgfn-panel span[style*="#76b900"], #bgfn-panel div[style*="#76b900"] { color: ${colors.accent} !important; }
        #bgfn-panel button[style*="background:#76b900"], #bgfn-panel button[style*="background: #76b900"] { background: ${colors.accent} !important; }
        #bgfn-panel [style*="color:#76b900"] { color: ${colors.accent} !important; }
        #bgfn-panel [style*="background:#76b900"] { background: ${colors.accent} !important; }
        #bgfn-panel [style*="border-color:#76b900"], #bgfn-panel [style*="border: 1px solid #76b900"] { border-color: ${colors.accent} !important; }
        #bgfn-panel [style*="border:1px solid #76b900"] { border-color: ${colors.accent} !important; }
        #bgfn-close { border-color: #30363d !important; }
        #bgfn-fab { background: ${colors.accent} !important; }
      `;
    }

    function loadCustomThemes() {
      // Solo retorna la lista — NO añade a PRESET_THEMES para evitar duplicados
      try { return JSON.parse(localStorage.getItem('bgfn_custom_themes')||'[]'); } catch(_) { return []; }
    }

    function buildThemePage() {
      const theme = getActive();
      const c = theme.colors;

      // Mockup mini de GFN con los colores del tema
      function gfnMockup(colors) {
        return `
          <div style="border-radius:8px;overflow:hidden;border:1px solid ${colors.border};font-family:sans-serif;font-size:11px;">
            <!-- Topbar -->
            <div style="background:${colors.surface};padding:8px 10px;display:flex;align-items:center;gap:8px;border-bottom:1px solid ${colors.border};">
              <div style="width:8px;height:8px;border-radius:50%;background:${colors.accent};"></div>
              <span style="color:${colors.text};font-size:10px;font-weight:bold;">Games</span>
              <div style="margin-left:auto;width:16px;height:16px;border-radius:50%;background:${colors.textMuted};opacity:0.5;"></div>
            </div>
            <!-- Content -->
            <div style="background:${colors.bg};padding:8px 10px;">
              <div style="font-size:9px;color:${colors.text};margin-bottom:6px;font-weight:bold;">My favorites</div>
              <div style="display:flex;gap:4px;margin-bottom:8px;">
                <!-- Card con badge -->
                <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
                  <div style="height:36px;background:linear-gradient(135deg,${colors.accent}44,${colors.surface});position:relative;">
                    <div style="position:absolute;top:2px;left:2px;background:${colors.surface};border-radius:2px;display:flex;align-items:center;gap:2px;padding:1px 3px;">
                      <div style="width:2px;height:8px;background:${colors.accent};border-radius:1px;"></div>
                      <span style="font-size:6px;color:${colors.text};">New</span>
                    </div>
                  </div>
                  <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 1</div>
                </div>
                <!-- Card normal -->
                <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
                  <div style="height:36px;background:linear-gradient(135deg,${colors.textMuted}33,${colors.surface});"></div>
                  <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 2</div>
                </div>
                <!-- Card normal -->
                <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
                  <div style="height:36px;background:linear-gradient(135deg,${colors.border},${colors.surface});"></div>
                  <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 3</div>
                </div>
              </div>
              <!-- Botón JUGAR -->
              <div style="background:${colors.accent};color:#000;border-radius:3px;padding:3px 8px;display:inline-block;font-size:8px;font-weight:bold;">PLAY</div>
            </div>
          </div>`;
      }

      // Widget preview simulando stream
      function widgetPreview(colors, widgetType) {
        const widgets = {
          ping:      { label:'PING', value:'24ms',  icon:'●' },
          fps:       { label:t('widget.type.fps'),  value:'60',    icon:'◈' },
          bitrate:   { label:'MBPS', value:'20.4',  icon:'▲' },
          jitter:    { label:'JITTER','value':'2ms',icon:'~' },
          time:      { label:'TIEMPO','value':'12:34',icon:'⏱' },
          clock:     { label:'RELOJ','value':'15:42',icon:'🕒' },
        };
        const w = widgets[widgetType] || widgets.ping;
        return `
          <div style="position:relative;border-radius:6px;overflow:hidden;background:#000;height:80px;display:flex;align-items:flex-start;justify-content:flex-start;padding:6px;">
            <div style="background:rgba(0,0,0,0.7);border:1px solid ${colors.accent};border-radius:4px;padding:4px 8px;display:flex;flex-direction:column;align-items:center;">
              <div style="font-size:7px;color:${colors.accent};letter-spacing:1px;">${w.label}</div>
              <div style="font-size:14px;color:${colors.accent};font-weight:bold;line-height:1.2;">${w.value}</div>
            </div>
            <div style="position:absolute;bottom:4px;right:6px;font-size:8px;color:#ffffff44;">STREAM PREVIEW</div>
          </div>`;
      }

      return `
        <div id="bgfn-themes-page" style="font-family:monospace;color:#fff;">

          <!-- TEMA ACTIVO + PREVIEW -->
          <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
              <div id="bgfn-active-theme-square" style="width:28px;height:28px;border-radius:6px;background:${c.bg};border:2px solid ${c.accent};flex-shrink:0;"></div>
              <div style="flex:1;">
                <div id="bgfn-active-theme-name" style="font-size:13px;color:#fff;font-weight:bold;">${theme.emoji || '🎨'} ${theme.name}</div>
                <div id="bgfn-active-theme-accent" style="font-size:9px;color:#555;margin-top:1px;">${t('theme.accent')}: ${c.accent}</div>
              </div>
            </div>
            <!-- Preview mockup -->
            <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:6px;">${t('theme.preview')}</div>
            <div id="bgfn-theme-mockup">${gfnMockup(c)}</div>
          </div>

          <!-- GRID DE TEMAS -->
          <div style="font-size:9px;color:#555;letter-spacing:2px;margin-bottom:10px;">${t('themes.title')}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;" id="bgfn-theme-grid"></div>

          <!-- EDITOR CUSTOM -->
          <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px;margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <div style="font-size:11px;color:#ccc;font-weight:bold;">🎨 ${t('theme.custom_section')}</div>
              <button id="bgfn-theme-edit-btn" style="background:#21262d;color:${c.accent};border:1px solid ${c.accent};border-radius:5px;padding:5px 10px;font-family:monospace;font-size:10px;cursor:pointer">${t('themes.create')}</button>
            </div>
            <div id="bgfn-theme-editor" style="display:none;"></div>
          </div>

          <!-- WIDGETS EN STREAM -->
          <div style="font-size:9px;color:#555;letter-spacing:2px;margin-bottom:10px;">${t('widgets.stream')}</div>
          <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:12px;margin-bottom:8px;">
            <!-- Selector de widget -->
            <div style="font-size:9px;color:#555;margin-bottom:6px;">${t('widgets.select')}</div>
            <select id="bgfn-widget-preview-select" style="width:100%;background:#0d1117;border:1px solid #30363d;color:#ccc;padding:8px;border-radius:6px;font-family:monospace;font-size:12px;margin-bottom:10px;">
              <option value="ping">● Ping / Latency</option>
              <option value="fps">◈ FPS</option>
              <option value="bitrate">▲ Bitrate</option>
              <option value="jitter">~ Jitter</option>
              <option value="time">⏱ ${t('widget.type.session')}</option>
              <option value="clock">🕒 ${t('widget.type.clock')}</option>
            </select>
            <!-- Preview del widget en stream -->
            <div style="font-size:9px;color:#555;margin-bottom:6px;">${t('widgets.preview')}</div>
            <div id="bgfn-widget-stream-preview">${widgetPreview(c, 'ping')}</div>
            <!-- Color del widget -->
            <div style="margin-top:10px;font-size:9px;color:#555;margin-bottom:6px;">${t('widgets.color')}</div>
            <div id="bgfn-widget-color-opts" style="display:flex;flex-direction:column;gap:8px;"></div>
          </div>

        </div>`;
    }

    return {
      init() { load(); apply(); },
      apply,
      getActive,
      getPresets() { return PRESET_THEMES; },
      setActive(id) { activeTheme = id; save(); apply(); },
      setCustom(colors, id, name) {
        customTheme = { id: id || 'preview', name: name || 'Custom', emoji: '🎨', colors };
        activeTheme = id || 'preview';
        save(); apply();
      },
      buildPage: buildThemePage,
      applyPreview(colors) { applyToGFN(colors, true); },
      removePreview() { apply(); },
      reloadCSS: forceGFNCSSReload,
      repaintBadges: forceRepaintBadges,
      getCustomList: loadCustomThemes,
      getActiveId() { return activeTheme; },
    };
  })();

  // ── ACCENT HELPER ─────────────────────────────────────────────────────────
  function accent() {
    try { return THEMES.getActive().colors.accent; } catch(_) { return '#76b900'; }
  }

  // ── SESIÓN ─────────────────────────────────────────────────────────────────
  function onSessionActive(sessId) {
    if (sessId===currentSessId && sessionStart) return;
    try {
      const saved = JSON.parse(localStorage.getItem('bgfn_session')||'null');
      if (saved && saved.sessId===sessId && saved.startTime) {
        sessionStart = saved.startTime; // Recuperar timer tras recarga
      } else {
        sessionStart = Date.now();
        localStorage.setItem('bgfn_session', JSON.stringify({sessId, startTime:sessionStart}));
      }
    } catch(_) { sessionStart = Date.now(); }
    currentSessId=sessId; inGame=true;
    alertedWarn=elapsed()/60>=CFG.WARN_AT_MIN;
    alertedDanger=elapsed()/60>=CFG.DANGER_AT_MIN;
    closePanel(); updateLayout();
    // Reconstruir contenedores de widgets si se perdieron al recargar
    WIDGETS.rebuild();
    showToast(t('session.started'),'ok',2000);
    if (!alertedVPN) { alertedVPN=true; setTimeout(showVPNNotice,1500); }
  }

  function onSessionEnded() {
    if (!sessionStart && !inGame) return;
    sessionStart=null; currentSessId=null; inGame=false; isFullscreen=false;
    alertedWarn=false; alertedDanger=false; alertedVPN=false;
    try { localStorage.removeItem('bgfn_session'); } catch(_) {}
    updateLayout();
    ['bgfn-session','bgfn-remaining'].forEach(id=>{const el=get(id);if(el)el.textContent='--:--';});
    get('bgfn-bar')?.style && (get('bgfn-bar').style.width='0%');
    setStatus('idle'); showToast(t('session.ended'),'warn',3000); hideVPNNotice();
  }

  // ── VPN NOTICE ─────────────────────────────────────────────────────────────
  function showVPNNotice() {
    if (localStorage.getItem('bgfn_vpn_notice') === 'off') return;
    const el=get('bgfn-vpn-notice'); if(!el)return;
    el.style.display='flex'; el.style.opacity='0'; el.style.transform='translateX(-50%) translateY(-20px)';
    setTimeout(()=>{ el.style.transition='opacity .4s,transform .4s'; el.style.opacity='1'; el.style.transform='translateX(-50%) translateY(0)'; },50);
    setTimeout(hideVPNNotice,12000);
  }
  function hideVPNNotice() {
    const el=get('bgfn-vpn-notice'); if(!el)return;
    el.style.opacity='0'; el.style.transform='translateX(-50%) translateY(-20px)';
    setTimeout(()=>{ el.style.display='none'; },400);
  }

  // ── LAYOUT ─────────────────────────────────────────────────────────────────
  function updateLayout() {
    const fab=get('bgfn-fab');
    if (!fab) return;
    // FAB visible solo cuando no estamos en juego y el panel está cerrado
    if (!inGame) {
      fab.style.display = panelOpen ? 'none' : 'flex';
    } else {
      fab.style.display = 'none';
    }
  }

  // ── PANEL ──────────────────────────────────────────────────────────────────
  function openPanel()  { const o=get('bgfn-overlay'),p=get('bgfn-panel'),f=get('bgfn-fab'); if(!o||!p)return; panelOpen=true;  o.style.display='block'; p.style.transform='translateY(0)';    p.style.opacity='1'; if(f)f.style.display='none';          GAMEPAD.updateUI(); WIDGETS.renderPanel(); setTimeout(() => {
    const ac = accent();
    // Regenerar botones de prioridad con color correcto
    const prioContainer = get('bgfn-pg-prio-container');
    if (prioContainer && prioContainer.children.length > 0) {
      try {
        const cfg = JSON.parse(localStorage.getItem('bgfn_pregame_cfg') || '{}');
        const prio = cfg.priority || 'ping';
        [['ping','📡 Ping'],['queue','👥 Queue'],['both','⚖ Both']].forEach(([p, label]) => {
          const b = get('bgfn-pg-prio-' + p);
          if (b) { b.style.background = prio===p?ac:'#21262d'; b.style.color = prio===p?'#000':'#888'; b.style.borderColor = prio===p?ac:'#30363d'; }
        });
      } catch(_) {}
    }
    // Checkboxes y dots
    const pgDot=get('bgfn-pg-dot'); if(pgDot&&get('bgfn-pg-enabled')?.checked) pgDot.style.background=ac;
    const vpnDot=get('bgfn-vpn-toggle-dot'); if(vpnDot&&get('bgfn-vpn-toggle')?.checked) vpnDot.style.background=ac;
    // Actualizar boxes de checkboxes
    ['bgfn-pg-show-ping','bgfn-pg-show-queue','bgfn-pg-show-eta'].forEach(id => {
      const box = get(id+'-box'); const cb = get(id);
      if (box && cb) { box.style.background=cb.checked?ac:'transparent'; box.style.borderColor=cb.checked?ac:'#555'; }
    });
    }, 250); }

  function closePanel() { const o=get('bgfn-overlay'),p=get('bgfn-panel'),f=get('bgfn-fab'); if(!o||!p)return; panelOpen=false; o.style.display='none';  p.style.transform='translateY(100%)'; p.style.opacity='0'; if(f&&!inGame)f.style.display='flex'; }

  // ── BUILD UI ───────────────────────────────────────────────────────────────

  function buildUI() {
    if (get('bgfn-fab')) return;
    const target=document.body||document.documentElement; if(!target)return;



    // VPN notice
    const vpn=document.createElement('div');
    vpn.id='bgfn-vpn-notice';
    const _a = accent();
    vpn.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:2147483647;background:rgba(10,20,10,.97);border:1px solid '+_a+';border-radius:10px;padding:10px 16px;font-family:monospace;color:#fff;display:none;flex-direction:column;align-items:center;gap:5px;box-shadow:0 4px 24px rgba(0,0,0,.4);max-width:290px;text-align:center;';
    vpn.innerHTML=`<div id="bgfn-vpn-dot" style="font-size:9px;color:${_a};letter-spacing:2px;">${t('vpn.notice_dot')}</div><div style="font-size:12px;line-height:1.4;">${t('vpn.notice_text')} <strong id="bgfn-vpn-strong" style="color:${_a};">desconectar tu VPN</strong><br>${t('vpn.notice_sub')}</div><button id="bgfn-vpn-ok" style="background:${_a};color:#000;border:none;border-radius:5px;padding:5px 16px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;letter-spacing:1px;">${t('btn.understood')}</button>`;



    // FAB
    const fab=document.createElement('div');
    fab.id='bgfn-fab';
    fab.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:2147483647;background:#76b900;color:#000;font-family:monospace;font-size:12px;font-weight:bold;padding:10px 22px;border-radius:24px;cursor:pointer;display:flex;align-items:center;gap:7px;box-shadow:0 4px 18px rgba(118,185,0,.4);letter-spacing:1px;user-select:none;';
    fab.innerHTML=`<span style="font-size:15px;">⚙</span> BETTER GFN`;
    fab.addEventListener('click',openPanel);

    const overlay=document.createElement('div');
    overlay.id='bgfn-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:2147483640;background:rgba(0,0,0,0.6);display:none;';
    overlay.addEventListener('click',closePanel);

    const modeBtns=GAMEPAD.getModes().map(m=>`<button id="bgfn-poll-${m.id}" style="flex:1;padding:8px 4px;border-radius:6px;border:1px solid #30363d;background:#21262d;color:#888;font-family:monospace;font-size:10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all .2s;"><span style="font-size:12px;font-weight:bold;">${m.label}</span><span style="font-size:8px;opacity:.6;">${m.targetHz?m.targetHz+'Hz':'∞'}</span></button>`).join('');

    const panel=document.createElement('div');
    panel.id='bgfn-panel';
    panel.style.cssText='position:fixed;bottom:0;left:0;width:100%;z-index:2147483645;max-height:85vh;overflow-y:auto;overscroll-behavior:contain;background:#0d1117;border-top:2px solid #76b900;border-radius:18px 18px 0 0;font-family:monospace;color:#fff;transform:translateY(100%);opacity:0;transition:transform .3s cubic-bezier(.32,1,.23,1),opacity .25s;';
    panel.innerHTML=`
      <div style="display:flex;justify-content:center;padding:10px 0 0;"><div style="width:36px;height:4px;background:#333;border-radius:2px;"></div></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px 8px;position:sticky;top:0;background:#0d1117;z-index:1;border-bottom:1px solid #1c2128;">
        <div style="display:flex;align-items:center;gap:8px;">
          <img src="https://raw.githubusercontent.com/karmadev0/better-geforce-now/main/assets/logo.png" style="width:22px;height:22px;border-radius:4px;object-fit:cover;" onerror="this.style.display='none'">
          <span style="font-size:13px;font-weight:bold;color:#76b900;letter-spacing:2px;">BETTER GFN</span>
          <span style="font-size:9px;color:#444;">v1.1.0</span>
        </div>
        <button id="bgfn-close" style="background:#1c2128;border:1px solid #30363d;color:#ccc;font-size:13px;cursor:pointer;padding:6px 12px;border-radius:6px;font-family:monospace;">${t('btn.close')}</button>
      </div>
      <div style="padding:14px 18px 20px;display:flex;flex-direction:column;gap:14px;">

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">${t('session.current')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">${t('session.time')}</div><div id="bgfn-session" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">${t('session.remaining')}</div><div id="bgfn-remaining" style="font-size:20px;color:#76b900;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">${t('session.clock')}</div><div id="bgfn-clock" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
          </div>
          <div style="margin-top:12px;background:#21262d;border-radius:4px;height:5px;overflow:hidden;"><div id="bgfn-bar" style="height:100%;width:0%;background:#76b900;transition:width 1s linear;border-radius:4px;"></div></div>
          <div id="bgfn-status" style="font-size:8px;color:#555;text-align:center;margin-top:7px;letter-spacing:1px;">${t('session.none')}</div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">${t('vpn.title')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div><div style="font-size:12px;color:#ccc;">${t('vpn.toggle')}</div><div style="font-size:9px;color:#555;">${t('vpn.toggle_desc')}</div></div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-vpn-toggle" style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-vpn-toggle-dot" style="position:absolute;left:3px;top:3px;width:16px;height:16px;background:#555;border-radius:50%;transition:.2s;"></span></label>
          </div>
          <div style="background:#0d1117;border-radius:6px;padding:10px 12px;">
            <div style="font-size:9px;color:#555;line-height:1.7;">${t('vpn.community')}</div>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">${t('gamepad.section')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><div id="bgfn-gp-name" style="font-size:12px;color:#555;">${t('gamepad.none')}</div><div id="bgfn-gp-status" style="font-size:9px;color:#555;">${t('gamepad.disconnected')}</div></div>
          <div id="bgfn-gp-type" style="font-size:9px;color:#444;margin-bottom:12px;word-break:break-all;">${t('gamepad.connect')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;background:#0d1117;border-radius:6px;padding:8px 12px;"><span style="font-size:11px;color:#888;">${t('gamepad.polling_current')}</span><span id="bgfn-gp-hz" style="font-size:16px;font-weight:bold;color:#555;">OFF</span></div>
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">${t('gamepad.polling')}</div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">${modeBtns}</div>
          <div id="bgfn-poll-desc" style="font-size:9px;color:#555;text-align:center;margin-bottom:12px;min-height:14px;"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div><div style="font-size:12px;color:#ccc;">${t('gamepad.remap')}</div><div style="font-size:9px;color:#555;">${t('gamepad.remap_desc')}</div></div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-gp-remap" checked style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-gp-remap-dot" style="position:absolute;left:25px;top:3px;width:16px;height:16px;background:#76b900;border-radius:50%;transition:.2s;"></span></label>
          </div>
          <div id="bgfn-gp-swaprow" style="display:none;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;color:#ccc;">${t('gamepad.swap')}</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-gp-swapAB" style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-gp-swap-dot" style="position:absolute;left:3px;top:3px;width:16px;height:16px;background:#555;border-radius:50%;transition:.2s;"></span></label>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">${t('pregame.title')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <div><div style="font-size:12px;color:#ccc;">${t('pregame.show')}</div><div style="font-size:9px;color:#555;">${t('pregame.show_desc')}</div></div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-pg-enabled" style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-pg-dot" style="position:absolute;left:3px;top:3px;width:16px;height:16px;background:#555;border-radius:50%;transition:.2s;"></span></label>
          </div>
          <div id="bgfn-pg-opts" style="display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid #21262d;max-height:0;overflow:hidden;transition:max-height 0.2s;">
            <div style="font-size:9px;color:#555;margin-bottom:2px;">${t('pregame.list')}</div>
            ${[['bgfn-pg-show-ping', t('pregame.ping')],['bgfn-pg-show-queue', t('pregame.queue')],['bgfn-pg-show-eta', t('pregame.eta')]].map(([id, label]) => {
              // id and label already destructured
              const ac = accent();
              return `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;color:#ccc;">
                <span id="${id}-box" style="width:18px;height:18px;border-radius:4px;border:2px solid ${ac};background:${ac};display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;">
                  <svg width="11" height="9" viewBox="0 0 11 9"><polyline points="1,4.5 4.5,8 10,1" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <input type="checkbox" id="${id}" checked style="display:none;">
                ${label}
              </label>`;
            }).join('')}
            <div style="font-size:9px;color:#555;margin-top:6px;margin-bottom:2px;">${t('pregame.priority')}</div>
            <div id="bgfn-pg-prio-container" style="display:flex;gap:8px;"></div>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">${t('timer.title')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:12px;color:#ccc;">${t('session.limit')}</span><input id="bgfn-opt-limit" type="number" value="60" min="30" max="240" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#76b900;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><span style="font-size:12px;color:#ccc;">${t('session.warn')}</span><input id="bgfn-opt-warn" type="number" value="50" min="10" max="230" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#f59e0b;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/></div>
          <button id="bgfn-save-opts" style="width:100%;background:#76b900;color:#000;border:none;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;font-weight:bold;cursor:pointer;letter-spacing:1px;">${t('btn.save')}</button>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div style="font-size:9px;color:#555;letter-spacing:1px;">${t('widgets.title')}</div>
            <button id="bgfn-widget-add-btn" style="background:#76b900;color:#000;border:none;border-radius:5px;padding:5px 12px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;">${t('btn.add')}</button>
          </div>
          <div id="bgfn-widgets-panel"></div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">${t('lang.title')}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span style="font-size:12px;color:#ccc;">${t('lang.current')}</span>
            <div style="display:flex;gap:6px;" id="bgfn-lang-btns"></div>
          </div>
          <div style="display:flex;gap:8px;">
            <button id="bgfn-lang-export" style="flex:1;padding:7px;border-radius:5px;font-family:monospace;font-size:10px;cursor:pointer;border:1px solid #30363d;background:#21262d;color:#ccc;">${t('lang.export')}</button>
            <label style="flex:1;padding:7px;border-radius:5px;font-family:monospace;font-size:10px;cursor:pointer;border:1px solid #30363d;background:#21262d;color:#ccc;text-align:center;">${t('lang.import')}<input type="file" id="bgfn-lang-import-file" accept=".json" style="display:none;"></label>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">${t('config.title')}</div>
          <div style="display:flex;gap:8px;">
            <button id="bgfn-export" style="flex:1;background:#21262d;color:#76b900;border:1px solid #30363d;border-radius:6px;padding:10px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;">⬆ ${t('config.export').replace('⬆ ','')}</button>
            <button id="bgfn-import-btn" style="flex:1;background:#21262d;color:#76b900;border:1px solid #30363d;border-radius:6px;padding:10px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;">⬇ ${t('config.import').replace('⬇ ','')}</button>
            <input type="file" id="bgfn-import-file" accept=".json" style="display:none;">
          </div>
          <div id="bgfn-config-status" style="font-size:9px;color:#555;text-align:center;margin-top:8px;min-height:14px;"></div>
        </div>

        <div style="background:#0a0e18;border:1px solid #1c2128;border-radius:8px;padding:14px 16px;text-align:center;">
          <div style="font-size:11px;color:#76b900;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">BETTER GFN v1.1.0</div>
          <div style="font-size:9px;color:#444;margin-bottom:4px;">${t('footer.made_by')} <span style="color:#76b900;">Karmadev0</span></div>
          <a href="https://github.com/karmadev0/better-geforce-now" target="_blank" style="font-size:9px;color:#555;text-decoration:none;">github.com/karmadev0/better-geforce-now</a>
          <div style="font-size:8px;color:#2a2a2a;line-height:1.6;margin-top:8px;">${t('footer.disclaimer')}</div>
        </div>

      </div>`;

    const toast=document.createElement('div');
    toast.id='bgfn-toast';
    toast.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(60px);background:rgba(10,20,10,.96);border:1px solid #76b900;border-radius:8px;padding:9px 18px;color:#fff;font-family:monospace;font-size:12px;z-index:2147483647;transition:transform .3s,opacity .3s;pointer-events:none;opacity:0;text-align:center;max-width:280px;';

    [vpn,fab,overlay,panel,toast].forEach(el=>target.appendChild(el));

    get('bgfn-close').addEventListener('click',closePanel);
    get('bgfn-vpn-ok').addEventListener('click',hideVPNNotice);
    GAMEPAD.getModes().forEach(m=>{ const b=get('bgfn-poll-'+m.id); if(!b)return; b.addEventListener('click',()=>{ GAMEPAD.setMode(m.id); const d=get('bgfn-poll-desc'); if(d)d.textContent=t(m.descKey); }); });
    const rc=get('bgfn-gp-remap'),rd=get('bgfn-gp-remap-dot');
    rc.addEventListener('change',()=>{ GAMEPAD.setRemap(rc.checked); rd.style.left=rc.checked?'25px':'3px'; rd.style.background=rc.checked?'#76b900':'#555'; });
    const sc=get('bgfn-gp-swapAB'),sd=get('bgfn-gp-swap-dot');
    sc.addEventListener('change',()=>{ GAMEPAD.setSwapAB(sc.checked); sd.style.left=sc.checked?'25px':'3px'; sd.style.background=sc.checked?'#76b900':'#555'; });

    get('bgfn-save-opts').addEventListener('click',()=>{
      const limit=parseInt(get('bgfn-opt-limit').value)||60, warn=parseInt(get('bgfn-opt-warn').value)||50;
      CFG.SESSION_LIMIT_MIN=Math.max(30,Math.min(240,limit)); CFG.WARN_AT_MIN=Math.max(10,Math.min(limit-1,warn)); CFG.DANGER_AT_MIN=CFG.WARN_AT_MIN+5;
      try{localStorage.setItem('bgfn_cfg',JSON.stringify({limit,warn}));}catch(_){}
      showToast(t('session.saved'),'ok',1500);
    });
    try {
      const s=JSON.parse(localStorage.getItem('bgfn_cfg')||'{}');
      if(s.limit){get('bgfn-opt-limit').value=s.limit;CFG.SESSION_LIMIT_MIN=s.limit;}
      if(s.warn){get('bgfn-opt-warn').value=s.warn;CFG.WARN_AT_MIN=s.warn;CFG.DANGER_AT_MIN=s.warn+5;}

    } catch(_) {}
    const pd=get('bgfn-poll-desc'); if(pd) pd.textContent=t(GAMEPAD.getCurrentMode().descKey);
    get('bgfn-widget-add-btn')?.addEventListener('click', () => WIDGETS.showAdd());

    // ── IDIOMA ──────────────────────────────────────────────────────────────
    const langBtns = get('bgfn-lang-btns');
    if (langBtns) {
      const renderLangBtns = () => {
        const ac = accent();
        const cur = LANG.getLang();
        langBtns.innerHTML = '';
        [['auto','AUTO'],['es','ES'],['en','EN']].forEach(([code, label]) => {
          const b = document.createElement('button');
          b.textContent = label;
          const active = cur === code || (code === 'auto' && !localStorage.getItem('bgfn_lang'));
          b.style.cssText = `padding:5px 10px;border-radius:5px;font-family:monospace;font-size:10px;cursor:pointer;border:2px solid ${active?ac:'#30363d'};background:${active?ac:'#21262d'};color:${active?'#000':'#888'};`;
          b.addEventListener('click', () => {
            if (code === cur || (code === 'auto' && !localStorage.getItem('bgfn_lang'))) return;
            const prevLang = LANG.getLang();
            // Aplicar temporalmente el nuevo idioma para mostrar el confirm en ese idioma
            LANG.setLang(code === 'auto' ? 'auto' : code);
            const langName = code === 'auto' ? 'AUTO ('+LANG.detectLang().toUpperCase()+')' : label;
            // Modal de confirmación
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;inset:0;z-index:2147483648;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px;';
            modal.innerHTML = `<div style="background:#161b22;border:2px solid ${accent()};border-radius:12px;padding:20px;max-width:320px;width:100%;font-family:monospace;text-align:center;">
              <div style="font-size:14px;color:#fff;margin-bottom:16px;line-height:1.5;">${t('lang.confirm')}<strong style="color:${accent()};">${langName}</strong>${t('lang.confirm2')}</div>
              <div style="display:flex;gap:8px;">
                <button id="bgfn-lang-cancel-confirm" style="flex:1;padding:10px;border-radius:6px;border:1px solid #30363d;background:#21262d;color:#ccc;font-family:monospace;font-size:12px;cursor:pointer;">${t('lang.cancel_confirm')}</button>
                <button id="bgfn-lang-accept-confirm" style="flex:1;padding:10px;border-radius:6px;border:none;background:${accent()};color:#000;font-family:monospace;font-size:12px;font-weight:bold;cursor:pointer;">${t('lang.accept')}</button>
              </div>
            </div>`;
            document.body.appendChild(modal);
            document.getElementById('bgfn-lang-accept-confirm').addEventListener('click', () => {
              modal.remove();
              location.reload();
            });
            document.getElementById('bgfn-lang-cancel-confirm').addEventListener('click', () => {
              LANG.setLang(prevLang === LANG.detectLang() ? 'auto' : prevLang);
              modal.remove();
              renderLangBtns();
            });
          });
          langBtns.appendChild(b);
        });
      };
      renderLangBtns();
      // Re-render al abrir panel para colores correctos
      setTimeout(renderLangBtns, 260);
    }

    get('bgfn-lang-export')?.addEventListener('click', () => {
      LANG.exportJSON();
      showToast('⬆ JSON exported', 'ok', 2000);
    });

    get('bgfn-lang-import-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0]; if (!file) return;
      LANG.importJSON(file).then(lang => {
        showToast('⬇ Language imported: ' + lang, 'ok', 2000);
      }).catch(() => showToast('✗ Error al importar', 'danger', 2000));
    });

    // Toggle VPN notice
    const vpnToggle = get('bgfn-vpn-toggle');
    const vpnDot = get('bgfn-vpn-toggle-dot');
    const vpnAc = accent();
    const vpnEnabled = localStorage.getItem('bgfn_vpn_notice') !== 'off';
    if (vpnToggle) vpnToggle.checked = vpnEnabled;
    if (vpnDot) { vpnDot.style.left = vpnEnabled ? '25px' : '3px'; vpnDot.style.background = vpnEnabled ? vpnAc : '#555'; }
    vpnToggle?.addEventListener('change', () => {
      const on = vpnToggle.checked;
      localStorage.setItem('bgfn_vpn_notice', on ? 'on' : 'off');
      if (vpnDot) { vpnDot.style.left = on ? '25px' : '3px'; vpnDot.style.background = on ? vpnAc : '#555'; }
    });

    // Pre-juego config
    const pgEnabled = get('bgfn-pg-enabled');
    const pgDot = get('bgfn-pg-dot');
    const pgOpts = get('bgfn-pg-opts');
    const pgLoad = () => {
      try {
        const ac = accent(); // siempre fresco
        const s = JSON.parse(localStorage.getItem('bgfn_pregame_cfg') || '{}');
        const on = s.enabled !== false;
        if (pgEnabled) pgEnabled.checked = on;
        if (pgDot) { pgDot.style.left = on ? '25px' : '3px'; pgDot.style.background = on ? ac : '#555'; }
        // max-height para mostrar/ocultar (siempre display:flex para que Kiwi renderice)

        // Checkboxes custom — sincronizar estado y color
        const checkMap = { 'bgfn-pg-show-ping': s.showPing !== false, 'bgfn-pg-show-queue': s.showQueue !== false, 'bgfn-pg-show-eta': s.showEta !== false };
        Object.entries(checkMap).forEach(([id, checked]) => {
          const cb = get(id);
          if (cb) cb.checked = checked;
          const box = get(id + '-box');
          if (box) {
            box.style.background = checked ? ac : 'transparent';
            box.style.borderColor = checked ? ac : '#555';
            box.innerHTML = checked ? '<svg width="11" height="9" viewBox="0 0 11 9"><polyline points="1,4.5 4.5,8 10,1" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
          }
        });
        // Generar botones de prioridad dinámicamente con colores correctos
        const prio = s.priority || 'ping';
        const prioContainer = get('bgfn-pg-prio-container');
        if (prioContainer) {
          prioContainer.innerHTML = '';
          [['ping','📡 Ping'],['queue','👥 Queue'],['both','⚖ Both']].forEach(([p, label]) => {
            const b = document.createElement('button');
            b.id = 'bgfn-pg-prio-' + p;
            b.textContent = label;
            b.style.cssText = `flex:1;padding:7px;border-radius:6px;font-family:monospace;font-size:10px;cursor:pointer;border:2px solid ${prio===p?ac:'#30363d'};background:${prio===p?ac:'#21262d'};color:${prio===p?'#000':'#888'};`;
            b.addEventListener('click', () => {
              try { const cfg=JSON.parse(localStorage.getItem('bgfn_pregame_cfg')||'{}'); cfg.priority=p; localStorage.setItem('bgfn_pregame_cfg',JSON.stringify(cfg)); } catch(_) {}
              pgLoad(); // re-generar con nuevos colores
            });
            prioContainer.appendChild(b);
          });
        }

        // Mostrar/ocultar con max-height
        if (pgOpts) pgOpts.style.maxHeight = on ? '400px' : '0';
      } catch(_) {}
    };
    const pgSave = () => {
      try {
        const prev = JSON.parse(localStorage.getItem('bgfn_pregame_cfg') || '{}');
        const s = {
          enabled: pgEnabled?.checked ?? true,
          showPing: get('bgfn-pg-show-ping')?.checked ?? true,
          showQueue: get('bgfn-pg-show-queue')?.checked ?? true,
          showEta: get('bgfn-pg-show-eta')?.checked ?? true,
          priority: prev.priority || 'ping',
        };
        localStorage.setItem('bgfn_pregame_cfg', JSON.stringify(s));
      } catch(_) {}
    };
    // Migrar key vieja de prioridad si existe
    try {
      const oldPrio = localStorage.getItem('bgfn_pregame_prio');
      if (oldPrio) {
        const cfg = JSON.parse(localStorage.getItem('bgfn_pregame_cfg') || '{}');
        cfg.priority = oldPrio;
        localStorage.setItem('bgfn_pregame_cfg', JSON.stringify(cfg));
        localStorage.removeItem('bgfn_pregame_prio');
      }
    } catch(_) {}
    pgLoad();
    pgEnabled?.addEventListener('change', () => {
      const on = pgEnabled.checked;
      const ac = accent();
      if (pgDot) { pgDot.style.left = on ? '25px' : '3px'; pgDot.style.background = on ? ac : '#555'; }
      if (pgOpts) pgOpts.style.maxHeight = on ? '400px' : '0';
      // Actualizar checkboxes al mostrar

      pgSave();
    });
    ['show-ping','show-queue','show-eta'].forEach(id => {
      const cb = get('bgfn-pg-' + id);
      const box = get('bgfn-pg-' + id + '-box');
      // Click en el box visual activa/desactiva
      box?.addEventListener('click', () => {
        if (cb) {
          cb.checked = !cb.checked;
          const ac2 = accent();
          box.style.background = cb.checked ? ac2 : 'transparent';
          box.style.borderColor = cb.checked ? ac2 : '#555';
          box.innerHTML = cb.checked ? '<svg width="10" height="8" viewBox="0 0 10 8"><polyline points="1,4 4,7 9,1" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>' : '';
          pgSave();
        }
      });
      cb?.addEventListener('change', pgSave);
    });
    // Listeners de prioridad manejados dentro de pgLoad()
    WIDGETS.renderPanel();
    // Re-renderizar panel cada vez que se abra
    get('bgfn-overlay')?.addEventListener('click', () => WIDGETS.renderPanel());

    // ── Exportar configuración ──────────────────────────────────────────────
    get('bgfn-export')?.addEventListener('click', () => {
      try {
        const config = {
          version: BGFN_VERSION,
          exported: new Date().toISOString(),
          cfg: {
            SESSION_LIMIT_MIN: CFG.SESSION_LIMIT_MIN,
            WARN_AT_MIN: CFG.WARN_AT_MIN,
            DANGER_AT_MIN: CFG.DANGER_AT_MIN,
          },
          widgets: JSON.parse(localStorage.getItem('bgfn_widgets') || '[]'),
          poll_mode: localStorage.getItem('bgfn_poll') || 'ultra',
          gp_remap: get('bgfn-gp-remap')?.checked ?? true,
          gp_swapAB: get('bgfn-gp-swapAB')?.checked ?? false,
          theme: {
            active: THEMES.getActiveId(),
            custom: JSON.parse(localStorage.getItem('bgfn_theme') || '{}').custom || null,
            custom_list: JSON.parse(localStorage.getItem('bgfn_custom_themes') || '[]'),
          },
          widget_color: localStorage.getItem('bgfn_widget_color') || 'theme',
          widget_custom_color: localStorage.getItem('bgfn_widget_custom_color') || '#76b900',
        };
        const blob = new Blob([JSON.stringify(config, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `bgfn-config-${Date.now()}.json`;
        a.click(); URL.revokeObjectURL(url);
        const s = get('bgfn-config-status');
        if(s) { s.textContent = t('export.done'); s.style.color = '#76b900'; }
        showToast(t('export.done'), 'ok', 2000);
      } catch(e) {
        showToast(t('export.error'), 'danger', 2000);
      }
    });

    // ── Importar configuración ──────────────────────────────────────────────
    get('bgfn-import-btn')?.addEventListener('click', () => {
      get('bgfn-import-file')?.click();
    });

    get('bgfn-import-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0]; if(!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const config = JSON.parse(ev.target.result);
          if (!config.cfg) throw new Error(t('file.invalid'));

          // Aplicar configuración
          if (config.cfg.SESSION_LIMIT_MIN) {
            CFG.SESSION_LIMIT_MIN = config.cfg.SESSION_LIMIT_MIN;
            const el = get('bgfn-opt-limit'); if(el) el.value = config.cfg.SESSION_LIMIT_MIN;
          }
          if (config.cfg.WARN_AT_MIN) {
            CFG.WARN_AT_MIN = config.cfg.WARN_AT_MIN;
            CFG.DANGER_AT_MIN = config.cfg.WARN_AT_MIN + 5;
            const el = get('bgfn-opt-warn'); if(el) el.value = config.cfg.WARN_AT_MIN;
          }

          if (config.poll_mode) GAMEPAD.setMode(config.poll_mode);
          const rc = get('bgfn-gp-remap'), rd = get('bgfn-gp-remap-dot');
          if (rc && config.gp_remap !== undefined) {
            rc.checked = config.gp_remap;
            if(rd) { rd.style.left = config.gp_remap?'25px':'3px'; rd.style.background = config.gp_remap?'#76b900':'#555'; }
            GAMEPAD.setRemap(config.gp_remap);
          }

          // Importar widgets si existen
          if (config.widgets && Array.isArray(config.widgets)) {
            try { localStorage.setItem('bgfn_widgets', JSON.stringify(config.widgets)); } catch(_) {}
            WIDGETS.reload();
          }
          // Restaurar temas
          if (config.theme) {
            try {
              // Guardar lista de temas custom
              if (config.theme.custom_list?.length) {
                localStorage.setItem('bgfn_custom_themes', JSON.stringify(config.theme.custom_list));
              }
              // Restaurar tema activo
              const themeData = { active: config.theme.active, custom: config.theme.custom || null };
              localStorage.setItem('bgfn_theme', JSON.stringify(themeData));
              THEMES.init();
              // Si el tema activo es custom (100+) o preview, necesitamos aplicarlo
              const activeId = config.theme.active;
              if (activeId && !THEMES.getPresets()[activeId]) {
                // Es un custom — buscarlo en la lista
                const found = (config.theme.custom_list || []).find(t => t.id === activeId);
                if (found) THEMES.setCustom(found.colors, found.id, found.name);
                else if (config.theme.custom) THEMES.setCustom(config.theme.custom.colors, activeId, config.theme.custom.name);
                else THEMES.apply();
              } else {
                THEMES.apply();
              }
              // Re-renderizar panel de temas si está abierto
              setTimeout(() => {
                if (document.getElementById('bgfn-theme-grid')) initThemesUI();
              }, 200);
            } catch(_) {}
          }
          // Color de widgets
          if (config.widget_color) {
            try {
              localStorage.setItem('bgfn_widget_color', config.widget_color);
              if (config.widget_custom_color) localStorage.setItem('bgfn_widget_custom_color', config.widget_custom_color);
            } catch(_) {}
          }

          // Guardar en localStorage
          try {
            localStorage.setItem('bgfn_cfg', JSON.stringify({
              limit: CFG.SESSION_LIMIT_MIN, warn: CFG.WARN_AT_MIN
            }));
          } catch(_) {}

          const s = get('bgfn-config-status');
          if(s) { s.textContent = t('import.done')+` (v${config.version||'?'})`; s.style.color = '#76b900'; }
          showToast(t('import.done'), 'ok', 2000);
          updateLayout();
        } catch(err) {
          const s = get('bgfn-config-status');
          if(s) { s.textContent = t('config.import')+' error'; s.style.color = '#ef4444'; }
          showToast(t('export.error'), 'danger', 3000);
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });

    updateLayout();
  }

  // ── TOAST ──────────────────────────────────────────────────────────────────
  let _tt;
  function showToast(msg,type,dur=4000) {
    const el=get('bgfn-toast'); if(!el)return;
    el.textContent=msg; el.style.borderColor={ok:'#76b900',warn:'#f59e0b',danger:'#ef4444'}[type]||'#76b900';
    el.style.opacity='1'; el.style.transform='translateX(-50%) translateY(0)';
    clearTimeout(_tt); _tt=setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(-50%) translateY(60px)';},dur);
  }

  // ── TICK ───────────────────────────────────────────────────────────────────
  function tick() {
    const now=new Date().toLocaleTimeString(LANG.detectLang()==='es'?'es':'en',{hour12:false});
    const clk=get('bgfn-clock'); if(clk) clk.textContent=now;
    if (!sessionStart) return;
    const e=elapsed(), em=e/60, ls=CFG.SESSION_LIMIT_MIN*60, r=Math.max(0,ls-e), pct=Math.min(100,(e/ls)*100);
    const col=em>=CFG.DANGER_AT_MIN?'#ef4444':em>=CFG.WARN_AT_MIN?'#f59e0b':'#76b900';
    [['bgfn-session',fmt(e)],['bgfn-remaining',fmt(r)]].forEach(([id,v])=>{const el=get(id);if(el)el.textContent=v;});
    const bar=get('bgfn-bar'); if(bar){bar.style.width=pct+'%';bar.style.color=col;}
    const rem=get('bgfn-remaining'); if(rem) rem.style.color=col;
    if(em>=CFG.DANGER_AT_MIN){setStatus('danger');if(!alertedDanger){alertedDanger=true;showToast(`⚠ ${fmt(r)} left — ${t('status.danger')}`,'danger',8000);}}
    else if(em>=CFG.WARN_AT_MIN){setStatus('warn');if(!alertedWarn){alertedWarn=true;showToast(`⏳ ${Math.floor(em)} min — ${t('session.warn_msg')}`,'warn',6000);}}
    else setStatus('active');

  }

  function setStatus(m) {
    const statusLabels={active:t('status.ingame'),idle:t('status.idle'),danger:t('status.danger'),warn:t('status.warn')};
    const c={active:'#76b900',idle:'#555',danger:'#ef4444',warn:'#f59e0b'};
    const el=get('bgfn-status'); if(el){el.textContent=statusLabels[m]||'';el.style.color=c[m]||'#555';}
  }

  // ── SVG ICONS ──────────────────────────────────────────────────────────────
  const ICONS = {
    history:     '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M230.14,58.87A8,8,0,0,0,224,56H175.47L146.79,26.51A8,8,0,0,0,141,24H115a8,8,0,0,0-5.76,2.51L80.53,56H32a8,8,0,0,0-7.94,9l16,112A8,8,0,0,0,48,184H208a8,8,0,0,0,7.94-7L231.94,65A8,8,0,0,0,230.14,58.87ZM118.84,40h18.32l18.21,16H100.63ZM200.06,168H55.94L42.07,72H213.93Z"/></svg>',
    stats:       '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H48V136a8,8,0,0,1,8-8H96a8,8,0,0,1,8,8v64h16V88a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h16V56a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"/></svg>',
    themes:      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-.45A104,104,0,0,0,128,232a16,16,0,0,0,16-16V200a8,8,0,0,1,8-8h32a24,24,0,0,0,24-24A104.07,104.07,0,0,0,200.77,53.89ZM80,140a12,12,0,1,1,12-12A12,12,0,0,1,80,140Zm16-52a12,12,0,1,1,12-12A12,12,0,0,1,96,88Zm64,0a12,12,0,1,1,12-12A12,12,0,0,1,160,88Zm16,52a12,12,0,1,1,12-12A12,12,0,0,1,176,140Z"/></svg>',
    controls:    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,64H48A24,24,0,0,0,24,88v80a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V88A24,24,0,0,0,208,64ZM92,152H76v16a8,8,0,0,1-16,0V152H44a8,8,0,0,1,0-16H60V120a8,8,0,0,1,16,0v16H92a8,8,0,0,1,0,16Zm72-12a12,12,0,1,1,12-12A12,12,0,0,1,164,140Zm24,28a12,12,0,1,1,12-12A12,12,0,0,1,188,168Zm0-56a12,12,0,1,1,12-12A12,12,0,0,1,188,112Zm24,28a12,12,0,1,1,12-12A12,12,0,0,1,212,140Z"/></svg>',
    community:   '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,1.1-8.53A28,28,0,1,0,144,96a28.13,28.13,0,0,0,4.2,14.57A8,8,0,0,1,141.6,122a51.47,51.47,0,0,0-19.6,16,8,8,0,1,1-12.8-9.6A67.28,67.28,0,0,1,128,115.1V112a44,44,0,1,1,76.16,30.08,67.71,67.71,0,0,1,42.25,24.72A8,8,0,0,1,244.8,150.4ZM188,212a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8,84,84,0,0,1,168,0Z"/></svg>',
    plugins:     '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M227.31,73.37,182.63,28.69a16,16,0,0,0-22.63,0L129.37,59.31a16,16,0,0,0,0,22.63l.68.68L79.53,133.13a16,16,0,0,0-22,1.48L36.59,165.53A24,24,0,0,0,40,199.41l16.59,16.59A24,24,0,0,0,73,219.41l30.92-20.92a16,16,0,0,0,1.48-22L54.91,126l50.62-50.62.68.69a16,16,0,0,0,22.62,0l30.63-30.63a16,16,0,0,0,0-22.62Z"/></svg>',
    github:      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24,40,40,0,0,0-40-40,8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40h24v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68Z"/></svg>',
    wiki:        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/></svg>',
    settings:    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Z"/></svg>',
  };

  const MENU_ITEMS = [
    { id:'history',   label:t('nav.history'),       icon: ICONS.history   },
    { id:'stats',     label:t('nav.stats'),     icon: ICONS.stats     },
    { id:'themes',    label:t('nav.themes'),            icon: ICONS.themes    },
    { id:'controls',  label:t('nav.controls'),        icon: ICONS.controls  },
    { id:'community', label:t('nav.community'),   icon: ICONS.community },
    { id:'plugins',   label:t('nav.plugins'),          icon: ICONS.plugins   },
    { id:'github',    label:t('nav.github'),           icon: ICONS.github    },
    { id:'wiki',      label:t('nav.wiki'),             icon: ICONS.wiki      },
    { id:'settings',  label:t('nav.settings'),       icon: ICONS.settings  },
  ];

  // ── PÁGINAS DE BGFN ────────────────────────────────────────────────────────
  let currentPage = null;

  function makePage(id, title, icon, content) {
    return `
      <div id="bgfn-page-${id}" style="position:fixed;top:0;left:0;width:100%;height:100%;overflow-y:auto;background:var(--background-default,#1a1a2e);z-index:2147483640;box-sizing:border-box;">
        <div style="padding:14px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,0.08);position:sticky;top:0;background:var(--background-default,#1a1a2e);z-index:1;">
          <button id="bgfn-page-back-${id}" style="min-width:36px;width:36px;height:36px;border-radius:50%;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:inherit;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/></svg>
          </button>
          <div style="display:flex;align-items:center;gap:10px;">
            ${icon}
            <span style="font-size:16px;font-weight:600;">${title}</span>
          </div>
        </div>
        <div style="padding:16px;">${content}</div>
      </div>`;
  }

  const WIP_CONTENT = (title) => `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:16px;text-align:center;opacity:0.6;">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256" fill="currentColor" style="opacity:0.3;"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a16,16,0,1,1,16,16A16,16,0,0,1,112,84Z"/></svg>
      <div>
        <div style="font-size:18px;font-weight:bold;margin-bottom:8px;">${t('wip.title')}</div>
        <div style="font-size:13px;opacity:0.7;">${title} ${t('wip.desc_full')}</div>
      </div>
    </div>`;

  function openBGFNPage(pageId) {
    // Quitar página anterior
    const oldPage = document.getElementById('bgfn-page-' + (currentPage||''));
    if (oldPage) oldPage.remove();
    currentPage = pageId;

    if (pageId === 'settings') { openPanel(); return; }
    if (pageId === 'github') { window.open('https://github.com/karmadev0/better-geforce-now', '_blank'); return; }
    if (pageId === 'wiki') { window.open('https://github.com/karmadev0/better-geforce-now/wiki', '_blank'); return; }

    const pages = {
      stats:     { title:t('nav.stats'), icon: ICONS.stats,     content: WIP_CONTENT(t('nav.stats')) },
      stats:     { title:'Estadísticas',   icon: ICONS.stats,     content: WIP_CONTENT(t('nav.stats')) },
      themes:    { title:t('nav.themes'),  icon: ICONS.themes,    content: THEMES.buildPage() },
      controls:  { title:t('nav.controls'), icon: ICONS.controls,  content: WIP_CONTENT(t('nav.controls')) },
      community: { title:t('nav.community'), icon: ICONS.community, content: WIP_CONTENT(t('nav.community')) },
      plugins:   { title:t('nav.plugins'), icon: ICONS.plugins,   content: WIP_CONTENT(t('nav.plugins')) },
      github:    null,
      wiki:      null,
    };

    const p = pages[pageId]; if(!p) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = makePage(pageId, p.title, p.icon, p.content);
    document.body.appendChild(wrapper);

    // Botón volver — listener directo
    document.getElementById('bgfn-page-back-' + pageId)?.addEventListener('click', () => {
      wrapper.remove(); currentPage = null;
    });

    // Si es stats, actualizar inmediatamente
    if (pageId === 'stats') setTimeout(() => STATS.getCurrent() && STATS.init && document.getElementById('bgfn-stats-content') && (() => { const s=STATS.getCurrent(); })(), 100);

    // Si es themes, inicializar la UI interactiva
    if (pageId === 'themes') {
      setTimeout(() => initThemesUI(), 50);
      setTimeout(() => initThemesUI(), 300); // segundo render por si el primero fue antes de que el DOM esté listo
    }
  }

  // ── BGFN DRAWER — implementación propia independiente de Angular ──────────
  // Copia exacta del comportamiento del mat-drawer de GFN
  // width: 256px, background: rgb(57,57,57), z-index: 3
  // Transición: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)
  function buildFloatingNav() {
    if (!document.body) { setTimeout(buildFloatingNav, 100); return; }
    if (document.getElementById('bgfn-floating-nav')) return;

    // Sin backdrop propio — GFN ya tiene el suyo
    const backdrop = null;

    // Drawer — sin fondo propio, solo los botones encima del drawer de GFN
    const nav = document.createElement('div');
    nav.id = 'bgfn-floating-nav';
    nav.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'width:256px',
      'height:100%',
      'z-index:4', // encima del drawer de GFN (z-index:3)
      'background:transparent',
      'transform:translateX(-256px)',
      'visibility:hidden',
      'transition:transform 0.4s cubic-bezier(0.25,0.8,0.25,1),visibility 0.4s cubic-bezier(0.25,0.8,0.25,1)',
      'overflow-y:auto',
      'overflow-x:hidden',
      'box-sizing:border-box',
      'display:flex',
      'flex-direction:column',
      'padding-bottom:16px',
      'pointer-events:none', // solo los botones capturan clicks
    ].join(';');

    // Header del drawer con separador y logo BGFN
    const header = document.createElement('div');
    header.style.cssText = 'padding:8px 8px 4px;margin-top:auto;pointer-events:none;';
    header.innerHTML = `
      <div style="border-top:1px solid rgba(255,255,255,0.1);margin-bottom:6px;"></div>
      <div style="display:flex;align-items:center;gap:8px;padding:4px 8px;opacity:0.6;">
        <img src="https://raw.githubusercontent.com/karmadev0/better-geforce-now/main/assets/logo.png"
             style="width:16px;height:16px;border-radius:3px;object-fit:cover;"
             onerror="this.style.display='none'">
        <span style="font-size:10px;font-weight:bold;letter-spacing:2px;color:#fff;">BGFN</span>
      </div>`;

    // Wrapper para items — flex-column al fondo
    const itemsWrapper = document.createElement('div');
    itemsWrapper.style.cssText = 'display:flex;flex-direction:column;margin-top:auto;';
    itemsWrapper.appendChild(header);

    // Botones con el mismo estilo que los de GFN
    MENU_ITEMS.forEach(item => {
      const btn = document.createElement('button');
      btn.style.cssText = [
        'width:100%',
        'display:flex',
        'align-items:center',
        'gap:14px',
        'padding:12px 16px',
        'background:transparent',
        'border:none',
        'color:rgba(255,255,255,0.87)',
        'cursor:pointer',
        'text-align:left',
        'font-size:14px',
        'font-family:inherit',
        'letter-spacing:0.01em',
        'transition:background 0.15s',
        'pointer-events:auto', // capturar clicks aunque el nav sea pointer-events:none
        'border-radius:4px',
      ].join(';');
      btn.innerHTML = `
        <span style="display:flex;align-items:center;opacity:1;flex-shrink:0;">${item.icon}</span>
        <span>${item.label}</span>`;
      btn.addEventListener('mouseover', () => btn.style.background = 'rgba(255,255,255,0.08)');
      btn.addEventListener('mouseout',  () => btn.style.background = 'transparent');
      btn.addEventListener('click', () => { closeNav(); openBGFNPage(item.id); });
      itemsWrapper.appendChild(btn);
    });

    nav.appendChild(itemsWrapper);
    document.body.appendChild(nav);

    // Abrir/cerrar el drawer
    // Interceptar clicks del hamburguesa — siempre escuchando
    let lastMenuBtn = null;
    let navOpen = false;

    function openNav() {
      if (inGame) return;
      navOpen = true;
      nav.style.transform = 'translateX(0)';
      nav.style.visibility = 'visible';
    }
    function closeNav() {
      navOpen = false;
      nav.style.transform = 'translateX(-256px)';
      nav.style.visibility = 'hidden';
    }
    window._bgfnCloseNav = closeNav;

    // Observer en aria-expanded como fuente de verdad para sincronizar estado
    function watchMenuBtn(menuBtn) {
      if (menuBtn === lastMenuBtn) return;
      lastMenuBtn = menuBtn;

      // Click interceptado antes que Angular
      menuBtn.addEventListener('click', (e) => {
        if (inGame) return;
        navOpen ? closeNav() : openNav();
      }, true);

      // Sincronizar con aria-expanded como fallback
      new MutationObserver(() => {
        if (inGame) { closeNav(); return; }
        const open = menuBtn.getAttribute('aria-expanded') === 'true';
        if (open && !navOpen) openNav();
        if (!open && navOpen) closeNav();
      }).observe(menuBtn, {attributes: true, attributeFilter: ['aria-expanded']});
    }

    // Siempre escuchando — reattach si Angular recrea el botón
    setInterval(() => {
      const menuBtn = document.querySelector('[aria-label="Menú"]');
      if (menuBtn) watchMenuBtn(menuBtn);
      if (inGame) closeNav();
    }, 500);

    console.log('[BGFN] Drawer listo');

    // Ocultar cuando entra al juego
    setInterval(() => { if (inGame) closeNav(); }, 500);
  }

    // ── INYECCIÓN EN MENÚ — solo el separador visual (sin botones clickeables)
  function injectNavMenu() {
    if (document.getElementById('bgfn-nav-section')) return;
    let navParent = null;
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Juegos' || btn.textContent.trim() === 'Games') {
        navParent = btn.closest('[fxlayout="column"]') || btn.parentElement?.parentElement;
      }
    });
    if (!navParent) return;

    // Solo separador visual — sin botones (Angular los colapsa)
    const sep = document.createElement('div');
    sep.id = 'bgfn-nav-section';
    sep.style.cssText = 'height:1px;'; // placeholder invisible
    navParent.appendChild(sep);
    console.log('[BGFN] Nav placeholder inyectado');
  }

    // ── FULLSCREEN ─────────────────────────────────────────────────────────────
  // Móvil (Kiwi): detectado por viewport height >900px (landscape rota los ejes)
  // PC: detectado por hash URL #/streamer = en juego, cualquier otro = fuera
  function watchFullscreen() {
    let fsTimer=null;
    function applyFS(s) { if(s===isFullscreen)return; isFullscreen=s; updateLayout(); }

    function isStreamerHash() { return location.hash.includes('/streamer'); }

    function checkFS() {
      if (!inGame) { if(isFullscreen) applyFS(false); return; }

      // PC: usar hash URL como señal principal
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      if (!isMobile) {
        const nowFS = isStreamerHash();
        clearTimeout(fsTimer);
        if(nowFS && !isFullscreen) applyFS(true);
        else if(!nowFS && isFullscreen) fsTimer=setTimeout(()=>{ if(!isStreamerHash()) applyFS(false); },500);
        return;
      }

      // Móvil: usar viewport height (Kiwi rota ejes en landscape)
      const bigger=Math.max(window.innerWidth,window.innerHeight);
      const nowFS=bigger>900;
      clearTimeout(fsTimer);
      if(nowFS&&!isFullscreen) applyFS(true);
      else if(!nowFS&&isFullscreen) fsTimer=setTimeout(()=>{ if(Math.max(window.innerWidth,window.innerHeight)<=900) applyFS(false); },2000);
    }

    window.addEventListener('hashchange', checkFS);
    window.addEventListener('resize', checkFS);
    setInterval(checkFS, 800);
  }



  // ── SERVICE WORKER + VIDEO FALLBACK ────────────────────────────────────
  function watchSW() {
    if(!navigator.serviceWorker)return;
    navigator.serviceWorker.addEventListener('message',e=>{
      const d=e.data; if(!d||!d.path)return;
      const paths=Array.isArray(d.path)?d.path:[d.path];
      if(!paths.some(p=>String(p).includes('streamingSessionId')))return;
      const s=d.data&&d.data.sessionId; s?onSessionActive(s):onSessionEnded();
    });
  }
  function watchVideo() {
    // Detección por video real únicamente (no por URL — la cola usa la misma URL)
    // El SW es la fuente principal, esto es fallback
    let noVideoCount = 0;

    setInterval(() => {
      const v = document.querySelector('video');
      const hasVideo = v && !v.paused && v.readyState >= 3 && v.videoWidth > 200;

      if (hasVideo) {
        noVideoCount = 0;
        if (!inGame) onSessionActive('video-' + Date.now());
      } else if (inGame) {
        noVideoCount++;
        if (noVideoCount >= 5) { // 5s sin video = fin de sesión
          noVideoCount = 0;
          onSessionEnded();
        }
      }
    }, 1000);

    // Detectar fin de sesión por URL — solo cuando vuelve al mall
    window.addEventListener('hashchange', () => {
      if (inGame && location.href.includes('/mall/')) {
        setTimeout(() => {
          const v = document.querySelector('video');
          if (!v || v.paused) onSessionEnded();
        }, 2000);
      }
    });
  }

  // ── THEMES UI ─────────────────────────────────────────────────────────────
  function initThemesUI() {
    const presets = THEMES.getPresets();
    const active = THEMES.getActive();

    // Helper: genera el mockup mini de GFN con los colores dados
    function buildMockup(colors) {
      return `<div style="border-radius:8px;overflow:hidden;border:1px solid ${colors.border};font-family:sans-serif;font-size:11px;">
        <div style="background:${colors.surface};padding:8px 10px;display:flex;align-items:center;gap:8px;border-bottom:1px solid ${colors.border};">
          <div style="width:8px;height:8px;border-radius:50%;background:${colors.accent};"></div>
          <span style="color:${colors.text};font-size:10px;font-weight:bold;">Games</span>
          <div style="margin-left:auto;width:16px;height:16px;border-radius:50%;background:${colors.textMuted};opacity:0.5;"></div>
        </div>
        <div style="background:${colors.bg};padding:8px 10px;">
          <div style="font-size:9px;color:${colors.text};margin-bottom:6px;font-weight:bold;">My favorites</div>
          <div style="display:flex;gap:4px;margin-bottom:8px;">
            <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
              <div style="height:36px;background:linear-gradient(135deg,${colors.accent}44,${colors.surface});position:relative;">
                <div style="position:absolute;top:2px;left:2px;background:${colors.surface};border-radius:2px;display:flex;align-items:center;gap:2px;padding:1px 3px;">
                  <div style="width:2px;height:8px;background:${colors.accent};border-radius:1px;"></div>
                  <span style="font-size:6px;color:${colors.text};">New</span>
                </div>
              </div>
              <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 1</div>
            </div>
            <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
              <div style="height:36px;background:linear-gradient(135deg,${colors.textMuted}33,${colors.surface});"></div>
              <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 2</div>
            </div>
            <div style="flex:1;border-radius:4px;overflow:hidden;background:${colors.surface};">
              <div style="height:36px;background:linear-gradient(135deg,${colors.border},${colors.surface});"></div>
              <div style="padding:3px 4px;background:${colors.surface};font-size:7px;color:${colors.text};">Game 3</div>
            </div>
          </div>
          <div style="background:${colors.accent};color:#000;border-radius:3px;padding:3px 8px;display:inline-block;font-size:8px;font-weight:bold;">PLAY</div>
        </div>
      </div>`;
    }

    // Helper: genera preview de widget en stream
    function buildWidgetPreview(colors, type) {
      const w = {ping:{l:'PING',v:'24ms'},fps:{l:'FPS',v:'60'},bitrate:{l:'MBPS',v:'20.4'},jitter:{l:'JITTER',v:'2ms'},time:{l:'TIEMPO',v:'12:34'},clock:{l:'RELOJ',v:'15:42'}}[type]||{l:'PING',v:'24ms'};
      return `<div style="position:relative;border-radius:6px;overflow:hidden;background:#000;height:80px;display:flex;align-items:flex-start;justify-content:flex-start;padding:6px;">
        <div style="background:rgba(0,0,0,0.7);border:1px solid ${colors.accent};border-radius:4px;padding:4px 8px;display:flex;flex-direction:column;align-items:center;">
          <div style="font-size:7px;color:${colors.accent};letter-spacing:1px;">${w.l}</div>
          <div style="font-size:14px;color:${colors.accent};font-weight:bold;line-height:1.2;">${w.v}</div>
        </div>
        <div style="position:absolute;bottom:4px;right:6px;font-size:8px;color:#ffffff44;">STREAM PREVIEW</div>
      </div>`;
    }

    // Rellenar grid de temas
    const grid = document.getElementById('bgfn-theme-grid');
    if (grid) {
      grid.innerHTML = '';
      Object.entries(presets).forEach(([id, theme]) => {
        const isActive = THEMES.getActiveId() === id;
        const card = document.createElement('div');
        card.style.cssText = `background:${theme.colors.surface};border:2px solid ${isActive ? theme.colors.accent : '#30363d'};border-radius:8px;padding:10px;cursor:pointer;transition:border .2s;`;
        card.innerHTML = `
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="font-size:16px;">${theme.emoji}</span>
            <span style="font-size:11px;color:${theme.colors.text};font-weight:bold;">${theme.name}</span>
            ${isActive ? `<span style="margin-left:auto;color:${theme.colors.accent};font-size:10px;">✓</span>` : ''}
          </div>
          <div style="display:flex;gap:4px;">
            ${Object.values(theme.colors).slice(0,5).map(c => `<div style="width:16px;height:16px;border-radius:3px;background:${c};"></div>`).join('')}
          </div>`;
        card.addEventListener('click', () => {
          // 1. Overlay inmediato antes de cualquier cambio
          const ov = document.createElement('div');
          ov.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,0);transition:background 0.15s;pointer-events:all;display:flex;align-items:center;justify-content:center;';
          document.body.appendChild(ov);
          requestAnimationFrame(() => { ov.style.background = 'rgba(0,0,0,0.5)'; });

          setTimeout(() => {
            // 2. Aplicar tema
            THEMES.setActive(id);

            // 3. Remover style para forzar re-evaluación de Angular
            const styleEl = document.getElementById('bgfn-theme-style');
            if (styleEl) styleEl.remove();

            setTimeout(() => {
              // 4. Re-inyectar CSS con nuevo tema
              THEMES.apply();

              // 5. Re-renderizar panel de temas
              initThemesUI();

              // 6. Repaint de badges y dots
              THEMES.repaintBadges();
              setTimeout(() => THEMES.repaintBadges(), 300);
              setTimeout(() => THEMES.repaintBadges(), 800);

              // 7. Fade out overlay
              ov.style.background = 'rgba(0,0,0,0)';
              setTimeout(() => ov.remove(), 200);

              showToast(`🎨 Tema ${theme.name} aplicado`, 'ok', 2000);
            }, 80);
          }, 50);
        });
        card.addEventListener('mouseover', () => {
          THEMES.applyPreview(theme.colors);
          const mockup = document.getElementById('bgfn-theme-mockup');
          if (mockup) mockup.innerHTML = buildMockup(theme.colors);
          const preview = document.getElementById('bgfn-widget-stream-preview');
          const sel = document.getElementById('bgfn-widget-preview-select');
          if (preview && sel) preview.innerHTML = buildWidgetPreview(theme.colors, sel.value);
        });
        card.addEventListener('mouseout', () => {
          THEMES.removePreview();
          const mockup = document.getElementById('bgfn-theme-mockup');
          if (mockup) mockup.innerHTML = buildMockup(THEMES.getActive().colors);
          const preview = document.getElementById('bgfn-widget-stream-preview');
          const sel = document.getElementById('bgfn-widget-preview-select');
          if (preview && sel) preview.innerHTML = buildWidgetPreview(THEMES.getActive().colors, sel.value);
        });
        grid.appendChild(card);
      });

      // Sección de temas personalizados
      try {
        const customList = THEMES.getCustomList();
        if (customList.length > 0) {
          const sep = document.createElement('div');
          sep.style.cssText = 'grid-column:1/-1;font-size:9px;color:#555;letter-spacing:2px;margin-top:8px;margin-bottom:4px;';
          sep.textContent = t('themes.custom');
          grid.appendChild(sep);
          customList.forEach(ct => {
            const isActive = THEMES.getActiveId() === ct.id;
            const ccard = document.createElement('div');
            ccard.style.cssText = 'background:' + (ct.colors.surface||'#1a1a2e') + ';border:2px solid ' + (isActive ? ct.colors.accent : '#30363d') + ';border-radius:8px;padding:10px;cursor:pointer;transition:border .2s;position:relative;';
            ccard.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">' +
              '<span style="font-size:14px;">🎨</span>' +
              '<span style="font-size:11px;color:' + (ct.colors.text||'#fff') + ';font-weight:bold;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + ct.name + '</span>' +
              (isActive ? '<span style="color:' + ct.colors.accent + ';font-size:10px;">✓</span>' : '') +
              '<button data-id="' + ct.id + '" style="background:none;border:none;color:#ef4444;font-size:14px;cursor:pointer;padding:0 2px;line-height:1;">✕</button>' +
              '</div>' +
              '<div style="display:flex;gap:4px;">' +
              Object.values(ct.colors).slice(0,5).map(c => '<div style="width:16px;height:16px;border-radius:3px;background:' + c + ';"></div>').join('') +
              '</div>';
            // Click borrar
            ccard.querySelector('button[data-id]').addEventListener('click', (e) => {
              e.stopPropagation();
              try {
                const list = JSON.parse(localStorage.getItem('bgfn_custom_themes') || '[]');
                localStorage.setItem('bgfn_custom_themes', JSON.stringify(list.filter(t => t.id !== ct.id)));
              } catch(_) {}
              initThemesUI();
              showToast('Theme deleted', 'ok', 1500);
            });
            // Click aplicar
            ccard.addEventListener('click', () => {
              const ov = document.createElement('div');
              ov.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,0);transition:background 0.15s;pointer-events:all;';
              document.body.appendChild(ov);
              requestAnimationFrame(() => { ov.style.background = 'rgba(0,0,0,0.5)'; });
              setTimeout(() => {
                // Guardar como customTheme y activar sin flash
                THEMES.setCustom(ct.colors, ct.id, ct.name);
                const styleEl = document.getElementById('bgfn-theme-style');
                if (styleEl) styleEl.remove();
                setTimeout(() => {
                  THEMES.apply();
                  initThemesUI();
                  THEMES.repaintBadges();
                  setTimeout(() => THEMES.repaintBadges(), 300);
                  ov.style.background = 'rgba(0,0,0,0)';
                  setTimeout(() => ov.remove(), 200);
                  showToast('🎨 Tema "' + ct.name + '" aplicado', 'ok', 2000);
                }, 80);
              }, 50);
            });
            grid.appendChild(ccard);
          });
        }
      } catch(_) {}
    }

    // Botón probar
    document.getElementById('bgfn-theme-preview-btn')?.addEventListener('click', () => {
      THEMES.apply();
      showToast('✓ Tema aplicado a GFN', 'ok', 2000);
    });

    // Actualizar nombre y mockup con el tema activo actual
    const activeNow = THEMES.getActive();
    const nameEl = document.getElementById('bgfn-active-theme-name');
    if (nameEl) nameEl.textContent = (activeNow.emoji || '🎨') + ' ' + activeNow.name;
    const accentEl = document.getElementById('bgfn-active-theme-accent');
    if (accentEl) accentEl.textContent = t('theme.accent')+': ' + activeNow.colors.accent;
    const squareEl = document.getElementById('bgfn-active-theme-square');
    if (squareEl) { squareEl.style.background = activeNow.colors.bg; squareEl.style.borderColor = activeNow.colors.accent; }
    const mockupEl = document.getElementById('bgfn-theme-mockup');
    if (mockupEl) mockupEl.innerHTML = buildMockup(activeNow.colors);
    const previewEl = document.getElementById('bgfn-widget-stream-preview');
    const selEl = document.getElementById('bgfn-widget-preview-select');
    if (previewEl && selEl) previewEl.innerHTML = buildWidgetPreview(THEMES.getActive().colors, selEl.value);

    // Selector de widget preview
    const widgetSelect = document.getElementById('bgfn-widget-preview-select');
    if (widgetSelect) {
      widgetSelect.addEventListener('change', () => {
        const preview = document.getElementById('bgfn-widget-stream-preview');
        if (preview) preview.innerHTML = buildWidgetPreview(THEMES.getActive().colors, widgetSelect.value);
      });
    }

    // Botón crear nuevo tema — usar onclick para evitar acumulación de listeners
    const editBtn = document.getElementById('bgfn-theme-edit-btn');
    const editor = document.getElementById('bgfn-theme-editor');
    // Siempre resetear el editor al entrar/re-renderizar
    if (editor) { editor.style.display = 'none'; editor.innerHTML = ''; }
    if (editBtn) editBtn.textContent = t('themes.create');
    if (editBtn) {
      // Clonar el botón para eliminar listeners previos acumulados
      const freshBtn = editBtn.cloneNode(true);
      editBtn.parentNode.replaceChild(freshBtn, editBtn);
      freshBtn.onclick = () => {
        const ed = document.getElementById('bgfn-theme-editor');
        if (!ed) return;
        const isOpen = ed.style.display !== 'none';
        if (isOpen) {
          ed.style.display = 'none';
          ed.innerHTML = '';
          freshBtn.textContent = t('themes.create');
          THEMES.removePreview(); // restaurar tema activo si estaba en preview
        } else {
          ed.style.display = 'block';
          ed.innerHTML = '';
          buildColorEditor(ed);
          freshBtn.textContent = '✕ ' + t('btn.close').replace('✕ ','').toUpperCase();
        }
      };
    }

    // Sección widgets
    const widgetOpts = document.getElementById('bgfn-widget-color-opts');
    if (widgetOpts) {
      widgetOpts.innerHTML = '';
      const accentColor = active.colors.accent;

      // Opción: usar tema
      const opt1 = document.createElement('label');
      opt1.style.cssText = 'display:flex;align-items:center;gap:10px;cursor:pointer;';
      opt1.innerHTML = `<input type="radio" name="bgfn-widget-color" value="theme" style="accent-color:${accentColor};" ${!localStorage.getItem('bgfn_widget_color') || localStorage.getItem('bgfn_widget_color')==='theme'?'checked':''}><span style="font-size:12px;color:#ccc;">${t('widgets.color_theme')}</span><div style="width:16px;height:16px;border-radius:3px;background:${accentColor};margin-left:auto;"></div>`;
      opt1.querySelector('input').addEventListener('change', () => { localStorage.setItem('bgfn_widget_color', 'theme'); WIDGETS.applyTheme(accentColor); });

      // Opción: color custom para widgets
      const opt2 = document.createElement('label');
      opt2.style.cssText = 'display:flex;align-items:center;gap:10px;cursor:pointer;';
      const savedColor = localStorage.getItem('bgfn_widget_custom_color') || '#76b900';
      opt2.innerHTML = `<input type="radio" name="bgfn-widget-color" value="custom" style="accent-color:${accentColor};" ${localStorage.getItem('bgfn_widget_color')==='custom'?'checked':''}><span style="font-size:12px;color:#ccc;">${t('widgets.color_custom')}</span><input type="color" value="${savedColor}" id="bgfn-widget-custom-color" style="margin-left:auto;width:32px;height:28px;border:none;background:none;cursor:pointer;border-radius:4px;">`;
      opt2.querySelector('input[type="radio"]').addEventListener('change', () => { localStorage.setItem('bgfn_widget_color', 'custom'); });
      opt2.querySelector('input[type="color"]').addEventListener('input', (e) => {
        localStorage.setItem('bgfn_widget_color', 'custom');
        localStorage.setItem('bgfn_widget_custom_color', e.target.value);
        WIDGETS.applyTheme(e.target.value);
        opt2.querySelector('input[type="radio"]').checked = true;
      });

      widgetOpts.appendChild(opt1);
      widgetOpts.appendChild(opt2);
    }
  }

  function buildColorEditor(container) {
    const current = THEMES.getActive().colors;
    const ac = current.accent;
    const fields = [
      { key:'bg',        label:'Background' },
      { key:'surface',   label:'Surfaces / Cards' },
      { key:'accent',    label:'Accent color' },
      { key:'text',      label:'Main text' },
      { key:'textMuted', label:'Secondary text' },
      { key:'border',    label:'Borders' },
    ];
    const customColors = { ...current };

    container.innerHTML = '';

    // Nombre del tema
    const nameRow = document.createElement('div');
    nameRow.style.cssText = 'margin-bottom:12px;';
    nameRow.innerHTML = '<div style="font-size:9px;color:#555;margin-bottom:4px;letter-spacing:1px;">' + t('themes.name') + '</div>' +
      '<input id="bgfn-custom-name" type="text" placeholder="Mi tema..." maxlength="20" ' +
      'style="width:100%;background:#0d1117;border:1px solid #30363d;color:#fff;padding:8px;border-radius:6px;font-family:monospace;font-size:12px;box-sizing:border-box;">';
    container.appendChild(nameRow);

    // Color pickers
    fields.forEach(f => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;';
      row.innerHTML = '<span style="font-size:12px;color:#ccc;">' + f.label + '</span>' +
        '<input type="color" value="' + (current[f.key] || '#000000') + '" data-key="' + f.key + '" ' +
        'style="width:40px;height:32px;border:none;background:none;cursor:pointer;border-radius:4px;">';
      row.querySelector('input').addEventListener('input', (e) => {
        customColors[e.target.dataset.key] = e.target.value;
        THEMES.applyPreview(customColors);
      });
      container.appendChild(row);
    });

    // Botones Probar + Guardar
    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;margin-top:12px;';

    const tryBtn = document.createElement('button');
    tryBtn.textContent = t('themes.try');
    tryBtn.style.cssText = 'flex:1;background:#21262d;color:#ccc;border:1px solid #30363d;border-radius:6px;padding:10px;font-family:monospace;font-size:11px;cursor:pointer;';
    // Función compartida para aplicar con overlay completo (mismo flujo que cards de temas)
    function applyWithOverlay(colors, themeName, afterApply, themeId, themeSaveName) {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,0);transition:background 0.15s;pointer-events:all;';
      document.body.appendChild(ov);
      requestAnimationFrame(() => { ov.style.background = 'rgba(0,0,0,0.5)'; });
      setTimeout(() => {
        THEMES.setCustom(colors, themeId, themeSaveName);
        const styleEl = document.getElementById('bgfn-theme-style');
        if (styleEl) styleEl.remove();
        setTimeout(() => {
          THEMES.apply();
          initThemesUI();
          THEMES.repaintBadges();
          setTimeout(() => THEMES.repaintBadges(), 300);
          setTimeout(() => THEMES.repaintBadges(), 800);
          ov.style.background = 'rgba(0,0,0,0)';
          setTimeout(() => ov.remove(), 200);
          if (afterApply) afterApply();
          showToast('🎨 ' + themeName, 'ok', 2000);
        }, 80);
      }, 50);
    }

    tryBtn.addEventListener('click', () => {
      applyWithOverlay({ ...customColors }, 'Prueba temporal aplicada', null, 'preview', 'Prueba temporal');
    });

    const saveBtn = document.createElement('button');
    saveBtn.textContent = t('themes.save_apply');
    saveBtn.style.cssText = 'flex:1;background:' + ac + ';color:#000;border:none;border-radius:6px;padding:10px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;';
    saveBtn.addEventListener('click', () => {
      const name = (document.getElementById('bgfn-custom-name')?.value || '').trim() || 'Custom';
      try {
        const list = JSON.parse(localStorage.getItem('bgfn_custom_themes') || '[]');
        // Encontrar el próximo ID disponible desde 100
        const usedIds = list.map(t => parseInt(t.id)).filter(n => !isNaN(n));
        let nextId = 100;
        while (usedIds.includes(nextId)) nextId++;
        const id = String(nextId);
        list.push({ id, name, emoji: '🎨', colors: { ...customColors } });
        localStorage.setItem('bgfn_custom_themes', JSON.stringify(list));
        // Guardar Y aplicar inmediatamente con el mismo flujo que las cards
        applyWithOverlay({ ...customColors }, 'Tema "' + name + '" guardado y aplicado', null, id, name);
      } catch(_) {}
    });

    btnRow.appendChild(tryBtn);
    btnRow.appendChild(saveBtn);
    container.appendChild(btnRow);
  }

  // ── INIT ───────────────────────────────────────────────────────────────
  function tryInit() { if(document.body||document.documentElement)buildUI(); }
  tryInit();
  document.addEventListener('DOMContentLoaded',tryInit);
  new MutationObserver(tryInit).observe(document.documentElement||document,{childList:true});
  // Exponer WIDGETS.remove para botones de eliminar en el panel
  window.WIDGETS = WIDGETS;

  // Comunicación via CustomEvents del DOM (funciona en contexto aislado de Kiwi)
  document.addEventListener('bgfn-action', (e) => {
    const {action, page} = e.detail || {};
    if (action === 'openPage') openBGFNPage(page);
    if (action === 'openPanel') openPanel();
  });


  // ── PRE-GAME INTELIGENTE ───────────────────────────────────────────────────
  const PREGAME = (() => {
    // Servidor GFN name → [ping_id, queue_id_prefix]
    const SERVERS = {
      'New Jersey (USA)':          ['np-nwk-03', 'NP-NWK'],
      'Virginia (USA)':            ['np-ash-04', 'NP-ASH'],
      'Georgia (USA)':             ['np-atl-03', 'NP-ATL'],
      'Florida (USA)':             ['np-mia-03', 'NP-MIA'],
      'Texas (USA)':               ['np-dal-04', 'NP-DAL'],
      'Illinois (USA)':            ['np-chi-04', 'NP-CHI'],
      'N. California (USA)':       ['np-sjc6-04', 'NP-SJC6'],
      'S. California (USA)':       ['np-lax-03', 'NP-LAX'],
      'Oregon (USA)':              ['np-pdx-01', 'NP-PDX'],
      'Arizona (USA)':             ['np-phx-02', 'NP-PHX'],
      'Quebec (Canada)':           ['np-mon-02', 'NP-MON'],
      'United Kingdom 1':          ['np-lon-05', 'NP-LON'],
      'United Kingdom 2':          ['np-lon-07', 'NP-LON'],
      'France 1':                  ['np-par-04', 'NP-PAR'],
      'France 2':                  ['np-par-05', 'NP-PAR'],
      'Germany':                   ['np-frk-06', 'NP-FRK'],
      'Netherlands North':         ['np-ams-05', 'NP-AMS'],
      'Netherlands South':         ['np-ams-06', 'NP-AMS'],
      'Sweden':                    ['np-sth-04', 'NP-STH'],
      'Poland':                    ['np-waw-01', 'NP-WAW'],
      'Bulgaria':                  ['np-sof-02', 'NP-SOF'],
      'Japan':                     ['np-tyo-01', 'NP-TYO'],
    };

    let queueData = null;

    // Obtener datos de cola de PrintedWaste
    async function fetchQueue() {
      try {
        const r = await fetch('https://api.printedwaste.com/gfn/queue/get', {
          mode: 'no-cors', cache: 'no-store'
        });
        // no-cors devuelve opaque — no podemos leer el body directamente
        // Usar el truco de injectPageScript para leerlo desde el contexto real
        return null;
      } catch(_) { return null; }
    }

    // Obtener cola via CustomEvent (funciona en isolated world de Kiwi)
    function fetchQueueViaScript() {
      return new Promise(resolve => {
        const evId = 'bgfn-queue-' + Date.now();
        // Escuchar la respuesta
        const handler = (e) => {
          document.removeEventListener(evId + '-result', handler);
          resolve(e.detail || null);
        };
        document.addEventListener(evId + '-result', handler);
        // Inyectar script que hace el fetch en contexto real y devuelve via CustomEvent
        const script = document.createElement('script');
        script.textContent = `(function(){
          fetch('https://api.printedwaste.com/gfn/queue/get')
            .then(function(r){ return r.json(); })
            .then(function(d){ document.dispatchEvent(new CustomEvent('${evId}-result', {detail: d})); })
            .catch(function(){ document.dispatchEvent(new CustomEvent('${evId}-result', {detail: null})); });
        })();`;
        (document.head || document.documentElement).appendChild(script);
        script.remove();
        setTimeout(() => {
          document.removeEventListener(evId + '-result', handler);
          resolve(null);
        }, 6000);
      });
    }

    // Calcular ETA legible desde ms
    function etaLabel(etaMs) {
      if (!etaMs) return null;
      const s = Math.round(etaMs / 1000);
      if (s < 60) return s + 's';
      return Math.round(s / 60) + 'min';
    }

    // Obtener el mínimo queue de un prefijo de servidor
    function getQueueForServer(prefix) {
      if (!queueData) return null;
      const entries = Object.entries(queueData)
        .filter(([k]) => k.startsWith(prefix))
        .map(([, v]) => v);
      if (!entries.length) return null;
      // Tomar el de menor cola activo
      const active = entries.filter(e => e.QueuePosition !== undefined);
      if (!active.length) return null;
      const best = active.reduce((a, b) => a.QueuePosition < b.QueuePosition ? a : b);
      return { queue: best.QueuePosition, eta: best.eta ? etaLabel(best.eta) : null };
    }

    // Nombre del servidor activo en GFN settings → ID
    const GFN_NAME_MAP = {
      'automatic':              'np-nwk-03', // auto = NJ por defecto
      'new jersey':              'np-nwk-03',
      'virginia':                'np-ash-04',
      'georgia':                 'np-atl-03',
      'florida':                 'np-mia-03',
      'texas':                   'np-dal-04',
      'illinois':                'np-chi-04',
      'northern california':     'np-sjc6-04',
      'southern california':     'np-lax-03',
      'oregon':                  'np-pdx-01',
      'arizona':                 'np-phx-02',
      'quebec':                  'np-mon-02',
      'united kingdom 1':        'np-lon-05',
      'united kingdom 2':        'np-lon-07',
      'france 1':                'np-par-04',
      'france 2':                'np-par-05',
      'germany':                 'np-frk-06',
      'netherlands north':       'np-ams-05',
      'netherlands south':       'np-ams-06',
      'sweden':                  'np-sth-04',
      'poland':                  'np-waw-01',
      'bulgaria':                'np-sof-02',
      'japan':                   'np-tyo-01',
    };

    let results = null;
    let analyzing = false;
    let widgetEl = null;

    // Ping a un servidor — 3 intentos, tomar el mínimo
    async function pingServer(name, entry) {
      const id = Array.isArray(entry) ? entry[0] : entry;
      const url = `https://${id}.cloudmatchbeta.nvidiagrid.net`;
      const times = [];
      for (let i = 0; i < 3; i++) {
        const start = performance.now();
        try {
          await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' });
        } catch(_) {}
        times.push(Math.round(performance.now() - start));
        // Pequeña pausa entre pings
        if (i < 2) await new Promise(r => setTimeout(r, 200));
      }
      const ms = Math.min(...times);
      const prefix = Array.isArray(SERVERS[name]) ? SERVERS[name][1] : null;
      return { name, id, ms, prefix };
    }

    // Intentar cambiar servidor via el selector nativo de GFN
    function changeServer(serverName) {
      // Buscar el select de ubicación del servidor en settings
      const selects = document.querySelectorAll('mat-select, [role="combobox"]');
      for (const sel of selects) {
        const label = sel.closest('[class*="form-field"], [class*="setting"]')?.querySelector('label, [class*="label"]');
        if (label?.textContent?.toLowerCase().includes('servidor') ||
            label?.textContent?.toLowerCase().includes('server') ||
            label?.textContent?.toLowerCase().includes('ubicación')) {
          sel.click();
          setTimeout(() => {
            const opts = document.querySelectorAll('mat-option, [role="option"]');
            for (const opt of opts) {
              if (opt.textContent.trim() === serverName) {
                opt.click();
                showToast(`✓ Servidor cambiado a ${serverName}`, 'ok', 3000);
                return true;
              }
            }
          }, 300);
          return true;
        }
      }
      return false;
    }

    // Renderizar el widget de pre-juego
    function renderWidget(container, state) {
      if (!container) return;
      const ac = THEMES.getActive().colors.accent;

      if (state === 'analyzing') {
        container.innerHTML = `
          <div style="margin-top:8px;background:rgba(0,0,0,0.3);border-radius:8px;padding:10px 12px;font-family:monospace;">
            <div style="display:flex;align-items:center;gap:8px;color:#888;font-size:11px;">
              <span style="animation:spin 1s linear infinite;display:inline-block;">⟳</span>
              ${t('pregame.analyzing')}
            </div>
          </div>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>`;
        return;
      }

      if (state === 'done' && results) {
        const best = results[0];
        const statusText = t('pregame.best');
        const statusColor = ac;
        const statusIcon = '🏆';


        container.innerHTML = `
          <div style="margin-top:8px;background:rgba(0,0,0,0.3);border-radius:8px;padding:10px 12px;font-family:monospace;">
            <!-- Estado actual -->
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
              <span style="color:${statusColor};font-size:13px;">${statusIcon}</span>
              <span style="color:${statusColor};font-size:10px;font-weight:bold;">${statusText}</span>
            </div>

            <!-- Servidor recomendado -->
            <div style="font-size:9px;color:#555;margin-bottom:6px;letter-spacing:1px;">${t('pregame.best')}</div>
            ${(() => {
              const bq = best.prefix ? getQueueForServer(best.prefix) : null;
              const bqLabel = bq ? ` · ${t('pregame.col_queue')}:${bq.queue}${bq.eta ? ' ~'+bq.eta : ''}` : '';
              return `<button id="bgfn-pg-best-btn" style="width:100%;background:${ac};color:#000;border:none;border-radius:6px;padding:8px 12px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span>🏆 ${best.name}</span>
              <span>${best.ms}ms${bqLabel}</span>
            </button>`;
            })()}

            <!-- Toggle lista completa -->
            <button id="bgfn-pg-toggle" style="width:100%;background:transparent;border:1px solid #333;color:#888;border-radius:6px;padding:5px;font-family:monospace;font-size:10px;cursor:pointer;">
              ${t('pregame.see_all')}
            </button>

            <!-- Lista completa (oculta por defecto) -->
            <div id="bgfn-pg-list" style="display:none;margin-top:8px;max-height:200px;overflow-y:auto;">
              ${results.map((r, i) => {
                const isCurrent = false; // v1.2: detección de servidor activo
                const quality = r.ms < 100 ? '#22c55e' : r.ms < 200 ? '#86efac' : r.ms < 400 ? '#f59e0b' : '#ef4444';
                const cfg = getCfg();
                const q = r.prefix ? getQueueForServer(r.prefix) : null;
                const qParts = [];
                if (cfg.showQueue !== false && q) qParts.push('👥' + q.queue);
                if (cfg.showEta !== false && q?.eta) qParts.push('~' + q.eta);
                const qLabel = qParts.join(' ');
                const msLabel = cfg.showPing !== false ? r.ms + 'ms' : '';
                return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 6px;border-radius:4px;margin-bottom:2px;background:${isCurrent ? 'rgba(255,255,255,0.07)' : 'transparent'};cursor:pointer;" data-server="${r.name}" class="bgfn-pg-server-row">
                  <div>
                    <div style="font-size:10px;color:${isCurrent ? ac : '#ccc'};">${i === 0 ? '🏆 ' : isCurrent ? '● ' : '  '}${r.name}${isCurrent ? ' ✓' : ''}</div>
                    ${qLabel ? `<div style="font-size:8px;color:#555;">${qLabel}</div>` : ''}
                  </div>
                  ${msLabel ? `<span style="font-size:11px;color:${quality};font-weight:bold;">${msLabel}</span>` : ''}
                </div>`;
              }).join('')}
            </div>
          </div>`;

        // Listeners
        setTimeout(() => {
          document.getElementById('bgfn-pg-best-btn')?.addEventListener('click', () => {
            if (!changeServer(best.name)) {
              showToast(t('pregame.priority')+'...', 'warn', 4000);
            }
          });
          document.getElementById('bgfn-pg-toggle')?.addEventListener('click', () => {
            const list = document.getElementById('bgfn-pg-list');
            const btn = document.getElementById('bgfn-pg-toggle');
            if (list) {
              const open = list.style.display !== 'none';
              list.style.display = open ? 'none' : 'block';
              if (btn) btn.textContent = open ? t('pregame.see_all') : t('pregame.hide');
            }
          });
          document.querySelectorAll('.bgfn-pg-server-row').forEach(row => {
            row.addEventListener('click', () => {
              const name = row.dataset.server;
              if (name && !changeServer(name)) {
                showToast(`Go to Settings → switch to ${name}`, 'warn', 4000);
              }
            });
          });
        }, 50);
      }
    }

    // Leer config del panel
    function getCfg() {
      try { return JSON.parse(localStorage.getItem('bgfn_pregame_cfg') || '{}'); } catch(_) { return {}; }
    }

    // Inyectar el widget debajo del botón de acción principal
    function inject() {
      // Verificar si está habilitado
      const cfg = getCfg();
      if (cfg.enabled === false) return false;

      // Evitar duplicados
      if (document.getElementById('bgfn-pregame')) return true;

      // El contenedor de acciones del juego — solo existe en página de detalle
      const actionContainer = document.querySelector('.player-game-input-container, [class*="player-game-input"]');
      if (!actionContainer) return false;

      const wrapper = document.createElement('div');
      wrapper.id = 'bgfn-pregame';
      wrapper.style.cssText = 'padding:0 16px;';

      // Insertar después del contenedor de acciones
      actionContainer.insertAdjacentElement('afterend', wrapper);

      widgetEl = wrapper;

      // Iniciar análisis
      if (!analyzing && !results) {
        analyzing = true;
        renderWidget(wrapper, 'analyzing');
        analyze().then(() => {
          analyzing = false;
          renderWidget(wrapper, 'done');
        });
      } else if (results) {
        renderWidget(wrapper, 'done');
      }

      return true;
    }

    // Analizar todos los servidores + cola en paralelo
    async function analyze() {
      const entries = Object.entries(SERVERS);
      const [pings, queue] = await Promise.all([
        Promise.all(entries.map(([name, entry]) => pingServer(name, entry))),
        fetchQueueViaScript()
      ]);
      queueData = queue;
      const cfg = getCfg();
      const prio = (queueData && cfg.priority) || 'ping'; // si no hay cola, siempre por ping
      results = pings.sort((a, b) => {
        if (prio === 'queue' && queueData) {
          const qa = getQueueForServer(a.prefix)?.queue ?? 999;
          const qb = getQueueForServer(b.prefix)?.queue ?? 999;
          if (qa !== qb) return qa - qb;
          return a.ms - b.ms; // desempate por ping
        } else if (prio === 'both' && queueData) {
          const qa = getQueueForServer(a.prefix)?.queue ?? 25;
          const qb = getQueueForServer(b.prefix)?.queue ?? 25;
          const scoreA = (a.ms / 1000) + (qa / 50);
          const scoreB = (b.ms / 1000) + (qb / 50);
          return scoreA - scoreB;
        }
        return a.ms - b.ms; // siempre por ping como base
      });
    }

    // Watch basado en presencia del container — Angular no cambia el hash al navegar
    function watch() {
      let containerWasPresent = false;

      const cleanup = () => {
        const el = document.getElementById('bgfn-pregame');
        if (el) el.remove();
        widgetEl = null;
        results = null;
        analyzing = false;
        queueData = null;
      };

      setInterval(() => {
        const container = document.querySelector('.player-game-input-container');
        const hasContainer = !!container;
        const hasWidget = !!document.getElementById('bgfn-pregame');

        if (!hasContainer && containerWasPresent) {
          // Salimos de la página de detalle — limpiar
          cleanup();
          containerWasPresent = false;
        } else if (hasContainer && !containerWasPresent) {
          // Entramos a página de detalle — re-analizar siempre
          cleanup();
          containerWasPresent = true;
        }

        // Inyectar si hay container y no hay widget aún
        if (hasContainer && !hasWidget) {
          const cfg = getCfg();
          if (cfg.enabled !== false) inject();
        }
      }, 600);
    }

    return { watch, inject, analyze };
  })();

  GAMEPAD.init(); STATS.init(); WIDGETS.init(); THEMES.init(); watchSW(); watchVideo(); watchFullscreen(); PREGAME.watch();

  // Colapsar el tray de conexiones — buscar por la presencia de integration-tile-card en el mismo tile-card
  function fixIntegrationCard() {
    document.querySelectorAll('.gfngames-gfn-tile-card').forEach(card => {
      const isIntegration = card.querySelector('.integration-tile-card, gfn-integration-tile, [class*="integration-tile-inner"]');
      if (!isIntegration) return;
      // Encontrar el p tray dentro o justo después de esta card
      const tray = card.querySelector('p.gfngames-gfn-tile-card-tray-text') ||
                   card.parentElement?.querySelector('p.gfngames-gfn-tile-card-tray-text');
      if (tray) {
        tray.style.setProperty('background-color', 'var(--bgfn-bg, #1a1a2e)', 'important');
        tray.style.setProperty('color', 'var(--bgfn-bg, #1a1a2e)', 'important');
        tray.style.setProperty('height', '0', 'important');
        tray.style.setProperty('overflow', 'hidden', 'important');
        tray.style.setProperty('padding', '0', 'important');
        tray.style.setProperty('margin', '0', 'important');
        tray.style.setProperty('font-size', '0', 'important');
        tray.style.setProperty('line-height', '0', 'important');
        tray.style.setProperty('min-height', '0', 'important');
        tray.style.setProperty('max-height', '0', 'important');
      }
    });
  }
  fixIntegrationCard();
  setInterval(fixIntegrationCard, 500);
  if (document.body) new MutationObserver(fixIntegrationCard).observe(document.body, {childList:true, subtree:true});

  // Marcar cards de conexiones para que el CSS las ponga transparent
  // Kiwi no soporta :has() así que usamos un MutationObserver
  function markIntegrationCards() {
    document.querySelectorAll('.gfngames-gfn-tile-card').forEach(card => {
      if (card.querySelector('.integration-tile-card') && !card.classList.contains('bgfn-integration')) {
        card.classList.add('bgfn-integration');
      }
    });
  }
  // Disparar el acento del tema al contexto real via CustomEvent
  // Esto sobreescribe --mdc-theme-primary que GFN usa para el ripple de búsqueda
  function broadcastAccent() {
    const accent = THEMES.getActive().colors.accent;
    // Disparar al contexto real via CustomEvent
    document.dispatchEvent(new CustomEvent('bgfn-set-accent', { detail: accent }));
    // También re-inyectar directamente por si el listener no existe
    const script = document.createElement('script');
    script.textContent = `(function(){
      var accent = '${accent.replace(/'/g, "\'")}';
      var s = document.getElementById('bgfn-accent-override');
      if (!s) { s = document.createElement('style'); s.id = 'bgfn-accent-override'; document.head.appendChild(s); }
      s.textContent = '* { --mdc-theme-primary: ' + accent + ' !important; } .mdc-line-ripple::after { background-color: ' + accent + ' !important; }';
    })();`;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }
  // Hookear setActive para disparar el acento cuando cambia el tema
  const _origSetActive = THEMES.setActive.bind(THEMES);
  THEMES.setActive = (id) => { _origSetActive(id); broadcastAccent(); };
  // Disparar al init y cada vez que cambia el tema
  setTimeout(broadcastAccent, 500);
  setInterval(broadcastAccent, 2000);

  markIntegrationCards();
  if (document.body) {
    new MutationObserver(markIntegrationCards).observe(document.body, { childList:true, subtree:true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      new MutationObserver(markIntegrationCards).observe(document.body, { childList:true, subtree:true });
    });
  }

  // Mover contenedores de widgets dentro del canvas del stream
  // (igual que hacía el mini widget antes — única forma de aparecer en fullscreen)
  function watchStreamContainer() {
    setInterval(() => {
      if (!inGame) return;
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      const container = canvas.parentElement;
      if (!container) return;
      container.style.position = container.style.position || 'relative';

      Object.entries(WIDGETS.getContainers()).forEach(([posId, el]) => {
        if (!el) return;
        // Mover al contenedor del stream si no está ya ahí
        if (el.parentElement !== container) {
          container.appendChild(el);
          // Cambiar a position:absolute relativo al canvas
          el.style.position = 'absolute';
          el.style.zIndex = '99999';
        }
      });
    }, 500);
  }
  watchStreamContainer();

  // Construir menú flotante BGFN (fuera de Angular)
  // Esperar a que document.body esté disponible
  if (document.body) {
    buildFloatingNav();
  } else {
    document.addEventListener('DOMContentLoaded', buildFloatingNav);
  }

  // Intentar inyectar el menú lateral — reintenta hasta lograrlo
  let navInjected = false;
  const navObserver = new MutationObserver(() => {
    if (navInjected) return;
    const hasJuegos = Array.from(document.querySelectorAll('button')).some(b => b.textContent.trim() === 'Juegos' || b.textContent.trim() === 'Games');
    if (hasJuegos) { injectNavMenu(); navInjected = true; navObserver.disconnect(); }
  });
  navObserver.observe(document.body || document.documentElement, {childList:true, subtree:true});
  // También re-inyectar si el menú se recrea (Angular puede destruirlo)
  setInterval(() => {
    if (!document.getElementById('bgfn-nav-section')) { navInjected = false; injectNavMenu(); }
  }, 2000);

  // ── AUTOUPDATER ────────────────────────────────────────────────────────────
  // Tampermonkey → @updateURL/@downloadURL en el header ya maneja todo automáticamente.
  // Kiwi/APK    → No puede auto-reemplazar su propio archivo. Mostramos banner con
  //               link directo a la release para que el usuario descargue el ZIP.
  const BGFN_VERSION = '1.1.0';
  const BGFN_RELEASES_URL = 'https://github.com/karmadev0/better-geforce-now/releases/latest';
  const BGFN_API_URL = 'https://api.github.com/repos/karmadev0/better-geforce-now/releases/latest';
  const BGFN_ZIP_URL = 'https://github.com/karmadev0/better-geforce-now/releases/latest/download/bgfn-extension.zip';

  function compareSemver(a, b) {
    const pa = String(a).replace('v','').split('.').map(Number);
    const pb = String(b).replace('v','').split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if ((pa[i]||0) > (pb[i]||0)) return 1;
      if ((pa[i]||0) < (pb[i]||0)) return -1;
    }
    return 0;
  }

  // Detectar si corremos en Tampermonkey (tiene GM_info) o en Kiwi
  const isTampermonkey = typeof GM_info !== 'undefined' || typeof GM !== 'undefined';

  function showUpdateBanner(latest) {
    const old = document.getElementById('bgfn-update-banner');
    if (old) old.remove();

    const ac = accent();
    const banner = document.createElement('div');
    banner.id = 'bgfn-update-banner';
    banner.style.cssText = `background:#0d1f00;border:1px solid ${ac};border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:10px;margin:14px 18px 0;`;

    if (isTampermonkey) {
      // Tampermonkey: el update es automático, solo informar
      banner.innerHTML = `
        <div style="font-size:11px;color:${ac};font-weight:bold;">⬆ v${latest} available — Tampermonkey will update automatically</div>
        <div style="font-size:10px;color:#888;">Installed: v${BGFN_VERSION} · You can also update manually from the Tampermonkey dashboard</div>`;
    } else {
      // Kiwi/APK: dar link directo al ZIP
      banner.innerHTML = `
        <div>
          <div style="font-size:11px;color:${ac};font-weight:bold;">⬆ New version v${latest} available</div>
          <div style="font-size:10px;color:#888;margin-top:3px;">Installed: v${BGFN_VERSION} · Download the new ZIP and reinstall in Kiwi</div>
        </div>
        <div style="display:flex;gap:8px;">
          <a href="${BGFN_ZIP_URL}" target="_blank"
             style="flex:1;background:${ac};color:#000;border:none;border-radius:5px;padding:8px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;text-decoration:none;text-align:center;">
             ⬇ Download ZIP
          </a>
          <a href="${BGFN_RELEASES_URL}" target="_blank"
             style="flex:1;background:#21262d;color:${ac};border:1px solid ${ac};border-radius:5px;padding:8px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;text-decoration:none;text-align:center;">
             📋 Release notes
          </a>
        </div>
        <div id="bgfn-update-dismiss" style="font-size:9px;color:#555;text-align:center;cursor:pointer;">✕ Dismiss</div>`;
    }

    // Insertar al inicio del panel
    const panel = get('bgfn-panel');
    const panelContent = panel?.querySelector('div[style*="flex-direction:column;gap:14px"]');
    if (panelContent) panelContent.insertBefore(banner, panelContent.firstChild);
    else if (panel) panel.insertBefore(banner, panel.firstChild);

    document.getElementById('bgfn-update-dismiss')?.addEventListener('click', () => {
      banner.remove();
      // Guardar que fue dismissed para esta versión
      try { localStorage.setItem('bgfn_update_dismissed', latest); } catch(_) {}
    });
  }

  // Consultar GitHub API para versión nueva (solo una vez por sesión)
  setTimeout(() => {
    const dismissed = localStorage.getItem('bgfn_update_dismissed');
    fetch(BGFN_API_URL, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const latest = (data.tag_name || '').replace('v', '');
        if (!latest || compareSemver(latest, BGFN_VERSION) <= 0) return;
        if (dismissed === latest) return; // ya fue dismissed
        showToast(`⬆ v${latest} available`, 'ok', 5000);
        // Mostrar banner cuando abran el panel
        const panelObserver = new MutationObserver(() => {
          const panel = get('bgfn-panel');
          if (panel && panel.style.opacity === '1' && !get('bgfn-update-banner')) {
            showUpdateBanner(latest);
          }
        });
        panelObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] });
      }).catch(() => {});
  }, 5000);

  setInterval(tick, 1000);


})();