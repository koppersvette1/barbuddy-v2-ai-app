
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
        'Add whiskey and fill the glass with ice.',
        'Stir with a bar spoon for 30-45 seconds until well-chilled. The goal is to chill and dilute, not aerate.',
        'Strain into a rocks glass over a large ice cube.',
        'Express the oils from an orange peel over the drink, then drop it in as garnish.',
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
        'Combine Rye, sweet vermouth, and bitters in a mixing glass filled with ice.',
        'Stir with a bar spoon for about 30 seconds until perfectly chilled.',
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
        'Add all ingredients into a mixing glass with ice.',
        'Stir until well-chilled, about 30 seconds.',
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
        'Combine gin and vermouth in a mixing glass filled with ice.',
        'Stir gracefully until the outside of the glass is frosty.',
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
    slug: 'sazerac',
    name: 'Sazerac',
    category: 'Spirit Forward',
    image: 'sazerac',
    spec: {
      ingredients: [
        { item: 'Rye Whiskey', amount: '2 oz' },
        { item: 'Sugar Cube', amount: '1' },
        { item: "Peychaud's Bitters", amount: '3 dashes' },
        { item: 'Absinthe', amount: 'Rinse' },
        { item: 'Lemon Twist', amount: '1 for garnish'},
      ],
      instructions: [
        'Rinse a chilled rocks glass with absinthe, coating the inside, and discard the excess.',
        'In a mixing glass, muddle the sugar cube with the Peychaud\'s Bitters.',
        'Add the rye whiskey, fill with ice, and stir until well-chilled.',
        'Strain into the prepared glass (no ice).',
        'Express a lemon peel over the drink and discard or use as garnish.',
      ],
    },
    swap: 'Cognac.',
    mocktail: {
      name: 'NOLA Zero',
      recipe: 'Fennel Tea, Cherry Juice, Anise Star',
    },
    kid: {
      name: 'Root Beer Barrel',
      recipe: 'Root Beer, Lemon Twist',
    },
  },
  {
    slug: 'vieux-carre',
    name: 'Vieux Carré',
    category: 'Spirit Forward',
    image: 'vieux-carre',
    spec: {
      ingredients: [
        { item: 'Rye Whiskey', amount: '1 oz' },
        { item: 'Cognac', amount: '1 oz' },
        { item: 'Sweet Vermouth', amount: '1 oz' },
        { item: 'Bénédictine', amount: '1 tsp' },
        { item: 'Peychaud\'s Bitters', amount: '2 dashes' },
        { item: 'Angostura Bitters', amount: '2 dashes' },
      ],
      instructions: [
        'Combine all ingredients in a mixing glass with ice.',
        'Stir until well-chilled.',
        'Strain into a rocks glass with a large ice cube.',
        'Garnish with a lemon twist or a cherry.'
      ],
    },
    swap: 'Drambuie.',
    mocktail: {
      name: 'Big Easy',
      recipe: 'Black Tea, Cherry Juice, Nutmeg Dust'
    },
    kid: {
      name: 'Jazz Cola',
      recipe: 'Vanilla Cola, Cherry'
    }
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
        'Combine whiskey, lemon juice, simple syrup, and egg white in a shaker.',
        'Perform a "Dry Shake" (without ice) for 15 seconds to create a beautiful foam.',
        'Add ice and shake again for 10-12 seconds until well-chilled.',
        'Strain into a coupe or rocks glass with fresh ice.',
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
        'If desired, rim a rocks glass with salt.',
        'Add all ingredients to a shaker with ice.',
        'Give it a hard shake for 10-12 seconds to wake it up.',
        'Strain into the prepared glass over fresh ice.',
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
        'Shake vigorously for 10-12 seconds until well-chilled.',
        'Double-strain (using the shaker\'s strainer and a fine-mesh strainer) into a chilled coupe glass.',
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
    slug: 'cosmopolitan',
    name: 'Cosmopolitan',
    category: 'Sours',
    image: 'cosmopolitan',
    spec: {
      ingredients: [
        { item: 'Vodka', amount: '1.5 oz' },
        { item: 'Triple Sec', amount: '0.75 oz' },
        { item: 'Lime Juice', amount: '0.75 oz' },
        { item: 'Cranberry Juice', amount: '0.5 oz' },
      ],
      instructions: [
        'Shake all ingredients vigorously with ice.',
        'Strain into a chilled martini glass.',
        'Garnish with a lime wheel or orange peel.',
      ],
    },
    swap: 'Gin.',
    mocktail: {
      name: 'The Metro',
      recipe: 'Cranberry, Lime, OJ Splash',
    },
    kid: {
      name: 'Pink Princess',
      recipe: 'Cranberry, Sprite, Lime Wheel',
    },
  },
  {
    slug: 'gimlet',
    name: 'Gimlet',
    category: 'Sours',
    image: 'gimlet',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Lime Cordial', amount: '0.75 oz' },
      ],
      instructions: [
        'Add all ingredients to a shaker with ice.',
        'Shake well for 10-12 seconds until chilled.',
        'Strain into a chilled coupe glass.',
        'Garnish with a lime wheel.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Garden Gimlet',
      recipe: 'Cucumber, Lime, Soda, Muddle',
    },
    kid: {
      name: 'Lime Slush',
      recipe: 'Blended Limeade',
    },
  },
  {
    slug: 'bees-knees',
    name: 'Bee\'s Knees',
    category: 'Sours',
    image: 'bees-knees',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Honey Syrup', amount: '0.75 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled coupe glass.',
        'Garnish with a lemon twist.'
      ],
    },
    swap: 'Bourbon (Gold Rush).',
    mocktail: {
      name: 'Bumblebee',
      recipe: 'Chamomile Tea, Honey, Lemon'
    },
    kid: {
      name: 'Honey Bear',
      recipe: 'Honey Lemonade'
    }
  },
  {
    slug: 'sidecar',
    name: 'Sidecar',
    category: 'Sours',
    image: 'sidecar',
    spec: {
      ingredients: [
        { item: 'Brandy', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Triple Sec', amount: '0.75 oz' },
      ],
      instructions: [
        'Coat the rim of a coupe glass with sugar, if desired.',
        'Shake all ingredients with ice.',
        'Strain into the prepared glass.',
        'Garnish with an orange peel.',
      ],
    },
    swap: 'Bourbon.',
    mocktail: {
      name: 'Side-Kick',
      recipe: 'Orange Tea, Lemon'
    },
    kid: {
      name: 'Sugar Rim Lemonade',
      recipe: 'Pink Lemonade, Sugar Rim'
    }
  },
  {
    slug: 'paper-plane',
    name: 'Paper Plane',
    category: 'Sours',
    image: 'paper-plane',
    spec: {
      ingredients: [
        { item: 'Bourbon', amount: '0.75 oz' },
        { item: 'Aperol', amount: '0.75 oz' },
        { item: 'Amaro Nonino', amount: '0.75 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled coupe glass.',
        'Garnish with a small paper airplane if you\'re feeling crafty.'
      ]
    },
    swap: 'Campari.',
    mocktail: {
      name: 'Paper Glider',
      recipe: 'Grapefruit, Lemon, Bitter Soda'
    },
    kid: {
      name: 'Airplane',
      recipe: 'OJ, Sprite, Lemon Wedge wings'
    }
  },
  {
    slug: 'lemon-drop',
    name: 'Lemon Drop',
    category: 'Sours',
    image: 'lemon-drop',
    spec: {
      ingredients: [
        { item: 'Vodka', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Simple Syrup', amount: '0.75 oz' },
      ],
      instructions: [
        'Rim a martini glass with sugar.',
        'Shake all ingredients with ice.',
        'Strain into the prepared glass.',
        'Garnish with a lemon twist.'
      ],
    },
    swap: 'Gin.',
    mocktail: {
      name: 'Lemon Candy',
      recipe: 'Lemonade, Vanilla, Shake'
    },
    kid: {
      name: 'Sour Pop',
      recipe: 'Lemonade, Grenadine sinker'
    }
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
        'Add vodka and fill the mug with ice.',
        'Top with cold ginger beer and give a gentle stir.',
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
  {
    slug: 'mojito',
    name: 'Mojito',
    category: 'Highballs & Spritzes',
    image: 'mojito',
    spec: {
      ingredients: [
        { item: 'Rum', amount: '2 oz' },
        { item: 'Mint', amount: '6-8 leaves' },
        { item: 'Lime Juice', amount: '0.75 oz' },
        { item: 'Simple Syrup', amount: '0.5 oz' },
        { item: 'Club Soda', amount: 'Top with' }
      ],
      instructions: [
        'In a shaker, gently muddle mint with simple syrup and lime juice.',
        'Add rum and fill with ice.',
        'Shake well and pour (unstrained) into a highball glass.',
        'Top with club soda and garnish with a mint sprig.'
      ]
    },
    swap: 'Gin (Southside).',
    mocktail: {
      name: 'No-jito',
      recipe: 'Mint, Lime, Soda, Muddle'
    },
    kid: {
      name: 'Swamp Water',
      recipe: 'Sprite, Strained Mint so no green bits'
    }
  },
  {
    slug: 'paloma',
    name: 'Paloma',
    category: 'Highballs & Spritzes',
    image: 'paloma',
    spec: {
      ingredients: [
        { item: 'Tequila', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Grapefruit Soda', amount: 'Top with' },
      ],
      instructions: [
        'Build in a salt-rimmed highball glass filled with ice: add tequila and lime juice.',
        'Top with grapefruit soda and stir gently.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: 'Grapefruit Juice + Soda.',
    mocktail: {
      name: 'The Dove',
      recipe: 'Grapefruit Soda, Lime, Salt',
    },
    kid: {
      name: 'Pink Fizz',
      recipe: 'Grapefruit Soda, Strawberry',
    },
  },
  {
    slug: 'tom-collins',
    name: 'Tom Collins',
    category: 'Highballs & Spritzes',
    image: 'tom-collins',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '1.5 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Simple Syrup', amount: '0.5 oz' },
        { item: 'Club Soda', amount: 'Top with' },
      ],
      instructions: [
        'Build the drink: Add gin, lemon juice and syrup to a Collins glass.',
        'Fill with ice, top with club soda, and give it a quick stir.',
        'Garnish with a lemon wheel and a cherry.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Lavender Lemonade',
      recipe: 'Lemonade, Soda, Lavender',
    },
    kid: {
      name: 'Fancy Lemonade',
      recipe: 'Lemonade, Sparkling Water',
    },
  },
  {
    slug: 'aperol-spritz',
    name: 'Aperol Spritz',
    category: 'Highballs & Spritzes',
    image: 'aperol-spritz',
    spec: {
      ingredients: [
        { item: 'Prosecco', amount: '3 oz' },
        { item: 'Aperol', amount: '2 oz' },
        { item: 'Club Soda', amount: '1 oz' },
      ],
      instructions: [
        'Build the drink in a wine glass filled with ice.',
        'Add Aperol, then Prosecco, and a splash of soda.',
        'Garnish with an orange slice.',
      ],
    },
    swap: 'Campari.',
    mocktail: {
      name: 'Sunset Spritz',
      recipe: 'Tonic, Cranberry, Orange',
    },
    kid: {
      name: 'Orange Sparkler',
      recipe: 'Orange Soda, Ice Cream',
    },
  },
  {
    slug: 'pomegranate-hugo-spritz',
    name: 'Pomegranate Hugo Spritz',
    category: 'Highballs & Spritzes',
    image: 'pomegranate-hugo-spritz',
    spec: {
      ingredients: [
        { item: 'Elderflower Liqueur', amount: '1.5 oz' },
        { item: 'Pomegranate Juice', amount: '1 oz' },
        { item: 'Mint', amount: 'Handful' },
        { item: 'Prosecco', amount: 'Top with' },
        { item: 'Club Soda', amount: 'Splash' }
      ],
      instructions: [
        'Gently muddle mint in a large wine glass.',
        'Add Elderflower Liqueur and Pomegranate Juice.',
        'Fill the glass with ice.',
        'Top with Prosecco and a splash of soda.',
        'Stir gently and garnish with more mint and pomegranate seeds.'
      ],
    },
    swap: "Elderflower Syrup.",
    mocktail: {
      name: 'Winter Garden',
      recipe: 'Elderflower Syrup, Pom Juice, Soda, Press Mint'
    },
    kid: {
      name: 'Berry Bubbly',
      recipe: 'Pom Juice, 7-Up'
    }
  },
  {
    slug: 'ranch-water',
    name: 'Ranch Water',
    category: 'Highballs & Spritzes',
    image: 'ranch-water',
    spec: {
      ingredients: [
        { item: 'Tequila', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Topo Chico', amount: 'Top with' },
      ],
      instructions: [
        'Fill a highball glass with ice.',
        'Add tequila and lime juice.',
        'Top with Topo Chico mineral water.',
        'Garnish with a lime wedge.'
      ]
    },
    swap: 'Must be Mineral Water.',
    mocktail: {
      name: 'Mineral Lime',
      recipe: 'Topo Chico, Lime'
    },
    kid: {
      name: 'Fizzy Lime',
      recipe: 'Sprite, Lime'
    }
  },
  {
    slug: 'dark-n-stormy',
    name: "Dark 'n' Stormy",
    category: 'Highballs & Spritzes',
    image: 'dark-n-stormy',
    spec: {
      ingredients: [
        { item: 'Dark Rum', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Ginger Beer', amount: 'Top with' },
      ],
      instructions: [
        'Fill a highball glass with ice.',
        'Pour ginger beer over ice, then lime juice.',
        'Float the dark rum on top to create the "stormy" layer.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: "White Rum (Rum Buck).",
    mocktail: {
      name: 'Storm Cloud',
      recipe: 'Ginger Beer, Molasses drizzle',
    },
    kid: {
      name: 'Pirate Punch',
      recipe: 'Ginger Ale, Lime',
    },
  },
  {
    slug: 'mint-julep',
    name: 'Mint Julep',
    category: 'Spirit Forward',
    image: 'mint-julep',
    spec: {
      ingredients: [
        { item: 'Bourbon', amount: '2.5 oz' },
        { item: 'Simple Syrup', amount: '0.25 oz' },
        { item: 'Mint Leaves', amount: '8-10' },
      ],
      instructions: [
        'In a Julep cup, gently muddle the mint leaves with the simple syrup to release their oils.',
        'Add the bourbon and fill the cup with crushed ice.',
        'Stir until the cup becomes frosty on the outside.',
        'Garnish with a large mint sprig, after slapping it to release the aroma.',
      ],
    },
    swap: 'Brandy.',
    mocktail: {
      name: 'Southern Tea',
      recipe: 'Sweet Tea, Mint, Crushed Ice',
    },
    kid: {
      name: 'Minty Fresh',
      recipe: 'Sprite, Mint Syrup',
    },
  },
  {
    slug: 'mai-tai',
    name: 'Mai Tai',
    category: 'Tiki, Tropical & Dessert',
    image: 'mai-tai',
    spec: {
      ingredients: [
        { item: 'Aged Rum', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.75 oz' },
        { item: 'Dry Curacao', amount: '0.5 oz' },
        { item: 'Orgeat', amount: '0.5 oz' },
      ],
      instructions: [
        'Add all ingredients to a shaker with crushed ice.',
        'Shake briefly (a "whip shake") and pour unstrained into a rocks glass.',
        'Garnish with a mint sprig (slap it first!) and a lime wheel.',
      ],
    },
    swap: 'Amaretto.',
    mocktail: {
      name: 'No Tai',
      recipe: 'Pineapple, Lime, Orgeat, Shake',
    },
    kid: {
      name: 'Island Explorer',
      recipe: 'Pineapple, OJ, Grenadine',
    },
  },
  {
    slug: 'pina-colada',
    name: 'Piña Colada',
    category: 'Tiki, Tropical & Dessert',
    image: 'pina-colada',
    spec: {
      ingredients: [
        { item: 'Rum', amount: '2 oz' },
        { item: 'Pineapple Juice', amount: '2 oz' },
        { item: 'Coconut Cream', amount: '1.5 oz' },
      ],
      instructions: [
        'Blend all ingredients with a cup of crushed ice until smooth.',
        'Pour into a chilled Poco Grande glass.',
        'Garnish with a pineapple wedge and cherry.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Virgin Colada',
      recipe: 'Pineapple, Coco Lopez, Shake',
    },
    kid: {
      name: 'Coco-Pine Smoothie',
      recipe: 'Same as mocktail',
    },
  },
  {
    slug: 'tequila-sunrise',
    name: 'Tequila Sunrise',
    category: 'Tiki, Tropical & Dessert',
    image: 'tequila-sunrise',
    spec: {
      ingredients: [
        { item: 'Tequila', amount: '2 oz' },
        { item: 'Orange Juice', amount: '4 oz' },
        { item: 'Grenadine', amount: '0.5 oz' },
      ],
      instructions: [
        'Fill a highball glass with ice.',
        'Add tequila and orange juice.',
        'Slowly pour the grenadine down the side of the glass so it sinks to the bottom, creating a sunrise effect.',
        'Do not stir. Garnish with an orange slice and cherry.'
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'The Sunrise',
      recipe: 'OJ, Grenadine'
    },
    kid: {
      name: 'Morning Sun',
      recipe: 'OJ, Sprite, Grenadine'
    }
  },
  {
    slug: 'caipirinha',
    name: 'Caipirinha',
    category: 'Sours',
    image: 'caipirinha',
    spec: {
      ingredients: [
        { item: 'Cachaça', amount: '2 oz' },
        { item: 'Lime', amount: 'Half, cut into wedges' },
        { item: 'Sugar', amount: '2 tsp' },
      ],
      instructions: [
        'In a rocks glass, muddle the lime wedges firmly with the sugar to extract the juice.',
        'Fill the glass with ice.',
        'Add the cachaça and stir to combine.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Lime Crush',
      recipe: 'Muddled Lime, Sugar, Soda',
    },
    kid: {
      name: 'Brazilian Limeade',
      recipe: 'Blended Limes, Condensed Milk',
    },
  },
  {
    slug: 'espresso-martini',
    name: 'Espresso Martini',
    category: 'Tiki, Tropical & Dessert',
    image: 'espresso-martini',
    spec: {
      ingredients: [
        { item: 'Vodka', amount: '2 oz' },
        { item: 'Espresso', amount: '1 oz' },
        { item: 'Coffee Liqueur', amount: '0.5 oz' },
        { item: 'Simple Syrup', amount: '0.25 oz' },
      ],
      instructions: [
        'Brew espresso and let it cool completely.',
        'Add all ingredients to a shaker with ice.',
        'Shake very hard for 15 seconds to create a thick foam.',
        'Strain into a chilled martini glass.',
        'Garnish with three coffee beans.'
      ]
    },
    swap: 'Rum.',
    mocktail: {
      name: 'Espresso Marti-NO',
      recipe: 'Cold Brew, Choc Syrup, Shake Hard'
    },
    kid: {
      name: 'Choc Milkshake Martini',
      recipe: 'Frothy Chocolate Milk in fancy glass'
    }
  },
  {
    slug: 'white-russian',
    name: 'White Russian',
    category: 'Tiki, Tropical & Dessert',
    image: 'white-russian',
    spec: {
      ingredients: [
        { item: 'Vodka', amount: '2 oz' },
        { item: 'Coffee Liqueur', amount: '1 oz' },
        { item: 'Cream', amount: '1 oz' },
      ],
      instructions: [
        'Fill a rocks glass with ice.',
        'Add vodka and coffee liqueur.',
        'Top with cream and stir gently.'
      ]
    },
    swap: 'Milk.',
    mocktail: {
      name: 'White Lie',
      recipe: 'Chilled Coffee, Cream, Vanilla'
    },
    kid: {
      name: 'Iced Coffee Milk',
      recipe: 'Decaf, Milk, Choc Syrup'
    }
  },
  {
    slug: 'boulevardier',
    name: 'Boulevardier',
    category: 'Spirit Forward',
    image: 'boulevardier',
    spec: {
      ingredients: [
        { item: 'Bourbon', amount: '1.25 oz' },
        { item: 'Campari', amount: '1 oz' },
        { item: 'Sweet Vermouth', amount: '1 oz' },
      ],
      instructions: [
        'Stir all ingredients with ice in a mixing glass until well-chilled.',
        'Strain into a chilled coupe or a rocks glass with a large ice cube.',
        'Garnish with an orange peel.',
      ],
    },
    swap: 'Rye Whiskey for a spicier kick.',
    mocktail: {
      name: 'The Parisian',
      recipe: 'Cranberry juice, a splash of orange juice, and a dash of bitters',
    },
    kid: {
      name: 'Cran-Orange Cooler',
      recipe: 'Cranberry juice and orange juice mixed',
    },
  },
  {
    slug: 'french-75',
    name: 'French 75',
    category: 'Highballs & Spritzes',
    image: 'french-75',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '1 oz' },
        { item: 'Lemon Juice', amount: '0.5 oz' },
        { item: 'Simple Syrup', amount: '0.5 oz' },
        { item: 'Champagne', amount: 'Top with' },
      ],
      instructions: [
        'Shake gin, lemon juice, and simple syrup with ice.',
        'Strain into a Champagne flute.',
        'Top with Champagne and garnish with a lemon twist.',
      ],
    },
    swap: 'Cognac.',
    mocktail: {
      name: 'French 0.0',
      recipe: 'Sparkling white grape juice, lemon juice, and simple syrup',
    },
    kid: {
      name: 'Sparkling Lemon Drop',
      recipe: 'Sparkling lemonade with a lemon twist',
    },
  },
  {
    slug: 'gin-fizz',
    name: 'Gin Fizz',
    category: 'Sours',
    image: 'gin-fizz',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '1 oz' },
        { item: 'Simple Syrup', amount: '0.75 oz' },
        { item: 'Egg White', amount: '1' },
        { item: 'Club Soda', amount: 'Top with' },
      ],
      instructions: [
        'Perform a "Dry Shake": combine gin, lemon, syrup, and egg white in a shaker without ice and shake to emulsify.',
        'Add ice and perform a "Wet Shake" until cold.',
        'Strain into a highball glass without ice and top with club soda.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Lemon Cloud',
      recipe: 'Lemon juice, simple syrup, aquafaba (chickpea brine), and top with club soda',
    },
    kid: {
      name: 'Fizzy Lemonade',
      recipe: 'Lemonade topped with Sprite',
    },
  },
  {
    slug: 'vesper',
    name: 'Vesper',
    category: 'Spirit Forward',
    image: 'vesper',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '3 oz' },
        { item: 'Vodka', amount: '1 oz' },
        { item: 'Lillet Blanc', amount: '0.5 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice until very well-chilled.',
        'Strain into a chilled martini glass.',
        'Garnish with a large, thin slice of lemon peel.',
      ],
    },
    swap: 'Cocchi Americano instead of Lillet for a more traditional flavor.',
    mocktail: {
      name: 'The Spy',
      recipe: 'Seedlip Grove 42, a splash of white grape juice, and a lemon peel',
    },
    kid: {
      name: '00-Lemon',
      recipe: 'Sprite with a big lemon peel twist',
    },
  },
  {
    slug: 'clover-club',
    name: 'Clover Club',
    category: 'Sours',
    image: 'clover-club',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '1.5 oz' },
        { item: 'Lemon Juice', amount: '0.5 oz' },
        { item: 'Raspberry Syrup', amount: '0.5 oz' },
        { item: 'Egg White', amount: '1' },
      ],
      instructions: [
        'Dry shake all ingredients to emulsify the egg white.',
        'Add ice and shake again until cold.',
        'Strain into a chilled coupe glass.',
        'Garnish with a fresh raspberry.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Raspberry Kiss',
      recipe: 'Raspberry syrup, lemon juice, aquafaba, and a splash of sparkling water',
    },
    kid: {
      name: 'Pink Cloud',
      recipe: 'Raspberry syrup, lemonade, and a splash of cream, shaken',
    },
  },
  {
    slug: 'aviation',
    name: 'Aviation',
    category: 'Sours',
    image: 'aviation',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Maraschino Liqueur', amount: '0.5 oz' },
        { item: 'Crème de Violette', amount: '0.25 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled coupe glass.',
        'Garnish with a brandied cherry.',
      ],
    },
    swap: 'Omit the Crème de Violette for a simpler, but still delicious, gin sour.',
    mocktail: {
      name: 'The Blue Sky',
      recipe: 'Seedlip Grove 42, a splash of cherry syrup, lemon juice, and a drop of blue food coloring',
    },
    kid: {
      name: 'Purple Rain',
      recipe: 'Lemonade with a splash of grape juice and a cherry',
    },
  },
  {
    slug: 'hemingway-daiquiri',
    name: 'Hemingway Daiquiri',
    category: 'Sours',
    image: 'hemingway-daiquiri',
    spec: {
      ingredients: [
        { item: 'White Rum', amount: '2 oz' },
        { item: 'Grapefruit Juice', amount: '0.75 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Maraschino Liqueur', amount: '0.5 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled coupe glass.',
        'Garnish with a grapefruit twist.',
      ],
    },
    swap: 'Simple syrup instead of Maraschino Liqueur for a less complex flavor.',
    mocktail: {
      name: 'The Old Man and the C',
      recipe: 'Grapefruit juice, lime juice, and a splash of cherry syrup',
    },
    kid: {
      name: 'Pink Grapefruit Fizz',
      recipe: 'Grapefruit soda with a squeeze of lime',
    },
  },
  {
    slug: 'penicillin',
    name: 'Penicillin',
    category: 'Sours',
    image: 'penicillin',
    spec: {
      ingredients: [
        { item: 'Blended Scotch', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
        { item: 'Honey-Ginger Syrup', amount: '0.75 oz' },
        { item: 'Islay Scotch', amount: '0.25 oz float' },
      ],
      instructions: [
        'Shake blended scotch, lemon juice, and honey-ginger syrup with ice.',
        'Strain into a rocks glass with a large ice cube.',
        'Float the Islay scotch on top.',
        'Garnish with candied ginger.',
      ],
    },
    swap: 'Bourbon for a sweeter, less smoky version.',
    mocktail: {
      name: 'The Cure',
      recipe: 'Brewed ginger tea, honey, and lemon juice, with a splash of lapsang souchong tea for smokiness',
    },
    kid: {
      name: 'Honey-Ginger Ale',
      recipe: 'Ginger ale with a spoonful of honey and a lemon slice',
    },
  },
  {
    slug: 'blood-and-sand',
    name: 'Blood and Sand',
    category: 'Spirit Forward',
    image: 'blood-and-sand',
    spec: {
      ingredients: [
        { item: 'Scotch', amount: '0.75 oz' },
        { item: 'Cherry Heering', amount: '0.75 oz' },
        { item: 'Sweet Vermouth', amount: '0.75 oz' },
        { item: 'Orange Juice', amount: '0.75 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled coupe glass.',
        'Garnish with an orange peel.',
      ],
    },
    swap: 'Use blood orange juice for a more intense flavor and color.',
    mocktail: {
      name: 'The Matador',
      recipe: 'Orange juice, cherry syrup, and a splash of non-alcoholic red wine',
    },
    kid: {
      name: 'Vampire Punch',
      recipe: 'Orange juice and cherry juice mixed together',
    },
  },
  {
    slug: 'heb-honey-smoked-margarita',
    name: 'H-E-B Honey Smoked Margarita',
    category: 'Sours',
    image: 'heb-honey-smoked-margarita',
    spec: {
      ingredients: [
        { item: 'Tequila', amount: '2 oz' },
        { item: 'Lime Juice', amount: '1 oz' },
        { item: 'Honey Syrup', amount: '0.75 oz' },
        { item: 'Smoked Salt', amount: 'for rim' },
      ],
      instructions: [
        'Rim a rocks glass with smoked salt.',
        'Add tequila, lime juice, and honey syrup to a shaker with ice.',
        'Shake well until chilled.',
        'Strain into the prepared glass over fresh ice.',
        'Garnish with a lime wheel.'
      ],
    },
    swap: 'Mezcal for an extra smoky flavor.',
    mocktail: {
      name: 'Smoky Honey Limeade',
      recipe: 'Mix 2 oz water, 1 oz lime juice, and 0.75 oz smoked honey syrup. Shake with ice and top with soda.'
    },
    kid: {
      name: 'Sweet and Smoky',
      recipe: 'Limeade with a drop of liquid smoke (optional) and a honey-sugar rim.'
    }
  }
];

    