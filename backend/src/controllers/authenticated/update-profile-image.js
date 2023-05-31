const path = require("path");
const User = require("../../models/user-model");
const sharp = require("sharp");
const fs = require("fs");

exports.avatarDelete = async (req, res) => {
   try {
      const user = await User.findOne({ attributes: ["picture"], where: { uid: req.user.uid } });
      if (user.picture) fs.unlink(`./public/images/avatar/${user.picture}`, (error) => console.log(error));

      await User.update({ picture: null }, { where: { uid: req.user.uid } });
      res.status(200).json({ message: "Berhasil menghapus foto profile" });
   } catch (error) {
      console.log(error);
   }
};

exports.avatarUpdate = async (req, res) => {
   try {
      if (!req.files.avatar) res.status(400).json({ message: "Masukkan gambar!" });
      const image = req.files.avatar;
      const size = image.data.length;
      const extension = path.extname(image.name);
      const name = image.md5 + extension;
      // const url = `${process.env.APP_BASE_URL}/images/avatar/${name}`;
      const mimeType = [".png", ".jpg", ".jpeg"];

      if (!mimeType.includes(extension.toLowerCase())) return res.status(400).json({ message: "Format gambar tidak sesuai" });
      if (size > 5000000) return res.status(400).json({ message: "Ukuran gambar terlalu besar" });

      const user = await User.findOne({ attributes: ["picture"], where: { uid: req.user.uid } });

      sharp(image.data)
         .resize(512, 512, {
            kernel: sharp.kernel.nearest,
            fit: "cover",
            position: "centre",
         })
         .toFile(`./public/images/avatar/${name}`)
         .then((data) => {
            // output.png is a 512 pixels wide and 512 pixels high image
         })
         .catch((error) => {
            console.log(error);
         });

      if (user.picture) fs.unlink(`./public/images/avatar/${user.picture}`, (error) => console.log(error));

      await User.update(
         {
            picture: name,
         },
         {
            where: {
               uid: req.user.uid,
            },
         }
      );

      res.status(200).json({ message: "Gambar dan foto profile berhasil di perbarui" });
   } catch (error) {
      console.log(error);
   }
};
