// "use client"

// import AdminSidebar from "@/components/admin-panel/AdminSidebar";
// import AdminHeader from "@/components/admin-panel/AdminHeader";
// import { useState } from "react";
// import { Menu } from "lucide-react";

// export default function AdminPanelLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="min-h-screen overflow-x-hidden bg-gray-50">

//       {/* Sidebar */}
//       <AdminSidebar
//        isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="min-h-screen lg:ml-[236px]">

//          <div className="flex items-center gap-3 border-b bg-white px-4 py-3 lg:hidden">

//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="cursor-pointer 
//               flex h-10 w-10
//               items-center justify-center
//               rounded-lg
//               border
//               bg-white
//               text-gray-700
//               hover:bg-gray-100
//             "
//           >
//             <Menu size={22} />
//           </button>

//           <span className="text-lg font-bold text-gray-800">
//             TRIP PLAN AI
//           </span>

//         </div>


//         {/* Header */}
//         <AdminHeader   onMenuClick={() => setSidebarOpen(true)} />

    

//         {/* Page Content */}
//         <main className="w-full">
//           {children}
//         </main>

//       </div>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin-panel/AdminSidebar";
import AdminHeader from "@/components/admin-panel/AdminHeader";

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-[236px]">
        {/* Header (এখানেই মোবাইলের মেনু এবং হেডার একসাথে আছে) */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}