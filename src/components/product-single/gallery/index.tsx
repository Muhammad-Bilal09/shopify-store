import React from "react";

type ShopifyImageNode = {
  node: {
    src: string;
  };
};

type GalleryProductType = {
  images?: {
    edges: ShopifyImageNode[];
  };
};

const Gallery = ({ images }: GalleryProductType) => {
  // Extract image URLs safely
  const imageArray =
    images?.edges?.map((imageEdge) => imageEdge.node.src) || [];

  // Use a fallback image if no images are available
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
