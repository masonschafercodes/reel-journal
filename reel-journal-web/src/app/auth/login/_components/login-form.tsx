'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/lib/auth';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    async function onSubmit() {
        try {
            setLoading(true);
            await auth.login({
                email: loginData.email,
                password: loginData.password,
            });

            setLoading(false);
            router.push('/');
            router.refresh();
        } catch {
            setLoading(false);
            setError('Login failed. Please try again.');
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    Login
                </CardTitle>
                <CardDescription>
                    {error || 'Please enter your credentials'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email address for your account"
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="password for your account"
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline"
                    onClick={() => router.push('/auth/register')}
                >Register</Button>
                <Button
                    onClick={onSubmit}
                    disabled={loading}
                >Login</Button>
            </CardFooter>
        </Card>
    );
}