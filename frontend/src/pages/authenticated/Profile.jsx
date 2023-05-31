import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import Logo from "../../assets/profile.svg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";

const Profile = () => {
   const navigateTo = useNavigate();

   const url = window.location.pathname;
   const role = url.split("/")[1];

   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState([]);
   const [roleUser, setRoleUser] = useState([]);
   const [kelas, setKelas] = useState([]);
   const [waliKelas, setWaliKelas] = useState([]);
   const [isGuru, setIsGuru] = useState();
   // FORM USER
   const [fullname, setFullname] = useState();
   const [nickname, setNickname] = useState();
   // FORM ROLEUSER
   const [nama, setNama] = useState();
   const [alamat, setAlamat] = useState();
   const [telp, setTelp] = useState();
   const [onSuccess, setOnSuccess] = useState(false);
   const [onProcess, setOnProcess] = useState(false);
   const [onChange, setOnChange] = useState(false);

   // useEffect(() => {
   //    if (fullname || nickname) setOnChange(true);
   // }, [fullname, nickname]);

   useEffect(() => {
      axios
         .get("http://192.168.100.2:5000/" + role + "/profile", {
            withCredentials: true,
         })
         .then((response) => {
            setUser(response.data);
            if (response.data.role === "siswa") {
               setRoleUser(response.data.siswa);
               setKelas(response.data.siswa.kela);
               setWaliKelas(response.data.siswa.wali_kelas[0].guru);
               setIsGuru(false);
               setLoading(false);
            } else {
               setRoleUser(response.data.guru);
               setIsGuru(true);
               setLoading(false);
            }
         })
         .catch((err) => {
            err.response.status == 403 ? navigateTo("/login") : console.error(err);
         });
   }, []);

   const update = () => {
      if (onProcess) return;

      setOnProcess(true);
      console.log("hitung");
      axios
         .post(
            "http://192.168.100.2:5000/update/profile",
            {
               user: {
                  fullname: fullname,
                  nickname: nickname,
               },
               role: {
                  nama: nama,
                  alamat: alamat,
                  telp: telp,
               },
            },
            { withCredentials: true }
         )
         .then((response) => {
            setOnSuccess(true);
            setOnProcess(false);
         })
         .catch((err) => {
            setOnProcess(false);
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
            <section className="pt-10">
               <nav className="w-full rounded-md">
                  <ol className="list-reset flex">
                     <li className="text-neutral-500 ml-3 md:ml-0 dark:text-gray-400">Profile</li>
                  </ol>
               </nav>
               <div className="w-full px-2 md:px-4 mx-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-darkmode dark:text-gray-500 w-full mb-6 shadow-md rounded-lg mt-16">
                     <div className="md:px-6">
                        <div className="flex flex-wrap justify-center">
                           <div className="w-full px-4 h-2 -translate-y-12 flex justify-center lg:justify-start">
                              <div className="h-36 relative">
                                 <img
                                    src={user.picture ? `http://192.168.100.2:5000/images/avatar/${user.picture}` : Logo}
                                    alt=""
                                    className={`h-36 w-36 rounded-full bg-gray-300 ring-2 ring-blue-300`}
                                 />
                                 <Link to={`/${role}/profile/avatar`}>
                                    <div className={`absolute right-1.5 bottom-1.5 rounded-full bg-white dark:bg-blue-300`}>
                                       <div className="w-8 h-8 rounded-full text-black flex justify-center items-center cursor-pointer">
                                          <ion-icon name="create-outline"></ion-icon>
                                          <input type="file" className="hidden" />
                                       </div>
                                    </div>
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <div className="text-center lg:text-start mt-28 lg:ml-4 lg:mt-0">
                           <div className="lg:ml-40">
                              <h3 className="text-xl font-semibold leading-normal text-gray-500 dark:text-gray-400 mb-2">{roleUser.nama}</h3>
                              <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 dark:text-gray-400 font-bold uppercase">
                                 {isGuru ? <div>NIP : {roleUser.NIP}</div> : <div>NIS : {roleUser.NIS}</div>}
                              </div>
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
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Full name{" "}
                                                <span className="h-4 inline-flex translate-y-0.5 ml-2">
                                                   <label htmlFor="fullname" className="cursor-pointer">
                                                      <ion-icon name="create-outline"></ion-icon>
                                                   </label>
                                                </span>
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                <input
                                                   id="fullname"
                                                   className="w-full bg-transparent text-sm font-normal focus:outline-0 text-gray-500 dark:text-gray-400"
                                                   placeholder="Kosong"
                                                   defaultValue={user.fullname ? user.fullname : ""}
                                                   onChange={(e) => {
                                                      setFullname(e.target.value);
                                                      setOnChange(true);
                                                   }}
                                                />
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Nickname{" "}
                                                <span className="h-4 inline-flex translate-y-0.5 ml-2">
                                                   <label htmlFor="nickname" className="cursor-pointer">
                                                      <ion-icon name="create-outline"></ion-icon>
                                                   </label>
                                                </span>
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                <input
                                                   id="nickname"
                                                   className="w-full bg-transparent text-sm font-normal focus:outline-0 text-gray-500 dark:text-gray-400"
                                                   placeholder="Kosong"
                                                   defaultValue={user.nickname ? user.nickname : ""}
                                                   onChange={(e) => {
                                                      setNickname(e.target.value);
                                                      setOnChange(true);
                                                   }}
                                                />
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                {user.email ? user.email : <div className="text-gray-500 dark:text-gray-400">Kosong</div>}
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                {user.role ? user.role : <div className="text-gray-500 dark:text-gray-400">Kosong</div>}
                                             </dd>
                                          </div>
                                       </dl>
                                    </div>
                                 </div>
                                 {/* Detail Guru / Siswa */}
                                 <div className="bg-white dark:bg-darkmode md:pt-10 overflow-hidden rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                       <h3 className="text-lg leading-6 font-medium text-gray-500 dark:text-gray-400 text-left">
                                          Detail {isGuru ? "guru" : "siswa"}
                                       </h3>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-5 sm:p-0">
                                       <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-500 text-left">
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Nama{" "}
                                                <span className="h-4 inline-flex translate-y-0.5 ml-2">
                                                   <label htmlFor="nama" className="cursor-pointer">
                                                      <ion-icon name="create-outline"></ion-icon>
                                                   </label>
                                                </span>
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                <input
                                                   id="nama"
                                                   className="w-full bg-transparent text-sm font-normal focus:outline-0 text-gray-500 dark:text-gray-400"
                                                   placeholder="Kosong"
                                                   defaultValue={roleUser.nama ? roleUser.nama : ""}
                                                   onChange={(e) => {
                                                      setNama(e.target.value);
                                                      setOnChange(true);
                                                   }}
                                                />
                                             </dd>
                                          </div>
                                          {user.role === "guru" ? (
                                             <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Telp</dt>
                                                <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                   {roleUser.pendidikan ? (
                                                      roleUser.pendidikan
                                                   ) : (
                                                      <div className="text-gray-500 dark:text-gray-400">Kosong</div>
                                                   )}
                                                </dd>
                                             </div>
                                          ) : (
                                             <>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                   <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Kelas</dt>
                                                   <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                      {kelas.kode_kelas ? (
                                                         <div>
                                                            {kelas.kode_kelas} ({kelas.nama_kelas})
                                                         </div>
                                                      ) : (
                                                         <div className="text-gray-500 dark:text-gray-400">Kosong</div>
                                                      )}
                                                   </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                   <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Wali kelas</dt>
                                                   <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                      {kelas.kode_kelas ? (
                                                         waliKelas.nama
                                                      ) : (
                                                         <div className="text-gray-500 dark:text-gray-400">Kosong</div>
                                                      )}
                                                   </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                   <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tahun masuk</dt>
                                                   <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                      {roleUser.thn_masuk ? (
                                                         roleUser.thn_masuk
                                                      ) : (
                                                         <div className="text-gray-500 dark:text-gray-400">Kosong</div>
                                                      )}
                                                   </dd>
                                                </div>
                                             </>
                                          )}
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Alamat{" "}
                                                <span className="h-4 inline-flex translate-y-0.5 ml-2">
                                                   <label htmlFor="alamat" className="cursor-pointer">
                                                      <ion-icon name="create-outline"></ion-icon>
                                                   </label>
                                                </span>
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                <input
                                                   id="alamat"
                                                   className="w-full bg-transparent text-sm font-normal focus:outline-0 text-gray-500 dark:text-gray-400"
                                                   placeholder="Kosong"
                                                   defaultValue={roleUser.alamat ? roleUser.alamat : ""}
                                                   onChange={(e) => {
                                                      setAlamat(e.target.value);
                                                      setOnChange(true);
                                                   }}
                                                />
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Jenis kelamin</dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                {roleUser.kelamin == "P" ? "Perempuan" : "Laki-laki"}
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Telp{" "}
                                                <span className="h-4 inline-flex translate-y-0.5 ml-2">
                                                   <label htmlFor="telp" className="cursor-pointer">
                                                      <ion-icon name="create-outline"></ion-icon>
                                                   </label>
                                                </span>
                                             </dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                <input
                                                   id="telp"
                                                   className="w-full bg-transparent text-sm font-normal focus:outline-0 text-gray-500 dark:text-gray-400"
                                                   placeholder="Kosong"
                                                   defaultValue={roleUser.telp ? roleUser.telp : ""}
                                                   onChange={(e) => {
                                                      setTelp(e.target.value);
                                                      setOnChange(true);
                                                   }}
                                                />
                                             </dd>
                                          </div>
                                          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                             <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tempat tgl lahir</dt>
                                             <dd className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:col-span-2">
                                                {roleUser.tmpt_lahir && roleUser.tgl_lahir ? (
                                                   <div>
                                                      {roleUser.tmpt_lahir}, {roleUser.tgl_lahir}
                                                   </div>
                                                ) : (
                                                   <div className="text-gray-500 dark:text-gray-400">Kosong</div>
                                                )}
                                             </dd>
                                          </div>
                                       </dl>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {onSuccess && <div className="flex justify-center mx-12 mb-5">Data {user.role} telah diperbarui</div>}
                        <div></div>
                        <div className="flex justify-end mx-12 mb-5">
                           {onChange ? (
                              <div onClick={update} className="w-full">
                                 <Button
                                    className={`w-full bg-secondaryLight font-semibold p-2 rounded-lg hover:bg-opacity-80 dark:text-gray-300 dark:hover:brightness-110 
                                    ${onProcess ? "dark:bg-gray-800" : "dark:bg-gray-700"}`}
                                    name="update"
                                 />
                              </div>
                           ) : (
                              ""
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </Default>
      </>
   );
};

export default Profile;
