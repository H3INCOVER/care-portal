import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      facilityName,
      name,
      email,
      category,
      message,
    } = body;

    const data = await resend.emails.send({
      from: "介護事業所ポータル <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `【${category}】${facilityName || "事業所未指定"}`,
      replyTo: email,

      text: `
【問い合わせが届きました】

■ 事業所
${facilityName}

■ お名前
${name}

■ メール
${email}

■ お問い合わせ種別
${category}

■ 内容
${message}
      `,
    });

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "送信に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}