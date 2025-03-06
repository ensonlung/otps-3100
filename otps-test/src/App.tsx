import Login from "./Login/Login"
import Fake from "./Content/Fake"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Content/Fake" element={<Fake />} />
                    <Route path="/" element={<Navigate to="/Login" replace />} />
                </Routes>
            </BrowserRouter>            
        </>
    );
}

export default App;
