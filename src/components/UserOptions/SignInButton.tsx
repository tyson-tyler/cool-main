"use client";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button className="mr-2" onClick={() => signIn("google")}>
      Sign In
    </Button>
  );
};

export default SignInButton;
