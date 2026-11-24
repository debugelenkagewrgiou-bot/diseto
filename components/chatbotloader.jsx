
"use client";

import dynamic from "next/dynamic";

const DISETOChatbot = dynamic(
  () => import("@/components/disetochat"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ChatbotLoader() {
  return <DISETOChatbot />;
}
