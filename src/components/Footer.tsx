import Link from "next/link";

export default function Footer() {
  return (
    <footer className="exact-white-footer">
      <div className="exact-footer-container">
        <div className="exact-footer-grid">
          {/* Brand Col */}
          <div className="exact-footer-col">
            <span className="exact-footer-brand">NovaStudio</span>
            <p className="exact-footer-desc">
              Des outils numériques pour la création vidéo, image et audio.
            </p>
            <a
              href="https://wa.me/2290166935805"
              target="_blank"
              rel="noopener noreferrer"
              className="exact-footer-wa-link"
            >
              <i className="fa-brands fa-whatsapp"></i> +229 01 66 93 58 05
            </a>
          </div>

          {/* Links Col 1 */}
          <div className="exact-footer-col">
            <h4 className="exact-footer-heading">Produits</h4>
            <ul className="exact-footer-links">
              <li>
                <Link href="/produits/capcut-pro">CapCut Pro téléphone</Link>
              </li>
              <li>
                <Link href="/produits/capcut-pc">CapCut Pro ordinateur</Link>
              </li>
              <li>
                <Link href="/produits/photoshop">Adobe Photoshop</Link>
              </li>
              <li>
                <Link href="/produits/premiere-pro">Premiere Pro</Link>
              </li>
              <li>
                <Link href="/produits/sfx">Sound Effects (SFX)</Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="exact-footer-col">
            <h4 className="exact-footer-heading">Informations</h4>
            <ul className="exact-footer-links">
              <li>
                <Link href="/panier">Panier</Link>
              </li>
              <li>
                <Link href="/conditions-de-vente">Conditions Générales</Link>
              </li>
              <li>
                <Link href="/confidentialite">Politique de confidentialité</Link>
              </li>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="exact-footer-bottom">
          <p>© {new Date().getFullYear()} NovaStudio. Tous droits réservés.</p>
          <div className="exact-footer-methods">
            <span>MTN</span>
            <span>Moov</span>
            <span>Celtiis</span>
            <span>Wave</span>
            <span>Carte</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
