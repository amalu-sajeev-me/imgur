import { Router } from "express";
import ImgurStorage from "multer-storage-imgur";
import multer from "multer";
const clientId = `e86892e30f94c31`;
const upload = multer({ storage: ImgurStorage({ clientId }) });
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { User } from "../route.js";
const db_string = `mongodb+srv://dev:passmein@cluster0.gsr2u.mongodb.net/imgur?retryWrites=true&w=majority`;
const router = Router();
router
  .get("/", (request, response) => {
    const { user_id } = request.session;
    if (!request.session.user_id) {
      response.redirect("/");
    } else {
      mongoose.connect(db_string).then(async () => {
        const result = await User.findOne({ _id: new ObjectId(user_id) });
        console.log(result, user_id);
        response.render("profile", { id: user_id, name: result?.user });
      });
    }
  })
  .post("/", upload.single("image"), (request, response) => {
    console.log(request.file.link);
    response.send(`<a href="${request.file.link}">your image</a>`);
  })
  .get("/logout", (request, response) => {
    request.session.destroy();
    response.redirect("/");
  });

export { router as profile };
