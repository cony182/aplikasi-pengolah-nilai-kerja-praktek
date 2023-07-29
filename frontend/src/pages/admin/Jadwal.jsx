import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Jadwal = () => {
   const [jadwal, setJadwal] = useState([]);
   const [pelajaran, setPelajaran] = useState([]);
   const [kelas, setKelas] = useState([]);
   const [guru, setGuru] = useState([]);
   const [tahunAjar, setTahunAjar] = useState([]);

   const [pelajaranid, setPelajaranid] = useState();
   const [kelasid, setKelasid] = useState();
   const [guruid, setGuruid] = useState();
   const [hari, setHari] = useState("");
   const [jamMulai, setJamMulai] = useState("");
   const [jamAkhir, setJamAkhir] = useState("");

   const [tahun, setTahun] = useState(new Date().getFullYear());
   const [showForm, setShowForm] = useState(false);
   const [onSuccess, setOnSuccess] = useState(false);
   const [classId, setClassId] = useState();

   useEffect(() => {
      axios
         .get("/admin/schedule?" + "sort=" + tahun, { withCredentials: true })
         .then((response) => {
            console.log(response);
            setJadwal(response.data.jadwal);
            setKelas(response.data.kelas);
            setPelajaran(response.data.pelajaran);
            setGuru(response.data.guru);
            setTahunAjar(response.data.tahun);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [tahun]);

   const createJadwal = () => {
      axios
         .post(
            "/admin/schedule",
            {
               guruId: guruid,
               mapelId: pelajaranid,
               kelasId: kelasid,
               hari: hari,
               jamMulai: jamMulai,
               jamAkhir: jamAkhir,
            },
            { withCredentials: true }
         )
         .then((response) => {
            setPelajaranid("");
            setGuruid("");
            setKelasid("");
            setHari("");
            setJamMulai("");
            setJamAkhir("");
            setOnSuccess(true);
            setTimeout(() => {
               setOnSuccess(false);
            }, 3000);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const updateJadwal = (id) => {
      axios
         .post(
            "/admin/schedule/update",
            {
               guruId: guruid,
               mapelId: pelajaranid,
               kelasId: kelasid,
               hari: hari,
               jamMulai: jamMulai,
               jamAkhir: jamAkhir,
               id: id,
            },
            { withCredentials: true }
         )
         .then((response) => {
            setPelajaranid("");
            setGuruid("");
            setKelasid("");
            setHari("");
            setJamMulai("");
            setJamAkhir("");
            setOnSuccess(true);
            setTimeout(() => {
               setOnSuccess(false);
            }, 3000);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const showCollapse = (data) => {
      setJamMulai(data.jamMulai);
      setJamAkhir(data.jamAkhir);
      setHari(data.hari);
      if (!classId) {
         setClassId(data.id);
         const el = document.getElementById("collapse" + data.id);
         el.classList.toggle("hidden");
      } else {
         const ele = document.getElementById("collapse" + classId);
         ele.classList.toggle("hidden");
         setClassId(data.id);
         const elem = document.getElementById("collapse" + data.id);
         elem.classList.toggle("hidden");
      }
   };

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
                     <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Jadwal</span>
                  </div>
               </li>
            </ol>
         </nav>
         <div className="mt-4 mx-4 bg-gray-800">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
               <div className="w-full overflow-x-auto">
                  <div className="flex justify-between">
                     <div className="mt-3 text-gray-400 font-semibold ml-5">Daftar Jadwal Pelajaran</div>
                     <div className="flex flex-wrap">
                        <div className="text-gray-400 mt-3 w-16 mr-8">
                           <select
                              className="w-full bg-transparent text-gray-300 border-b border-gray-500 mx-2 focus:outline-none"
                              value={tahun}
                              onChange={(e) => setTahun(e.target.value)}
                           >
                              <option className="bg-darkmode">Tahun</option>
                              {tahunAjar.map((item) => (
                                 <option className="bg-darkmode" value={item.tahun} key={item.id}>
                                    {item.tahun}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <div
                           className="text-gray-300 w-20 bg-gray-700 mr-10 text-center rounded-md mt-3 hover:bg-gray-600 transition cursor-pointer"
                           onClick={() => {
                              if (classId) {
                                 document.getElementById("collapse" + classId).classList.toggle("hidden");
                                 setClassId("");
                              }
                              setShowForm(!showForm);
                           }}
                        >
                           {showForm ? "Batal" : "Tambah"}
                        </div>
                     </div>
                  </div>
                  {showForm ? (
                     <div className="border-b border-gray-700 pb-8">
                        <div className="flex flex-wrap justify-center">
                           <input
                              className="bg-transparent w-3/4 sm:w-1/4 mt-5 focus:outline-none border-b boorder-gray-500 text-gray-400 mx-10"
                              type="text"
                              placeholder="Hari"
                              required
                              value={hari}
                              onChange={(e) => setHari(e.target.value)}
                           />
                           <input
                              className="bg-transparent w-3/4 sm:w-1/4 mt-5 focus:outline-none border-b boorder-gray-500 text-gray-400 mx-10"
                              type="text"
                              placeholder="Jam mulai"
                              required
                              value={jamMulai}
                              onChange={(e) => setJamMulai(e.target.value)}
                           />
                           <input
                              className="bg-transparent w-3/4 sm:w-1/2 mt-5 focus:outline-none lg:w-1/4 border-b boorder-gray-500 text-gray-400 mx-10"
                              type="text"
                              placeholder="Jam akhir"
                              required
                              value={jamAkhir}
                              onChange={(e) => setJamAkhir(e.target.value)}
                           />
                           <div className="w-3/4 my-8 flex flex-wrap justify-center">
                              <select
                                 className="w-full sm:w-1/4 bg-transparent text-gray-400 border-b border-gray-500 mx-2 my-2"
                                 onChange={(e) => setPelajaranid(e.target.value)}
                              >
                                 <option className="bg-darkmode">Pelajaran</option>
                                 {pelajaran.map((item) => (
                                    <option className="bg-darkmode" value={item.id} key={item.id}>
                                       {item.nama_mapel}
                                    </option>
                                 ))}
                              </select>
                              <select
                                 className="w-full sm:w-1/4 bg-transparent text-gray-400 border-b border-gray-500 mx-2 my-2"
                                 onChange={(e) => setKelasid(e.target.value)}
                              >
                                 <option className="bg-darkmode">Kelas</option>
                                 {kelas.map((item) => (
                                    <option className="bg-darkmode" value={item.id} key={item.id}>
                                       {item.nama_kelas}
                                    </option>
                                 ))}
                              </select>
                              <select
                                 className="w-full sm:w-1/4 bg-transparent text-gray-400 border-b border-gray-500 mx-2 my-2"
                                 onChange={(e) => setGuruid(e.target.value)}
                              >
                                 <option className="bg-darkmode">Guru</option>
                                 {guru.map((item) => (
                                    <option className="bg-darkmode" value={item.id} key={item.id}>
                                       {item.nama}
                                    </option>
                                 ))}
                              </select>
                           </div>
                        </div>
                        <div className="w-[85%] mx-auto">
                           {onSuccess ? <div className="text-green-700 font-semibold text-center mb-3">Jadwal baru berhasil ditambahkan</div> : ""}
                           <div
                              className="w-full bg-gray-700 hover:bg-opacity-80 text-gray-300 py-0.5 text-center rounded-md cursor-pointer"
                              onClick={createJadwal}
                           >
                              Tambah
                           </div>
                        </div>
                     </div>
                  ) : (
                     ""
                  )}

                  <table className="w-full overflow-auto mt-12">
                     <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                           <th className="px-4 py-3">Mata Pelajaran</th>
                           <th className="px-4 py-3">Kelas</th>
                           <th className="px-4 py-3">Tahun</th>
                           <th className="px-4 py-3">Guru</th>
                        </tr>
                     </thead>
                     {jadwal.map((item) => (
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={item.id}>
                           <tr
                              className="bg-gray-800 hover:bg-gray-900 text-gray-400 cursor-pointer"
                              onClick={() => showCollapse({ id: item.id, jamMulai: item.jam_mulai, jamAkhir: item.jam_akhir, hari: item.hari })}
                           >
                              <td className="px-4 py-3">
                                 <div className="flex items-center text-sm">
                                    <div>
                                       <p className="font-semibold">{item.mapel.nama_mapel}</p>
                                       <p className="text-xs text-gray-600 dark:text-gray-400">
                                          {item.hari} : {item.jam_mulai} - {item.jam_akhir}
                                       </p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-3 text-sm relative">{item.kela.nama_kelas}</td>
                              <td className="px-4 py-3 text-xs">
                                 {item.tahun} / ( {item.semester} )
                              </td>
                              <td className="px-4 py-3 text-xs">{item.guru.nama}</td>
                              <td>
                                 <Link to={"/admin/pelajaran/" + item.id}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path
                                          d="M12.0519 14.8285L13.4661 16.2427L17.7087 12L13.4661 7.7574L12.0519 9.17161L13.8803 11H6.34318V13H13.8803L12.0519 14.8285Z"
                                          fill="currentColor"
                                       />
                                       <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M1 19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5C2.79086 1 1 2.79086 1 5V19ZM5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                                          fill="currentColor"
                                       />
                                    </svg>
                                 </Link>
                              </td>
                           </tr>
                           {/* collapse table */}
                           <tr className="bg-slate-800 hidden text-gray-400" id={"collapse" + item.id}>
                              <td className="px-2 m-5 border-b border-gray-500" colSpan={5}>
                                 {onSuccess && <div className="text-center text-sm text-green-600">Berhasil update</div>}
                                 <div className="flex w-[95%] m-5 justify-between items-center text-sm">
                                    <input
                                       type="text"
                                       className="bg-transparent border-b mx-2 border-gray-400 focus:outline-none"
                                       value={hari}
                                       onChange={(e) => setHari(e.target.value)}
                                    />
                                    <input
                                       type="text"
                                       className="bg-transparent border-b mx-2 border-gray-400 focus:outline-none"
                                       value={jamMulai}
                                       onChange={(e) => setJamMulai(e.target.value)}
                                    />
                                    <input
                                       type="text"
                                       className="bg-transparent border-b mx-2 border-gray-400 focus:outline-none"
                                       value={jamAkhir}
                                       onChange={(e) => setJamAkhir(e.target.value)}
                                    />
                                    <div
                                       className="rounded-md border border-gray-400 hover:opacity-70 cursor-pointer p-1"
                                       onClick={() => updateJadwal(item.id)}
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
               <div className="px-4 py-3 flex justify-end text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                  <span className="cursor-pointer hover:text-cyan-600 transition mr-3">SDN WARINGIN I</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Jadwal;
