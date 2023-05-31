exports.index = (req, res) => {
   req.cookies.__secure_refresh_token
      ? res.status(200).json({ message: "already login" })
      : res.status(202).json({ message: "not logged in" });
};
