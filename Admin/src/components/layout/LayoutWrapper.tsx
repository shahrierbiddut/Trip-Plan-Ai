// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// export default function LayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isAppShell =
//     pathname?.startsWith("/dashboard") || pathname?.startsWith("/plan-trip");

//   return (
//     <body className="flex min-h-full flex-col font-sans">
//       {!isAppShell && <Navbar />}
//       <main className="flex-1 h-full">{children}</main>
//       {!isAppShell && <Footer />}
//     </body>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminPanel =
    pathname?.startsWith("/admin-panel");

  const isAppShell =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/plan-trip");

 const hideNavbar = isAdminPanel || isAppShell;

  const hideFooter = isAdminPanel || isAppShell;

  return (
    <body className="flex min-h-full flex-col font-sans">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 h-full">{children}</main>
      {!hideFooter && <Footer />}
    </body>
  );
}
