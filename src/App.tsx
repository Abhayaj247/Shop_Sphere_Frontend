import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrderHistory from "./pages/OrderHistory";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
