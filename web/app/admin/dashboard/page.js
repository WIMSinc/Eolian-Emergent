import { pageMetadata } from "@/lib/seo";
import AdminDashboardContent from "./AdminDashboardContent";

// robots.txt already disallows /admin; noindex is belt-and-braces.
export const metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "EolianVR administration.",
  path: "/admin/dashboard",
  noindex: true,
});

export default function Page() {
  return <AdminDashboardContent />;
}
