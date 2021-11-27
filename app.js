await import("dotenv").then((dotenv) => dotenv.config());
const { HOST, PORT } = process.env;
import { default as express } from "express";
import { routes } from './route.js'
const app = express();
app.use(express.urlencoded({ extended: true }))
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'public')
  .use(routes);
app.listen(PORT, HOST, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});
