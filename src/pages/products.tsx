import { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import Layout from "../layouts/Main";
import Header from "@/components/header";

const Products = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            selectedCollection={selectedCollection}
            onSelectCollection={setSelectedCollection}
          />
          <ProductsContent
            selectedCollection={selectedCollection}
            searchTerm={searchTerm}
          />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;
