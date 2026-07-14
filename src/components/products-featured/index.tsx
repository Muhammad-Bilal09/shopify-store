import Link from "next/link";

import ProductsCarousel from "./carousel";

const ProductsFeatured = () => {
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          marginBottom: "40px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "20px"
          }}>
            <h3 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "32px",
              fontWeight: "800",
              color: "var(--color-black)",
              margin: 0
            }}>
              Selected just for you
            </h3>
            <Link href="/products" className="btn btn--rounded btn--border" style={{
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
              fontWeight: "700",
              padding: "10px 24px",
              borderRadius: "30px",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              transition: "var(--transition-smooth)"
            }}>
              Show All
            </Link>
          </div>
        </header>

        <ProductsCarousel />
      </div>
    </section>
  );
};

export default ProductsFeatured;
