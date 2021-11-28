import { Router } from 'express';
import mongoose from 'mongoose';
// import session from 'express-session';
const router = Router();
router.get('/', (request, response) => {
  const { user_id } = request.session;
  if (!request.session.user_id) {
    response.redirect('/')
  } else {
    response.render("profile", { id: user_id});
  }
})
  .get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/');
})





export { router as profile };