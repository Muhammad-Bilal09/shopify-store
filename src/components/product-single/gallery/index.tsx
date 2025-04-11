import { GalleryProductType } from "@/types";
import React from "react";

const Gallery = ({ images }: GalleryProductType) => {
  const imageArray =
    images?.edges?.map((imageEdge) => imageEdge.node.src) || [];

  const featImage =
    imageArray.length > 0 ? imageArray[0] : "/path/to/fallback-image.jpg";

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {imageArray.map((image, index) => (
          <div key={index} className="product-gallery__thumb">
            <img src={image} alt={`Product Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={featImage} alt="Featured Product" />
      </div>
    </section>
  );
};

export default Gallery;
