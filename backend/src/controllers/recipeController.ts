// import { Request, Response } from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// const API_KEY = process.env.SPOONACULAR_API_KEY;
// const BASE_URL = 'https://api.spoonacular.com';

// // Search recipes by name + optional cuisine
// export const searchRecipes = async (req: Request, res: Response) => {
//   try {
//     const { query = '', cuisine = '', number = 12 } = req.query;
//     const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
//       params: {
//         apiKey: API_KEY,
//         query,
//         cuisine,
//         number,
//         addRecipeInformation: true,
//         fillIngredients: true,
//       },
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error fetching recipes', error: error.message });
//   }
// };

// // Find recipes by ingredients user has
// export const findByIngredients = async (req: Request, res: Response) => {
//   try {
//     const { ingredients, number = 12 } = req.query;
//     const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
//       params: {
//         apiKey: API_KEY,
//         ingredients,
//         number,
//         ranking: 1,
//         ignorePantry: true,
//       },
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error finding recipes', error: error.message });
//   }
// };

// // Get full recipe details
// export const getRecipeById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
//       params: { apiKey: API_KEY, includeNutrition: false },
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error fetching recipe details', error: error.message });
//   }
// };

// // Get recipes by cuisine for homepage
// export const getRecipesByCuisine = async (req: Request, res: Response) => {
//   try {
//     const { cuisine } = req.params;
//     const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
//       params: {
//         apiKey: API_KEY,
//         cuisine,
//         number: 8,
//         addRecipeInformation: true,
//       },
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error fetching cuisine recipes', error: error.message });
//   }
// };

// // Get random recipes for homepage hero
// export const getRandomRecipes = async (_req: Request, res: Response) => {
//   console.log('KEY BEING USED:', API_KEY);
//   console.log('KEY LENGTH:', API_KEY?.length);
//   console.log('API KEY:', process.env.SPOONACULAR_API_KEY); // add this line
//   try {
//     const response = await axios.get(`${BASE_URL}/recipes/random`, {
//       params: { apiKey: API_KEY, number: 6 },
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(500).json({ message: 'Error fetching random recipes', error: error.message });
//   }
// };



import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

const MOCK_RECIPES = [
  {
    id: 1, title: 'Creamy Tuscan Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    readyInMinutes: 25, servings: 4, cuisines: ['Italian'], dishTypes: ['dinner'],
    diets: ['vegetarian'], summary: 'A rich creamy pasta with sun-dried tomatoes and spinach.',
    instructions: '<ol><li>Boil pasta.</li><li>Make cream sauce.</li><li>Combine and serve.</li></ol>',
    aggregateLikes: 324, healthScore: 72, pricePerServing: 180, vegetarian: true,
    vegan: false, glutenFree: false, dairyFree: false,
    extendedIngredients: [
      { id: 1, name: 'pasta', original: '300g pasta', amount: 300, unit: 'g', image: 'fusilli.jpg' },
      { id: 2, name: 'heavy cream', original: '200ml heavy cream', amount: 200, unit: 'ml', image: 'cream.jpg' },
      { id: 3, name: 'sun-dried tomatoes', original: '100g sun-dried tomatoes', amount: 100, unit: 'g', image: 'tomatoes.jpg' },
      { id: 4, name: 'spinach', original: '2 cups spinach', amount: 2, unit: 'cups', image: 'spinach.jpg' },
      { id: 5, name: 'garlic', original: '3 cloves garlic', amount: 3, unit: 'cloves', image: 'garlic.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Cook pasta according to package instructions until al dente.' },
      { number: 2, step: 'Sauté garlic in olive oil over medium heat for 1 minute.' },
      { number: 3, step: 'Add sun-dried tomatoes and cook for 2 minutes.' },
      { number: 4, step: 'Pour in cream and simmer for 5 minutes until thickened.' },
      { number: 5, step: 'Add spinach and cooked pasta, toss well and serve.' },
    ]}],
  },
  {
    id: 2, title: 'Butter Chicken Masala', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    readyInMinutes: 45, servings: 4, cuisines: ['Indian'], dishTypes: ['dinner'],
    diets: ['gluten free'], summary: 'Classic Indian butter chicken with rich tomato sauce.',
    instructions: '<ol><li>Marinate chicken.</li><li>Make sauce.</li><li>Combine and simmer.</li></ol>',
    aggregateLikes: 891, healthScore: 68, pricePerServing: 220, vegetarian: false,
    vegan: false, glutenFree: true, dairyFree: false,
    extendedIngredients: [
      { id: 6, name: 'chicken', original: '500g chicken', amount: 500, unit: 'g', image: 'chicken.jpg' },
      { id: 7, name: 'butter', original: '3 tbsp butter', amount: 3, unit: 'tbsp', image: 'butter.jpg' },
      { id: 8, name: 'tomato puree', original: '400g tomato puree', amount: 400, unit: 'g', image: 'tomatoes.jpg' },
      { id: 9, name: 'heavy cream', original: '150ml cream', amount: 150, unit: 'ml', image: 'cream.jpg' },
      { id: 10, name: 'garam masala', original: '2 tsp garam masala', amount: 2, unit: 'tsp', image: 'spices.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Marinate chicken in yogurt and spices for 30 minutes.' },
      { number: 2, step: 'Grill or pan-fry chicken until cooked through.' },
      { number: 3, step: 'Make sauce by sautéing onions, garlic, and tomato puree.' },
      { number: 4, step: 'Add cream and butter to the sauce, simmer 10 minutes.' },
      { number: 5, step: 'Add chicken to sauce and serve with naan or rice.' },
    ]}],
  },
  {
    id: 3, title: 'Avocado Toast with Poached Eggs', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400',
    readyInMinutes: 15, servings: 2, cuisines: ['American'], dishTypes: ['breakfast'],
    diets: ['vegetarian', 'dairy free'], summary: 'Trendy and nutritious breakfast.',
    instructions: '<ol><li>Toast bread.</li><li>Mash avocado.</li><li>Poach eggs.</li></ol>',
    aggregateLikes: 567, healthScore: 88, pricePerServing: 120, vegetarian: true,
    vegan: false, glutenFree: false, dairyFree: true,
    extendedIngredients: [
      { id: 11, name: 'sourdough bread', original: '2 slices', amount: 2, unit: 'slices', image: 'bread.jpg' },
      { id: 12, name: 'avocado', original: '1 large avocado', amount: 1, unit: '', image: 'avocado.jpg' },
      { id: 13, name: 'eggs', original: '2 eggs', amount: 2, unit: '', image: 'egg.jpg' },
      { id: 14, name: 'lemon juice', original: '1 tbsp lemon juice', amount: 1, unit: 'tbsp', image: 'lemon.jpg' },
      { id: 15, name: 'chili flakes', original: 'pinch of chili flakes', amount: 1, unit: 'pinch', image: 'chili.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Toast sourdough bread until golden and crispy.' },
      { number: 2, step: 'Mash avocado with lemon juice, salt, and pepper.' },
      { number: 3, step: 'Poach eggs in simmering water for 3 minutes.' },
      { number: 4, step: 'Spread avocado on toast, top with poached egg.' },
      { number: 5, step: 'Garnish with chili flakes and serve immediately.' },
    ]}],
  },
  {
    id: 4, title: 'Beef Tacos with Salsa', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    readyInMinutes: 30, servings: 4, cuisines: ['Mexican'], dishTypes: ['dinner', 'lunch'],
    diets: ['gluten free'], summary: 'Crispy beef tacos with fresh homemade salsa.',
    instructions: '<ol><li>Cook beef.</li><li>Make salsa.</li><li>Assemble tacos.</li></ol>',
    aggregateLikes: 445, healthScore: 65, pricePerServing: 190, vegetarian: false,
    vegan: false, glutenFree: true, dairyFree: false,
    extendedIngredients: [
      { id: 16, name: 'ground beef', original: '400g ground beef', amount: 400, unit: 'g', image: 'beef.jpg' },
      { id: 17, name: 'taco shells', original: '8 taco shells', amount: 8, unit: '', image: 'taco.jpg' },
      { id: 18, name: 'tomatoes', original: '2 tomatoes', amount: 2, unit: '', image: 'tomatoes.jpg' },
      { id: 19, name: 'cheddar cheese', original: '100g cheddar', amount: 100, unit: 'g', image: 'cheese.jpg' },
      { id: 20, name: 'sour cream', original: '4 tbsp sour cream', amount: 4, unit: 'tbsp', image: 'cream.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Brown ground beef in a pan with taco seasoning.' },
      { number: 2, step: 'Dice tomatoes, onion, and cilantro for salsa.' },
      { number: 3, step: 'Warm taco shells in oven at 180°C for 3 minutes.' },
      { number: 4, step: 'Fill shells with beef, cheese, salsa, and sour cream.' },
    ]}],
  },
  {
    id: 5, title: 'Japanese Ramen Bowl', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    readyInMinutes: 40, servings: 2, cuisines: ['Japanese'], dishTypes: ['dinner', 'lunch'],
    diets: ['dairy free'], summary: 'Rich tonkotsu-style ramen with chashu pork.',
    instructions: '<ol><li>Make broth.</li><li>Cook noodles.</li><li>Assemble bowl.</li></ol>',
    aggregateLikes: 723, healthScore: 70, pricePerServing: 250, vegetarian: false,
    vegan: false, glutenFree: false, dairyFree: true,
    extendedIngredients: [
      { id: 21, name: 'ramen noodles', original: '200g ramen noodles', amount: 200, unit: 'g', image: 'noodles.jpg' },
      { id: 22, name: 'pork belly', original: '300g pork belly', amount: 300, unit: 'g', image: 'pork.jpg' },
      { id: 23, name: 'soft boiled eggs', original: '2 eggs', amount: 2, unit: '', image: 'egg.jpg' },
      { id: 24, name: 'soy sauce', original: '3 tbsp soy sauce', amount: 3, unit: 'tbsp', image: 'soy.jpg' },
      { id: 25, name: 'miso paste', original: '2 tbsp miso', amount: 2, unit: 'tbsp', image: 'miso.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Simmer pork bones with ginger and garlic for 2 hours for broth.' },
      { number: 2, step: 'Braise pork belly in soy sauce, mirin, and sake for 1 hour.' },
      { number: 3, step: 'Cook ramen noodles according to package, drain well.' },
      { number: 4, step: 'Season broth with miso paste and soy sauce.' },
      { number: 5, step: 'Assemble: noodles in bowl, ladle broth, top with pork, egg, and nori.' },
    ]}],
  },
  {
    id: 6, title: 'Greek Salad with Feta', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    readyInMinutes: 10, servings: 2, cuisines: ['Mediterranean'], dishTypes: ['salad', 'lunch'],
    diets: ['vegetarian', 'gluten free'], summary: 'Fresh and vibrant Greek salad.',
    instructions: '<ol><li>Chop vegetables.</li><li>Add feta.</li><li>Dress and serve.</li></ol>',
    aggregateLikes: 312, healthScore: 95, pricePerServing: 140, vegetarian: true,
    vegan: false, glutenFree: true, dairyFree: false,
    extendedIngredients: [
      { id: 26, name: 'cucumber', original: '1 cucumber', amount: 1, unit: '', image: 'cucumber.jpg' },
      { id: 27, name: 'cherry tomatoes', original: '200g cherry tomatoes', amount: 200, unit: 'g', image: 'tomatoes.jpg' },
      { id: 28, name: 'feta cheese', original: '150g feta', amount: 150, unit: 'g', image: 'feta.jpg' },
      { id: 29, name: 'olives', original: '50g kalamata olives', amount: 50, unit: 'g', image: 'olives.jpg' },
      { id: 30, name: 'olive oil', original: '3 tbsp olive oil', amount: 3, unit: 'tbsp', image: 'oil.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Chop cucumber, tomatoes, and red onion into chunks.' },
      { number: 2, step: 'Add olives and crumbled feta cheese.' },
      { number: 3, step: 'Drizzle with olive oil and red wine vinegar.' },
      { number: 4, step: 'Season with oregano, salt, and pepper. Serve fresh.' },
    ]}],
  },
  {
    id: 7, title: 'Chocolate Lava Cake', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    readyInMinutes: 20, servings: 4, cuisines: ['French'], dishTypes: ['dessert'],
    diets: ['vegetarian'], summary: 'Indulgent molten chocolate lava cake.',
    instructions: '<ol><li>Make batter.</li><li>Bake briefly.</li><li>Serve warm.</li></ol>',
    aggregateLikes: 956, healthScore: 30, pricePerServing: 160, vegetarian: true,
    vegan: false, glutenFree: false, dairyFree: false,
    extendedIngredients: [
      { id: 31, name: 'dark chocolate', original: '200g dark chocolate', amount: 200, unit: 'g', image: 'chocolate.jpg' },
      { id: 32, name: 'butter', original: '100g butter', amount: 100, unit: 'g', image: 'butter.jpg' },
      { id: 33, name: 'eggs', original: '4 eggs', amount: 4, unit: '', image: 'egg.jpg' },
      { id: 34, name: 'sugar', original: '80g sugar', amount: 80, unit: 'g', image: 'sugar.jpg' },
      { id: 35, name: 'flour', original: '40g flour', amount: 40, unit: 'g', image: 'flour.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Preheat oven to 200°C. Grease 4 ramekins.' },
      { number: 2, step: 'Melt chocolate and butter together over a double boiler.' },
      { number: 3, step: 'Whisk eggs and sugar until pale, fold into chocolate mixture.' },
      { number: 4, step: 'Fold in flour gently. Pour into ramekins.' },
      { number: 5, step: 'Bake for exactly 12 minutes. Centre should be molten. Serve immediately.' },
    ]}],
  },
  {
    id: 8, title: 'Pad Thai Noodles', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
    readyInMinutes: 20, servings: 2, cuisines: ['Thai'], dishTypes: ['dinner', 'lunch'],
    diets: ['dairy free'], summary: 'Authentic Thai pad thai with tamarind sauce.',
    instructions: '<ol><li>Soak noodles.</li><li>Stir fry.</li><li>Add sauce.</li></ol>',
    aggregateLikes: 634, healthScore: 74, pricePerServing: 170, vegetarian: false,
    vegan: false, glutenFree: true, dairyFree: true,
    extendedIngredients: [
      { id: 36, name: 'rice noodles', original: '200g rice noodles', amount: 200, unit: 'g', image: 'noodles.jpg' },
      { id: 37, name: 'shrimp', original: '200g shrimp', amount: 200, unit: 'g', image: 'shrimp.jpg' },
      { id: 38, name: 'tamarind paste', original: '3 tbsp tamarind', amount: 3, unit: 'tbsp', image: 'tamarind.jpg' },
      { id: 39, name: 'fish sauce', original: '2 tbsp fish sauce', amount: 2, unit: 'tbsp', image: 'sauce.jpg' },
      { id: 40, name: 'bean sprouts', original: '100g bean sprouts', amount: 100, unit: 'g', image: 'sprouts.jpg' },
    ],
    analyzedInstructions: [{ name: '', steps: [
      { number: 1, step: 'Soak rice noodles in warm water for 20 minutes, drain.' },
      { number: 2, step: 'Mix tamarind, fish sauce, and sugar for the sauce.' },
      { number: 3, step: 'Stir-fry shrimp in hot wok until pink, set aside.' },
      { number: 4, step: 'Add noodles and sauce to wok, toss on high heat.' },
      { number: 5, step: 'Add shrimp back, top with peanuts, bean sprouts, and lime.' },
    ]}],
  },
];

const callSpoonacular = async (url: string, params: any) => {
  const response = await axios.get(url, {
    params: { apiKey: API_KEY, ...params },
    timeout: 8000,
  });
  return response.data;
};

export const getRandomRecipes = async (_req: Request, res: Response) => {
  try {
    const data = await callSpoonacular(`${BASE_URL}/recipes/random`, { number: 6 });
    res.json(data);
  } catch {
    res.json({ recipes: MOCK_RECIPES });
  }
};

export const searchRecipes = async (req: Request, res: Response) => {
  try {
    const { query = '', cuisine = '', number = 12 } = req.query;
    const data = await callSpoonacular(`${BASE_URL}/recipes/complexSearch`, {
      query, cuisine, number, addRecipeInformation: true, fillIngredients: true,
    });
    res.json(data);
  } catch {
    const q = (req.query.query as string || '').toLowerCase();
    const c = (req.query.cuisine as string || '').toLowerCase();
    const filtered = MOCK_RECIPES.filter(r =>
      (!q || r.title.toLowerCase().includes(q)) &&
      (!c || r.cuisines.map(x => x.toLowerCase()).includes(c))
    );
    res.json({ results: filtered.length > 0 ? filtered : MOCK_RECIPES });
  }
};

export const findByIngredients = async (req: Request, res: Response) => {
  try {
    const { ingredients, number = 12 } = req.query;
    const data = await callSpoonacular(`${BASE_URL}/recipes/findByIngredients`, {
      ingredients, number, ranking: 1, ignorePantry: true,
    });
    res.json(data);
  } catch {
    const ings = ((req.query.ingredients as string) || '').toLowerCase().split(',');
    const scored = MOCK_RECIPES.map(r => {
      const matched = r.extendedIngredients.filter(i =>
        ings.some(ing => i.name.toLowerCase().includes(ing.trim()))
      ).length;
      return { ...r, usedIngredientCount: matched, missedIngredientCount: r.extendedIngredients.length - matched };
    }).filter(r => r.usedIngredientCount > 0)
      .sort((a, b) => b.usedIngredientCount - a.usedIngredientCount);
    res.json(scored.length > 0 ? scored : MOCK_RECIPES.slice(0, 4).map(r => ({ ...r, usedIngredientCount: 1, missedIngredientCount: 4 })));
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await callSpoonacular(`${BASE_URL}/recipes/${id}/information`, { includeNutrition: false });
    res.json(data);
  } catch {
    const recipe = MOCK_RECIPES.find(r => r.id === Number(req.params.id)) || MOCK_RECIPES[0];
    res.json(recipe);
  }
};

export const getRecipesByCuisine = async (req: Request, res: Response) => {
  try {
    const { cuisine } = req.params;
    const data = await callSpoonacular(`${BASE_URL}/recipes/complexSearch`, {
      cuisine, number: 8, addRecipeInformation: true,
    });
    res.json(data);
  } catch {
    const filtered = MOCK_RECIPES.filter(r =>
      r.cuisines.map(c => c.toLowerCase()).includes(req.params.cuisine.toLowerCase())
    );
    res.json({ results: filtered.length > 0 ? filtered : MOCK_RECIPES.slice(0, 4) });
  }
};