import React, { useState } from "react";
import FormInput from "../form-input/FormInput.component";
import {
  createUserDocumentWithAuth,
  createAuthuserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-up.styles.scss";
import Button from "../button/Button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match with confirm password");
      return;
    }

    try {
      const { user } = await createAuthuserWithEmailAndPassword(
        email,
        password
      );
      const response = await createUserDocumentWithAuth(user, { displayName });
      console.log(response);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use");
        return;
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={hanldeSubmit}>
        {/* <label htmlFor="">Display Name</label> */}
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        {/* <label htmlFor="">Email</label> */}
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        {/* <label htmlFor="">Password</label> */}
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        {/* <label htmlFor="">Confirm Password</label> */}
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
