import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Protected = () => {
   const navigate = useNavigate();
   const [authenticated, setAuthenticated] = useState();
   const [loading, setLoading] = useState();

   useEffect(() => {
      axios
         .get("http://localhost:5000/protected", { withCredentials: true })
         .then((response) => {
            console.log(response);
            setAuthenticated(true);
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            navigate("/login");
         });
   }, []);

   const logout = (e) => {
      e.preventDefault();
      axios
         .get("http://localhost:5000/logout", { withCredentials: true })
         .then((response) => {
            console.log(response);
            navigate("/login");
         })
         .catch((err) => {
            console.log(err);
         });
   };

   if (authenticated)
      return loading ? (
         <>
            <div>Loading</div>
         </>
      ) : (
         <>
            <div>Selamat datang</div>
            <a href="" onClick={logout}>
               Log out
            </a>
            <div>
               <Link to="/forgot/password">Forgot password</Link>
            </div>
         </>
      );
};

export default Protected;
