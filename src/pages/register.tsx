"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Layout from "../layouts/Main";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Validation functions
  const isValidName = (name: string) => /^[a-zA-Z]+$/.test(name.trim());
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setError("");
    setSuccess("");

    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isValidName(firstName)) {
      setError("First name should contain letters only.");
      return;
    }

    if (!isValidName(lastName)) {
      setError("Last name should contain letters only.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!termsAgreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! You can now log in.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTermsAgreed(false);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left" />
              Back to store
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">
              Create an account and discover the benefits
            </h2>
            <p className="form-block__description">
              Welcome to E-Shop! Create an account to enjoy exclusive benefits,
              faster checkout, and personalized recommendations.
            </p>

            {error && <p className="form-error" style={{ color: "red", marginTop: "20px", textAlign: "center" }}>{error}</p>}
            {success && <p className="form-success" style={{ color: "green", marginTop: "20px", textAlign: "center" }}>{success}</p>}

            <form className="form" onSubmit={handleSubmit}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]*$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className="checkbox checkbox--sm"
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                    <span className="checkbox__check" />
                    <p>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <p className="form__signup-link">
                <Link href="/login">Are you already a member?</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
