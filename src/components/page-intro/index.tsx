import { useQuery, gql } from "@apollo/client";
import client from "@/lib/apolloClient";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

SwiperCore.use([EffectFade, Navigation]);

const GET_SLIDER_DATA = gql`
  query {
    sliderItem {
      items {
        title
        image {
          url
        }
        link
      }
    }
    sliderItem2 {
      items {
        title
        image {
          url
        }
        link
      }
    }
  }
`;

const PageIntro = () => {
  const { loading, error, data } = useQuery(GET_SLIDER_DATA, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading slider data: {error.message}</p>;

  const sliderItems = data.sliderItemCollection.items;
  const sliderItems2 = data.sliderItem2Collection.items;

  // Combine both collections if needed
  const allSliderItems = [...sliderItems, ...sliderItems2];

  return (
    <section className="page-intro">
      <Swiper navigation effect="fade" className="swiper-wrapper">
        {allSliderItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="page-intro__slide"
              style={{ backgroundImage: `url(${item.image.url})` }}
            >
              <div className="container">
                <div className="page-intro__slide__content">
                  <h2>{item.title}</h2>
                  <a href={item.link} className="btn-shop">
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

// import SwiperCore, { EffectFade, Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// const PageIntro = () => {
//   SwiperCore.use([EffectFade, Navigation]);

//   return (
//     <section className="page-intro">
//       <Swiper navigation effect="fade" className="swiper-wrapper">
//         <SwiperSlide>
//           <div
//             className="page-intro__slide"
//             style={{ backgroundImage: "url('/images/slide-1.jpg')" }}
//           >
//             <div className="container">
//               <div className="page-intro__slide__content">
//                 <h2>Sale of the summer collection</h2>
//                 <a href="#" className="btn-shop">
//                   <i className="icon-right" />
//                   Shop now
//                 </a>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         <SwiperSlide>
//           <div
//             className="page-intro__slide"
//             style={{ backgroundImage: "url('/images/slide-2.jpg')" }}
//           >
//             <div className="container">
//               <div className="page-intro__slide__content">
//                 <h2>Make your house into a home</h2>
//                 <a href="#" className="btn-shop">
//                   <i className="icon-right" />
//                   Shop now
//                 </a>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>

//       <div className="shop-data">
//         <div className="container">
//           <ul className="shop-data__items">
//             <li>
//               <i className="icon-shipping" />
//               <div className="data-item__content">
//                 <h4>Free Shipping</h4>
//                 <p>On purchases over $199</p>
//               </div>
//             </li>

//             <li>
//               <i className="icon-shipping" />
//               <div className="data-item__content">
//                 <h4>99% Satisfied Customers</h4>
//                 <p>Our clients' opinions speak for themselves</p>
//               </div>
//             </li>

//             <li>
//               <i className="icon-cash" />
//               <div className="data-item__content">
//                 <h4>Originality Guaranteed</h4>
//                 <p>30 days warranty for each product from our store</p>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PageIntro;
