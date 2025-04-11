import Link from "next/link";

import ProductsCarousel from "./carousel";

const ProductsFeatured = () => {
  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <Link href="/products" className="btn btn--rounded btn--border">
            Show All
          </Link>
        </header>

        <ProductsCarousel />
      </div>
    </section>
  );
};

export default ProductsFeatured;
