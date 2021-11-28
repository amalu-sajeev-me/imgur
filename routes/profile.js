import { Router } from 'express';
const router = Router();
router.get('/', (request, response) => {
  response.render('profile');
})
  .get('/logout', (request, response) => {
    response.redirect('/');
})





export { router as profile };