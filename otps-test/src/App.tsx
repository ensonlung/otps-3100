import Login from "./Login/Login"
import Registration from "./Login/Registration"
import Fake from "./Content/Fake"
import StudentPage from "./Content/StudentPage"
import TutorPage from "./Content/TutorPage"
import CommentPage from "./Content/StudentPanels/CommentPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./Content/ErrorBoundary"

function App() {
    return (
        <>
            <BrowserRouter>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Registration" element={<Registration />} />
                        <Route path="/Content/Fake" element={<Fake />} />
                        <Route path="/Content/StudentPage" element={<StudentPage />} />
                        <Route path="/Content/TutorPage" element={<TutorPage />} />
                        <Route path="/Content/StudentPage/Comment" element={<CommentPage />} />
                        <Route path="/" element={<Navigate to="/Login" replace />} />
                    </Routes>
                </ErrorBoundary>
            </BrowserRouter>            
        </>
    );
}

export default App;
