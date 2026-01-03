import type { Recipe } from '@/lib/types';

export const recipes: Recipe[] = [
  {
    slug: 'old-fashioned',
    name: 'Old Fashioned',
    category: 'Spirit Forward',
    image: 'old-fashioned',
    spec: {
      ingredients: [
        { item: 'Whiskey', amount: '2 oz' },
        { item: 'Demerara Syrup', amount: '0.25 oz' },
        { item: 'Angostura Bitters', amount: '3 dashes' },
        { item: 'Orange Peel', amount: '1' },
      ],
      instructions: [
        'Add Demerara syrup and bitters to a mixing glass.',
        'Add whiskey and fill with ice.',
        'Stir for 30-45 seconds until well-chilled.',
        'Strain into a rocks glass over a large ice cube.',
        'Express the oils from the orange peel over the drink, then drop it in.',
      ],
    },
    swap: 'Aged Rum or Añejo Tequila.',
    mocktail: {
      name: 'Bold Fashioned',
      recipe: '2 oz Strong Black Tea, 0.5 oz Maple Syrup, Orange Oil',
    },
    kid: {
      name: "Gentleman's Root Beer",
      recipe: 'High-quality Root Beer, Orange Slice, Large Ice Cube',
    },
  },
  {
    slug: 'manhattan',
    name: 'Manhattan',
    category: 'Spirit Forward',
    image: 'manhattan',
    spec: {
      ingredients: [
        { item: 'Rye Whiskey', amount: '2 oz' },
        { item: 'Sweet Vermouth', amount: '1 oz' },
        { item: 'Angostura Bitters', amount: '2 dashes' },
        { item: 'Luxardo Cherry', amount: '1 for garnish' },
      ],
      instructions: [
        'Combine Rye, sweet vermouth, and bitters in a mixing glass with ice.',
        'Stir until well-chilled.',
        'Strain into a chilled coupe glass.',
        'Garnish with a Luxardo cherry.',
      ],
    },
    swap: 'Bourbon (makes it sweeter) or Scotch (Rob Roy).',
    mocktail: {
      name: 'The Pre-War',
      recipe: '2 oz Tart Cherry Juice, 1 oz Earl Grey Tea, Vanilla extract',
    },
    kid: {
      name: 'Shirley Temple Black',
      recipe: 'Cola, Grenadine, Luxardo Cherry',
    },
  },
  {
    slug: 'negroni',
    name: 'Negroni',
    category: 'Spirit Forward',
    image: 'negroni',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '1 oz' },
        { item: 'Campari', amount: '1 oz' },
        { item: 'Sweet Vermouth', amount: '1 oz' },
        { item: 'Orange Peel', amount: '1 for garnish' },
      ],
      instructions: [
        'Add all ingredients into a mixing glass with ice and stir until well-chilled.',
        'Strain into a rocks glass over a large ice cube.',
        'Garnish with an orange peel.',
      ],
    },
    swap: 'Bourbon (Boulevardier) or Mezcal.',
    mocktail: {
      name: 'Phony Negroni',
      recipe: 'Sanbitter Soda or Chinotto',
    },
    kid: {
      name: 'Traffic Light',
      recipe: 'Layered: Grenadine (Bottom), Orange Juice (Middle), Sprite (Top)',
    },
  },
  {
    slug: 'martini',
    name: 'Martini',
    category: 'Spirit Forward',
    image: 'martini',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2.5 oz' },
        { item: 'Dry Vermouth', amount: '0.5 oz' },
        { item: 'Lemon Twist or Olive', amount: '1 for garnish' },
      ],
      instructions: [
        'Stir ingredients in a mixing glass with ice.',
        'Strain into a chilled martini glass.',
        'Garnish with a lemon twist or an olive.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Faux-tini',
      recipe: '2 oz Coconut Water, Lemon Oil, Shake until freezing',
    },
    kid: {
      name: 'Secret Agent',
      recipe: 'White Grape Juice, Sparkling Water, Frozen Grape "Olive"',
    },
  },
  {
    slug: 'whiskey-sour',
    name: 'Whiskey Sour',
    category: 'Sours',
    image: 'whiskey-sour',
    spec: {
      ingredients: [
        { item: 'Whiskey', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Simple Syrup', amount: '0.75 oz' },
        { item: 'Egg White', amount: '1 (Optional)' },
      ],
      instructions: [
        'If using egg white, combine all ingredients in a shaker and "dry shake" (without ice) for 15 seconds.',
        'Add ice and shake again until well-chilled.',
        'Strain into a coupe or rocks glass.',
        'Garnish with a cherry or orange slice.',
      ],
    },
    swap: 'Amaretto.',
    mocktail: {
      name: 'Sour Patch',
      recipe: 'Strong Tea, Lemon, Aquafaba, Dry Shake',
    },
    kid: {
      name: 'Frothy Lemonade',
      recipe: 'Lemonade, Vanilla drop, Shake until foamy',
    },
  },
  {
    slug: 'margarita',
    name: 'Margarita',
    category: 'Sours',
    image: 'margarita',
    spec: {
      ingredients: [
        { item: 'Tequila', amount: '2 oz' },
        { item: 'Lime Juice', amount: '1 oz' },
        { item: 'Triple Sec', amount: '0.5 oz' },
        { item: 'Agave Nectar', amount: '0.25 oz' },
        { item: 'Salt for rim', amount: 'Optional' },
      ],
      instructions: [
        'Rim a rocks glass with salt if desired.',
        'Add all ingredients to a shaker with ice.',
        'Shake well and strain into the prepared glass over fresh ice.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: 'Mezcal.',
    mocktail: {
      name: 'Nada-Rita',
      recipe: 'Limeade, Orange Juice, Agave, Shake',
    },
    kid: {
      name: 'Cactus Juice',
      recipe: 'Limeade, Green Food Coloring, Sugar Rim',
    },
  },
  {
    slug: 'daiquiri',
    name: 'Daiquiri',
    category: 'Sours',
    image: 'daiquiri',
    spec: {
      ingredients: [
        { item: 'Rum', amount: '2 oz' },
        { item: 'Lime Juice', amount: '1 oz' },
        { item: 'Simple Syrup', amount: '0.75 oz' },
      ],
      instructions: [
        'Add all ingredients to a shaker with ice.',
        'Shake until well-chilled.',
        'Strain into a chilled coupe glass.',
      ],
    },
    swap: 'Gin (Gimlet).',
    mocktail: {
      name: "Sailor's Delight",
      recipe: 'Lime, Coconut Water, Shake Hard',
    },
    kid: {
      name: 'Frozen Snowball',
      recipe: 'Blended Ice, Lime, Sprite',
    },
  },
  {
    slug: 'moscow-mule',
    name: 'Moscow Mule',
    category: 'Highballs & Spritzes',
    image: 'moscow-mule',
    spec: {
      ingredients: [
        { item: 'Vodka', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Ginger Beer', amount: '4-6 oz' },
      ],
      instructions: [
        'Squeeze lime juice into a copper mug.',
        'Add two or three ice cubes, then pour in the vodka.',
        'Fill with cold ginger beer.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: 'Bourbon (Kentucky Mule) or Tequila (Mexican Mule).',
    mocktail: {
      name: 'Garden Mule',
      recipe: 'Ginger Beer, Cucumber',
    },
    kid: {
      name: 'Spicy Soda',
      recipe: 'Ginger Ale, Lime, Copper Mug',
    },
  },
];
