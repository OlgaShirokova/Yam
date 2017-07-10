export const dislikeIngredient = (ingredient, id) => ({
  type: 'DISLIKE_ING',
  dislike: { [id]: ingredient },
  id,
});

export const autocompleteIngredients = (ingredient) => ({
  type: 'AUTOCOMPLETE_ING',
  ingredient,
  api: {
    url: `/food/ingredients/autocomplete?&query${ingredient}`,
    config : {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key':"U22l9xW2HymshjNYfrbP8U3Y4tPbp1stK76jsncRLKVTBHgxnO"
      }
    },
  },
});

export const userServings = (value) => ({
  type: 'USER_SERVINGS',
  value
});

export const userAllergies = (allergy) => ({
  type: 'USER_ALLERGIES',
  allergy
});

export const userDiet = (diet) => ({
  type: 'USER_DIET',
  diet
});

export const cookRecipe = (recipe) => ({
  type: 'COOK_RECIPE',
  recipe
})

export const userSurvey = () => ({
  type: 'USER_SURVEY'
});

export const addRecipes = (recipes) => ({
  type: 'ADD_RECIPES',
  recipes,
  id: recipes.id
});

export const updateRecipe = (data, id) => ({
  type: 'UPDATE_RECIPE',
  data,
  id
});

export const addPrice = (price, id, recipeID) => ({
  type: 'ADD_PRICE',
  price,
  id,
  recipeID
})

export const getRecipes = () => ({
  type: 'GET_RECIPES',
  api: {
    url: '/recipes/search?',
    config : {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key':"U22l9xW2HymshjNYfrbP8U3Y4tPbp1stK76jsncRLKVTBHgxnO"
      }
    },
    next: true,
    isRecipe: true,
    success: addRecipes,
    nextFunction: getRecipesDetail
  },
})

export const getRecipesDetail = (id) => ({
  type: 'GET_RECIPES_DETAIL',
  api: {
    url: `/recipes/${id}/information?includeNutrition=false'`,
    config : {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key':"U22l9xW2HymshjNYfrbP8U3Y4tPbp1stK76jsncRLKVTBHgxnO"
      },
    },
    nextFunction: addPrice,
    success: updateRecipe,
    id: id
  },
})

// export const getPrice = (ingredient, id) => ({
//   type: 'GET_PRICE',
//   api: {
//     url: `https://dev.tescolabs.com/grocery/products/?query={query}&offset={offset}&limit={limit}`,
//     config: {
//       method: 'GET',
//       header: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key': 'd4ebba80a86840649b7afc85639ee0b7'
//       },
//     },
//   }
// })
