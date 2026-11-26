import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/lib/site";

const T = "Terms of Use | Wedding on a Budget";
const D = "The terms for buying and using the Wedding on a Budget ebook.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>By using this website or buying Wedding on a Budget, you agree to these terms.</p>
      <h2>The product</h2>
      <p>Wedding on a Budget is a digital ebook (PDF) delivered by email after purchase. It is not a physical book.</p>
      <h2>License</h2>
      <p>Your purchase gives you a personal, non-transferable license. Please don't resell, share or republish the ebook.</p>
      <h2>Payments and refunds</h2>
      <p>Payments are processed securely by Hotmart. If the guide isn't what you expected, ask within 7 days of purchase for a full refund.</p>
      <h2>No guarantees of results</h2>
      <p>The guide offers general planning tips and sample budgets. Actual costs vary by location, vendor and season, and this is not financial advice.</p>
      <h2>Contact</h2>
      <p>Email <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
    </LegalPage>
  );
}
