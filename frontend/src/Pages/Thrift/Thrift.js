import React, { useState } from "react";
import { Book, ShoppingBag, Shirt, GraduationCap } from "lucide-react";

const driveData = [
  {
    id: 1,
    title: "Food Drive",
    description: "Donate non-perishable food to help fight hunger.",
    details:
      "We are collecting non-perishable food items like canned vegetables, rice, and pasta. Your donations will directly support local food banks.",
    date: "Ongoing",
    location: "Multiple Collection Points",
    contact: "foodrive@example.com",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Clothes Drive by RC",
    description: "Donate gently used clothes to those in need.",
    details:
      "Donate your gently used clothes to help provide warmth and dignity to those in need. All sizes accepted.",
    date: "February 15-28, 2024",
    location: "Community Center",
    contact: "clothesdrive@example.com",
    icon: Shirt,
  },
  {
    id: 3,
    title: "School Supplies Drive",
    description: "Equip students with essential school supplies.",
    details:
      "Donate new school supplies like notebooks, pencils, and backpacks to help students succeed in the upcoming school year.",
    date: "July 15-31, 2024",
    location: "Education Center",
    contact: "schooldrive@example.com",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Book Drive",
    description: "Donate books to promote literacy.",
    details:
      "Donate your gently used books to help build libraries in underserved communities. We accept books for all ages.",
    date: "March 1-15, 2024",
    location: "City Library",
    contact: "bookdrive@example.com",
    icon: Book,
  },
];

const DonationDrive = () => {
  const [selectedDrive, setSelectedDrive] = useState(driveData[0]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden ml-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
          <h1 className="text-6xl font-bold text-teal-950 text-center mb-4">
            Make a Difference
          </h1>
          <p className="text-xl text-teal-600 text-center mb-16">
            Choose your way to contribute to the community
          </p>

          {/* Navigation Pills */}
          <div className="flex justify-center gap-6 mb-16">
            {driveData.map((drive) => {
              const Icon = drive.icon;
              const isSelected = selectedDrive.id === drive.id;
              return (
                <button
                  key={drive.id}
                  onClick={() => setSelectedDrive(drive)}
                  className={`group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-500 ${
                    isSelected
                      ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white transform -translate-y-2"
                      : "bg-white text-teal-800 hover:bg-teal-50"
                  } shadow-lg hover:shadow-xl`}
                >
                  <div
                    className={`p-4 rounded-xl mb-3 ${
                      isSelected
                        ? "bg-white/20"
                        : "bg-teal-100 group-hover:bg-teal-200"
                    }`}
                  >
                    <Icon size={32} />
                  </div>
                  <span className="font-semibold text-lg">{drive.title}</span>
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-600 rotate-45" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-2 gap-8">
          {driveData.map((drive) => {
            const Icon = drive.icon;
            const isSelected = selectedDrive.id === drive.id;
            return (
              <div
                key={drive.id}
                className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-teal-50 to-emerald-50 shadow-xl scale-105 z-10"
                    : "bg-white shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Decorative background circle */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 rounded-full transition-all duration-500 ${
                    isSelected
                      ? "bg-teal-100/50 -translate-y-1/4 translate-x-1/4"
                      : "bg-emerald-50 group-hover:bg-teal-50"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div
                      className={`p-4 rounded-2xl transition-colors duration-300 ${
                        isSelected
                          ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"
                          : "bg-teal-100 text-teal-600 group-hover:bg-teal-200"
                      }`}
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-950">
                      {drive.title}
                    </h3>
                  </div>

                  <div
                    className={`space-y-6 transition-all duration-300 ${
                      isSelected ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <p className="text-lg text-teal-800">{drive.description}</p>
                    {isSelected && (
                      <>
                        <p className="text-teal-700">{drive.details}</p>
                        <div className="space-y-4 pt-4 border-t border-teal-200">
                          <p className="flex items-center text-teal-700">
                            <span className="font-semibold min-w-24">
                              Date:
                            </span>
                            {drive.date}
                          </p>
                          <p className="flex items-center text-teal-700">
                            <span className="font-semibold min-w-24">
                              Location:
                            </span>
                            {drive.location}
                          </p>
                          <p className="flex items-center text-teal-700">
                            <span className="font-semibold min-w-24">
                              Contact:
                            </span>
                            {drive.contact}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonationDrive;
