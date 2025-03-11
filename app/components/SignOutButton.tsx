"use client";
import {Button} from "@mantine/core";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      size="md"
      color="#66CCFF"
      onClick={() => {signOut();}}
    >
      Sign Out of Yale CAS
    </Button>
  );
};

export default SignOutButton;
