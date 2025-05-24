
import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Moon, Search, X, ChevronDown, Share, Flag, Phone, Video, Pencil } from "lucide-react";
import Message from "./Message";
import MessageComposer from "./MessageComposer";
import { useAdminPanel } from "@/context/AdminPanelContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

const ConversationPanel: React.FC = () => {
  const { currentTicket, messages, currentNote, setCurrentNote } = useAdminPanel();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentNote]);

  const handleCloseTicket = () => {
    toast("Ticket Closed", {
      description: "The ticket has been closed successfully",
    });
  };
  
  const toggleNotesVisibility = () => {
    setNotesExpanded(!notesExpanded);
  };

  const handleRemoveNote = () => {
    setCurrentNote(null);
    toast("Note removed", {
      description: "The note has been removed from the conversation",
    });
  };

  if (!currentTicket) {
    return (
      <div className="flex flex-1 items-center justify-center animate-fade-in">
        <div className="text-center p-8 rounded-xl bg-white shadow-sm max-w-md hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M11 7h.01" />
              <path d="M15 7h.01" />
              <path d="M7 11h.01" />
              <path d="M11 11h.01" />
              <path d="M15 11h.01" />
              <path d="M7 15h.01" />
              <path d="M11 15h.01" />
              <path d="M15 15h.01" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">Select a conversation from the inbox</p>
          <Button 
            variant="outline"
            onClick={() => toast("Info", {
              description: "Select a ticket from the left sidebar to view the conversation"
            })}
            className="hover:scale-105 transition-transform duration-200"
          >
            Learn more
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header with hover effects */}
      <div className="flex justify-between items-center p-4 border-b shadow-sm sticky top-0 bg-background z-10">
        <div className="flex items-center space-x-2">
          <h2 className="font-medium">{currentTicket.user.name} {currentTicket.user.company && `- ${currentTicket.user.company}`}</h2>
          {currentTicket.priority === "high" && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full animate-pulse">
              High Priority
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full transition-transform duration-200 hover:scale-110"
            onMouseEnter={() => setHoveredButton("video")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => toast("Video call initiated")}
          >
            <Video className={`w-4 h-4 text-gray-600 ${hoveredButton === "video" ? "text-blue-600" : ""} transition-colors duration-200`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full transition-transform duration-200 hover:scale-110"
            onMouseEnter={() => setHoveredButton("phone")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => toast("Call initiated")}
          >
            <Phone className={`w-4 h-4 text-gray-600 ${hoveredButton === "phone" ? "text-blue-600" : ""} transition-colors duration-200`} />
          </Button>
          {searchOpen ? (
            <div className="relative animate-scale-in">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in conversation..."
                className="px-3 py-1 border rounded-md text-sm w-48 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                autoFocus
              />
              <X 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 hover:scale-125 transition-all duration-200"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full transition-transform duration-200 hover:scale-110"
              onMouseEnter={() => setHoveredButton("search")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => setSearchOpen(true)}
            >
              <Search className={`w-4 h-4 text-gray-600 ${hoveredButton === "search" ? "text-blue-600" : ""} transition-colors duration-200`} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full transition-transform duration-200 hover:scale-110"
            onMouseEnter={() => setHoveredButton("theme")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => {
              document.documentElement.classList.toggle('dark');
              toast("Theme toggled");
            }}
          >
            <Moon className={`w-4 h-4 text-gray-600 ${hoveredButton === "theme" ? "text-blue-600" : ""} transition-colors duration-200`} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full transition-transform duration-200 hover:scale-110"
                onMouseEnter={() => setHoveredButton("more")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <MoreHorizontal className={`w-4 h-4 text-gray-600 ${hoveredButton === "more" ? "text-blue-600" : ""} transition-colors duration-200`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast("Conversation link copied to clipboard");
                }}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <Share className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => toast("Conversation flagged for review")}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <Flag className="mr-2 h-4 w-4" />
                <span>Flag</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  if (!currentNote) {
                    toast("Create a note", {
                      description: "Use the note function in the composer to add a note",
                    });
                  } else {
                    handleRemoveNote();
                  }
                }}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>{currentNote ? "Remove note" : "Manage notes"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toast("This would delete the conversation")}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="destructive" 
            size="sm"
            className="ml-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center shadow-sm hover:scale-105 transition-all duration-200"
            onClick={handleCloseTicket}
          >
            <X className="w-4 h-4 mr-1" />
            Close
          </Button>
        </div>
      </div>
      
      {/* Messages with smooth scrolling */}
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <Message
            key={message.id || index}
            content={message.content}
            sender={message.sender}
            timestamp={message.timestamp}
            seen={message.seen}
          />
        ))}
        
        {currentNote && (
          <div className="mb-4 animate-fade-in">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
              <div 
                className="flex items-center mb-2 cursor-pointer" 
                onClick={toggleNotesVisibility}
              >
                <span className="text-sm font-medium mr-2 flex items-center text-amber-900">
                  <Pencil className="w-4 h-4 mr-1" /> Note
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-amber-900 transform transition-transform duration-300 ${notesExpanded ? "" : "-rotate-90"}`} 
                />
                
                <div className="ml-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 rounded-full hover:bg-amber-100 transition-colors duration-200 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNote();
                    }}
                  >
                    <X className="w-3 h-3 text-amber-900" />
                  </Button>
                </div>
              </div>
              
              {notesExpanded && (
                <div className="animate-fade-in transition-all duration-300 ease-in-out">
                  <h3 className="font-medium mb-2 text-amber-900">{currentNote.title}</h3>
                  <p className="text-sm mb-4 text-amber-800">{currentNote.content}</p>
                  
                  <h4 className="font-medium mb-2 text-amber-900">Summary</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {currentNote.summary.map((item, i) => (
                      <li key={i} className="text-sm text-amber-800">{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* Composer */}
      <MessageComposer />
    </div>
  );
};

export default ConversationPanel;
