import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import ChatPage from "./pages/ChatPage";
import ReportPage from "./pages/ReportPage";
import DoctorDashboardPage from "./pages/DoctordashboardPage";
import SignUpPage from "./pages/SignUpPage";
import VoiceChatPage from "./pages/VoiceChatPage";
import PatientDashboard from "./pages/PatientDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/voicechat" element={<VoiceChatPage />} />
        <Route path="/patientdashboard/*" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
