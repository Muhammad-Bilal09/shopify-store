import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/Main";
import type { RootState } from "@/store";
import { removeFromWishlist, WishlistProduct } from "@/store/reducers/user";
import { addProduct } from "@/store/reducers/cart";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state: RootState) => state.user?.wishlistProducts ?? []);

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist({ id }));
  };

  const handleAddToCart = (item: WishlistProduct) => {
    dispatch(
      addProduct({
        count: 1,
        product: {
          id: item.id,
          name: item.title,
          thumb: item.image,
          price: parseFloat(item.price),
          count: 1,
          color: "",
          size: "",
          variantId: item.id,
        },
      })
    );
  };

  return (
    <Layout>
      <section style={{
        padding: "120px 0 80px",
        backgroundColor: "var(--color-cream)",
        minHeight: "100vh"
      }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 20px" }}>

          {/* Page Header */}
          <div style={{ marginBottom: "50px", textAlign: "center" }}>
            <h1 style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "38px",
              fontWeight: 800,
              color: "var(--color-black)",
              marginBottom: "10px"
            }}>
              My Wishlist
            </h1>
            <p style={{ color: "var(--color-text)", fontSize: "15px" }}>
              {wishlistProducts.length > 0
                ? `You have ${wishlistProducts.length} item${wishlistProducts.length > 1 ? "s" : ""} saved to your wishlist.`
                : "Your wishlist is empty."}
            </p>
          </div>

          {/* Empty State */}
          {wishlistProducts.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "80px 20px",
              backgroundColor: "#fff",
              borderRadius: "24px",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ fontSize: "70px", marginBottom: "20px" }}>🤍</div>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "26px",
                fontWeight: 800,
                color: "var(--color-black)",
                marginBottom: "14px"
              }}>
                Your wishlist is empty
              </h3>
              <p style={{ color: "var(--color-text)", fontSize: "15px", lineHeight: 1.6, marginBottom: "35px" }}>
                Browse our products and click the <strong>♥</strong> heart icon to save items you love.
              </p>
              <Link href="/products">
                <button style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#fff",
                  padding: "14px 40px",
                  borderRadius: "30px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif",
                  boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
                  transition: "var(--transition-smooth)"
                }}>
                  Browse Products
                </button>
              </Link>
            </div>
          )}

          {/* Wishlist Grid */}
          {wishlistProducts.length > 0 && (
            <>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "28px",
                marginBottom: "40px"
              }}>
                {wishlistProducts.map((item) => (
                  <div key={item.id} style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "var(--transition-smooth)",
                    position: "relative"
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      title="Remove from wishlist"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "rgba(255,255,255,0.95)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "15px",
                        zIndex: 10,
                        color: "#e53935",
                        transition: "var(--transition-smooth)"
                      }}
                    >
                      ✕
                    </button>

                    {/* Product Image */}
                    <Link href={item.productPath} style={{ display: "block" }}>
                      <div style={{
                        height: "230px",
                        backgroundColor: "#F7FAF6",
                        overflow: "hidden"
                      }}>
                        <img
                          src={item.image || "/placeholder.jpg"}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            transition: "transform 0.4s ease"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <Link href={item.productPath} style={{ textDecoration: "none" }}>
                          <h3 style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--color-black)",
                            marginBottom: "6px",
                            lineHeight: 1.4
                          }}>
                            {item.title}
                          </h3>
                        </Link>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                          <span style={{ color: "#FF8F00", fontSize: "13px" }}>★★★★★</span>
                          <span style={{ fontSize: "11px", color: "var(--color-text)" }}>(4.8)</span>
                        </div>
                        <p style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: "var(--color-primary)",
                          margin: "0 0 14px"
                        }}>
                          ${item.price}
                        </p>
                      </div>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleAddToCart(item)}
                          style={{
                            flex: 1,
                            backgroundColor: "var(--color-primary)",
                            color: "#fff",
                            padding: "11px 0",
                            border: "none",
                            borderRadius: "30px",
                            fontWeight: 700,
                            fontSize: "13px",
                            cursor: "pointer",
                            fontFamily: "'Manrope', sans-serif",
                            transition: "var(--transition-smooth)",
                            boxShadow: "0 3px 10px rgba(46, 125, 50, 0.2)"
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-secondary)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary)"; }}
                        >
                          🛒 Add to Cart
                        </button>
                        <Link href={item.productPath}>
                          <button style={{
                            padding: "11px 16px",
                            border: "1px solid var(--color-border)",
                            borderRadius: "30px",
                            backgroundColor: "#fff",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            color: "var(--color-black)",
                            fontFamily: "'Manrope', sans-serif",
                            transition: "var(--transition-smooth)"
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-black)"; }}
                          >
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div style={{ textAlign: "center" }}>
                <Link href="/products">
                  <button style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    padding: "13px 40px",
                    borderRadius: "30px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "'Manrope', sans-serif",
                    transition: "var(--transition-smooth)"
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-primary)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-primary)"; }}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WishlistPage;
