"use client";

import { useState, useEffect } from 'react';
import SiteNav from '../../components/SiteNav';

const A   = "#FF8800";
const B   = "#050508";
const B2  = "#0A0C12";
const B3  = "#0F1520";
const W   = "#FFFFFF";
const DIM = "#687585";
const BR  = "rgba(255,255,255,0.08)";
const BRA = "rgba(255,136,0,0.3)";

const domains = [
  {
    id: "rf",
    icon: "⊛",
    label: "RF & HARDWARE",
    color: A,
    roles: [
      {
        title: "RF Systems Engineer",
        type: "Full-time",
        level: "Mid / Senior",
        desc: "Design and optimize RF front-end chains, antenna arrays, and signal conditioning circuits for our drone detection platform.",
        skills: ["RF Circuit Design", "Antenna Theory", "HFSS / CST", "PCB Layout", "Network Analyzers"],
      },
      {
        title: "Embedded Systems Engineer",
        type: "Full-time",
        level: "Mid",
        desc: "Develop firmware for STM32/RPi-based control systems, GPIO interfacing, and real-time sensor integration.",
        skills: ["C/C++", "STM32", "Raspberry Pi", "RTOS", "SPI/I2C/UART"],
      },
      {
        title: "Hardware R&D Intern",
        type: "Internship",
        level: "Fresher / Junior",
        desc: "Support RF hardware testing, prototype assembly, and lab measurements. Great for EE/ECE students in final year.",
        skills: ["Basic RF", "Soldering", "Oscilloscope", "Eager to learn"],
      },
    ],
  },
  {
    id: "ai",
    icon: "◈",
    label: "AI & SIGNAL PROCESSING",
    color: A,
    roles: [
      {
        title: "ML Engineer — Signal Classification",
        type: "Full-time",
        level: "Mid / Senior",
        desc: "Build and train CNN/RNN models for real-time drone signal classification from SDR-captured spectrograms.",
        skills: ["PyTorch / TensorFlow", "Spectrograms", "Edge Inference", "Python", "HDF5 datasets"],
      },
      {
        title: "Computer Vision Engineer",
        type: "Full-time",
        level: "Mid",
        desc: "Develop optical drone detection and tracking pipelines on Jetson Orin Nano with sub-100ms latency.",
        skills: ["OpenCV", "YOLO", "Jetson/CUDA", "Python", "Camera ISP"],
      },
      {
        title: "AI Research Intern",
        type: "Internship",
        level: "Fresher / Junior",
        desc: "Assist in dataset collection, labeling, model benchmarking, and literature reviews for defense AI applications.",
        skills: ["Python", "NumPy", "Basic ML", "Research mindset"],
      },
    ],
  },
  {
    id: "software",
    icon: "⊡",
    label: "SOFTWARE",
    color: A,
    roles: [
      {
        title: "Full-Stack Engineer",
        type: "Full-time",
        level: "Mid",
        desc: "Build and maintain the operator dashboard, real-time threat map, and backend APIs connecting field hardware to the cloud.",
        skills: ["React / Next.js", "Node.js", "WebSockets", "REST APIs", "PostgreSQL"],
      },
      {
        title: "Systems Software Engineer",
        type: "Full-time",
        level: "Senior",
        desc: "Design high-reliability data pipelines that ingest multi-sensor streams and feed real-time classification and alerting systems.",
        skills: ["Python", "C++", "Linux", "Message Queues", "Low-latency systems"],
      },
      {
        title: "Software Intern",
        type: "Internship",
        level: "Fresher",
        desc: "Help build frontend components, write scripts, and support software testing. Good for CS/IT students passionate about defence tech.",
        skills: ["JavaScript", "Python", "Git", "Curiosity"],
      },
    ],
  },
  {
    id: "mechanical",
    icon: "⊘",
    label: "MECHANICAL & DESIGN",
    color: A,
    roles: [
      {
        title: "Mechanical Design Engineer",
        type: "Full-time",
        level: "Mid",
        desc: "Design ruggedized enclosures, antenna mounts, and deployment hardware using SolidWorks/CATIA for field conditions.",
        skills: ["SolidWorks / CATIA", "GD&T", "Sheet Metal", "3D Printing", "Field ruggedization"],
      },
      {
        title: "UI/UX Designer",
        type: "Full-time / Contract",
        level: "Mid",
        desc: "Design intuitive operator interfaces for high-stakes environments — from real-time threat maps to alert workflows, dashboards, and mobile control apps.",
        skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Motion Design"],
      },
    ],
  },
  {
    id: "operations",
    icon: "⊗",
    label: "OPERATIONS & GROWTH",
    color: A,
    roles: [
      {
        title: "Defence Business Development",
        type: "Full-time",
        level: "Senior",
        desc: "Lead procurement engagement with MoD, paramilitary, and state police. Navigate DRDO / iDEX channels and handle BD strategy.",
        skills: ["Defence Procurement", "Government BD", "DRDO/iDEX", "Proposal Writing"],
      },
      {
        title: "Operations & Finance Associate",
        type: "Full-time",
        level: "Junior / Mid",
        desc: "Manage day-to-day operations, vendor relationships, grant compliance (GFR), and financial reporting for a fast-moving startup.",
        skills: ["Finance Basics", "Excel", "Grant Compliance", "Vendor Management"],
      },
    ],
  },
];

// Badge styling
const typeBadge = (type) => ({
  padding: '3px 10px',
  border: `1px solid ${type === 'Internship' ? 'rgba(100,200,255,0.3)' : BRA}`,
  background: type === 'Internship' ? 'rgba(100,200,255,0.07)' : 'rgba(255,136,0,0.07)',
  fontFamily: "'Rajdhani',sans-serif",
  fontSize: 10, fontWeight: 600, letterSpacing: '.12em',
  color: type === 'Internship' ? '#64C8FF' : A,
  whiteSpace: 'nowrap',
});

export default function CareersPage() {
  const [activeModal, setActiveModal] = useState(null); // role object
  const [form, setForm]             = useState({ name:'', email:'', phone:'', experience:'', message:'', portfolio:'' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');
  const [filter, setFilter]         = useState('all');

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  const openModal = (role, domain) => {
    setForm({ name:'', email:'', phone:'', experience:'', message:'', portfolio:'' });
    setSubmitted(false);
    setError('');
    setActiveModal({ ...role, domain: domain.label });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError('Name and email are required.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: activeModal.title, domain: activeModal.domain }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDomains = filter === 'all' ? domains : domains.filter(d => d.id === filter);
  const totalRoles = domains.reduce((n, d) => n + d.roles.length, 0);

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
        .stag{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border:1px solid ${BRA};font-family:'Rajdhani',sans-serif;font-size:11px;letter-spacing:.22em;color:${A};font-weight:600;background:rgba(255,136,0,0.05);}
        .stag::before{content:'';width:6px;height:6px;background:${A};border-radius:50%;box-shadow:0 0 8px ${A};}
        .ba{background:${A};color:#000;padding:12px 28px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;letter-spacing:.18em;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);}
        .ba:hover{background:#FFAA33;transform:translateY(-1px);}
        .ba:disabled{background:#444;color:#888;cursor:not-allowed;transform:none;}
        .bo{border:1px solid ${BRA};color:${W};padding:12px 28px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;letter-spacing:.18em;background:transparent;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s;}
        .bo:hover{border-color:${A};color:${A};}
        .gorb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;}
        .desk{display:flex!important;} .mob-tog{display:none!important;}
        @media(max-width:768px){.desk{display:none!important;}.mob-tog{display:block!important;}}
        .grid{background-image:linear-gradient(rgba(255,136,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,136,0,.03) 1px,transparent 1px);background-size:60px 60px;}
        /* form inputs */
        .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid ${BR};color:${W};padding:12px 16px;font-family:'Barlow',sans-serif;font-size:14px;font-weight:300;outline:none;transition:border-color .2s;resize:vertical;}
        .inp:focus{border-color:${BRA};}
        .inp::placeholder{color:${DIM};}
        /* filter tabs */
        .ftab{padding:8px 18px;border:1px solid ${BR};background:transparent;color:${DIM};font-family:'Rajdhani',sans-serif;font-weight:600;font-size:11px;letter-spacing:.16em;cursor:pointer;transition:all .2s;}
        .ftab.act{border-color:${BRA};background:rgba(255,136,0,0.08);color:${A};}
        .ftab:hover:not(.act){border-color:rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);}
        /* role card */
        .rc{background:${B3};border:1px solid ${BR};padding:28px;transition:all .3s;position:relative;overflow:hidden;}
        .rc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${A},transparent);opacity:0;transition:opacity .3s;}
        .rc:hover{border-color:${BRA};transform:translateY(-2px);}
        .rc:hover::before{opacity:1;}
        /* modal overlay */
        .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal{background:${B2};border:1px solid ${BR};width:100%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;display:flex;flex-direction:column;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .6s ease forwards;}
        .fu1{animation-delay:.05s;opacity:0;}
        .fu2{animation-delay:.15s;opacity:0;}
        .fu3{animation-delay:.25s;opacity:0;}
      `}</style>

      <SiteNav />

      {/* ── HERO ── */}
      <section className="grid" style={{paddingTop:150,paddingBottom:80,paddingLeft:28,paddingRight:28,position:'relative',overflow:'hidden',background:B}}>
        <div className="gorb" style={{width:700,height:700,background:'rgba(255,136,0,0.08)',top:-150,right:-150}}/>
        <div className="gorb" style={{width:400,height:400,background:'rgba(255,136,0,0.05)',bottom:-100,left:-50}}/>
        <div style={{maxWidth:1300,margin:'0 auto',position:'relative',zIndex:1}}>
          <div className="fu fu1">
            <div className="stag" style={{marginBottom:20}}>WE'RE HIRING · {totalRoles} OPEN ROLES</div>
          </div>
          <h1 className="hd fu fu2" style={{fontSize:'clamp(56px,9vw,112px)',fontWeight:900,lineHeight:.88,letterSpacing:'-.02em',marginBottom:28}}>
            BUILD THE<br/><span style={{color:A}}>FUTURE OF</span><br/>DEFENCE.
          </h1>
          <p className="fu fu3" style={{fontSize:18,color:'rgba(255,255,255,0.55)',maxWidth:540,lineHeight:1.8,fontWeight:300,marginBottom:48}}>
            We're a small, intense team building India's most advanced counter-drone system. If you want your work to matter at the frontier of national security — this is the place.
          </p>

          {/* quick stats */}
          <div className="fu fu3" style={{display:'flex',flexWrap:'wrap',gap:0,borderTop:`1px solid ${BR}`,paddingTop:32}}>
            {[
              {v:`${totalRoles}`,   l:'OPEN POSITIONS'},
              {v:'Early',          l:'STAGE — HIGH OWNERSHIP'},
              {v:'IIT Mandi',      l:'INCUBATED'},
              {v:'₹ Funded',       l:'NIDHI-PRAYAS · EMERGENT'},
            ].map((s,i)=>(
              <div key={i} style={{paddingRight:40,marginRight:40,borderRight:i<3?`1px solid ${BR}`:'none',paddingTop:4}}>
                <div className="hd" style={{fontSize:28,fontWeight:900,color:W,lineHeight:1}}>{s.v}</div>
                <div className="lbl" style={{fontSize:9,color:A,marginTop:5}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div style={{borderTop:`1px solid ${BR}`,borderBottom:`1px solid ${BR}`,background:B2,padding:'16px 28px',position:'sticky',top:64,zIndex:50}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <span className="lbl" style={{color:DIM,fontSize:9,marginRight:8}}>FILTER BY</span>
          <button className={`ftab${filter==='all'?' act':''}`} onClick={()=>setFilter('all')}>
            ALL ROLES ({totalRoles})
          </button>
          {domains.map(d=>(
            <button key={d.id} className={`ftab${filter===d.id?' act':''}`} onClick={()=>setFilter(d.id)}>
              {d.label} ({d.roles.length})
            </button>
          ))}
        </div>
      </div>

      {/* ── ROLES ── */}
      <section style={{padding:'72px 28px 120px',background:B}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',flexDirection:'column',gap:64}}>
          {filteredDomains.map(domain=>(
            <div key={domain.id}>
              {/* domain header */}
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24,paddingBottom:16,borderBottom:`1px solid ${BR}`}}>
                <span style={{fontSize:24,color:A}}>{domain.icon}</span>
                <div>
                  <div className="lbl" style={{color:A,fontSize:11}}>{domain.label}</div>
                  <div style={{fontSize:13,color:DIM,fontWeight:300}}>{domain.roles.length} open position{domain.roles.length>1?'s':''}</div>
                </div>
              </div>

              {/* role cards */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:3}}>
                {domain.roles.map((role,ri)=>(
                  <div key={ri} className="rc">
                    {/* top row */}
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:12,flexWrap:'wrap'}}>
                      <div>
                        <div className="hd" style={{fontSize:22,fontWeight:800,letterSpacing:'.04em',color:W,marginBottom:4}}>{role.title}</div>
                        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                          <span style={typeBadge(role.type)}>{role.type.toUpperCase()}</span>
                          <span style={{...typeBadge('ft'),border:`1px solid rgba(255,255,255,0.1)`,color:DIM,background:'transparent'}}>{role.level.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* description */}
                    <p style={{fontSize:14,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.7,marginBottom:20}}>{role.desc}</p>

                    {/* skills */}
                    <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:24}}>
                      {role.skills.map(s=>(
                        <span key={s} style={{
                          padding:'3px 10px',
                          border:`1px solid rgba(255,255,255,0.08)`,
                          background:'rgba(255,255,255,0.03)',
                          fontFamily:"'Rajdhani',sans-serif",
                          fontSize:10,fontWeight:600,letterSpacing:'.1em',
                          color:'rgba(255,255,255,0.45)',
                        }}>{s}</span>
                      ))}
                    </div>

                    {/* apply button */}
                    <button className="ba" style={{fontSize:12,padding:'10px 22px'}} onClick={()=>openModal(role,domain)}>
                      APPLY NOW →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPEN APPLICATION STRIP ── */}
      <div style={{borderTop:`1px solid ${BR}`,background:B2,padding:'56px 28px'}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:32}}>
          <div>
            <div className="hd" style={{fontSize:'clamp(24px,3vw,40px)',fontWeight:900,lineHeight:1,marginBottom:8}}>
              Don't see your role?
            </div>
            <p style={{color:'rgba(255,255,255,0.45)',fontSize:15,fontWeight:300,lineHeight:1.7,maxWidth:440,margin:0}}>
              We're always open to exceptional people. Send us what you're great at — if there's a fit, we'll find it.
            </p>
          </div>
          <button className="ba" onClick={()=>openModal({title:'Open Application',type:'Full-time',level:'Any',desc:'',skills:[]},{label:'OPEN APPLICATION'})}>
            SEND OPEN APPLICATION →
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{borderTop:`1px solid ${BR}`,padding:'20px 28px',background:B,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/images/garudakshak.png" alt="" style={{width:20,height:20,objectFit:'contain'}} onError={e=>e.target.style.display='none'}/>
          <span className="hd" style={{fontWeight:800,fontSize:13,letterSpacing:'.08em',color:W}}>GARUDAKSHAK</span>
        </a>
        <span className="lbl" style={{color:DIM,fontSize:9}}>© {new Date().getFullYear()} GARUDAKSHAK DEFENCE TECHNOLOGIES · ALL RIGHTS RESERVED</span>
        <span className="lbl" style={{fontSize:9,color:A}}>SECURING SKIES, DEFENDING HORIZONS</span>
      </div>

      {/* ════════════════════════════════════════
          APPLICATION MODAL
      ════════════════════════════════════════ */}
      {activeModal && (
        <div className="modal-bg" onClick={e=>{ if(e.target.classList.contains('modal-bg')) setActiveModal(null); }}>
          <div className="modal">

            {/* modal header */}
            <div style={{padding:'28px 32px 20px',borderBottom:`1px solid ${BR}`,flexShrink:0,position:'relative'}}>
              <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:2,background:`linear-gradient(90deg,transparent,${A},transparent)`}}/>
              <div className="lbl" style={{fontSize:9,color:A,marginBottom:8}}>{activeModal.domain}</div>
              <div className="hd" style={{fontSize:26,fontWeight:800,color:W,lineHeight:1.1,marginBottom:4}}>{activeModal.title}</div>
              {activeModal.type && <div style={{display:'flex',gap:6,marginTop:8}}>
                <span style={typeBadge(activeModal.type)}>{activeModal.type.toUpperCase()}</span>
                {activeModal.level && <span style={{...typeBadge('ft'),border:`1px solid rgba(255,255,255,0.1)`,color:DIM,background:'transparent'}}>{activeModal.level.toUpperCase()}</span>}
              </div>}
              <button
                onClick={()=>setActiveModal(null)}
                style={{position:'absolute',top:20,right:20,background:'none',border:`1px solid ${BR}`,color:W,width:32,height:32,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=BRA}
                onMouseLeave={e=>e.currentTarget.style.borderColor=BR}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13"/></svg>
              </button>
            </div>

            {/* modal body */}
            <div style={{padding:'28px 32px',overflowY:'auto',flex:1}}>
              {submitted ? (
                /* SUCCESS STATE */
                <div style={{textAlign:'center',padding:'32px 0'}}>
                  <div style={{width:64,height:64,border:`2px solid ${A}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div className="hd" style={{fontSize:28,fontWeight:800,color:W,marginBottom:12}}>APPLICATION RECEIVED</div>
                  <p style={{fontSize:15,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.7,marginBottom:28}}>
                    Thanks for applying for <strong style={{color:W}}>{activeModal.title}</strong>. We review every application personally and will be in touch if there's a strong fit.
                  </p>
                  <button className="ba" onClick={()=>setActiveModal(null)}>CLOSE</button>
                </div>
              ) : (
                /* FORM */
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>FULL NAME *</div>
                      <input className="inp" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>EMAIL *</div>
                      <input className="inp" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/>
                    </div>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>PHONE</div>
                      <input className="inp" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:10}}>YEARS OF EXPERIENCE</div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                        {['Fresher / Student','0–1 years','1–3 years','3–6 years','6+ years'].map(opt=>(
                          <button type="button" key={opt}
                            onClick={()=>setForm(f=>({...f,experience:opt}))}
                            style={{
                              padding:'8px 14px',
                              border:`1px solid ${form.experience===opt?BRA:BR}`,
                              background:form.experience===opt?'rgba(255,136,0,0.08)':'transparent',
                              color:form.experience===opt?A:DIM,
                              fontFamily:"'Rajdhani',sans-serif",fontWeight:600,
                              fontSize:11,letterSpacing:'.12em',cursor:'pointer',transition:'all .2s',
                            }}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>PORTFOLIO / LINKEDIN / GITHUB</div>
                    <input className="inp" placeholder="https://" value={form.portfolio} onChange={e=>setForm(f=>({...f,portfolio:e.target.value}))}/>
                  </div>

                  <div>
                    <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>WHY GARUDAKSHAK? WHAT WILL YOU BRING?</div>
                    <textarea className="inp" rows={5} placeholder="Tell us about yourself, your relevant experience, and why you want to work on India's counter-drone challenge..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
                  </div>

                  {error && (
                    <div style={{padding:'12px 16px',border:`1px solid rgba(255,80,80,0.3)`,background:'rgba(255,80,80,0.06)',color:'#FF8080',fontFamily:"'Rajdhani',sans-serif",fontSize:12,letterSpacing:'.1em'}}>
                      {error}
                    </div>
                  )}

                  <div style={{display:'flex',gap:12,marginTop:8,alignItems:'center'}}>
                    <button type="submit" className="ba" disabled={submitting}>
                      {submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION →'}
                    </button>
                    <button type="button" className="bo" onClick={()=>setActiveModal(null)} style={{padding:'12px 20px'}}>CANCEL</button>
                  </div>

                  <p style={{fontSize:12,color:DIM,fontWeight:300,lineHeight:1.6}}>
                    Your application is stored securely. We don't share your data with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
