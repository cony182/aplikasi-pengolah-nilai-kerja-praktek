import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import axios from "axios";
import Button from "../../components/Button";
import Progress from "../../components/Progress";
import { useNavigate } from "react-router-dom";
import DangerConfirm from "../../components/DangerConfirm";
import PopupSuccess from "../../components/PopupSuccess";

const UpdateAvatar = () => {
   const navigate = useNavigate();

   const [avatar, setAvatar] = useState();
   const [progress, setProgress] = useState(false);
   const [confirm, setConfirm] = useState(false);
   const [success, setSuccess] = useState(false);

   const deleteAvatar = (e) => {
      e.preventDefault();

      axios
         .post("http://192.168.100.2:5000/update/profile/avatar/delete", { meme: "meme" }, { withCredentials: true })
         .then((response) => {
            navigate(-1);
         })
         .catch((err) => {
            console.log("pass");
            console.log(err);
         });
   };

   const update = (e) => {
      e.preventDefault();

      if (!avatar) return;

      setProgress(true);

      const formData = new FormData();
      formData.append("avatar", avatar);

      axios
         .post(
            "http://192.168.100.2:5000/update/profile/avatar",
            formData,
            { withCredentials: true },
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            }
         )
         .then((response) => {
            setProgress(false);
            setSuccess(true);
            setTimeout(() => {
               setSuccess(false);
               navigate(-1);
            }, 1500);
         })
         .catch((err) => {
            console.log("pass");
            console.log(err);
         });
   };

   return (
      <Default>
         {progress && <Progress />}

         {confirm && (
            <DangerConfirm title="Hapus foto?" desc="Avatar profile anda akan di ganti ke avatar bawaan.">
               <div
                  onClick={deleteAvatar}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-1/2"
               >
                  <Button name="Ok" className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white" />
               </div>
               <div
                  onClick={(e) => {
                     e.preventDefault();
                     setConfirm(false);
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-1/2"
               >
                  <Button name="Batal" className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900" />
               </div>
            </DangerConfirm>
         )}

         {success && <PopupSuccess desc="Foto profile berhasil diperbarui" />}

         <form className="inline">
            <div className="flex items-center relative justify-center w-full">
               <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-3/4 h-64 border-2 sm:translate-y-full border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
               >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                     <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                     </svg>
                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Klik untuk upload</span>
                     </p>
                     <p className="text-xs text-gray-500 dark:text-gray-400">Format harus PNG atau JPG</p>
                  </div>
                  <input id="dropzone-file" name="image" type="file" className="hidden" onChange={(e) => setAvatar(e.target.files[0])} />
                  <div className="dark:text-gray-400">{avatar ? avatar.name : ""}</div>
               </label>
            </div>
            <div className="flex flex-wrap w-3/4 justify-between items-end mx-auto h-1/3">
               <div
                  onClick={(e) => {
                     e.preventDefault();
                     setConfirm(true);
                  }}
                  className="h-10 w-full sm:w-32 md:mb-5 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-gray-400"
               >
                  <Button
                     name="Hapus foto"
                     className="h-10 w-full sm:w-32 md:mb-5 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-gray-400"
                  />
               </div>
               <div
                  onClick={update}
                  className="h-10 w-full sm:w-32 md:mb-5 ml-auto rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-gray-400"
               >
                  <Button
                     name="Update"
                     type="submit"
                     className="h-10 w-full sm:w-32 md:mb-5 ml-auto rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-gray-400"
                  />
               </div>
            </div>
         </form>
      </Default>
   );
};

export default UpdateAvatar;
