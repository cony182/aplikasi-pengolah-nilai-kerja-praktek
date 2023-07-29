import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Guest = (props) => {
   const [hasLogin, setHasLogin] = useState(false);
   const [isReguler, setIsReguler] = useState(true);
   const [role, setRole] = useState();
   const [loading, setLoading] = useState(true);
   const [navbarToggle, setNavbarToggle] = useState(false);

   useEffect(() => {
      axios
         .get("/reguler", { withCredentials: true })
         .then((response) => {
            setRole(response.data.role);
            response.data.isReguler ? setIsReguler(true) : setIsReguler(false);
            response.status == 200 ? setHasLogin(true) : setHasLogin(false);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         });
   }, []);

   const navbarSwitch = () => {
      setNavbarToggle(!navbarToggle);
   };

   return loading ? (
      <Loading />
   ) : (
      <>
         <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
            <div className="bg-white shadow">
               <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between py-4">
                     <div className="font-bold">SDN WARINGIN I</div>
                     <div className="hidden sm:flex sm:ml-auto sm:border-r-2 pr-4 sm:mr-10">
                        <Link to="/pendaftaran">
                           <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1 px-2">Pendaftaran</span>
                        </Link>
                        <Link to="/kontak">
                           <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1 px-2">Kontak</span>
                        </Link>
                        {role == "admin" && (
                           <Link to="/admin">
                              <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1 px-2">Admin</span>
                           </Link>
                        )}
                     </div>
                     <div className="hidden sm:flex sm:items-center">
                        {hasLogin ? (
                           <div className="hidden sm:flex sm:items-center">
                              {!isReguler ? (
                                 <Link to={`/${role}/jadwal`}>
                                    <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg transition duration-300 hover:text-purple-600 hover:border-purple-600">
                                       Dashboard
                                    </span>
                                 </Link>
                              ) : (
                                 <Link to={`/home/${role}`}>
                                    <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg transition duration-300 hover:text-purple-600 hover:border-purple-600">
                                       Dashboard
                                    </span>
                                 </Link>
                              )}
                           </div>
                        ) : (
                           <Link to="/login">
                              <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg transition duration-300 hover:text-purple-600 hover:border-purple-600">
                                 Login
                              </span>
                           </Link>
                        )}
                     </div>

                     <div className="sm:hidden cursor-pointer" onClick={navbarSwitch}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
                              fill="currentColor"
                           />
                           <path
                              d="M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"
                              fill="currentColor"
                           />
                           <path
                              d="M11 11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H11Z"
                              fill="currentColor"
                           />
                        </svg>
                     </div>
                  </div>
                  <div
                     className={navbarToggle ? "block sm:hidden bg-white border-t-2 py-2" : "hidden sm:hidden bg-white border-t-2 py-2"}
                     id="navbarToggle"
                  >
                     <div className="flex flex-col">
                        <Link to="/pendaftaran">
                           <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Pendaftaran</span>
                        </Link>
                        <Link to="/kontak">
                           <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Kontak</span>
                        </Link>
                        {role == "admin" && (
                           <Link to="/admin">
                              <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Admin</span>
                           </Link>
                        )}
                        <div className="flex justify-end items-center border-t-2 pt-2">
                           {hasLogin ? (
                              <>
                                 <Link to="/logout">
                                    <span className="text-gray-800 text-sm font-semibold transition duration-300 hover:text-purple-600 mr-4">
                                       Logout
                                    </span>
                                 </Link>
                              </>
                           ) : (
                              <>
                                 <Link to="/login">
                                    <span className="text-gray-800 text-sm font-semibold transition duration-300 hover:text-purple-600 mr-4">
                                       Login
                                    </span>
                                 </Link>
                                 <Link to="/register">
                                    <span className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg transition duration-300 hover:text-purple-600 hover:border-purple-600">
                                       Register
                                    </span>
                                 </Link>
                              </>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mx-10 my-2">{props.children}</div>
         </div>
      </>
   );
};

export default Guest;
