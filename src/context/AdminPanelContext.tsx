import React, { createContext, useContext, useState, ReactNode } from "react";

interface Ticket {
  id: string;
  user: {
    name: string;
    company?: string;
  };
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  avatar?: string;
  priority?: string;
  resolved?: boolean;
  flagged?: boolean;
  assignedToMe?: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "customer" | "agent" | "ai" | "note";
  timestamp: string;
  seen?: boolean;
}

interface Order {
  id: string;
  items: string[];
  date: string;
  total: string;
  status: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  timeAgo: string;
  type: "Public article" | "Conversation" | "Summary";
}

interface AdminPanelContextType {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  messages: Message[];
  aiSuggestions: Article[];
  relevantSources: Article[];
  selectedTab: "ai-copilot" | "details";
  composerContent: string;
  order: Order | null;
  activeFilter: string;
  currentNote: {
    title: string;
    content: string;
    summary: string[];
  } | null;
  showArticlePopup: boolean;
  selectedArticle: Article | null;
  
  // Actions
  setCurrentTicket: (ticket: Ticket | null) => void;
  addMessage: (message: Omit<Message, "id">) => void;
  setSelectedTab: (tab: "ai-copilot" | "details") => void;
  setComposerContent: (content: string) => void;
  setActiveFilter: (filter: string) => void;
  addToComposer: (content: string) => void;
  toggleArticlePopup: (show: boolean, article?: Article | null) => void;
  createNote: () => void;
  setCurrentNote: (note: {title: string; content: string; summary: string[]} | null) => void;
}

const AdminPanelContext = createContext<AdminPanelContextType | undefined>(undefined);

export const AdminPanelProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      user: { name: "Luis", company: "Github" },
      subject: "Refund Request",
      preview: "Hey! I have a question...",
      time: "45m",
      unread: true,
      priority: "high",
      resolved: false,
      flagged: false,
      assignedToMe: true
    },
    {
      id: "2",
      user: { name: "Ivan", company: "Nike" },
      subject: "Order Issue",
      preview: "Hi there, I have a question...",
      time: "30m",
      resolved: false
    },
    {
      id: "3",
      user: { name: "Lead", company: "New York" },
      subject: "Account Access",
      preview: "Good morning, let me...",
      time: "40m",
      unread: true,
      resolved: false
    },
    {
      id: "4",
      user: { name: "Luis", company: "Small Crafts" },
      subject: "Booking API problems",
      preview: "Bug report",
      time: "45m",
      resolved: false
    },
    {
      id: "5",
      user: { name: "Miracle", company: "Exemplary Bank" },
      subject: "Payment Issue",
      preview: "Hey there, I'm here to...",
      time: "45m",
      resolved: false
    }
  ]);

  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(tickets[0]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
      sender: "customer",
      timestamp: "1min",
      seen: true
    },
    {
      id: "2",
      content: "Let me just look into this for you, Luis.",
      sender: "agent",
      timestamp: "1min",
      seen: true
    }
  ]);
  
  const [aiSuggestions] = useState<Article[]>([
    {
      id: "1",
      title: "Getting a refund",
      content: "We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. This guide outlines the simple steps to help you navigate the refund process and ensure a smooth resolution to your concern.",
      author: "Amy Adams",
      timeAgo: "1d ago",
      type: "Public article"
    }
  ]);

  const [relevantSources] = useState<Article[]>([
    {
      id: "1",
      title: "Getting a refund",
      content: "",
      author: "",
      timeAgo: "",
      type: "Public article"
    },
    {
      id: "2",
      title: "Refund for an order placed by mistake",
      content: "",
      author: "",
      timeAgo: "",
      type: "Public article"
    },
    {
      id: "3",
      title: "Refund for an unwanted gift",
      content: "Unfortunately, we're only able to process refunds for orders that were placed within the last 60 days. Your order was placed well past the cut off date.",
      author: "Theresa Eds",
      timeAgo: "3d ago",
      type: "Conversation"
    }
  ]);

  const [order] = useState<Order>({
    id: "ORD-12345",
    items: ["Product ABC", "Product XYZ"],
    date: "November 15, 2024",
    total: "$129.99",
    status: "Delivered"
  });

  const [selectedTab, setSelectedTab] = useState<"ai-copilot" | "details">("ai-copilot");
  const [composerContent, setComposerContent] = useState("");
  const [activeFilter, setActiveFilter] = useState("Waiting longest");
  const [showArticlePopup, setShowArticlePopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentNote, setCurrentNote] = useState<{title: string; content: string; summary: string[]} | null>(null);

  const addMessage = (message: Omit<Message, "id">) => {
    const newMessage = { ...message, id: `msg-${Date.now()}` };
    setMessages([...messages, newMessage]);
  };

  const addToComposer = (content: string) => {
    setComposerContent(prev => {
      if (prev) return `${prev}\n\n${content}`;
      return content;
    });
  };

  const toggleArticlePopup = (show: boolean, article: Article | null = null) => {
    setShowArticlePopup(show);
    setSelectedArticle(article);
  };

  const createNote = () => {
    setCurrentNote({
      title: "Question",
      content: "The customer contacted us to request a refund for an unopened product purchased as a Christmas gift.",
      summary: [
        "Customer bought a product in November as a Christmas gift, but it was not needed.",
        "Customer wants a refund for the unopened product.",
        "Teammate asks for product name, purchase location, and email.",
        "Teammate informs customer that refunds are only available for orders that were placed within 60 days and must meet return condition requirements.",
        "Customer's order was placed over 60 days ago, but they request an exception."
      ]
    });
  };

  const value = {
    tickets,
    currentTicket,
    messages,
    aiSuggestions,
    relevantSources,
    selectedTab,
    composerContent,
    order,
    activeFilter,
    currentNote,
    showArticlePopup,
    selectedArticle,
    
    setCurrentTicket,
    addMessage,
    setSelectedTab,
    setComposerContent,
    setActiveFilter,
    addToComposer,
    toggleArticlePopup,
    createNote,
    setCurrentNote,
  };

  return (
    <AdminPanelContext.Provider value={value}>
      {children}
    </AdminPanelContext.Provider>
  );
};

export const useAdminPanel = () => {
  const context = useContext(AdminPanelContext);
  if (context === undefined) {
    throw new Error('useAdminPanel must be used within an AdminPanelProvider');
  }
  return context;
};
