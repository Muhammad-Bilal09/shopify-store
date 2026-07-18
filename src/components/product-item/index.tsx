import { some } from "lodash";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { toggleWishlistProduct } from "@/store/reducers/user";
import type { ProductTypeList } from "@/types";

const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
}: ProductTypeList) => {
  const dispatch = useDispatch();
  const { favProducts } = useSelector((state: RootState) => state.user);

  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleWishlistProduct({
        product: {
          id,
          title: name,
          image: images ? images[0] : "",
          price: currentPrice?.toString() || "0",
          productPath: `/product/${id}`,
        },
      }),
    );
  };

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFav();
          }}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart" />
        </button>

        <Link href={`/product/${id}`}>
          <img src={images ? images[0] : ""} alt="product" />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>
      <div className="product__description">
        <h3>{name}</h3>
        <div
          className="product__rating"
          style={{
            display: "flex",
            gap: "2px",
            margin: "4px 0 8px 0",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#FF8F00", fontSize: "14px" }}>★★★★★</span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--color-text)",
              marginLeft: "4px",
            }}
          >
            (4.8)
          </span>
        </div>
        <div
          className={`product__price ${discount ? "product__price--discount" : ""}`}
        >
          <h4>
            Rs{" "}
            {Math.floor(parseFloat(currentPrice)) === parseFloat(currentPrice)
              ? parseFloat(currentPrice)
              : parseFloat(currentPrice).toFixed(2)}
          </h4>

          {discount && (
            <span>
              Rs{" "}
              {Math.floor(parseFloat(price)) === parseFloat(price)
                ? parseFloat(price)
                : parseFloat(price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
