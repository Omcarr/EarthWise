import React, { useState } from "react";
import {
  Home,
  Smartphone,
  Shield,
  Wheat,
  Users,
  PieChart,
  LogOut,
  Star,
  Gem,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", route: "/" },
    { icon: Wheat, label: "Groceries", route: "/groceries" },
    { icon: Zap, label: "Electricity", route: "/electricity" },
    { icon: Users, label: "Transport", route: "/transport" },
    { icon: Gem, label: "Thrift Shop", route: "/thrift" },
    { icon: Star, label: "Rewards", route: "/rewards" },
    { icon: LogOut, label: "Logout", route: "/" },
  ];

  const handleClick = (route, label) => {
    setActiveItem(label); // Set active button
    navigate(route); // Navigate to the route
  };

  return (
    <div className="flex h-screen fixed l-0 z-20">
      {/* Sidebar */}
      <div className="w-24 bg-teal-600 text-white flex flex-col p-3">
        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                handleClick(item.route, item.label);
                setActiveItem(item.label);
              }}
              className={`
                flex flex-col items-center justify-center p-3 
                rounded-lg transition-all duration-200
                ${
                  activeItem === item.label
                    ? "bg-teal-800 shadow-lg scale-105"
                    : "hover:bg-teal-900"
                }
              `}
            >
              <item.icon
                size={24}
                className={`
                  ${activeItem === item.label ? "text-white" : "text-blue-100"}
                `}
              />
              <span
                className={`
                  text-xs mt-2 font-medium
                  ${activeItem === item.label ? "text-white" : "text-blue-100"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
