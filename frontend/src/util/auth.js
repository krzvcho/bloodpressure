import { redirect } from "react-router-dom";

export function getAuthToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
}

export function tokenLoader(): string | null {
    return getAuthToken();
}

export function checkAuthLoader(): string | null | ReturnType<typeof redirect> {
    const token = getAuthToken();
    if (!token) {
        return redirect('/auth');
    }
    return null;
}