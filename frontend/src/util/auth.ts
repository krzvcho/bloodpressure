import { redirect } from "react-router-dom";

export function getAuthToken(): string | null {
  const token = localStorage.getItem("token");
  return token;
}
export function getLoggedUserData(): { userName: string | null; userId: string | null; token: string | null } | ReturnType<typeof redirect> {
    if(!getAuthToken()){
        return redirect("/auth");
    }
    return { userName: localStorage.getItem("user_name"), userId: localStorage.getItem("user_id"), token: getAuthToken() };
}
export function tokenLoader(): { userName: string | null; userId: string | null; token: string | null } {
  return { userName: localStorage.getItem("user_name"), userId: localStorage.getItem("user_id"), token: getAuthToken() };
}

export function checkAuthLoader(): string | null | ReturnType<typeof redirect> {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

