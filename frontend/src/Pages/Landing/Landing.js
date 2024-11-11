import React, { useEffect, useState } from "react";
import FlipNumbers from "react-flip-numbers";
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import logo from "../../assests/logo1.png";

const RotatingGlobe = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto">
      <g transform={`rotate(${rotation}, 200, 100)`}>
        {/* Globe lines */}
        <path
          d="M 50,100 A 150,75 0 1,1 350,100 A 150,75 0 1,1 50,100"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />
        <path
          d="M 50,100 A 150,75 0 1,0 350,100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M 120,80 Q 160,70 200,75 Q 240,80 280,70"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M 150,90 Q 200,100 250,95"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M 170,110 Q 200,115 230,110"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

const LandingPage = () => {
  const [familiesConnected, setFamiliesConnected] = useState(10000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFamiliesConnected((prev) => prev + Math.floor(Math.random() * 10 + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-700">
      {/* Navigation */}
      <nav className="bg-teal-800 px-6 py-4">
        {" "}
        {/* Dark teal shade */}
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="description" className="h-12" />
            <span className="text-white text-2xl font-bold">Earthwise</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#Earthwise"
              className="text-gray-300 hover:text-white text-xl transition-colors"
            >
              About Us
            </a>
            <a
              href="#Earthwise"
              className="text-gray-300 hover:text-white text-xl transition-colors"
            >
              Features
            </a>
          </div>

          {/* Social Icons and Login/Signup */}
          <div className="flex items-center space-x-4">
            <Instagram className="w-5 h-5 text-white cursor-pointer" />
            <Youtube className="w-5 h-5 text-white cursor-pointer" />
            <Facebook className="w-5 h-5 text-white cursor-pointer" />
            <Twitter className="w-5 h-5 text-white cursor-pointer" />
            <button
              onClick={() =>
                document
                  .getElementById("join-us")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ml-4"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-6">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-12">
          <div className="space-y-6 flex flex-row justify-center items-center">
            <img src={logo} alt="description" className="h-40 w-auto" />
            <h1 className="text-white text-8xl font-bold">Earthwise</h1>
          </div>
          <div className="space-y-4">
            <h2 className="text-white text-4xl font-semibold leading-tight">
              Make every choice count. Track your Eco-Impact.
              <br />
              Earn EcoBadges and discover smarter greener alternatives - all in
              one place
            </h2>
          </div>

          {/* Flipping Counter for Families Connected */}
          <div className="mt-10 text-white text-xl font-bold">
            <p>Number of Families Impacted</p>
            <div className="flex justify-center space-x-2 mt-4">
              {familiesConnected
                .toString()
                .split("")
                .map((digit, index) => (
                  <div
                    key={index}
                    className="w-16 h-24 flex items-center justify-center bg-transparent p-4 rounded-lg"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <FlipNumbers
                      height={90}
                      width={60}
                      color="white"
                      background="transparent"
                      play
                      perspective={900}
                      numbers={digit}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.1)"
            d="M0,160L48,176C96,192,192,224,288,250.7C384,277,480,299,576,288C672,277,768,235,864,208C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values="
                M0,160L48,176C96,192,192,224,288,250.7C384,277,480,299,576,288C672,277,768,235,864,208C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;

                M0,130L48,150C96,170,192,200,288,230.7C384,260,480,280,576,270C672,260,768,210,864,180C960,150,1056,130,1152,140C1248,150,1344,180,1392,200.3L1440,220L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;

                M0,140L48,160C96,180,192,210,288,240.7C384,270,480,290,576,280C672,270,768,230,864,210C960,190,1056,180,1152,190C1248,200,1344,230,1392,250.3L1440,260L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
