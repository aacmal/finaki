import React from "react";
import LoginComponent from "./LoginComponent";

type Props = {};

export const metadata = {
  title: "Login",
  description: "Login to your Finaki account",
};

const LoginPage = (props: Props) => {
  return <LoginComponent />;
};

export default LoginPage;
