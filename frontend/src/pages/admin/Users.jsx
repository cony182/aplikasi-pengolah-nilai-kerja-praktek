import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/profile.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const Users = () => {
   const navigate = useNavigate();
   const [users, setUsers] = useState([]);
   const [lastId, setLastId] = useState(0);
   const [tempId, setTempId] = useState(0);
   const [limit, setLimit] = useState(20);
   const [hasMore, setHasMore] = useState();
   const [search, setSearch] = useState("");
   const [tempSearch, setTempSearch] = useState("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axios
         .get(`/admin/users?search=${search}&limit=${limit}&lastId=${lastId}`, { withCredentials: true })
         .then((response) => {
            const newUsers = response.data.users;
            setUsers([...users, ...newUsers]);
            setTempId(response.data.lastId);
            setHasMore(response.data.hasMore);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [lastId, search]);

   const fetchUsers = () => {
      setLastId(tempId);
   };

   const searchQuery = (e) => {
      e.preventDefault();
      setLastId(0);
      setTempId(0);
      setUsers([]);
      setLimit(20);
      setSearch(tempSearch);
   };

   return loading ? (
      <div className="w-full h-screen px-5 pt-10 space-y-4 bg-darkmode divide-y divide-gray-200 shadow dark:divide-gray-700 dark:border-gray-700">
         <div className="flex items-center justify-between">
            <div className="animate-pulse w-full">
               <div className="h-2.5 rounded-full bg-gray-600 w-1/3 mb-2.5" />
               <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 animate-pulse" />
         </div>
         <div className="flex items-center justify-between pt-4">
            <div className="animate-pulse w-full">
               <div className="h-2.5 rounded-full bg-gray-600 w-1/3 mb-2.5" />
               <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 animate-pulse" />
         </div>
         <div className="flex items-center justify-between pt-4">
            <div className="animate-pulse w-full">
               <div className="h-2.5 rounded-full bg-gray-600 w-1/3 mb-2.5" />
               <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 animate-pulse" />
         </div>
         <div className="flex items-center justify-between pt-4">
            <div className="animate-pulse w-full">
               <div className="h-2.5 rounded-full bg-gray-600 w-1/3 mb-2.5" />
               <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 animate-pulse" />
         </div>
         <div className="flex items-center justify-between pt-4">
            <div className="animate-pulse w-full">
               <div className="h-2.5 rounded-full bg-gray-600 w-1/3 mb-2.5" />
               <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 animate-pulse" />
         </div>
         <span className="sr-only">Loading...</span>
      </div>
   ) : (
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
                     <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Users</span>
                  </div>
               </li>
            </ol>
            <div className="ml-auto text-white mr-10">
               <div className="relative text-gray-600 mt-10">
                  <form onSubmit={searchQuery}>
                     <input
                        type="search"
                        placeholder="Cari..."
                        value={tempSearch}
                        onChange={(e) => setTempSearch(e.target.value)}
                        className="bg-gray-700 borber-b border-gray-500 h-6 px-5 pr-10 rounded-full text-sm text-gray-200 focus:outline-none"
                     />
                     <button type="submit" onClick={searchQuery} className="absolute right-0 top-0 mt-2 mr-4">
                        <svg
                           className="h-3 w-3 text-gray-200 fill-current"
                           xmlns="http://www.w3.org/2000/svg"
                           xmlnsXlink="http://www.w3.org/1999/xlink"
                           version="1.1"
                           id="Capa_1"
                           x="0px"
                           y="0px"
                           viewBox="0 0 56.966 56.966"
                           style={{ enableBackground: "new 0 0 56.966 56.966" }}
                           xmlSpace="preserve"
                           width="512px"
                           height="512px"
                        >
                           <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                     </button>
                  </form>
               </div>
            </div>
         </nav>
         <div className="mt-4 mx-4 bg-gray-800">
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
               <div className="w-full overflow-x-auto">
                  <div className="text-gray-300 ml-3 mb-2 font-bold mt-4">Daftar semua user</div>
                  <InfiniteScroll
                     dataLength={users.length}
                     next={fetchUsers}
                     hasMore={hasMore}
                     loader={<h4 className="w-full flex justify-center text-gray-300 font-semibold my-3">Tunggu...</h4>}
                  >
                     <table className="w-full overflow-auto">
                        <thead>
                           <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                              <th className="px-4 py-3">Nama & email</th>
                              <th className="px-4 py-3">Nickname</th>
                              <th className="px-4 py-3">Role</th>
                              <th className="px-4 py-3">Tanggal dibuat</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                           {users.map((item) => (
                              <tr
                                 className="bg-gray-800 hover:bg-gray-900 text-gray-400 cursor-pointer"
                                 key={item.id}
                                 onClick={() => navigate("/admin/user/" + item.nickname)}
                              >
                                 <td className="px-4 py-3">
                                    <div className="flex items-center text-sm">
                                       <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                          <img
                                             className="object-cover w-full h-full rounded-full"
                                             src={item.picture ? `${axios.defaults.baseURL}/images/avatar/${item.picture}` : Image}
                                             alt={item.fullname ? item.fullname : ""}
                                             loading="lazy"
                                          />
                                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                                       </div>
                                       <div>
                                          <p className="font-semibold">{item.fullname} </p>
                                          <p className="text-xs text-gray-600 dark:text-gray-400">{item.email}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 text-sm relative">
                                    {item.nickname}
                                    <span className="absolute ml-5 opacity-90 text-yellow-400">{item.role == "admin" ? "Admin" : ""}</span>
                                 </td>
                                 <td className="px-4 py-3 text-xs">
                                    {item.role == "siswa" ? (
                                       <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                          {" "}
                                          Siswa{" "}
                                       </span>
                                    ) : (
                                       ""
                                    )}
                                    {item.role == "guru" ? (
                                       <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                          {" "}
                                          Guru{" "}
                                       </span>
                                    ) : (
                                       ""
                                    )}
                                    {item.isReguler ? "Reguler" : ""}
                                 </td>
                                 <td className="px-4 py-3 text-sm">
                                    {new Date(item.createdAt).toLocaleString("en-US", {
                                       year: "numeric",
                                       month: "2-digit",
                                       day: "2-digit",
                                       hour: "2-digit",
                                       minute: "2-digit",
                                       second: "2-digit",
                                    })}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </InfiniteScroll>
               </div>
               <div className="px-4 py-3 flex justify-end text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                  <span className="cursor-pointer hover:text-cyan-600 transition mr-3">SDN WARINGIN I</span>
               </div>
            </div>
         </div>
         {!hasMore ? <div className="text-gray-300 my-5 font-semibold text-center">Akhir dari data user</div> : ""}
      </div>
   );
};

export default Users;
