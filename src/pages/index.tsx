import { useQuery, gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import Footer from "@/components/footer";
import PageIntro from "@/components/page-intro";
import ProductsFeatured from "@/components/products-featured";
import Subscribe from "@/components/subscribe";
import Layout from "../layouts/Main";

const GET_FEATURED_DATA = gql`
  query {
    moredetailsCollection {
      items {
        title
        image {
          url
        }
        link
      }
    }
    viewallCollection {
      items {
        title
        image {
          url
        }
        link
      }
    }
    showcollectionCollection {
      items {
        title
        image {
          url
        }
        link
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
    qualityCollection {
      items {
        title
        description
      }
    }
  }
`;

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_FEATURED_DATA, { client });

  // Extract data for featured section
  const moreDetails = data?.moredetailsCollection?.items[0];
  const viewAll = data?.viewallCollection?.items[0];
  const showCollection = data?.showcollectionCollection?.items[0];

  // Extract data for second section
  const shipping = data?.shippingCollection?.items[0];
  const payment = data?.paymentCollection?.items[0];
  const guarantee = data?.guaranteeCollection?.items[0];
  const quality = data?.qualityCollection?.items[0];

  return (
    <Layout>
      <PageIntro />

      {/* Conditionally render the featured section */}
      {loading && <p>Loading featured data...</p>}
      {error && <p>Error loading featured data: {error.message}</p>}
      {!loading && !error && moreDetails && viewAll && showCollection && (
        <section className="featured">
          <div className="container">
            <article
              style={{ backgroundImage: `url(${showCollection.image.url})` }}
              className="featured-item featured-item-large"
            >
              <div className="featured-item__content">
                <h3>{showCollection.title}</h3>
                <a href={showCollection.link} className="btn btn--rounded">
                  Show Collection
                </a>
              </div>
            </article>

            <article
              style={{ backgroundImage: `url(${moreDetails.image.url})` }}
              className="featured-item featured-item-small-first"
            >
              <div className="featured-item__content">
                <h3>{moreDetails.title}</h3>
                <a href={moreDetails.link} className="btn btn--rounded">
                  More details
                </a>
              </div>
            </article>

            <article
              style={{ backgroundImage: `url(${viewAll.image.url})` }}
              className="featured-item featured-item-small"
            >
              <div className="featured-item__content">
                <h3>{viewAll.title}</h3>
                <a href={viewAll.link} className="btn btn--rounded">
                  VIEW ALL
                </a>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Conditionally render the second section */}
      {!loading && !error && shipping && payment && guarantee && quality && (
        <section className="section">
          <div className="container">
            <header className="section__intro">
              <h4>Why should you choose us?</h4>
            </header>

            <ul className="shop-data-items">
              <li>
                <i className="icon-shipping" />
                <div className="data-item__content">
                  <h4>{shipping.title}</h4>
                  <p>{shipping.description}</p>
                </div>
              </li>

              <li>
                <i className="icon-payment" />
                <div className="data-item__content">
                  <h4>{payment.title}</h4>
                  <p>{payment.description}</p>
                </div>
              </li>

              <li>
                <i className="icon-cash" />
                <div className="data-item__content">
                  <h4>{guarantee.title}</h4>
                  <p>{guarantee.description}</p>
                </div>
              </li>

              <li>
                <i className="icon-materials" />
                <div className="data-item__content">
                  <h4>{quality.title}</h4>
                  <p>{quality.description}</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Always render the rest of the components */}
      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;

// import Footer from "@/components/footer";
// import PageIntro from "@/components/page-intro";
// import ProductsFeatured from "@/components/products-featured";
// import Subscribe from "@/components/subscribe";

// import Layout from "../layouts/Main";

// const IndexPage = () => {
//   return (
//     <Layout>
//       <PageIntro />

//       <section className="featured">
//         <div className="container">
//           <article
//             style={{ backgroundImage: "url(/images/featured-1.jpg)" }}
//             className="featured-item featured-item-large"
//           >
//             <div className="featured-item__content">
//               <h3>New arrivals are now in!</h3>
//               <a href="#" className="btn btn--rounded">
//                 Show Collection
//               </a>
//             </div>
//           </article>

//           <article
//             style={{ backgroundImage: "url(/images/featured-2.jpg)" }}
//             className="featured-item featured-item-small-first"
//           >
//             <div className="featured-item__content">
//               <h3>Basic t-shirts $29,99</h3>
//               <a href="#" className="btn btn--rounded">
//                 More details
//               </a>
//             </div>
//           </article>

//           <article
//             style={{ backgroundImage: "url(/images/featured-3.jpg)" }}
//             className="featured-item featured-item-small"
//           >
//             <div className="featured-item__content">
//               <h3>Sale this summer</h3>
//               <a href="#" className="btn btn--rounded">
//                 VIEW ALL
//               </a>
//             </div>
//           </article>
//         </div>
//       </section>

//       <section className="section">
//         <div className="container">
//           <header className="section__intro">
//             <h4>Why should you choose us?</h4>
//           </header>

//           <ul className="shop-data-items">
//             <li>
//               <i className="icon-shipping" />
//               <div className="data-item__content">
//                 <h4>Free Shipping</h4>
//                 <p>
//                   All purchases over $199 are eligible for free shipping via
//                   USPS First Class Mail.
//                 </p>
//               </div>
//             </li>

//             <li>
//               <i className="icon-payment" />
//               <div className="data-item__content">
//                 <h4>Easy Payments</h4>
//                 <p>
//                   All payments are processed instantly over a secure payment
//                   protocol.
//                 </p>
//               </div>
//             </li>

//             <li>
//               <i className="icon-cash" />
//               <div className="data-item__content">
//                 <h4>Money-Back Guarantee</h4>
//                 <p>
//                   If an item arrived damaged or you've changed your mind, you
//                   can send it back for a full refund.
//                 </p>
//               </div>
//             </li>

//             <li>
//               <i className="icon-materials" />
//               <div className="data-item__content">
//                 <h4>Finest Quality</h4>
//                 <p>
//                   Designed to last, each of our products has been crafted with
//                   the finest materials.
//                 </p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <ProductsFeatured />
//       <Subscribe />
//       <Footer />
//     </Layout>
//   );
// };

// export default IndexPage;
