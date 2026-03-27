import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("contact/messages/")
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load messages.");
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-600 font-medium uppercase tracking-wider text-sm mb-3">
              Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Contact Messages
            </h1>
            <p className="text-lg text-slate-600">
              Messages submitted through your contact form.
            </p>
          </div>

          {loading && <p className="text-slate-500">Loading messages...</p>}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-500">
              No messages yet.
            </div>
          )}

          <div className="space-y-5">
            {!loading &&
              !error &&
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {msg.subject}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2 text-slate-700">
                    <p>
                      <span className="font-medium text-slate-900">Name:</span> {msg.name}
                    </p>
                    <p>
                      <span className="font-medium text-slate-900">Email:</span> {msg.email}
                    </p>
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Message:</p>
                      <p className="text-slate-600 leading-7 whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default DashboardMessages;