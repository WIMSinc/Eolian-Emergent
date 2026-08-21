import { Phone, Ticket, FileText, Download, ChevronDown, ArrowRight, Shield, Headset, Wifi, RefreshCw, Lock } from "lucide-react";

/**
 * Knowledge-base entries rendered on /support.
 *
 * Shared with the server route so the same copy can be emitted as FAQPage
 * JSON-LD without duplicating it. `icon` holds a lucide component reference,
 * so this is a module rather than JSON.
 */
export const faqs = [
  {
    id: "diagnostics",
    icon: Shield,
    label: "[KB.01]",
    title: "System Diagnostics",
    content: "Run the built-in diagnostics tool from Settings → System → Diagnostics. If sensors or feeds are not loading, verify that the edge server is powered on and that all devices are connected to the ARTAK mesh network. Check the status LED on the GoTENNA device — solid green indicates healthy mesh connectivity.",
  },
  {
    id: "deployment",
    icon: Wifi,
    label: "[KB.02]",
    title: "Field Deployment Protocols",
    content: "Power on the edge server first, then headsets and mobile devices. Allow 60–90 seconds for the mesh network to self-organize. Each device will display a connection status indicator in the ARTAK HUD. For multi-kit deployments, designate one edge server as the master node and configure others as secondary nodes from the Admin panel.",
  },
  {
    id: "updates",
    icon: RefreshCw,
    label: "[KB.03]",
    title: "Software Updates",
    content: "ARTAK software updates are distributed via the EolianVR secure update server. Connect the edge server to an internet-enabled network and navigate to Settings → System → Software Update. Updates can be staged and pushed to all connected devices simultaneously. Offline update packages are available — contact support@eolianvr.com for secure transfer.",
  },
  {
    id: "connectivity",
    icon: Wifi,
    label: "[KB.04]",
    title: "Connectivity Solutions",
    content: "ARTAK operates across GoTENNA mesh, WiFi, LTE, and Starlink. If devices are failing to connect, ensure mesh firmware is up to date. For long-range deployments, position GoTENNA nodes in elevated locations with line-of-sight when possible. For Starlink integration, connect the edge server's WAN port to the Starlink router and enable bridge mode.",
  },
  {
    id: "access",
    icon: Lock,
    label: "[KB.05]",
    title: "User Access & Security",
    content: "User accounts and roles are managed from the ARTAK Admin Console. Administrators can create operator, observer, and commander roles with configurable permissions. All data in transit is encrypted end-to-end. For CAC/PIV integration or single sign-on configuration in classified environments, contact your EolianVR technical account manager.",
  },
];
