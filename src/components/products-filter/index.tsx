import { gql, useQuery } from "@apollo/client";
import Slider from "rc-slider";
import { useState } from "react";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 50) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const ProductsFilter = ({
  selectedCollection,
  onSelectCollection,
}: {
  selectedCollection: string | null;
  onSelectCollection: (collection: string | null) => void;
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);

  const { data, loading } = useQuery(GET_COLLECTIONS);

  const collections =
    data?.collections?.edges?.map(({ node }: any) => node) || [];

  const handleCollectionChange = (collection: string | null) => {
    onSelectCollection(collection);
  };

  const btnStyle = (active: boolean) => ({
    backgroundColor: active ? "var(--color-primary)" : "transparent",
    color: active ? "#fff" : "var(--color-black)",
    padding: "9px 14px",
    border: active ? "none" : "1px solid var(--color-border)",
    borderRadius: "30px",
    cursor: "pointer",
    textAlign: "left" as const,
    fontSize: "13px",
    fontWeight: active ? 700 : 400,
    width: "100%",
    marginBottom: "6px",
    fontFamily: "'Manrope', sans-serif",
    transition: "all 0.2s ease",
  });

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Filter Products <i className="icon-down-open" />
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        {/* Product Category from Shopify */}
        <div className="products-filter__block">
          <button type="button">Category</button>
          <div className="products-filter__block__content">
            <button
              type="button"
              onClick={() => handleCollectionChange(null)}
              style={btnStyle(selectedCollection === null)}
            >
              All Products
            </button>

            {loading && (
              <p style={{ fontSize: "13px", color: "var(--color-text)", padding: "8px 0" }}>
                Loading categories...
              </p>
            )}

            {collections.map((col: any) => (
              <button
                key={col.id}
                type="button"
                onClick={() => handleCollectionChange(col.title)}
                style={btnStyle(selectedCollection === col.title)}
              >
                {col.title}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="products-filter__block">
          <button type="button">Price Range</button>
          <div className="products-filter__block__content">
            <p style={{ fontSize: "12px", color: "var(--color-text)", marginBottom: "12px" }}>
              ${priceRange[0]} – ${priceRange[1]}
            </p>
            <Range
              min={0}
              max={500}
              defaultValue={[0, 200]}
              value={priceRange}
              onChange={(value: number[]) => setPriceRange(value)}
              tipFormatter={(value: number) => `$${value}`}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductsFilter;
