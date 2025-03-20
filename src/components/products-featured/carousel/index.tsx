import { gql, useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../../product-item";
// import ProductsLoading from "./loading";

// GraphQL query to fetch products
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

const ProductsCarousel = () => {
  const { data, error } = useQuery(GET_PRODUCTS);

  if (error) return <div>Failed to load products</div>;
  // if (loading) return <ProductsLoading />;

  const products = data?.products?.edges?.map(({ node: product }: any) => ({
    id: product.id.split("/").pop(), // Extract numeric ID
    name: product.title,
    price: product.variants.edges[0]?.node.price.amount || "N/A",
    currentPrice: product.variants.edges[0]?.node.price.amount || "N/A",
    color: "Default",
    images: product.images.edges.map((img: any) => img.node.src),
  }));

  // Responsive settings for Swiper
  let slidesPerView = 1.3;
  let centeredSlides = true;
  let spaceBetween = 30;

  if (process.browser) {
    if (window.innerWidth > 768) {
      slidesPerView = 3;
      spaceBetween = 35;
      centeredSlides = false;
    }
    if (window.innerWidth > 1024) {
      slidesPerView = 4;
      spaceBetween = 65;
      centeredSlides = false;
    }
  }

  return (
    <Swiper
      spaceBetween={spaceBetween}
      loop
      centeredSlides={centeredSlides}
      watchOverflow
      slidesPerView={slidesPerView}
      className="swiper-wrapper"
    >
      {products?.map((item: any) => (
        <SwiperSlide key={item.id}>
          <ProductItem
            id={item.id}
            name={item.name}
            price={item.price}
            color={item.color}
            currentPrice={item.currentPrice}
            images={item.images}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsCarousel;
