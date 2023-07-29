import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
// import "./App.css";
import axios from "axios";

import GuestIndex from "./pages/guest/Index";
import UserRegistration from "./pages/guest/UserRegistration";
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
import NilaiSiswa from "./pages/authenticated/Nilai";
import NilaiGuru from "./pages/authenticated/NilaiGuru";
import NilaiGuruTambah from "./pages/authenticated/NilaiGuruTambah";
import Profile from "./pages/authenticated/Profile";
import Loading from "./components/Loading";
// Admin pages
import AdminIndex from "./pages/admin/Index";
import AdminUsers from "./pages/admin/Users";
import AdminUsersDetail from "./pages/admin/UsersDetail";
import AdminGuru from "./pages/admin/Guru";
import AdminGuruDetail from "./pages/admin/GuruDetail";
import AdminSiswa from "./pages/admin/Siswa";
import AdminSiswaDetail from "./pages/admin/SiswaDetail";
import AdminAdmin from "./pages/admin/Admin";
import AdminJadwal from "./pages/admin/Jadwal";
import AdminJadwalDetail from "./pages/admin/JadwalDetail";
import AdminTahun from "./pages/admin/Tahun";

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
            <Route path="/guru/nilai" element={<NilaiGuru />} />
            <Route path="/guru/nilai/tambah" element={<NilaiGuruTambah />} />
            <Route path="/siswa/nilai" element={<NilaiSiswa />} />
            <Route path="/:role/profile" element={<Profile />} />
            <Route path="/:role/pengaturan" element={<Setting />} />
            <Route path="/:role/profile/avatar" element={<UpdateAvatar />} />
            {/* Guest routes */}
            <Route path="/" element={<GuestIndex />} />
            <Route path="/home" element={<GuestIndex />} />
            <Route path="/pendaftaran" element={<UserRegistration />} />
            {/* Admin routes */}
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/user/:nickname" element={<AdminUsersDetail />} />
            <Route path="/admin/guru" element={<AdminGuru />} />
            <Route path="/admin/guru/:nip" element={<AdminGuruDetail />} />
            <Route path="/admin/siswa" element={<AdminSiswa />} />
            <Route path="/admin/siswa/:nis" element={<AdminSiswaDetail />} />
            <Route path="/admin/admin" element={<AdminAdmin />} />
            <Route path="/admin/tahun" element={<AdminTahun />} />
            <Route path="/admin/pelajaran/jadwal" element={<AdminJadwal />} />
            <Route path="/admin/pelajaran/:id" element={<AdminJadwalDetail />} />
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
