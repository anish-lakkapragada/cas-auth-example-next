"use client"; 
import { Center, Paper, Title } from "@mantine/core";
import PulseLoader from "react-spinners/PulseLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

export default function AuthOnly() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session == null && status == "unauthenticated") {
            router.push("/");
        }
    }, [session, router]); // Only run when session changes


    if (status === "loading") {
        return (
            <Center h="100vh" style={{ width: "100%" }}>
                <PulseLoader color="#66CCFF" size={10} />
            </Center>
        );
    }

    return (
        <>
        {status == "authenticated" && 
            <Center h="100vh" style={{ width: "100%" }}>
                <Paper shadow="md" p="xl" withBorder>
                    <Title order={2}> You are logged in :D </Title>                
                </Paper>
            </Center>
        }
        </>
    );
}
