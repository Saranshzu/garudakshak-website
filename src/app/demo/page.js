"use client";

import { useState } from 'react';
import SiteNav from '../../components/SiteNav';

const A   = "#FF8800";
const B   = "#050508";
const B2  = "#0A0C12";
const B3  = "#0F1520";
const W   = "#FFFFFF";
const DIM = "#687585";
const BR  = "rgba(255,255,255,0.08)";
const BRA = "rgba(255,136,0,0.3)";

export default function DemoPage() {
  const [step, setStep]           = useState(1); // 1 = form, 2 = success
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');
  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '', designation: '',
    useCase: '', location: '', timeline: '', message: '', orgType: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.org) {
      setError('Name, organisation, and email are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setStep(2); }
      else { setError(data.error || 'Something went wrong. Please try again.'); }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${B};color:${W};font-family:'Barlow',sans-serif;overflow-x:hidden;}
        .hd{font-family:'Barlow Condensed',sans-serif;}
        .lbl{font-family:'Rajdhani',sans-serif;font-weight:500;letter-spacing:.28em;font-size:11px;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${A};}
        .nl{color:${DIM};text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:500;font-size:12px;letter-spacing:.28em;transition:color .2s;padding-bottom:2px;border-bottom:1px solid transparent;}
        .nl:hover{color:${A};border-bottom-color:${A};}
        .ba{background:${A};color:#001a33;padding:13px 32px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:13px;letter-spacing:.26em;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);}
        .ba:hover{background:#FFAA33;transform:translateY(-1px);}
        .ba:disabled{background:#333;color:#666;cursor:not-allowed;transform:none;clip-path:none;}
        .bo{border:1px solid ${BRA};color:${W};padding:13px 32px;font-family:'Rajdhani',sans-serif;font-weight:500;font-size:13px;letter-spacing:.26em;background:transparent;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s;}
        .bo:hover{border-color:${A};color:${A};}
        .gorb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;}
        .grid{background-image:linear-gradient(rgba(255,136,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,136,0,.03) 1px,transparent 1px);background-size:60px 60px;}
        .inp{width:100%;background:rgba(255,255,255,0.03);border:1px solid ${BR};color:${W};padding:13px 16px;font-family:'Barlow',sans-serif;font-size:15px;font-weight:300;outline:none;transition:border-color .25s,background .25s;border-radius:1px;}
        .inp:focus{border-color:${BRA};background:rgba(255,136,0,0.03);}
        .inp::placeholder{color:${DIM};}
        .inp option{background:#0F1520;color:${W};}
        .radio-group{display:flex;flex-wrap:wrap;gap:8px;}
        .radio-btn{padding:8px 16px;border:1px solid ${BR};background:transparent;color:${DIM};font-family:'Rajdhani',sans-serif;font-weight:600;font-size:11px;letter-spacing:.15em;cursor:pointer;transition:all .2s;}
        .radio-btn.sel{border-color:${BRA};background:rgba(255,136,0,0.08);color:${A};}
        .radio-btn:hover:not(.sel){border-color:rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .6s ease forwards;}
        .fu1{animation-delay:.05s;opacity:0;}
        .fu2{animation-delay:.15s;opacity:0;}
        .fu3{animation-delay:.28s;opacity:0;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
      `}</style>

      <SiteNav />

      {/* ── PAGE ── */}
      <div style={{minHeight:'100vh',display:'grid',gridTemplateColumns:'1fr 1fr',background:B}} className="page-grid">
        <style>{`@media(max-width:900px){.page-grid{grid-template-columns:1fr!important}.left-panel{display:none!important}}`}</style>

        {/* ── LEFT PANEL — brand/info ── */}
        <div className="left-panel grid" style={{
          position:'sticky',top:64,height:'calc(100vh - 64px)',
          display:'flex',flexDirection:'column',justifyContent:'center',
          padding:'48px 56px',background:B2,borderRight:`1px solid ${BR}`,
          overflow:'hidden',
        }}>
          <div className="gorb" style={{width:500,height:500,background:'rgba(255,136,0,0.08)',top:-100,right:-100}}/>
          <div className="gorb" style={{width:300,height:300,background:'rgba(255,136,0,0.05)',bottom:0,left:-50}}/>

          <div style={{position:'relative',zIndex:1}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'4px 12px',border:`1px solid ${BRA}`,background:'rgba(255,136,0,0.06)',marginBottom:28}}>
              <div style={{width:6,height:6,background:A,borderRadius:'50%',boxShadow:`0 0 8px ${A}`,animation:'pulse 2s infinite'}}/>
              <span className="lbl" style={{color:A,fontSize:9}}>LIVE DEMO AVAILABLE</span>
            </div>

            <h1 className="hd" style={{fontSize:'clamp(40px,4.5vw,60px)',fontWeight:700,lineHeight:.9,letterSpacing:'.05em',marginBottom:20}}>
              SEE GARUDA-<br/>SHIELD IN<br/><span style={{color:A}}>ACTION.</span>
            </h1>

            <div style={{width:40,height:2,background:A,marginBottom:24}}/>

            <p style={{fontSize:15,color:'rgba(255,255,255,0.5)',lineHeight:1.75,fontWeight:300,marginBottom:36}}>
              A live walkthrough of our counter-drone platform — detect, identify, and neutralize, tailored to your scenario.
            </p>

            {/* what to expect */}
            <div style={{display:'flex',flexDirection:'column',gap:0}}>
              {[
                {icon:'⊛', t:'Live RF Detection Demo',        d:'Real-time drone detection across 2.4 GHz and 5.8 GHz bands.'},
                {icon:'◈', t:'AI Classification Walkthrough', d:'Friend vs foe IFF classification in under 200ms.'},
                {icon:'⊡', t:'Neutralization Overview',       d:'RF jamming, GPS spoofing, and interception — end to end.'},
                {icon:'⊘', t:'Deployment Consultation',       d:'Tailored discussion around your site and use case.'},
              ].map((x,i)=>(
                <div key={i} style={{display:'flex',gap:16,padding:'16px 0',borderBottom:`1px solid ${BR}`}}>
                  <span style={{color:A,fontSize:16,flexShrink:0,marginTop:2}}>{x.icon}</span>
                  <div>
                    <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:12,letterSpacing:'.1em',color:W,marginBottom:3}}>{x.t}</div>
                    <div style={{fontSize:13,color:DIM,fontWeight:300,lineHeight:1.6}}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* contact */}
            <div style={{marginTop:28,paddingTop:20,borderTop:`1px solid ${BR}`,display:'flex',gap:16,flexWrap:'wrap'}}>
              <a href="mailto:contact@garudakshak.com" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:5,height:5,background:A,borderRadius:'50%',flexShrink:0}}/>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:11,color:DIM,letterSpacing:'.12em',fontWeight:600,transition:'color .2s'}}
                  onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color=DIM}>
                  contact@garudakshak.com
                </span>
              </a>
              <a href="tel:+918209706419" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:5,height:5,background:A,borderRadius:'50%',flexShrink:0}}/>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontSize:11,color:DIM,letterSpacing:'.12em',fontWeight:600,transition:'color .2s'}}
                  onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color=DIM}>
                  +91 82097 06419
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — form ── */}
        <div style={{padding:'100px 56px 80px',overflowY:'auto',background:B}}>
          {step === 2 ? (
            /* ── SUCCESS ── */
            <div style={{maxWidth:480,margin:'80px auto 0',textAlign:'center'}}>
              <div style={{width:80,height:80,border:`2px solid ${A}`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 28px',boxShadow:`0 0 32px rgba(255,136,0,0.2)`}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <div className="hd fu" style={{fontSize:48,fontWeight:700,color:W,lineHeight:.9,letterSpacing:'.06em',marginBottom:16}}>REQUEST<br/><span style={{color:A}}>RECEIVED.</span></div>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',fontWeight:300,lineHeight:1.8,marginBottom:40}}>
                Thank you, <strong style={{color:W}}>{form.name}</strong>. We've received your demo request and will reach out to <strong style={{color:W}}>{form.email}</strong> within 48 hours to schedule a session.
              </p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <a href="/" className="ba">BACK TO HOME</a>
                <a href="/careers" className="bo">VIEW CAREERS</a>
              </div>
            </div>
          ) : (
            /* ── FORM ── */
            <div style={{maxWidth:520,margin:'0 auto'}}>
              <div className="lbl fu fu1" style={{color:A,marginBottom:8}}>DEMO REQUEST FORM</div>
              <h2 className="hd fu fu2" style={{fontSize:'clamp(32px,4vw,48px)',fontWeight:700,lineHeight:.92,letterSpacing:'.05em',marginBottom:8}}>
                GET A LIVE<br/><span style={{color:A}}>DEMONSTRATION</span>
              </h2>
              <p className="fu fu3" style={{fontSize:14,color:DIM,fontWeight:300,lineHeight:1.7,marginBottom:40}}>
                Fill in your details and we'll schedule a session around your requirements.
              </p>

              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:24}}>

                {/* ── SECTION 1: Who are you ── */}
                <div style={{paddingBottom:24,borderBottom:`1px solid ${BR}`}}>
                  <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:16}}>YOUR DETAILS</div>
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                      <div>
                        <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>FULL NAME *</div>
                        <input className="inp" placeholder="Your name" value={form.name} onChange={e=>set('name',e.target.value)} required/>
                      </div>
                      <div>
                        <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>DESIGNATION</div>
                        <input className="inp" placeholder="e.g. Procurement Officer" value={form.designation} onChange={e=>set('designation',e.target.value)}/>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                      <div>
                        <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>EMAIL *</div>
                        <input className="inp" type="email" placeholder="official@org.in" value={form.email} onChange={e=>set('email',e.target.value)} required/>
                      </div>
                      <div>
                        <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>PHONE</div>
                        <input className="inp" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SECTION 2: Organisation ── */}
                <div style={{paddingBottom:24,borderBottom:`1px solid ${BR}`}}>
                  <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:16}}>YOUR ORGANISATION</div>
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>ORGANISATION NAME *</div>
                      <input className="inp" placeholder="Ministry / Company / Institution" value={form.org} onChange={e=>set('org',e.target.value)} required/>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:10}}>ORGANISATION TYPE</div>
                      <div className="radio-group">
                        {['Indian Army / Paramilitary','Central Government','State Government','Airport / Port','Private Security','Critical Infrastructure','Research / Academia','Other'].map(opt=>(
                          <button type="button" key={opt} className={`radio-btn${form.orgType===opt?' sel':''}`} onClick={()=>set('orgType',opt)}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>LOCATION / REGION</div>
                      <input className="inp" placeholder="e.g. Jammu, Punjab, Mumbai" value={form.location} onChange={e=>set('location',e.target.value)}/>
                    </div>
                  </div>
                </div>

                {/* ── SECTION 3: Use case ── */}
                <div style={{paddingBottom:24,borderBottom:`1px solid ${BR}`}}>
                  <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:16}}>YOUR REQUIREMENT</div>
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:10}}>PRIMARY USE CASE</div>
                      <div className="radio-group">
                        {['Border Security','Critical Infrastructure','Airport Security','VVIP Protection','Event Security','Research & Evaluation','Other'].map(opt=>(
                          <button type="button" key={opt} className={`radio-btn${form.useCase===opt?' sel':''}`} onClick={()=>set('useCase',opt)}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:10}}>PROCUREMENT TIMELINE</div>
                      <div className="radio-group">
                        {['Immediate (< 3 months)','Short-term (3–6 months)','Mid-term (6–12 months)','Long-term (1+ year)','Exploring / Research only'].map(opt=>(
                          <button type="button" key={opt} className={`radio-btn${form.timeline===opt?' sel':''}`} onClick={()=>set('timeline',opt)}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="lbl" style={{fontSize:9,color:DIM,marginBottom:6}}>ADDITIONAL DETAILS</div>
                      <textarea className="inp" rows={4}
                        placeholder="Describe your specific requirement, deployment environment, scale, or any questions you have for us..."
                        value={form.message} onChange={e=>set('message',e.target.value)}
                        style={{resize:'vertical'}}
                      />
                    </div>
                  </div>
                </div>

                {/* error */}
                {error && (
                  <div style={{padding:'12px 16px',border:`1px solid rgba(255,80,80,0.3)`,background:'rgba(255,80,80,0.06)',color:'#FF8888',fontFamily:"'Rajdhani',sans-serif",fontSize:12,letterSpacing:'.1em'}}>
                    {error}
                  </div>
                )}

                {/* submit */}
                <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
                  <button type="submit" className="ba" disabled={submitting} style={{fontSize:13}}>
                    {submitting ? 'SUBMITTING...' : 'REQUEST DEMONSTRATION →'}
                  </button>
                  <a href="/" className="bo" style={{fontSize:12,padding:'13px 20px'}}>BACK</a>
                </div>

                <p style={{fontSize:12,color:DIM,fontWeight:300,lineHeight:1.6}}>
                  Your information is kept strictly confidential and used only to schedule your demonstration.
                </p>

              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
