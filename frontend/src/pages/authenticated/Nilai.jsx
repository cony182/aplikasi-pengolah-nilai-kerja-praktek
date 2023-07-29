import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Grade = () => {
   const navigate = useNavigate();
   const [nilai, setNilai] = useState([]);
   const [loading, setLoading] = useState(true);
   const [siswa, setSiswa] = useState([]);
   const [kelas, setKelas] = useState([]);
   const [tahun, setTahun] = useState(2020);
   const [semester, setSemester] = useState(1);

   useEffect(() => {
      axios
         .get("/siswa/nilai", { withCredentials: true })
         .then((response) => {
            setNilai(response.data[0]);
            setSiswa(response.data[1]);
            setKelas(response.data[1].kela);
            setTahun(response.data[1].thn_tempuh);
            setSemester(response.data[1].semester);
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
            <div className="pt-10">
               <nav className="w-full rounded-md">
                  <ol className="list-reset flex">
                     <li className="text-neutral-500 ml-3 md:ml-0 dark:text-gray-400">Nilai</li>
                  </ol>
               </nav>
               <div className="pt-5">
                  <div className="w-full p-8 sm:flex sm:space-x-6 dark:bg-gray-900 bg-primaryLight rounded-lg dark:text-gray-100">
                     <div className="flex flex-col space-y-4">
                        <div>
                           <h2 className="text-2xl font-semibold">{siswa.nama}</h2>
                           <span className="text-sm dark:text-gray-400">NIS : {siswa.NIS}</span>
                        </div>
                        <div className="space-y-1">
                           <span className="flex items-center space-x-2">
                              <span className="dark:text-gray-400">Kelas : {kelas.nama_kelas}</span>
                           </span>
                           <span className="flex items-center space-x-2">
                              <span className="dark:text-gray-400">Semester {siswa.semester}</span>
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Order by start */}
               <div className="sm:flex">
                  <div className="pt-5">
                     <div className="max-w-md flex mx-5 md:mx-3">
                        <label htmlFor="select" className="font-semibold block dark:text-gray-400 mr-5">
                           Tahun:
                        </label>
                        <div className="relative inline-flex">
                           <svg
                              className="w-4 h-4 absolute text-white rotate-180 font-semibold right-0 top-0 -translate-y-3 translate-x-3 m-4 pointer-events-none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <polyline points="18 15 12 9 6 15" />
                           </svg>
                           <select className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none">
                              <option className="text-sm" disabled={true}>
                                 Pilih..
                              </option>
                              <option>2021</option>
                              <option>2022</option>
                              <option>2023</option>
                              <option>2024</option>
                              <option>2025</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="pt-5">
                     <div className="max-w-md flex mx-5 md:mx-3">
                        <label htmlFor="select" className="font-semibold block dark:text-gray-400 mr-5">
                           Semester:
                        </label>
                        <div className="relative inline-flex">
                           <svg
                              className="w-4 h-4 absolute text-white rotate-180 font-semibold right-0 top-0 -translate-y-3 translate-x-3 m-4 pointer-events-none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           >
                              <polyline points="18 15 12 9 6 15" />
                           </svg>
                           <select className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none">
                              <option className="text-sm" disabled={true}>
                                 Pilih..
                              </option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Order by end */}
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-5">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              Mata Pelajaran
                           </th>
                           <th scope="col" className="px-6 py-3 dark:bg-darkmode">
                              Kehadiran
                           </th>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              Tugas
                           </th>
                           <th scope="col" className="px-6 py-3 dark:bg-darkmode">
                              UTS
                           </th>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              UAS
                           </th>
                           <th scope="col" className="px-6 py-3 dark:bg-darkmode">
                              Lain-lain
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {nilai.map((list) => (
                           <tr className="border-b border-gray-200 dark:border-gray-700" key={list.id}>
                              <th
                                 scope="row"
                                 className="px-6 py-4 font-medium text-gray-900 dark:bg-darkmode whitespace-nowrap bg-gray-50 dark:text-white"
                              >
                                 {list.mapel.nama_mapel}
                              </th>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_kehadiran}</td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-darkmode">{list.nilai_tugas}</td>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_uts}</td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-darkmode">{list.nilai_uas}</td>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_opsi}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </Default>
      </>
   );
};

export default Grade;
