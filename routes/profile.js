import { Router } from 'express';
const router = Router();
router.get('/', (request, response) => {
  response.render('profile');
})





export { router as profile };