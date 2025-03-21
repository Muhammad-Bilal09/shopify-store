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
  searchTerm, // Add searchTerm prop
}: {
  selectedCollection: string | null;
  searchTerm: string;
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

  const filteredProducts = products
    .filter((product: any) =>
      selectedCollection
        ? product.collections?.edges.some(
            (collection: any) =>
              collection.node.title.toLowerCase() ===
              selectedCollection.toLowerCase()
          )
        : true
    )
    .filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {filteredProducts.map((product: any) => {
        const productId = product.id.split("/").pop();

        return (
          <div
            key={product.id}
            style={{
              flex: "1 1 calc(25% - 20px)",
              maxWidth: "calc(35% - 20px)",
              minWidth: "200px",
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
                height: "100%",
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
