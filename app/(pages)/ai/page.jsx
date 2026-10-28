
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  Send,
  Sparkles,
  UserRound,
  Trash2,
  ArrowUpRight,
  LoaderCircle,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const initialMessage = {
  role: "assistant",
  content:
    "Hey! 👋 I'm Prajwal's AI assistant.\n\nAsk me about my **skills, projects, education, or contact details**. I'll keep my answers simple and easy to understand!",
};

const suggestions = [
  "Who is Prajwal?",
  "What skills does he know?",
  "Tell me about his projects",
  "How can I contact him?",
];

function AssistantMessage({ content }) {
  return (
    <div className="ai-markdown min-w-0 text-sm leading-7 text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-5 text-xl font-bold text-white first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-5 text-lg font-bold text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 font-semibold text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-cyan-200">
              {children}
            </strong>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-5 list-disc space-y-1.5 marker:text-cyan-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-5 list-decimal space-y-1.5 marker:text-cyan-400">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-cyan-400 pl-4 text-gray-400">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-4 border-white/10" />,
          a: ({ href, children }) => {
            const url = href || "";
            const internal = url.startsWith("/") && !url.startsWith("//");
            const safeProtocol = /^(https?:|mailto:|tel:)/i.test(url);

            if (!internal && !safeProtocol) {
              return <span>{children}</span>;
            }

            const className =
              "inline-flex max-w-full items-center gap-1 break-all font-medium text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-200";

            if (internal) {
              return (
                <Link href={url} className={className}>
                  {children}
                  <ArrowUpRight size={13} className="inline shrink-0" />
                </Link>
              );
            }

            return (
              <a
                href={url}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={className}
              >
                {children}
                {url.startsWith("http") && (
                  <ExternalLink size={12} className="inline shrink-0" />
                )}
              </a>
            );
          },
          pre: ({ children }) => (
            <pre className="my-3 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-xs leading-6 text-cyan-100">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className);

            return isBlock ? (
              <code className={className}>{children}</code>
            ) : (
              <code className="rounded-md border border-white/10 bg-white/[0.07] px-1.5 py-0.5 text-[0.9em] text-cyan-200">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-3 max-w-full overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-white/10 bg-white/[0.05] px-3 py-2 font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-white/[0.06] px-3 py-2 align-top">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function AIPage() {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function sendMessage(text = input) {
    const content = text.trim();

    if (!content || loading) return;

    const history = [
      ...messages.filter((message) => message !== initialMessage),
      { role: "user", content },
    ];

    setMessages((previous) => [
      ...previous,
      { role: "user", content },
    ]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not get a reply.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function clearChat() {
    setMessages([initialMessage]);
    setInput("");
    setError("");
  }

  return (
    <main className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[#080808] px-3 pb-4 pt-20 text-white sm:px-6 sm:pb-6 sm:pt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* Page header */}
        <header className="mb-5 flex shrink-0 items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-wider text-gray-300 sm:text-xs">
              <Sparkles size={13} className="text-cyan-300" />
              PERSONAL AI ASSISTANT
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Talk to my{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Explore my portfolio in simple words.
            </p>
          </div>

          <button
            type="button"
            onClick={clearChat}
            title="Clear conversation"
            aria-label="Clear conversation"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-red-400/40 hover:text-red-300 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">New chat</span>
          </button>
        </header>

        {/* Full-height chat */}
        <section className="flex min-h-[480px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] shadow-2xl shadow-black/20 sm:rounded-3xl">
          {/* Chat toolbar */}
          <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3 sm:px-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 text-black">
              <Bot size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold sm:text-base">
                Prajwal's Assistant
              </h2>
              <p className="text-[11px] text-gray-500 sm:text-xs">
                Skills · Projects · Contact
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Ready
            </div>
          </div>

          {/* Scrollable conversation */}
          <div
            className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 sm:space-y-6 sm:p-6"
            aria-label="Chat messages"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex items-start gap-2.5 sm:gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9 ${
                    message.role === "assistant"
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot size={18} />
                  ) : (
                    <UserRound size={17} />
                  )}
                </div>

                <div
                  className={`min-w-0 max-w-[88%] rounded-2xl px-3.5 py-3 sm:max-w-[80%] sm:px-5 sm:py-4 ${
                    message.role === "assistant"
                      ? "rounded-tl-sm border border-white/[0.07] bg-white/[0.035]"
                      : "rounded-tr-sm bg-cyan-500 text-black"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <AssistantMessage content={message.content} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words text-sm leading-6">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Bot size={18} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-white/[0.04] px-4 py-3 text-sm text-gray-400">
                  <LoaderCircle size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Prompt suggestions */}
          {messages.length === 1 && (
            <div className="shrink-0 border-t border-white/[0.06] px-4 py-3 sm:px-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                Start a conversation
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={loading}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-white/10 px-3 py-2 text-left text-[11px] text-gray-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:text-cyan-200 disabled:opacity-50 sm:text-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message composer */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="shrink-0 border-t border-white/[0.08] bg-black/20 p-3 sm:p-4"
          >
            {error && (
              <div
                role="alert"
                className="mb-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs text-red-300"
              >
                {error}
                <button
                  type="button"
                  onClick={() => sendMessage(messages.at(-1)?.content || "")}
                  className="ml-2 underline underline-offset-2"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 transition focus-within:border-cyan-400/40">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything about Prajwal..."
                aria-label="Your message"
                rows={1}
                maxLength={2000}
                className="max-h-32 min-h-11 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <LoaderCircle size={19} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-gray-600">
              <MessageCircle size={11} className="mr-1 inline" />
              Enter to send · Shift + Enter for a new line
            </p>
          </form>
        </section>

        {/* Portfolio navigation */}
        <footer className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-xs text-gray-500 sm:text-sm">
          <Link href="/projects" className="transition hover:text-cyan-300">
            Projects <ArrowUpRight size={13} className="inline" />
          </Link>
          <Link href="/skills" className="transition hover:text-cyan-300">
            Skills <ArrowUpRight size={13} className="inline" />
          </Link>
          <Link href="/contact" className="transition hover:text-cyan-300">
            Contact <ArrowUpRight size={13} className="inline" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
