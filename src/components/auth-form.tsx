"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import CustomInput from "@/components/custom-input";
import { login, signup } from "@/actions/auth";
import { authFormSchema } from "@/lib/schemas";
import { TAuthForm } from "@/lib/types";

import AuthHeader from "./auth-header";
import AuthFooter from "./Auth-footer";
import SignOutBtn from "./sign-out-btn";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TAuthForm>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(authFormSchema),
  });

  const handleSubmit = async () => {
    let errors: { message: string } | undefined = undefined;

    const isValid = await trigger();

    if (!isValid) return;

    const authData = getValues();

    if (type === "login") {
      errors = await login(authData);
    } else {
      errors = await signup(authData);
    }

    if (errors) {
      toast.error(errors.message);
    }
  };

  return (
    <>
      <AuthHeader type={type} />
      <form className="space-y-4" action={handleSubmit}>
        <CustomInput
          id="email"
          label="Email"
          type="email"
          placeholder="john.doe@gmail.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <CustomInput
          id="password"
          label="Password"
          type="password"
          placeholder="*** ***** **"
          {...register("password")}
          error={errors.password?.message}
        />
        <SignOutBtn />
      </form>
      <AuthFooter type={type} />
    </>
  );
}
