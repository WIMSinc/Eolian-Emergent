import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <StudioClient />;
}
