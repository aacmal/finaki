import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Container>
      <Navbar />
      <div className="flex flex-col w-full">
        <Header />
        <main>{children}</main>
      </div>
    </Container>
  );
};


export default AppLayout;