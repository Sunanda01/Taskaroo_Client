import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "./pages/registerForm";
import { LoginForm } from "./pages/LoginForm";
// import { EnterOtp } from "./pages/EnterOtp";
import { Toaster } from "./components/ui/toaster";
import { HomePage } from "./pages/HomePage";
// import { EnterEmail } from "./pages/EnterEmail";
import { ForgetPassword } from "./pages/ForgetPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { UpdateUserDetails } from "./pages/UpdateUserDetails";
import { ErrorPage } from "./pages/ErrorPage";
import { OtpVerify } from "./pages/OtpVerify";
import {LandingPage} from "./pages/LandingPage";
import {UpdateTodo} from "./pages/UpdateTodo";
import { Home2 } from "./pages/Home2";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/enterOtp" element={<EnterOtp/>}/> */}
          <Route path="/home" element={<HomePage/>} />
          <Route path="/home2" element={<Home2/>} />
          {/* <Route path="/enterEmail" element={<EnterEmail />} /> */}
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/updateUser" element={<UpdateUserDetails />} />
          <Route path="/errorPage" element={<ErrorPage />} />
          <Route path="/verify-otp" element={<OtpVerify/>}/>
          <Route path="/landing-page" element={<LandingPage/>}/>
          <Route path="/update-todo" element={<UpdateTodo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
