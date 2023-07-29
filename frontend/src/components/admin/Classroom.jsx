import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Classroom = (props) => {
   const navigate = useNavigate();

   const [classrooms, setClassrooms] = useState(props.data);
   const [modalAddClassroom, setModalAddClassroom] = useState(false);
   const [newClassroomName, setNewClassroomName] = useState("");
   const [newClassroomCode, setNewClassroomCode] = useState("");
   const [refresh, setRefresh] = useState(0);
   const [success, setSuccess] = useState(false);

   useEffect(() => {
      axios
         .get("/admin/classroom", { withCredentials: true })
         .then((response) => {
            setClassrooms(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [refresh]);

   const createClassroom = () => {
      axios
         .post("/admin/classroom/add", { nama_kelas: newClassroomName, kode_kelas: newClassroomCode }, { withCredentials: true })
         .then((response) => {
            setNewClassroomCode("");
            setNewClassroomName("");
            setRefresh(refresh + 1);
            setSuccess(true);
         })
         .catch((err) => {
            console.log(err);
            setAddNis("");
         });
   };

   return (
      <div className="md:col-span-2 xl:col-span-1">
         <div className="rounded bg-gray-800 p-3">
            <div className="flex justify-between py-1 text-black dark:text-white">
               <h3 className="text-sm font-semibold">Daftar kelas</h3>
               <div className="relative">
                  <div className="group">
                     <svg
                        className="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                     >
                        <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                     </svg>
                     <div className="group-hover:block hidden absolute -translate-x-3/4 -translate-y-1 w-auto p-2 rounded-md border border-darkmode bg-gray-700">
                        <div className="w-32">
                           <ul>
                              <li className="text-gray-300 hover:text-gray-100 transition cursor-pointer" onClick={() => setModalAddClassroom(true)}>
                                 Tambah kelas
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="text-sm text-black dark:text-gray-50 mt-2">
               {classrooms.map((item) => (
                  <div className="bg-gray-700 hover:bg-opacity-90 p-2 flex rounded mt-1 border-b border-gray-900" key={item.id}>
                     <div>{item.nama_kelas}</div>
                     <div className="ml-8">{item.kode_kelas}</div>
                  </div>
               ))}
               <p className="mt-3 text-gray-600 ml-2 dark:text-gray-400">
                  <span className="cursor-pointer hover:text-cyan-600 transition" onClick={() => navigate("/admin/kelas")}>
                     Lihat selengkapnya..
                  </span>{" "}
               </p>
            </div>
         </div>

         {modalAddClassroom ? (
            <div className="fixed z-30 w-full h-screen flex justify-center items-center bg-darkmode bg-opacity-70 top-0 left-0">
               <div className="w-full mx-5 md:w-1/2 lg:w-1/3 h-auto bg-gray-800 rounded-lg">
                  <div className="w-full h-full flex justify-center items-center">
                     <form>
                        <input
                           type="text"
                           className="bg-transparent focus:outline-none border-b border-gray-500 w-full h-8 mb-5 mt-8"
                           onChange={(e) => setNewClassroomName(e.target.value)}
                           value={newClassroomName}
                           placeholder="Nama kelas"
                        />
                        <input
                           type="text"
                           className="bg-transparent focus:outline-none border-b border-gray-500 w-full h-8 mb-10"
                           onChange={(e) => setNewClassroomCode(e.target.value)}
                           value={newClassroomCode}
                           placeholder="Kode kelas"
                        />
                     </form>
                  </div>
                  {success && <div className="text-sm text-blue-300 mb-2 text-center">Kelas berhasil ditambahkan!</div>}
                  <div className="flex w-full bg-gray-800 rounded-lg items-end">
                     <div className="w-1/2 m-2 text-center" onClick={() => setModalAddClassroom(false)}>
                        <Button name="Batal" className=" bg-red-600 hover:bg-red-700 w-full rounded text-gray-200 font-semibold py-1" />
                     </div>
                     <div className="w-1/2 m-2 text-center" onClick={createClassroom}>
                        <Button name="Tambah" className=" bg-blue-800 w-full rounded text-gray-200 font-semibold py-1" />
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            ""
         )}
      </div>
   );
};

export default Classroom;
