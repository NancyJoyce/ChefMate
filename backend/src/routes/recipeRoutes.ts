import { Router } from 'express';
import {
  searchRecipes,
  findByIngredients,
  getRecipeById,
  getRecipesByCuisine,
  getRandomRecipes,
} from '../controllers/recipeController';

const router = Router();

router.get('/search',           searchRecipes);
router.get('/findByIngredients', findByIngredients);
router.get('/random',           getRandomRecipes);
router.get('/cuisine/:cuisine', getRecipesByCuisine);
router.get('/:id',              getRecipeById);

export default router;