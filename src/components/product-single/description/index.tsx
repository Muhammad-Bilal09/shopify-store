interface DescriptionProps {
  show: boolean;
  descriptionHtml?: string;
}

const Description = ({ show, descriptionHtml }: DescriptionProps) => {
  const style = {
    display: show ? "block" : "none",
  };

  return (
    <section style={style} className="product-single__description">
      <div className="product-description-block" style={{ width: "100%", padding: "20px 0" }}>
        <h4>Product Description</h4>
        {descriptionHtml ? (
          <div 
            className="organic-description-content"
            style={{ marginTop: "15px", lineHeight: "1.7", color: "var(--color-text)" }}
            dangerouslySetInnerHTML={{
              __html: descriptionHtml.replace(/style=["']([^"']*)["']/gi, (match, styleContent) => {
                if (/position:\s*fixed/i.test(styleContent)) {
                  return 'style="position: relative; display: block; max-height: none; overflow: visible; pointer-events: auto; z-index: auto;"';
                }
                return match;
              })
            }} 
          />
        ) : (
          <p style={{ marginTop: "15px", color: "var(--color-text)" }}>
            Fresh, farm-selected premium quality product. Packed under strict hygienic conditions to preserve taste, texture, and natural nutrients.
          </p>
        )}
      </div>
    </section>
  );
};

export default Description;
