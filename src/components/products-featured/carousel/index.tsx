import { gql, useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../../product-item";

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

  const products =
    data?.products?.edges?.map(({ node: product }: any) => ({
      id: product.id.split("/").pop(),
      name: product.title,
      price: Number(product.variants.edges[0]?.node.price.amount) || 0,
      currentPrice: Number(product.variants.edges[0]?.node.price.amount) || 0,
      color: "Default",
      images: product.images.edges.map((img: any) => img.node.src),
    })) || [];

  return (
    <div className="products-carousel-wrapper">
      <Swiper
        spaceBetween={16}
        slidesPerView={1.3}
        centeredSlides={false}
        loop={false}
        watchOverflow
        className="products-swiper"
        breakpoints={{
          480: {
            slidesPerView: 2.2,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 28,
            centeredSlides: false,
          },
        }}
      >
        {products?.map((item: any) => (
          <SwiperSlide key={item.id} className="product-swiper-slide">
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
    </div>
  );
};

export default ProductsCarousel;
