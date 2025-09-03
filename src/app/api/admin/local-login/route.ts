import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // const allowedEmail =
    //   process.env.ADMIN_LOCAL_EMAIL ||
    //   process.env.ADMIN_BASIC_USER ||
    //   "admin@pharbit.com";
    // const allowedPassword =
    //   process.env.ADMIN_LOCAL_PASSWORD ||
    //   process.env.ADMIN_BASIC_PASSWORD ||
    //   "F#034180427932al";

    const allowedEmail = "admin@pharbit.com";
    const allowedPassword = "F#034180427932al";

    if (email !== allowedEmail || password !== allowedPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
