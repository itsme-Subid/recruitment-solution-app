import Form from "../components/registerForm";

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Brand />
      <Form />
    </div>
  );
};

export default Register;

const Brand = () => (
  <div className="brand basis-1/3 bg-black w-full h-full text-white flex items-center font-montserrat text-7xl font-bold justify-center">
    <h1>Board.</h1>
  </div>
);
