
import React, { useState } from "react";
import { ChevronDown, Filter, Search } from "lucide-react";
import TicketItem from "./TicketItem";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const InboxSidebar: React.FC = () => {
  const { tickets, currentTicket, setCurrentTicket, activeFilter, setActiveFilter } = useAdminPanel();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filters = ["All", "Recent", "Unread", "Flagged", "Assigned to me"];
  const openCount = tickets.filter(ticket => !ticket.resolved).length;
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchQuery || 
      ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.user.company && ticket.user.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ticket.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "Unread") {
      return matchesSearch && ticket.unread;
    } else if (activeFilter === "Flagged") {
      return matchesSearch && ticket.flagged;
    } else if (activeFilter === "Assigned to me") {
      return matchesSearch && ticket.assignedToMe;
    } else if (activeFilter === "Recent") {
      return matchesSearch; // In a real app, you'd sort by date
    }
    return matchesSearch;
  });

  return (
    <div className="flex flex-col h-full border-r bg-sidebar rounded-tr-lg transition-all duration-300 animate-fade-in">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Your inbox</h2>
        <div className="flex items-center justify-between mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
              <span>{openCount} Open</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View all tickets</DropdownMenuItem>
              <DropdownMenuItem>View closed tickets</DropdownMenuItem>
              <DropdownMenuItem>View open tickets</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
              <span>{activeFilter}</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filters.map((filter) => (
                <DropdownMenuItem 
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={filter === activeFilter ? "bg-accent text-accent-foreground" : ""}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="relative mt-3">
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 space-y-1 p-1">
        {filteredTickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            id={ticket.id}
            name={ticket.user.name}
            company={ticket.user.company}
            preview={ticket.preview}
            time={ticket.time}
            unread={ticket.unread}
            isActive={currentTicket?.id === ticket.id}
            onClick={() => setCurrentTicket(ticket)}
          />
        ))}
        
        {filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 animate-fade-in">
            <Filter className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No tickets match your filters</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxSidebar;
