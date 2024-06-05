import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: any) {
  try {
    const { subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "zoho",
      host: "smtpro.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: "benword25@gmail.com",
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });

    const mailOption = {
      from: "benword25@gmail.com",
      to: "tysontyler004@gmail.com",
      subject: "Send email",

      html: `<h3>hello august</h3>
       <li>title ${subject}</li>
       <li>message: ${subject}</li>
      `,
    };
    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
