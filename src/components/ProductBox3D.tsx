"use client";

interface ProductBox3DProps {
  title: string;
  subtitle?: string;
  variant?: "capcut" | "moviebox" | "duo" | "spotify" | "duolingo" | "canva";
  badge?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProductBox3D({
  title,
  subtitle = "Licence Premium",
  variant = "capcut",
  badge = "4K ULTRA HD",
  size = "md",
}: ProductBox3DProps) {
  // Theme palette based on variant
  const themes = {
    capcut: {
      primary: "#0A2A1E",
      accent: "#00E599",
      spineColor: "#051A12",
      icon: "fa-film",
      logoText: "CapCut",
      edition: "PRO VERSION",
    },
    moviebox: {
      primary: "#0E1A38",
      accent: "#F86011",
      spineColor: "#080F22",
      icon: "fa-play",
      logoText: "MovieBox",
      edition: "VIP PASS",
    },
    duo: {
      primary: "#0A2A1E",
      accent: "#F86011",
      spineColor: "#061811",
      icon: "fa-layer-group",
      logoText: "Pack Créateur",
      edition: "ULTIMATE DUO",
    },
    spotify: {
      primary: "#0A2A1E",
      accent: "#1ED760",
      spineColor: "#05160E",
      icon: "fa-spotify",
      logoText: "Spotify",
      edition: "PREMIUM",
    },
    duolingo: {
      primary: "#143A2A",
      accent: "#58CC02",
      spineColor: "#0D251B",
      icon: "fa-language",
      logoText: "Duolingo",
      edition: "SUPER PASS",
    },
    canva: {
      primary: "#0B2533",
      accent: "#00C4CC",
      spineColor: "#061720",
      icon: "fa-wand-magic-sparkles",
      logoText: "Canva",
      edition: "PRO 1 AN",
    },
  };

  const theme = themes[variant] || themes.capcut;

  return (
    <div className={`box3d-stage size-${size}`}>
      <div className="box3d-wrapper">
        {/* Shadow underneath */}
        <div className="box3d-shadow"></div>

        {/* 3D Box structure */}
        <div
          className="box3d-container"
          style={
            {
              "--box-primary": theme.primary,
              "--box-accent": theme.accent,
              "--box-spine": theme.spineColor,
            } as React.CSSProperties
          }
        >
          {/* Spine (tranche gauche) */}
          <div className="box3d-spine">
            <span className="spine-logo">{theme.logoText}</span>
            <span className="spine-edition">{theme.edition}</span>
            <div className="spine-dots">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Front Face */}
          <div className="box3d-front">
            {/* Gloss reflection overlay */}
            <div className="box3d-gloss"></div>

            {/* Top brand header */}
            <div className="box3d-header">
              <div className="box3d-brand">
                <i
                  className={`fa-solid ${theme.icon === "fa-spotify" ? "fa-brands fa-spotify" : theme.icon}`}
                ></i>
                <span>{theme.logoText}</span>
              </div>
              <span className="box3d-auth-pill">OFFICIEL</span>
            </div>

            {/* Center Visual Art */}
            <div className="box3d-center">
              <div className="box3d-orb">
                <i
                  className={`fa-solid ${theme.icon === "fa-spotify" ? "fa-brands fa-spotify" : theme.icon}`}
                ></i>
              </div>
              <h4 className="box3d-title">{title}</h4>
              <p className="box3d-sub">{subtitle}</p>
            </div>

            {/* Bottom Footer Ribbon */}
            <div className="box3d-footer">
              <span className="box3d-badge">{badge}</span>
              <div className="box3d-chip">
                <i className="fa-solid fa-bolt"></i> Instant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
