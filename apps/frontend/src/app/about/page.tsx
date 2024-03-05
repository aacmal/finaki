import Heading from "../../components/dls/Heading";

export const metadata = {
  title: "About",
  description: "About Finaki project",
};
const AboutPage = () => {
  return (
    <div className="mx-auto mt-32 max-w-screen-lg space-y-10 overflow-x-hidden px-3 dark:text-slate-300 md:px-4 lg:pt-16 2xl:px-32">
      <section>
        <Heading level={1} className="mb-4 text-center">
          About this project
        </Heading>
        <p>
          Finaki is a web-based application for your financial management, you
          can record incoming and outgoing transactions. Equipped with graphs to
          make it easier for you to analyze your finances.
        </p>
        <section>
          <Heading level={2} className="mb-4 mt-8" fontWeight="normal" isItalic>
            - Background
          </Heading>
          <p>
            This application was created to assist me in recording incoming or
            outgoing finances so that they are more precisely controlled, and
            can be analyzed.
          </p>
        </section>
        <section>
          <Heading level={2} className="mb-4 mt-8" fontWeight="normal" isItalic>
            - Technology
          </Heading>
          <p>
            This application is made with Typescript on the frontend and
            backend. The frontend is built with NextJS and TailwindCSS, and the
            backed is built with ExpressJS. For security this application is
            equipped with JWT (JSON Web Token).
          </p>
        </section>
      </section>
    </div>
  );
};

export default AboutPage;
