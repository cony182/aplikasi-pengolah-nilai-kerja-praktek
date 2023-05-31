import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Loading from "../../components/Loading";

const ResetPassword = () => {
   const navigate = useNavigate();

   const url = window.location.pathname;
   const token = url.split("/")[3];
   const decode = Buffer.from(token, "base64").toString("ascii"); // decode
   const jsonParse = JSON.parse(decode);

   const [newPassword, setNewPassword] = useState();
   const [newConfirmPassword, setNewConfirmPassword] = useState();
   const [newPasswordMatch, setNewPasswordMatch] = useState(true);
   const [expirationCheck, setExpirationCheck] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axios
         .post(
            "http://localhost:5000/reset/password/verify",
            {
               token: token,
            },
            { withCredentials: true }
         )
         .then((response) => {
            console.log(response);
            setLoading(false);
            navigate("/login");
         })
         .catch((err) => {
            if (err.response.status == 403 || err.response.status == 404)
               setExpirationCheck(true);
            setLoading(false);
         });
   }, []);

   const requestResetPassword = (e) => {
      e.preventDefault();
      setNewPasswordMatch(true);

      if (newPassword !== newConfirmPassword) return setNewPasswordMatch(false);
      axios
         .post(
            "http://localhost:5000/reset/password",
            {
               uid: jsonParse.uid,
               email: jsonParse.email,
               newPassword: newPassword,
               newConfirmPassword: newConfirmPassword,
               token: token,
            },
            { withCredentials: true }
         )
         .then((response) => {
            console.log(response);
            navigate("/login");
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return loading ? (
      <Loading />
   ) : (
      <>
         <div className="flex items-center justify-center h-screen -mt-16">
            {expirationCheck ? (
               <>
                  <div className="relative flex flex-col items-center max-w-xl gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 dark:text-gray-100">
                     <h2 className="text-2xl font-semibold leading-tight tracking-wide">
                        Token yang anda akses tidak berlaku atau sudah
                        kedaluarsa.
                     </h2>
                     <p className="flex-1 text-center dark:text-gray-400">
                        Pergi ke halaman lupa password dan pastikan verifikasi
                        email dari kami dalam waktu 60 detik.
                     </p>
                     <Link to="/forgot/password">
                        <button
                           type="button"
                           className="px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
                        >
                           Lupa password
                        </button>
                     </Link>
                  </div>
               </>
            ) : (
               <>
                  <div className="rounded-xl border border-stroke w-full md:w-2/4 xl:w-2/4 bg-primaryLight shadow-default dark:border-strokedark dark:bg-boxdark">
                     <div className="flex flex-wrap items-center">
                        <div className="w-full border-stroke dark:border-strokedark">
                           <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                              <span className="mb-1.5 block font-base font-bold">
                                 Masukkan password baru
                              </span>

                              <form onSubmit={requestResetPassword}>
                                 <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-left ml-3 text-black">
                                       Password Baru
                                    </label>
                                    <div className="relative">
                                       <input
                                          type="password"
                                          placeholder="Minimal 8 Karakter"
                                          value={newPassword}
                                          onChange={(e) => {
                                             setNewPassword(e.target.value);
                                          }}
                                          className={
                                             !newPasswordMatch
                                                ? "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none  border-red-500"
                                                : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                          }
                                          required
                                       />

                                       <span className="absolute right-4 top-4">
                                          <svg
                                             className="fill-current"
                                             width="22"
                                             height="22"
                                             viewBox="0 0 22 22"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <g opacity="0.5">
                                                <path
                                                   d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                   fill=""
                                                />
                                                <path
                                                   d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                   fill=""
                                                />
                                             </g>
                                          </svg>
                                       </span>
                                    </div>
                                 </div>

                                 <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-left ml-3 text-black">
                                       Konfirmasi Password Baru
                                    </label>
                                    <div className="relative">
                                       <input
                                          type="password"
                                          placeholder="Minimal 8 Karakter"
                                          value={newConfirmPassword}
                                          onChange={(e) => {
                                             setNewConfirmPassword(
                                                e.target.value
                                             );
                                          }}
                                          className={
                                             !newPasswordMatch
                                                ? "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none  border-red-500"
                                                : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                          }
                                          required
                                       />

                                       <span className="absolute right-4 top-4">
                                          <svg
                                             className="fill-current"
                                             width="22"
                                             height="22"
                                             viewBox="0 0 22 22"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <g opacity="0.5">
                                                <path
                                                   d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                   fill=""
                                                />
                                                <path
                                                   d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                   fill=""
                                                />
                                             </g>
                                          </svg>
                                       </span>
                                    </div>
                                    {!newPasswordMatch ? (
                                       <div className="text-right text-sm mr-3 text-red-500">
                                          Password dan konf. password tidak
                                          cocok
                                       </div>
                                    ) : (
                                       ""
                                    )}
                                 </div>

                                 <div className="mb-5">
                                    <input
                                       type="submit"
                                       value="Reset password"
                                       className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 bg-acccentLight text-slate-100 transition hover:bg-opacity-90"
                                    />
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </>
   );
};

export default ResetPassword;
