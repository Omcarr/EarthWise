import { motion } from "framer-motion";
import Login from "../../ui/Login";

function LoginPage() {
  return (
    <>
      <div className="bg-neutral-900 flex min-h-screen h-full">
        {/* <BackgroundBeams /> */}

        <div className="w-full flex items-center justify-center ">
          <div className="w-1/2 flex justify-center items-center text-white text-5xl">
            Eco Something
          </div>
          <div className="w-1/2">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
