import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "@/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "./ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import zod from "zod";
import { FormEvent } from "react";

const signinFormSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type SigninFormValues = zod.infer<typeof signinFormSchema>;

const Form = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
  });
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
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
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
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
  const handleEmail = (data: SigninFormValues): void => {
    signInWithEmailAndPassword(auth, data.email, data.password)
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
          <h2 className="text-4xl font-montserrat font-bold">Sign In</h2>
          <p className="font-lato">Sign in to your account</p>
        </div>
        <div className="signin grid grid-cols-2 gap-4">
          <div
            onClick={handleGoogle}
            className="google cursor-pointer flex gap-3 text-sm items-center bg-white px-5 py-2 rounded-xl"
          >
            <img src="/icon/google.svg" alt="google" className="w-5" />
            <span className="text-black/40 font-montserrat">
              Sign in with Google
            </span>
          </div>
          <div
            onClick={handleGithub}
            className="github cursor-pointer flex gap-3 text-sm items-center bg-white px-5 py-2 rounded-xl"
          >
            <img src="/icon/github.svg" alt="github" className="w-5" />
            <span className="text-black/40 font-montserrat">
              Sign in with Github
            </span>
          </div>
        </div>
        <div className="form-container">
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              void handleSubmit(handleEmail)(event)
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
            <div
              onClick={() =>
                toast({
                  title: "Coming Soon",
                  description: "This feature is coming soon",
                })
              }
              className="text-link text-left cursor-pointer"
            >
              Forgot password?
            </div>
            <button
              className="text-white font-bold font-montserrat bg-black py-4 rounded-[0.625rem]"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="register text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-link font-lato">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
