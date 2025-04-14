// lib/getUser.ts
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie.value);
    return user;
  } catch (err) {
    console.error("Invalid user cookie:", err);
    return null;
  }
}
