import Link from "next/link";

import { Button } from "./ui/button";

type AuthFooterProps = {
  type: "login" | "signup";
};

export default function AuthFooter({ type }: AuthFooterProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <p>
        {type === "login" ? "Don't have an account ?" : "Already a member ?"}
      </p>
      <Button variant="link" asChild>
        <Link href={type === "login" ? "/signup" : "/login"}>
          {type === "login" ? "Sign Up" : "Log In"}
        </Link>
      </Button>
    </div>
  );
}
