// import { Request, Response } from 'express';
// import Favourite from '../models/Favourite';

// export const getFavourites = async (_req: Request, res: Response) => {
//   try {
//     const favourites = await Favourite.find().sort({ savedAt: -1 });
//     res.json(favourites);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error fetching favourites', error: error.message });
//   }
// };

// export const addFavourite = async (req: Request, res: Response) => {
//   try {
//     const existing = await Favourite.findOne({ recipeId: req.body.recipeId });
//     if (existing) {
//       return res.status(409).json({ message: 'Already in favourites' });
//     }
//     const favourite = new Favourite(req.body);
//     await favourite.save();
//     res.status(201).json(favourite);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error saving favourite', error: error.message });
//   }
// };

// export const removeFavourite = async (req: Request, res: Response) => {
//   try {
//     await Favourite.findOneAndDelete({ recipeId: Number(req.params.recipeId) });
//     res.json({ message: 'Removed from favourites' });
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error removing favourite', error: error.message });
//   }
// };

// export const checkFavourite = async (req: Request, res: Response) => {
//   try {
//     const fav = await Favourite.findOne({ recipeId: Number(req.params.recipeId) });
//     res.json({ isFavourite: !!fav });
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error checking favourite', error: error.message });
//   }
// };

import { Request, Response } from 'express';

interface Favourite {
  recipeId: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  savedAt: string;
}

// In-memory store instead of MongoDB
const favourites: Favourite[] = [];

export const getFavourites = (_req: Request, res: Response) => {
  res.json(favourites);
};

export const addFavourite = (req: Request, res: Response) => {
  const existing = favourites.find(f => f.recipeId === req.body.recipeId);
  if (existing) {
    return res.status(409).json({ message: 'Already in favourites' });
  }
  const newFav: Favourite = { ...req.body, savedAt: new Date().toISOString() };
  favourites.push(newFav);
  res.status(201).json(newFav);
};

export const removeFavourite = (req: Request, res: Response) => {
  const index = favourites.findIndex(
    f => f.recipeId === Number(req.params.recipeId)
  );
  if (index !== -1) favourites.splice(index, 1);
  res.json({ message: 'Removed from favourites' });
};

export const checkFavourite = (req: Request, res: Response) => {
  const fav = favourites.find(
    f => f.recipeId === Number(req.params.recipeId)
  );
  res.json({ isFavourite: !!fav });
};