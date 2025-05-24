
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Reply, Flag } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface MessageProps {
  content: string;
  sender: "customer" | "agent" | "ai" | "note";
  timestamp?: string;
  seen?: boolean;
}

const Message: React.FC<MessageProps> = ({ 
  content, 
  sender, 
  timestamp, 
  seen 
}) => {
  const isCustomer = sender === "customer";
  const isAgent = sender === "agent";
  const isAI = sender === "ai";
  const isNote = sender === "note";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "flex mb-4 group transition-all", 
        isCustomer ? "justify-start" : "justify-end",
        isAI || isNote ? "justify-start" : "",
        "animate-fade-in"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isCustomer && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
          L
        </div>
      )}
      
      <div className="flex flex-col max-w-3xl relative">
        <div className={cn(
          "transition-all duration-200",
          isCustomer && "message-bubble-customer",
          isAgent && "message-bubble-agent",
          isAI && "message-bubble-ai",
          isNote && "note-bubble"
        )}>
          {content}
          
          {isHovered && !isNote && (
            <div className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200">
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Reply className="mr-2 h-4 w-4" />
                    <span>Reply</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Flag</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        
        {timestamp && (
          <div className="flex items-center mt-1 animate-fade-in">
            {isAgent && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>Seen</span>
                <span>·</span>
                <span>{timestamp}</span>
              </div>
            )}
            {isCustomer && (
              <div className="text-xs text-gray-500">
                {timestamp}
              </div>
            )}
          </div>
        )}
      </div>

      {isAgent && (
        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center ml-2 overflow-hidden">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Agent" 
            className="w-8 h-8 rounded-full hover-scale" 
          />
        </div>
      )}
    </div>
  );
};

export default Message;
