import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { Shield, Leaf, Zap, ArrowRight, Check, Users } from "lucide-react";
import { Boxes } from "../../ui/background-boxes";
import { cn } from "../../lib/utils";
import { Begin } from "./Begin";
import LandingPage from "../Landing/Landing";
import img21 from "./21.jpg";
import img22 from "./22.jpg";
import img23 from "./23.jpg";
import ImpactCarousel from "../Home/ImpactCarousel";
import { useNavigate } from "react-router-dom";

// Feature Card Component
const ExtensionFeatureCard = ({
  title,
  feature,
  description,
  category,
  impact,
  image,
  icon: Icon,
  bgColor = "bg-teal-800", // Darker teal background for the card
  link, // Add link to route
}) => {
  return (
    <Link to={link} className="w-full">
      {" "}
      {/* Wrap the card with Link */}
      <div
        className={`bg-teal-800 rounded-xl shadow-lg p-6 flex flex-col w-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      >
        {/* Screenshot Area */}
        <div className="relative h-56 mb-6 rounded-lg overflow-hidden group">
          {image ? (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-teal-700 to-teal-800 flex items-center justify-center">
              <Icon className="w-16 h-16 text-white" />
              <span className="absolute bottom-2 right-2 text-xs text-teal-300">
                Screenshot placeholder
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-950/70" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-xl font-extrabold text-white mb-1">{title}</h4>
            <p className="text-white font-medium">{feature}</p>
          </div>
          <span className="bg-teal-800 p-2 rounded-full text-white hover:bg-teal-700 transition-colors duration-200">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>

        {/* Description */}
        <p className="text-white text-sm font-normal mb-6 flex-grow">
          {description}
        </p>

        {/* Features */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-300" />
            <span className="text-sm text-white font-medium">
              Real-time monitoring
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-300" />
            <span className="text-sm text-white font-medium">
              Community-driven insights
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex justify-between items-center pt-4 border-t border-teal-800/30">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/50 text-white">
            {category}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/50 text-white">
            {impact}
          </span>
        </div>
      </div>
    </Link>
  );
};

// Main Component
const MainContent = () => {
  // Sample data for cards with the added link property
  const features = [
    {
      title: "Green Web Extension",
      feature: "Website Carbon Calculator",
      description:
        "Measure the carbon footprint of websites you visit and get insights into sustainable web practices.",
      category: "Eco Tools",
      impact: "Save Energy",
      icon: Leaf,
      bgColor: "bg-teal-800",
      image: img21, // Replace with your image path
      link: "/shop", // Add link to each feature
    },
    {
      title: "Eco Transportation",
      feature: "Carpooling & Bike Locators",
      description:
        "Find eco-friendly transportation options and connect with others for sustainable travel solutions.",
      category: "Transportation",
      impact: "Reduce Emissions",
      icon: Zap,
      bgColor: "bg-teal-800",
      image: img22, // Replace with your image path
      link: "/transport", // Add link to each feature
    },
    {
      title: "Sustainable Bills",
      feature: "Track & Reduce Bills",
      description:
        "Monitor your energy consumption patterns and receive personalized recommendations for savings.",
      category: "Eco Tools",
      impact: "Save Resources",
      icon: Shield,
      bgColor: "bg-teal-800",
      image: img23, // Replace with your image path
      link: "/groceries", // Add link to each feature
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <LandingPage />
      <section className="flex flex-col items-center justify-center min-h-screen bg-teal-900">
        {/* Hero Section */}

        {/* Earthwise Section */}
        <section
          id="Earthwise"
          className="bg-teal-100 text-teal-900 w-full pt-12 pb-8"
        >
          <div className="flex justify-center mb-6"></div>
          <div className="max-w-6xl mx-auto text-center px-6">
            <h2 className="text-7xl font-extrabold mb-8 bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent tracking-tight">
              Earthwise
            </h2>
            <p className="text-lg leading-relaxed -mb-4 text-teal-800">
              <span className="block text-3xl font-semibold mb-6 text-teal-700">
                Empowering Sustainable Living Through Technology
              </span>
              <span className="font-light leading-8 text-teal-700/90  text-2xl">
                The Eco Lifestyle Analyzer helps users make sustainable choices
                by providing personalized eco-friendly recommendations, tracking
                their carbon footprint, and offering tools like an eco-friendly
                shopping cart analyzer and real-time notifications for
                sustainable events. It also features crowdsourced product
                suggestions, a community leaderboard, and transportation options
                like carpooling and bike locators to promote greener living.
              </span>
            </p>
            {/* Add inverted wave similar to landing page */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "100px" }}
            >
              <svg
                className="absolute w-full transform rotate-180"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
              >
                <path
                  fill="rgba(255,255,255,0.1)"
                  d="M0,160L48,176C96,192,192,224,288,250.7C384,277,480,299,576,288C672,277,768,235,864,208C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
              </svg>
            </div>

            {/* Feature Cards */}
            <div className="flex justify-center gap-8 mb-24 w-full">
              {features.map((feature, index) => (
                <ExtensionFeatureCard key={index} {...feature} />
              ))}
            </div>

            {/* Signup Section */}
            <section
              id="join-us"
              className="w-full max-w-2xl mx-auto bg-gradient-to-br from-teal-950 via-teal-900 to-teal-950 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300 mb-16"
            >
              <h3 className="text-2xl font-semibold text-white text-center mb-6">
                Join the Earthwise Community
              </h3>
              <div className="flex flex-col gap-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-3 rounded-lg border border-teal-300/30 bg-white/10 text-teal-100 placeholder-teal-200 focus:outline-none focus:border-teal-500 transition-all"
                />
                <button
                  className="px-8 py-3 bg-teal-800 hover:bg-teal-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => navigate("/home")}
                >
                  Sign Up
                </button>
              </div>
            </section>
          </div>
        </section>

        {/* <div>
          <ImpactCarousel />{" "}
        </div> */}

        {/* Footer Section */}
        <footer className="bg-teal-950 text-teal-100 py-8">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p className="text-sm">&copy; 2024 EMA. All rights reserved.</p>
            <ul className="flex space-x-6">
              <li>
                <a href="#Earthwise" className="hover:text-teal-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#Earthwise" className="hover:text-teal-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#join-us" className="hover:text-teal-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </section>
    </>
  );
};

export default MainContent;
