import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const db_string = `mongodb+srv://dev:passmein@cluster0.gsr2u.mongodb.net/imgur?retryWrites=true&w=majority`;
const userSchema = new mongoose.Schema({
  user: String,
  pass: String,
});
const User = mongoose.model("User", userSchema);

const router = Router();
router
  .get("/", (request, response) => {
    response.render("index", { err: false });
  })
  .post("/", async (request, response) => {
    const { user, pass } = request.body;
    const hash = await bcrypt.hash(pass, 12);
    mongoose
      .connect(db_string)
      .then(() => {
        User.findOne({}).then((data) => {
          if (data.user === user) {
            let err = "choose a different username";
            response.render("index", { err });
          } else {
            let newUser = new User({ user, pass: hash });
            newUser.save();
            response.redirect("/profile");
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    // response.render('index', { err: request.body.user });
  });

export { router as routes };
