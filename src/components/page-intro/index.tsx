import { ContentfulResponse, SliderItem } from "@/types";
import { useEffect, useState } from "react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Autoplay, Pagination]);

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

  if (loading)
    return (
      <div className="banner-loading">
        <div className="banner-loading__inner" />
      </div>
    );
  if (error) return <p style={{ textAlign: "center", padding: "40px" }}>Error loading banner.</p>;

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section className="hero-banner">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="hero-swiper"
        >
          {sliderItems?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="hero-slide">
                {/* Image — shown first on mobile (order:1) */}
                <div className="hero-slide__img-col">
                  <div
                    className="hero-slide__img"
                    style={{ backgroundImage: `url(${item.image?.url})` }}
                    role="img"
                    aria-label={item.title}
                  />
                </div>

                {/* Text — shown second on mobile (order:2) */}
                <div className="hero-slide__text-col">
                  <h2 className="hero-slide__title">{item.title}</h2>
                  <p className="hero-slide__desc">
                    Discover premium organic fruits, pesticide-free greens &amp; wholesome pantry essentials harvested by local sustainable growers.
                  </p>
                  <div className="hero-slide__actions">
                    <a href="/products" className="hero-slide__btn-primary">
                      Shop Now →
                    </a>
                    <a href="/contact" className="hero-slide__btn-ghost">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Guarantees bar */}
      <div className="guarantees-bar">
        <div className="container">
          <ul className="guarantees-bar__list">
            <li className="guarantees-bar__item">
              <i className="icon-shipping guarantees-bar__icon" />
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>On purchases over $199</p>
              </div>
            </li>
            <li className="guarantees-bar__item">
              <i className="icon-payment guarantees-bar__icon" />
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our clients&apos; opinions speak for themselves</p>
              </div>
            </li>
            <li className="guarantees-bar__item">
              <i className="icon-cash guarantees-bar__icon" />
              <div className="data-item__content">
                <h4>Originality Guaranteed</h4>
                <p>30 days warranty for each product</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PageIntro;
