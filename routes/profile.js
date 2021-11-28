import { Router } from "express";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { User } from "../route.js";
// import session from 'express-session';
import imgur from "imgur";
const clientId = `e86892e30f94c31`;
imgur.setClientId(clientId);
imgur.setAPIUrl("https://api.imgur.com/3/upload");
import fs from "fs";
let rand = Math.random() * 1000;

const db_string = `mongodb+srv://dev:passmein@cluster0.gsr2u.mongodb.net/imgur?retryWrites=true&w=majority`;
const router = Router();
router
  .get("/", (request, response) => {
    // dummy
    // fs.writeFile(rand, "hey dummy", "utf8", function (err) {
    //   if (err) console.log(err.message);
    // });
    fs.writeFile(`${rand}.txt`, "Hello dummy content!", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    // dummy end
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
  .get("/logout", (request, response) => {
    request.session.destroy();
    response.redirect("/");
  });

export { router as profile };
