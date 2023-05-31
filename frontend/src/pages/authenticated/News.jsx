import React, { useEffect, useState } from "react";
import Default from "../layouts/Default";
import axios from "axios";
import Button from "../../components/Button";

const News = () => {
   const url = window.location.pathname;
   const role = url.split("/")[1];

   const [posts, setPosts] = useState([]);

   useEffect(() => {
      axios
         .get("http://localhost:5000/" + role + "/news", { withCredentials: true })
         .then((response) => {
            console.log(response.data);
            setPosts(response.data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, []);

   const like = (id) => {
      axios
         .post(
            "http://localhost:5000/news/like",
            {
               id: id,
            },
            { withCredentials: true }
         )
         .then((response) => {
            console.log(response.data);
         })
         .catch((err) => {
            console.error(err);
         });
   };

   return (
      <>
         <Default>
            <div className="w-full flex">
               <div className="w-full md:w-3/4 xl:w-1/2 p-5 md:px-12 h-full overflow-x-auto mx-auto">
                  <div className="bg-white dark:bg-gray-700 w-full shadow rounded-lg p-5">
                     <div className="text-gray-500 dark:text-gray-400 font-medium border-b border-gray-500 pb-2">Tambah berita</div>
                     <div className="w-full pt-3">
                        <div className="relative w-full min-w-[200px]">
                           <textarea
                              className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent mt-3 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 text-gray-500 dark:text-gray-300"
                              placeholder=" "
                              defaultValue={""}
                           />
                           <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight  transition-all after:absolute text-gray-500 dark:text-gray-400 after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-400 peer-focus:after:scale-x-100 peer-focus:after:border-gray-400">
                              Buat postingan
                           </label>
                        </div>
                     </div>
                     <div className="w-full flex flex-row flex-wrap mt-3">
                        <div className="w-full mr-2">
                           <Button name="Kirim" className="px-6 py-2 font-semibold rounded-md bg-slate-400 hover:bg-opacity-90 text-gray-900" />
                        </div>
                     </div>
                  </div>
                  <div className="mt-3 flex flex-col rounded-md shadow-sm">
                     {posts.map((post) => (
                        <div className="bg-white dark:bg-slate-800 mt-3 rounded-md" key={post.id}>
                           <div className="border dark:border-gray-700 p-5 text-gray-500 dark:text-gray-400 font-semibold">
                              {post.user.siswa.nama}
                              <div>
                                 <small className="text-sm">{post.user.nickname}</small>
                              </div>
                           </div>
                           <img
                              className="border dark:border-gray-700"
                              src="https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                           />
                           <div className="border dark:border-gray-700 p-5 text-gray-500 dark:text-gray-400 font-semibold">{post.content}</div>
                           <div className="text-right border dark:border-gray-700">
                              <span className="text-sm">disukai {post.likes}</span>
                           </div>
                           <div className="p-1 border dark:border-gray-700 flex flex-row flex-wrap">
                              <div
                                 className="w-1/2 hover:bg-gray-200 text-center text-gray-500 dark:text-gray-400 font-semibold"
                                 onClick={() => like(post.id)}
                              >
                                 Like
                              </div>
                              <div className="w-1/2 hover:bg-gray-200 border-l dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 font-semibold">
                                 Share
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </Default>
      </>
   );
};

export default News;
