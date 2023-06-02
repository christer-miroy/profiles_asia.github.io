import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import axios from "axios";

export default function DefaultLayout() {
    // add candidate later
    const { user, token, setUser, setToken } = useStateContext();

    // protect route
    if (!token) {
        return <Navigate to="/login" />;
    }

    // logout functionality
    const onLogout = (ev) => {
        ev.preventDefault;

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    // display name of logged in user
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                {/* uncomment candidates pag gagawin na */}
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/candidates">Candidates</Link>
            </aside>
            <div className="content">
                <header>
                    Header
                    {/* authenticated user info */}
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
