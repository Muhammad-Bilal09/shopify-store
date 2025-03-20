import { ProductType } from "@/types";
import Punctuation from "./punctuation";
import ReviewsList from "./reviews-list";

type ReviewsProductType = {
  show: boolean;
  product: ProductType;
};
const Reviews = ({ show, product }: ReviewsProductType) => {
  const style = {
    display: show ? "flex" : "none",
  };

  if (!product?.punctuation) {
    return <div>No reviews available</div>; // Fallback if punctuation is missing
  }

  return (
    <section style={style} className="product-single__reviews">
      <Punctuation
        punctuation={product.punctuation.punctuation}
        countOpinions={product.punctuation.countOpinions}
        votes={product.punctuation.votes}
      />
      <ReviewsList reviews={product.reviews || []} />{" "}
      {/* Ensure reviews is not undefined */}
    </section>
  );
};

export default Reviews;

// import type { ProductType } from "@/types";

// import Punctuation from "./punctuation";
// import ReviewsList from "./reviews-list";

// type ReviewsProductType = {
//   show: boolean;
//   product: ProductType;
// };

// const Reviews = ({ show, product }: ReviewsProductType) => {
//   const style = {
//     display: show ? "flex" : "none",
//   };

//   return (
//     <section style={style} className="product-single__reviews">
//       <Punctuation
//         punctuation={product.punctuation.punctuation}
//         countOpinions={product.punctuation.countOpinions}
//         votes={product.punctuation.votes}
//       />
//       <ReviewsList reviews={product.reviews} />
//     </section>
//   );
// };

// export default Reviews;
