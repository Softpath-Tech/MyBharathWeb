import React, { useState } from "react";

export const BasicInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "Giriprathap",
    lastName: "Raju",
    username: "giriprathap38372",
    email: "",
    mobile: "9703662169",
    gender: "Male",
    dob: "01-Jan-2000",
    bloodGroup: "",
    district: "KURNOOL",
    state: "ANDHRA PRADESH",
    pincode: "518001",
    address: "",
    covidVaccinated: "Yes",
    localBody: "KURNOOL",
    area: "Urban",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const containerStyle = {
    width: "80%",
    margin: "20px auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "5px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s ease",
  };

  const inputFocusStyle = {
    borderColor: "#4caf50",
    outline: "none",
  };

  const buttonStyle = {
    gridColumn: "span 2",
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const mediaQueryStyle = {
    "@media (max-width: 768px)": {
      formStyle: {
        gridTemplateColumns: "1fr",
      },
    },
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Basic Information</h2>
      <form style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            readOnly
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Blood Group</option>
            {/* Add more options */}
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="KURNOOL">KURNOOL</option>
            {/* Add other district options */}
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Pin Code</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Local Body</label>
          <input
            type="text"
            name="localBody"
            value={formData.localBody}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Area</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>COVID Vaccinated</label>
          <select
            name="covidVaccinated"
            value={formData.covidVaccinated}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = buttonStyle.backgroundColor)
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};
