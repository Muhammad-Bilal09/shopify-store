import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ProductItem from "../product-item";

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`;

const ProductsContent = ({
  selectedCollection,
}: {
  selectedCollection: string | null;
}) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        Failed to load products
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Loading products...
      </div>
    );
  }

  const products = data?.products?.edges?.map(({ node }: any) => node) || [];

  console.log("Products Data:", products); // Debugging

  // Log the collections for each product
  products.forEach((product: any) => {
    console.log(
      `Product: ${product.title}, Collections:`,
      product.collections?.edges
    );
  });

  const filteredProducts = selectedCollection
    ? products.filter((product: any) =>
        product.collections?.edges.some(
          (collection: any) =>
            collection.node.title.toLowerCase() ===
            selectedCollection.toLowerCase()
        )
      )
    : products;

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        No products found.
      </div>
    );
  }

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap", // Allow wrapping of items
        gap: "20px", // Space between items
        padding: "20px",
        maxWidth: "1400px", // Max width for larger screens
        margin: "0 auto",
        width: "100%", // Ensure full width
        boxSizing: "border-box", // Include padding in width calculation
      }}
    >
      {filteredProducts.map((product: any) => {
        const productId = product.id.split("/").pop();

        return (
          <div
            key={product.id}
            style={{
              flex: "1 1 calc(25% - 20px)", // 4 cards per row (25% width minus gap)
              maxWidth: "calc(35% - 20px)", // Ensure consistent width
              minWidth: "200px", // Minimum width for smaller screens
            }}
          >
            <Link
              href={{
                pathname: `/product/${productId}`,
                query: { product: JSON.stringify(product) },
              }}
              passHref
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                backgroundColor: "#fff",
                height: "100%", // Ensure the link takes full height
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <ProductItem
                id={productId}
                name={product.title}
                images={product.images.edges.map((img: any) => img.node.src)}
                currentPrice={
                  product.variants.edges[0]?.node.price.amount || "N/A"
                }
                price={product.variants.edges[0]?.node.price.amount || "N/A"}
                color="Default"
              />
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default ProductsContent;
// import { useState } from "react";

// import List from "./list";

// const ProductsContent = () => {
//   const [orderProductsOpen, setOrderProductsOpen] = useState(false);

//   return (
//     <section className="products-content">
//       <div className="products-content__intro">
//         <h2>
//           Men's Tops <span>(133)</span>
//         </h2>
//         <button
//           type="button"
//           onClick={() => setOrderProductsOpen(!orderProductsOpen)}
//           className="products-filter-btn"
//         >
//           <i className="icon-filters" />
//         </button>
//         <form
//           className={`products-content__filter ${orderProductsOpen ? "products-order-open" : ""}`}
//         >
//           <div className="products__filter__select">
//             <h4>Show products: </h4>
//             <div className="select-wrapper">
//               <select>
//                 <option>Popular</option>
//               </select>
//             </div>
//           </div>
//           <div className="products__filter__select">
//             <h4>Sort by: </h4>
//             <div className="select-wrapper">
//               <select>
//                 <option>Popular</option>
//               </select>
//             </div>
//           </div>
//         </form>
//       </div>

//       <List />
//     </section>
//   );
// };

// export default ProductsContent;
