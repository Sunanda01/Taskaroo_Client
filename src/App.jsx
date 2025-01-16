import {BrowserRouter,Routes,Route} from "react-router-dom"
import { RegisterForm } from "./pages/registerForm"
import { LoginForm } from "./pages/LoginForm";
import { EnterOtp } from "./pages/EnterOtp";
import { Toaster } from "./components/ui/toaster";
import { Home } from "./pages/home";
import { EnterEmail } from "./pages/EnterEmail";
import { ForgotPassword } from "./pages/ForgetPassword";
import { UpdatePassword } from "./pages/UpadatePassword";
import { UpdateUserDetails } from "./pages/UpdateUserDetails";



export default function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          {/* <Route path="/enterOtp" element={<EnterOtp/>}/> */}
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/enterEmail" element={<EnterEmail/>}/> */}
          <Route path="/forgetPassword" element={<ForgotPassword/>}/>
          <Route path="/updatePassword" element={<UpdatePassword/>}/>
          <Route path="/UpdateUser" element={<UpdateUserDetails/>}/>
          
      </Routes>
    </BrowserRouter>
    </>
  );
}