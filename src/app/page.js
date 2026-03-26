"use client";

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [scrollY, setScrollY]           = useState(0);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [selectedProto, setSelectedProto] = useState(0);
  const [videoLoaded, setVideoLoaded]   = useState(false);
  const [activeProto, setActiveProto]   = useState(0);
  const protoSectionRef = useRef(null);
  const videoRef = useRef(null);

  /* ── DATA ─────────────────────────────────────────── */
  /* Supporter logos
     → Put logo images at /public/images/supporters/nidhi-prayas.png etc.
     → If image missing, the name text renders instead                     */
  const supporters = [
    { name:"NIDHI–PRAYAS",      sub:"DST, GOVT. OF INDIA",               logo:"/images/nidhi.jpg" },
    { name:"EMERGENT VENTURES", sub:"MARGINAL REVOLUTION UNIVERSITY",     logo:"/images/Emergent_Ventures.png" },
    { name:"IIT MANDI CATALYST",sub:"TECHNOLOGY BUSINESS INCUBATOR",      logo:"/images/IIT-MANDI.png" },
    { name:"HYUNDAI HOPE",      sub:"SCHOLARSHIP GRANT",                  logo:"/images/Hyundai.jpg" },
  ];

  /* Awards
     → Put photos at /public/images/awards/minister.jpg etc.
     → These are big photo cards with text overlay                         */
  const awards = [
    {
      photo:"/images/Hyundai.jpg",
      tag:"GOVERNMENT RECOGNITION",
      title:"Hyundai HOPE Scholarship",
      body:"Felicitated by Union Minister Shri Kiren Rijiju at a national ceremony.",
    },
    {
      photo:"/images/nidhi.jpg",
      tag:"GOVERNMENT GRANT",
      title:"NIDHI–PRAYAS",
      body:"Incubated under DST's National Initiative for Developing and Harnessing Innovations at IIT Mandi Catalyst.",
    },
    {
      photo:"/images/Emergent_Ventures.png",
      tag:"INTERNATIONAL FELLOWSHIP",
      title:"Emergent Ventures India",
      body:"Selected for the Emergent Ventures global fellowship for breakthrough founders.",
    },
    {
      photo:"/images/IIT-MANDI.png",
      tag:"DEFENCE ENGAGEMENT",
      title:"Indian Army Collaboration",
      body:"Active R&D collaboration with the Indian Army. Forward area deployment discussions ongoing.",
    },
  ];

  const protoImages = [
    { src:"/images/cad-2-removebg-preview.png", label:"Top View",          desc:"Overhead perspective revealing the radial antenna arrangement for full omnidirectional coverage." },
    { src:"/images/cad-3-removebg-preview.png", label:"Front Elevation",   desc:"Front-facing profile — multi-tier antenna stack, GaN PA module, and cylindrical base housing." },
    { src:"/images/cad-4-removebg-preview.png", label:"Three-Quarter View",desc:"Elevated three-quarter angle — LPDA antenna panels in deployed operational configuration." },
    { src:"/images/cad-5-removebg-preview.png", label:"Low Angle View",    desc:"Low-angle perspective highlighting the structural base, pivot joints, and levelling feet." },
  ];

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!protoSectionRef.current) return;
      const rect = protoSectionRef.current.getBoundingClientRect();
      const sectionH = protoSectionRef.current.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionH - window.innerHeight)));
      setActiveProto(Math.min(4, Math.floor(progress * 5)));
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── TOKENS ────────────────────────────────────────── */
  const A   = "#FF8800";   // bright amber
  const AG  = "#CC6600";   // amber dim
  const B   = "#050508";   // near-black base
  const B2  = "#0A0C12";
  const B3  = "#0F1520";
  const W   = "#FFFFFF";
  const DIM = "#687585";
  const BR  = "rgba(255,255,255,0.08)";
  const BRA = "rgba(255,136,0,0.3)";
  const GLA = "rgba(255,136,0,0.06)";

  /* ── RENDER ────────────────────────────────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500&display=swap');

        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${B}; color:${W}; font-family:'Barlow',sans-serif; overflow-x:hidden; }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:${A}; }

        /* ── typography helpers ── */
        .hd  { font-family:'Barlow Condensed',sans-serif; }
        .lbl { font-family:'Rajdhani',sans-serif; font-weight:600; letter-spacing:.2em; font-size:11px; }

        /* ── scanline noise overlay ── */
        .noise::after {
          content:'';
          position:absolute; inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size:200px 200px;
          pointer-events:none; z-index:3; opacity:.5;
        }

        /* ── grid texture ── */
        .grid {
          background-image:
            linear-gradient(rgba(255,136,0,.05) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,136,0,.05) 1px,transparent 1px);
          background-size:60px 60px;
        }

        /* ── nav ── */
        .nl { color:${DIM}; text-decoration:none; font-family:'Rajdhani',sans-serif; font-weight:600; font-size:12px; letter-spacing:.2em; transition:color .2s; position:relative; padding-bottom:3px; }
        .nl::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:${A}; transition:width .25s; }
        .nl:hover { color:${A}; }
        .nl:hover::after { width:100%; }

        /* ── section tag ── */
        .stag { display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border:1px solid ${BRA}; font-family:'Rajdhani',sans-serif; font-size:11px; letter-spacing:.22em; color:${A}; font-weight:600; margin-bottom:20px; background:rgba(255,136,0,0.05); }
        .stag::before { content:''; width:6px; height:6px; background:${A}; border-radius:50%; box-shadow:0 0 8px ${A}; }

        /* ── amber rule ── */
        .arule { width:48px; height:3px; background:linear-gradient(90deg,${A},transparent); margin:22px 0 32px; }

        /* ── buttons ── */
        .ba { background:${A}; color:#000; padding:14px 36px; font-family:'Rajdhani',sans-serif; font-weight:700; font-size:13px; letter-spacing:.2em; border:none; cursor:pointer; text-decoration:none; display:inline-block; transition:all .2s; clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%); }
        .ba:hover { background:#FFAA33; transform:translateY(-1px); box-shadow:0 8px 32px rgba(255,136,0,0.4); }
        .bo { border:1px solid ${BRA}; color:${W}; padding:14px 36px; font-family:'Rajdhani',sans-serif; font-weight:600; font-size:13px; letter-spacing:.2em; background:transparent; cursor:pointer; text-decoration:none; display:inline-block; transition:all .2s; clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%); }
        .bo:hover { border-color:${A}; color:${A}; background:rgba(255,136,0,0.06); }

        /* ── card ── */
        .card { background:${B3}; border:1px solid ${BR}; transition:all .3s; position:relative; overflow:hidden; }
        .card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,${A},transparent); opacity:0; transition:opacity .3s; }
        .card:hover { border-color:${BRA}; transform:translateY(-2px); }
        .card:hover::before { opacity:1; }

        /* ── metric row ── */
        .mr { display:flex; align-items:center; justify-content:space-between; padding:22px 0; border-bottom:1px solid ${BR}; }
        .mr:last-child { border-bottom:none; }

        /* ── glow orb ── */
        .gorb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; }

        /* ── video hero ── */
        @keyframes scanline {
          0%   { transform:translateY(-100%); }
          100% { transform:translateY(100vh); }
        }
        .scanline {
          position:absolute; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(255,136,0,0.4),transparent);
          animation:scanline 4s linear infinite;
          pointer-events:none; z-index:4;
        }

        /* ── team card ── */
        .tc { text-align:center; padding:32px 20px; background:${B3}; border:1px solid ${BR}; transition:all .3s; }
        .tc:hover { border-color:${BRA}; }
        .tc img { width:90px; height:90px; border-radius:1px; object-fit:cover; margin:0 auto 16px; display:block; border:1px solid ${BR}; transition:border-color .3s; }
        .tc:hover img { border-color:${BRA}; }

        /* ── award photo card ── */
        .awc { position:relative; overflow:hidden; border:1px solid ${BR}; aspect-ratio:3/4; cursor:default; transition:all .3s; }
        .awc:hover { border-color:${BRA}; }
        .awc img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s; }
        .awc:hover img { transform:scale(1.04); }
        .awc-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(5,5,8,0.96) 0%,rgba(5,5,8,0.4) 55%,transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:24px 20px; }

        /* ── supporter card ── */
        .spc { border:1px solid ${BR}; background:${B3}; padding:28px 24px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; transition:all .3s; }
        .spc:hover { border-color:${BRA}; background:${B2}; }
        .spc img { max-height:44px; max-width:140px; object-fit:contain; filter:brightness(0) invert(1); opacity:.7; transition:opacity .3s; }
        .spc:hover img { opacity:1; }

        /* ── proto gallery ── */
        .proto-main { width:100%; object-fit:cover; display:block; }
        .thumb-item { cursor:pointer; transition:all .3s; border:2px solid transparent; }
        .thumb-item.sel { border-color:${A}; }
        .thumb-item img { width:100%; aspect-ratio:16/9; object-fit:cover; display:block; transition:opacity .3s; }
        .thumb-item:not(.sel) img { opacity:.4; }
        .thumb-item:hover img { opacity:.75; }

        /* ── ticker ── */
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .ticker-inner { display:flex; gap:0; animation:ticker 22s linear infinite; width:max-content; }
        .ticker-inner:hover { animation-play-state:paused; }

        /* ── fade up ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation:fadeUp .8s ease forwards; }
        .fu1 { animation-delay:.1s; opacity:0; }
        .fu2 { animation-delay:.25s; opacity:0; }
        .fu3 { animation-delay:.4s; opacity:0; }

        /* ── corner clip util ── */
        .clip { clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%); }

        @media(max-width:768px) { .desk { display:none!important; } .mob-tog { display:block!important; } }
        @media(min-width:769px) { .mob-tog { display:none!important; } }
      `}</style>

      {/* ════════════════════════════════════════
          NAV
      ════════════════════════════════════════ */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        background: scrollY>60 ? 'rgba(5,5,8,0.96)' : 'transparent',
        backdropFilter: scrollY>60 ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${scrollY>60 ? BR : 'transparent'}`,
        transition:'all .35s',
      }}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'0 28px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="#" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
            <img src="/images/garudakshak.png" alt="" style={{width:34,height:34,objectFit:'contain'}} onError={e=>e.target.style.display='none'}/>
            <div>
              <div className="hd" style={{fontWeight:900,fontSize:18,letterSpacing:'.1em',color:W}}>GARUDAKSHAK</div>
              <div className="lbl" style={{fontSize:8,color:A,marginTop:1}}>SECURING SKIES, DEFENDING HORIZONS</div>
            </div>
          </a>

          <div className="desk" style={{display:'flex',gap:40}}>
            {[['#about','ABOUT'],['#prototype','PROTOTYPE'],['#recognition','RECOGNITION'],['/team','TEAM'],['/careers','CAREERS'],['#contact','CONTACT']].map(([h,l])=>(
              <a key={l} href={h} className="nl">{l}</a>
            ))}
          </div>

          <a href="/demo" className="ba desk" style={{padding:'10px 24px',fontSize:12}}>GET DEMO</a>

          <button className="mob-tog" style={{display:'none',background:'none',border:`1px solid ${BR}`,padding:'7px 11px',color:W,cursor:'pointer'}} onClick={()=>setMenuOpen(!menuOpen)}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M0 1H18M0 6H18M0 11H18" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{background:B2,borderTop:`1px solid ${BR}`,padding:'24px 28px',display:'flex',flexDirection:'column',gap:22}}>
            {[['#about','ABOUT'],['#prototype','PROTOTYPE'],['#recognition','RECOGNITION'],['/team','TEAM'],['/careers','CAREERS'],['#contact','CONTACT']].map(([h,l])=>(
              <a key={l} href={h} className="nl" style={{fontSize:15}} onClick={()=>setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════
          HERO — FULL SCREEN VIDEO
      ════════════════════════════════════════ */}
      <section style={{position:'relative',width:'100%',height:'100vh',overflow:'hidden',background:'#000'}}>

        {/* video */}
        {/* YouTube autoplay background — muted, no controls, pauses via JS after 2s */}
        <iframe
          ref={videoRef}
          src="https://www.youtube.com/embed/XzzK-CUPy50?autoplay=1&mute=1&controls=0&loop=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1"
          allow="autoplay; fullscreen"
          style={{
            position:'absolute',inset:0,width:'100%',height:'100%',
            border:'none',zIndex:1,
            opacity:videoLoaded?1:0,transition:'opacity 1s',
            /* scale up slightly to hide black bars */
            transform:'scale(1.08)',
          }}
          onLoad={()=>{
            setVideoLoaded(true);
            // pause via postMessage after 2s
            setTimeout(()=>{
              if(videoRef.current){
                videoRef.current.contentWindow.postMessage(
                  JSON.stringify({event:'command',func:'pauseVideo',args:[]}),
                  '*'
                );
              }
            }, 500);
          }}
        />

        {/* dark gradient layers */}
        <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to bottom,rgba(5,5,8,0.5) 0%,rgba(5,5,8,0.2) 40%,rgba(5,5,8,0.7) 80%,rgba(5,5,8,1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to right,rgba(5,5,8,0.8) 0%,transparent 60%)'}}/>

        {/* scanline sweep */}
        <div className="scanline" style={{zIndex:4}}/>

        {/* grid overlay */}
        <div className="grid" style={{position:'absolute',inset:0,zIndex:3,opacity:.4}}/>

        {/* amber glow */}
        <div className="gorb" style={{width:800,height:800,background:'rgba(255,136,0,0.12)',bottom:-300,right:-200,zIndex:2}}/>

        {/* HERO CONTENT */}
        <div style={{position:'relative',zIndex:5,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',maxWidth:1300,margin:'0 auto',padding:'80px 28px 64px'}}>

          {/* pulse keyframe */}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

          <h1 className="hd fu fu1" style={{fontSize:'clamp(52px,7.5vw,100px)',fontWeight:900,lineHeight:.92,letterSpacing:'-.02em',marginBottom:24,textShadow:'0 4px 40px rgba(0,0,0,0.8)'}}>
            SECURE<br/>
            <span style={{color:A,textShadow:`0 0 60px rgba(255,136,0,0.5)`}}>EVERY</span><br/>
            AIRSPACE.
          </h1>

          <p className="fu fu3" style={{fontSize:'clamp(15px,1.8vw,19px)',color:'rgba(255,255,255,0.75)',maxWidth:520,lineHeight:1.75,fontWeight:300,marginBottom:36}}>
            India's indigenous AI-powered C-UAS platform — detect, identify, and neutralize unauthorized drones before they become threats.
          </p>

          <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:56}}>
            <a href="#about" className="ba">DISCOVER THE SYSTEM</a>
            <a href="/demo" className="bo">REQUEST DEMO</a>
          </div>

          {/* stat strip at bottom of hero */}
          <div style={{display:'flex',flexWrap:'wrap',gap:0,borderTop:`1px solid rgba(255,255,255,0.1)`}}>
            {[
              {v:'98.3%',l:'RF ACCURACY'},
              {v:'3 km', l:'OPTICAL RANGE'},
              {v:'500m+',l:'JAMMING RANGE'},
              {v:'3-in-1',l:'DETECT · ID · NEUTRALIZE'},
            ].map((s,i)=>(
              <div key={i} style={{padding:'18px 40px 0 0',marginRight:40,borderRight:i<3?`1px solid rgba(255,255,255,0.08)`:'none',marginTop:18}}>
                <div className="hd" style={{fontSize:32,fontWeight:900,color:W,lineHeight:1}}>{s.v}</div>
                <div className="lbl" style={{fontSize:9,color:A,marginTop:5}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUPPORTER TICKER
      ════════════════════════════════════════ */}
      <div style={{borderTop:`1px solid ${BR}`,borderBottom:`1px solid ${BR}`,background:B2,padding:'0',overflow:'hidden',position:'relative'}}>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:80,background:`linear-gradient(to right,${B2},transparent)`,zIndex:2,pointerEvents:'none'}}/>
        <div style={{position:'absolute',right:0,top:0,bottom:0,width:80,background:`linear-gradient(to left,${B2},transparent)`,zIndex:2,pointerEvents:'none'}}/>
        <div className="ticker-inner">
          {[...supporters,...supporters].map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 36px',borderRight:`1px solid ${BR}`,flexShrink:0}}>
              {/* white box so any logo type (jpg/png) is always visible */}
              <div style={{width:72,height:36,background:'#fff',borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center',padding:'4px 8px',flexShrink:0}}>
                <img src={s.logo} alt={s.name}
                  style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',display:'block'}}
                  onError={e=>{e.target.parentNode.innerHTML=`<span style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:10px;color:#111;letter-spacing:.03em;text-align:center">${s.name}</span>`;}}
                />
              </div>
              <div>
                <div className="hd" style={{fontSize:13,fontWeight:700,letterSpacing:'.06em',color:W,whiteSpace:'nowrap'}}>{s.name}</div>
                <div className="lbl" style={{fontSize:8,color:DIM,whiteSpace:'nowrap'}}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section id="about" style={{padding:'110px 28px',background:B}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:80,alignItems:'start'}}>
          <div>
            <div className="stag">MISSION</div>
            <h2 className="hd" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:900,lineHeight:.92,marginBottom:0}}>
              MEET<br/><span style={{color:A}}>GARUDA-<br/>SHIELD.</span>
            </h2>
            <div className="arule"/>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:17,lineHeight:1.8,fontWeight:300,marginBottom:16}}>
              Garudakshak is India's indigenous counter-UAS company — a full-stack system that secures airspace against drone misuse. From cross-border smuggling to VVIP protection, we eliminate unauthorized aerial activity before it causes harm.
            </p>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:17,lineHeight:1.8,fontWeight:300}}>
              Think of us as the ATC authority for unmanned aerial systems — one system for detection, identification, and neutralization.
            </p>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {[
              {ico:'⬡',t:'THE THREAT',  b:'Low-cost drones enable cross-border drug & weapon drops, surveillance intrusions, and attacks on civilian infrastructure — faster than regulation can respond.'},
              {ico:'⬡',t:'THE GAP',     b:'Military-grade systems are too heavy, costly and complex for real-world use. Existing civilian systems are plagued by false alarms and limited neutralization.'},
              {ico:'⬡',t:'OUR ANSWER',  b:'A modular, AI-driven C-UAS platform — cost-effective, scalable, and purpose-built for Indian operational requirements. From border posts to stadiums.'},
            ].map((x,i)=>(
              <div key={i} className="card" style={{padding:'28px 28px 28px 24px',display:'flex',gap:20}}>
                <div style={{width:3,background:i===2?A:`rgba(255,136,0,0.3)`,flexShrink:0,borderRadius:2}}/>
                <div>
                  <div className="lbl" style={{color:A,fontSize:10,marginBottom:10}}>{x.t}</div>
                  <p style={{color:'rgba(255,255,255,0.55)',fontSize:15,lineHeight:1.75,fontWeight:300,margin:0}}>{x.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SYSTEM — HOW IT WORKS
      ════════════════════════════════════════ */}
      <section style={{padding:'110px 28px',background:B2,borderTop:`1px solid ${BR}`,position:'relative',overflow:'hidden'}}>
        <div className="gorb" style={{width:600,height:600,background:'rgba(255,136,0,0.07)',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>
        <div className="grid" style={{position:'absolute',inset:0,opacity:.5}}/>

        <div style={{maxWidth:1300,margin:'0 auto',position:'relative',zIndex:1}}>
          <div style={{textAlign:'center',marginBottom:72}}>
            <div className="stag" style={{justifyContent:'center'}}>HOW IT WORKS</div>
            <h2 className="hd" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:900,lineHeight:.92}}>
              3-STAGE <span style={{color:A}}>DEFENSE PIPELINE</span>
            </h2>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:3}}>
            {[
              {n:'01',t:'DETECT',     col:A,
               b:'Multi-modal sensor fusion — RF spectrum monitoring, phased array antennas, acoustic sensors, radar, and AI-powered optical cameras deliver 360° situational awareness.',
               specs:['RF range: Up to 500m','Optical: Up to 3km','Acoustic: Up to 50m']},
              {n:'02',t:'IDENTIFY',   col:A,
               b:'AI-powered IFF (Identify Friend or Foe) classifies licensed drones vs rogue threats, predicts trajectory, and minimizes false alarms — all in real time.',
               specs:['RF accuracy: 98.3%','Optical accuracy: 95–99%','Real-time classification']},
              {n:'03',t:'NEUTRALIZE', col:A,
               b:'Layered neutralization via RF jamming, GPS spoofing, and drone hijacking. Hard-kill options available. Non-ammunition, cost-effective, and collateral-safe.',
               specs:['Jamming: 500m+ range','Capture: 30cm precision','Zero ammunition cost']},
            ].map(s=>(
              <div key={s.n} className="card clip" style={{padding:'40px 32px'}}>
                <div className="hd" style={{fontSize:96,fontWeight:900,lineHeight:1,color:'rgba(255,136,0,0.08)',marginBottom:-20}}>{s.n}</div>
                <div className="hd" style={{fontSize:40,fontWeight:900,color:s.col,letterSpacing:'.04em',marginBottom:6,textShadow:`0 0 30px rgba(255,136,0,0.3)`}}>{s.t}</div>
                <div className="arule" style={{width:32,margin:'16px 0 24px'}}/>
                <p style={{color:'rgba(255,255,255,0.55)',fontSize:15,lineHeight:1.75,fontWeight:300,marginBottom:28}}>{s.b}</p>
                <div style={{display:'flex',flexDirection:'column',gap:9}}>
                  {s.specs.map(sp=>(
                    <div key={sp} style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:6,height:6,background:A,borderRadius:'50%',boxShadow:`0 0 6px ${A}`,flexShrink:0}}/>
                      <span className="lbl" style={{fontSize:10,color:'rgba(255,255,255,0.7)'}}>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── VIDEO PLAYER ── */}
          <div style={{marginTop:56,maxWidth:'72%',margin:'56px auto 0',position:'relative',border:`1px solid ${BR}`,overflow:'hidden',background:'#000'}}>
            <div style={{position:'relative',paddingTop:'52%'}}>
              <iframe
                src="https://www.youtube.com/embed/XzzK-CUPy50?controls=1&rel=0&modestbranding=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position:'absolute',inset:0,width:'100%',height:'100%',border:'none',display:'block'}}
              />
            </div>
            {/* bottom label */}
            <div style={{
              display:'flex',alignItems:'center',gap:12,
              padding:'14px 20px',borderTop:`1px solid ${BR}`,
              background:'rgba(5,5,8,0.8)',backdropFilter:'blur(12px)',
            }}>
              <div style={{width:8,height:8,background:A,borderRadius:'50%',boxShadow:`0 0 8px ${A}`,animation:'pulse 2s infinite',flexShrink:0}}/>
              <span className="lbl" style={{fontSize:11,color:'#fff'}}>GARUDA-SHIELD · SYSTEM DEMONSTRATION</span>
            </div>
            {/* corner accents */}
            <div style={{position:'absolute',top:0,left:0,width:28,height:28,borderTop:`2px solid ${A}`,borderLeft:`2px solid ${A}`,pointerEvents:'none'}}/>
            <div style={{position:'absolute',top:0,right:0,width:28,height:28,borderTop:`2px solid ${A}`,borderRight:`2px solid ${A}`,pointerEvents:'none'}}/>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          PROTOTYPE GALLERY
      ════════════════════════════════════════ */}
      <section
        id="prototype"
        ref={protoSectionRef}
        style={{height:`${protoImages.length * 100}vh`,position:'relative',background:B,borderTop:`1px solid ${BR}`}}
      >
        <div style={{position:'sticky',top:0,height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>

          {/* bg */}
          <div className="grid" style={{position:'absolute',inset:0,opacity:.35,pointerEvents:'none'}}/>
          <div className="gorb" style={{width:700,height:700,background:'rgba(255,136,0,0.06)',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>

          {/* top bar */}
          <div style={{
            position:'relative',zIndex:3,flexShrink:0,
            display:'flex',alignItems:'center',justifyContent:'space-between',
            padding:'20px 48px',borderBottom:`1px solid ${BR}`,
          }}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="stag" style={{margin:0}}>HARDWARE · CAD RENDERS</div>
              <span className="hd" style={{fontSize:'clamp(18px,2.5vw,28px)',fontWeight:900,color:W}}>
                OUR <span style={{color:A}}>PROTOTYPE</span>
              </span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              {protoImages.map((_,i)=>(
                <div
                  key={i}
                  onClick={()=>{
                    if(protoSectionRef.current){
                      const top = protoSectionRef.current.offsetTop;
                      const scrollable = protoSectionRef.current.offsetHeight - window.innerHeight;
                      window.scrollTo({top: top + (i/protoImages.length)*scrollable + 8, behavior:'smooth'});
                    }
                  }}
                  style={{
                    width:i===activeProto?28:8,height:3,borderRadius:2,cursor:'pointer',
                    background:i===activeProto?A:'rgba(255,255,255,0.12)',
                    transition:'all .5s cubic-bezier(.4,0,.2,1)',
                    boxShadow:i===activeProto?`0 0 8px ${A}`:'none',
                  }}
                />
              ))}
              <span className="lbl" style={{fontSize:9,color:DIM,marginLeft:6,minWidth:40}}>
                {String(activeProto+1).padStart(2,'0')} / {String(protoImages.length).padStart(2,'0')}
              </span>
            </div>
          </div>

          {/* IMAGE — white bg removed via multiply blend on light panel */}
          <div style={{
            flex:1,position:'relative',
            display:'flex',alignItems:'center',justifyContent:'center',
            zIndex:2,
            background:'#050508',
          }}>

            {/* transparent PNG images — no panel needed, straight on dark */}
            <div style={{
              position:'relative',
              width:'64%',height:'82%',
              display:'flex',alignItems:'center',justifyContent:'center',
              overflow:'visible',
            }}>
              {protoImages.map((img,i)=>{
                const dist = i - activeProto;
                return (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.label}
                    style={{
                      position:'absolute',
                      width:'100%',height:'100%',
                      objectFit:'contain',
                      filter:'drop-shadow(0 0 24px rgba(255,136,0,0.12))',
                      opacity: i===activeProto ? 1 : 0,
                      transform: i===activeProto
                        ? 'translateY(0) scale(1) rotate(0deg)'
                        : dist > 0
                          ? 'translateY(24px) scale(0.93)'
                          : 'translateY(-24px) scale(0.93)',
                      transition:'opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1)',
                      pointerEvents:'none',
                    }}
                  />
                );
              })}

              {/* SVG annotations — coordinates matched to actual model geometry */}
              {/* SVG annotation layer — curved arrows + labels, unique per view */}
              <svg
                viewBox="-80 -60 660 520"
                style={{position:'absolute',inset:'-15%',width:'130%',height:'130%',overflow:'visible',pointerEvents:'none',zIndex:10}}
              >
                <defs>
                  <marker id="arw" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0 L0,5 L7,2.5 z" fill="#FF8800"/>
                  </marker>
                </defs>

                {/* ── VIEW 0 — Front Elevation (cad-2) ── */}
                {activeProto===0 && <>
                  {/* Left antenna panel → label top-left */}
                  <path d="M 148,118 C 110,95 60,65 18,42" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="28" width="92" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="41" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">LPDA PANELS</text>

                  {/* Right antenna panel → label top-right */}
                  <path d="M 318,112 C 360,88 408,60 445,38" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="26" width="122" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="39" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">360° ARRANGEMENT</text>

                  {/* Cylindrical base → label right-mid */}
                  <path d="M 295,295 C 360,295 408,288 445,285" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="273" width="122" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="286" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">CYLINDRICAL BASE</text>

                  {/* Mounting feet → label bottom-left */}
                  <path d="M 188,368 C 140,375 80,385 35,390" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="380" width="110" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="393" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">MOUNTING FEET</text>
                </>}

                {/* ── VIEW 1 — Three-Quarter (cad-3) ── */}
                {activeProto===1 && <>
                  {/* Top antenna panel → top-right */}
                  <path d="M 295,95 C 350,68 405,42 445,22" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="10" width="120" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="23" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">ANTENNA PANELS</text>

                  {/* Pivot/bracket mid → left */}
                  <path d="M 195,225 C 140,218 85,210 42,205" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="193" width="116" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="206" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">PIVOT BRACKETS</text>

                  {/* Base housing → bottom-right */}
                  <path d="M 290,318 C 355,318 408,312 445,308" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="296" width="114" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="309" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">RF BASE HOUSING</text>

                  {/* Feet → bottom-left */}
                  <path d="M 185,355 C 130,365 72,378 35,388" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="378" width="110" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="391" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">LEVELLING FEET</text>
                </>}

                {/* ── VIEW 2 — Low Angle Front (cad-4) ── */}
                {activeProto===2 && <>
                  {/* Far-left wide panel */}
                  <path d="M 100,188 C 55,168 18,148 -18,132" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="118" width="56" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="131" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">LPDA</text>

                  {/* Far-right wide panel */}
                  <path d="M 378,165 C 420,145 448,128 468,112" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="98" width="118" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="111" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">ANTENNA ELEMENT</text>

                  {/* Centre vertical channel top */}
                  <path d="M 248,105 C 248,68 248,38 248,12" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="162" y="-2" width="170" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="165" y="11" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">CENTRE FEED COLUMN</text>

                  {/* Base unit bottom */}
                  <path d="M 248,332 C 248,368 248,385 248,405" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="158" y="408" width="180" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="161" y="421" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">GaN PA BASE MODULE</text>
                </>}

                {/* ── VIEW 3 — Top-Down Low Angle (cad-5) ── */}
                {activeProto===3 && <>
                  {/* Top-right antenna */}
                  <path d="M 298,112 C 355,85 408,55 445,32" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="448" y="20" width="120" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="451" y="33" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">ANTENNA ELEMENTS</text>

                  {/* Left antenna — points to upper-left panel clearly */}
                  <path d="M 145,142 C 95,115 48,85 10,62" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="48" width="82" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="61" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">LPDA ARRAY</text>

                  {/* Centre hub — points to center connection, well below LPDA label */}
                  <path d="M 235,248 C 175,262 115,272 68,278" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="-78" y="266" width="142" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="-75" y="279" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">CENTRAL MOUNT HUB</text>

                  {/* Base rim bottom */}
                  <path d="M 250,348 C 250,378 245,395 242,412" stroke="#FF8800" strokeWidth="1.1" fill="none" markerEnd="url(#arw)" strokeDasharray="5,2.5" opacity="0.9"/>
                  <rect x="150" y="415" width="184" height="18" rx="2" fill="rgba(4,4,8,0.85)"/>
                  <text x="153" y="428" fill="#FF8800" fontSize="10" fontFamily="'Rajdhani',sans-serif" fontWeight="700" letterSpacing="0.12em">STRUCTURAL BASE RIM</text>
                </>}
              </svg>
            </div>

            {/* prev arrow */}
            {activeProto > 0 && (
              <button
                onClick={()=>{
                  if(protoSectionRef.current){
                    const top=protoSectionRef.current.offsetTop;
                    const sc=protoSectionRef.current.offsetHeight-window.innerHeight;
                    window.scrollTo({top:top+((activeProto-1)/protoImages.length)*sc+8,behavior:'smooth'});
                  }
                }}
                style={{position:'absolute',left:20,background:'rgba(5,5,8,0.7)',border:`1px solid ${BR}`,color:W,width:40,height:40,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .25s',backdropFilter:'blur(8px)'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=BRA;e.currentTarget.style.background='rgba(255,136,0,0.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BR;e.currentTarget.style.background='rgba(5,5,8,0.7)';}}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
            )}
            {activeProto < protoImages.length-1 && (
              <button
                onClick={()=>{
                  if(protoSectionRef.current){
                    const top=protoSectionRef.current.offsetTop;
                    const sc=protoSectionRef.current.offsetHeight-window.innerHeight;
                    window.scrollTo({top:top+((activeProto+1)/protoImages.length)*sc+8,behavior:'smooth'});
                  }
                }}
                style={{position:'absolute',right:20,background:'rgba(5,5,8,0.7)',border:`1px solid ${BR}`,color:W,width:40,height:40,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .25s',backdropFilter:'blur(8px)'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=BRA;e.currentTarget.style.background='rgba(255,136,0,0.12)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BR;e.currentTarget.style.background='rgba(5,5,8,0.7)';}}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            )}

            {/* corner accents */}
            <div style={{position:'absolute',top:16,left:16,width:20,height:20,borderTop:`1px solid rgba(255,136,0,0.4)`,borderLeft:`1px solid rgba(255,136,0,0.4)`,pointerEvents:'none'}}/>
            <div style={{position:'absolute',top:16,right:16,width:20,height:20,borderTop:`1px solid rgba(255,136,0,0.4)`,borderRight:`1px solid rgba(255,136,0,0.4)`,pointerEvents:'none'}}/>
            <div style={{position:'absolute',bottom:16,left:16,width:20,height:20,borderBottom:`1px solid rgba(255,136,0,0.4)`,borderLeft:`1px solid rgba(255,136,0,0.4)`,pointerEvents:'none'}}/>
            <div style={{position:'absolute',bottom:16,right:16,width:20,height:20,borderBottom:`1px solid rgba(255,136,0,0.4)`,borderRight:`1px solid rgba(255,136,0,0.4)`,pointerEvents:'none'}}/>
          </div>


          {/* BOTTOM INFO BAR */}
          <div style={{
            flexShrink:0,zIndex:3,borderTop:`1px solid ${BR}`,
            padding:'18px 48px',
            display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap',
            background:'rgba(5,5,8,0.7)',backdropFilter:'blur(16px)',
          }}>
            <div style={{flex:1,minWidth:200}}>
              {protoImages.map((img,i)=>(
                i===activeProto && (
                  <div key={i} style={{animation:'fadeUp .45s ease forwards'}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}>
                      <div style={{width:18,height:2,background:A,boxShadow:`0 0 6px ${A}`,flexShrink:0}}/>
                      <span className="lbl" style={{fontSize:11,color:A}}>{img.label}</span>
                    </div>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.6,margin:0,maxWidth:540}}>{img.desc}</p>
                  </div>
                )
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,opacity:.35,flexShrink:0}}>
              <svg width="11" height="15" viewBox="0 0 11 19" fill="none">
                <rect x="0.75" y="0.75" width="9.5" height="17.5" rx="4.75" stroke="white" strokeWidth="1.5"/>
                <circle cx="5.5" cy="5.5" r="1.5" fill="white">
                  <animate attributeName="cy" values="5;12;5" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
              <span className="lbl" style={{fontSize:9,color:'rgba(255,255,255,0.5)'}}>SCROLL</span>
            </div>
          </div>

          {/* amber progress bar */}
          <div style={{height:2,background:BR,flexShrink:0,position:'relative'}}>
            <div style={{
              position:'absolute',top:0,left:0,height:'100%',background:A,
              width:`${((activeProto+1)/protoImages.length)*100}%`,
              transition:'width .6s cubic-bezier(.4,0,.2,1)',
              boxShadow:`0 0 10px ${A}`,
            }}/>
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════
          PERFORMANCE METRICS
      ════════════════════════════════════════ */}
      <section style={{padding:'110px 28px',background:B2,borderTop:`1px solid ${BR}`}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:80}}>
          <div>
            <div className="stag">PERFORMANCE</div>
            <h2 className="hd" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:900,lineHeight:.92}}>
              KEY<br/><span style={{color:A}}>METRICS</span>
            </h2>
            <div className="arule"/>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:15,lineHeight:1.8,fontWeight:300}}>
              All figures from field-tested prototype validation. Multi-modal sensor fusion with AI classification running on edge hardware.
            </p>
          </div>
          <div>
            {[
              {s:'RF DETECTION',  v:'98.3%',    r:'Up to 500m'},
              {s:'ACOUSTIC',      v:'94.6%',    r:'Up to 50m'},
              {s:'OPTICAL / EO',  v:'95–99%',   r:'Up to 3km'},
              {s:'RF JAMMING',    v:'SOFT-KILL', r:'500m+ range'},
              {s:'INTERCEPTION',  v:'HARD-KILL', r:'30cm precision'},
            ].map(m=>(
              <div key={m.s} className="mr">
                <div>
                  <div className="lbl" style={{fontSize:10,color:DIM,marginBottom:6}}>{m.s}</div>
                  <div className="hd" style={{fontSize:36,fontWeight:900,lineHeight:1,color:W}}>{m.v}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="lbl" style={{fontSize:11,color:A}}>{m.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          RECOGNITION — PHOTO CARDS
      ════════════════════════════════════════ */}
      <section id="recognition" style={{padding:'110px 28px',background:B,borderTop:`1px solid ${BR}`}}>
        <div style={{maxWidth:1300,margin:'0 auto'}}>
          <div className="stag">RECOGNITION</div>
          <h2 className="hd" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:900,lineHeight:.92,marginBottom:56}}>
            AWARDS &<br/><span style={{color:A}}>SUPPORT</span>
          </h2>

          {/* 
            PHOTO CARDS — add images at /public/images/awards/minister.jpg etc.
            Each card shows the photo as background with text overlaid at bottom.
            If the photo is missing, it gracefully shows a styled placeholder.
          */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:3}}>
            {awards.map((aw,i)=>(
              aw.type==='photo' ? (
                <div key={i} className="awc">
                  <img src={aw.photo} alt={aw.title}/>
                  <div className="awc-overlay">
                    <div className="lbl" style={{fontSize:9,color:A,marginBottom:8}}>{aw.tag}</div>
                    <div className="hd" style={{fontSize:22,fontWeight:800,marginBottom:8,lineHeight:1.1}}>{aw.title}</div>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.65)',fontWeight:300,lineHeight:1.6,margin:0}}>{aw.body}</p>
                  </div>
                  <div style={{position:'absolute',top:0,right:0,width:22,height:22,borderTop:`2px solid ${A}`,borderRight:`2px solid ${A}`,zIndex:3,pointerEvents:'none'}}/>
                </div>
              ) : (
                <div key={i} style={{
                  position:'relative',overflow:'hidden',border:`1px solid ${BR}`,aspectRatio:'3/4',
                  background:B3,display:'flex',flexDirection:'column',alignItems:'center',
                  justifyContent:'center',padding:'32px 24px',gap:20,transition:'border-color .3s',
                }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=BRA}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=BR}
                >
                  <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:2,background:`linear-gradient(90deg,transparent,${A},transparent)`,pointerEvents:'none'}}/>
                  <div style={{width:160,height:80,background:'#fff',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 16px',boxShadow:'0 8px 32px rgba(0,0,0,0.4)',flexShrink:0}}>
                    <img src={aw.photo} alt={aw.title}
                      style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',display:'block'}}
                      onError={e=>{e.target.parentNode.innerHTML=`<span style="font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:14px;color:#111;letter-spacing:.04em;text-align:center;line-height:1.3">${aw.title}</span>`;}}
                    />
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div className="lbl" style={{fontSize:9,color:A,marginBottom:10}}>{aw.tag}</div>
                    <div className="hd" style={{fontSize:20,fontWeight:800,marginBottom:10,lineHeight:1.1}}>{aw.title}</div>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.65,margin:0}}>{aw.body}</p>
                  </div>
                  <div style={{position:'absolute',top:0,right:0,width:20,height:20,borderTop:`2px solid ${A}`,borderRight:`2px solid ${A}`,pointerEvents:'none'}}/>
                </div>
              )
            ))}
          </div>

        </div>
      </section>

      {/* TEAM CTA */}
      <section style={{padding:'80px 28px',background:B2,borderTop:`1px solid ${BR}`}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:40}}>
          <div>
            <div className="stag">THE TEAM</div>
            <h2 className="hd" style={{fontSize:'clamp(32px,4vw,52px)',fontWeight:900,lineHeight:.95,margin:0}}>
              10 engineers.<br/><span style={{color:A}}>One mission.</span>
            </h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'flex-start',maxWidth:440}}>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:15,fontWeight:300,lineHeight:1.7,margin:0}}>
              Multidisciplinary team spanning RF engineering, AI/ML, embedded systems, mechanical design, and software — all built for one purpose.
            </p>
            <a href="/team" className="ba">MEET THE TEAM →</a>
          </div>
        </div>
      </section>

      <section id="contact" style={{padding:'110px 28px',background:B,borderTop:`1px solid ${BR}`,position:'relative',overflow:'hidden'}}>
        <div className="gorb" style={{width:700,height:700,background:'rgba(255,136,0,0.08)',bottom:-200,right:-200}}/>
        <div className="grid" style={{position:'absolute',inset:0,opacity:.4}}/>
        <div style={{maxWidth:1300,margin:'0 auto',position:'relative',zIndex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:80,alignItems:'start'}}>
            <div>
              <div className="stag">GET IN TOUCH</div>
              <h2 className="hd" style={{fontSize:'clamp(44px,7vw,84px)',fontWeight:900,lineHeight:.88,marginBottom:28}}>
                LET'S SECURE<br/><span style={{color:A,textShadow:`0 0 60px rgba(255,136,0,0.4)`}}>YOUR SKIES.</span>
              </h2>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:16,lineHeight:1.8,fontWeight:300,marginBottom:44}}>
                For pilot programs, deployment discussions, system specifications, or investment inquiries — reach out directly.
              </p>
              <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
                <a href="mailto:contact@garudakshak.com" className="ba">EMAIL US</a>
                <a href="tel:+918209706419" className="bo">+91 82097 06419</a>
              </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:3}}>
              {[
                {l:'EMAIL',        v:'contact@garudakshak.com',              href:'mailto:contact@garudakshak.com'},
                {l:'PHONE',        v:'+91 82097 06419',                       href:'tel:+918209706419'},
                {l:'WEBSITE',      v:'garudakshak.com',                       href:'https://garudakshak.com'},
                {l:'INCUBATED AT', v:'IIT Mandi Catalyst, Himachal Pradesh',  href:null},
              ].map(c=>(
                <div key={c.l} style={{padding:'22px 26px',background:B3,borderBottom:`1px solid ${BR}`,position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,width:3,height:'100%',background:A,opacity:.6}}/>
                  <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:8}}>{c.l}</div>
                  {c.href
                    ? <a href={c.href} className="hd"
                        style={{fontSize:20,fontWeight:700,color:W,textDecoration:'none',letterSpacing:'.03em',transition:'color .2s'}}
                        onMouseEnter={e=>e.target.style.color=A}
                        onMouseLeave={e=>e.target.style.color=W}>{c.v}</a>
                    : <div className="hd" style={{fontSize:20,fontWeight:700,letterSpacing:'.03em'}}>{c.v}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{borderTop:`1px solid ${BR}`,padding:'22px 28px',background:B}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/images/garudakshak.png" alt="" style={{width:22,height:22,objectFit:'contain'}} onError={e=>e.target.style.display='none'}/>
            <span className="hd" style={{fontWeight:800,fontSize:14,letterSpacing:'.08em'}}>GARUDAKSHAK</span>
          </div>
          <span className="lbl" style={{color:DIM,fontSize:9}}>
            © {new Date().getFullYear()} GARUDAKSHAK DEFENCE TECHNOLOGIES · ALL RIGHTS RESERVED
          </span>
          <span className="lbl" style={{fontSize:9,color:A}}>SECURING SKIES, DEFENDING HORIZONS</span>
        </div>
      </footer>
    </>
  );
}