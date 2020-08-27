const dumpOfRecipes = [
  {title: 'applesauce',
   categories: ['dessert'],
   source: 'grandma smith',
   ingredients: [
      {ingredient: 'apples', quantity: 'one dozen' },
      {ingredient: 'cinnamon', quantity: '1 tbls' }
   ],
   instructions: [`Peel and dice apples. Combine with cinnamon in pot. Cook down over medium heat`]
  },
  {title: 'Chicken Noodle Soup',
   categories: ['Soup', 'Dinner'],
   source: 'Sophie',
   ingredients: [{ingredient: 'chicken', quantity: '4lbs'},
                 {ingredient: 'chicken broth', quantity: '1 gal'},
                 {ingredient: 'celery', quantity: '1 Stalk'},
                 {ingredient: 'onion', quantity: '1 Large'},
                 {ingredient: 'carrots', quantity: '5'},
                 {ingredient: 'garlic powder', quantity: '1 tbls'},
                 {ingredient: 'bay leaves', quantity: '2'},
                 {ingredient: 'egg noodles', quantity: '1/2 gal' }
   ],
   instructions: [`Peel and dice vegetables, prepare chicken. Add all vegetables, chicken and broth to pot.
   Boil for 30 minutes, or until cooked down. Add noodles. Cook until finished.`
  ]},
   {title: 'pizza dough',
    categories: ['Dinner'],
    source: 'Secret Recipes Book',
    ingredients: [
      {ingredient: 'flour', quantity: '4 cups'},
      {ingredient: 'water', quantity: '2 1/3 cups'},
      {ingredient: 'yeast', quantity: '1 tsp'}
    ],
    instructions: [`heat water to 105°F, mix together with other ingredients until too thick to stir.
    Kneed dough, adding flour as needed until thoroughly combined.
    Cover and place in a warm space for 45 minutes to rise.`],
  },
  {title: 'Spaghetti Sauce',
   categores: ['Italian'],
   source: 'Back of can',
   ingredients: [
     {ingredient: 'Tomato Sauce', quantity: '14.5 oz can'},
     {ingredinet: 'Vegetable Oil', quantity: '1/4 cup'},
     {ingredient: 'basil', quantity: '1/3 tsp'},
     {ingredient: 'salt', quantity: '1/3 tsp'},
     {ingredient: 'garlic powder', quantity: '1/2 tsp'},
     {ingredient: 'thyme', quantity: '1/3 tsp'},
     {ingredient: 'online powder', quantity: '1/3 tsp'},
     {ingredient: 'corn starch', quantity: '1/2 tsp'},
   ],
   instructions: [`Combine ingredients in one pot, stir over medium heat until bubbly`]
  },
  {title: 'Oatmeal',
   categories: ['Breakfast'],
   source: 'Some Quaker',
   ingredients: [
     {ingredient: 'steel cut oats', quantity: '1 cup'},
     {ingredient: 'water', quantity: '2 cups'},
   ],
   instructions: [`Combine ingredient in pot. Bring to boil on stovetop. 
   Reduce to simmer. Cook for 10 more minutes, stirring occasssionaly.`]
  }
]


const tempData = function() {
  let index = 0;
  return function() {
    index + 1 === dumpOfRecipes.length ? index = 0 : index++;
    return dumpOfRecipes[index];
  } 
}()



export { tempData }