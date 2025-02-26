import express, { Request, Response } from "express";
import { it } from "node:test";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface cookbook {
  recipes: recipe[];
  ingredients: ingredient[];
}

interface summary {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbook = {
  recipes: [],
  ingredients: [],
};

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  recipeName = recipeName.replace(/[-_]/g, " ");
  recipeName = recipeName.replace(/[^a-zA-Z\s]/g, "");
  recipeName = recipeName.replace(/\s+/g, " ").trim();

  if (recipeName.length === 0) {
    return null;
  }

  recipeName = recipeName.split(' ')
    .map(word => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
      return word;
    })
    .join(' ');

  return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const entry = req.body;

  try {
    addEntry(entry);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({});
});

const addEntry = (entry: any) => {
  if (entry.type === "recipe") {
    checkDuplicateEntry(entry);
    validateRequiredItems(entry.requiredItems);
    
    cookbook.recipes.push(entry);
  } else if (entry.type === "ingredient") {
    if (entry.cookTime < 0) throw new Error("cook time cannot be negative");
    checkDuplicateEntry(entry);
    
    cookbook.ingredients.push(entry);
  } else {
    throw new Error("invalid entry type");
  }
}


// For requirement: entry names must be unique
const checkDuplicateEntry = (entry: cookbookEntry) => {
  if (entry.type === "recipe") {
    if (cookbook.recipes.some(recipe => recipe.name === entry.name)) throw new Error("recipe already exists");
  } else if (entry.type === "ingredient") {
    if (cookbook.ingredients.some(ingredient => ingredient.name === entry.name)) throw new Error("ingredient already exists");
  }
}

// For requirement: recipe requiredItems can only have one element per name
const validateRequiredItems = (requiredItems: requiredItem[]) => {
  const items = [];
  for (const requiredItem of requiredItems) {
    if (items.some(item => item.name === requiredItem.name)) {
      throw new Error("duplicate required items");
    }

    items.push(requiredItem);
  }
}

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  const name = req.query.name as string;
  const recipe = cookbook.recipes.find(recipe => recipe.name === name);
  if (!recipe) return res.status(400).json({ error: "recipe not found" });

  try {
    const summary = getSummary(recipe);
    return res.status(200).json(summary);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const getSummary = (recipe: recipe): summary => {
  const summary: summary = {
    name: recipe.name,
    cookTime: 0,
    ingredients: [],
  };

  let items = recipe.requiredItems;

  while (items.length > 0) {
    const item = items.shift();

    // Check if item is a recipe
    const newRecipe = cookbook.recipes.find(recipe => recipe.name === item.name);
    if (newRecipe) {
      for (const it of newRecipe.requiredItems) {
        items.push({ name: it.name, quantity: it.quantity * item.quantity });
      }
    }

    // Check if item is an ingredient
    const ingredient = cookbook.ingredients.find(ingredient => ingredient.name === item.name);
    if (ingredient) {
      if (summary.ingredients.some(i => i.name === item.name)) {
        summary.ingredients.map(i => {
          if (i.name === item.name) {
            i.quantity += item.quantity;
          }
        });
      } else {
        summary.ingredients.push(item);
      }

      summary.cookTime += ingredient.cookTime * item.quantity;
    }
    
    if (!newRecipe && !ingredient) throw new Error("ingredient not found");
  }

  return summary;
}

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
