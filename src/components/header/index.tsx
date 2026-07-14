import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/store";

import Logo from "../../assets/icons/logo";
import { HeaderType } from "@/types";

const Header = ({ isErrorPage, searchTerm, setSearchTerm }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { wishlistProducts = [] } = useSelector((state: RootState) => state.user);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(router.pathname) || isErrorPage)
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const searchRef = useRef<HTMLButtonElement>(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }
    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/products?category=Face Care", label: "Face Care" },
    { href: "/products?category=Serums", label: "Serums" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* ── MOBILE DRAWER OVERLAY ── */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? "mobile-nav-overlay--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── PREMIUM MOBILE DRAWER ── */}
      <aside className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`} aria-label="Mobile navigation">
        {/* Drawer header */}
        <div className="mobile-drawer__header">
          <div className="mobile-drawer__brand">
            <Logo />
          </div>
          <button
            className="mobile-drawer__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile search bar */}
        <div className="mobile-drawer__search">
          <i className="icon-search" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", color: "#aaa", zIndex: 1 }} />
          <input
            type="text"
            placeholder="Search products..."
            value={mobileSearch}
            onChange={(e) => {
              setMobileSearch(e.target.value);
              setSearchTerm?.(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              border: "1px solid #e5e7eb",
              borderRadius: "30px",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Nav links */}
        <nav className="mobile-drawer__nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`mobile-drawer__link ${router.pathname === link.href ? "mobile-drawer__link--active" : ""}`}
            >
              {link.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mobile-drawer__arrow">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Mobile icon actions: Search, Wishlist, Cart */}
        <div className="mobile-drawer__actions">
          <Link href="/wishlist" onClick={closeMenu} className="mobile-drawer__action-btn">
            <i className="icon-heart" />
            <span>Wishlist</span>
            {wishlistProducts.length > 0 && (
              <span className="mobile-drawer__action-badge">{wishlistProducts.length}</span>
            )}
          </Link>
          <Link href="/cart" onClick={closeMenu} className="mobile-drawer__action-btn">
            <i className="icon-cart" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="mobile-drawer__action-badge">{cartItems.length}</span>
            )}
          </Link>
        </div>

        {/* Drawer footer */}
        <div className="mobile-drawer__footer">
          <Link href="/login" onClick={closeMenu} className="mobile-drawer__cta">
            <i className="icon-avatar" />
            Sign In / Register
          </Link>
          <p className="mobile-drawer__tagline">🌿 100% Organic &amp; Farm Fresh</p>
        </div>
      </aside>

      {/* ── HEADER ── */}
      <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
        <div className="container">
          <Link href="/" className="site-header__logo-link">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="site-nav">
            <Link href="/products">Products</Link>
            <Link href="/products?category=Face Care">Face Care</Link>
            <Link href="/products?category=Serums">Serums</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>

          <div className="site-header__actions">
            {/* Search — desktop */}
            <button
              ref={searchRef}
              className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
            >
              <form className="search-form">
                <i
                  className="icon-cancel"
                  onClick={() => setSearchOpen(false)}
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm?.(e.target.value)}
                />
              </form>
              <i
                onClick={() => setSearchOpen(!searchOpen)}
                className="icon-search"
              />
            </button>

            {/* Wishlist — desktop only */}
            <Link href="/wishlist" legacyBehavior>
              <button className="btn-cart btn-cart--desktop" title="My Wishlist" style={{ position: "relative" }}>
                <i className="icon-heart" />
                {wishlistProducts.length > 0 && (
                  <span className="btn-cart__count">{wishlistProducts.length}</span>
                )}
              </button>
            </Link>

            {/* Cart — desktop only */}
            <Link href="/cart" legacyBehavior>
              <button className="btn-cart btn-cart--desktop">
                <i className="icon-cart" />
                {cartItems.length > 0 && (
                  <span className="btn-cart__count">{cartItems.length}</span>
                )}
              </button>
            </Link>

            {/* Avatar — desktop only */}
            <Link href="/login" legacyBehavior>
              <button className="site-header__btn-avatar">
                <i className="icon-avatar" />
              </button>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="site-header__btn-menu"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <i className={`btn-hamburger ${menuOpen ? "is-active" : ""}`}>
                <span />
              </i>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

Header.defaultProps = {
  isErrorPage: false,
  searchTerm: "",
  setSearchTerm: () => { },
};

export default Header;
