import { GalleryProductType } from "@/types";
import React, { useState, useEffect } from "react";

const Gallery = ({ images }: GalleryProductType) => {
  const imageArray =
    images?.edges?.map((imageEdge) => imageEdge.node.src) || [];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const featImage =
    imageArray.length > 0 ? imageArray[activeIndex] : "/path/to/fallback-image.jpg";

  return (
    <section className="product-gallery" style={{ display: "flex", gap: "20px" }}>
      <div className="product-gallery__thumbs" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {imageArray.map((image, index) => (
          <div 
            key={index} 
            className={`product-gallery__thumb ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            style={{
              cursor: "pointer",
              border: index === activeIndex ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "var(--transition-smooth)",
              opacity: index === activeIndex ? 1 : 0.7,
              width: "70px",
              height: "70px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={(e) => { if (index !== activeIndex) e.currentTarget.style.opacity = "0.7"; }}
          >
            <img src={image} alt={`Product Thumbnail ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <div className="product-gallery__image" style={{
        flexGrow: 1,
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "#fff",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "500px"
      }}>
        <img 
          src={featImage} 
          alt="Featured Product" 
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%", 
            objectFit: "contain",
            transition: "transform 0.5s ease"
          }} 
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        />
      </div>
    </section>
  );
};

export default Gallery;
