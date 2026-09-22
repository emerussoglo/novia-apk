import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Partie supérieure : Grille des liens */}
        <div className="footer-top">
          {/* Colonne Marque / Présentation */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-logo">
              <div className="brand-icon-box">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <span className="brand-name">Prime Digital</span>
            </Link>
            <p className="footer-brand-desc">
              Des outils premium pour créer, monter et développer tes contenus.
            </p>
            <a className="footer-contact" href="tel:0157234689">
              <i className="fa-solid fa-phone"></i> 01 57 23 46 89
            </a>
          </div>

          {/* Colonne 1 : Navigation */}
          <div className="footer-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="#produits">Produits</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 2 : Produits */}
          <div className="footer-col">
            <h4 className="footer-title">Produits</h4>
            <ul className="footer-links">
              <li>
                <Link href="/produits">CapCut Pro</Link>
              </li>
              <li>
                <Link href="/produits">MovieBox Pro</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Légal */}
          <div className="footer-col">
            <h4 className="footer-title">Légal</h4>
            <ul className="footer-links">
              <li>
                <Link href="/confidentialite">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-de-vente">Conditions de vente</Link>
              </li>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separateur */}
        <div className="footer-divider"></div>

        {/* Partie inférieure : Copyright & Réassurance */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 2026 Prime Digital. Tous droits réservés.
          </p>

          <div className="footer-trust-badges">
            <div className="trust-item">
              <i className="fa-solid fa-lock"></i>
              <span>Paiement sécurisé</span>
            </div>
            <div className="trust-item">
              <i className="fa-solid fa-headset"></i>
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
