import { useState } from "react";
import Layout from "../layouts/Main";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "15px 20px",
    borderRadius: "14px",
    border: `2px solid ${focusedField === field ? "var(--color-primary)" : "#e8ecef"}`,
    backgroundColor: focusedField === field ? "#f0faf0" : "#f8fafc",
    color: "var(--color-black)",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    boxShadow: focusedField === field ? "0 0 0 4px rgba(46, 125, 50, 0.08)" : "none",
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #388e3c 100%)",
        padding: "120px 20px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "250px", height: "250px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "10%", width: "120px", height: "120px", background: "rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "30px",
            padding: "8px 20px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.9)",
            fontWeight: "600",
            letterSpacing: "0.5px",
            marginBottom: "24px",
            fontFamily: "'Manrope', sans-serif",
          }}>
            🌿 &nbsp; WE&#39;RE HERE TO HELP
          </div>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(36px, 6vw, 62px)",
            fontWeight: "900",
            color: "#ffffff",
            lineHeight: "1.1",
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}>
            Get in <span style={{ color: "#a5d6a7" }}>Touch</span>
          </h1>
          <p style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: "1.7",
            maxWidth: "500px",
            margin: "0 auto",
          }}>
            Questions about our organic products, farm partnerships, or your order?
            Our team replies within 24 hours.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{
        background: "#ffffff",
        borderBottom: "1px solid #f0f4f0",
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "⚡", label: "Response Time", value: "< 24 hours" },
            { icon: "📞", label: "Phone Support", value: "Mon – Sat, 9AM–6PM" },
            { icon: "🌍", label: "Farm Location", value: "Islamabad, Pakistan" },
            { icon: "💚", label: "Satisfaction Rate", value: "98%" },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: "1 1 200px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "28px 24px",
              borderRight: i < 3 ? "1px solid #f0f4f0" : "none",
            }}>
              <span style={{ fontSize: "28px" }}>{stat.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>{stat.label}</p>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#1a2e1a", marginTop: "2px" }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        background: "linear-gradient(180deg, #f8fdf8 0%, #f0f7f0 100%)",
        padding: "80px 20px 100px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-start" }}>

          {/* Left — Info Panel */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Contact Cards */}
            {[
              {
                icon: "📞",
                title: "Call Us",
                detail: "+92 51 1234567",
                sub: "Available Mon – Sat, 9AM to 6PM",
                color: "#e8f5e9",
                accent: "#2e7d32",
              },
              {
                icon: "✉️",
                title: "Email Us",
                detail: "hello@greenorganic.com",
                sub: "We reply within 24 business hours",
                color: "#e3f2fd",
                accent: "#1565c0",
              },
              {
                icon: "📍",
                title: "Visit Our Farm",
                detail: "Sector 4, Islamabad",
                sub: "GreenOrganic Farms, Pakistan",
                color: "#fff3e0",
                accent: "#e65100",
              },
              {
                icon: "💬",
                title: "WhatsApp",
                detail: "+92 300 1234567",
                sub: "Quick support via WhatsApp",
                color: "#f3e5f5",
                accent: "#6a1b9a",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "24px",
                  border: "1px solid #eef2ee",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                }}
              >
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>{card.title}</p>
                  <p style={{ margin: "4px 0 2px", fontSize: "15px", fontWeight: "700", color: "#1a2e1a" }}>{card.detail}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>{card.sub}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid #eef2ee",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}>
              <p style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: "700", color: "#1a2e1a", textTransform: "uppercase", letterSpacing: "1px" }}>Follow Us</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[
                  { label: "Instagram", bg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)", icon: "📸" },
                  { label: "Facebook", bg: "#1877f2", icon: "👍" },
                  { label: "YouTube", bg: "#ff0000", icon: "▶️" },
                ].map((s, i) => (
                  <button
                    key={i}
                    style={{
                      background: typeof s.bg === "string" && s.bg.startsWith("linear") ? s.bg : s.bg,
                      color: "#fff",
                      border: "none",
                      borderRadius: "30px",
                      padding: "9px 18px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "inherit",
                      backgroundImage: s.bg.startsWith("linear") ? s.bg : undefined,
                      backgroundColor: s.bg.startsWith("linear") ? undefined : s.bg,
                    }}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div style={{
            flex: "1.4 1 380px",
            background: "#ffffff",
            borderRadius: "28px",
            padding: "clamp(30px, 5vw, 55px)",
            border: "1px solid #eef2ee",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{
                  width: "90px",
                  height: "90px",
                  background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  margin: "0 auto 24px",
                }}>
                  🌱
                </div>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#1a2e1a",
                  marginBottom: "14px",
                }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px", maxWidth: "340px", margin: "0 auto 32px" }}>
                  Thank you for reaching out. A GreenOrganic representative will contact you within 24 hours. 🌿
                </p>
                <button
                  onClick={() => {
                    setFormState({ name: "", email: "", subject: "", message: "" });
                    setSubmitted(false);
                  }}
                  style={{
                    background: "linear-gradient(135deg, #2e7d32, #388e3c)",
                    color: "#ffffff",
                    padding: "14px 38px",
                    fontWeight: "700",
                    borderRadius: "30px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 16px rgba(46, 125, 50, 0.3)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "36px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700" }}>
                    CONTACT FORM
                  </p>
                  <h2 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(24px, 4vw, 34px)",
                    fontWeight: "900",
                    color: "#1a2e1a",
                    marginBottom: "10px",
                    lineHeight: "1.2",
                  }}>
                    Send us a <span style={{ color: "var(--color-primary)" }}>Message</span>
                  </h2>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>
                    Fill out the form below and we&#39;ll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Name + Email row */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ flex: "1 1 180px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>
                        Your Name <span style={{ color: "var(--color-primary)" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div style={{ flex: "1 1 180px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>
                        Email Address <span style={{ color: "var(--color-primary)" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      value={formState.subject}
                      onChange={e => setFormState({ ...formState, subject: e.target.value })}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("subject")}
                    />
                  </div>

                  {/* Topic pills */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "10px" }}>
                      Topic (optional)
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {["Product Question", "Order & Shipping", "Farm Partnership", "Return / Refund", "Other"].map(topic => {
                        const isActive = formState.subject === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setFormState({ ...formState, subject: isActive ? "" : topic })}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "30px",
                              border: `2px solid ${isActive ? "var(--color-primary)" : "#e5e7eb"}`,
                              background: isActive ? "var(--color-mint-green)" : "#f9fafb",
                              color: isActive ? "var(--color-primary)" : "#64748b",
                              fontSize: "12px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              fontFamily: "inherit",
                            }}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "28px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>
                      Message <span style={{ color: "var(--color-primary)" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: "130px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #2e7d32, #43a047)",
                      color: "#ffffff",
                      padding: "16px 0",
                      fontWeight: "700",
                      borderRadius: "16px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      width: "100%",
                      boxShadow: "0 6px 20px rgba(46, 125, 50, 0.3)",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit",
                      letterSpacing: "0.3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 28px rgba(46, 125, 50, 0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(46, 125, 50, 0.3)";
                    }}
                  >
                    <span>Send Message</span>
                    <span style={{ fontSize: "18px" }}>🌿</span>
                  </button>

                  <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "16px" }}>
                    🔒 Your information is private and secure. We never share it.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Strip */}
      <section style={{
        background: "#1b5e20",
        padding: "70px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", color: "rgba(165, 214, 167, 0.8)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "12px" }}>
            QUICK ANSWERS
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "48px",
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", textAlign: "left" }}>
            {[
              { q: "How long does shipping take?", a: "Standard delivery takes 3–5 business days across Pakistan. Express options available at checkout." },
              { q: "Are all your products 100% organic?", a: "Yes! Every product is certified organic, grown without pesticides or synthetic fertilizers." },
              { q: "Can I return a product?", a: "Absolutely. We offer hassle-free returns within 7 days of delivery if you're not satisfied." },
              { q: "Do you ship internationally?", a: "Currently we only ship within Pakistan, but we're working on expanding to more countries soon." },
            ].map((faq, i) => (
              <div key={i} style={{
                flex: "1 1 360px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "20px",
                padding: "28px",
                backdropFilter: "blur(4px)",
              }}>
                <p style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: "700", color: "#a5d6a7" }}>❓ {faq.q}</p>
                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: "1.65" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
