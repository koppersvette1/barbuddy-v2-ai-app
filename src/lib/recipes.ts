
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
      recipe: 'Combine 2 oz of strongly brewed (and chilled) black tea and 0.5 oz of maple syrup in a rocks glass with a large ice cube. Stir gently to combine. Express the oils from an orange peel over the top and drop it in.',
    },
    kid: {
      name: "Gentleman's Root Beer",
      recipe: 'Pour a high-quality root beer into a rocks glass over a large ice cube. Garnish with a fresh orange slice for a hint of citrus aroma. It looks just like the real thing!',
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
      recipe: 'In a mixing glass, combine 2 oz of tart cherry juice and 1 oz of chilled Earl Grey tea with a drop of vanilla extract. Stir with ice, then strain into a coupe glass and garnish with a cherry.',
    },
    kid: {
      name: 'Shirley Temple Black',
      recipe: 'Fill a glass with ice and top with your favorite cola. Drizzle in a small amount of grenadine for color and sweetness. Garnish with a fancy Luxardo cherry.',
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
      recipe: 'Pour a chilled bottle of Sanbitter or Chinotto soda into a rocks glass over a large ice cube. Garnish with a fresh orange peel to complete the look.',
    },
    kid: {
      name: 'Traffic Light',
      recipe: 'Carefully layer the ingredients in a clear glass. Start with grenadine on the bottom. Gently pour orange juice over the back of a spoon to create the middle layer. Top it off with Sprite for the final layer.',
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
      recipe: 'Shake 2 oz of coconut water with plenty of ice until it\'s absolutely freezing. Strain into a chilled martini glass and express the oils from a lemon peel over the top.',
    },
    kid: {
      name: 'Secret Agent',
      recipe: 'Pour white grape juice into a fancy glass and top with a splash of sparkling water. For the "olive," drop in a frozen green grape!',
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
      recipe: 'Brew a strong fennel tea and let it chill. In a mixing glass, combine 2 oz of the tea with 1 oz of cherry juice. Stir with ice, strain into a glass, and garnish with an anise star.',
    },
    kid: {
      name: 'Root Beer Barrel',
      recipe: 'Pour a good quality root beer into a glass. Express the oils from a lemon peel over the top for a surprisingly complex aroma.',
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
      recipe: 'Combine 2 oz of chilled black tea and 1 oz of tart cherry juice in a mixing glass. Stir with ice, strain over a large ice cube, and garnish with a dash of nutmeg.'
    },
    kid: {
      name: 'Jazz Cola',
      recipe: 'Pour vanilla-flavored cola into a glass with ice. Drop in a cherry for a sweet finish.'
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
      recipe: 'In a shaker, combine 2 oz of strong, chilled tea, 0.75 oz of lemon juice, and 1 oz of aquafaba (chickpea brine). Dry shake without ice, then add ice and shake again until cold. Strain into a coupe.',
    },
    kid: {
      name: 'Frothy Lemonade',
      recipe: 'Add lemonade and a small drop of vanilla extract to a sealed jar or shaker. Shake it as hard as you can for 15 seconds. Pour into a glass to see the foam!',
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
      recipe: 'In a shaker with ice, combine 3 oz limeade, 1 oz orange juice, and a small squeeze of agave. Shake well and pour into a salt-rimmed glass.',
    },
    kid: {
      name: 'Cactus Juice',
      recipe: 'Rim a glass with sugar. Fill with limeade and add a single drop of green food coloring for a fun effect. Stir and enjoy!',
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
      recipe: 'In a shaker with ice, combine 2 oz coconut water, 1 oz fresh lime juice, and 0.5 oz simple syrup. Shake hard and strain into a coupe glass.',
    },
    kid: {
      name: 'Frozen Snowball',
      recipe: 'In a blender, combine 1 cup of ice, 4 oz of Sprite, and a big squeeze of lime juice. Blend until slushy and serve immediately.',
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
      recipe: 'In a shaker with ice, combine 2 oz cranberry juice, 0.75 oz lime juice, and a 0.5 oz splash of orange juice. Shake well and strain into a martini glass.',
    },
    kid: {
      name: 'Pink Princess',
      recipe: 'Fill a fun glass with Sprite and add a splash of cranberry juice for color. Garnish with a whole lime wheel on the rim.',
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
      recipe: 'In a glass, gently muddle a few slices of cucumber with 1 oz of lime juice. Add ice and top with club soda. Stir gently.',
    },
    kid: {
      name: 'Lime Slush',
      recipe: 'In a blender, combine 1 cup of ice with 4 oz of limeade. Blend until you have a perfect slushy consistency.',
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
      recipe: 'Brew 2 oz of chamomile tea and let it cool. In a shaker, combine the tea, 0.75 oz of lemon juice, and 0.75 oz of honey syrup with ice. Shake and strain into a coupe.'
    },
    kid: {
      name: 'Honey Bear',
      recipe: 'Simply mix honey into lemonade for a sweet, delicious treat. Serve over ice.'
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
      recipe: 'Combine 2 oz of chilled orange-flavored tea with 0.75 oz of lemon juice. Shake with ice and strain into a sugar-rimmed glass.'
    },
    kid: {
      name: 'Sugar Rim Lemonade',
      recipe: 'A classic for a reason! Pour pink lemonade into a glass with a sugar-coated rim for a fun, crunchy texture.'
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
      recipe: 'In a shaker with ice, combine 1.5 oz grapefruit juice and 0.75 oz lemon juice. Shake and strain, then top with a bitter soda.'
    },
    kid: {
      name: 'Airplane',
      recipe: 'Pour orange juice into a glass and top with Sprite. Cut a lemon or orange wedge to look like wings and place it on the rim of the glass.'
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
      recipe: 'In a shaker with ice, combine 3 oz of lemonade with a drop of vanilla extract. Shake hard and strain into a sugar-rimmed glass.'
    },
    kid: {
      name: 'Sour Pop',
      recipe: 'Fill a glass with lemonade and then slowly pour in a little grenadine so it sinks to the bottom, creating a cool layered effect.'
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
      recipe: 'Fill a copper mug with ice. Add a few slices of fresh cucumber. Top with high-quality ginger beer and a squeeze of lime.',
    },
    kid: {
      name: 'Spicy Soda',
      recipe: 'For a fun experience, serve ginger ale in a copper mug with a big squeeze of fresh lime. The mug makes it feel special!',
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
      recipe: 'In a highball glass, gently muddle fresh mint leaves with lime juice and simple syrup. Add ice and top with club soda. Garnish with more mint.'
    },
    kid: {
      name: 'Swamp Water',
      recipe: 'Muddle mint leaves in a glass, then strain the juice into a separate glass filled with Sprite and ice. This gives you the mint flavor without any green bits floating around!'
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
      recipe: 'Pour grapefruit soda into a salt-rimmed glass filled with ice. Add a squeeze of fresh lime juice and stir gently.',
    },
    kid: {
      name: 'Pink Fizz',
      recipe: 'In a fun glass, pour grapefruit soda over ice and drop in a fresh strawberry for a pop of color and flavor.',
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
      recipe: 'In a tall glass with ice, combine 2 oz of lavender syrup and 1 oz of lemon juice. Top with club soda and stir gently.',
    },
    kid: {
      name: 'Fancy Lemonade',
      recipe: 'A simple classic! Pour lemonade into a tall glass with ice and top with sparkling water for a bit of fizz.',
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
      recipe: 'Fill a wine glass with ice. Add 2 oz of cranberry juice and a squeeze of orange. Top with tonic water and stir.',
    },
    kid: {
      name: 'Orange Sparkler',
      recipe: 'In a large glass, add a scoop of vanilla ice cream and slowly pour orange soda over it to create a delicious, fizzy float.',
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
      recipe: 'In a wine glass, gently press a few mint leaves. Add 1 oz elderflower syrup and 2 oz pomegranate juice. Fill with ice, top with club soda, and stir.'
    },
    kid: {
      name: 'Berry Bubbly',
      recipe: 'Fill a glass with 7-Up or Sprite and add a generous splash of pomegranate juice for color and flavor.'
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
      recipe: 'The ultimate refresher. Pour Topo Chico over ice in a highball glass and squeeze in a generous amount of fresh lime juice.'
    },
    kid: {
      name: 'Fizzy Lime',
      recipe: 'A simple, bubbly treat. Pour Sprite over ice and add a squeeze of fresh lime.'
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
      recipe: 'Fill a highball glass with ice and top with ginger beer. For the "stormy" effect, drizzle a tiny bit of molasses over the top.',
    },
    kid: {
      name: 'Pirate Punch',
      recipe: 'Fill a glass with ice and top with ginger ale. Add a squeeze of fresh lime for a tangy kick.',
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
      recipe: 'In a Julep cup, gently muddle mint leaves. Fill with crushed ice and top with sweet tea. Garnish with a big sprig of mint.',
    },
    kid: {
      name: 'Minty Fresh',
      recipe: 'Fill a fun cup with crushed ice and top with Sprite. Add a splash of mint-flavored syrup for a cool, refreshing treat.',
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
      recipe: 'In a shaker with ice, combine 2 oz pineapple juice, 1 oz lime juice, and 0.5 oz orgeat (almond syrup). Shake well and pour into a glass. Garnish with mint.',
    },
    kid: {
      name: 'Island Explorer',
      recipe: 'Fill a glass with ice. Add pineapple juice and orange juice. Top with a splash of grenadine for a fun, layered look.',
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
      recipe: 'In a shaker with ice, combine 2 oz pineapple juice and 1.5 oz of Coco Lopez or coconut cream. Shake very hard until frothy and strain into a tall glass.',
    },
    kid: {
      name: 'Coco-Pine Smoothie',
      recipe: 'Same as the mocktail! It\'s a perfect, creamy, tropical smoothie that everyone can enjoy.',
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
      recipe: 'Fill a highball glass with ice and orange juice. Slowly pour grenadine down the side so it settles at the bottom. Do not stir.'
    },
    kid: {
      name: 'Morning Sun',
      recipe: 'Fill a highball glass with ice and orange juice, then top with a splash of Sprite for fizz. Slowly add grenadine for the sunrise effect.'
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
      recipe: 'In a rocks glass, firmly muddle fresh lime wedges with sugar. Fill the glass with ice and top with club soda.',
    },
    kid: {
      name: 'Brazilian Limeade',
      recipe: 'A creamy, sweet treat. In a blender, combine whole limes (with peel!), water, and sweetened condensed milk. Blend and strain. Serve over ice.',
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
      recipe: 'In a shaker with lots of ice, combine 2 oz of cold brew concentrate with a splash of chocolate syrup. Shake as hard as you can to build a foam, then strain into a martini glass.'
    },
    kid: {
      name: 'Choc Milkshake Martini',
      recipe: 'Put chocolate milk in a shaker with ice and shake hard until it\'s frothy. Pour into a fancy glass for a fun "martini" experience.'
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
      recipe: 'Fill a rocks glass with ice. Add 3 oz of chilled coffee or cold brew, then gently pour 1 oz of cream and a drop of vanilla extract over the top.'
    },
    kid: {
      name: 'Iced Coffee Milk',
      recipe: 'Fill a glass with ice. Pour in milk and add a splash of decaf coffee or coffee-flavored syrup. Stir in chocolate syrup to taste.'
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
      recipe: 'In a mixing glass with ice, stir together 2 oz of cranberry juice and 1 oz of orange juice with a dash of non-alcoholic bitters. Strain into a glass over a large ice cube.',
    },
    kid: {
      name: 'Cran-Orange Cooler',
      recipe: 'A simple and tasty mix of cranberry juice and orange juice. Serve over ice.',
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
      recipe: 'In a champagne flute, combine 0.5 oz of lemon juice and 0.5 oz of simple syrup. Top with chilled sparkling white grape juice.',
    },
    kid: {
      name: 'Sparkling Lemon Drop',
      recipe: 'Pour sparkling lemonade into a fancy flute and garnish with a long lemon twist for a touch of elegance.',
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
      recipe: 'Dry shake 1 oz lemon juice, 0.75 oz simple syrup, and 1 oz aquafaba. Add ice and shake again. Strain into a tall glass and top with club soda.',
    },
    kid: {
      name: 'Fizzy Lemonade',
      recipe: 'A fun science experiment! Pour lemonade into a tall glass and gently top with Sprite or 7-Up to see the bubbles interact.',
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
      recipe: 'In a shaker with ice, combine 3 oz of Seedlip Grove 42 (or other non-alcoholic spirit) with a splash of white grape juice. Shake well and strain into a martini glass. Garnish with a lemon peel.',
    },
    kid: {
      name: '00-Lemon',
      recipe: 'Pour Sprite or 7-Up into a fancy glass and add a very large, dramatic lemon peel twist.',
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
      recipe: 'Dry shake 0.5 oz raspberry syrup, 0.5 oz lemon juice, and 1 oz aquafaba. Add ice, shake again, and strain into a coupe. Top with sparkling water.',
    },
    kid: {
      name: 'Pink Cloud',
      recipe: 'In a shaker with ice, combine 2 oz raspberry syrup, 2 oz lemonade, and a splash of cream or milk. Shake hard and strain into a glass for a frothy, pink drink.',
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
      recipe: 'In a shaker, combine 2 oz Seedlip Grove 42, 0.5 oz cherry syrup, and 0.75 oz lemon juice. Add a single drop of blue food coloring, shake with ice, and strain into a coupe.',
    },
    kid: {
      name: 'Purple Rain',
      recipe: 'Pour lemonade into a glass and add a splash of grape juice for color. Garnish with a cherry.',
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
      recipe: 'Combine 2 oz grapefruit juice, 0.5 oz lime juice, and a splash of cherry syrup in a shaker with ice. Shake and strain into a coupe.',
    },
    kid: {
      name: 'Pink Grapefruit Fizz',
      recipe: 'Pour grapefruit soda over ice and add a squeeze of fresh lime for a tangy, bubbly drink.',
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
      recipe: 'Brew 2 oz of strong ginger tea and let it cool. Combine with 0.75 oz honey syrup and 0.75 oz lemon juice in a shaker with ice. Shake and strain. For a smoky hint, add a splash of Lapsang Souchong tea.',
    },
    kid: {
      name: 'Honey-Ginger Ale',
      recipe: 'Pour ginger ale into a glass with ice. Stir in a spoonful of honey and add a lemon slice.',
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
      recipe: 'In a shaker with ice, combine 1.5 oz orange juice and 1.5 oz cherry juice. Shake well and strain into a coupe glass.',
    },
    kid: {
      name: 'Vampire Punch',
      recipe: 'A fun and easy mix of orange juice and cherry juice. Serve over ice for a spooky treat.',
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
      recipe: 'In a shaker with ice, combine 2 oz water, 1 oz lime juice, and 0.75 oz smoked honey syrup (or regular honey syrup with a drop of liquid smoke). Shake and strain into a salt-rimmed glass, then top with soda.',
    },
    kid: {
      name: 'Sweet and Smoky',
      recipe: 'Make a simple limeade and serve it in a glass with a honey and sugar rim. For adventurous kids, add a tiny, tiny drop of liquid smoke for a "smoky" surprise.'
    }
  }
];
