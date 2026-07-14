import { ContentfulResponseSubscribe, SubscribeItem } from "@/types";
import { useEffect, useState } from "react";

const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

const GET_SUBSCRIBE_CONTENT = `
  query {
    subscribeCollection {
      items {
        title
        image {
          url
        }
      }
    }
  }
`;

const Subscribe = () => {
  const [subscribeData, setSubscribeData] = useState<SubscribeItem | null>(
    null
  );
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
            body: JSON.stringify({ query: GET_SUBSCRIBE_CONTENT }),
          }
        );

        const json: ContentfulResponseSubscribe = await response.json();

        if (json.errors) {
          throw new Error(json.errors.map((err) => err.message).join(", "));
        }

        if (
          !json.data ||
          !json.data.subscribeCollection ||
          json.data.subscribeCollection.items.length === 0
        ) {
          throw new Error("No subscribe content available.");
        }

        setSubscribeData(json.data.subscribeCollection.items[0]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!subscribeData)
    return <p style={{ textAlign: "center" }}>No content available.</p>;

  const { title, image } = subscribeData;

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          {/* Left Column: Form Content */}
          <div className="newsletter-card__content">
            <h3 className="newsletter-card__title">{title}</h3>
            <p className="newsletter-card__text">
              Subscribe now to get 15% off your first order, plus farm fresh recipes, organic living tips, and weekly deals delivered straight to your inbox.
            </p>
            <form
              className="newsletter-card__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-card__input"
              />
              <button type="submit" className="newsletter-card__btn">
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Column: Image */}
          <div
            className="newsletter-card__image"
            style={{ backgroundImage: `url(${image.url})` }}
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
