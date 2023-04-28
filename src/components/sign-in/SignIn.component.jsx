import React, { useState } from "react";
import FormInput from "../form-input/FormInput.component";
import Button from "../button/Button.component";
import "./sign-in.styles.scss";

import {
  createUserDocumentWithAuth,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(defaultFormFields);
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentWithAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("wrong password, please try again");
          break;
        case "auth/user-not-found":
          alert("No user is associated with this email!");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          value={email}
          name="email"
          onChange={handleChange}
          type="text"
        />
        <FormInput
          label="Password"
          required
          value={password}
          name="password"
          onChange={handleChange}
          type="password"
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
