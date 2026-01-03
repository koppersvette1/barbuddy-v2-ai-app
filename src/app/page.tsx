import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { recipes } from '@/lib/recipes';
import { Archive, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RecipeCard } from '@/components/recipe-card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  const featuredSlugs = ['old-fashioned', 'negroni', 'daiquiri', 'manhattan'];
  const featuredRecipes = recipes.filter(r => featuredSlugs.includes(r.slug));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-4 sm:p-6 md:p-8 text-white">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              BarBuddy
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80 text-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Your personal AI Mixology Partner and Flavor Architect. Let's craft something amazing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
               <Button asChild size="lg" className="text-lg">
                  <Link href="/recipes">
                    Explore Recipes <ChevronRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link href="/inventory">
                    My Inventory <ChevronRight className="ml-2" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Cocktails</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                A taste of the classics to get you started.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredRecipes.map(recipe => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                    <Link href="/recipes">View All Recipes <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Your Personal Bar</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Catalogue your collection and discover what you can create.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Archive className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Manage Your Inventory</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Scan your liquor cabinet with your camera or add ingredients manually. BarBuddy will keep track of what you have on hand.
                  </CardDescription>
                  <Button asChild className="group">
                    <Link href="/inventory">
                      Go to Inventory <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Discover Recipes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Explore curated classics or let BarBuddy generate recipes based on your personal inventory.
                  </CardDescription>
                  <Button asChild className="group">
                    <Link href="/recipes">
                      Browse Recipes <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
