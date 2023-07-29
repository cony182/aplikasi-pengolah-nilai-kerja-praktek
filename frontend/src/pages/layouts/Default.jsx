import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Default = (props) => {
   const navigate = useNavigate();
   const url = window.location.pathname;
   const role = url.split("/")[1];
   const activeNavlink = url.split("/")[2];

   const [miniSidebar, setMiniSidebar] = useState(localStorage.getItem("miniSidebar") === "true" ? true : false);
   const [mobileSidebar, setMobileSidebar] = useState(false);
   const [isGuru, setIsGuru] = useState();

   useEffect(() => {
      axios
         .get("/reguler", { withCredentials: true })
         .then((response) => {
            // setIsGuru(response.data.role == "guru" ? true : false);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      setMiniSidebar(localStorage.getItem("miniSidebar") === "true" ? true : false);
   });

   const toggleSidebarBtn = () => {
      setMobileSidebar(!mobileSidebar);
   };

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
      <>
         <div className="h-screen flex flex-row flex-wrap">
            <div className="h-screen w-screen flex bg-primaryLight">
               {/* container */}
               <aside className={`md:flex flex-col ${mobileSidebar ? "fixed" : "hidden"} z-50 items-center bg-white dark:bg-darkmode shadow h-full`}>
                  {/* Side Nav Bar*/}
                  <div className="h-16 flex justify-center text-gray-500 items-center w-full">
                     {/* Logo Section */}
                     <div className=" hidden md:block font-bold">{miniSidebar ? "SDN I" : "SDN WARINGIN I"}</div>
                     <div className="md:hidden font-bold">{miniSidebar ? "" : "WARINGIN I"}</div>
                     <div
                        onClick={toggleSidebarBtn}
                        className="items-center absolute -right-2.5 bg-white dark:bg-darkmode w-5 h-5 border dark:border-gray-600 dark:hover:bg-gray-800 transition duration-200 md:hidden rounded-full scale-150 hover:bg-gray-200"
                     >
                        <div className="flex justify-center mt-[1px] hover:scale-110 transition-transform duration-300">
                           <ion-icon name="close-outline"></ion-icon>
                        </div>
                     </div>
                  </div>
                  <ul className={`overflow-hidden ${miniSidebar ? "" : "md:w-56"}`}>
                     {/* Items Section */}
                     <li className="hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300" title="Jadwal">
                        <Link
                           to={`/${role}/jadwal`}
                           className={`h-16 px-6 flex justify-between items-center w-full dark:text-gray-400 transition-transform duration-300 hover:translate-x-2 ${
                              activeNavlink == "jadwal" ? "bg-blue-100 dark:bg-slate-800 rounded-r-full" : ""
                           }`}
                           id="jadwal"
                        >
                           <span className={miniSidebar ? "hidden mr-5" : "md:block mr-5"}>Dashboard</span>
                           <span className="scale-125">
                              <ion-icon name="book-outline"></ion-icon>
                           </span>
                        </Link>
                     </li>
                     <li className="hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300" title="Nilai">
                        <Link
                           to={`/${role}/nilai`}
                           className={`h-16 px-6 flex justify-between items-center w-full dark:text-gray-400 transition-transform duration-300 hover:translate-x-2 ${
                              activeNavlink == "nilai" ? "bg-blue-100 dark:bg-slate-800 rounded-r-full" : ""
                           }`}
                           id="nilai"
                        >
                           <span className={miniSidebar ? "hidden mr-5" : "md:block mr-5"}>Nilai</span>
                           <span className="scale-125">
                              <ion-icon name="document-text-outline"></ion-icon>
                           </span>
                        </Link>
                     </li>
                     <li className="hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300" title="Profile">
                        <Link
                           to={`/${role}/profile`}
                           className={`h-16 px-6 flex justify-between items-center w-full dark:text-gray-400 transition-transform duration-300 hover:translate-x-2 ${
                              activeNavlink == "profile" ? "bg-blue-100 dark:bg-slate-800 rounded-r-full" : ""
                           }`}
                           id="profile"
                        >
                           <span className={miniSidebar ? "hidden mr-5" : "md:block mr-5"}>Profile</span>
                           <span className="scale-125">
                              <ion-icon name="person-outline"></ion-icon>
                           </span>
                        </Link>
                     </li>
                     <li className="hover:bg-gray-100 dark:hover:bg-slate-800 transition duration-300" title="Pengaturan">
                        <Link
                           to={"/" + role + "/pengaturan"}
                           className={`h-16 px-6 flex justify-between items-center w-full dark:text-gray-400 transition-transform duration-300 hover:translate-x-2 ${
                              activeNavlink == "pengaturan" ? "bg-blue-100 dark:bg-slate-800 rounded-r-full" : ""
                           }`}
                           id="pengaturan"
                        >
                           <span className={miniSidebar ? "hidden mr-5" : "md:block mr-5"}>Pengaturan</span>
                           <span className="scale-125">
                              <ion-icon name="cog-outline"></ion-icon>
                           </span>
                        </Link>
                     </li>
                  </ul>
                  <div className="mt-auto h-16 flex items-center w-full dark:text-gray-400">
                     {/* Action Section */}
                     <button
                        onClick={logout}
                        className="h-16 px-6 flex justify-between items-center w-full focus:text-orange-500 hover:bg-red-100 dark:hover:bg-red-900 transition duration-100"
                     >
                        <span className={miniSidebar ? "hidden mr-5" : "md:block mr-5"}>Logout</span>
                        <span className="scale-125">
                           <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                     </button>
                  </div>
               </aside>
               <div className="fixed h-14 md:hidden bg-white dark:bg-darkmode opacity-80 w-full">
                  <div className="fixed">
                     <div className="relative mx-auto w-14 h-14">
                        <div onClick={toggleSidebarBtn} className="absolute h-full w-full flex justify-center items-center">
                           <svg
                              width="24"
                              height="24"
                              className="fill-current scale-150 hover:scale-[1.4] transition-transform duration-300 dark:text-gray-300 hover:text-gray-900"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
                                 fill="currentColor"
                              />
                              <path
                                 d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                                 fill="currentColor"
                              />
                              <path
                                 d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H5Z"
                                 fill="currentColor"
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="font-bold text-lg text-textPrimary dark:text-gray-300 flex justify-center items-center mt-3">SDN WARINGIN I</div>
               </div>
               <div className="overflow-auto w-full bg-gradient-to-tl from-primaryLight from-10% via-secondaryLight via-40% to-primaryLight to-90% dark:bg-gradient-to-tl dark:from-darkmodeSecondary dark:from-10% dark:via-darkmodeAccent dark:via-40% dark:to-darkmodeSecondary dark:to-90% pt-16 md:p-5">
                  {props.children}
               </div>
            </div>
         </div>
      </>
   );
};

export default Default;
