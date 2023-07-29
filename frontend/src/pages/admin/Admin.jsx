import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/profile.svg";

const Admin = () => {
   const [admin, setAdmin] = useState([]);

   useEffect(() => {
      axios
         .get("/admin/admins", { withCredentials: true })
         .then((response) => {
            setAdmin(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <div className="h-auto bg-darkmode pt-10 pb-10">
         <div className="h-screen w-full bg-darkmode absolute -z-50"></div>
         <nav className="flex flex-wrap ml-5">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
               <li className="inline-flex items-center">
                  <Link to={"/admin"} className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white">
                     <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                     </svg>
                     Admin
                  </Link>
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
                     <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Admin</span>
                  </div>
               </li>
            </ol>
         </nav>
         <div className="mt-4 mx-4 bg-gray-800">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
               <div className="w-full overflow-x-auto">
                  <div className="flex justify-between">
                     <div className="text-gray-300 ml-3 mb-2 font-bold mt-4">Daftar semua admin</div>
                  </div>

                  <table className="w-full overflow-auto">
                     <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                           <th className="px-4 py-3">Nama</th>
                           <th className="px-4 py-3">Email</th>
                           <th className="px-4 py-3">Role</th>
                           <th className="px-4 py-3">Tanggal dibuat</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {admin.map((item) => (
                           <tr className="bg-gray-800 hover:bg-gray-900 text-gray-400 cursor-pointer" key={item.id}>
                              <td className="px-4 py-3">
                                 <div className="flex items-center text-sm">
                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                       <img
                                          className="object-cover w-full h-full rounded-full"
                                          src={item.picture ? `${axios.defaults.baseURL}/images/avatar/${item.picture}` : Image}
                                          alt=""
                                          loading="lazy"
                                       />
                                       <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                    </div>
                                    <div>
                                       <p className="font-semibold">{item.fullname}</p>
                                       <p className="text-xs text-gray-600 dark:text-gray-400">{item.nickname}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-3 text-sm relative">{item.email}</td>
                              <td className="px-4 py-3 text-xs">{item.role}</td>
                              <td>
                                 {new Date(item.createdAt).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                 })}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="px-4 py-3 flex justify-end text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                  <span className="cursor-pointer hover:text-cyan-600 transition mr-3">SDN WARINGIN I</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Admin;
