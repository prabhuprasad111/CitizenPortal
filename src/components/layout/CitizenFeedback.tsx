import React, { useState } from 'react';

export function CitizenFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    requestNoType: 'complaint', // default
    requestNo: '',
    district: '',
    year: '2026',
    landline: '',
    mobile: '',
    toWhom: '',
    feedback: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const districts = [
    'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 
    'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 
    'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha', 
    'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 
    'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh', 'Commissionerate Police Cuttack-Bhubaneswar'
  ];

  const years = Array.from({ length: 10 }, (_, i) => String(2026 - i));

  const authorities = [
    'Director General of Police (DGP)',
    'Superintendent of Police (SP)',
    'Deputy Commissioner of Police (DCP)',
    'Inspector In-Charge (IIC) / SHO',
    'DIB Helpdesk Support',
    'Citizen Portal Administrator'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.toWhom || !formData.feedback) {
      alert('Please fill in all mandatory fields (*)');
      return;
    }
    // Simulate API Submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        requestNoType: 'complaint',
        requestNo: '',
        district: '',
        year: '2026',
        landline: '',
        mobile: '',
        toWhom: '',
        feedback: '',
        email: '',
      });
    }, 2500);
  };

  return (
    <>
      {/* Rotated Sticky Tab */}
      <button
        type="button"
        className="feedback-sticky-tab"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="feedback-tab-text">Citizen Feedback</span>
        <i className="bi bi-chat-right-text-fill ms-2 feedback-tab-icon" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div className="feedback-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* Slide-out Panel */}
      <div className={`feedback-panel ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="feedback-panel-header">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-heart-pulse-fill text-gold fs-4" />
            <h3 className="mb-0 text-white font-semibold">Citizen Feedback</h3>
          </div>
          <button
            type="button"
            className="feedback-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close feedback panel"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="feedback-panel-body">
          {submitted ? (
            <div className="feedback-success-state text-center py-5">
              <div className="success-icon-wrapper mb-4">
                <i className="bi bi-check2-all" />
              </div>
              <h4 className="text-navy font-bold mb-2">Thank You!</h4>
              <p className="text-muted px-3">
                Your feedback has been successfully submitted to Odisha Police. We value your voice to improve our online portal services.
              </p>
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-info-card mb-4">
                <i className="bi bi-shield-fill-exclamation text-primary me-2" />
                <span>Please share your honest feedback or suggestions below. Fields marked with (*) are mandatory.</span>
              </div>

              {/* Personal Details */}
              <h5 className="feedback-section-title">Personal Details</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Middle Name"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Request Details */}
              <h5 className="feedback-section-title">Reference / Request Details</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label">Complaint / Service Request No.</label>
                  <div className="input-group">
                    <select
                      name="requestNoType"
                      value={formData.requestNoType}
                      onChange={handleChange}
                      className="form-select border-end-0 flex-grow-0"
                      style={{ width: '130px' }}
                    >
                      <option value="complaint">Complaint</option>
                      <option value="service">Service No</option>
                    </select>
                    <input
                      type="text"
                      name="requestNo"
                      value={formData.requestNo}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Number"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">District</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <h5 className="feedback-section-title">Contact & Communication</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label">Landline No.</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">+ 91</span>
                    <input
                      type="tel"
                      name="landline"
                      value={formData.landline}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Landline number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile No.</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">+ 91</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Feedback Details */}
              <h5 className="feedback-section-title">Feedback & Authority</h5>
              <div className="row g-3 mb-4">
                <div className="col-12">
                  <label className="form-label">To Whom <span className="text-danger">*</span></label>
                  <select
                    name="toWhom"
                    value={formData.toWhom}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Authority</option>
                    {authorities.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Citizen Feedback <span className="text-danger">*</span></label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    className="form-control"
                    rows={4}
                    placeholder="Provide your feedback or description here..."
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="feedback-form-actions d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-navy flex-grow-1 py-2 font-semibold text-white d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-send" />
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-light border py-2 px-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
