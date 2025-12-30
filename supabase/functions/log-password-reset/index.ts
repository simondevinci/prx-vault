import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const body = await req.json();

    console.log("Password reset event logged:", body);

    return new Response(JSON.stringify({ status: "logged" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error logging password reset:", error);

    return new Response(JSON.stringify({ error: "Invalid payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
