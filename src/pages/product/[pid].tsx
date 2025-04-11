import type { GetServerSideProps } from "next";
import { useState } from "react";

import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Content from "@/components/product-single/content";
import Description from "@/components/product-single/description";
import Gallery from "@/components/product-single/gallery";
import ProductsFeatured from "@/components/products-featured";
import Layout from "../../layouts/Main";
import { server } from "../../utils/server";
import { ProductContentProps } from "@/types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { pid } = query;

  try {
    const res = await fetch(`${server}/api/product/${pid}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const product = await res.json();

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};

const Product = ({ product }: ProductContentProps) => {
  const [showBlock, setShowBlock] = useState("description");

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${showBlock === "description" ? "btn--active" : ""}`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${showBlock === "reviews" ? "btn--active" : ""}`}
              >
                Reviews
              </button>
            </div>

            <Description show={showBlock === "description"} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
