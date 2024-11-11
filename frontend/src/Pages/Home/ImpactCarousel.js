import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";

const ImpactCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const impacts = [
    {
      title: "Carbon Reduction",
      description:
        "Our community reduced carbon emissions by 50,000 kg through sustainable transportation choices",
      stat: "50,000 kg CO₂",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Energy Savings",
      description:
        "Members saved 75,000 kWh of electricity through energy-efficient practices",
      stat: "75,000 kWh",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Waste Prevention",
      description:
        "Together we prevented 10,000 kg of plastic waste through eco-shopping initiatives",
      stat: "10,000 kg",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Community Growth",
      description:
        "Over 5,000 members joined our sustainable lifestyle movement this year",
      stat: "5,000+ Members",
      image: "/api/placeholder/600/400",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === impacts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? impacts.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-teal-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-800 text-center mb-8">
          Our Positive Impact
        </h2>

        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {impacts.map((impact, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-4 bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/2">
                          <img
                            src={impact.image}
                            alt={impact.title}
                            className="rounded-lg w-full h-64 object-cover"
                          />
                        </div>
                        <div className="w-full md:w-1/2 space-y-4">
                          <h3 className="text-2xl font-bold text-teal-700">
                            {impact.title}
                          </h3>
                          <p className="text-4xl font-bold text-teal-600">
                            {impact.stat}
                          </p>
                          <p className="text-gray-600 text-lg">
                            {impact.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-teal-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-teal-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-teal-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-teal-700" />
          </button>

          <div className="flex justify-center mt-4 gap-2">
            {impacts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-teal-600" : "bg-teal-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCarousel;
