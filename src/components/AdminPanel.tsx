
import React from "react";
import InboxSidebar from "./InboxSidebar";
import ConversationPanel from "./ConversationPanel";
import CopilotPanel from "./CopilotPanel";
import ArticlePopup from "./ArticlePopup";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { Toaster } from "@/components/ui/sonner";

const AdminPanel: React.FC = () => {
  const { showArticlePopup } = useAdminPanel();
  
  return (
    <>
      <div className="bg-admin-gradient w-full h-screen flex overflow-hidden">
        {/* Left Sidebar - Inbox */}
        <div className="w-72 flex-shrink-0 animate-slide-in-right shadow-lg rounded-r-lg">
          <InboxSidebar />
        </div>
        
        {/* Middle - Conversation */}
        <div className="flex-1 flex overflow-hidden animate-fade-in">
          <ConversationPanel />
        </div>
        
        {/* Right Sidebar - AI Copilot / Details */}
        <div className="w-80 flex-shrink-0 animate-slide-in-right shadow-lg rounded-l-lg">
          <CopilotPanel />
        </div>
        
        {/* Popups */}
        {showArticlePopup && <ArticlePopup />}
      </div>
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </>
  );
};

export default AdminPanel;
