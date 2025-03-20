import { useState } from "react";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products-content";
import ProductsFilter from "@/components/products-filter";
import Layout from "../layouts/Main";

const Products = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  console.log("Selected Collection:", selectedCollection); // Debugging

  return (
    <Layout>
      <Breadcrumb />
      <section className="products-page">
        <div className="container">
          <ProductsFilter
            selectedCollection={selectedCollection}
            onSelectCollection={setSelectedCollection}
          />
          <ProductsContent selectedCollection={selectedCollection} />
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Products;

// import Breadcrumb from "@/components/breadcrumb";
// import Footer from "@/components/footer";
// import ProductsContent from "@/components/products-content";
// import ProductsFilter from "@/components/products-filter";

// import Layout from "../layouts/Main";

// const Products = () => (
//   <Layout>
//     <Breadcrumb />
//     <section className="products-page">
//       <div className="container">
//         <ProductsFilter />
//         <ProductsContent />
//       </div>
//     </section>
//     <Footer />
//   </Layout>
// );

// export default Products;
