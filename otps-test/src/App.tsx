import Login from "./Login/Login"
import Fake from "./Content/Fake"
import StudentPage from "./Content/StudentPage"
import TutorPage from "./Content/TutorPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Content/Fake" element={<Fake />} />
                    <Route path="/Content/StudentPage" element={<StudentPage />} />
                    <Route path="/Content/TutorPage" element={<TutorPage />} />
                    <Route path="/" element={<Navigate to="/Login" replace />} />
                </Routes>
            </BrowserRouter>            
        </>
    );
}

export default App;
