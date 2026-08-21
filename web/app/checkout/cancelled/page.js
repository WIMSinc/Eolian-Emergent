import { pageMetadata } from "@/lib/seo";
import CheckoutResultContent from "../CheckoutResultContent";

export const metadata = pageMetadata({
  title: "Checkout Cancelled",
  description: "ARTAK software subscription checkout.",
  path: "/checkout/cancelled",
  noindex: true,
});

// Reading session_id here rather than with useSearchParams keeps the component
// a server component and avoids needing a Suspense boundary.
export default async function Page({ searchParams }) {
  const sp = await searchParams;
  return (
    <CheckoutResultContent
      success={false}
      sessionId={sp?.session_id ?? null}
    />
  );
}
