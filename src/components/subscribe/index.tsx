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

interface SubscribeItem {
  title: string;
  image: {
    url: string;
  };
}

interface ContentfulResponse {
  data: {
    subscribeCollection?: {
      items: SubscribeItem[];
    };
  };
  errors?: { message: string }[];
}

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

        const json: ContentfulResponse = await response.json();

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
    <section className="subscribe">
      <div className="container">
        <div
          style={{ backgroundImage: `url(${image.url})` }}
          className="subscribe__content"
        >
          <h4>{title}</h4>

          <form className="subscribe__form">
            <input type="email" placeholder="Email address" />
            <button type="submit" className="btn btn--rounded btn--yellow">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
