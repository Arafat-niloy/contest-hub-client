import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            {/* Navbar will go here */}
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            {/* Footer will go here */}
        </div>
    );
};

export default Main;