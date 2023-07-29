import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NilaiGuru = () => {
   const navigate = useNavigate();
   const [nilai, setNilai] = useState([]);
   const [loading, setLoading] = useState(true);
   const [mapel, setMapel] = useState([]);
   const [tahun, setTahun] = useState([]);
   const [mapelid, setMapelid] = useState(1);
   const [tahunid, setTahunid] = useState(new Date().getFullYear());
   const [semesterid, setSemesterid] = useState(1);
   const [classId, setClassId] = useState();

   const [kehadiran, setKehadiran] = useState();
   const [tugas, setTugas] = useState();
   const [uts, setUts] = useState();
   const [uas, setUas] = useState();
   const [opsi, setOpsi] = useState();

   useEffect(() => {
      axios
         .get("/guru/nilai?" + "&mapel=" + mapelid + "&tahun=" + tahunid + "&semester=" + semesterid, { withCredentials: true })
         .then((response) => {
            setClassId();
            setNilai(response.data.nilai);
            setMapel(response.data.mapel);
            setTahun(response.data.tahun);
            setLoading(false);
         })
         .catch((err) => {
            console.log("error");
            err.response.status == 403 ? navigate("/login") : console.error(err);
         });
   }, [mapelid, tahunid, semesterid]);

   const showCollapse = (data) => {
      console.log(data);
      if (!classId) {
         setClassId(data);
         const el = document.getElementById("collapse" + data);
         el.classList.toggle("hidden");
      } else {
         const ele = document.getElementById("collapse" + classId);
         ele.classList.toggle("hidden");
         setClassId(data);
         const elem = document.getElementById("collapse" + data);
         elem.classList.toggle("hidden");
      }
   };

   const updateNilai = (id) => {
      console.log(id);
      axios
         .post("/guru/nilai/update", { id: id, kehadiran: kehadiran, tugas: tugas, uts: uts, uas: uas, opsi: opsi }, { withCredentials: true })
         .then((response) => {
            console.log(response);
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
                  <div className="pt-5 ml-5 font-semibold cursor-pointer hover:-translate-y-0.5 transition dark:text-gray-400">
                     <Link to={"/guru/nilai/tambah"}>
                        <div>Tambah</div>
                     </Link>
                  </div>
               </div>
               {/* Order by end */}
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-5">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                           <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-darkmode">
                              Nama siswa
                           </th>
                           <th scope="col" className="px-6 py-3 dark:bg-darkmode">
                              Pelajaran
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
                     {nilai.map((list) => (
                        <tbody key={list.id}>
                           <tr className="border-b border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => showCollapse(list.id)}>
                              <th
                                 scope="row"
                                 className="px-6 py-4 font-medium text-gray-900 dark:bg-darkmode whitespace-nowrap bg-gray-50 dark:text-white"
                              >
                                 {list.siswa.nama}
                              </th>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-darkmode">{list.mapel.nama_mapel}</td>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_kehadiran}</td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-darkmode">{list.nilai_tugas}</td>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_uts}</td>
                              <td className="px-6 py-4 bg-gray-50 dark:bg-darkmode">{list.nilai_uas}</td>
                              <td className="px-6 py-4 dark:bg-slate-800">{list.nilai_opsi}</td>
                           </tr>
                           {/* Collapse menu */}
                           <tr className="dark:bg-darkmode hidden bg-gray-50" id={"collapse" + list.id}>
                              <td className="border-b border-gray-400 pt-2 pb-5" colSpan={7}>
                                 <div className="flex justify-between">
                                    <label htmlFor="kehadiran" className="pl-6 py-4">
                                       Kehadiran
                                    </label>
                                    <input
                                       type="number"
                                       className="mt-4 w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                       id="kehadiran"
                                       placeholder={list.nilai_kehadiran}
                                       onChange={(e) => setKehadiran(e.target.value)}
                                    />
                                    <label htmlFor="Tugas" className="pl-6 py-4">
                                       Tugas
                                    </label>
                                    <input
                                       type="number"
                                       className="mt-4 w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                       id="Tugas"
                                       placeholder={list.nilai_tugas}
                                       onChange={(e) => setTugas(e.target.value)}
                                    />
                                    <label htmlFor="uts" className="pl-6 py-4">
                                       UTS
                                    </label>
                                    <input
                                       type="number"
                                       className="mt-4 w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                       id="uts"
                                       placeholder={list.nilai_uts}
                                       onChange={(e) => setUts(e.target.value)}
                                    />
                                    <label htmlFor="uas" className="pl-6 py-4">
                                       UAS
                                    </label>
                                    <input
                                       type="number"
                                       className="mt-4 w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                       id="uas"
                                       placeholder={list.nilai_uas}
                                       onChange={(e) => setUas(e.target.value)}
                                    />
                                    <label htmlFor="lain-lain" className="pl-6 py-4">
                                       Opsi
                                    </label>
                                    <input
                                       type="number"
                                       className="mt-4 w-10 h-5 bg-transparent focus:outline-none border-b border-gray-400"
                                       id="lain-lain"
                                       placeholder={list.nilai_opsi}
                                       onChange={(e) => setOpsi(e.target.value)}
                                    />
                                    <div
                                       className="mx-5 my-3 py-1 px-1 border border-gray-400 rounded-md hover:opacity-75 cursor-pointer -translate-x-1/2"
                                       onClick={() => updateNilai(list.id)}
                                    >
                                       Update
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

export default NilaiGuru;
