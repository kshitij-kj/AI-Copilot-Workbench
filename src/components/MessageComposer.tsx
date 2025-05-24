
import React, { useState, useRef } from "react";
import { ArrowUp, Bold, Italic, Code, Link as LinkIcon, ChevronDown, Paperclip, Smile, Zap, Pen } from "lucide-react";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MessageComposer: React.FC = () => {
  const { composerContent, setComposerContent, addMessage, createNote } = useAdminPanel();
  const [isFocused, setIsFocused] = useState(false);
  const [messageType, setMessageType] = useState<"chat" | "note">("chat");
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [noteTitle, setNoteTitle] = useState("Question");
  const [noteContent, setNoteContent] = useState("");

  const handleSend = () => {
    if (!composerContent.trim()) return;
    
    if (messageType === "chat") {
      addMessage({
        content: composerContent,
        sender: "agent",
        timestamp: "now",
        seen: false
      });
    } else if (messageType === "note") {
      createNote();
      toast("Note added to conversation");
    }
    
    setComposerContent("");
    setNoteContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const quickResponses = [
    "Thanks for reaching out! I'll look into this right away.",
    "I understand your concern. Let me check this for you.",
    "Could you please provide more details about this issue?",
    "We'll resolve this as soon as possible. Thank you for your patience.",
    "I'll need to check with my team and get back to you shortly."
  ];

  const toneOptions = [
    { label: "Professional", description: "Formal and business-appropriate" },
    { label: "Friendly", description: "Warm and conversational" },
    { label: "Empathetic", description: "Understanding and compassionate" },
    { label: "Direct", description: "Straightforward and concise" },
    { label: "Technical", description: "Detailed and precise" }
  ];

  const changeTone = (tone: string) => {
    toast(`Converting to ${tone} tone...`);
    
    // Simulate AI processing
    setTimeout(() => {
      switch(tone) {
        case "Professional":
          setComposerContent("We appreciate your inquiry. Upon review, we can confirm that your request has been received and is being processed according to our standard procedures.");
          break;
        case "Friendly":
          setComposerContent("Hey there! Thanks so much for reaching out! We've got your message and we're on it - we'll get back to you super soon!");
          break;
        case "Empathetic":
          setComposerContent("I understand this situation must be frustrating for you. I want you to know we're here to help and will work with you to find the best solution for your needs.");
          break;
        case "Direct":
          setComposerContent("Your request is received. We'll process it within 24 hours and notify you when complete.");
          break;
        case "Technical":
          setComposerContent("Ticket #45721 has been logged in our system. Initial diagnostic shows compatibility with protocol requirements. Proceeding with standard resolution pathway per section 3.2 of operations manual.");
          break;
        default:
          // Keep content as is
      }
      
      toast.success(`Message tone changed to ${tone}`, {
        description: "AI has rewritten your message"
      });
    }, 800);
  };

  const addEmoji = (emoji: string) => {
    setComposerContent(composerContent + emoji);
  };

  return (
    <div className="border-t p-3 animate-slide-in-right">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:text-gray-800 transition-colors">
            <span className="flex items-center">
              {messageType === "chat" ? (
                <><span className="mr-1">💬</span>Chat</>
              ) : (
                <><span className="mr-1">📝</span>Note</>
              )}
            </span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setMessageType("chat")} className="cursor-pointer hover:scale-105 transition-transform">
              <span className="mr-2">💬</span> Chat {messageType === "chat" && "(current)"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMessageType("note")} className="cursor-pointer hover:scale-105 transition-transform">
              <span className="mr-2">📝</span> Note
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        Use ⌘K for shortcuts
      </div>
      
      {messageType === "chat" ? (
        <div className={`border rounded-xl transition-all ${isFocused ? "shadow-md" : ""} hover:shadow-sm`}>
          <div className={`${isFocused ? "block" : "hidden"} flex items-center space-x-4 p-2 border-b animate-fade-in`}>
            <Button variant="ghost" size="sm" className="px-2 h-8 rounded-md hover:scale-110 transition-transform">
              <Bold className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 h-8 rounded-md hover:scale-110 transition-transform">
              <Italic className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 h-8 rounded-md hover:scale-110 transition-transform">
              <Code className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 h-8 rounded-md hover:scale-110 transition-transform">
              <LinkIcon className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800" />
            </Button>
            <div className="ml-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-dashed flex items-center gap-1 hover:scale-105 transition-transform">
                    <span>Change tone</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0" align="end">
                  <div className="p-2 text-sm font-medium border-b">Select message tone</div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {toneOptions.map((tone) => (
                      <div 
                        key={tone.label} 
                        className="flex flex-col p-2 hover:bg-gray-100 cursor-pointer transition-colors hover:scale-[1.01] transform"
                        onClick={() => changeTone(tone.label)}
                      >
                        <div className="font-medium">{tone.label}</div>
                        <div className="text-xs text-gray-400">{tone.description}</div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex">
            <textarea
              value={composerContent}
              onChange={(e) => setComposerContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              className="flex-1 p-3 resize-none outline-none min-h-[80px] rounded-xl"
              rows={3}
            />
          </div>
          
          <div className="flex justify-between items-center p-2 border-t">
            <div className="flex space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-2 h-8 rounded-full hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <div className="p-2 text-sm font-medium">Quick Responses</div>
                  {quickResponses.map((response, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onClick={() => setComposerContent(response)}
                      className="py-2 hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      {response}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="sm" className="px-2 h-8 rounded-full hover:scale-110 transition-transform" onClick={handleFileUpload}>
                <Paperclip className="w-4 h-4 text-gray-500" />
                <input 
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => console.log("File selected:", e.target.files)}
                />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-2 h-8 rounded-full hover:scale-110 transition-transform">
                    <Smile className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <div className="p-2 grid grid-cols-7 gap-2">
                    {["😊", "👍", "😂", "❤️", "👏", "🙌", "🎉", "😎", "🤔", "😢", "😡", "🙏", "🔥", "✨"].map(emoji => (
                      <button 
                        key={emoji} 
                        className="text-xl hover:bg-gray-100 p-1 rounded hover:scale-125 transition-transform"
                        onClick={() => addEmoji(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    onClick={composerContent.trim() ? handleSend : undefined}
                    disabled={!composerContent.trim()}
                    className={`flex items-center hover:bg-gray-200 rounded-lg px-4 py-2 ${!composerContent.trim() && "opacity-50 cursor-not-allowed"} hover:scale-105 transition-transform`}
                    variant="secondary"
                  >
                    <span className="mr-1">Send</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSend} className="cursor-pointer hover:scale-105 transition-transform">
                    Send now
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:scale-105 transition-transform">
                    Schedule send
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl shadow-sm transition-all hover:shadow-md animate-fade-in hover:scale-[1.01] duration-300">
          <div className="flex items-center mb-3">
            <Pen className="w-4 h-4 mr-2" />
            <input 
              type="text" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title"
              className="bg-transparent border-none outline-none font-medium"
            />
          </div>
          
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full bg-transparent border-none resize-none outline-none min-h-[100px]"
            onFocus={() => setIsNoteFocused(true)}
            onBlur={() => setIsNoteFocused(false)}
          />
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-amber-200">
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-1 h-8 rounded-md text-amber-700 hover:scale-110 transition-transform">
                <Zap className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-8 rounded-md text-amber-700 hover:scale-110 transition-transform">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-8 rounded-md text-amber-700 hover:scale-110 transition-transform">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={() => {
                createNote();
                toast("Note added to conversation");
                setMessageType("chat");
              }}
              variant="outline"
              className="bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-900 hover:scale-105 transition-transform"
            >
              Add note
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageComposer;
