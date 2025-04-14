import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return NextResponse.json({ user: null });
  }

  const user = JSON.parse(userCookie.value);
  return NextResponse.json({ user });
}
