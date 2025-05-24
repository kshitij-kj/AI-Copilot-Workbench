
import React, { useState } from "react";
import { ArrowRight, ArrowUp, Square, Search } from "lucide-react";
import CopilotMessage from "./CopilotMessage";
import DetailPanel from "./DetailPanel";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { ScrollArea } from "./ui/scroll-area";

const CopilotPanel: React.FC = () => {
  const { 
    selectedTab, 
    setSelectedTab,
    relevantSources,
    addMessage
  } = useAdminPanel();
  
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<number | null>(null);

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add the user's question to the conversation
    addMessage({
      content: question,
      sender: "customer",
      timestamp: "now"
    });
    
    // Simulate AI response with animated thinking state
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      addMessage({
        content: "Searching for relevant sources...",
        sender: "ai",
        timestamp: "now"
      });
      
      // Add an AI response with some example refund policy text
      setTimeout(() => {
        setIsThinking(false);
        addMessage({
          content: "Our standard refund policy does not allow for returns after 60 days of the purchase date. However, in certain situations where orders were placed over 60 days ago, we recognise the need for flexibility. Refund requests for orders placed over 60 days ago may require additional approval.",
          sender: "ai",
          timestamp: "now"
        });
      }, 2000);
    }, 1000);
    
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  return (
    <div className="flex flex-col h-full border-l">
      {/* Header with animated tab selection */}
      <div className="border-b">
        <div className="flex items-center">
          <button
            className={`px-4 py-3 relative ${selectedTab === "ai-copilot" ? "tab-active" : "tab-inactive"} transition-all duration-300`}
            onClick={() => setSelectedTab("ai-copilot")}
          >
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-2" />
              AI Copilot
            </div>
            {selectedTab === "ai-copilot" && 
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 transition-transform duration-300"></span>
            }
          </button>
          <button
            className={`px-4 py-3 relative ${selectedTab === "details" ? "tab-active" : "tab-inactive"} transition-all duration-300`}
            onClick={() => setSelectedTab("details")}
          >
            Details
            {selectedTab === "details" && 
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 transition-transform duration-300"></span>
            }
          </button>
        </div>
      </div>
      
      {/* Content with smooth scrolling */}
      <ScrollArea className="flex-1">
        {selectedTab === "ai-copilot" ? (
          <div className="p-4">
            <div className="flex justify-center mb-6 transition-transform duration-300 hover:scale-110">
              <div className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-md shadow-lg">
                <span role="img" aria-label="Robot" className="text-xl">🤖</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium">Hi, I'm Fin AI Copilot</h3>
              <p className="text-gray-600">Ask me anything about this conversation.</p>
            </div>
            
            <div className="mb-6 transition-all duration-300 hover:translate-y-[-2px]">
              <CopilotMessage 
                content="We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To assist you with your refund request, could you please provide your order ID and proof of purchase. Please note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding. Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post."
                hasActions={true}
                numbered={true}
              />
            </div>
            
            <div className="mb-6">
              {relevantSources.length > 0 && (
                <div className="animate-fade-in">
                  <div className="text-sm text-gray-500 mb-2">15 relevant sources found</div>
                  <div className="space-y-2">
                    {relevantSources.slice(0, 3).map((source, index) => (
                      <div 
                        key={source.id} 
                        className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-all duration-300 ${hoveredSource === index ? 'bg-gray-100 scale-[1.02] shadow-sm' : 'hover:bg-gray-50'}`}
                        onMouseEnter={() => setHoveredSource(index)}
                        onMouseLeave={() => setHoveredSource(null)}
                      >
                        <span className={`transition-transform duration-300 ${hoveredSource === index ? 'scale-125' : ''} ${source.type === "Public article" ? "text-gray-500" : "text-blue-500"}`}>
                          {source.type === "Public article" ? "📄" : "💬"}
                        </span>
                        <span>{source.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline flex items-center group">
                    <span>See all</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <DetailPanel />
        )}
      </ScrollArea>
      
      {/* Input area with animation */}
      {selectedTab === "ai-copilot" && (
        <div className="p-4 border-t">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow up question..."
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button 
              onClick={handleSendQuestion}
              disabled={!question.trim() || isThinking}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isThinking ? 'text-blue-400 animate-pulse' : 'text-gray-400 hover:text-gray-600'} transition-colors hover:scale-125 duration-200`}
            >
              {isThinking ? (
                <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotPanel;
