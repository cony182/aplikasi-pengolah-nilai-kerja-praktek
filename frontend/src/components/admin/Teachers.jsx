import { useNavigate } from "react-router-dom";

const Teacher = (props) => {
   const navigate = useNavigate();
   return (
      <div>
         <div className="rounded bg-gray-200 dark:bg-gray-800 p-3">
            <div className="flex justify-between py-1 text-black dark:text-white">
               <h3 className="text-sm font-semibold">Guru</h3>
            </div>
            <div className="text-sm text-black dark:text-gray-50 mt-2">
               {props.data.map((item) => (
                  <div className="bg-gray-700 flex justify-between hover:bg-opacity-90 p-2 rounded mt-1 border-b border-gray-900" key={item.id}>
                     <span>{item.nama}</span> <span className="mr-5">{item.userId}</span>
                  </div>
               ))}
               <p className="mt-3 text-gray-600 ml-2 dark:text-gray-400">
                  <span className="cursor-pointer hover:text-cyan-600 transition" onClick={() => navigate("/admin/guru")}>
                     Lihat selengkapnya..
                  </span>{" "}
               </p>
            </div>
         </div>
      </div>
   );
};

export default Teacher;
