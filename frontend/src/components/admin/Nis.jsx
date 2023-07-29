import axios from "axios";
import { useEffect, useState } from "react";

const Nis = () => {
   const [nis, setNis] = useState([]);
   const [addNis, setAddNis] = useState("");
   const [refresh, setRefresh] = useState(0);

   useEffect(() => {
      axios
         .get("/admin/nis", { withCredentials: true })
         .then((response) => {
            setNis(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [refresh]);

   const newNis = () => {
      if (!addNis) return;
      axios
         .post("/admin/nis/add", { nis: addNis }, { withCredentials: true })
         .then((response) => {
            console.log(response);
            setAddNis("");
            setRefresh(refresh + 1);
         })
         .catch((err) => {
            console.log(err);
            setAddNis("");
         });
   };

   return (
      <>
         <div>
            <div className="rounded bg-gray-200 dark:bg-gray-800 p-3">
               <div className="flex justify-between py-1 text-black dark:text-white">
                  <h3 className="text-sm font-semibold">NIS Baru</h3>
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
                                 <li
                                    className="mb-1 text-gray-300 hover:text-gray-100 transition cursor-pointer"
                                    onClick={() => navigate("/admin/nis/add")}
                                 >
                                    Tambah sekaligus
                                 </li>
                                 <li
                                    className="mb-1 text-gray-300 hover:text-gray-100 transition cursor-pointer"
                                    onClick={() => navigate("/admin/nis/edit")}
                                 >
                                    Ubah NIS
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="text-sm text-black dark:text-gray-50 mt-2">
                  {nis.length == 0 ? (
                     <div className="p-2 rounded mt-1 text-center text-gray-500">Kosong</div>
                  ) : (
                     nis.map((item) => (
                        <div className="bg-gray-700 hover:bg-opacity-95 p-2 flex justify-between rounded mt-1 border-b border-gray-900" key={item.id}>
                           <div className="mr-5">{item.nis}</div>
                           <div className="mr-5">{item.expires}</div>
                        </div>
                     ))
                  )}

                  <div className="mt-3 text-gray-600 dark:text-gray-400">
                     <div className="flex justify-between">
                        <input
                           type="text"
                           className="bg-transparent focus:outline-none border-b border-gray-600 w-full mr-3"
                           placeholder="Tambah NIS baru.."
                           onChange={(e) => setAddNis(e.target.value)}
                           value={addNis}
                        />
                        <p
                           className="mr-3 hover:text-gray-200 hover:border-b border-gray-500 cursor-pointer transition"
                           title="Tambah NIS"
                           onClick={newNis}
                        >
                           Tambah
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Nis;
