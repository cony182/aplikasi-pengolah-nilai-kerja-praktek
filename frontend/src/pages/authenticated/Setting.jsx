import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import SwitchInput from "../../components/SwitchInput";
import axios from "axios";

const Setting = () => {
   const [miniSidebar, setMiniSidebar] = useState(localStorage.getItem("miniSidebar") === "true" ? true : false);
   const [darkmode, setDarkmode] = useState(localStorage.getItem("darkmode") === "true" ? true : false);

   useEffect(() => {
      if (!localStorage.getItem("miniSidebar") || !localStorage.getItem("darkmode")) {
         localStorage.setItem("miniSidebar", false);
         localStorage.setItem("darkmode", false);
      }
   }, []);

   const toggleMiniSidebar = () => {
      const toggle = !miniSidebar;
      setMiniSidebar(toggle);
      localStorage.setItem("miniSidebar", toggle);
   };

   const toggleDarkmode = () => {
      const toggle = !darkmode;
      setDarkmode(toggle);
      localStorage.setItem("darkmode", toggle);

      toggle ? document.body.classList.add("dark") : document.body.classList.remove("dark");
   };

   const updatePassword = () => {
      console.log("das");
   };

   return (
      <>
         <Default>
            <div className="m-4">
               <nav className="w-full rounded-md mb-5">
                  <ol className="list-reset flex">
                     <li className="text-neutral-500 dark:text-gray-400">Pengaturan</li>
                  </ol>
               </nav>
               <div className="m-1 rounded-lg p-4 bg-white dark:bg-darkmode shadow-md">
                  <div className="pb-4 border-b dark:border-slate-500">
                     <div className="flex justify-between">
                        <div className="dark:text-gray-400 font-medium">Mini sidebar</div>
                        <div>
                           <SwitchInput defaultChecked={miniSidebar} onClick={toggleMiniSidebar} />
                        </div>
                     </div>
                     <div className="text-sm mt-2 text-gray-500">
                        Ukuran sidebar menjadi minimalis. Tidak ada keterangan, hanya icon yang ditampilkan. Berlaku untuk mobile.
                     </div>
                  </div>
                  <div className="py-4 border-b dark:border-slate-500">
                     <div className="flex justify-between">
                        <div className="dark:text-gray-400 font-medium">Tema gelap</div>
                        <div>
                           <SwitchInput onClick={toggleDarkmode} defaultChecked={darkmode} />
                        </div>
                     </div>
                     <div className="text-sm mt-2 text-gray-500">
                        Ubah set warna menjadi gelap untuk penggunaan di malam hari atau tempat kurang cahaya
                     </div>
                  </div>
                  <div
                     className="py-4 border-b dark:border-slate-500 cursor-pointer hover:bg-gray-50 hover:dark:bg-darkmodeSecondary"
                     onClick={updatePassword}
                  >
                     <div className="flex justify-between">
                        <div className="dark:text-gray-400 font-medium">Ubah kata sandi</div>
                     </div>
                     <div className="text-sm mt-2 text-gray-500">Tidak berlaku untuk yang membuat akun menggunakan akun Google.</div>
                  </div>
               </div>
            </div>
         </Default>
      </>
   );
};

export default Setting;
