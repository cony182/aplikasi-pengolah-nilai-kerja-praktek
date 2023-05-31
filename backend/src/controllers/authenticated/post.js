const Posts = require("../../models/post-model");

exports.like = async (req, res) => {
   const like = await Posts.findOne({
      attributes: ["likes"],
      where: {
         id: req.body.id,
      },
   });

   await Posts.update(
      { likes: like.likes + 1 },
      {
         where: {
            id: req.body.id,
         },
      }
   );

   res.send("from post");
};
