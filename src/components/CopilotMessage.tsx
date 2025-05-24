
import React from "react";
import { Check, ChevronDown, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface CopilotMessageProps {
  content: string;
  hasActions?: boolean;
  sources?: { id: string; title: string; type: string }[];
  numbered?: boolean;
}

const CopilotMessage: React.FC<CopilotMessageProps> = ({
  content,
  hasActions = true,
  sources = [],
  numbered = false
}) => {
  const { addToComposer, toggleArticlePopup, relevantSources } = useAdminPanel();
  
  const handleAddToComposer = () => {
    addToComposer(content);
  };

  const handleViewSource = (sourceId: string) => {
    const article = relevantSources.find(source => source.id === sourceId);
    if (article) {
      toggleArticlePopup(true, article);
    }
  };

  return (
    <div className="flex mb-6 animate-fade-in hover-scale">
      <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-md flex items-center justify-center mr-2">
        <span role="img" aria-label="AI">🤖</span>
      </div>
      
      <div className="flex flex-col w-full">
        <div className="font-medium mb-1">Fin</div>
        
        <div className={cn(
          "bg-purple-200 bg-opacity-50 text-gray-800 rounded-2xl py-3 px-4",
          numbered && "relative",
          "shadow-sm"
        )}>
          {numbered && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
              1
            </div>
          )}
          {content}
        </div>
        
        {hasActions && (
          <div className="flex justify-end mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  onClick={handleAddToComposer}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors shadow-sm hover-scale"
                  variant="outline"
                >
                  <Check className="w-4 h-4" />
                  <span>Add to composer</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleAddToComposer}>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Add as is</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addToComposer(`I think: ${content}`)}>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add with prefix</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {sources && sources.length > 0 && (
          <div className="mt-3 animate-slide-in-right">
            <div className="text-sm text-gray-500 mb-2">{sources.length} relevant sources found</div>
            <div className="space-y-2">
              {sources.map(source => (
                <div 
                  key={source.id}
                  onClick={() => handleViewSource(source.id)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <span className={source.type === "Public article" ? "text-gray-500" : "text-blue-500"}>
                    {source.type === "Public article" ? "📄" : "💬"}
                  </span>
                  <span>{source.title}</span>
                </div>
              ))}
            </div>
            {sources.length > 3 && (
              <div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline flex items-center">
                <span>See all</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CopilotMessage;
