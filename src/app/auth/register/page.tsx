import RegisterComponent from "./RegisterComponent";

export const metadata = {
  title: "Register",
  description: "Register to create your Finaki account",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Register | Finaki",
  description: "Register to create your Finaki account",
};

const RegisterPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegisterComponent />;
    </>
  );
};

export default RegisterPage;
