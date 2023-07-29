import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nis from "../../components/admin/Nis";
import Classroom from "../../components/admin/Classroom";
import Teacher from "../../components/admin/Teachers";
import Button from "../../components/Button";
import RecentAccount from "../../components/admin/RecentAccount";
import Statistics from "../../components/admin/Statistics";

const Index = () => {
   const navigate = useNavigate();
   const [recentUsers, setRecentUsers] = useState([]);
   const [totalUser, setTotalUser] = useState();
   const [totalGuru, setTotalGuru] = useState();
   const [totalSiswa, setTotalSiswa] = useState();
   const [totalAdmin, setTotalAdmin] = useState();
   const [kelas, setKelas] = useState([]);
   const [guru, setGuru] = useState([]);

   useEffect(() => {
      axios
         .get("/admin", { withCredentials: true })
         .then((response) => {
            setTotalGuru(response.data.totalGuru);
            setTotalUser(response.data.totalUser);
            setGuru(response.data.guru);
            setTotalSiswa(response.data.totalSiswa);
            setTotalAdmin(response.data.totalAdmin);
            setRecentUsers(response.data.recentUsers);
            setKelas(response.data.kelas);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const logout = (e) => {
      e.preventDefault();
      axios
         .get("/logout", { withCredentials: true })
         .then((response) => {
            navigate("/");
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div className="h-full bg-darkmode pt-10">
         <div className="absolute -z-50 bg-darkmode w-full h-screen"></div>
         <div className="flex justify-between">
            <div className="uppercase text-lg text-gray-300 ml-5 font-bold">Admin</div>
            <div
               className="text-gray-400 mr-8 border border-gray-600 px-2 cursor-pointer rounded-md font-semibold hover:border-gray-400 hover:text-gray-400 transition"
               onClick={logout}
            >
               Logout
            </div>
         </div>
         {/* Statistics Cards */}
         <Statistics data={{ users: totalUser, guru: totalGuru, siswa: totalSiswa, admin: totalAdmin }} />
         {/* ./Statistics Cards */}
         <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            {/* Social Traffic */}
            <RecentAccount data={recentUsers} />
            {/* ./Social Traffic */}
            {/* Recent Activities */}
            <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
               <div className="rounded-t mb-0 px-0 border-0">
                  <div className="flex flex-wrap items-center px-4 py-2">
                     <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Menu</h3>
                     </div>
                  </div>
                  <div className="block w-full">
                     <ul className="my-1">
                        <li className="flex px-4">
                           <div className="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3">
                              <svg
                                 className="w-9 h-9 fill-current ml-1 mt-1 text-indigo-50"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 32 32"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                                    fill="currentColor"
                                 />
                              </svg>
                           </div>
                           <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                              <div className="flex-grow flex justify-between items-center">
                                 <div className="self-center">
                                    <p className="font-semibold">Guru dan mata pelajarannya</p>
                                 </div>
                                 <div className="flex-shrink-0 ml-2">
                                    <Link
                                       to={"/admin/guru"}
                                       className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                       href="#0"
                                       style={{ outline: "none" }}
                                    >
                                       Pergi
                                       <span>
                                          <svg
                                             width={20}
                                             height={20}
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             className="transform transition-transform duration-500 ease-in-out"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li className="flex px-4">
                           <div className="w-9 h-9 rounded-full flex-shrink-0 bg-cyan-500 my-2 mr-3">
                              <svg
                                 className="w-9 h-9 fill-current ml-2 mt-2 text-indigo-50"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 44 44"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z"
                                    fill="currentColor"
                                 />
                              </svg>
                           </div>
                           <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                              <div className="flex-grow flex justify-between items-center">
                                 <div className="self-center">
                                    <p className="font-semibold">Wali kelas dan siswa</p>
                                 </div>
                                 <div className="flex-shrink-0 ml-2">
                                    <Link
                                       to={"/admin/siswa"}
                                       className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                       href="#0"
                                       style={{ outline: "none" }}
                                    >
                                       Pergi
                                       <span>
                                          <svg
                                             width={20}
                                             height={20}
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             className="transform transition-transform duration-500 ease-in-out"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li className="flex px-4">
                           <div className="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                              <svg className="w-9 h-9 fill-current text-red-50" viewBox="0 0 36 36">
                                 <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
                              </svg>
                           </div>
                           <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                              <div className="flex-grow flex justify-between items-center">
                                 <div className="self-center">
                                    <p className="font-semibold">Tambah atau edit jadwal pelajaran</p>
                                 </div>
                                 <div className="flex-shrink-0 ml-2">
                                    <Link
                                       to={"/admin/pelajaran/jadwal"}
                                       className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                       href="#0"
                                       style={{ outline: "none" }}
                                    >
                                       Pergi
                                       <span>
                                          <svg
                                             width={20}
                                             height={20}
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             className="transform transition-transform duration-500 ease-in-out"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </li>
                     </ul>
                     <div className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Tahun ajaran
                     </div>
                     <ul className="my-1">
                        <li className="flex px-4">
                           <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-600 my-2 mr-3">
                              <svg
                                 className="w-9 h-9 fill-current ml-2 mt-2 text-indigo-50"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 44 44"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H8Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                                    fill="currentColor"
                                 />
                              </svg>
                           </div>
                           <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                              <div className="flex-grow flex justify-between items-center">
                                 <div className="self-center">2022 / 2023</div>
                                 <div className="flex-shrink-0 ml-2">
                                    <Link
                                       to={"/admin/tahun"}
                                       className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                       style={{ outline: "none" }}
                                    >
                                       Ubah
                                       <span>
                                          <svg
                                             width={20}
                                             height={20}
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                             className="transform transition-transform duration-500 ease-in-out"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            {/* ./Recent Activities */}
         </div>
         {/* Task Summaries Tahun ajar Mapel Kelas Jadwal */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-4 text-black dark:text-white">
            <Classroom data={kelas} />
            {/*  */}
            <Teacher data={guru} />
            {/* NIS Component */}
            <Nis />
         </div>
      </div>
   );
};

export default Index;
