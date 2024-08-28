const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-svh w-full flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
