import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/lib/site";

const T = "Contact | Wedding on a Budget";
const D = "Questions about the Wedding on a Budget ebook, your order or a refund? Get in touch.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <LegalPage title="Contact">
      <p>Questions about the guide, your order or a refund? We're happy to help and usually reply within 1–2 business days.</p>
      <a href={`mailto:${SUPPORT_EMAIL}`} className="btn-cta mt-4"><Mail className="h-5 w-5" />{SUPPORT_EMAIL}</a>
    </LegalPage>
  );
}
