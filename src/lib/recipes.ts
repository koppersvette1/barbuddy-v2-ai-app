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
  {
    slug: 'gimlet',
    name: 'Gimlet',
    category: 'Sours',
    image: 'gimlet',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Lime Juice', amount: '0.75 oz' },
        { item: 'Simple Syrup', amount: '0.75 oz' },
      ],
      instructions: [
        'Add all ingredients to a shaker with ice.',
        'Shake well and strain into a chilled coupe glass.',
        'Garnish with a lime wheel.',
      ],
    },
    swap: 'Vodka.',
    mocktail: {
      name: 'Garden Gimlet',
      recipe: 'Seedlip Garden 108, Lime Juice, Simple Syrup',
    },
    kid: {
      name: 'Lime Sparkler',
      recipe: 'Sprite, a splash of lime juice, and a lime wheel garnish',
    },
  },
  {
    slug: 'tom-collins',
    name: 'Tom Collins',
    category: 'Highballs & Spritzes',
    image: 'tom-collins',
    spec: {
      ingredients: [
        { item: 'Gin', amount: '2 oz' },
        { item: 'Lemon Juice', amount: '1 oz' },
        { item: 'Simple Syrup', amount: '0.5 oz' },
        { item: 'Club Soda', amount: 'Top with' },
      ],
      instructions: [
        'Add gin, lemon juice and syrup to a Collins glass.',
        'Fill with ice, top with club soda, and stir.',
        'Garnish with a lemon wheel and a cherry.',
      ],
    },
    swap: 'Vodka (Vodka Collins).',
    mocktail: {
      name: 'Lemon Fizz',
      recipe: 'Lemonade, top with club soda',
    },
    kid: {
      name: 'Bubbly Lemonade',
      recipe: 'Lemonade, Sprite, and a cherry',
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
        { item: 'Lime Juice', amount: '1 oz' },
        { item: 'Orange Liqueur', amount: '0.5 oz' },
        { item: 'Orgeat', amount: '0.5 oz' },
      ],
      instructions: [
        'Add all ingredients to a shaker with crushed ice.',
        'Shake briefly and pour unstrained into a rocks glass.',
        'Garnish with a mint sprig and a lime wheel.',
      ],
    },
    swap: 'Mix of light and dark rum.',
    mocktail: {
      name: 'Aloha No-Tai',
      recipe: 'Pineapple juice, lime juice, orgeat, and a splash of orange juice',
    },
    kid: {
      name: 'Island Punch',
      recipe: 'Pineapple juice, orange juice, and a cherry',
    },
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
        'Stir all ingredients with ice in a mixing glass.',
        'Strain into a chilled coupe or rocks glass with a large ice cube.',
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
    slug: 'sazerac',
    name: 'Sazerac',
    category: 'Spirit Forward',
    image: 'sazerac',
    spec: {
      ingredients: [
        { item: 'Rye Whiskey', amount: '2 oz' },
        { item: 'Simple Syrup', amount: '0.25 oz' },
        { item: "Peychaud's Bitters", amount: '3 dashes' },
        { item: 'Absinthe', amount: 'Rinse' },
      ],
      instructions: [
        'Rinse a chilled rocks glass with absinthe and discard the excess.',
        'Stir the other ingredients with ice in a mixing glass.',
        'Strain into the prepared glass without ice.',
        'Garnish with a lemon peel.',
      ],
    },
    swap: 'Cognac.',
    mocktail: {
      name: 'NOLA Fizz',
      recipe: 'Black tea, a few drops of anise extract, simple syrup, and a lemon peel',
    },
    kid: {
      name: 'Lemon-Root Fizz',
      recipe: 'Root beer with a lemon twist',
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
    slug: 'aperol-spritz',
    name: 'Aperol Spritz',
    category: 'Highballs & Spritzes',
    image: 'aperol-spritz',
    spec: {
      ingredients: [
        { item: 'Aperol', amount: '3 parts' },
        { item: 'Prosecco', amount: '3 parts' },
        { item: 'Club Soda', amount: '1 part' },
      ],
      instructions: [
        'Fill a wine glass with ice.',
        'Add Aperol, Prosecco, and a splash of soda.',
        'Garnish with an orange slice.',
      ],
    },
    swap: 'Campari for a more bitter Spritz.',
    mocktail: {
      name: 'Sunset Spritz',
      recipe: 'Orange juice, a splash of cranberry, and top with sparkling water',
    },
    kid: {
      name: 'Bubbly Orange',
      recipe: 'Orange juice and Sprite',
    },
  },
  {
    slug: 'pina-colada',
    name: 'Piña Colada',
    category: 'Tiki, Tropical & Dessert',
    image: 'pina-colada',
    spec: {
      ingredients: [
        { item: 'Light Rum', amount: '2 oz' },
        { item: 'Coconut Cream', amount: '1.5 oz' },
        { item: 'Pineapple Juice', amount: '1.5 oz' },
      ],
      instructions: [
        'Blend all ingredients with a cup of crushed ice until smooth.',
        'Pour into a chilled Poco Grande glass.',
        'Garnish with a pineapple wedge and cherry.',
      ],
    },
    swap: 'Dark rum for more flavor.',
    mocktail: {
      name: 'Virgin Piña Colada',
      recipe: 'Blend coconut cream, pineapple juice, and ice',
    },
    kid: {
      name: 'Pineapple Smoothie',
      recipe: 'Pineapple juice, vanilla ice cream, and a splash of milk blended',
    },
  },
  {
    slug: 'cosmopolitan',
    name: 'Cosmopolitan',
    category: 'Sours',
    image: 'cosmopolitan',
    spec: {
      ingredients: [
        { item: 'Citrus Vodka', amount: '1.5 oz' },
        { item: 'Cointreau', amount: '1 oz' },
        { item: 'Lime Juice', amount: '0.5 oz' },
        { item: 'Cranberry Juice', amount: '0.25 oz' },
      ],
      instructions: [
        'Shake all ingredients with ice.',
        'Strain into a chilled martini glass.',
        'Garnish with a lime wheel or orange peel.',
      ],
    },
    swap: 'Regular vodka.',
    mocktail: {
      name: 'Cran-Lime Cooler',
      recipe: 'Cranberry juice, lime juice, and a splash of orange juice',
    },
    kid: {
      name: 'Ladybug',
      recipe: 'Cranberry and Sprite with a lime wedge',
    },
  },
  {
    slug: 'dark-n-stormy',
    name: "Dark 'n' Stormy",
    category: 'Highballs & Spritzes',
    image: 'dark-n-stormy',
    spec: {
      ingredients: [
        { item: "Gosling's Black Seal Rum", amount: '2 oz' },
        { item: 'Ginger Beer', amount: 'Top with' },
      ],
      instructions: [
        'Fill a highball glass with ice.',
        'Pour ginger beer over ice.',
        'Float the dark rum on top.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: "Any dark rum will do, but it's not technically a Dark 'n' Stormy!",
    mocktail: {
      name: 'Cloudy and Calm',
      recipe: 'Cola floated on top of ginger beer',
    },
    kid: {
      name: 'Ginger Cola',
      recipe: 'Mix of cola and ginger ale',
    },
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
        'Add tequila and lime juice to a salt-rimmed highball glass filled with ice.',
        'Top with grapefruit soda and stir.',
        'Garnish with a lime wedge.',
      ],
    },
    swap: 'Mezcal for a smoky flavor.',
    mocktail: {
      name: 'Virgin Paloma',
      recipe: 'Grapefruit soda with a squeeze of lime',
    },
    kid: {
      name: 'Pink Flamingo',
      recipe: 'Grapefruit soda with a cherry',
    },
  },
  {
    slug: 'sidecar',
    name: 'Sidecar',
    category: 'Sours',
    image: 'sidecar',
    spec: {
      ingredients: [
        { item: 'Cognac', amount: '2 oz' },
        { item: 'Orange Liqueur', amount: '0.75 oz' },
        { item: 'Lemon Juice', amount: '0.75 oz' },
      ],
      instructions: [
        'Coat the rim of a coupe glass with sugar, if desired.',
        'Shake all ingredients with ice.',
        'Strain into the prepared glass.',
        'Garnish with an orange peel.',
      ],
    },
    swap: 'Brandy or Bourbon.',
    mocktail: {
      name: 'Main Squeeze',
      recipe: 'Orange juice, lemon juice, and a splash of non-alcoholic spirit',
    },
    kid: {
      name: 'Orange Creamsicle',
      recipe: 'Orange juice and a scoop of vanilla ice cream, blended',
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
        { item: 'Simple Syrup', amount: '0.5 oz' },
        { item: 'Mint Leaves', amount: '8' },
      ],
      instructions: [
        'In a Julep cup, muddle the mint leaves with the simple syrup.',
        'Add the bourbon and fill with crushed ice.',
        'Stir until the cup is frosty.',
        'Garnish with a large mint sprig.',
      ],
    },
    swap: 'Rye whiskey for a spicier version.',
    mocktail: {
      name: 'Southern Belle',
      recipe: 'Muddle mint with simple syrup, add strong black tea, and top with crushed ice',
    },
    kid: {
      name: 'Minty Iced Tea',
      recipe: 'Sweet tea with muddled mint and lots of crushed ice',
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
        'Dry shake all ingredients except club soda to emulsify the egg white.',
        'Add ice and shake again until cold.',
        'Strain into a highball glass and top with club soda.',
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
        'Shake all ingredients with ice until well-chilled.',
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
        'In a rocks glass, muddle the lime wedges with the sugar.',
        'Fill the glass with ice.',
        'Add the cachaça and stir.',
      ],
    },
    swap: 'Vodka (Caipiroska) or Rum.',
    mocktail: {
      name: 'Ipanema',
      recipe: 'Muddle lime and sugar, top with ice and sparkling water',
    },
    kid: {
      name: 'Sweet Lime Soda',
      recipe: 'Sprite with muddled lime and sugar',
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
        'Dry shake all ingredients to emulsify egg white.',
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
        'Shake blended scotch, lemon juice, and syrup with ice.',
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
    slug: 'pomegranate-hugo-spritz',
    name: 'Pomegranate Hugo Spritz',
    category: 'Highballs & Spritzes',
    image: 'pomegranate-hugo-spritz',
    spec: {
      ingredients: [
        { item: 'Prosecco', amount: '3 oz' },
        { item: 'Pomegranate Liqueur', amount: '1 oz' },
        { item: 'Elderflower Liqueur', amount: '0.5 oz' },
        { item: 'Soda Water', amount: '1 oz' },
        { item: 'Mint Leaves', amount: 'for garnish' },
        { item: 'Pomegranate Seeds', amount: 'for garnish' },
      ],
      instructions: [
        'Gently muddle mint leaves in a large wine glass.',
        'Fill the glass with ice.',
        'Add Prosecco, Pomegranate Liqueur, and Elderflower Liqueur.',
        'Top with a splash of soda water and stir gently.',
        'Garnish with more mint and a sprinkle of pomegranate seeds.'
      ],
    },
    swap: 'Use Pomegranate juice if you don\'t have the liqueur.',
    mocktail: {
      name: 'Pomegranate Elderflower Spritzer',
      recipe: 'Mix 2 oz Pomegranate Juice, 0.5 oz Elderflower syrup, and top with sparkling water.'
    },
    kid: {
      name: 'Ruby Fizz',
      recipe: 'Sprite mixed with a splash of pomegranate juice and a few pomegranate seeds.'
    }
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
