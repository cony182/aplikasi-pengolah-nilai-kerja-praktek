import React from "react";

const Loading = () => {
   return (
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
         <div className="w-16 h-16 mx-auto border-4 border-dashed rounded-full animate-spin border-violet-500 dark:border-violet-500 outline-violet-500 outline-offset-4"></div>
      </div>
   );
};

export default Loading;
