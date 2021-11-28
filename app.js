await import("dotenv").then((dotenv) => dotenv.config());
const { HOST, PORT } = process.env;
import { default as express } from "express";
import session from "express-session";
import { routes } from "./route.js";
import { profile } from "./routes/profile.js";
const app = express();
app
  .use(express.urlencoded({ extended: true }))
  .use(session({secret: 'not a good secret', resave: true, saveUninitialized: true}))
  .use(express.static("public"))
  .set("view engine", "ejs")
  .set("views", "public")
  .use("/",routes)
  .use("/profile", profile);
app.listen(PORT, HOST, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});
 