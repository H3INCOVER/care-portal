"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  const [facility, setFacility] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("掲載内容の修正");
  const [message, setMessage] = useState("");

  // honeypot用（人間には見えない）
  const [company, setCompany] = useState("");

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  // フォームを開いた時間
  const [loadedAt, setLoadedAt] = useState(0);

  useEffect(() => {
    setLoadedAt(Date.now());

    const params = new URLSearchParams(window.location.search);
    const f = params.get("facility");

    if (f === "sakura") {
      setFacility("さくら訪問介護ステーション");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // honeypot対策
    if (company) {
      setStatus("送信に失敗しました。");
      return;
    }

    // 送信までの時間
    const seconds = (Date.now() - loadedAt) / 1000;

    // 3秒未満は拒否
    if (seconds < 3) {
      setStatus("送信が早すぎます。内容をご確認のうえ、再度お試しください。");
      return;
    }

    setSending(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facilityName: facility,
          name,
          email,
          category,
          message,
          company,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus(
          "送信しました。内容を確認のうえ、必要に応じてご連絡いたします。",
        );

        setName("");
        setEmail("");
        setCategory("掲載内容の修正");
        setMessage("");

        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setStatus("送信に失敗しました。時間をおいて再度お試しください。");
      }
    } catch (error) {
      console.error(error);

      setStatus("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-gray-900">
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold">
            事業所掲載・ホームページのご相談
          </h1>

          <p className="mt-4 text-gray-600">
            事業所掲載のご相談、ホームページ作成、
            掲載内容のご相談などがございましたら、
            以下のフォームよりお気軽にご連絡ください。
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border p-8 space-y-6"
        >
          {/* honeypot */}
          <div className="hidden">
            <label>Company</label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">事業所名（必須）</label>

            <input
              type="text"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">ご担当者名</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              メールアドレス（必須）
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">お問い合わせ内容</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>掲載内容の修正</option>
              <option>掲載の削除</option>
              <option>情報の追加</option>
              <option>掲載について相談</option>
              <option>その他</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">詳細内容</label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {status && (
            <div className="rounded-2xl bg-green-50 border border-green-200 px-5 py-4 text-green-800">
              <p className="font-bold">お問い合わせありがとうございました</p>

              <p className="mt-1 text-sm">{status}</p>

              {status.includes("送信しました") && (
                <p className="mt-2 text-xs text-green-700">
                  3秒後にトップページへ戻ります...
                </p>
              )}
            </div>
          )}

          {!status.includes("送信しました") && (
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-green-700 text-white py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {sending ? "送信中..." : "送信する"}
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
