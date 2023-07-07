import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import zod from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const registerFormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterFormValues = zod.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });
  const handleRegister = (data: RegisterFormValues): void => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: unknown) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later",
        });
      });
  };
  return (
    <div className="flex-1 bg-default h-full">
      <div className="container-custom-xs h-full flex flex-col gap-6 justify-center">
        <div className="upper">
          <h2 className="text-4xl font-montserrat font-bold">Register</h2>
          <p className="font-lato">Create an account</p>
        </div>
        <div className="form-container">
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              void handleSubmit(handleRegister)(event)
            }
            className="p-8 bg-white rounded-[1.25rem] flex flex-col gap-4"
          >
            <div className="input-group flex flex-col gap-2">
              <label htmlFor="email">Email address</label>
              <input
                className={`bg-[#EAEAEA] font-lato rounded-[0.625rem] py-2 px-4 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="text"
                id="email"
                placeholder="itsmesubid@gmail.com"
                required
                {...register("email")}
                title={errors.email?.message}
              />
            </div>
            <div className="input-group flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className={`bg-[#EAEAEA] font-lato rounded-[0.625rem] py-2 px-4 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                id="password"
                required
                {...register("password")}
                title={errors.password?.message}
              />
            </div>
            <button
              className="text-white font-bold font-montserrat bg-black py-4 rounded-[0.625rem]"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="register text-center mt-4">
            Already have an account? &nbsp;
            <Link to="/signin" className="text-link font-lato">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
