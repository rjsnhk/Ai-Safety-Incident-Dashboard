import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import './IncidentForm.css';

const IncidentForm = ({ onSubmit }) => {
  
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.severity) errors.severity = "Severity is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        severity: "",
      });
    }
  };

  return (
    <div className={`incident-form-container ${theme}`}>
      <h2 className="form-title">Report New Incident</h2>
      <form className="incident-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${formErrors.title ? "error" : ""}`}
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter incident title"
          />
          {formErrors.title && <p className="error-message">{formErrors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className={`form-textarea ${formErrors.description ? "error" : ""}`}
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide detailed description of the incident"
          ></textarea>
          {formErrors.description && <p className="error-message">{formErrors.description}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Severity</label>
          <div className="radio-group">
            {["Low", "Medium", "High"].map((severity) => (
              <label
                key={severity}
                className={`radio-label ${formData.severity === severity ? `selected ${severity.toLowerCase()}` : ""}`}
              >
                <input
                  type="radio"
                  name="severity"
                  value={severity}
                  checked={formData.severity === severity}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <span className="radio-text">{severity}</span>
              </label>
            ))}
          </div>
          {formErrors.severity && <p className="error-message">{formErrors.severity}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Incident Report
            <span className="button-glow"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;
