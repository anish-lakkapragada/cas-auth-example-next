"use client";
import {Button} from "@mantine/core"
import { signIn } from "next-auth/react";

const SignInButton = () => (
  <Button
    size="md"
    color="#66CCFF"
    onClick={() => {signIn("credentials")}}
  >
    Sign in With Yale CAS
  </Button>
);

export default SignInButton;
