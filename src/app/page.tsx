import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Archive, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center">
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
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 sm:p-6 md:p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Welcome to BarBuddy
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Your personal AI Mixology Partner and Flavor Architect. Let's craft something amazing.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Get Started</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Begin your mixology journey here.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
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
              <Card className="hover:shadow-lg transition-shadow duration-300">
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
                    Explore a curated list of classic and modern cocktails, or let BarBuddy generate recipes based on your personal inventory.
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
