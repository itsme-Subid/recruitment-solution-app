import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-custom-md flex flex-col gap-8 py-20 min-h-screen items-center justify-center">
      <div className="welcome min-h-[60vh] flex flex-col justify-center gap-4">
        <h1 className="font-montserrat text-6xl font-bold text-center">
          Welcome to <span className="text-primary">TalentFD</span>
        </h1>
        <p className="font-thin text-center">
          TalentFD is a platform that helps companies manage their candidates
          easily.
        </p>
        <p className="font-thin text-center">
          It is built with React, TypeScript, TailwindCSS, and Firebase.
        </p>
        <p className="text-center">
          <span className="font-thin">It is a project by </span>
          <a
            href="https://www.linkedin.com/in/devsubid/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bold text-primary underline underline-offset-2 hover:no-underline"
          >
            SUBID DAS
          </a>
        </p>
        <Link
          to="/signin"
          className="bg-primary font-lato py-5 px-10 w-fit mx-auto mt-8 text-white font-bold rounded-full hover:bg-primary/90 transition-all duration-300 ease-in-out flex gap-2 items-center group"
        >
          Get Started{" "}
          <img
            className="w-0 transition-all ease-in-out group-hover:w-4"
            src="/icon/right.svg"
            alt=""
          />
        </Link>
      </div>
      <img src="/img/preview_dashboard.webp" alt="" />
      <p>
        <span className="font-bold">Note:</span> This is a demo project. You can
        sign up with any email and password. You can also sign in with Google.
      </p>
      <img src="/img/preview_signin.webp" alt="" />
    </div>
  );
};

export default Home;
