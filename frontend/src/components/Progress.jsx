import React from "react";

const Progress = () => {
   return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black opacity-50 flex flex-col items-center justify-center">
         <div className="rounded-full border-4 border-dashed animate-spin border-gray-200 h-12 w-12 mb-4" />
         <p className="w-1/3 text-center text-white">Tunggu..</p>
      </div>
   );
};

export default Progress;
