"use client";

import { useState, useEffect } from 'react';

const A    = "#FF8800";
const B    = "#050508";
const B2   = "#0A0C12";
const B3   = "#0F1520";
const W    = "#FFFFFF";
const DIM  = "#687585";
const BR   = "rgba(255,255,255,0.08)";
const BRA  = "rgba(255,136,0,0.3)";

const team = [
  {
    name:"Saransh Duharia",
    role:"Founder & CEO",
    spec:"RF & Communication Systems",
    image:"/images/Saransh.jpg",
    bio:"RF engineer turned founder. Building India's counter-drone system from the ground up — from antenna design to AI detection. IIT Mandi → IIT Bombay.",
    tags:["RF Systems","C-UAS","Phased Arrays","Communication Systems","Founder"],
  },
  {
    name:"Dr. Anirban Sarkar",
    role:"Technical Mentor",
    spec:"RF & Microwave",
    image:"/images/Dr.Anirban.png",
    bio:"Deep domain expert in RF and microwave engineering with over 10 years of research and industry experience. Core technical advisor.",
    tags:["RF Design","Microwave","Research"],
  },
  {
    name:"Baivab Anand",
    role:"Head of AI & Tech Advisor",
    spec:"AI & Product Strategy",
    image:"/images/Baivab.png",
    bio:"6+ years in deep tech. Leads AI architecture and product strategy, bridging cutting-edge research with practical defense deployment.",
    tags:["AI/ML","Product","Deep Tech"],
  },
  {
    name:"Vikrant Sharma",
    role:"Mechanical Engineer",
    spec:"Mechanical Design",
    image:"/images/Vikrant.png",
    bio:"Responsible for the mechanical design and CAD of the Garuda-Shield platform, including the structural housing and antenna mounting systems.",
    tags:["CAD Design","Structural","Manufacturing"],
  },
  {
    name:"Aishita Prakash",
    role:"Electrical & RF Engineer",
    spec:"RF Simulation & Hardware Validation",
    image:"/images/Aishita.png",
    bio:"Specializes in RF simulation and hardware validation. Contributes to the S-band HPM prototype, RF front-end chain design, and X-band HPM system development — bridging EM simulation to physical hardware.",
    tags:["RF Simulation","HPM","S-band","X-band","Hardware Validation"],
  },
  {
    name:"Edison Kho",
    role:"Electrical & RF Engineer",
    spec:"RF & Embedded Systems",
    image:"/images/Edison.png",
    bio:"Works on embedded RF systems, hardware integration, and signal chain design from antenna to baseband processor.",
    tags:["Embedded","Signal Chain","RF"],
  },
  {
    name:"Rohit Jhajhria",
    role:"Electrical & RF Engineer",
    spec:"RF Chain Design & Antenna Simulation",
    image:"/images/rohit.jpeg",
    bio:"Pursuing B.Tech in EEE from SRMIST. Defines the RF chain architecture and runs end-to-end simulations of all components and antennas used in the detection and neutralization system.",
    tags:["RF Chain","Antenna Simulation","Component Design","EEE"],
  },
  {
    name:"Satvik Ahuja",
    role:"AI/ML Engineer",
    spec:"Machine Learning & Software",
    image:"/images/Satvik.png",
    bio:"Develops and deploys machine learning models for drone detection and classification. Bridges AI research with real-time software systems on the Garudakshak platform.",
    tags:["AI/ML","Deep Learning","Python","Detection Models"],
  },
  {
    name:"Aditya Tayal",
    role:"Software Engineer",
    spec:"Software & Backend",
    image:"/images/aditya.jpeg",
    bio:"Develops backend services, data pipelines, and the API layer that connects hardware sensors to the control software.",
    tags:["Backend","APIs","Systems"],
  },
  {
    name:"Gauri",
    role:"UI/UX Designer",
    spec:"Interface & Experience Design",
    image:"/images/Gauri.jpeg",
    bio:"Designs the operator-facing interfaces for the Garuda-Shield platform — from real-time threat dashboards to mobile control apps — making complex defense systems intuitive to use.",
    tags:["UI/UX","Figma","Dashboard Design","User Research"],
  },
];

export default function TeamPage() {
  const [scrollY, setScrollY] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${B};color:${W};font-family:'Barlow',sans-serif;overflow-x:hidden;}
        .hd{font-family:'Barlow Condensed',sans-serif;}
        .lbl{font-family:'Rajdhani',sans-serif;font-weight:600;letter-spacing:.2em;font-size:11px;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${A};}
        .nl{color:${DIM};text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;letter-spacing:.2em;transition:color .2s;padding-bottom:2px;border-bottom:1px solid transparent;}
        .nl:hover{color:${A};border-bottom-color:${A};}
        .stag{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border:1px solid ${BRA};font-family:'Rajdhani',sans-serif;font-size:11px;letter-spacing:.22em;color:${A};font-weight:600;margin-bottom:16px;background:rgba(255,136,0,0.05);}
        .stag::before{content:'';width:6px;height:6px;background:${A};border-radius:50%;box-shadow:0 0 8px ${A};}
        .ba{background:${A};color:#000;padding:13px 32px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;letter-spacing:.2em;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);}
        .ba:hover{background:#FFAA33;transform:translateY(-1px);}
        .gorb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
        .grid{background-image:linear-gradient(rgba(255,136,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,136,0,.03) 1px,transparent 1px);background-size:60px 60px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .7s ease forwards;}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:100,
        background: scrollY>20 ? 'rgba(5,5,8,0.96)' : 'transparent',
        backdropFilter: scrollY>20 ? 'blur(20px)' : 'none',
        borderBottom:`1px solid ${scrollY>20?BR:'transparent'}`,
        transition:'all .35s',
      }}>
        <div style={{maxWidth:1300,margin:'0 auto',padding:'0 28px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
            <img src="/images/garudakshak.png" alt="" style={{width:32,height:32,objectFit:'contain'}} onError={e=>e.target.style.display='none'}/>
            <div>
              <div className="hd" style={{fontWeight:900,fontSize:17,letterSpacing:'.1em',color:W}}>GARUDAKSHAK</div>
              <div className="lbl" style={{fontSize:8,color:A,marginTop:1}}>SECURING SKIES, DEFENDING HORIZONS</div>
            </div>
          </a>
          <div style={{display:'flex',gap:36,alignItems:'center'}}>
            <a href="/" className="nl">HOME</a>
            <a href="/#recognition" className="nl">RECOGNITION</a>
            <a href="/#contact" className="nl">CONTACT</a>
            <a href="/demo" className="ba" style={{padding:'10px 22px',fontSize:12}}>GET DEMO</a>
          </div>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <section className="grid" style={{paddingTop:160,paddingBottom:80,paddingLeft:28,paddingRight:28,position:'relative',overflow:'hidden',background:B}}>
        <div className="gorb" style={{width:600,height:600,background:'rgba(255,136,0,0.09)',top:-100,right:-100}}/>
        <div style={{maxWidth:1300,margin:'0 auto',position:'relative',zIndex:1}}>
          <div className="stag fu">THE PEOPLE BEHIND IT</div>
          <h1 className="hd fu" style={{fontSize:'clamp(56px,9vw,120px)',fontWeight:900,lineHeight:.88,letterSpacing:'-.02em',marginBottom:28,animationDelay:'.1s',opacity:0}}>
            BUILT BY<br/><span style={{color:A}}>ENGINEERS.</span>
          </h1>
          <p className="fu" style={{fontSize:18,color:'rgba(255,255,255,0.55)',maxWidth:520,lineHeight:1.8,fontWeight:300,animationDelay:'.2s',opacity:0}}>
            A multidisciplinary team of 9 — RF engineers, AI researchers, mechanical designers, and software developers — all working toward one goal: securing India's airspace.
          </p>
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section style={{padding:'80px 28px 120px',background:B,borderTop:`1px solid ${BR}`}}>
        <div style={{maxWidth:1300,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:3}}>
            {team.map((m,i)=>(
              <div
                key={i}
                style={{
                  background:hovered===i?B3:B2,
                  border:`1px solid ${hovered===i?BRA:BR}`,
                  padding:'32px 28px',
                  display:'flex',gap:24,
                  alignItems:'flex-start',
                  transition:'all .3s',
                  position:'relative',
                  overflow:'hidden',
                  cursor:'default',
                }}
                onMouseEnter={()=>setHovered(i)}
                onMouseLeave={()=>setHovered(null)}
              >
                {/* amber top accent on hover */}
                <div style={{
                  position:'absolute',top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,transparent,${A},transparent)`,
                  opacity:hovered===i?1:0,transition:'opacity .3s',
                }}/>

                {/* photo */}
                <div style={{flexShrink:0}}>
                  <img
                    src={m.image}
                    alt={m.name}
                    style={{
                      width:88,height:88,
                      objectFit:'cover',
                      borderRadius:2,
                      border:`1px solid ${hovered===i?BRA:BR}`,
                      transition:'border-color .3s',
                      display:'block',
                    }}
                    onError={e=>{
                      e.target.src=`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHZpZXdCb3g9IjAgMCA4OCA4OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODgiIGhlaWdodD0iODgiIGZpbGw9IiMwRjE1MjAiLz48Y2lyY2xlIGN4PSI0NCIgY3k9IjMzIiByPSIxMiIgZmlsbD0iIzFBMkMzRSIvPjxwYXRoIGQ9Ik0yNiA2OEMyNiA2Mi40NzcgMzAuNDc3IDU4IDM2IDU4SDUyQzU3LjUyMyA1OCA2MiA2Mi40NzcgNjIgNjhWNzRIMjZWNjhaIiBmaWxsPSIjMUEyQzNFIi8+PC9zdmc+`;
                    }}
                  />
                </div>

                {/* info */}
                <div style={{flex:1,minWidth:0}}>
                  <div className="hd" style={{fontSize:20,fontWeight:800,letterSpacing:'.04em',color:W,marginBottom:2}}>{m.name}</div>
                  <div className="lbl" style={{fontSize:10,color:A,marginBottom:4}}>{m.role}</div>
                  <div style={{fontSize:12,color:DIM,fontWeight:300,marginBottom:14}}>{m.spec}</div>

                  {/* bio — shown on hover */}
                  <div style={{
                    maxHeight:hovered===i?120:0,
                    overflow:'hidden',
                    transition:'max-height .4s cubic-bezier(.4,0,.2,1)',
                  }}>
                    <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.65,marginBottom:14}}>{m.bio}</p>
                  </div>

                  {/* tags */}
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {m.tags.map(t=>(
                      <span key={t} style={{
                        padding:'3px 10px',
                        border:`1px solid rgba(255,136,0,0.2)`,
                        background:'rgba(255,136,0,0.05)',
                        fontFamily:"'Rajdhani',sans-serif",
                        fontSize:10,fontWeight:600,letterSpacing:'.12em',
                        color:hovered===i?A:DIM,
                        transition:'color .3s',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div style={{borderTop:`1px solid ${BR}`,padding:'24px 28px',background:B,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/images/garudakshak.png" alt="" style={{width:22,height:22,objectFit:'contain'}} onError={e=>e.target.style.display='none'}/>
          <span className="hd" style={{fontWeight:800,fontSize:14,letterSpacing:'.08em',color:W}}>GARUDAKSHAK</span>
        </a>
        <a href="/demo" className="ba" style={{fontSize:12,padding:'10px 24px'}}>REQUEST DEMO →</a>
        <span className="lbl" style={{color:DIM,fontSize:9}}>© {new Date().getFullYear()} GARUDAKSHAK DEFENCE TECHNOLOGIES</span>
      </div>
    </>
  );
}