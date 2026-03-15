(function () {
  'use strict';

  // ============================================================
  //  BETTER GFN v1.0.0 — by Karmadev0
  // ============================================================

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

  function fmt(sec) {
    const m=Math.floor(Math.max(0,sec)/60), s=Math.floor(Math.max(0,sec)%60);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function get(id) { return document.getElementById(id); }
  function currentElapsed() { return sessionStart?(Date.now()-sessionStart)/1000:0; }

  // ============================================================
  //  GAMEPAD MODULE
  // ============================================================
  const GAMEPAD = (() => {
    const POLL_MODES = [
      { id:'native', label:'Nativo', desc:'~60 Hz — igual que el navegador', targetHz:60,   color:'#555'    },
      { id:'high',   label:'Alto',   desc:'~120 Hz — buen balance',          targetHz:120,  color:'#f59e0b' },
      { id:'ultra',  label:'Ultra',  desc:'~250 Hz — recomendado Bluetooth', targetHz:250,  color:'#76b900' },
      { id:'max',    label:'Max',    desc:'Sin límite — máximo posible',      targetHz:null, color:'#3b82f6' },
    ];
    const PROFILES = [
      { name:'Xbox / Microsoft',              type:'xbox',        emoji:'🟢', match:/xbox|microsoft|xinput/i,                   buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], axes:[0,1,2,3] },
      { name:'PlayStation (DualShock/Sense)', type:'playstation', emoji:'🔵', match:/playstation|dualshock|dualsense|054c|sony/i, buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], axes:[0,1,2,3] },
      { name:'Nintendo (Switch Pro)',         type:'nintendo',    emoji:'🔴', match:/nintendo|switch|joy-con|057e/i,              buttons:[1,0,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16], axes:[0,1,2,3] },
      { name:'Genérico',                      type:'generic',     emoji:'🎮', match:/.*/,                                        buttons:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], axes:[0,1,2,3] },
    ];

    let activeProfile=null,detectedPad=null,remapEnabled=true;
    let currentMode=POLL_MODES[2],padSnapshots={},_orig=null;
    let hfChannel=null,hfRunning=false,hfCount=0,hfHz=0,lastHfTime=0,lastPollTime=0;

    function pollTick(){
      if(!hfRunning)return;
      const now=performance.now();
      if(currentMode.targetHz!==null&&now-lastPollTime<1000/currentMode.targetHz){hfChannel.port1.postMessage(null);return;}
      lastPollTime=now;
      try{Array.from(_orig.call(navigator)).forEach((pad,i)=>{if(!pad)return;padSnapshots[i]=buildSnapshot(pad,detectProfile(pad));});}catch(_){}
      hfCount++;
      if(now-lastHfTime>=1000){hfHz=hfCount;hfCount=0;lastHfTime=now;updateHzDisplay();}
      hfChannel.port1.postMessage(null);
    }
    function startPolling(){
      if(hfRunning)stopPolling();
      if(currentMode.id==='native')return;
      hfRunning=true;hfChannel=new MessageChannel();
      hfChannel.port2.onmessage=pollTick;hfChannel.port1.postMessage(null);
    }
    function stopPolling(){
      hfRunning=false;hfHz=0;
      if(hfChannel){try{hfChannel.port1.close();hfChannel.port2.close();}catch(_){}hfChannel=null;}
      padSnapshots={};updateHzDisplay();
    }
    function setMode(id){
      const m=POLL_MODES.find(x=>x.id===id);if(!m)return;
      currentMode=m;try{localStorage.setItem('bgfn_poll_mode',id);}catch(_){}
      if(detectedPad){stopPolling();if(id!=='native')startPolling();}
      updateModeUI();
    }
    function buildSnapshot(pad,profile){
      if(!profile||profile.type==='xbox')return clonePad(pad);
      return{id:pad.id,index:pad.index,connected:pad.connected,timestamp:pad.timestamp,mapping:'standard',
        buttons:profile.buttons.map(i=>{const b=pad.buttons[i];return b?{pressed:b.pressed,touched:b.touched||false,value:b.value}:{pressed:false,touched:false,value:0};}),
        axes:profile.axes.map(i=>pad.axes[i]||0)};
    }
    function clonePad(pad){
      return{id:pad.id,index:pad.index,connected:pad.connected,timestamp:pad.timestamp,mapping:pad.mapping,
        buttons:Array.from(pad.buttons).map(b=>({pressed:b.pressed,touched:b.touched||false,value:b.value})),
        axes:Array.from(pad.axes)};
    }
    function detectProfile(gp){
      if(!gp)return null;const id=(gp.id||'').toLowerCase();
      return PROFILES.find(p=>p.match.test(id))||PROFILES[PROFILES.length-1];
    }
    function hookGetGamepads(){
      const desc=Object.getOwnPropertyDescriptor(Navigator.prototype,'getGamepads');
      _orig=desc?desc.value:navigator.getGamepads.bind(navigator);
      Object.defineProperty(Navigator.prototype,'getGamepads',{
        value:function(){
          const real=_orig.call(this);
          if(!remapEnabled||currentMode.id==='native'||!Object.keys(padSnapshots).length)return real;
          return Array.from(real).map((pad,i)=>pad?(padSnapshots[i]||pad):pad);
        },configurable:true,writable:true
      });
    }
    function updateHzDisplay(){
      const el=get('bgfn-gp-hz');
      if(el){el.textContent=currentMode.id==='native'?'60 Hz (nativo)':hfRunning?(hfHz+' Hz'):(detectedPad?'iniciando...':'OFF');el.style.color=hfHz>200?'#76b900':hfHz>100?'#f59e0b':'#555';}
      const fl=get('bgfn-float-hz');
      if(fl){fl.textContent=currentMode.id==='native'?'~60Hz':(hfHz>0?hfHz+'Hz':'--');fl.style.color=currentMode.color;}
    }
    function updateModeUI(){
      POLL_MODES.forEach(m=>{const b=get('bgfn-poll-'+m.id);if(!b)return;const a=m.id===currentMode.id;b.style.background=a?m.color:'#21262d';b.style.color=a?'#000':'#888';b.style.borderColor=a?m.color:'#30363d';b.style.fontWeight=a?'bold':'normal';});
    }
    function watchConnection(){
      window.addEventListener('gamepadconnected',e=>{detectedPad=e.gamepad;activeProfile=detectProfile(e.gamepad);if(currentMode.id!=='native')startPolling();updateGamepadUI();showToast(`🎮 ${activeProfile?.name} — polling ${currentMode.label}`,'ok',3000);});
      window.addEventListener('gamepaddisconnected',()=>{detectedPad=null;activeProfile=null;stopPolling();updateGamepadUI();showToast('🎮 Mando desconectado','warn',2000);});
    }
    function checkExisting(){
      try{Array.from(_orig.call(navigator)).forEach(pad=>{if(pad&&!detectedPad){detectedPad=pad;activeProfile=detectProfile(pad);if(currentMode.id!=='native')startPolling();}});updateGamepadUI();}catch(_){}
    }
    function updateGamepadUI(){
      const ne=get('bgfn-gp-name'),te=get('bgfn-gp-type'),se=get('bgfn-gp-status'),sw=get('bgfn-gp-swaprow');
      if(!ne)return;
      if(detectedPad&&activeProfile){ne.textContent=activeProfile.emoji+' '+activeProfile.name;ne.style.color='#76b900';te.textContent=detectedPad.id.substring(0,45)+(detectedPad.id.length>45?'…':'');se.textContent='● CONECTADO';se.style.color='#76b900';if(sw)sw.style.display=activeProfile.type==='playstation'?'flex':'none';}
      else{ne.textContent='Sin mando detectado';ne.style.color='#555';te.textContent='Conecta un mando para ver opciones';se.textContent='○ DESCONECTADO';se.style.color='#555';if(sw)sw.style.display='none';}
      updateHzDisplay();updateModeUI();
    }
    return{
      init(){hookGetGamepads();watchConnection();try{const s=localStorage.getItem('bgfn_poll_mode');if(s)currentMode=POLL_MODES.find(m=>m.id===s)||currentMode;}catch(_){}setTimeout(checkExisting,800);},
      setRemapEnabled(v){remapEnabled=v;if(!v)stopPolling();else if(detectedPad&&currentMode.id!=='native')startPolling();},
      setSwapAB(v){const ps=PROFILES.find(p=>p.type==='playstation');if(ps){ps.buttons[0]=v?1:0;ps.buttons[1]=v?0:1;}},
      setMode,updateUI:updateGamepadUI,
      getHz(){return hfHz;},getModes(){return POLL_MODES;},getCurrentMode(){return currentMode;},
    };
  })();

  // ============================================================
  //  SESIÓN
  // ============================================================
  function onSessionActive(sessId){
    if(sessId===currentSessId&&sessionStart)return;
    sessionStart=Date.now();currentSessId=sessId;
    alertedWarn=false;alertedDanger=false;inGame=true;
    closePanel();updateLayout();
    showToast('▶ Sesión iniciada','ok',2000);
    if(!alertedVPN){alertedVPN=true;setTimeout(showVPNNotice,1500);}
  }
  function onSessionEnded(){
    if(!sessionStart&&!inGame)return;
    sessionStart=null;currentSessId=null;
    alertedWarn=false;alertedDanger=false;alertedVPN=false;inGame=false;
    updateLayout();
    ['bgfn-session','bgfn-remaining','bgfn-mini-remaining','bgfn-float-session','bgfn-float-remaining'].forEach(id=>{const el=get(id);if(el)el.textContent='--:--';});
    ['bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el){el.style.width='0%';el.style.background='#76b900';}});
    setStatus('idle');showToast('⏹ Sesión terminada — timer reiniciado','warn',3000);hideVPNNotice();
  }

  // ============================================================
  //  VPN NOTICE
  // ============================================================
  function showVPNNotice(){
    const el=get('bgfn-vpn-notice');if(!el)return;
    el.style.display='flex';el.style.opacity='0';el.style.transform='translateX(-50%) translateY(-20px)';
    setTimeout(()=>{el.style.transition='opacity .4s,transform .4s';el.style.opacity='1';el.style.transform='translateX(-50%) translateY(0)';},50);
    setTimeout(hideVPNNotice,12000);
  }
  function hideVPNNotice(){
    const el=get('bgfn-vpn-notice');if(!el)return;
    el.style.opacity='0';el.style.transform='translateX(-50%) translateY(-20px)';
    setTimeout(()=>{el.style.display='none';},400);
  }

  // ============================================================
  //  LAYOUT
  // ============================================================
  function updateLayout(){
    const mini=get('bgfn-mini'),fab=get('bgfn-fab'),wf=get('bgfn-float');
    if(!mini||!fab||!wf)return;
    if(!inGame){
      mini.style.display='none';
      // FAB solo visible si el panel está cerrado
      fab.style.display=panelOpen?'none':'flex';
      wf.style.display='none';
    } else if(isFullscreen){
      mini.style.display='flex';fab.style.display='none';wf.style.display='none';
    } else {
      mini.style.display='none';fab.style.display='none';wf.style.display='block';
    }
  }

  // ============================================================
  //  PANEL
  // ============================================================
  function openPanel(){
    const o=get('bgfn-overlay'),p=get('bgfn-panel'),fab=get('bgfn-fab');
    if(!o||!p)return;
    panelOpen=true;
    o.style.display='block';
    p.style.transform='translateY(0)';p.style.opacity='1';
    // Ocultar FAB al abrir
    if(fab)fab.style.display='none';
    GAMEPAD.updateUI();
  }
  function closePanel(){
    const o=get('bgfn-overlay'),p=get('bgfn-panel'),fab=get('bgfn-fab');
    if(!o||!p)return;
    panelOpen=false;
    o.style.display='none';
    p.style.transform='translateY(100%)';p.style.opacity='0';
    // Mostrar FAB al cerrar (solo si no estamos en juego)
    if(fab&&!inGame)fab.style.display='flex';
  }

  // ============================================================
  //  BUILD UI
  // ============================================================
  function buildUI(){
    if(get('bgfn-mini'))return;
    const target=document.body||document.documentElement;
    if(!target)return;

    // Mini
    const mini=document.createElement('div');
    mini.id='bgfn-mini';
    mini.style.cssText='position:fixed;top:8px;left:8px;z-index:2147483647;background:rgba(0,0,0,0.65);border:1px solid #76b900;border-radius:6px;padding:3px 9px;font-family:monospace;text-align:center;display:none;flex-direction:column;align-items:center;';
    mini.innerHTML=`<div style="font-size:7px;color:#76b900;letter-spacing:1px;opacity:.7;">RESTA</div><div id="bgfn-mini-remaining" style="font-size:15px;font-weight:bold;color:#76b900;line-height:1.2;">--:--</div>`;

    // VPN notice
    const vpnNotice=document.createElement('div');
    vpnNotice.id='bgfn-vpn-notice';
    vpnNotice.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:2147483647;background:rgba(10,20,10,.97);border:1px solid #76b900;border-radius:10px;padding:10px 16px;font-family:monospace;color:#fff;display:none;flex-direction:column;align-items:center;gap:5px;box-shadow:0 4px 24px rgba(118,185,0,.25);max-width:290px;text-align:center;';
    vpnNotice.innerHTML=`
      <div style="font-size:9px;color:#76b900;letter-spacing:2px;margin-bottom:2px;">● SESIÓN ESTABLECIDA</div>
      <div style="font-size:12px;color:#fff;line-height:1.4;">Ya puedes <strong style="color:#76b900;">desconectar tu VPN</strong><br>la sesión continuará activa</div>
      <button id="bgfn-vpn-ok" style="margin-top:4px;background:#76b900;color:#000;border:none;border-radius:5px;padding:5px 16px;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;letter-spacing:1px;">ENTENDIDO</button>
    `;

    // Float
    const wfloat=document.createElement('div');
    wfloat.id='bgfn-float';
    wfloat.style.cssText='position:fixed;top:50%;right:10px;transform:translateY(-50%);z-index:2147483647;background:rgba(0,0,0,0.88);border:2px solid #76b900;border-radius:8px;padding:10px 14px;font-family:monospace;text-align:center;display:none;min-width:120px;';
    wfloat.innerHTML=`
      <div style="font-size:8px;color:#555;letter-spacing:1px;margin-bottom:4px;">BGFN</div>
      <div id="bgfn-float-clock" style="font-size:14px;font-weight:bold;color:#fff;margin-bottom:6px;">--:--:--</div>
      <div style="font-size:8px;color:#888;">SESIÓN</div>
      <div id="bgfn-float-session" style="font-size:13px;color:#76b900;margin-bottom:3px;">--:--</div>
      <div style="font-size:8px;color:#888;">RESTANTE</div>
      <div id="bgfn-float-remaining" style="font-size:13px;color:#76b900;margin-bottom:6px;">--:--</div>
      <div style="background:#222;border-radius:3px;height:3px;overflow:hidden;margin-bottom:5px;">
        <div id="bgfn-float-bar" style="height:100%;width:0%;background:#76b900;transition:width 1s linear;"></div>
      </div>
      <div id="bgfn-float-status" style="font-size:7px;color:#555;margin-bottom:3px;">EN JUEGO</div>
      <div style="font-size:7px;color:#444;">🎮 <span id="bgfn-float-hz" style="color:#76b900;">--</span></div>
    `;

    // FAB
    const fab=document.createElement('div');
    fab.id='bgfn-fab';
    fab.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:2147483647;background:#76b900;color:#000;font-family:monospace;font-size:12px;font-weight:bold;padding:10px 22px;border-radius:24px;cursor:pointer;display:flex;align-items:center;gap:7px;box-shadow:0 4px 18px rgba(118,185,0,.4);letter-spacing:1px;user-select:none;transition:opacity .2s,transform .2s;';
    fab.innerHTML=`<span style="font-size:15px;">⚙</span> BETTER GFN`;
    fab.addEventListener('click',openPanel);

    // Overlay
    const overlay=document.createElement('div');
    overlay.id='bgfn-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:2147483640;background:rgba(0,0,0,0.6);display:none;';
    overlay.addEventListener('click',closePanel);

    const modeBtns=GAMEPAD.getModes().map(m=>`
      <button id="bgfn-poll-${m.id}" style="flex:1;padding:8px 4px;border-radius:6px;border:1px solid #30363d;background:#21262d;color:#888;font-family:monospace;font-size:10px;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:2px;">
        <span style="font-size:12px;font-weight:bold;">${m.label}</span>
        <span style="font-size:8px;opacity:.6;">${m.targetHz?m.targetHz+'Hz':'∞'}</span>
      </button>`).join('');

    // Panel
    const panel=document.createElement('div');
    panel.id='bgfn-panel';
    panel.style.cssText='position:fixed;bottom:0;left:0;width:100%;z-index:2147483645;max-height:85vh;overflow-y:auto;overscroll-behavior:contain;background:#0d1117;border-top:2px solid #76b900;border-radius:18px 18px 0 0;font-family:monospace;color:#fff;transform:translateY(100%);opacity:0;transition:transform .3s cubic-bezier(.32,1,.23,1),opacity .25s;';
    panel.innerHTML=`
      <div style="display:flex;justify-content:center;padding:10px 0 0;">
        <div style="width:36px;height:4px;background:#333;border-radius:2px;"></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px 8px;position:sticky;top:0;background:#0d1117;z-index:1;border-bottom:1px solid #1c2128;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:8px;height:8px;background:#76b900;border-radius:50%;box-shadow:0 0 6px #76b900;"></div>
          <span style="font-size:13px;font-weight:bold;color:#76b900;letter-spacing:2px;">BETTER GFN</span>
          <span style="font-size:9px;color:#444;">v1.0</span>
        </div>
        <button id="bgfn-close" style="background:#1c2128;border:1px solid #30363d;color:#ccc;font-size:13px;cursor:pointer;padding:6px 12px;border-radius:6px;font-family:monospace;">✕ cerrar</button>
      </div>

      <div style="padding:14px 18px 20px;display:flex;flex-direction:column;gap:14px;">

        <!-- Timer -->
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">SESIÓN ACTUAL</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">TIEMPO</div><div id="bgfn-session" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">RESTANTE</div><div id="bgfn-remaining" style="font-size:20px;color:#76b900;font-weight:bold;">--:--</div></div>
            <div style="text-align:center;"><div style="font-size:9px;color:#888;margin-bottom:2px;">RELOJ</div><div id="bgfn-clock" style="font-size:20px;color:#fff;font-weight:bold;">--:--</div></div>
          </div>
          <div style="margin-top:12px;background:#21262d;border-radius:4px;height:5px;overflow:hidden;">
            <div id="bgfn-bar" style="height:100%;width:0%;background:#76b900;transition:width 1s linear;border-radius:4px;"></div>
          </div>
          <div id="bgfn-status" style="font-size:8px;color:#555;text-align:center;margin-top:7px;letter-spacing:1px;">○ SIN SESIÓN ACTIVA</div>
        </div>

        <!-- VPN / Región -->
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">REGIÓN Y VPN</div>
          <div style="background:#0d1117;border-radius:6px;padding:10px 12px;margin-bottom:10px;">
            <div style="font-size:11px;color:#76b900;font-weight:bold;margin-bottom:4px;">💡 Truco sin VPN</div>
            <div style="font-size:10px;color:#888;line-height:1.6;">
              1. Conecta tu VPN a <strong style="color:#ccc;">US East / US Southeast</strong><br>
              2. Entra y lanza el juego<br>
              3. Cuando aparezca el aviso verde → desconecta la VPN<br>
              4. La sesión continúa activa sin VPN ✓
            </div>
          </div>
          <div style="background:#0d1117;border-radius:6px;padding:10px 12px;">
            <div style="font-size:11px;color:#ccc;font-weight:bold;margin-bottom:4px;">🌍 Cambiar servidor</div>
            <div style="font-size:10px;color:#666;line-height:1.6;">
              GeForce NOW tiene selector de servidor nativo.<br>
              Búscalo en: <strong style="color:#76b900;">Ajustes de GFN → Ubicación del servidor</strong>.<br>
              Mejores servidores para LatAm:<br>
              <strong style="color:#ccc;">US Southeast (Miami)</strong> · <strong style="color:#ccc;">US South (Atlanta)</strong>
            </div>
          </div>
        </div>

        <!-- Gamepad -->
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:10px;">MANDO</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <div id="bgfn-gp-name" style="font-size:12px;color:#555;">Sin mando detectado</div>
            <div id="bgfn-gp-status" style="font-size:9px;color:#555;letter-spacing:1px;">○ DESCONECTADO</div>
          </div>
          <div id="bgfn-gp-type" style="font-size:9px;color:#444;margin-bottom:12px;word-break:break-all;">Conecta un mando para ver opciones</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;background:#0d1117;border-radius:6px;padding:8px 12px;">
            <span style="font-size:11px;color:#888;">Polling actual</span>
            <span id="bgfn-gp-hz" style="font-size:16px;font-weight:bold;color:#555;font-family:monospace;">OFF</span>
          </div>
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:8px;">MODO DE POLLING</div>
          <div style="display:flex;gap:6px;margin-bottom:8px;">${modeBtns}</div>
          <div id="bgfn-poll-desc" style="font-size:9px;color:#555;text-align:center;margin-bottom:12px;min-height:14px;"></div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div><div style="font-size:12px;color:#ccc;">Remapeo de botones</div><div style="font-size:9px;color:#555;">Normaliza al estándar Xbox</div></div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" id="bgfn-gp-remap" checked style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span>
              <span id="bgfn-gp-remap-dot" style="position:absolute;left:25px;top:3px;width:16px;height:16px;background:#76b900;border-radius:50%;transition:.2s;"></span>
            </label>
          </div>
          <div id="bgfn-gp-swaprow" style="display:none;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;color:#ccc;">Intercambiar A↔B (PlayStation)</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" id="bgfn-gp-swapAB" style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;inset:0;background:#21262d;border-radius:24px;border:1px solid #30363d;"></span>
              <span id="bgfn-gp-swap-dot" style="position:absolute;left:3px;top:3px;width:16px;height:16px;background:#555;border-radius:50%;transition:.2s;"></span>
            </label>
          </div>
        </div>

        <!-- Config timer -->
        <div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:14px 16px;">
          <div style="font-size:9px;color:#555;letter-spacing:1px;margin-bottom:12px;">CONFIGURACIÓN TIMER</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-size:12px;color:#ccc;">Límite sesión (min)</span>
            <input id="bgfn-opt-limit" type="number" value="60" min="30" max="240" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#76b900;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <span style="font-size:12px;color:#ccc;">Avisar a los (min)</span>
            <input id="bgfn-opt-warn" type="number" value="50" min="10" max="230" style="width:60px;background:#21262d;border:1px solid #30363d;border-radius:4px;color:#f59e0b;font-family:monospace;font-size:13px;text-align:center;padding:5px;"/>
          </div>
          <button id="bgfn-save-opts" style="width:100%;background:#76b900;color:#000;border:none;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;font-weight:bold;cursor:pointer;letter-spacing:1px;">GUARDAR</button>
        </div>

        <!-- Footer -->
        <div style="background:#0a0e18;border:1px solid #1c2128;border-radius:8px;padding:14px 16px;text-align:center;">
          <div style="font-size:11px;color:#76b900;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">BETTER GFN v1.0</div>
          <div style="font-size:9px;color:#444;margin-bottom:6px;">Hecho por <span style="color:#76b900;">Karmadev0</span></div>
          <div style="font-size:8px;color:#2a2a2a;line-height:1.6;">
            El uso indebido de esta herramienta es responsabilidad exclusiva del usuario.<br>
            Better GFN está diseñado únicamente para mejorar la experiencia de juego en GeForce NOW.<br>
            GeForce NOW y todos sus servicios son propiedad de NVIDIA Corporation.<br>
            Better GFN no está afiliado ni respaldado por NVIDIA.
          </div>
        </div>

      </div>
    `;

    // Toast
    const toast=document.createElement('div');
    toast.id='bgfn-toast';
    toast.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(60px);background:rgba(10,20,10,.96);border:1px solid #76b900;border-radius:8px;padding:9px 18px;color:#fff;font-family:monospace;font-size:12px;z-index:2147483647;transition:transform .3s,opacity .3s;pointer-events:none;opacity:0;text-align:center;max-width:280px;';

    target.appendChild(mini);
    target.appendChild(vpnNotice);
    target.appendChild(wfloat);
    target.appendChild(fab);
    target.appendChild(overlay);
    target.appendChild(panel);
    target.appendChild(toast);

    // Eventos
    get('bgfn-close').addEventListener('click',closePanel);
    get('bgfn-vpn-ok').addEventListener('click',hideVPNNotice);

    GAMEPAD.getModes().forEach(m=>{
      const btn=get('bgfn-poll-'+m.id);if(!btn)return;
      btn.addEventListener('click',()=>{GAMEPAD.setMode(m.id);const d=get('bgfn-poll-desc');if(d)d.textContent=m.desc;});
    });

    const rc=get('bgfn-gp-remap'),rd=get('bgfn-gp-remap-dot');
    rc.addEventListener('change',()=>{GAMEPAD.setRemapEnabled(rc.checked);rd.style.left=rc.checked?'25px':'3px';rd.style.background=rc.checked?'#76b900':'#555';});

    const sc=get('bgfn-gp-swapAB'),sd=get('bgfn-gp-swap-dot');
    sc.addEventListener('change',()=>{GAMEPAD.setSwapAB(sc.checked);sd.style.left=sc.checked?'25px':'3px';sd.style.background=sc.checked?'#76b900':'#555';});

    get('bgfn-save-opts').addEventListener('click',()=>{
      const limit=parseInt(get('bgfn-opt-limit').value)||60;
      const warn=parseInt(get('bgfn-opt-warn').value)||50;
      CFG.SESSION_LIMIT_MIN=Math.max(30,Math.min(240,limit));
      CFG.WARN_AT_MIN=Math.max(10,Math.min(limit-1,warn));
      CFG.DANGER_AT_MIN=CFG.WARN_AT_MIN+5;
      try{localStorage.setItem('bgfn_cfg',JSON.stringify({limit,warn}));}catch(_){}
      showToast('✓ Configuración guardada','ok',1500);
    });

    try{
      const s=JSON.parse(localStorage.getItem('bgfn_cfg')||'{}');
      if(s.limit){get('bgfn-opt-limit').value=s.limit;CFG.SESSION_LIMIT_MIN=s.limit;}
      if(s.warn){get('bgfn-opt-warn').value=s.warn;CFG.WARN_AT_MIN=s.warn;CFG.DANGER_AT_MIN=s.warn+5;}
    }catch(_){}

    const cm=GAMEPAD.getCurrentMode();
    const pd=get('bgfn-poll-desc');if(pd)pd.textContent=cm.desc;
    updateLayout();
  }

  // ============================================================
  //  TOAST + TICK + STATUS
  // ============================================================
  let _tt;
  function showToast(msg,type,dur=4000){
    const el=get('bgfn-toast');if(!el)return;
    const c={ok:'#76b900',warn:'#f59e0b',danger:'#ef4444'};
    el.textContent=msg;el.style.borderColor=c[type]||'#76b900';
    el.style.opacity='1';el.style.transform='translateX(-50%) translateY(0)';
    clearTimeout(_tt);_tt=setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(-50%) translateY(60px)';},dur);
  }

  function tick(){
    const now=new Date().toLocaleTimeString('es',{hour12:false});
    ['bgfn-clock','bgfn-float-clock'].forEach(id=>{const el=get(id);if(el)el.textContent=now;});
    if(!sessionStart)return;
    const e=currentElapsed(),em=e/60,ls=CFG.SESSION_LIMIT_MIN*60;
    const r=Math.max(0,ls-e),pct=Math.min(100,(e/ls)*100);
    [['bgfn-session',fmt(e)],['bgfn-float-session',fmt(e)],
     ['bgfn-remaining',fmt(r)],['bgfn-float-remaining',fmt(r)],['bgfn-mini-remaining',fmt(r)]
    ].forEach(([id,v])=>{const el=get(id);if(el)el.textContent=v;});
    ['bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el)el.style.width=pct+'%';});
    const col=em>=CFG.DANGER_AT_MIN?'#ef4444':em>=CFG.WARN_AT_MIN?'#f59e0b':'#76b900';
    ['bgfn-remaining','bgfn-float-remaining','bgfn-mini-remaining'].forEach(id=>{const el=get(id);if(el)el.style.color=col;});
    ['bgfn-bar','bgfn-float-bar'].forEach(id=>{const el=get(id);if(el)el.style.background=col;});
    if(em>=CFG.DANGER_AT_MIN){setStatus('danger');if(!alertedDanger){alertedDanger=true;showToast(`⚠ ¡Quedan ${fmt(r)}! GUARDA YA`,'danger',8000);}}
    else if(em>=CFG.WARN_AT_MIN){setStatus('warn');if(!alertedWarn){alertedWarn=true;showToast(`⏳ ${Math.floor(em)} min — prepárate para guardar`,'warn',6000);}}
    else setStatus('active');
  }

  function setStatus(mode){
    const t={active:'● EN JUEGO',idle:'○ SIN SESIÓN ACTIVA',danger:'⚠ GUARDA YA',warn:'⏳ PREPÁRATE'};
    const c={active:'#76b900',idle:'#555',danger:'#ef4444',warn:'#f59e0b'};
    ['bgfn-status','bgfn-float-status'].forEach(id=>{const el=get(id);if(el){el.textContent=t[mode]||'';el.style.color=c[mode]||'#555';}});
  }

  function watchFullscreen(){
    const fn=()=>{isFullscreen=!!(document.fullscreenElement||document.webkitFullscreenElement);updateLayout();};
    document.addEventListener('fullscreenchange',fn);document.addEventListener('webkitfullscreenchange',fn);
    let lfs=false;
    setInterval(()=>{const nfs=inGame&&window.innerHeight>=screen.height-10&&window.innerWidth>=screen.width-10;if(nfs!==lfs){lfs=nfs;isFullscreen=nfs;updateLayout();}},500);
  }

  function watchSW(){
    if(!navigator.serviceWorker)return;
    navigator.serviceWorker.addEventListener('message',e=>{
      const d=e.data;if(!d||!d.path)return;
      const paths=Array.isArray(d.path)?d.path:[d.path];
      if(!paths.some(p=>String(p).includes('streamingSessionId')))return;
      const s=d.data&&d.data.sessionId;s?onSessionActive(s):onSessionEnded();
    });
  }

  function watchVideo(){
    setInterval(()=>{const v=document.querySelector('video');if(v&&!v.paused&&v.readyState>=3&&!sessionStart)onSessionActive('video-'+Date.now());},2000);
  }

  function tryInit(){if(document.body||document.documentElement)buildUI();}
  tryInit();
  document.addEventListener('DOMContentLoaded',tryInit);
  new MutationObserver(tryInit).observe(document.documentElement||document,{childList:true});
  GAMEPAD.init();watchSW();watchVideo();watchFullscreen();
  setInterval(tick,1000);
  console.log('[BGFN] v1.0.1 by Karmadev0 ✓');

})();
