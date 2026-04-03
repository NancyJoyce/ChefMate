import { Router } from 'express';
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  checkFavourite,
} from '../controllers/favouriteController';

const router = Router();

router.get('/',                        getFavourites);
router.post('/',                       addFavourite);
router.delete('/:recipeId',            removeFavourite);
router.get('/check/:recipeId',         checkFavourite);

export default router;