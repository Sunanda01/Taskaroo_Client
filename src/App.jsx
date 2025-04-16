import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "./pages/registerForm";
import { LoginForm } from "./pages/LoginForm";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";
import { ForgetPassword } from "./pages/ForgetPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { UpdateUserDetails } from "./pages/UpdateUserDetails";
import { ErrorPage } from "./pages/ErrorPage";
import { OtpVerify } from "./pages/OtpVerify";
import { LandingPage } from "./pages/LandingPage";
import { UpdateTodo } from "./pages/UpdateTodo";
import { SetPassword } from "./pages/SetPassword";
import { ProtectedRoute } from "./private/ProtectedRoute";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/setPassword" element={<SetPassword />} />
          <Route
            path="/updatePassword"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateUser"
            element={
              <ProtectedRoute>
                <UpdateUserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-todo/:todoId"
            element={
              <ProtectedRoute>
                <UpdateTodo />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}