interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
}

interface AuthRegisterResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}

export const auth = {
    async login(creds: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return response.json() as Promise<AuthResponse>;
    },

    async register(creds: RegisterCredentials): Promise<AuthRegisterResponse> {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(creds),
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        return response.json() as Promise<AuthRegisterResponse>;
    },

    async getUser() {
        try {
            const response = await fetch("http://localhost:3000/auth/me", {
                credentials: "include",
                cache: "no-store",
            });

            if (!response.ok) {
                return null;
            }

            return response.json() as Promise<AuthResponse>;
        } catch {
            return null;
        }
    },
};
