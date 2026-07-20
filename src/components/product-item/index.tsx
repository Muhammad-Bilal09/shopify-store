import { some } from "lodash";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { toggleWishlistProduct } from "@/store/reducers/user";
import type { ProductTypeList } from "@/types";

const formatPrice = (value?: number | string) => {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }

  const numericValue =
    typeof value === "number" && Number.isFinite(value)
      ? value
      : typeof value === "string" &&
          value.trim() !== "" &&
          !Number.isNaN(Number(value))
        ? Number(value)
        : NaN;

  if (!Number.isNaN(numericValue)) {
    return Math.floor(numericValue) === numericValue
      ? numericValue.toString()
      : numericValue.toFixed(2);
  }

  return value.toString();
};

const renderPrice = (value?: number | string) => {
  const formatted = formatPrice(value);
  return formatted === "N/A" ? "N/A" : `Rs ${formatted}`;
};

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
          <h4>{renderPrice(currentPrice)}</h4>

          {discount && <span>{renderPrice(price)}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
