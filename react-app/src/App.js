import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Error from "./Error";
import Welcome from "./views/Welcome";
import Logout from "./views/Logout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/error" element={<Error />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
