import { useState, useEffect } from "react";
import "./Forms.css";
import { errorMessage } from "../../constants/errorMessages";
import * as Yup from "yup";
import Select from "react-select";
import { countries } from "../../constants/countries";
import { options } from "../../constants/skills";

export default function FormComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    phoneNumber: "",
    instituteName: "",
    webLink: "",
    interestedSkills: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showStateCity, setShowStateCity] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(errorMessage.eoiMissingFirstNameError),
    lastName: Yup.string().required(errorMessage.eoiMissingLastNameError),
    email: Yup.string()
      .email(errorMessage.eoiInvalidEmailError)
      .required(errorMessage.eoiMissingEmailError),
    dob: Yup.string().required(errorMessage.eoiInvalidDobError),
    country: Yup.string().required(errorMessage.eoiMissingCountryError),
    state: Yup.string(),
    city: Yup.string(),
    instituteName: Yup.string(),
    webLink: Yup.string(),
    phoneNumber: Yup.string()
      .required(errorMessage.eoiInvalidMobileError)
      .matches(/^\d{6,16}$/, "Please enter a valid 6 to 16 digit phone number"),
    interestedSkills: Yup.array().min(1, "Interested skill(s) are required"),
  });

  const validateField = (name, value) => {
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message,
        }));
      });
  };

  useEffect(() => {
    if (formData.country) {
      setShowStateCity(true);
    } else {
      setShowStateCity(false);
    }
  }, [formData.country]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    if (Object.keys(errors).length === 0) {
      console.log(formData);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const updatedErrors = { ...errors };
    delete updatedErrors[name];
    setErrors(updatedErrors);

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleSkillsChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions || []);
    setFormData({
      ...formData,
      interestedSkills: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  return (
    <>
      <div className="formHeading">
        <h3>{errorMessage.eoiFormHeading}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <p>
          Simply complete the form below and our team will contact you promptly!
        </p>

        <div className="formSection row">
          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              First Name<span>*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Last Name<span>*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Email<span>*</span>
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Date of Birth<span>*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Country<span>*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            >
              <option value="" disabled>
                Country Name
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.country_id}>
                  {country.country_name}
                </option>
              ))}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          {showStateCity && (
            <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <label className="formStyling" htmlFor="state">
                State <span id="reqIcon">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State Name"
              />
            </div>
          )}

          {showStateCity && (
            <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <label className="formStyling" htmlFor="city">
                City <span id="reqIcon">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City Name"
              />
            </div>
          )}

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Phone Number<span>*</span>
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Contact Number"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              placeholder="Institute/Academy Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">Website Link</label>
            <input
              type="text"
              name="webLink"
              value={formData.webLink}
              placeholder="Website Link"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <label className="formStyling">
              Interested Skill(s)<span>*</span>
            </label>
            <Select
              options={options}
              onChange={handleSkillsChange}
              isMulti
              placeholder=""
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  height: "0em",
                  backgroundColor: "#f4f9fe",
                  overflow: "auto",
                }),
                dropdownIndicator: (baseStyles) => ({
                  display: "none",
                }),
                clearIndicator: (baseStyles) => ({
                  display: "none",
                }),
                multiValueRemove: (baseStyles) => ({
                  backgroundColor: "#f4f9fe",
                  borderRight: "none",
                }),
                multiValueLabel: (baseStyles) => ({
                  padding: ".25rem .5em",
                  cursor: "pointer",
                  color: "#007bff",
                  lineHeight: "1em",
                  backgroundColor: "#f4f9fe",
                  flexWrap: "wrap",
                }),
                input: (baseStyles) => ({
                  ...baseStyles,
                  height: "2em",
                  padding: "0",
                }),

                multiValue: (baseStyles) => ({
                  ...baseStyles,
                  height: "1.5em",
                  lineHeight: "1.5em",
                  padding: "0",
                  overflow: "hidden",
                  fontSize: "0.9em",
                  fontFamily: "Poppins",
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  height: "1em",
                  lineHeight: "1em",
                }),
                option: (baseStyles) => ({
                  fontSize: "0.9em",
                  padding: "0.2em",
                  paddingLeft: "1em",
                  fontFamily: "Poppins",
                }),
              }}
            />
            {errors.interestedSkills && (
              <span className="error">{errors.interestedSkills}</span>
            )}

            {selectedSkills.length > 0 && (
              <div className="selected-skills">
                <p>Selected Skill(s):</p>
                <div className="selectedSkill">
                  {selectedSkills.map((skill) => (
                    <li key={skill.value}>{skill.label},</li>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="subBtn" className="form-group col-xs-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
