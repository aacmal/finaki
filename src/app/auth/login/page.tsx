import LoginComponent from "./LoginComponent";

export const metadata = {
  title: "Login",
  description: "Login to your Finaki account",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Login | Finaki",
  description: "Login to your Finaki account",
};

const LoginPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoginComponent />
    </>
  );
};

export default LoginPage;
