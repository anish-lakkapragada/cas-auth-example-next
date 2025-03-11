"use client";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import { Text, Paper, Flex, Title, Center, useMantineColorScheme } from "@mantine/core";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // import useEffect and useState

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  /** lines 18-35 are for the toggle color scheme. */
  const [mounted, setMounted] = useState(false); // Track if component is mounted
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  const setDarkColorScheme = () => {
    setColorScheme("dark");
  };
  const setLightColorScheme = () => {
    setColorScheme("light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Center h="100vh" style={{ width: "100%" }}>
      <Paper shadow="md" p="xl" w={{ base: "90%", sm: "80%", md: "50%" }} withBorder>
        <Flex direction="column" gap="md" align="center">
          <Title order={3} style={{textAlign: "center"}}>Yale CAS Example App: CPSC 439/539</Title>
          <Text size="md" style={{textAlign: "left"}}>
            This is the official CAS authentication example for Software
            Engineering at Yale University (CPSC 439/539). CAS authentication
            allows you to authenticate against Yale's authentication server. This allows you
            to have users sign in with their Yale NetIDs. <strong>Click below to try.</strong>
          </Text>

          {status === "loading" ? (
            <PulseLoader color="#66CCFF" size={10} />
          ) : session && session.user ? (
            <>
              <SignOutButton />
              <Text size="lg" style={{textAlign: "left"}}><strong>Status:</strong> You are authenticated (netid: <strong>{session.user.name}</strong>)! 😊</Text>
            </>
          ) : (
            <>
              <SignInButton />
              <Text size="lg" style={{textAlign: "left"}}><strong>Status:</strong> You are not authenticated 🤔</Text>
            </>
          )}

          <Text size="md" style={{textAlign: "left"}}>
            For an example of a protected page for only authenticated viewers, go <span onClick={() => {router.push('/authonly')}} style={{cursor: "pointer", color: "violet"}}>here</span>.
          </Text>

          <Flex direction="row" gap="xs" align="center" justify="center">
            {colorScheme === "dark" ? (
              <IconSun size={24} onClick={setLightColorScheme} style={{ cursor: "pointer" }} />
            ) : (
              <IconMoon size={24} onClick={setDarkColorScheme} style={{ cursor: "pointer" }} />
            )}
            <Text size="xs">Developed by Anish Lakkapragada</Text>
          </Flex>
        </Flex>
      </Paper>
    </Center>
  );
}
