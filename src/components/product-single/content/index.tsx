import { some } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { addProduct } from "@/store/reducers/cart";
import { toggleWishlistProduct } from "@/store/reducers/user";
import { ProductContentProps } from "@/types";

const Content = ({ product }: ProductContentProps) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const toggleFav = () => {
    dispatch(
      toggleWishlistProduct({
        product: {
          id: product.id,
          title: product.title,
          image: product.images?.edges?.[0]?.node?.src || "/placeholder.jpg",
          price: product.variants?.edges?.[0]?.node?.price?.amount || "0",
          productPath: `/product/${product.id.split("/").pop()}`,
        },
      }),
    );
  };

  const imageSrc = product.images?.edges?.[0]?.node?.src || "/placeholder.jpg";
  const price = product.variants?.edges?.[0]?.node?.price?.amount || "0";
  const variantId = product.variants?.edges?.[0]?.node?.id || "";
  const allVariants = product.variants?.edges || [];

  const addToCart = () => {
    const productToSave = {
      id: product.id,
      name: product.title,
      thumb: imageSrc,
      price: parseFloat(price),
      count,
      color: "",
      size: "",
      variantId,
    };
    dispatch(addProduct({ count, product: productToSave }));
  };

  // Product tags / type for beauty context
  const productType = product.productType || "";
  const tags: string[] = product.tags || [];

  // Attempt to find any variant-specific size labels (e.g. 30ml, 50ml, 100ml)
  const hasVariants = allVariants.length > 1;

  return (
    <section className="product-content" style={{ padding: "10px 0" }}>
      <div className="product-content__intro">
        {/* Badges */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            100% Natural
          </span>
          {productType && (
            <span
              style={{
                border: "1px solid var(--color-primary)",
                color: "var(--color-primary)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              {productType}
            </span>
          )}
          <span
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
            }}
          >
            SKU: {product.id.slice(-6)}
          </span>
        </div>

        {/* Title */}
        <h2
          className="product__name"
          style={{
            fontSize: "30px",
            fontWeight: 800,
            color: "var(--color-black)",
            marginBottom: "14px",
            fontFamily: "'Manrope', sans-serif",
            lineHeight: 1.25,
          }}
        >
          {product.title}
        </h2>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <span style={{ color: "#FF8F00", fontSize: "15px" }}>★★★★★</span>
          <span
            style={{
              fontSize: "13px",
              color: "var(--color-text)",
              marginLeft: "6px",
            }}
          >
            4.8 / 5.0 — 124 reviews
          </span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: "22px" }}>
          <h4
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "var(--color-primary)",
              margin: 0,
            }}
          >
            Rs{" "}
            {Math.floor(parseFloat(price)) === parseFloat(price)
              ? parseFloat(price)
              : parseFloat(price).toFixed(2)}
          </h4>
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-text)",
              marginTop: "4px",
            }}
          >
            Inclusive of all taxes
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "24px",
        }}
      >
        {/* Variant / Size Selector — only shown if Shopify has multiple variants */}
        {hasVariants && (
          <div style={{ marginBottom: "22px" }}>
            <h5
              style={{
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "var(--color-black)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Select Size / Volume
            </h5>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {allVariants.map(({ node }: any, idx: number) => (
                <button
                  key={node.id}
                  type="button"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "30px",
                    border:
                      idx === 0
                        ? "2px solid var(--color-primary)"
                        : "1px solid var(--color-border)",
                    backgroundColor:
                      idx === 0 ? "var(--color-mint-green)" : "#fff",
                    color:
                      idx === 0 ? "var(--color-primary)" : "var(--color-black)",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {node.title !== "Default Title"
                    ? node.title
                    : `${node.price?.amount ? `Rs ${Math.floor(parseFloat(node.price.amount)) === parseFloat(node.price.amount) ? parseFloat(node.price.amount) : parseFloat(node.price.amount).toFixed(2)}` : "Standard"}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags (e.g. skin type, use case) */}
        {tags.length > 0 && (
          <div style={{ marginBottom: "22px" }}>
            <h5
              style={{
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "var(--color-black)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Product Tags
            </h5>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-mint-green)",
                    color: "var(--color-primary)",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + Add to Cart */}
        <div style={{ marginBottom: "28px" }}>
          <h5
            style={{
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "12px",
              color: "var(--color-black)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Quantity
          </h5>
          <div
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Quantity stepper */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--color-border)",
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <button
                type="button"
                onClick={() => setCount(Math.max(1, count - 1))}
                style={{
                  width: "40px",
                  height: "42px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: "36px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                {count}
              </span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                style={{
                  width: "40px",
                  height: "42px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              type="submit"
              onClick={addToCart}
              className="btn btn--rounded btn--yellow"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                padding: "12px 36px",
                border: "none",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
                fontFamily: "'Manrope', sans-serif",
                flex: 1,
                minWidth: "160px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
              }}
            >
              🛒 Add to Cart
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "1px solid var(--color-border)",
                backgroundColor: isFavourite ? "var(--color-primary)" : "#fff",
                color: isFavourite ? "#fff" : "var(--color-black)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                transition: "var(--transition-smooth)",
                flexShrink: 0,
              }}
            >
              <i className="icon-heart" />
            </button>
          </div>
        </div>
      </div>

      {/* Beauty Trust Badges */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          paddingTop: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {[
          "🌿  100% Natural & Cruelty-Free",
          "✓  Dermatologically tested & approved",
          "✓  Free from parabens, sulfates & harmful chemicals",
          "🚚  Free delivery on orders above $35",
          "🔄  30-day hassle-free return policy",
        ].map((text, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--color-text)",
            }}
          >
            <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>
              {text.split("  ")[0]}
            </span>
            <span>{text.split("  ")[1]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Content;
