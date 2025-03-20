import { useQuery, gql } from "@apollo/client";
import client from "@/lib/apolloClient";

const GET_SUBSCRIBE_CONTENT = gql`
  query {
    subscribe {
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
  const { loading, error, data } = useQuery(GET_SUBSCRIBE_CONTENT, { client });
  console.log(error);
  if (loading) return <p>Loading...</p>;
  if (error) {
    // console.error("Error loading content:", error);
    return <p style={{ textAlign: "center" }}>Error loading content.</p>;
  }

  if (
    !data ||
    !data.subscribe ||
    !data.subscribe.items ||
    data.subscribe.items.length === 0
  ) {
    return <p style={{ textAlign: "center" }}>No content available.</p>;
  }

  const { title, image } = data.subscribe.items[0];

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
// const Subscribe = () => {
//   return (
//     <section className="subscribe">
//       <div className="container">
//         <div
//           style={{ backgroundImage: "url(/images/subscribe.jpg)" }}
//           className="subscribe__content"
//         >
//           <h4>
//             Subscribe to our newsletter and receive exclusive offers every week
//           </h4>

//           <form className="subscribe__form">
//             <input type="email" placeholder="Email address" />
//             <button type="submit" className="btn btn--rounded btn--yellow">
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Subscribe;
