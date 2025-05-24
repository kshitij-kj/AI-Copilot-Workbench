
import React from "react";
import AdminPanel from "@/components/AdminPanel";
import { AdminPanelProvider } from "@/context/AdminPanelContext";

const Index = () => {
  return (
    <AdminPanelProvider>
      <AdminPanel />
    </AdminPanelProvider>
  );
};

export default Index;
