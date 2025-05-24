
import React from "react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TicketItemProps {
  id: string;
  name: string;
  company?: string;
  preview: string;
  time: string;
  unread?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  name,
  company,
  preview,
  time,
  unread,
  isActive,
  onClick
}) => {
  const initials = name.charAt(0).toUpperCase();

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          onClick={onClick}
          className={cn(
            "flex items-start p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors rounded-lg my-1 mx-1 hover-scale",
            isActive ? "bg-gray-100 shadow-sm" : "",
            "animate-fade-in"
          )}
        >
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-200",
            unread ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          )}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-medium truncate">{name} {company && `- ${company}`}</p>
              <span className="badge-time">{time}</span>
            </div>
            <p className="text-xs text-gray-600 truncate">{preview}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
              unread ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            )}>
              {initials}
            </div>
            <div>
              <h4 className="font-semibold">{name}</h4>
              {company && <p className="text-sm text-gray-500">{company}</p>}
            </div>
          </div>
          <p className="text-sm">{preview}</p>
          <div className="pt-2 border-t text-xs text-gray-500">
            Last updated: {time}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TicketItem;
