import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Bye from "./components/Bye";
import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Sidebar from "./components/Sidebar";
import Transport from "./Pages/Transport/Transport";
import Electricity from "./Pages/Electricity/Electricity";
import ChatWidget from "./components/ChatBot";
import MainContent from "./Pages/Home/Home";
import EcoShop from "./Pages/shopping/EchoShop";
import DonationDrive from "./Pages/Thrift/Thrift";
import LoginPage from "./Pages/SignUp/LoginPage";
import RegistrationForm from "./Pages/SignUp/SignUp";
import UsersScreen from "./Pages/SignUp/Users";
import Groceries from "./Pages/Groceries/Groceries";
import Rewards from "./Pages/Rewards/Rewards";
import Electricity1 from "./Pages/Electricity/Electricity1";
import Transport1 from "./Pages/Transport/Transport copy";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesWeb />
      </BrowserRouter>
    </>
  );
}

const RoutesWeb = () => {
  const location = useLocation(); // Get the current route

  const noSidebarRoutes = [
    "/login",
    "/landing",
    "/bye",
    "/shop",
    "/signup",
    "/users",
    "/",
  ];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="flex h-screen">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}
        <ChatWidget />

        {/* Main content */}
        <div className={`flex-1 ${showSidebar ? "pl-6" : "p-0"}`}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/bye" element={<Bye />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/side" element={<Sidebar />} />
            {/* <Route path="/transport" element={<Transport />} /> */}
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/electricity" element={<Electricity1 />} />
            <Route path="/chatbot" element={<ChatWidget />} />
            <Route path="/shop" element={<EcoShop />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/thrift" element={<DonationDrive />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/transport" element={<Transport1 />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
