import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
// import "./App.css";
import axios from "axios";

import GuestIndex from "./pages/guest/Index";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Protected from "./pages/authentication/Protected";
import EmailVerify from "./pages/authentication/EmailVerify";
import EmailSend from "./pages/authentication/EmailSend";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import UpdateAvatar from "./pages/authenticated/UpdateAvatar";
import Jadwal from "./pages/authenticated/Jadwal";
import Setting from "./pages/authenticated/Setting";
import News from "./pages/authenticated/News";
import Nilai from "./pages/authenticated/Nilai";
import Profile from "./pages/authenticated/Profile";
import Loading from "./components/Loading";

function App() {
   const darkmode = localStorage.getItem("darkmode") === "true" ? true : false;

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      darkmode ? document.body.classList.add("dark") : document.body.classList.remove("dark");

      function start() {
         gapi.client.init({
            clientID: "979784616518-3p87frhc27piklt5kjvbeq54rlr4ikh6.apps.googleusercontent.com",
            scope: "",
         });
      }
      gapi.load("client:auth2", start);

      setLoading(false);
   });
   return loading ? (
      <Loading />
   ) : (
      <>
         <Routes>
            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/email/verify/:token" element={<EmailVerify />} />
            <Route path="/email/send/:token" element={<EmailSend />} />
            <Route path="/forgot/password/" element={<ForgotPassword />} />
            <Route path="/reset/password/:token" element={<ResetPassword />} />
            {/* Authenticated routes /> */}
            <Route path="/:role/jadwal" element={<Jadwal />} />
            <Route path="/:role/berita" element={<News />} />
            <Route path="/:role/nilai" element={<Nilai />} />
            <Route path="/:role/profile" element={<Profile />} />
            <Route path="/:role/pengaturan" element={<Setting />} />
            <Route path="/:role/profile/avatar" element={<UpdateAvatar />} />
            {/* Guest routes */}
            <Route path="/" element={<GuestIndex />} />
            <Route path="/home" element={<GuestIndex />} />
            {/*<Route path="/auth" component={Auth} />
            <Route path="/landing" exact component={Landing} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/" exact component={Index} /> */}
            {/* add redirect for first page */}
         </Routes>
      </>
   );
}

export default App;
