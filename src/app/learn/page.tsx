'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader, FlaskConical, Beaker, Flame, BookOpen } from 'lucide-react';
import { useSettings } from '@/contexts/settings-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { explainFatWashing, type ExplainFatWashingOutput } from '@/ai/flows/explain-fat-washing';
import { explainInfusion, type ExplainInfusionOutput } from '@/ai/flows/explain-infusion';
import { explainCocktailSmoking, type ExplainCocktailSmokingOutput } from '@/ai/flows/explain-cocktail-smoking';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TechniqueExplanation = ExplainFatWashingOutput | ExplainInfusionOutput | ExplainCocktailSmokingOutput;
type Technique = 'fatWashing' | 'infusion' | 'cocktailSmoking';

function isCocktailSmokingOutput(explanation: any): explanation is ExplainCocktailSmokingOutput {
  return explanation && 'methods' in explanation;
}

const techniqueConfig: Record<Technique, { icon: React.ElementType, label: string, imageId: string }> = {
  fatWashing: { icon: Beaker, label: 'Fat Washing', imageId: 'learn-fat-washing' },
  infusion: { icon: FlaskConical, label: 'Spirit Infusions', imageId: 'learn-infusion' },
  cocktailSmoking: { icon: Flame, label: 'Cocktail Smoking', imageId: 'learn-cocktail-smoking' },
};

export default function LearnPage() {
  const { settings } = useSettings();
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<TechniqueExplanation | null>(null);
  const [activeTechnique, setActiveTechnique] = useState<Technique | null>(null);

  const handleExplainTechnique = (technique: Technique) => {
    startTransition(async () => {
      setExplanation(null);
      setActiveTechnique(technique);
      let result;
      if (technique === 'fatWashing') {
        result = await explainFatWashing();
      } else if (technique === 'infusion') {
        result = await explainInfusion();
      } else {
        result = await explainCocktailSmoking();
      }
      setExplanation(result);
    });
  };

  const techniqueImage = activeTechnique ? PlaceHolderImages.find(img => img.id === techniqueConfig[activeTechnique].imageId) : null;

  if (!settings.showBeta) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Learn Advanced Techniques" />
        <main className="p-6 flex-1 flex items-center justify-center">
          <Alert className="max-w-md text-center bg-card">
            <Beaker className="h-4 w-4" />
            <AlertTitle>Beta Features Disabled</AlertTitle>
            <AlertDescription>
              This section contains advanced topics. To view this content, please enable "Show Beta Features" on the{' '}
              <a href="/settings" className="underline font-semibold hover:text-primary">Settings</a> page.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header title="Learn Advanced Techniques" />
      <main className="p-6 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <Card className="sticky top-20 bg-card">
            <CardHeader>
              <CardTitle>Technique Library</CardTitle>
              <CardDescription>Select a technique to learn more.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {(Object.keys(techniqueConfig) as Technique[]).map((key) => {
                const config = techniqueConfig[key];
                const Icon = config.icon;
                return (
                  <Button
                    key={key}
                    variant={activeTechnique === key ? 'default' : 'secondary'}
                    onClick={() => handleExplainTechnique(key)}
                    disabled={isPending || (key === 'cocktailSmoking' && !settings.hasSmoker)}
                    className="justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" /> {config.label}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          {isPending && (
            <div className="flex h-96 items-center justify-center gap-2 text-muted-foreground rounded-lg border border-dashed">
              <Loader className="animate-spin" /> Generating Explanation...
            </div>
          )}
          
          {!isPending && !explanation && (
            <div className="flex h-96 items-center justify-center text-center text-muted-foreground rounded-lg border border-dashed">
              <div className="flex flex-col items-center gap-4">
                <BookOpen className="w-16 h-16 text-primary/50" />
                <p className="text-lg">Welcome to the lab.</p>
                <p>Select a technique from the library to get started.</p>
              </div>
            </div>
          )}

          {explanation && (
            <Card className="bg-card overflow-hidden">
               {techniqueImage && (
                <div className="relative aspect-[16/7] w-full">
                    <Image 
                        src={techniqueImage.imageUrl}
                        alt={techniqueImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={techniqueImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
                </div>
              )}
              <CardHeader className="pt-2 -mt-12 relative z-10">
                <CardTitle className="text-4xl text-primary font-bold">{explanation.techniqueName}</CardTitle>
                <CardDescription className="text-lg pt-2 text-foreground/80">{explanation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="my-4 bg-border" />
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  {isCocktailSmokingOutput(explanation) ? (
                    <AccordionItem value="item-1" className="border-b-border">
                      <AccordionTrigger className="text-2xl font-headline hover:no-underline">Methods</AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-6 prose prose-invert max-w-none prose-p:text-foreground/80 prose-h4:text-foreground prose-h4:font-body prose-h4:font-semibold">
                          {explanation.methods.map((method, i) => (
                            <div key={i}>
                              <h4 className="font-semibold text-xl mb-1">{method.name}</h4>
                              <p>{method.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <AccordionItem value="item-1" className="border-b-border">
                      <AccordionTrigger className="text-2xl font-headline hover:no-underline">Step-by-Step Guide</AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <ol className="list-decimal list-outside space-y-4 pl-5 text-base text-foreground/80">
                          {explanation.steps.map((step, i) => <li key={i} className="pl-2">{step}</li>)}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="text-2xl font-headline hover:no-underline">Pro Tips</AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <ul className="list-disc list-outside space-y-4 pl-5 text-base text-foreground/80">
                        {explanation.proTips.map((tip, i) => <li key={i} className="pl-2">{tip}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

    