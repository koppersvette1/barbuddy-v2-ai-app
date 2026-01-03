import type { Recipe } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const image = PlaceHolderImages.find(img => img.id === recipe.image) || PlaceHolderImages.find(img => img.id === 'default-cocktail');

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {image && (
          <div className="relative aspect-square">
            <Image
              src={image.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl">{recipe.name}</CardTitle>
          <Badge variant="outline" className="w-fit">{recipe.category}</Badge>
        </CardHeader>
      </Card>
    </Link>
  );
}
