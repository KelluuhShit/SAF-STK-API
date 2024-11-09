import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  if (!data.Body.stkCallback.CallbackMetadata) {
    // For failed transactions
    console.log(data.Body.stkCallback.ResultDesc);
    return NextResponse.json("ok saf");
  }

  // Let's extract the values from the callback metadata
  const body = data.Body.stkCallback.CallbackMetadata;

  // Use the defined type instead of 'any' here
  const amountObj = body.Item.find(
    (obj) => obj.Name === "Amount"
  );
  const amount = amountObj?.Value;

  // Mpesa code
  const codeObj = body.Item.find(
    (obj) => obj.Name === "MpesaReceiptNumber"
  );
  const mpesaCode = codeObj?.Value;

  // Phone number (in recent implementations, it may be hashed)
  const phoneNumberObj = body.Item.find(
    (obj) => obj.Name === "PhoneNumber"
  );
  const phoneNumber = phoneNumberObj?.Value?.toString();

  try {
    // Complete your logic - e.g., saving transaction to the DB
    console.log({ amount, mpesaCode, phoneNumber });

    return NextResponse.json("ok", { status: 200 });
  } catch {
    // Removed the unused `error` variable
    return NextResponse.json("error", { status: 500 });
  }
}
