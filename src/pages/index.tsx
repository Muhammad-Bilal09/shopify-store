import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";
import ProductsFeatured from "@/components/products-featured";
import Subscribe from "@/components/subscribe";
import Layout from "../layouts/Main";
import { ContentfulResponseIndex, FeaturedItem } from "@/types";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

const GET_FEATURED_DATA = `
  query {
    moredetailsCollection {
      items {
        title
        image {
          url
        }
        buttontext
      }
    }
    viewallCollection {
      items {
        title
        image {
          url
        }
        buttontext
        price
      }
    }
      showcollectionCollection {
      items {
        title
        image {
          url
        }
        buttontext
      }
    }
    shippingCollection {
      items {
        title
        description
      }
    }
    paymentCollection {
      items {
        title
        description
      }
    }
    guaranteeCollection {
      items {
        title
        description
      }
    }
      assetsCollection {
      items {
        title
        description
      }
    } 
  }
`;

const IndexPage = () => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [infoItems, setInfoItems] = useState<FeaturedItem[]>([]);
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
            body: JSON.stringify({ query: GET_FEATURED_DATA }),
          }
        );

        const json: ContentfulResponseIndex = await response.json();

        if (json.errors) {
          throw new Error(json.errors.map((err) => err.message).join(", "));
        }

        const moreDetails = json.data.moredetailsCollection?.items || [];
        const viewAll = json.data.viewallCollection?.items || [];
        const showCollection = json.data.showcollectionCollection?.items || [];
        const featuredItems = [...moreDetails, ...viewAll, ...showCollection];

        const shipping = json.data.shippingCollection?.items || [];
        const payment = json.data.paymentCollection?.items || [];
        const guarantee = json.data.guaranteeCollection?.items || [];
        const quality = json.data.assetsCollection?.items || [];
        const infoItems = [...shipping, ...payment, ...guarantee, ...quality];

        setFeaturedItems(featuredItems);
        setInfoItems(infoItems);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading featured data: {error}</p>;

  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          {featuredItems.map((item, index) => (
            <article
              key={index}
              style={{ backgroundImage: `url(${item.image?.url})` }}
              className={`featured-item ${
                index === 0
                  ? "featured-item-large"
                  : index === 1
                    ? "featured-item-small-first"
                    : "featured-item-small"
              }`}
            >
              <div className="featured-item__content">
                <h3>{item.title}</h3>
                {item.buttontext && (
                  <a href="#" className="btn btn--rounded">
                    {item.buttontext}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Why should you choose us?</h4>
          </header>

          <ul className="shop-data-items">
            {infoItems.map((item, index) => (
              <li key={index}>
                <i
                  className={`icon-${index === 0 ? "shipping" : index === 1 ? "payment" : index === 2 ? "cash" : "materials"}`}
                />
                <div className="data-item__content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
