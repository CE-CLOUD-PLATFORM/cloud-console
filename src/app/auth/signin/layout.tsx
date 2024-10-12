// components/LoginLayout.js
const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <div>
        <main>{children}</main>
      </div>
  );
};

export default LoginLayout;
