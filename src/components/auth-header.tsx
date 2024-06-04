import H1 from "./H1";

type AuthHeaderProps = {
  type: "login" | "signup";
};

export default function AuthHeader({ type }: AuthHeaderProps) {
  return (
    <div>
      <H1 className="bg-gradient-to-r from-teal-500 to-cyan-900 bg-clip-text text-3xl font-extrabold uppercase tracking-wide text-transparent">
        {type === "login" ? "Login" : "Sign up"}
      </H1>
      <p className="opacity-70">
        {type === "login"
          ? "Enter your credentials to log in into your account"
          : "Create an account to get started!"}
      </p>
    </div>
  );
}
