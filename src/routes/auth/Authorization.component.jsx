import React from "react";
import {
  signInWithGooglePopup,
  createUserDocumentWithAuth,
} from "../../utils/firebase/firebase.utils";
import SignUp from "../../components/sign-up/SignUp.component";
import SignIn from "../../components/sign-in/SignIn.component";
import "./authorization.styles.scss";

const Authorization = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const result = await createUserDocumentWithAuth(user);
    console.log(result);
  };
  return (
    <div className="authorization-container">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authorization;
