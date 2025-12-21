import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

const Main = () => {
    return (
        
        <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-gray-900 text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            <Navbar></Navbar>
            
            <div className="flex-1 pt-20"> 
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
            
        </div>
    );
};

export default Main;