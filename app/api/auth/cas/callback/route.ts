import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";
import { authOptions } from "../../[...nextauth]/route";

const CAS_SERVICE_URL = "https://secure.its.yale.edu/cas";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticket = searchParams.get("ticket");

  if (!ticket) {
    return NextResponse.json({ error: "No CAS ticket provided" }, { status: 400 });
  }

  const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  const callbackUrl = `${baseUrl}/api/auth/cas/callback`;

  try {
    // Validate CAS ticket with the CAS service
    const response = await fetch(
      `${CAS_SERVICE_URL}/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(callbackUrl)}`
    );

    const text = await response.text();
    const match = text.match(/<cas:user>(.*?)<\/cas:user>/);

    if (!match) {
      throw new Error("CAS authentication failed");
    }

    const netId = match[1];
    console.log(`Signing in with this NetID: ${netId}`);

    // Create the session token manually (server-side)
    const token = await encode({
      token: { 
        netId: netId,
        name: netId,
        email: `${netId}@yale.edu`,
        jti: crypto.randomUUID(),
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
        sub: netId
      },
      secret: process.env.NEXTAUTH_SECRET || ""
    });

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: authOptions.cookies?.sessionToken?.name || "next-auth.session-token",
      value: token,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax"
    });

    // Redirect to dashboard or homepage
    return NextResponse.redirect(`${baseUrl}`);

  } catch (error) {
    console.error("CAS Auth Error:", error);
    return NextResponse.json({ error: "CAS Authentication Failed" }, { status: 500 });
  }
}