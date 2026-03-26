"use client";

import { useEffect, useState } from "react";

const A = "#FF8800";
const B2 = "#0A0C12";
const W = "#FFFFFF";
const DIM = "#687585";
const BR = "rgba(255,255,255,0.08)";

const homeLinks = [
  ["#about", "ABOUT"],
  ["#prototype", "PROTOTYPE"],
  ["#recognition", "RECOGNITION"],
  ["/team", "TEAM"],
  ["/careers", "CAREERS"],
  ["#contact", "CONTACT"],
];

const innerLinks = [
  ["/#about", "ABOUT"],
  ["/#prototype", "PROTOTYPE"],
  ["/#recognition", "RECOGNITION"],
  ["/team", "TEAM"],
  ["/careers", "CAREERS"],
  ["/#contact", "CONTACT"],
];

export default function SiteNav({ isHome = false, scrollThreshold = 20 }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [isHome]);

  const links = isHome ? homeLinks : innerLinks;
  const isScrolled = scrollY > scrollThreshold;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: isScrolled ? "rgba(5,5,8,0.96)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${isScrolled ? BR : "transparent"}`,
        transition: "all .35s",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 28px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <a
          href={isHome ? "#" : "/"}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
        >
          <img
            src="/images/garudakshak.png"
            alt=""
            style={{ width: 34, height: 34, objectFit: "contain" }}
            onError={(e) => (e.target.style.display = "none")}
          />
          <div>
            <div className="hd" style={{ fontWeight: 900, fontSize: 18, letterSpacing: ".1em", color: W }}>
              GARUDAKSHAK
            </div>
            <div className="lbl" style={{ fontSize: 8, color: A, marginTop: 1 }}>
              SECURING SKIES, DEFENDING HORIZONS
            </div>
          </div>
        </a>

        <div className="desk" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {links.map(([href, label]) => (
            <a key={label} href={href} className="nl">
              {label}
            </a>
          ))}
        </div>

        <a href="/demo" className="ba desk" style={{ padding: "10px 24px", fontSize: 12 }}>
          GET DEMO
        </a>

        <button
          className="mob-tog"
          style={{
            display: "none",
            background: "none",
            border: `1px solid ${BR}`,
            padding: "7px 11px",
            color: W,
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M0 1H18M0 6H18M0 11H18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: B2,
            borderTop: `1px solid ${BR}`,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {links.map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="nl"
              style={{ fontSize: 15 }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a href="/demo" className="ba" style={{ width: "fit-content" }} onClick={() => setMenuOpen(false)}>
            GET DEMO
          </a>
        </div>
      )}
    </nav>
  );
}
