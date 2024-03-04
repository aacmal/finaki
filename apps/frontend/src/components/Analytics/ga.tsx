import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  if (process.env.NODE_ENV !== "production") return <></>;
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-BGR89K4TRY"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-BGR89K4TRY');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
