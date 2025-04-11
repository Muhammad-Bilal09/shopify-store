import { ContentfulResponse, SliderItem } from "@/types";
import { useEffect, useState } from "react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([EffectFade, Navigation]);

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

const GET_SLIDER_DATA = `
  query {
    sliderItemCollection {
      items {
        title
        image {
          url
        }
      }
    }
    sliderItem2Collection {
      items {
        title
        image {
          url
        }
      }
    }
  }
`;

const PageIntro: React.FC = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query: GET_SLIDER_DATA }),
          }
        );

        const json: ContentfulResponse = await response.json();

        if (json.errors) {
          throw new Error(json.errors.map((err) => err.message).join(", "));
        }

        const slider1 = json.data.sliderItemCollection?.items || [];
        const slider2 = json.data.sliderItem2Collection?.items || [];
        setSliderItems([...slider1, ...slider2]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p>Error loading slider data: {error}</p>;

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        {sliderItems?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="page-intro__slide"
              style={{ backgroundImage: `url(${item.image.url})` }}
            >
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>{item.title}</h2>
                  <a href="#" className="btn-shop">
                    <i className="icon-right" />
                    Shop now
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>
            <li>
              <i className="icon-shipping" />
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients' opinions speak for themselves</p>
              </div>
            </li>
            <li>
              <i className="icon-cash" />
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product from our store</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageIntro;
