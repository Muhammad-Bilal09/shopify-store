import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { useState } from "react";

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

const ProductsContent = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        Failed to load products
      </div>
    );
  }

  if (loading) return <ProductsLoading />;

  const products = data.products.edges.map(({ node }: any) => node);

  const filteredProducts = selectedCollection
    ? products.filter((product: any) =>
        product.collections.edges.some(
          (collection: any) => collection.node.title === selectedCollection
        )
      )
    : products;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSelectedCollection(null)}>All</button>
        <button onClick={() => setSelectedCollection("sweatshirts")}>
          Sweatshirts
        </button>
        <button onClick={() => setSelectedCollection("tshirts")}>
          Tshirts
        </button>
        <button onClick={() => setSelectedCollection("dressshirts")}>
          Dress Shirts
        </button>
      </div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.map((product: any) => {
          const productId = product.id.split("/").pop();

          return (
            <Link
              key={product.id}
              href={{
                pathname: `/product/${productId}`,
                query: { product: JSON.stringify(product) }, // Pass product data as query
              }}
              passHref
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
          );
        })}
      </section>
    </div>
  );
};

export default ProductsContent;

// import { gql, useQuery } from "@apollo/client";
// import Link from "next/link";
// import ProductItem from "../../product-item";
// import ProductsLoading from "./loading";

// const GET_PRODUCTS = gql`
//   query GetProducts {
//     products(first: 10) {
//       edges {
//         node {
//           id
//           title
//           descriptionHtml
//           images(first: 1) {
//             edges {
//               node {
//                 src
//               }
//             }
//           }
//           variants(first: 10) {
//             edges {
//               node {
//                 id
//                 title
//                 price {
//                   amount
//                   currencyCode
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const ProductsContent = () => {
//   const { data, loading, error } = useQuery(GET_PRODUCTS);

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
//         Failed to load products
//       </div>
//     );
//   }

//   if (loading) return <ProductsLoading />;

//   return (
//     <section
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(3, 1fr)",
//         gap: "20px",
//         padding: "20px",
//       }}
//     >
//       {data.products.edges.map(({ node: product }: any) => {
//         const productId = product.id.split("/").pop();

//         return (
//           <Link
//             key={product.id}
//             href={{
//               pathname: `/product/${productId}`,
//               query: { product: JSON.stringify(product) }, // Pass product data as query
//             }}
//             passHref
//           >
//             <ProductItem
//               id={productId}
//               name={product.title}
//               images={product.images.edges.map((img: any) => img.node.src)}
//               currentPrice={
//                 product.variants.edges[0]?.node.price.amount || "N/A"
//               }
//               price={product.variants.edges[0]?.node.price.amount || "N/A"}
//               color="Default"
//             />
//           </Link>
//         );
//       })}
//     </section>
//   );
// };

// export default ProductsContent;
