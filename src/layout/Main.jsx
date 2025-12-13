import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-20 min-h-screen"> 
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;