import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

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
        }
      }
    }
  }
`;

const ProductsContent = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        Failed to load products
      </div>
    );
  }

  if (loading) return <ProductsLoading />;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.products.edges.map(({ node: product }: any) => {
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
  );
};

export default ProductsContent;

// import { gql, useQuery } from "@apollo/client";
// import ProductItem from "../../product-item";
// import ProductsLoading from "./loading";
// import Link from "next/link";

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
//   console.log(data, "product list");

//   if (error)
//     return (
//       <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
//         Failed to load products
//       </div>
//     );
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
//           <Link key={product.id} href={`/product/${productId}`} passHref>
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

// import { gql, useQuery } from "@apollo/client";
// import ProductItem from "../../product-item";
// import ProductsLoading from "./loading";

// // GraphQL query to fetch products
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

//   if (error) return <div>Failed to load products</div>;
//   if (loading) return <ProductsLoading />;

//   return (
//     <section className="products-list">
//       {data.products.edges.map(({ node: product }: any) => (
//         <ProductItem
//           key={product.id}
//           id={product.id}
//           name={product.title}
//           images={product.images.edges.map((img: any) => img.node.src)}
//           currentPrice={product.variants.edges[0]?.node.price.amount || "N/A"}
//           price={product.variants.edges[0]?.node.price.amount || "N/A"}
//           color="Default"
//         />
//       ))}
//     </section>
//   );
// };

// export default ProductsContent;
