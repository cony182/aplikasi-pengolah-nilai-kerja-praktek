const jwt = require("jsonwebtoken");
const Session = require("../../models/session-model");

exports.logout = async (req, res) => {
   const decoded = jwt.verify(
      req.cookies.__secure_refresh_token,
      process.env.REFRESH_TOKEN_SECRET
   );
   console.log(decoded);
   console.log(decoded._session_id);
   await Session.destroy({
      where: {
         session_id: decoded._session_id,
      },
   });

   res.clearCookie("__main_access_token");
   res.clearCookie("__secure_refresh_token");

   console.log(
      "Success Logged out and destroy session id = " + decoded._session_id
   );

   res.status(200).json({ message: "Logout seccessfully" });
};
