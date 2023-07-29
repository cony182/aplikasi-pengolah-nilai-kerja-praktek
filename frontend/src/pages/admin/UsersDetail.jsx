import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/profile.svg";

const UsersDetail = () => {
   const navigate = useNavigate();
   const url = window.location.pathname;
   const nickname = url.split("/")[3];

   const [user, setUser] = useState([]);
   const [role, setRole] = useState();
   const [onChange, setOnChange] = useState(false);
   const [onSuccess, setOnSuccess] = useState(false);

   useEffect(() => {
      axios
         .get("/admin/user/" + nickname, { withCredentials: true })
         .then((response) => {
            setUser(response.data);
            setRole(response.data.role);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const update = (uid) => {
      axios
         .post("/admin/users", { role: role, uid: uid }, { withCredentials: true })
         .then((response) => {
            setOnSuccess(true);
            setTimeout(() => {
               setOnSuccess(false);
            }, 3000);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <section className="pt-10 pb-10 bg-darkmode h-screen">
         <nav className="flex flex-wrap ml-5 mt-5">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <Link to={"/admin"} className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                     <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                     </svg>
                     Admin
                  </Link>
               </li>
               <li>
                  <div className="flex items-center" onClick={() => navigate(-1)}>
                     <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                           clipRule="evenodd"
                        />
                     </svg>
                     <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 dark:hover:text-white cursor-pointer">
                        Users
                     </span>
                  </div>
               </li>
               <li aria-current="page">
                  <div className="flex items-center">
                     <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fillRule="evenodd"
                           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                           clipRule="evenodd"
                        />
                     </svg>
                     <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{user.nickname}</span>
                  </div>
               </li>
            </ol>
         </nav>
         <div className="w-full px-2 md:px-4 mx-auto pt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-darkmode dark:text-gray-500 w-full mb-6 shadow-md rounded-lg mt-16">
               <div className="md:px-6">
                  <div className="flex flex-wrap justify-center">
                     <div className="w-full px-4 h-2 -translate-y-12 flex justify-center lg:justify-start">
                        <div className="h-36 relative">
                           <img
                              src={user.picture ? `${axios.defaults.baseURL}/images/avatar/${user.picture}` : Image}
                              alt=""
                              className={`h-36 w-36 rounded-full bg-gray-300 ring-2 ring-blue-300`}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="text-center lg:text-start mt-28 lg:ml-4 lg:mt-0">
                     <div className="lg:ml-40">
                        <h3 className="text-xl font-semibold leading-normal text-gray-500 dark:text-gray-400 mb-2">{user.fullname}</h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 dark:text-gray-400 font-bold">{user.email}</div>
                     </div>
                  </div>
                  <div className="mt-14 py-10 border-t dark:border-gray-500 border-blueGray-200 text-center">
                     <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4">
                           <div className="bg-white dark:bg-darkmode overflow-hidden rounded-lg">
                              <div className="px-4 py-5 sm:px-6">
                                 <h3 className="text-lg leading-6 font-medium text-gray-500 dark:text-gray-400 text-left">Detail user</h3>
                              </div>
                              <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-5 sm:p-0">
                                 <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-500 text-left">
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</dt>
                                       <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                          {user.uid} <span className="ml-2 text-cyan-600">({user.id})</span>
                                       </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name </dt>
                                       <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">{user.fullname}</dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nickname </dt>
                                       <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">{user.nickname}</dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                                       <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">{user.email}</dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                       <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2 uppercase">
                                          <select
                                             value={role}
                                             onChange={(e) => {
                                                setRole(e.target.value);
                                                setOnChange(true);
                                             }}
                                             className="bg-transparent focus:outline-none"
                                          >
                                             <option className="bg-darkmode" value="reguler">
                                                REGULER
                                             </option>
                                             <option className="bg-darkmode" value="guru">
                                                GURU
                                             </option>
                                             <option className="bg-darkmode" value="siswa">
                                                SISWA
                                             </option>
                                             <option className="bg-darkmode" value="admin">
                                                ADMIN
                                             </option>
                                          </select>
                                       </dd>
                                    </div>
                                 </dl>
                              </div>
                           </div>
                           {onSuccess ? <div className="text-green-600 mt-5 py-1">Perubahan Berhasil disimpan</div> : ""}
                           {onChange ? (
                              <div
                                 onClick={() => update(user.uid)}
                                 className="bg-gray-700 text-gray-300 rounded-lg mt-5 py-1 cursor-pointer hover:opacity-80"
                              >
                                 Simpan
                              </div>
                           ) : (
                              ""
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default UsersDetail;
