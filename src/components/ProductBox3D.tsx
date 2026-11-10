"use client";

interface ProductBox3DProps {
  title: string;
  subtitle?: string;
  variant?: "capcut" | "photoshop" | "premiere" | "sound-effects";
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
    photoshop: {
      primary: "#101D3A",
      accent: "#31A8FF",
      spineColor: "#091329",
      icon: "fa-image",
      logoText: "Photoshop",
      edition: "CREATIVE TOOLS",
    },
    premiere: {
      primary: "#21153F",
      accent: "#9999FF",
      spineColor: "#160E2B",
      icon: "fa-film",
      logoText: "Premiere Pro",
      edition: "VIDEO EDITING",
    },
    "sound-effects": {
      primary: "#30200E",
      accent: "#F86011",
      spineColor: "#201408",
      icon: "fa-music",
      logoText: "SFX",
      edition: "SOUND EFFECTS",
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
                <i className={`fa-solid ${theme.icon}`}></i>
                <span>{theme.logoText}</span>
              </div>
              <span className="box3d-auth-pill">CRÉATIF</span>
            </div>

            {/* Center Visual Art */}
            <div className="box3d-center">
              <div className="box3d-orb">
                <i className={`fa-solid ${theme.icon}`}></i>
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
