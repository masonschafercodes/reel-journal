'use client';

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface LogoutButtonProps {
    logoutAction: () => Promise<void>;
}

export function LogoutButton({
    logoutAction
}: LogoutButtonProps) {
    const router = useRouter();

    async function logout() {
        await logoutAction();
        router.push('/');
        router.refresh();
    }

    return <Button
        onClick={logout}
        variant="outline"
        size="lg"
    >
        Logout
    </Button>
}