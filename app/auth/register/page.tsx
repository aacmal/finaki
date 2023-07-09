import RegisterComponent from "./RegisterComponent";

export const metadata = {
  title: "Register",
  description: "Register to your Finaki account",
};

type Props = {};
const RegisterPage = (props: Props) => {
  return <RegisterComponent />;
};

export default RegisterPage;
