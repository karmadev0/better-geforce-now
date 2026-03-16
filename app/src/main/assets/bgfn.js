// Better GFN v1.0.1 — by Karmadev0
// https://github.com/karmadev0/better-geforce-now

(function () {
  'use strict';

  const CFG = {
    SESSION_LIMIT_MIN : 60,
    WARN_AT_MIN       : 50,
    DANGER_AT_MIN     : 55,
    MINI_DISPLAY      : 'remaining', // remaining | session | both | none
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
      { id:'native', label:'Nativo', desc:'~60 Hz — navegador nativo',       targetHz:60,   color:'#555'    },
      { id:'high',   label:'Alto',   desc:'~120 Hz — buen balance',           targetHz:120,  color:'#f59e0b' },
      { id:'ultra',  label:'Ultra',  desc:'~250 Hz — recomendado Bluetooth',  targetHz:250,  color:'#76b900' },
      { id:'max',    label:'Max',    desc:'Sin límite — máximo posible',       targetHz:null, color:'#3b82f6' },
    ];
    const PROFILES = [
      { name:'Xbox / Microsoft',              type:'xbox',        emoji:'🟢', match:/xbox|microsoft|xinput/i,                   buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:'PlayStation (DualShock/Sense)', type:'playstation', emoji:'🔵', match:/playstation|dualshock|dualsense|054c|sony/i, buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:'Nintendo (Switch Pro)',         type:'nintendo',    emoji:'🔴', match:/nintendo|switch|joy-con|057e/i,              buttons:[1,0,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16] },
      { name:'Genérico',                      type:'generic',     emoji:'🎮', match:/.*/,                                        buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] },
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
      const el=get('bgfn-gp-hz'); if(el){ el.textContent=mode.id==='native'?'60 Hz (nativo)':running?(hz+' Hz'):(pad?'iniciando...':'OFF'); el.style.color=hz>200?'#76b900':hz>100?'#f59e0b':'#555'; }
      const fl=get('bgfn-float-hz'); if(fl){ fl.textContent=mode.id==='native'?'~60Hz':(hz>0?hz+'Hz':'--'); fl.style.color=mode.color; }
    }
    function updateModeUI() { MODES.forEach(m=>{ const b=get('bgfn-poll-'+m.id); if(!b)return; const a=m.id===mode.id; b.style.background=a?m.color:'#21262d'; b.style.color=a?'#000':'#888'; b.style.borderColor=a?m.color:'#30363d'; b.style.fontWeight=a?'bold':'normal'; }); }
    function updatePadUI() {
      const ne=get('bgfn-gp-name'), te=get('bgfn-gp-type'), se=get('bgfn-gp-status'), sw=get('bgfn-gp-swaprow');
      if (!ne) return;
      if (pad && profile) { ne.textContent=profile.emoji+' '+profile.name; ne.style.color='#76b900'; te.textContent=pad.id.substring(0,45)+(pad.id.length>45?'…':''); se.textContent='● CONECTADO'; se.style.color='#76b900'; if(sw)sw.style.display=profile.type==='playstation'?'flex':'none'; }
      else { ne.textContent='Sin mando detectado'; ne.style.color='#555'; te.textContent='Conecta un mando para ver opciones'; se.textContent='○ DESCONECTADO'; se.style.color='#555'; if(sw)sw.style.display='none'; }
      updateHzUI(); updateModeUI();
    }

    return {
      init() {
        const desc=Object.getOwnPropertyDescriptor(Navigator.prototype,'getGamepads');
        orig=desc?desc.value:navigator.getGamepads.bind(navigator);
        Object.defineProperty(Navigator.prototype,'getGamepads',{ value:function(){ const r=orig.call(this); if(!remap||mode.id==='native'||!Object.keys(snapshots).length)return r; return Array.from(r).map((gp,i)=>gp?(snapshots[i]||gp):gp); }, configurable:true, writable:true });
        window.addEventListener('gamepadconnected',   e=>{ pad=e.gamepad; profile=detectProfile(e.gamepad); if(mode.id!=='native')startPoll(); updatePadUI(); showToast(`🎮 ${profile?.name} — ${mode.label}`,'ok',3000); });
        window.addEventListener('gamepaddisconnected',  ()=>{ pad=null; profile=null; stopPoll(); updatePadUI(); showToast('🎮 Mando desconectado','warn',2000); });
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
    showToast('▶ Sesión iniciada','ok',2000);
    if (!alertedVPN) { alertedVPN=true; setTimeout(showVPNNotice,1500); }
  }

  function onSessionEnded() {
    if (!sessionStart && !inGame) return;
    sessionStart=null; currentSessId=null; inGame=false; isFullscreen=false;
    alertedWarn=false; alertedDanger=false; alertedVPN=false;
    try { localStorage.removeItem('bgfn_session'); } catch(_) {}
    const wf=get('bgfn-float'); if(wf) wf.style.display='none';
    const mini=get('bgfn-mini'); if(mini) mini.style.display='none';
    updateLayout();
    ['bgfn-session','bgfn-remaining','bgfn-mini-remaining','bgfn-mini-session','bgfn-float-session','bgfn-float-remaining'].forEach(id=>{const el=get(id);if(el)el.textContent='--:--';});
    ['bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el){el.style.width='0%';el.style.background='#76b900';}});
    setStatus('idle'); showToast('⏹ Sesión terminada','warn',3000); hideVPNNotice();
  }

  // ── VPN NOTICE ─────────────────────────────────────────────────────────────
  function showVPNNotice() {
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
    const mini=get('bgfn-mini'), fab=get('bgfn-fab'), wf=get('bgfn-float');
    if (!mini||!fab||!wf) return;
    if (!inGame) {
      mini.style.display='none'; fab.style.display=panelOpen?'none':'flex'; wf.style.display='none';
    } else if (isFullscreen) {
      mini.style.display=CFG.MINI_DISPLAY!=='none'?'flex':'none'; fab.style.display='none'; wf.style.display='none';
    } else {
      mini.style.display='none'; fab.style.display='none'; wf.style.display='block';
    }
  }

  // ── PANEL ──────────────────────────────────────────────────────────────────
  function openPanel()  { const o=get('bgfn-overlay'),p=get('bgfn-panel'),f=get('bgfn-fab'); if(!o||!p)return; panelOpen=true;  o.style.display='block'; p.style.transform='translateY(0)';    p.style.opacity='1'; if(f)f.style.display='none';          GAMEPAD.updateUI(); }
  function closePanel() { const o=get('bgfn-overlay'),p=get('bgfn-panel'),f=get('bgfn-fab'); if(!o||!p)return; panelOpen=false; o.style.display='none';  p.style.transform='translateY(100%)'; p.style.opacity='0'; if(f&&!inGame)f.style.display='flex'; }

  // ── BUILD UI ───────────────────────────────────────────────────────────────
  function buildUI() {
    if (get('bgfn-mini')) return;
    const target=document.body||document.documentElement; if(!target)return;

    // Mini widget — fullscreen
    const mini=document.createElement('div');
    mini.id='bgfn-mini';
    mini.style.cssText='position:fixed;top:4px;left:4px;z-index:2147483647;background:rgba(0,0,0,0.72);border:1px solid #76b900;border-radius:6px;padding:4px 10px;font-family:monospace;text-align:center;display:none;flex-direction:column;align-items:center;gap:2px;';
    mini.innerHTML=`
      <div id="bgfn-mini-label" style="font-size:7px;color:#76b900;letter-spacing:1px;opacity:.8;">RESTA</div>
      <div id="bgfn-mini-remaining" style="font-size:16px;font-weight:bold;color:#76b900;line-height:1.1;">--:--</div>
      <div id="bgfn-mini-session-row" style="display:none;flex-direction:column;align-items:center;">
        <div style="font-size:7px;color:#76b900;letter-spacing:1px;opacity:.8;">SESIÓN</div>
        <div id="bgfn-mini-session" style="font-size:13px;font-weight:bold;color:#76b900;line-height:1.1;">--:--</div>
      </div>`;

    // VPN notice
    const vpn=document.createElement('div');
    vpn.id='bgfn-vpn-notice';
    vpn.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:2147483647;background:rgba(10,20,10,.97);border:1px solid #76b900;border-radius:10px;padding:10px 16px;font-family:monospace;color:#fff;display:none;flex-direction:column;align-items:center;gap:5px;box-shadow:0 4px 24px rgba(118,185,0,.25);max-width:290px;text-align:center;';
    vpn.innerHTML=`
      <div style="font-size:9px;color:#76b900;letter-spacing:2px;">● SESIÓN ESTABLECIDA</div>
      <div style="font-size:12px;line-height:1.4;">Ya puedes <strong style="color:#76b900;">desconectar tu VPN</strong><br>la sesión continuará activa</div>
      <button id="bgfn-vpn-ok" style="background:#76b900;color:#000;border:none;border-radius:5px;padding:5px 16px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;letter-spacing:1px;">ENTENDIDO</button>`;

    // Widget flotante — en juego fuera de fullscreen
    const wf=document.createElement('div');
    wf.id='bgfn-float';
    wf.style.cssText='position:fixed;top:50%;right:10px;transform:translateY(-50%);z-index:2147483647;background:rgba(0,0,0,0.88);border:2px solid #76b900;border-radius:8px;padding:10px 14px;font-family:monospace;text-align:center;display:none;min-width:120px;';
    wf.innerHTML=`
      <div style="font-size:8px;color:#555;letter-spacing:1px;margin-bottom:4px;">BGFN</div>
      <div id="bgfn-float-clock" style="font-size:14px;font-weight:bold;color:#fff;margin-bottom:6px;">--:--:--</div>
      <div style="font-size:8px;color:#888;">SESIÓN</div><div id="bgfn-float-session" style="font-size:13px;color:#76b900;margin-bottom:3px;">--:--</div>
      <div style="font-size:8px;color:#888;">RESTANTE</div><div id="bgfn-float-remaining" style="font-size:13px;color:#76b900;margin-bottom:6px;">--:--</div>
      <div style="background:#222;border-radius:3px;height:3px;overflow:hidden;margin-bottom:5px;"><div id="bgfn-float-bar" style="height:100%;width:0%;background:#76b900;transition:width 1s linear;"></div></div>
      <div id="bgfn-float-status" style="font-size:7px;color:#555;margin-bottom:3px;">EN JUEGO</div>
      <div style="font-size:7px;color:#444;">🎮 <span id="bgfn-float-hz" style="color:#76b900;">--</span></div>`;

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
          <span style="font-size:9px;color:#444;">v1.0.1</span>
        </div>
        <button id="bgfn-close" style="background:#1c2128;border:1px solid #30363d;color:#ccc;font-size:13px;cursor:pointer;padding:6px 12px;border-radius:6px;font-family:monospace;">✕ cerrar</button>
      </div>
      <div style="padding:14px 18px 20px;display:flex;flex-direction:column;gap:14px;">

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">SESIÓN ACTUAL</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">TIEMPO</div><div id="bgfn-session" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">RESTANTE</div><div id="bgfn-remaining" style="font-size:20px;color:#76b900;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">RELOJ</div><div id="bgfn-clock" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
          </div>
          <div style="margin-top:12px;background:#21262d;border-radius:4px;height:5px;overflow:hidden;"><div id="bgfn-bar" style="height:100%;width:0%;background:#76b900;transition:width 1s linear;border-radius:4px;"></div></div>
          <div id="bgfn-status" style="font-size:8px;color:#555;text-align:center;margin-top:7px;letter-spacing:1px;">○ SIN SESIÓN ACTIVA</div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">REGIÓN Y VPN</div>
          <div style="background:#0d1117;border-radius:6px;padding:10px 12px;margin-bottom:10px;">
            <div style="font-size:11px;color:#76b900;font-weight:bold;margin-bottom:4px;">💡 Truco sin VPN</div>
            <div style="font-size:10px;color:#888;line-height:1.6;">1. Conecta tu VPN a <strong style="color:#ccc;">US East / US Southeast</strong><br>2. Entra y lanza el juego<br>3. Cuando aparezca el aviso verde → desconecta la VPN<br>4. La sesión continúa activa sin VPN ✓</div>
          </div>
          <div style="background:#0d1117;border-radius:6px;padding:10px 12px;">
            <div style="font-size:11px;color:#ccc;font-weight:bold;margin-bottom:4px;">🌍 Cambiar servidor</div>
            <div style="font-size:10px;color:#666;line-height:1.6;">Selector nativo en: <strong style="color:#76b900;">Ajustes de GFN → Ubicación del servidor</strong><br>Mejores para LatAm: <strong style="color:#ccc;">US Southeast (Miami)</strong> · <strong style="color:#ccc;">US South (Atlanta)</strong></div>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">MANDO</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><div id="bgfn-gp-name" style="font-size:12px;color:#555;">Sin mando detectado</div><div id="bgfn-gp-status" style="font-size:9px;color:#555;">○ DESCONECTADO</div></div>
          <div id="bgfn-gp-type" style="font-size:9px;color:#444;margin-bottom:12px;word-break:break-all;">Conecta un mando para ver opciones</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;background:#0d1117;border-radius:6px;padding:8px 12px;"><span style="font-size:11px;color:#888;">Polling actual</span><span id="bgfn-gp-hz" style="font-size:16px;font-weight:bold;color:#555;">OFF</span></div>
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">MODO DE POLLING</div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">${modeBtns}</div>
          <div id="bgfn-poll-desc" style="font-size:9px;color:#555;text-align:center;margin-bottom:12px;min-height:14px;"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div><div style="font-size:12px;color:#ccc;">Remapeo de botones</div><div style="font-size:9px;color:#555;">Normaliza al estándar Xbox</div></div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-gp-remap" checked style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-gp-remap-dot" style="position:absolute;left:25px;top:3px;width:16px;height:16px;background:#76b900;border-radius:50%;transition:.2s;"></span></label>
          </div>
          <div id="bgfn-gp-swaprow" style="display:none;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;color:#ccc;">Intercambiar A↔B (PlayStation)</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" id="bgfn-gp-swapAB" style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span><span id="bgfn-gp-swap-dot" style="position:absolute;left:3px;top:3px;width:16px;height:16px;background:#555;border-radius:50%;transition:.2s;"></span></label>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">WIDGET EN FULLSCREEN</div>
          <div style="font-size:11px;color:#888;margin-bottom:10px;">¿Qué mostrar cuando estás jugando?</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;"><input type="radio" name="bgfn-mini-opt" value="remaining" style="accent-color:#76b900;"><span style="font-size:12px;color:#ccc;">Solo tiempo restante</span></label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;"><input type="radio" name="bgfn-mini-opt" value="session" style="accent-color:#76b900;"><span style="font-size:12px;color:#ccc;">Solo tiempo de sesión</span></label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;"><input type="radio" name="bgfn-mini-opt" value="both" style="accent-color:#76b900;"><span style="font-size:12px;color:#ccc;">Ambos</span></label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;"><input type="radio" name="bgfn-mini-opt" value="none" style="accent-color:#76b900;"><span style="font-size:12px;color:#ccc;">No mostrar nada</span></label>
          </div>
        </div>

        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">CONFIGURACIÓN TIMER</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:12px;color:#ccc;">Límite sesión (min)</span><input id="bgfn-opt-limit" type="number" value="60" min="30" max="240" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#76b900;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><span style="font-size:12px;color:#ccc;">Avisar a los (min)</span><input id="bgfn-opt-warn" type="number" value="50" min="10" max="230" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#f59e0b;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/></div>
          <button id="bgfn-save-opts" style="width:100%;background:#76b900;color:#000;border:none;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;font-weight:bold;cursor:pointer;letter-spacing:1px;">GUARDAR</button>
        </div>

        <div style="background:#0a0e18;border:1px solid #1c2128;border-radius:8px;padding:14px 16px;text-align:center;">
          <div style="font-size:11px;color:#76b900;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">BETTER GFN v1.0.1</div>
          <div style="font-size:9px;color:#444;margin-bottom:4px;">Hecho por <span style="color:#76b900;">Karmadev0</span></div>
          <a href="https://github.com/karmadev0/better-geforce-now" target="_blank" style="font-size:9px;color:#555;text-decoration:none;">github.com/karmadev0/better-geforce-now</a>
          <div style="font-size:8px;color:#2a2a2a;line-height:1.6;margin-top:8px;">El uso indebido es responsabilidad exclusiva del usuario. GeForce NOW es propiedad de NVIDIA Corporation. No afiliado ni respaldado por NVIDIA.</div>
        </div>

      </div>`;

    const toast=document.createElement('div');
    toast.id='bgfn-toast';
    toast.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(60px);background:rgba(10,20,10,.96);border:1px solid #76b900;border-radius:8px;padding:9px 18px;color:#fff;font-family:monospace;font-size:12px;z-index:2147483647;transition:transform .3s,opacity .3s;pointer-events:none;opacity:0;text-align:center;max-width:280px;';

    [mini,vpn,wf,fab,overlay,panel,toast].forEach(el=>target.appendChild(el));

    get('bgfn-close').addEventListener('click',closePanel);
    get('bgfn-vpn-ok').addEventListener('click',hideVPNNotice);
    GAMEPAD.getModes().forEach(m=>{ const b=get('bgfn-poll-'+m.id); if(!b)return; b.addEventListener('click',()=>{ GAMEPAD.setMode(m.id); const d=get('bgfn-poll-desc'); if(d)d.textContent=m.desc; }); });
    const rc=get('bgfn-gp-remap'),rd=get('bgfn-gp-remap-dot');
    rc.addEventListener('change',()=>{ GAMEPAD.setRemap(rc.checked); rd.style.left=rc.checked?'25px':'3px'; rd.style.background=rc.checked?'#76b900':'#555'; });
    const sc=get('bgfn-gp-swapAB'),sd=get('bgfn-gp-swap-dot');
    sc.addEventListener('change',()=>{ GAMEPAD.setSwapAB(sc.checked); sd.style.left=sc.checked?'25px':'3px'; sd.style.background=sc.checked?'#76b900':'#555'; });
    document.querySelectorAll('input[name="bgfn-mini-opt"]').forEach(r=>{ if(r.value===CFG.MINI_DISPLAY)r.checked=true; r.addEventListener('change',()=>{ CFG.MINI_DISPLAY=r.value; try{localStorage.setItem('bgfn_mini',r.value);}catch(_){} updateLayout(); }); });
    get('bgfn-save-opts').addEventListener('click',()=>{
      const limit=parseInt(get('bgfn-opt-limit').value)||60, warn=parseInt(get('bgfn-opt-warn').value)||50;
      CFG.SESSION_LIMIT_MIN=Math.max(30,Math.min(240,limit)); CFG.WARN_AT_MIN=Math.max(10,Math.min(limit-1,warn)); CFG.DANGER_AT_MIN=CFG.WARN_AT_MIN+5;
      try{localStorage.setItem('bgfn_cfg',JSON.stringify({limit,warn}));}catch(_){}
      showToast('✓ Configuración guardada','ok',1500);
    });
    try {
      const s=JSON.parse(localStorage.getItem('bgfn_cfg')||'{}');
      if(s.limit){get('bgfn-opt-limit').value=s.limit;CFG.SESSION_LIMIT_MIN=s.limit;}
      if(s.warn){get('bgfn-opt-warn').value=s.warn;CFG.WARN_AT_MIN=s.warn;CFG.DANGER_AT_MIN=s.warn+5;}
      const md=localStorage.getItem('bgfn_mini'); if(md){CFG.MINI_DISPLAY=md;const r=document.querySelector(`input[name="bgfn-mini-opt"][value="${md}"]`);if(r)r.checked=true;}
    } catch(_) {}
    const pd=get('bgfn-poll-desc'); if(pd) pd.textContent=GAMEPAD.getCurrentMode().desc;
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
    const now=new Date().toLocaleTimeString('es',{hour12:false});
    ['bgfn-clock','bgfn-float-clock'].forEach(id=>{const el=get(id);if(el)el.textContent=now;});
    if (!sessionStart) return;
    const e=elapsed(), em=e/60, ls=CFG.SESSION_LIMIT_MIN*60, r=Math.max(0,ls-e), pct=Math.min(100,(e/ls)*100);
    const col=em>=CFG.DANGER_AT_MIN?'#ef4444':em>=CFG.WARN_AT_MIN?'#f59e0b':'#76b900';
    [['bgfn-session',fmt(e)],['bgfn-float-session',fmt(e)],['bgfn-remaining',fmt(r)],['bgfn-float-remaining',fmt(r)],['bgfn-mini-remaining',fmt(r)],['bgfn-mini-session',fmt(e)]].forEach(([id,v])=>{const el=get(id);if(el)el.textContent=v;});
    ['bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el)el.style.width=pct+'%';});
    ['bgfn-remaining','bgfn-float-remaining','bgfn-mini-remaining','bgfn-mini-session','bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el)el.style.color=col;});
    if(em>=CFG.DANGER_AT_MIN){setStatus('danger');if(!alertedDanger){alertedDanger=true;showToast(`⚠ ¡Quedan ${fmt(r)}! GUARDA YA`,'danger',8000);}}
    else if(em>=CFG.WARN_AT_MIN){setStatus('warn');if(!alertedWarn){alertedWarn=true;showToast(`⏳ ${Math.floor(em)} min — prepárate para guardar`,'warn',6000);}}
    else setStatus('active');
    const d=CFG.MINI_DISPLAY;
    const remEl=get('bgfn-mini-remaining'),sessRow=get('bgfn-mini-session-row'),label=get('bgfn-mini-label');
    if(remEl)   remEl.style.display   =(d==='remaining'||d==='both')?'block':'none';
    if(sessRow) sessRow.style.display =(d==='session'||d==='both')?'flex':'none';
    if(label)   label.style.display   = d==='session'?'none':'block';
  }

  function setStatus(m) {
    const t={active:'● EN JUEGO',idle:'○ SIN SESIÓN ACTIVA',danger:'⚠ GUARDA YA',warn:'⏳ PREPÁRATE'};
    const c={active:'#76b900',idle:'#555',danger:'#ef4444',warn:'#f59e0b'};
    ['bgfn-status','bgfn-float-status'].forEach(id=>{const el=get(id);if(el){el.textContent=t[m]||'';el.style.color=c[m]||'#555';}});
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

  // ── INYECTAR MINI DENTRO DEL CANVAS DEL STREAM ─────────────────────────
  function watchStreamContainer() {
    setInterval(()=>{
      const mini=get('bgfn-mini');
      if(!mini||!isFullscreen||mini.parentElement?.tagName!=='HTML')return;
      const canvas=document.querySelector('canvas'); if(!canvas)return;
      const container=canvas.parentElement; if(!container||container===mini.parentElement)return;
      container.style.position=container.style.position||'relative';
      container.appendChild(mini);
      mini.style.position='absolute'; mini.style.top='8px'; mini.style.left='8px'; mini.style.zIndex='99999';
    },1000);
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
    setInterval(()=>{ const v=document.querySelector('video'); if(v&&!v.paused&&v.readyState>=3&&!sessionStart)onSessionActive('video-'+Date.now()); },2000);
  }

  // ── INIT ───────────────────────────────────────────────────────────────
  function tryInit() { if(document.body||document.documentElement)buildUI(); }
  tryInit();
  document.addEventListener('DOMContentLoaded',tryInit);
  new MutationObserver(tryInit).observe(document.documentElement||document,{childList:true});
  GAMEPAD.init(); watchSW(); watchVideo(); watchFullscreen(); watchStreamContainer();

  // ── AUTOUPDATER ────────────────────────────────────────────────────────────
  // Tampermonkey: usa @updateURL/@downloadURL automáticamente
  // Kiwi ZIP y APK: descarga el nuevo bgfn.js, lo guarda en localStorage
  // y lo ejecuta en el próximo load sin reinstalar nada
  const BGFN_VERSION = '1.0.1';
  const BGFN_SCRIPT_URL = 'https://github.com/karmadev0/better-geforce-now/releases/latest/download/better-gfn.user.js';
  const BGFN_API_URL = 'https://api.github.com/repos/karmadev0/better-geforce-now/releases/latest';

  function compareSemver(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if ((pa[i]||0) > (pb[i]||0)) return 1;
      if ((pa[i]||0) < (pb[i]||0)) return -1;
    }
    return 0;
  }

  function showUpdateBanner(latest) {
    // Quitar banner anterior si existe
    const old = document.getElementById('bgfn-update-banner');
    if (old) old.remove();

    const banner = document.createElement('div');
    banner.id = 'bgfn-update-banner';
    banner.style.cssText = 'background:#1c3a00;border:1px solid #76b900;border-radius:8px;padding:10px 14px;display:flex;flex-direction:column;gap:8px;margin:14px 18px 0;';
    banner.innerHTML = `
      <div>
        <div style="font-size:11px;color:#76b900;font-weight:bold;">⬆ Nueva versión disponible: v${latest}</div>
        <div style="font-size:10px;color:#888;margin-top:2px;">Versión instalada: v${BGFN_VERSION}</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button id="bgfn-update-now" style="flex:1;background:#76b900;color:#000;border:none;border-radius:5px;padding:7px;font-family:monospace;font-size:10px;font-weight:bold;cursor:pointer;">⬇ ACTUALIZAR AHORA</button>
        <a href="https://github.com/karmadev0/better-geforce-now/releases/latest" target="_blank" style="flex:1;background:#21262d;color:#76b900;border:1px solid #76b900;border-radius:5px;padding:7px;font-family:monospace;font-size:10px;font-weight:bold;cursor:pointer;text-decoration:none;text-align:center;">VER RELEASE</a>
      </div>
      <div id="bgfn-update-status" style="font-size:9px;color:#555;text-align:center;display:none;"></div>
    `;

    const panel = get('bgfn-panel');
    if (panel) panel.insertBefore(banner, panel.firstChild);

    document.getElementById('bgfn-update-now')?.addEventListener('click', () => downloadAndApplyUpdate(latest));
  }

  function downloadAndApplyUpdate(latest) {
    const btn = document.getElementById('bgfn-update-now');
    const status = document.getElementById('bgfn-update-status');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Descargando...'; }
    if (status) { status.style.display = 'block'; status.textContent = 'Descargando nueva versión...'; }

    fetch(BGFN_SCRIPT_URL)
      .then(r => {
        if (!r.ok) throw new Error('Error al descargar');
        return r.text();
      })
      .then(code => {
        // Guardar en localStorage
        try {
          localStorage.setItem('bgfn_cached_script', code);
          localStorage.setItem('bgfn_cached_version', latest);
        } catch(_) {}

        if (status) status.textContent = '✓ Actualización descargada — recarga la página para aplicarla';
        if (btn) { btn.textContent = '↺ RECARGAR AHORA'; btn.disabled = false; btn.onclick = () => location.reload(); }
        showToast(`✓ v${latest} descargada — recarga para aplicar`, 'ok', 5000);
      })
      .catch(() => {
        if (status) status.textContent = '✗ Error al descargar — intenta desde la release';
        if (btn) { btn.textContent = '⬇ REINTENTAR'; btn.disabled = false; btn.onclick = () => downloadAndApplyUpdate(latest); }
      });
  }

  // Al cargar, verificar si hay script cacheado más nuevo y ejecutarlo
  function checkCachedUpdate() {
    try {
      const cachedVersion = localStorage.getItem('bgfn_cached_version');
      const cachedScript = localStorage.getItem('bgfn_cached_script');
      if (cachedVersion && cachedScript && compareSemver(cachedVersion, BGFN_VERSION) > 0) {
        console.log('[BGFN] Aplicando versión cacheada:', cachedVersion);
        const script = document.createElement('script');
        script.textContent = cachedScript;
        document.head.appendChild(script);
        return true; // Script nuevo ya ejecutado
      }
    } catch(_) {}
    return false;
  }

  // Consultar GitHub API para versión nueva
  setTimeout(() => {
    fetch(BGFN_API_URL)
      .then(r => r.json())
      .then(data => {
        const latest = data.tag_name?.replace('v','');
        if (latest && compareSemver(latest, BGFN_VERSION) > 0) {
          showUpdateBanner(latest);
          showToast(`⬆ Nueva versión v${latest} disponible`, 'ok', 6000);
        }
      }).catch(() => {});
  }, 4000);

  setInterval(tick, 1000);

})();
