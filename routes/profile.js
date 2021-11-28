import { Router } from 'express';
import mongoose from 'mongoose';
const OjectId = mongoose.Types.ObjectId;
import { User } from '../route.js';
// import session from 'express-session';
const db_string = `mongodb+srv://dev:passmein@cluster0.gsr2u.mongodb.net/imgur?retryWrites=true&w=majority`;
const router = Router();
router.get('/', (request, response) => {
  const { user_id } = request.session;
  if (!request.session.user_id) {
    response.redirect('/')
  } else {
    mongoose.connect(db_string).then(async () => {
      const result = await User.findOne({ _id: new ObjectId(user_id) });
      console.log(result, user_id);
      response.render("profile", { id: user_id, name: result?.user });
    });
  }
})
  .get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/');
})





export { router as profile };