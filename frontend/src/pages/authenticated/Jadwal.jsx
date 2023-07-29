import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Default from "../layouts/Default";

function Dashboard() {
   const navigate = useNavigate();

   const url = window.location.pathname;
   const role = url.split("/")[1];

   const [mapel, setMapel] = useState([]);
   const [loading, setLoading] = useState(true);
   const [isGuru, setIsGuru] = useState();

   useEffect(() => {
      axios
         .get("/" + role + "/jadwal", {
            withCredentials: true,
         })
         .then((response) => {
            console.log(response.data);
            setMapel(response.data.jadwal);
            setIsGuru(response.data.role == "guru" ? true : false);
            setLoading(false);
         })
         .catch((err) => {
            err.response.status == 403 ? navigate("/login") : console.error(err);
         });
   }, []);

   return loading ? (
      <>
         <Default>
            <div className="flex animate-pulse m-6 pt-20">
               <div className="flex-shrink-0">
                  <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700" />
               </div>
               <div className="ml-4 mt-2 w-full">
                  <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700" style={{ width: "40%" }} />
                  <ul className="mt-5 space-y-3">
                     <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
                     <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
                     <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
                     <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
                  </ul>
               </div>
            </div>
         </Default>
      </>
   ) : (
      <>
         <Default>
            <>
               <div className="pt-10">
                  <nav className="w-full rounded-md mb-5">
                     <ol className="list-reset flex">
                        <li className="text-neutral-500 dark:text-gray-400 ml-3">Jadwal</li>
                     </ol>
                  </nav>
                  {isGuru && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
                        <div className="bg-acccentLight dark:bg-darkmode shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white dark:text-gray-300 font-medium group cursor-pointer">
                           <div className="text-right ml-auto mr-5">
                              <p className="text-xl">Jadwal</p>
                              <p className="font-medium text-sm">Lihat detail jadwal</p>
                           </div>
                        </div>
                     </div>
                  )}
                  {}
                  <div className="flex flex-wrap">
                     {mapel.map((pel) => (
                        <div
                           className="max-w-sm rounded overflow-hidden shadow-lg mx-auto sm:mx-0 sm:ml-3 my-3 bg-white dark:bg-darkmode"
                           key={pel.id}
                        >
                           <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-2 dark:text-gray-300">{pel.mapel.nama_mapel}</div>
                              <p className="text-gray-700 text-base dark:text-gray-500">{pel.guru.nama}</p>
                           </div>
                           <div className="px-6 pb-2">
                              <span className="inline-block bg-gray-200 dark:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                 {pel.hari}
                              </span>
                              <span className="inline-block bg-gray-200 dark:bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                 Jam {pel.jam_mulai} - {pel.jam_akhir}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         </Default>
      </>
   );
}

export default Dashboard;
