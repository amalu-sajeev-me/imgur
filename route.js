import { Router } from "express";
import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";
const db_string = `mongodb+srv://dev:passmein@cluster0.gsr2u.mongodb.net/imgur?retryWrites=true&w=majority`;
// MongoDB Database Schema
const userSchema = new Schema({
  user: {
    type: String,
    required: [true, "you should provide a username"],
  },
  pass: {
    type: String,
    required: [true, "you must provide a password"],
  },
});
const User = model("User", userSchema);
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
        console.log('mongoose connection succesfull');
        User.findOne({}).then((data) => {
          if (data?.user === user) {
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
  })
  .get('/login', (request, response) => {
    response.render('login', { err: false });
  });

export { router as routes };
