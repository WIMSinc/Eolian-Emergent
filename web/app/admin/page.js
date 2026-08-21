import { pageMetadata } from "@/lib/seo";
import AdminLoginContent from "./AdminLoginContent";

// robots.txt already disallows /admin; noindex is belt-and-braces.
export const metadata = pageMetadata({
  title: "Admin Login",
  description: "EolianVR administration.",
  path: "/admin",
  noindex: true,
});

export default function Page() {
  return <AdminLoginContent />;
}
