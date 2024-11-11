import React, { useEffect, useState } from "react";
import { ShoppingCart, User, ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom"; // To extract query parameters
import axios from "axios"; // Import axios for API calls

// /?product_name=Colgate%20Gentle%20Sensitive%20Care%20Ultra%20Soft%20Bristles%20Manual%20Toothbrush%20For%20Adult%20Combo%20Pack%20Offer%2CMulticolor-%205Pcs

// ShoppingItem component to display individual products
const ShoppingItem = ({ product }) => {
  return (
    <div className="bg-teal-800 rounded-xl shadow-md p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={`http://127.0.0.1:8000/${product.image}`}
        alt={product.name}
        className="w-40 h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
      <p className="text-teal-200 text-sm mb-4">{product.description}</p>
      <p className="text-lg font-bold text-white mb-4">{product.price}</p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all"
      >
        Explore Alternative
        <ExternalLink className="ml-2 w-4 h-4" />
      </a>
    </div>
  );
};

// Main component to fetch API data and render product with eco alternatives
const EcoShop = () => {
  const [products, setProducts] = useState([]); // State to store products data
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation(); // To access the current URL and query params

  // Get product_name from the URL query parameters
  const productName = new URLSearchParams(location.search).get("product_name");

  useEffect(() => {
    if (productName) {
      // Fetch eco-friendly products from API based on product_name
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/extension-data/?product_name=${encodeURIComponent(
              productName
            )}`
          );
          setProducts(response.data.eco_alternatives); // Store eco alternatives in state
          setLoading(false); // Stop loading after data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchData(); // Call the API
    }
  }, [productName]); // Refetch when product_name changes

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (!products || products.length === 0) {
    return <div>No alternatives found for this product.</div>; // Display message if no products are found
  }

  return (
    <div className="pl-14">
      <div className="bg-teal-900 text-white min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-teal-950 shadow-lg p-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            EcoShop
          </h1>
          <div className="flex items-center space-x-6">
            <div className="text-white flex items-center space-x-2 hover:text-teal-300 transition-all cursor-pointer">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </div>
            <ShoppingCart className="w-6 h-6 text-white hover:text-teal-300 transition-all cursor-pointer" />
          </div>
        </nav>

        {/* Welcome Message */}
        <section className="text-center my-12">
          <h2 className="text-4xl font-extrabold text-teal-200 tracking-widest mb-2">
            Thank you for Going Green!
          </h2>
          <p className="text-teal-300 text-lg">
            Every small step makes a difference. Choose eco-friendly products
            and help make the world a greener place.
          </p>
        </section>

        {/* Product List */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ShoppingItem key={index} product={product} />
          ))}
        </section>

        {/* Footer */}
        <footer className="bg-teal-950 text-teal-100 py-4 text-center mt-auto">
          <p>
            &copy; 2024 EcoShop. All rights reserved. Promoting sustainable
            choices for a greener future.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EcoShop;
