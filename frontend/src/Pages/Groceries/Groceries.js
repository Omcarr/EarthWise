import React from "react";
import FileUploadDemo from "../../ui/FileUploadBox";
import { Upload } from "lucide-react";
import { useState } from "react";

const Groceries = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    setSelectedFile(true);
    console.log(selectedFile);
  };
  // Hardcoded data for demonstration
  const foodAnalysis = {
    healthyItems: [
      { item: "Apples", score: "90%" },
      { item: "Spinach", score: "85%" },
      { item: "Carrots", score: "80%" },
    ],
    unhealthyItems: [
      { item: "Soda", score: "30%" },
      { item: "Chips", score: "40%" },
    ],
    alternatives: [
      { unhealthyItem: "Soda", alternative: "Sparkling Water" },
      { unhealthyItem: "Chips", alternative: "Baked Veggie Chips" },
    ],
    comments:
      "Consider replacing high-sugar drinks with water or natural juices, and avoid processed snacks with high sodium.",
    products: [
      {
        name: "Badam lea",
        quantity: 38,
        price: 9.06,
        eco_rating: 4,
        comment:
          "Assuming 'Badam lea' refers to almond milk or almond products, it's generally considered environmentally friendly, but almond cultivation can have water usage concerns. Look for almond milk from brands that prioritize sustainable farming practices and water conservation.",
      },
      {
        name: "Myscre Sandal Soap Gold",
        quantity: 12,
        price: 5.0,
        eco_rating: 4,
        comment:
          "Sandalwood soap can be eco-friendly, especially if made with natural ingredients and minimal packaging. However, sandalwood itself can have deforestation concerns. Consider soaps made with sustainable sandalwood or alternative natural ingredients like coconut oil.",
      },
    ],
  };

  return (
    <div className="pl-14">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-center text-white py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-6xl font-extrabold mb-4">
              Food Safety Dashboard
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Upload your grocery bill to analyze the safety and healthiness of
              your food items. Get insights and suggestions for a healthier
              diet.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="container mx-auto px-6 -mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg flex items-center flex-col border border-teal-300">
            <Upload className="h-14 w-14 text-teal-700 mb-4" />
            <h2 className="text-3xl font-semibold text-teal-900 mb-2 text-center">
              Upload Your Grocery Bill
            </h2>
            <p className="text-teal-600 mb-6 text-center">
              Drag and drop your file or click to browse
            </p>
            <FileUploadDemo />
          </div>
        </div>

        <div className="w-full">
          <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center">
            {/* <Upload className="mx-auto h-12 w-12 text-teal-500 mb-4" /> */}
            {/* <input
                type="file"
                className="w-full mb-4"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              /> */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="rounded-full px-8 py-2 bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {selectedFile && (
          <>
            <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg">
              <div className="flex space-x-6">
                {/* Left Card - Healthy/Unhealthy Items */}
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8 border border-teal-200">
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">
                    Health Score Analysis
                  </h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-green-600 mb-2">
                      Healthy Items
                    </h4>
                    <ul className="list-disc ml-5">
                      {foodAnalysis.healthyItems.map((item, index) => (
                        <li key={index} className="text-teal-800">
                          {item.item} - {item.score}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-2">
                      Unhealthy Items
                    </h4>
                    <ul className="list-disc ml-5">
                      {foodAnalysis.unhealthyItems.map((item, index) => (
                        <li key={index} className="text-teal-800">
                          {item.item} - {item.score}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Card - Alternatives */}
                <div className="w-1/2 bg-white rounded-lg shadow-lg p-8 border border-teal-200">
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">
                    Healthier Alternatives
                  </h3>
                  <ul className="list-disc ml-5">
                    {foodAnalysis.alternatives.map((alternative, index) => (
                      <li key={index} className="text-teal-800">
                        {alternative.unhealthyItem} - Try:{" "}
                        {alternative.alternative}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="container mx-auto px-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-teal-300 p-8">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">
                  Expert Comments
                </h3>
                <p className="text-teal-800">{foodAnalysis.comments}</p>
              </div>
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8 border border-teal-300">
                <h3 className="text-xl font-semibold text-teal-800 mb-4">
                  Product Sustainability Analysis
                </h3>
                <ul className="list-disc ml-5">
                  {foodAnalysis.products.map((product, index) => (
                    <li key={index} className="text-teal-800 mb-4">
                      <strong>{product.name}</strong> (Quantity:{" "}
                      {product.quantity}, Price: ${product.price})
                      <div>Eco Rating: {product.eco_rating}/5</div>
                      <p>{product.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Groceries;
