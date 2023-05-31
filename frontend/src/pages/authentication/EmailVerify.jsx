import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
   const navigate = useNavigate();
   const url = window.location.pathname;
   const token = url.split("/")[3];

   const [verified, setVerified] = useState(false);
   const [expiredToken, setExpiredToken] = useState(false); // error code 403
   const [invalidToken, setInvalidToken] = useState(false); // error code 400
   const [serverError, setServerError] = useState(false); // error code 500

   useEffect(() => {
      axios
         .get("http://localhost:5000/email/verify/" + token, {
            withCredentials: true,
         })
         .then((response) => {
            // console.log(response);
            setVerified(true);
            navigate("/");
         })
         .catch((err) => {
            // console.log(err.response.status);
            setVerified(true);
            // console.log(err.response.status);
            if (err.response.status == 403) {
               setExpiredToken(true);
            }
            if (err.response.status == 400) {
               setInvalidToken(true);
            }
            if (err.response.status == 500) {
               setServerError(true);
            }
            console.log(err);
         });
   });
   return !verified ? (
      <>
         {expiredToken ? <div>Expired Token</div> : ""}
         {invalidToken ? <div>Invalid Token</div> : ""}
         {serverError ? <div>Server error with status code 500.</div> : ""}
      </>
   ) : (
      <>
         <div>Tunggu sebentar...</div>
      </>
   );
};

export default EmailVerify;
