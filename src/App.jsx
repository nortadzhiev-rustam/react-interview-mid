import React, { useState, useCallback } from "react";

// Simulated async API call
const submitForm = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (Math.random() < 0.2) throw new Error("Network error occurred");
  return { success: true, message: "Form submitted successfully!" };
};

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : value.trim().length > 50
          ? "Name must be less than 50 characters"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email address"
          : value.trim().length > 100
          ? "Email must be less than 100 characters"
          : "";
      case "message":
        return value.trim().length < 10
          ? "Message must be at least 10 characters"
          : value.length > 2000
          ? "Message must be less than 2000 characters"
          : "";
      default:
        return "";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const result = await submitForm(formData);
      setSubmitSuccess(result.message);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message || "Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    Object.values(formData).every((v) => v.trim());

  return (
    <div className="container">
      <h1>React Mid Task: Contact Form</h1>
      {submitSuccess && <div className="success">{submitSuccess}</div>}
      {submitError && (
        <div
          className="error"
          style={{
            padding: 12,
            background: "#f8d7da",
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <div id="name-error" className="error">
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="error">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            style={{ minHeight: "50px", maxWidth: "100%", minWidth: "100%" }}
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            maxLength={2000}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <div
            style={{ fontSize: "0.85rem", textAlign: "right", color: "#666" }}
          >
            {formData.message.length}/2000
          </div>
          {errors.message && (
            <div id="message-error" className="error">
              {errors.message}
            </div>
          )}
        </div>

        <button type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
