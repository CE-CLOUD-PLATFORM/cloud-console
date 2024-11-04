import { Toaster } from "react-hot-toast";

const SigninLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Toaster position="top-right" />
      <main className="bg-white">{children}</main>
    </>
  );
};

export default SigninLayout;
