import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

// Search recipes by name + optional cuisine
export const searchRecipes = async (req: Request, res: Response) => {
  try {
    const { query = '', cuisine = '', number = 12 } = req.query;
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        cuisine,
        number,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

// Find recipes by ingredients user has
export const findByIngredients = async (req: Request, res: Response) => {
  try {
    const { ingredients, number = 12 } = req.query;
    const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
      params: {
        apiKey: API_KEY,
        ingredients,
        number,
        ranking: 1,
        ignorePantry: true,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error finding recipes', error: error.message });
  }
};

// Get full recipe details
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: { apiKey: API_KEY, includeNutrition: false },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching recipe details', error: error.message });
  }
};

// Get recipes by cuisine for homepage
export const getRecipesByCuisine = async (req: Request, res: Response) => {
  try {
    const { cuisine } = req.params;
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        cuisine,
        number: 8,
        addRecipeInformation: true,
      },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching cuisine recipes', error: error.message });
  }
};

// Get random recipes for homepage hero
export const getRandomRecipes = async (_req: Request, res: Response) => {
  console.log('KEY BEING USED:', API_KEY);
  console.log('KEY LENGTH:', API_KEY?.length);
  console.log('API KEY:', process.env.SPOONACULAR_API_KEY); // add this line
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: { apiKey: API_KEY, number: 6 },
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching random recipes', error: error.message });
  }
};