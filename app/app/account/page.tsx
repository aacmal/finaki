import MyAccount from "./MyAccount";

export const metadata = {
  title: "Akun Saya",
  description: "Akun Saya",
};

type Props = {};
const Page = (props: Props) => {
  return <MyAccount />;
};

export default Page;
