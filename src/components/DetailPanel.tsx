
import React, { useState } from "react";
import { PlusCircle, ChevronDown, ChevronUp, User, Users, Link, Package, Calendar, DollarSign, MapPin, Phone, Mail, Edit3, Star, Clock, CheckCircle } from "lucide-react";
import { useAdminPanel } from "@/context/AdminPanelContext";
import { Button } from "./ui/button";

const DetailPanel: React.FC = () => {
  const { order } = useAdminPanel();
  const [expandedSections, setExpandedSections] = useState({
    links: false,
    orderInfo: true,
    userData: false,
    conversationAttrs: false,
    companyDetails: false
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [assignee, setAssignee] = useState("Brian Byrne");
  const [team, setTeam] = useState("Unassigned");

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleAssigneeChange = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-4 h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
      {/* Header with floating effect */}
      <div className="mb-6 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Assignee
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAssigneeChange}
            className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Brian Byrne" 
              className="w-8 h-8 rounded-full mr-3 border-2 border-blue-200 hover:border-blue-400 transition-colors" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="text-sm border rounded px-2 py-1 flex-1"
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <div>
              <span className="font-medium">{assignee}</span>
              <div className="flex items-center mt-1">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-xs text-gray-500">Top performer</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-6 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700 flex items-center">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            Team
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{team}</span>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
          >
            Assign Team
          </Button>
        </div>
      </div>

      {/* Links Section */}
      <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection('links')}
        >
          <h3 className="font-semibold text-gray-700 flex items-center">
            <Link className="w-4 h-4 mr-2 text-green-500" />
            LINKS
          </h3>
          {expandedSections.links ? 
            <ChevronUp className="w-4 h-4 text-gray-400 transition-transform" /> : 
            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform" />
          }
        </div>
        
        {expandedSections.links && (
          <div className="px-4 pb-4 space-y-3 animate-fade-in">
            {[
              { icon: Package, label: "Tracker ticket", color: "text-blue-500" },
              { icon: Package, label: "Back-office tickets", color: "text-orange-500" },
              { icon: Link, label: "Side conversations", color: "text-green-500" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <div className="flex items-center">
                  <item.icon className={`w-4 h-4 mr-3 ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                <PlusCircle className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors cursor-pointer" />
              </div>
            ))}
          </div>
        )}
      </div>

      {order && (
        <>
          {/* Order Information */}
          <div className="mb-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => toggleSection('orderInfo')}
            >
              <h3 className="font-semibold text-gray-700 flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-500" />
                ORDER INFORMATION
              </h3>
              {expandedSections.orderInfo ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            
            {expandedSections.orderInfo && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-blue-500 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500 block">Order ID</span>
                          <p className="font-medium text-sm">{order.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-green-500 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500 block">Date</span>
                          <p className="font-medium text-sm">{order.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-yellow-500 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500 block">Total</span>
                          <p className="font-medium text-sm">{order.total}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <div>
                          <span className="text-xs text-gray-500 block">Status</span>
                          <p className="font-medium text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 block mb-2">Items</span>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                          <Package className="w-3 h-3 text-gray-400 mr-2" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* User Data Section */}
          <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('userData')}
            >
              <h3 className="font-semibold text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2 text-purple-500" />
                USER DATA
              </h3>
              {expandedSections.userData ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            
            {expandedSections.userData && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-purple-500 mr-2" />
                      <div>
                        <span className="text-xs text-gray-500 block">Email</span>
                        <p className="text-sm font-medium">luis@github.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-green-500 mr-2" />
                      <div>
                        <span className="text-xs text-gray-500 block">Phone</span>
                        <p className="text-sm font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-red-500 mr-2" />
                      <div>
                        <span className="text-xs text-gray-500 block">Location</span>
                        <p className="text-sm font-medium">San Francisco, CA</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <span className="text-xs text-gray-500 block">Customer Since</span>
                        <p className="text-sm font-medium">March 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Conversation Attributes */}
          <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('conversationAttrs')}
            >
              <h3 className="font-semibold text-gray-700">CONVERSATION ATTRIBUTES</h3>
              {expandedSections.conversationAttrs ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            
            {expandedSections.conversationAttrs && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Priority</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Refund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Source</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Email</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Company Details */}
          <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('companyDetails')}
            >
              <h3 className="font-semibold text-gray-700">COMPANY DETAILS</h3>
              {expandedSections.companyDetails ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            
            {expandedSections.companyDetails && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">GH</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">GitHub</h4>
                      <p className="text-xs text-gray-500">Technology Company</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Plan</span>
                      <span className="text-xs font-medium">Enterprise</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Account Value</span>
                      <span className="text-xs font-medium text-green-600">$50,000/year</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPanel;
