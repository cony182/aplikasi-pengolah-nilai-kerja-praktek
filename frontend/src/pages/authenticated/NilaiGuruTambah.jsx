import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NilaiGuruTambah = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [mapel, setMapel] = useState([]);
   const [siswa, setSiswa] = useState([]);
   const [tahun, setTahun] = useState([]);
   const [classId, setClassId] = useState();

   const [mapelid, setMapelid] = useState(1);
   const [tahunid, setTahunid] = useState(new Date().getFullYear());
   const [semesterid, setSemesterid] = useState(1);
   const [kehadiran, setKehadiran] = useState();
   const [tugas, setTugas] = useState();
   const [uts, setUts] = useState();
   const [uas, setUas] = useState();
   const [opsi, setOpsi] = useState();

   console.log(mapelid);
   console.log(semesterid);

   useEffect(() => {
      axios
         .get("/guru/nilai/tambah", { withCredentials: true })
         .then((response) => {
            setClassId();
            setSiswa(response.data.siswa);
            setMapel(response.data.mapel);
            setTahun(response.data.tahun);
            setLoading(false);
         })
         .catch((err) => {
            err.response.status == 403 ? navigate("/login") : console.error(err);
         });
   }, []);

   const showCollapse = (data) => {
      if (!classId) {
         setClassId(data);
         const el = document.getElementById("collapse" + data);
         el.classList.toggle("hidden");
         document.getElementById("row" + data).classList.toggle("bg-gray-50");
      } else {
         const ele = document.getElementById("collapse" + classId);
         ele.classList.toggle("hidden");
         document.getElementById("row" + classId).classList.toggle("bg-gray-50");
         setClassId(data);
         const elem = document.getElementById("collapse" + data);
         elem.classList.toggle("hidden");
         document.getElementById("row" + data).classList.toggle("bg-gray-50");
      }
   };

   const create = (id) => {
      axios
         .post(
            "/guru/nilai/tambah",
            {
               siswaId: id,
               mapelId: mapelid,
               tahun: tahunid,
               semester: semesterid,
               kehadiran: kehadiran,
               tugas: tugas,
               uts: uts,
               uas: uas,
               opsi: opsi,
            },
            { withCredentials: true }
         )
         .then((response) => {
            // console.log(response);
         })
         .catch((err) => {
            console.log(err);
         });
   };

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
               <div className="text-gray-600 dark:text-gray-400 font-semibold">Tambah nilai baru</div>
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
                           <select
                              className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                              value={tahunid}
                              onChange={(e) => setTahunid(e.target.value)}
                           >
                              {tahun.map((item) => (
                                 <option className="text-sm" value={item.tahun} key={item.id}>
                                    {item.tahun}
                                 </option>
                              ))}
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
                           <select
                              className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                              onChange={(e) => setSemesterid(e.target.value)}
                              value={semesterid}
                           >
                              <option value="1">1</option>
                              <option value="2">2</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="pt-5">
                     <div className="max-w-md flex mx-5 md:mx-3">
                        <label htmlFor="select" className="font-semibold block dark:text-gray-400 mr-5">
                           Pelajaran:
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
                           <select
                              className="text-gray-400 rounded-full flex h-6 w-32 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                              value={mapelid}
                              onChange={(e) => setMapelid(e.target.value)}
                           >
                              {mapel.map((item) => (
                                 <option className="text-sm" value={item.id} key={item.id}>
                                    {item.nama_mapel}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-5">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              Nama siswa
                           </th>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              Kelas
                           </th>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              NIS
                           </th>
                        </tr>
                     </thead>
                     {siswa.map((list) => (
                        <tbody key={list.id}>
                           <tr
                              className="border-b border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50 dark:bg-darkmode dark:hover:bg-gray-800 hover:bg-gray-200"
                              onClick={() => showCollapse(list.id)}
                              id={"row" + list.id}
                           >
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300 ">
                                 {list.nama}
                              </th>
                              <td className="px-6 py-4">{list.kela.nama_kelas}</td>
                              <td className="px-6 py-4">{list.NIS}</td>
                           </tr>
                           {/* Collapse */}
                           <tr className="dark:bg-darkmode hidden" id={"collapse" + list.id}>
                              <td className="border-b border-gray-400 pt-2 pb-10" colSpan={7}>
                                 <div className="flex justify-start">
                                    <div className="pt-5">
                                       <div className="max-w-md flex mx-5 md:mx-3">
                                          <label htmlFor="select" className="font-semibold block dark:text-gray-400 mr-5">
                                             Pelajaran:
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
                                             <select
                                                className="text-gray-400 rounded-full flex h-6 w-32 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                                                value={mapelid}
                                                onChange={(e) => setMapelid(e.target.value)}
                                             >
                                                {mapel.map((item) => (
                                                   <option className="text-sm" value={item.id} key={item.id}>
                                                      {item.nama_mapel}
                                                   </option>
                                                ))}
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
                                             <select
                                                className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                                                onChange={(e) => setSemesterid(e.target.value)}
                                                value={semesterid}
                                             >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                             </select>
                                          </div>
                                       </div>
                                    </div>
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
                                             <select
                                                className="text-gray-400 rounded-full flex h-6 w-20 pl-2 pr-4 dark:bg-slate-700 hover:border-gray-400 focus:outline-none appearance-none"
                                                value={tahunid}
                                                onChange={(e) => setTahunid(e.target.value)}
                                             >
                                                {tahun.map((item) => (
                                                   <option className="text-sm" value={item.tahun} key={item.id}>
                                                      {item.tahun}
                                                   </option>
                                                ))}
                                             </select>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="w-full flex justify-start pt-5">
                                    <div>
                                       <label htmlFor="kehadiran" className="pl-3 mr-2 py-4">
                                          Kehadiran
                                       </label>
                                       <input
                                          type="number"
                                          className="mt-4 text-center w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                          id="kehadiran"
                                          placeholder="-"
                                          onChange={(e) => setKehadiran(e.target.value)}
                                       />
                                    </div>
                                    <div>
                                       <label htmlFor="Tugas" className="pl-5 mr-2 py-4">
                                          Tugas
                                       </label>
                                       <input
                                          type="number"
                                          className="mt-4 text-center w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                          id="Tugas"
                                          placeholder="-"
                                          onChange={(e) => setTugas(e.target.value)}
                                       />
                                    </div>
                                    <div>
                                       <label htmlFor="uts" className="pl-5 mr-2 py-4">
                                          UTS
                                       </label>
                                       <input
                                          type="number"
                                          className="mt-4 text-center w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                          id="uts"
                                          placeholder="-"
                                          onChange={(e) => setUts(e.target.value)}
                                       />
                                    </div>
                                    <div>
                                       <label htmlFor="uas" className="pl-5 mr-2 py-4">
                                          UAS
                                       </label>
                                       <input
                                          type="number"
                                          className="mt-4 text-center w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                          id="uas"
                                          placeholder="-"
                                          onChange={(e) => setUas(e.target.value)}
                                       />
                                    </div>
                                    <div>
                                       <label htmlFor="lain-lain" className="pl-5 mr-2 py-4">
                                          Opsi
                                       </label>
                                       <input
                                          type="number"
                                          className="mt-4 text-center w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                          id="lain-lain"
                                          placeholder="-"
                                          onChange={(e) => setOpsi(e.target.value)}
                                       />
                                    </div>
                                    <div
                                       className="mx-8 my-3 py-1 px-1 border border-gray-400 rounded-md hover:opacity-75 cursor-pointer"
                                       onClick={() => create(list.id)}
                                    >
                                       Tambah
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     ))}
                  </table>
               </div>
            </div>
         </Default>
      </>
   );
};

export default NilaiGuruTambah;
