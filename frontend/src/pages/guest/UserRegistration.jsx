import React, { useState } from "react";
import Guest from "../layouts/Guest";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
   const navigate = useNavigate();
   const [processing, setProccessing] = useState(false);
   const [nis, setNis] = useState();
   const [password, setPassword] = useState("");
   const [errorInput, setErrorInput] = useState();

   const register = (e) => {
      e.preventDefault();
      setProccessing(true);
      axios
         .post("/registration", { nis: nis, password: password }, { withCredentials: true })
         .then((response) => {
            navigate("/siswa/profile");
            setProccessing(false);
         })
         .catch((err) => {
            if (err.response.status == 404) setErrorInput("NIS atau Password tidak cocok");
            console.log(err);
            setProccessing(false);
         });
   };

   return (
      <Guest>
         <div className="flex items-center w-full lg:w-3/4 mx-auto justify-center h-screen -mt-16">
            <div className="rounded-xl border border-stroke w-full md:w-3/4 xl:w-3/4 bg-primaryLight shadow-default">
               <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-3/4 mx-auto border-stroke dark:border-strokedark">
                     <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <span className="mb-1.5 block font-medium">Pendaftaran</span>
                        <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">SDN Waringin I</h2>

                        <form onSubmit={register}>
                           <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">NIS</label>
                              <div className="relative">
                                 <input
                                    type="text"
                                    placeholder="Nomor Induk"
                                    onChange={(e) => setNis(e.target.value)}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    required
                                 />

                                 <span className="absolute right-4 top-4">
                                    <svg className="fill-current" width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                       <g opacity="0.5">
                                          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                       </g>
                                    </svg>
                                 </span>
                              </div>
                           </div>

                           <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">Password</label>
                              <div className="relative">
                                 <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
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

                              <div className="text-red-600 text-sm mt-2 text-right mr-5">{errorInput ? errorInput : ""}</div>
                           </div>

                           <div className="mb-5">
                              <button
                                 type="submit"
                                 disabled={processing ? "disabled" : ""}
                                 className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 bg-acccentLight text-white transition hover:bg-opacity-90"
                              >
                                 <span>
                                    {processing ? (
                                       <div className="border-2 border-dashed rounded-full w-6 mx-auto h-6 border-white animate-spin"></div>
                                    ) : (
                                       "Daftar"
                                    )}
                                 </span>
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Guest>
   );
};

export default UserRegistration;
