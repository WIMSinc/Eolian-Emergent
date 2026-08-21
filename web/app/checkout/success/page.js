import { pageMetadata } from "@/lib/seo";
import CheckoutResultContent from "../CheckoutResultContent";

export const metadata = pageMetadata({
  title: "Order Received",
  description: "ARTAK software subscription checkout.",
  path: "/checkout/success",
  noindex: true,
});

// Reading session_id here rather than with useSearchParams keeps the component
// a server component and avoids needing a Suspense boundary.
export default async function Page({ searchParams }) {
  const sp = await searchParams;
  return (
    <CheckoutResultContent
      success={true}
      sessionId={sp?.session_id ?? null}
    />
  );
}
