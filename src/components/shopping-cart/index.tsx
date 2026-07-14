import Link from "next/link";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";

import CheckoutStatus from "../checkout-status";
import Item from "./item";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems?.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th />
                </tr>

                {cartItems?.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table>
          )}

          {cartItems.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
              margin: "30px 0"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "20px",
                color: "var(--color-primary)"
              }}>
                🛒
              </div>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "24px",
                fontWeight: "800",
                color: "var(--color-black)",
                marginBottom: "10px"
              }}>
                Your cart is empty
              </h3>
              <p style={{
                color: "var(--color-text)",
                fontSize: "14px",
                marginBottom: "30px"
              }}>
                Looks like you haven't added any organic items to your cart yet.
              </p>
              <Link href="/products" className="btn btn--rounded btn--yellow" style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                padding: "12px 30px",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                borderRadius: "30px",
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)"
              }}>
                Explore Products
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-actions">
            <Link href="/products" className="cart__btn-back">
              <i className="icon-left" /> Continue Shopping
            </Link>
            <input
              type="text"
              placeholder="Promo Code"
              className="cart__promo-code"
            />

            <div className="cart-actions__items-wrapper">
              <p className="cart-actions__total">
                Total cost <strong>${priceTotal().toFixed(2)}</strong>
              </p>
              <Link
                href="/cart/checkout"
                className="btn btn--rounded btn--yellow"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
