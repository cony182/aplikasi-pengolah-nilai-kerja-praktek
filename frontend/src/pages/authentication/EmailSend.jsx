import React, { useEffect, useState } from "react";
import axios from "axios";

const EmailSend = () => {
   const url = window.location.pathname;
   const token = url.split("/")[3];
   const [counter, setCounter] = useState(60);
   const [expired, setExpired] = useState(false);
   const [processing, setProcessing] = useState(false);
   const [holdForCounter, setHoldForCounter] = useState(false);

   useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter == 0) setExpired(true);
   }, [counter]);

   const resendEmail = (e) => {
      if (counter != 0) return setHoldForCounter(true);
      e.preventDefault();
      setProcessing(true);
      axios
         .post(
            "http://localhost:5000/resend/email/",
            {
               token: token,
            },
            { withCredentials: true }
         )
         .then((response) => {
            console.log(response);
            setCounter(60);
            setExpired(false);
            setHoldForCounter(false);
            setProcessing(false);
         })
         .catch((err) => {
            console.log(err);
            setProcessing(false);
         });
   };

   return (
      <>
         <div className="flex items-center w-full lg:w-3/4 mx-auto justify-center h-screen -mt-16">
            <div className="rounded-xl border border-stroke w-full md:w-3/4 xl:w-3/4 bg-secondaryLight shadow-default">
               <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-3/4 mx-auto border-stroke dark:border-strokedark">
                     <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <span className="mb-3 block font-medium">
                           Email telah dikirim ke alamat anda. Ini adalah cara
                           kami memastikan bahwa ini anda.
                        </span>
                        <div className="font-bold text-xl">{counter}</div>
                        <div>
                           {processing ? (
                              <div className="border-2 mx-auto mt-3 border-dashed rounded-full border-acccentLight w-5 h-5 animate-spin"></div>
                           ) : (
                              ""
                           )}
                        </div>
                        <div>
                           {holdForCounter ? (
                              <div className="text-sm">
                                 Email sudah di kirim
                              </div>
                           ) : (
                              ""
                           )}
                        </div>
                        <div>{expired ? "Token sudah kedaluarsa" : ""}</div>
                        <span className="mb-1.5 mt-4 block font-medium">
                           Kirim ulang email
                        </span>
                        <button
                           className="bg-acccentLight px-4 py-1 rounded-md text-slate-100 transition hover:bg-opacity-90"
                           onClick={resendEmail}
                        >
                           Kirim
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default EmailSend;
