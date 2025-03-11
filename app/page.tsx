"use client";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import { Text, Paper, Flex, Title, Center, useMantineColorScheme } from "@mantine/core";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function Home() {
  const { data: session, status } = useSession();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const setDarkColorScheme = () => {
    setColorScheme("dark");
  };
  const setLightColorScheme = () => {
    setColorScheme("light");
  };

  console.log(session);

  return (
    <Center h="100vh" style={{ width: "100%" }}>
      <Paper shadow="md" p="xl" w={{ base: "90%", sm: "80%", md: "50%" }} withBorder>
        <Flex direction="column" gap="md" align="center">
          <Title order={3} align="center">Yale CAS Next.js Example App: CPSC 439/539</Title>
          <Text size="md" align="left">
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
              <Text size="xl" align="left"><strong>Status:</strong> You are authenticated (netid: <strong>{session.user.name}</strong>)! 😊</Text>
            </>
          ) : (
            <>
              <SignInButton />
              <Text size="xl" align="left"><strong>Status:</strong> You are not authenticated 🤔</Text>
            </>
          )}

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
