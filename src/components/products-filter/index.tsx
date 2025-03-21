import Slider from "rc-slider";
import { useState } from "react";
import productsColors from "../../utils/data/products-colors";
import productsSizes from "../../utils/data/products-sizes";
import productsTypes from "../../utils/data/products-types";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = ({
  selectedCollection,
  onSelectCollection,
}: {
  selectedCollection: string | null;
  onSelectCollection: (collection: string | null) => void;
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([3, 10]);
  const handleCollectionChange = (collection: string | null) => {
    onSelectCollection(collection);
  };

  const applyFilters = () => {
    console.log("Selected Collection:", selectedCollection);
    console.log("Price Range:", priceRange);
  };

  return (
    <form className="products-filter">
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Add Filter <i className="icon-down-open" />
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product type</button>
          <div className="products-filter__block__content">
            <button
              type="button"
              onClick={() => handleCollectionChange(null)}
              style={{
                backgroundColor:
                  selectedCollection === null ? "#4CAF50" : "transparent",
                color: selectedCollection === null ? "#fff" : "#333",
                padding: "8px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "14px",
                width: "100%",
                marginBottom: "8px",
              }}
            >
              All
            </button>
            {productsTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleCollectionChange(type.name)}
                style={{
                  backgroundColor:
                    selectedCollection === type.id ? "#4CAF50" : "transparent",
                  color: selectedCollection === type.id ? "#fff" : "#333",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={0}
              max={20}
              defaultValue={[3, 10]}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              tipFormatter={(value) => `${value}%`}
            />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content checkbox-square-wrapper">
            {productsSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => handleCollectionChange(size.id)}
                style={{
                  backgroundColor:
                    selectedCollection === size.id ? "#4CAF50" : "transparent",
                  color: selectedCollection === size.id ? "#fff" : "#333",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            <div className="checkbox-color-wrapper">
              {productsColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleCollectionChange(color.color)}
                  style={{
                    backgroundColor: color.color,
                    border:
                      selectedCollection === color.color
                        ? "2px solid #4CAF50"
                        : "2px solid #ddd",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    margin: "4px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={applyFilters}
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
