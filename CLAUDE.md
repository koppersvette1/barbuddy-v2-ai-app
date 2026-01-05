# BarBuddy: AI Mixology Navigator - Developer Documentation for AI Assistants

This document provides comprehensive guidance for AI assistants working with the BarBuddy codebase. It covers architecture, conventions, patterns, and workflows that should be followed when making changes to this project.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Conventions](#key-conventions)
5. [Development Workflows](#development-workflows)
6. [AI/Genkit Integration](#aigenkit-integration)
7. [State Management Patterns](#state-management-patterns)
8. [Styling Guidelines](#styling-guidelines)
9. [Common Tasks & Patterns](#common-tasks--patterns)
10. [Important Constraints](#important-constraints)
11. [Git Workflow](#git-workflow)
12. [Deployment](#deployment)

---

## Project Overview

**BarBuddy** is an AI-powered cocktail recipe and inventory management application. It helps users:

- Scan and manage their bar inventory (using OCR)
- Generate cocktail recipes based on available ingredients
- Suggest ingredient substitutions using 'Flex-Bar' logic
- Provide food and wood pairing recommendations
- Create and save custom recipes
- Learn advanced cocktail techniques (fat-washing, infusion, smoking, clarified milk punch)

### Core Features

- **Inventory Scanning**: OCR-based scanning of bar inventory from photos
- **Intelligent Recipe Generation**: AI-powered recipe suggestions based on inventory
- **Smart Substitutions**: Ingredient swap suggestions using flavor profiles
- **Pairing Suggestions**: Food and wood pairings for cocktails
- **Settings & Preferences**: Toggle alcohol/mocktails/kids drinks, smoker availability, font size
- **Step-by-step Instructions**: Detailed recipe guidance with variants (standard, swap, mocktail, kid-friendly)

### Design Philosophy

- **Primary Color**: Rich copper (#B87333, #d48a47) for warmth and elegance
- **Background**: Dark brown (#26211d) for sophistication
- **Typography**: Playfair Display (headlines), PT Sans (body)
- **Visual Style**: Vintage bar aesthetic with modern UX

---

## Technology Stack

### Core Framework
- **Next.js**: 16.0.7 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x with strict mode
- **Node.js**: ES2017 target

### AI & Backend
- **Genkit**: 1.20.0 (AI orchestration framework)
- **Google Gemini**: 2.5 Flash model (`googleai/gemini-2.5-flash`)
- **Server Actions**: Next.js server actions with `'use server'`

### UI & Styling
- **Tailwind CSS**: 3.4.1 with custom theme
- **shadcn/ui**: 37+ Radix UI-based components
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### Forms & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Data Storage
- **localStorage**: Client-side persistence (no database currently)
- **React Context API**: Global state management

### Development Tools
- **Turbopack**: Fast development builds
- **Genkit Dev UI**: Interactive AI flow testing
- **Firebase App Hosting**: Deployment platform

---

## Project Structure

```
/home/user/barbuddy-v2-ai-app/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx              # Home/Landing page
│   │   ├── layout.tsx            # Root layout with SettingsProvider
│   │   ├── globals.css           # Global styles & CSS variables
│   │   ├── inventory/            # Inventory management page
│   │   ├── recipes/              # Recipe listing & search
│   │   │   └── [slug]/           # Dynamic recipe detail pages
│   │   ├── add-recipe/           # Custom recipe creation
│   │   ├── settings/             # User preferences
│   │   └── learn/                # Advanced techniques
│   │
│   ├── components/               # React components
│   │   ├── layout/               # Layout components (sidebar, header, navigation)
│   │   ├── ui/                   # shadcn/ui components (37+ components)
│   │   └── recipe-card.tsx       # Reusable recipe card
│   │
│   ├── ai/                       # Genkit AI integration
│   │   ├── genkit.ts             # Core Genkit config
│   │   ├── dev.ts                # Genkit dev server entry
│   │   └── flows/                # 11 AI flows (server-side)
│   │       ├── generate-recipes-from-inventory.ts
│   │       ├── inventory-scanning-from-image.ts
│   │       ├── suggest-cocktail-substitutions.ts
│   │       ├── suggest-food-pairing.ts
│   │       ├── suggest-wood-pairing.ts
│   │       ├── generate-cocktail-image.ts
│   │       ├── scrape-recipe-from-url.ts
│   │       ├── explain-fat-washing.ts
│   │       ├── explain-infusion.ts
│   │       ├── explain-cocktail-smoking.ts
│   │       └── explain-clarified-milk-punch.ts
│   │
│   ├── contexts/                 # React contexts
│   │   └── settings-context.tsx  # Global state management
│   │
│   ├── lib/                      # Utilities and data
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── recipes.ts            # Static recipe database (~60KB)
│   │   ├── utils.ts              # Utility functions (cn())
│   │   ├── placeholder-images.ts # Image metadata
│   │   └── placeholder-images.json
│   │
│   └── hooks/                    # Custom React hooks
│       ├── use-toast.ts          # Toast notification system
│       └── use-mobile.tsx        # Mobile breakpoint detection
│
├── docs/
│   └── blueprint.md              # Project blueprint & design guidelines
│
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── components.json               # shadcn/ui configuration
├── apphosting.yaml               # Firebase App Hosting config
├── package.json                  # Dependencies and scripts
└── .gitignore                    # Git ignore rules

```

### File Statistics
- **69 TypeScript files**
- **11 AI flows**
- **37+ UI components**
- **7 main pages**
- **1 global context**
- **2 custom hooks**

---

## Key Conventions

### File Naming

- **Components**: kebab-case files (`recipe-card.tsx`), PascalCase exports (`RecipeCard`)
- **Pages**: Always `page.tsx` in route directories
- **Types**: Centralized in `src/lib/types.ts`
- **AI Flows**: Descriptive kebab-case (`generate-recipes-from-inventory.ts`)

### Import Patterns

**Always use the `@/*` alias** for imports:

```typescript
import { Recipe } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/contexts/settings-context'
import { generateRecipesFromInventory } from '@/ai/flows/generate-recipes-from-inventory'
```

### Component Structure

**Client Components** (most pages and interactive components):
```typescript
"use client";

import { useState, useTransition } from 'react';
import { ComponentType } from '@/components/ui/component';
import { useSettings } from '@/contexts/settings-context';

export default function PageName() {
  const { settings, updateSettings } = useSettings();
  const [isPending, startTransition] = useTransition();

  // Component logic

  return (
    // JSX
  );
}
```

**Server Actions** (AI flows):
```typescript
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const inputSchema = z.object({
  // Input schema
});

const outputSchema = z.object({
  // Output schema
});

const flowName = ai.defineFlow(
  {
    name: 'flowName',
    inputSchema,
    outputSchema,
  },
  async (input) => {
    // Flow logic
  }
);

export async function flowName(input: z.infer<typeof inputSchema>) {
  return flowName(input);
}
```

### Directory Client/Server Directive Pattern

- **All pages**: Use `"use client"` (for interactivity)
- **All AI flows**: Use `'use server'` (for server-side execution)
- **Context providers**: Use `"use client"`
- **UI components**: No directive needed (used by client components)

---

## Development Workflows

### Available Scripts

```bash
# Development
npm run dev                # Start Next.js dev server with Turbopack
npm run genkit:dev         # Start Genkit UI for AI flow testing
npm run genkit:watch       # Start Genkit UI with auto-reload

# Production
npm run build              # Build for production
npm run start              # Start production server

# Quality Checks
npm run lint               # Run ESLint (currently ignored in builds)
npm run typecheck          # TypeScript type checking
```

### Development Server

```bash
npm run dev
```

- Runs on `http://localhost:3000` (default)
- Uses Turbopack for fast hot-reload
- All pages are client-side rendered initially

### Testing AI Flows

```bash
npm run genkit:dev
```

- Opens Genkit Developer UI (usually `http://localhost:4000`)
- Provides interactive testing for all registered flows
- Shows input/output schemas, traces, and execution details
- All flows must be imported in `src/ai/dev.ts` to appear in UI

**Important**: After creating a new AI flow, you MUST import it in `src/ai/dev.ts`:

```typescript
import './flows/new-flow-name';
```

### Adding a New Page

1. Create directory in `src/app/[route-name]/`
2. Create `page.tsx` with `"use client"` directive
3. Add navigation link in `src/components/layout/navigation.tsx`
4. Follow existing page structure patterns

### Adding a New UI Component

**For shadcn/ui components**:
```bash
npx shadcn@latest add [component-name]
```

**For custom components**:
1. Create in `src/components/` with kebab-case filename
2. Export PascalCase component
3. Use `cn()` utility for className merging
4. Follow Tailwind styling patterns

### Adding a New AI Flow

1. Create file in `src/ai/flows/[flow-name].ts`
2. Define input/output schemas with Zod
3. Create prompt template (if needed)
4. Define flow with `ai.defineFlow()`
5. Export async function with `'use server'`
6. Import in `src/ai/dev.ts` for testing

Example:
```typescript
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const inputSchema = z.object({
  userInput: z.string(),
});

const outputSchema = z.object({
  result: z.string(),
});

const myFlowInternal = ai.defineFlow(
  {
    name: 'myFlow',
    inputSchema,
    outputSchema,
  },
  async (input) => {
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: input.userInput,
    });
    return { result: result.text };
  }
);

export async function myFlow(input: z.infer<typeof inputSchema>) {
  return myFlowInternal(input);
}
```

---

## AI/Genkit Integration

### Core Configuration

**File**: `src/ai/genkit.ts`

```typescript
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

### Available AI Flows

#### Recipe & Inventory Flows

1. **generate-recipes-from-inventory**
   - Input: Inventory list, dietary filters
   - Output: Recommended recipes, missing ingredients suggestions
   - Uses: `findRecipesTool` for intelligent recipe matching

2. **inventory-scanning-from-image**
   - Input: Base64 image data
   - Output: List of detected ingredients
   - Uses: Vision model for OCR

3. **scrape-recipe-from-url**
   - Input: Recipe URL
   - Output: Structured recipe data (name, ingredients, instructions)
   - Uses: Web scraping + AI extraction

4. **generate-cocktail-image**
   - Input: Recipe description
   - Output: Generated image (base64 data URI)
   - Uses: Image generation model

#### Suggestion Flows

5. **suggest-cocktail-substitutions**
   - Input: Recipe, available inventory
   - Output: Ingredient substitution suggestions
   - Uses: Flavor profile matching

6. **suggest-food-pairing**
   - Input: Cocktail details
   - Output: Food pairing recommendations
   - Uses: Flavor pairing knowledge

7. **suggest-wood-pairing**
   - Input: Cocktail details
   - Output: Wood pairing for smoking
   - Uses: Smoking pairing knowledge

#### Educational Flows

8. **explain-fat-washing**
9. **explain-infusion**
10. **explain-cocktail-smoking**
11. **explain-clarified-milk-punch**
   - Input: User question (optional)
   - Output: Detailed technique explanation
   - Uses: Educational content generation

### AI Flow Usage Pattern

**In a client component**:

```typescript
"use client";

import { useState, useTransition } from 'react';
import { generateRecipesFromInventory } from '@/ai/flows/generate-recipes-from-inventory';

export default function MyComponent() {
  const [result, setResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      const output = await generateRecipesFromInventory({
        inventory: ['vodka', 'lime juice', 'simple syrup'],
        showAlcohol: true,
        showMocktails: false,
      });
      setResult(output);
    });
  };

  return (
    <button onClick={handleGenerate} disabled={isPending}>
      {isPending ? 'Generating...' : 'Generate Recipes'}
    </button>
  );
}
```

### AI Flow Best Practices

1. **Always wrap in `useTransition()`** for loading states
2. **Handle errors gracefully** with try-catch
3. **Show loading indicators** when `isPending` is true
4. **Validate input** before calling flows
5. **Test flows** in Genkit Dev UI before using in components
6. **Use typed schemas** with Zod for input/output
7. **Keep flows focused** on a single responsibility

---

## State Management Patterns

### Global State: SettingsContext

**File**: `src/contexts/settings-context.tsx`

**State Structure**:
```typescript
interface Settings {
  showAlcohol: boolean;      // Show alcoholic drinks
  showMocktails: boolean;    // Show mocktail versions
  showKids: boolean;         // Show kid-friendly versions
  hasSmoker: boolean;        // User has smoking equipment
  inventory: string[];       // User's bar inventory
  customRecipes: Recipe[];   // User-created recipes
  favoriteRecipes: string[]; // Slugs of favorited recipes
  fontSize: 'small' | 'medium' | 'large'; // Accessibility setting
}
```

**Available Methods**:
```typescript
const {
  settings,                    // Current settings
  updateSettings,              // Update multiple settings
  setInventory,                // Set inventory array
  addCustomRecipe,             // Add custom recipe
  toggleFavorite               // Toggle recipe favorite status
} = useSettings();
```

**Usage Example**:
```typescript
import { useSettings } from '@/contexts/settings-context';

export default function MyComponent() {
  const { settings, updateSettings, setInventory } = useSettings();

  const addIngredient = (ingredient: string) => {
    setInventory([...settings.inventory, ingredient]);
  };

  const toggleAlcohol = () => {
    updateSettings({ showAlcohol: !settings.showAlcohol });
  };

  return (
    // Component JSX
  );
}
```

### Persistence Strategy

- **localStorage key**: `barbuddy-settings`
- **Auto-save**: Every state change triggers localStorage update
- **Hydration**: Initial load reads from localStorage
- **SSR-safe**: Checks `typeof window` before accessing localStorage

### Local Component State

Use standard React hooks for component-specific state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
```

### Form State

Use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient required'),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: '',
    ingredients: [],
  },
});

const onSubmit = (data: z.infer<typeof formSchema>) => {
  // Handle form submission
};
```

---

## Styling Guidelines

### Design System

**Color Palette** (defined in `src/app/globals.css`):

```css
:root {
  --primary: 25 59% 55%;        /* Copper: #d48a47 */
  --background: 25 18% 13%;     /* Dark brown: #26211d */
  --accent: 25 59% 55%;         /* Copper accent */
  --foreground: 40 100% 97%;    /* Light beige text */
  --card: 25 20% 18%;           /* Card background */
  --border: 25 15% 30%;         /* Border color */
}
```

**Typography**:
```css
font-family: 'PT Sans', sans-serif;           /* Body text */
font-family: 'Playfair Display', serif;       /* Headlines */
font-family: monospace;                       /* Code */
```

**Font Sizes** (responsive via data-fontSize attribute):
- Small: Base sizes
- Medium: 105% scaling (default)
- Large: 115% scaling

### Styling Approach

**Use Tailwind CSS** with utility classes:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-card p-6 shadow-lg">
  <h2 className="font-headline text-2xl text-primary">Title</h2>
  <p className="font-body text-muted-foreground">Description</p>
</div>
```

**Combine classes with `cn()` utility**:

```tsx
import { cn } from '@/lib/utils';

<button
  className={cn(
    "rounded-md px-4 py-2 font-medium transition-colors",
    "bg-primary text-primary-foreground hover:bg-primary/90",
    isDisabled && "opacity-50 cursor-not-allowed",
    className // Allow prop overrides
  )}
>
  Button Text
</button>
```

### Component Styling Patterns

**shadcn/ui components**:
- All components in `src/components/ui/`
- Pre-styled with Tailwind
- Use variants via `class-variance-authority`
- Customizable via className prop

**Custom components**:
- Follow shadcn/ui patterns
- Use CSS variables for colors
- Support dark mode (via class-based toggle)
- Responsive by default

### Accessibility

- Use semantic HTML elements
- Support keyboard navigation
- Use ARIA attributes from Radix UI
- Respect user font size preferences
- Maintain sufficient color contrast

---

## Common Tasks & Patterns

### Adding a Recipe

```typescript
import { useSettings } from '@/contexts/settings-context';
import type { Recipe } from '@/lib/types';

const { addCustomRecipe } = useSettings();

const newRecipe: Recipe = {
  slug: 'my-cocktail',
  name: 'My Cocktail',
  category: 'cocktails',
  image: '/path/to/image.jpg',
  spec: {
    ingredients: [
      { quantity: '2 oz', name: 'Vodka' },
      { quantity: '1 oz', name: 'Lime Juice' },
    ],
    instructions: [
      'Shake ingredients with ice',
      'Strain into chilled glass',
    ],
  },
  isCustom: true,
};

addCustomRecipe(newRecipe);
```

### Filtering Recipes

```typescript
import { recipes } from '@/lib/recipes';
import { useSettings } from '@/contexts/settings-context';

const { settings } = useSettings();

const filteredRecipes = recipes.filter(recipe => {
  // Filter by alcohol
  if (!settings.showAlcohol && recipe.spec) return false;

  // Filter by mocktails
  if (!settings.showMocktails && recipe.mocktail) return false;

  // Filter by kids drinks
  if (!settings.showKids && recipe.kid) return false;

  // Search filter
  const searchLower = searchTerm.toLowerCase();
  return recipe.name.toLowerCase().includes(searchLower);
});
```

### Managing Inventory

```typescript
import { useSettings } from '@/contexts/settings-context';

const { settings, setInventory } = useSettings();

// Add item
const addToInventory = (item: string) => {
  const normalized = item.trim().toLowerCase();
  if (!settings.inventory.includes(normalized)) {
    setInventory([...settings.inventory, normalized]);
  }
};

// Remove item
const removeFromInventory = (item: string) => {
  setInventory(settings.inventory.filter(i => i !== item));
};

// Clear all
const clearInventory = () => {
  setInventory([]);
};
```

### Using AI Flows

```typescript
import { useState, useTransition } from 'react';
import { generateRecipesFromInventory } from '@/ai/flows/generate-recipes-from-inventory';
import { useSettings } from '@/contexts/settings-context';

const { settings } = useSettings();
const [recipes, setRecipes] = useState([]);
const [isPending, startTransition] = useTransition();

const generateRecipes = () => {
  startTransition(async () => {
    try {
      const result = await generateRecipesFromInventory({
        inventory: settings.inventory,
        showAlcohol: settings.showAlcohol,
        showMocktails: settings.showMocktails,
      });
      setRecipes(result.recipes);
    } catch (error) {
      console.error('Failed to generate recipes:', error);
      // Show error toast
    }
  });
};
```

### Toggling Favorites

```typescript
import { useSettings } from '@/contexts/settings-context';

const { settings, toggleFavorite } = useSettings();

const isFavorite = settings.favoriteRecipes.includes(recipeSlug);

<button onClick={() => toggleFavorite(recipeSlug)}>
  {isFavorite ? '★' : '☆'}
</button>
```

### Loading Images

**For Next.js Image component**:

```tsx
import Image from 'next/image';

<Image
  src={recipe.image || '/placeholder.jpg'}
  alt={recipe.name}
  width={400}
  height={300}
  className="rounded-lg object-cover"
/>
```

**Allowed remote image domains** (configured in `next.config.ts`):
- `placehold.co`
- `images.unsplash.com`
- `picsum.photos`

### Using Toasts

```typescript
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

// Success toast
toast({
  title: "Success",
  description: "Recipe saved successfully",
});

// Error toast
toast({
  title: "Error",
  description: "Failed to save recipe",
  variant: "destructive",
});
```

---

## Important Constraints

### Build Configuration

⚠️ **TypeScript and ESLint errors are IGNORED during builds**

From `next.config.ts`:
```typescript
typescript: {
  ignoreBuildErrors: true,
},
eslint: {
  ignoreDuringBuilds: true,
}
```

**Implications**:
- Type errors won't prevent builds
- **ALWAYS run `npm run typecheck` manually** before committing
- **Follow strict TypeScript practices** despite ignored errors
- **Test thoroughly** as type safety is not enforced at build time

### No Backend Database

- **All data stored in localStorage**
- **No user authentication**
- **No data persistence across devices**
- **No collaborative features**
- Data loss possible if localStorage is cleared

**Implications**:
- Keep data operations simple and synchronous
- Don't assume data will persist indefinitely
- Consider implementing export/import features
- Plan for future Firebase Firestore integration

### Server Actions Only

- **AI flows MUST use `'use server'` directive**
- **Cannot call AI flows directly in server components**
- **Must be imported and called from client components**
- **No client-side AI execution**

### Image Handling

- **External images must be from whitelisted domains**
- **Custom images stored as data URIs in localStorage**
- **Large images can exceed localStorage limits (~5-10MB)**
- Consider image compression for custom recipes

### Browser Compatibility

- **Requires modern browsers** (ES2017+)
- **localStorage required** for functionality
- **No graceful degradation** for missing features

---

## Git Workflow

### Branch Strategy

- **Main branch**: `main` (or as specified in git config)
- **Feature branches**: `claude/[feature-name]-[id]`
- **Development workflow**: Feature branch → PR → Main

### Commit Guidelines

**Format**:
```
<type>: <short description>

<optional detailed description>
```

**Common types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `style`: UI/styling changes
- `docs`: Documentation changes
- `chore`: Build, dependencies, etc.

**Examples**:
```
feat: Add wood pairing suggestions for cocktails

fix: Resolve inventory duplicate detection issue

refactor: Simplify recipe filtering logic

style: Update copper color scheme for better contrast
```

### Commit Best Practices

1. **Commit logical units of work** (not partial features)
2. **Test before committing** (run typecheck, test in browser)
3. **Write descriptive messages** (explain why, not just what)
4. **Reference issues** if applicable
5. **Keep commits focused** (single concern per commit)

### Git Ignore

Key ignored files/directories:
```
/node_modules
/.next
.env*
.genkit/*
*.tsbuildinfo
firebase-debug.log
```

---

## Deployment

### Firebase App Hosting

**Configuration**: `apphosting.yaml`

```yaml
runConfig:
  maxInstances: 1

env:
  - variable: NODE_VERSION
    value: 20
```

### Build Process

```bash
npm run build
```

**Build steps**:
1. TypeScript compilation (errors ignored)
2. Next.js optimization
3. Static generation of pages
4. Output to `.next/` directory

### Environment Variables

**Required for AI flows**:
- `GOOGLE_API_KEY` (Gemini API key)

**Set in Firebase App Hosting or `.env.local` (not committed)**:
```
GOOGLE_API_KEY=your_api_key_here
```

### Pre-deployment Checklist

- [ ] Run `npm run typecheck` - Fix any type errors
- [ ] Run `npm run build` - Ensure build succeeds
- [ ] Test all critical flows locally
- [ ] Test AI flows in Genkit Dev UI
- [ ] Verify environment variables are set
- [ ] Test on multiple browsers/devices
- [ ] Review recent git commits
- [ ] Update documentation if needed

---

## Troubleshooting

### Common Issues

**1. AI Flow Not Appearing in Genkit UI**
- Ensure flow is imported in `src/ai/dev.ts`
- Restart Genkit dev server
- Check for syntax errors in flow file

**2. localStorage Data Lost**
- Browser cleared cache/cookies
- Incognito/private mode used
- Implement export/import functionality as workaround

**3. Type Errors Not Showing in Build**
- Build errors are ignored by config
- Always run `npm run typecheck` manually
- Use IDE with TypeScript support for real-time checking

**4. Image Not Loading**
- Check domain is whitelisted in `next.config.ts`
- Verify image URL is correct
- Check browser console for CORS errors

**5. Server Action Failed**
- Verify `'use server'` directive is present
- Check function is exported as async
- Ensure called from client component with `useTransition()`

---

## Working with AI Assistants

### Best Practices for AI Assistants

When working with this codebase:

1. **Always read files before modifying** - Use Read tool first
2. **Follow existing patterns** - Match code style and structure
3. **Use the `@/*` import alias** - Never use relative paths for src imports
4. **Test AI flows** - Recommend running `npm run genkit:dev` after changes
5. **Update types** - Modify `src/lib/types.ts` when data structures change
6. **Maintain consistency** - Follow naming conventions strictly
7. **Consider mobile** - Ensure responsive design with Tailwind
8. **Handle errors** - Always wrap AI calls in try-catch
9. **Use context** - Access settings via `useSettings()` hook
10. **Document changes** - Update this file when architecture changes

### Code Review Checklist

Before completing a task:

- [ ] All new files use correct naming convention (kebab-case)
- [ ] Components have proper client/server directives
- [ ] Imports use `@/*` alias
- [ ] TypeScript types are properly defined
- [ ] shadcn/ui components used where appropriate
- [ ] Styling uses Tailwind CSS
- [ ] State changes use SettingsContext
- [ ] AI flows are properly registered
- [ ] Error handling is implemented
- [ ] Mobile responsiveness considered
- [ ] No console.log statements in production code
- [ ] Comments explain complex logic
- [ ] Code follows existing patterns

---

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Genkit Documentation**: https://firebase.google.com/docs/genkit
- **shadcn/ui**: https://ui.shadcn.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

---

## Version History

- **v1.0** (2026-01-05): Initial CLAUDE.md documentation created

---

**Last Updated**: 2026-01-05
**Project Version**: 0.1.0
**Maintained by**: AI Assistants & Development Team
