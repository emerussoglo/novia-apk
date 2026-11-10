import { products } from "@/lib/products";

export default function ComparisonSection() {
  return (
    <section className="comparison-section-clean scroll-reveal" id="comparaison">
      <div className="comparison-container">
        <div className="section-header-center">
          <span className="section-badge-light">NOS OUTILS</span>
          <h2 className="section-title-dark">Choisissez votre outil créatif</h2>
        </div>
        <div className="comparison-products-grid">
          {products.map((product) => (
            <article key={product.id} className="comparison-product-card">
              <span>{product.deviceType}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price.toLocaleString("fr-FR")} FCFA</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
