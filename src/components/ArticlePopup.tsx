
import React from "react";
import { X, Share, Check } from "lucide-react";
import { useAdminPanel } from "@/context/AdminPanelContext";

const ArticlePopup: React.FC = () => {
  const { selectedArticle, toggleArticlePopup, addToComposer } = useAdminPanel();

  if (!selectedArticle) return null;

  const handleClose = () => {
    toggleArticlePopup(false);
  };

  const handleAddToComposer = () => {
    if (selectedArticle.content) {
      addToComposer(selectedArticle.content);
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">📄</span>
            <div>
              <div className="font-medium">{selectedArticle.title}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="mr-1">Public article</span>
                <span className="mx-1">•</span>
                <span className="mr-1">{selectedArticle.author}</span>
                <span className="mx-1">•</span>
                <span>{selectedArticle.timeAgo}</span>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose max-w-none">
            <p>{selectedArticle.content || "We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern."}</p>
            
            <h3>Refund Policy</h3>
            <ul>
              <li>Items must be returned within 60 days of purchase</li>
              <li>Products must be in original condition, unused and with original packaging</li>
              <li>Proof of purchase is required (order ID, receipt, etc.)</li>
            </ul>
            
            <h3>How to Request a Refund</h3>
            <ol>
              <li>Contact customer support with your order details</li>
              <li>Explain the reason for your refund request</li>
              <li>Wait for approval (usually within 1-2 business days)</li>
              <li>Once approved, you'll receive a QR code for return shipping</li>
              <li>Your refund will be processed once we receive the returned item</li>
            </ol>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <Share className="w-4 h-4 mr-1" />
            <span>Share</span>
          </button>
          <button 
            onClick={handleAddToComposer}
            className="flex items-center bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded"
          >
            <Check className="w-4 h-4 mr-1" />
            <span>Add to composer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePopup;
