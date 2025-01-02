import { useState, useEffect } from "react";
import styles from "./EoiForm.module.css"; // Importing module CSS
import { errorMessage } from "../../constants/errorMessages";
import * as Yup from "yup";
import { countries } from "../../constants/countries";
import Select from "react-select";
import { options } from "../../constants/skills";

export default function EoiForm() {
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
    interestedSkills: [],
  });

  const [errors, setErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showStateCity, setShowStateCity] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(errorMessage.eoiMissingFirstNameError),
    lastName: Yup.string().required(errorMessage.eoiMissingLastNameError),
    email: Yup.string().email(errorMessage.eoiInvalidEmailError).required(errorMessage.eoiMissingEmailError),
    dob: Yup.string().required(errorMessage.eoiInvalidDobError),
    country: Yup.string().required(errorMessage.eoiMissingCountryError),
    state: Yup.string(),
    city: Yup.string(),
    instituteName: Yup.string(),
    webLink: Yup.string(),
    phoneNumber: Yup.string().required(errorMessage.eoiInvalidMobileError).matches(/^\d{6,16}$/, "Please enter a valid 6 to 16 digit phone number"),
    interestedSkills: Yup.array().min(1, "Interested skill(s) are required"),
  });

  const validateField = (name, value) => {
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
      })
      .catch((err) => {
        const updatedErrors = { ...errors };
        updatedErrors[name] = err.message;
        setErrors(updatedErrors);
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
  };

  return (
    <>
      <div className={styles.formHeading}>
        <h3>{errorMessage.eoiFormHeading}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Simply complete the form below and our team will contact you promptly!</p>

        <div className={styles.formSection}>
          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
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
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
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
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
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
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
              Date of Birth<span>*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
              Country<span>*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
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
            {errors.country && <span className={styles.error}>{errors.country}</span>}
          </div>

          {showStateCity && (
            <>
              <div className={styles["form-group"]}>
                <label className={styles.formStyling} htmlFor="state">
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

              <div className={styles["form-group"]}>
                <label className={styles.formStyling} htmlFor="city">
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
            </>
          )}

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
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
            {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>Institute Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              placeholder="Institute/Academy Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>Website Link</label>
            <input
              type="text"
              name="webLink"
              value={formData.webLink}
              placeholder="Website Link"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles.formStyling}>
              Interested Skill(s)<span>*</span>
            </label>
            <Select
              options={options}
              onChange={handleSkillsChange}
              isMulti
              placeholder=""
            />
            {selectedSkills.length > 0 && (
              <div className={styles.selectedSkills}>
                <p>Selected Skill(s):</p>
                <div className={styles.selectedSkill}>
                  {selectedSkills.map((skill) => (
                    <li key={skill.value}>{skill.label},</li>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
