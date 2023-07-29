import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import Loading from "../../components/Loading";

const Register = () => {
   const navigate = useNavigate();

   const googleID = "979784616518-3p87frhc27piklt5kjvbeq54rlr4ikh6.apps.googleusercontent.com";

   const [loading, setLoading] = useState(true);
   const [fullname, setFullname] = useState();
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [confirmPassword, setConfirmPassword] = useState();
   const [confirmPasswordErr, setConfirmPasswordErr] = useState();
   const [emailErr, setEmailErr] = useState();
   const [processing, setProcessing] = useState(false);

   useEffect(() => {
      axios
         .get("/register", { withCredentials: true })
         .then((response) => {
            setLoading(false);
            if (response.status == 200) navigate("/home");
         })
         .catch((err) => {
            navigate("/error/register");
         });
   }, []);

   const register = (e) => {
      e.preventDefault();
      setProcessing(true);
      setConfirmPasswordErr(false);
      setEmailErr(false);
      if (password != confirmPassword) {
         setProcessing(false);
         return setConfirmPasswordErr(true);
      }

      axios
         .post(
            "/register",
            {
               fullname: fullname,
               email: email,
               password: password,
               confirmPassword: confirmPassword,
            },
            { withCredentials: true }
         )
         .then((response) => {
            console.log(response);
            setProcessing(false);
            navigate("/email/send/" + response.data.url);
         })
         .catch((err) => {
            setProcessing(false);
            if (err.response.status == 409) setEmailErr(true);
            console.log(err);
         });
   };

   const googleLoginSuccess = (res) => {
      console.log("success");
      const date = Date.now();
      axios
         .post(
            "http://localhost:5000/login/google/auth",
            {
               googleId: res.profileObj.googleId,
               email: res.profileObj.email,
               nickname: res.profileObj.givenName + date,
            },
            { withCredentials: true }
         )
         .then((response) => {
            navigate("/home");
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const googleLoginFailure = (res) => {
      navigate("/error/register/google/auth=failure");
   };

   return loading ? (
      <Loading />
   ) : (
      <>
         <div className="flex items-center w-full lg:w-3/4 mx-auto justify-center h-screen -mt-16">
            <div className="rounded-xl border border-stroke w-full md:w-3/4 xl:w-3/4 bg-primaryLight shadow-default">
               <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-3/4 mx-auto border-stroke dark:border-strokedark">
                     <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <span className="mb-1.5 block font-medium">Register</span>
                        <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">SDN Waringin I</h2>

                        <form onSubmit={register}>
                           <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">Nama</label>
                              <div className="relative">
                                 <input
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    required
                                 />

                                 <span className="absolute right-4 top-4">
                                    <svg className="fill-current" width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                       <g opacity="0.5">
                                          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                                       </g>
                                    </svg>
                                 </span>
                              </div>
                           </div>

                           <div className="mb-4">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">Email</label>
                              <div className="relative">
                                 <input
                                    type="email"
                                    placeholder="Alamat Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={
                                       emailErr
                                          ? "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none  border-red-500"
                                          : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    }
                                    required
                                 />

                                 <span className="absolute right-4 top-4">
                                    <svg
                                       className="fill-current"
                                       width="22"
                                       height="22"
                                       viewBox="0 0 22 22"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <g opacity="0.5">
                                          <path
                                             d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                             fill=""
                                          />
                                       </g>
                                    </svg>
                                 </span>
                              </div>
                              {emailErr ? <div className="text-sm text-red-500 text-right mr-3">Email tidak tersedia</div> : ""}
                           </div>

                           <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">Password</label>
                              <div className="relative">
                                 <input
                                    type="password"
                                    placeholder="Minimal 8 Karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={
                                       confirmPasswordErr
                                          ? "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none  border-red-500"
                                          : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    }
                                    required
                                 />

                                 <span className="absolute right-4 top-4">
                                    <svg
                                       className="fill-current"
                                       width="22"
                                       height="22"
                                       viewBox="0 0 22 22"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <g opacity="0.5">
                                          <path
                                             d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                             fill=""
                                          />
                                          <path
                                             d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                             fill=""
                                          />
                                       </g>
                                    </svg>
                                 </span>
                              </div>
                           </div>

                           <div className="mb-6">
                              <label className="mb-2.5 block font-medium text-left ml-3 text-black">Konfirmasi Password</label>
                              <div className="relative">
                                 <input
                                    type="password"
                                    placeholder="Minimal 8 Karakter"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={
                                       confirmPasswordErr
                                          ? "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none border-red-500"
                                          : "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
                                    }
                                    required
                                 />

                                 <span className="absolute right-4 top-4">
                                    <svg
                                       className="fill-current"
                                       width="22"
                                       height="22"
                                       viewBox="0 0 22 22"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <g opacity="0.5">
                                          <path
                                             d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                             fill=""
                                          />
                                          <path
                                             d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                             fill=""
                                          />
                                       </g>
                                    </svg>
                                 </span>
                              </div>
                              {confirmPasswordErr ? (
                                 <div className="text-right text-sm mr-3 text-red-500">Password dan konf. password tidak cocok</div>
                              ) : (
                                 ""
                              )}
                           </div>

                           <div className="mb-5">
                              <button
                                 type="submit"
                                 disabled={processing ? "disabled" : ""}
                                 className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 bg-acccentLight text-white transition hover:bg-opacity-90"
                              >
                                 <span>
                                    {processing ? (
                                       <div className="border-2 border-dashed rounded-full w-6 mx-auto h-6 border-white animate-spin"></div>
                                    ) : (
                                       "Register"
                                    )}
                                 </span>
                              </button>
                           </div>

                           <GoogleLogin
                              className="bg-black"
                              clientId={googleID}
                              buttonText="Masuk dengan google"
                              onSuccess={googleLoginSuccess}
                              onFailure={googleLoginFailure}
                              render={(renderProps) => (
                                 <button
                                    className="flex w-full items-center justify-center bg-secondaryLight gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                 >
                                    <span>
                                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clipPath="url(#clip0_191_13499)">
                                             <path
                                                d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                                                fill="#4285F4"
                                             />
                                             <path
                                                d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                                                fill="#34A853"
                                             />
                                             <path
                                                d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                                                fill="#FBBC05"
                                             />
                                             <path
                                                d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                                                fill="#EB4335"
                                             />
                                          </g>
                                          <defs>
                                             <clipPath id="clip0_191_13499">
                                                <rect width="20" height="20" fill="white" />
                                             </clipPath>
                                          </defs>
                                       </svg>
                                    </span>
                                    Login Dengan Google
                                 </button>
                              )}
                           />

                           <div className="mt-6 text-center">
                              <p>
                                 Sudah punya akun?{" "}
                                 <Link to="/login" className="text-primary underline text-blue-800">
                                    Login
                                 </Link>
                              </p>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Register;
