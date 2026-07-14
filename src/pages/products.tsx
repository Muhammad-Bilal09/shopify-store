import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import Layout from "../layouts/Main";
import Header from "@/components/header";

const Products = () => {
  const router = useRouter();
  const { category } = router.query;

  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (category) {
      setSelectedCollection(category as string);
    } else {
      setSelectedCollection(null);
    }
  }, [category]);

  const handleSelectCollection = (collection: string | null) => {
    setSelectedCollection(collection);
    if (collection) {
      router.push(
        {
          pathname: "/products",
          query: { category: collection },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push({ pathname: "/products" }, undefined, { shallow: true });
    }
  };

  return (
    <Layout>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            selectedCollection={selectedCollection}
            onSelectCollection={handleSelectCollection}
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
