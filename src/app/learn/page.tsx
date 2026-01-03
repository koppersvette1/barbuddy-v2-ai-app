'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader, FlaskConical, Beaker, Flame, BookOpen, TestTube } from 'lucide-react';
import { explainFatWashing, type ExplainFatWashingOutput } from '@/ai/flows/explain-fat-washing';
import { explainInfusion, type ExplainInfusionOutput } from '@/ai/flows/explain-infusion';
import { explainCocktailSmoking, type ExplainCocktailSmokingOutput } from '@/ai/flows/explain-cocktail-smoking';
import { explainClarifiedMilkPunch, type ExplainClarifiedMilkPunchOutput } from '@/ai/flows/explain-clarified-milk-punch';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TechniqueExplanation = ExplainFatWashingOutput | ExplainInfusionOutput | ExplainCocktailSmokingOutput | ExplainClarifiedMilkPunchOutput;
type Technique = 'fatWashing' | 'infusion' | 'cocktailSmoking' | 'milkPunch';

function isCocktailSmokingOutput(explanation: any): explanation is ExplainCocktailSmokingOutput {
  return explanation && 'chimneySmokerGuide' in explanation;
}

const techniqueConfig: Record<Technique, { icon: React.ElementType, label: string, imageId: string }> = {
  fatWashing: { icon: Beaker, label: 'Fat Washing', imageId: 'learn-fat-washing' },
  infusion: { icon: FlaskConical, label: 'Spirit Infusions', imageId: 'learn-infusion' },
  cocktailSmoking: { icon: Flame, label: 'Cocktail Smoking', imageId: 'learn-cocktail-smoking' },
  milkPunch: { icon: TestTube, label: 'Clarified Milk Punch', imageId: 'learn-milk-punch' },
};

export default function LearnPage() {
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
      } else if (technique === 'milkPunch') {
        result = await explainClarifiedMilkPunch();
      } else {
        result = await explainCocktailSmoking();
      }
      setExplanation(result);
    });
  };

  const techniqueImage = activeTechnique ? PlaceHolderImages.find(img => img.id === techniqueConfig[activeTechnique].imageId) : null;


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
                    disabled={isPending}
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
                    <>
                      <AccordionItem value="item-1" className="border-b-border">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">{explanation.chimneySmokerGuide.title}</AccordionTrigger>
                        <AccordionContent className="pt-2">
                           <ol className="list-decimal list-outside space-y-4 pl-5 text-base text-foreground/80">
                            {explanation.chimneySmokerGuide.steps.map((step, i) => <li key={i} className="pl-2">{step}</li>)}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-b-border">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">{explanation.torchGuide.title}</AccordionTrigger>
                        <AccordionContent className="pt-2 prose prose-invert max-w-none prose-p:text-foreground/80">
                          <p>{explanation.torchGuide.description}</p>
                          <h4 className="font-semibold text-xl mb-2 mt-4 text-foreground">The "No-Sputter" Refill Method</h4>
                          <ol className="list-decimal list-outside space-y-4 pl-5 text-base text-foreground/80">
                            {explanation.torchGuide.refillSteps.map((step, i) => <li key={i} className="pl-2">{step}</li>)}
                          </ol>
                          <h4 className="font-semibold text-xl mb-2 mt-4 text-foreground">Troubleshooting</h4>
                           <div className="space-y-4">
                            {explanation.torchGuide.troubleshooting.map((item, i) => (
                              <div key={i} className="p-3 rounded-md border border-border/50 bg-background/30">
                                <p className="font-semibold text-foreground">{item.issue}</p>
                                <p className="text-foreground/80">{item.solution}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-b-0">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">Glassware Tips</AccordionTrigger>
                        <AccordionContent className="pt-2">
                           <div className="space-y-4">
                            {explanation.glasswareTips.map((item, i) => (
                              <div key={i} className="p-3 rounded-md border border-border/50 bg-background/30">
                                <p className="font-semibold text-foreground">{item.glassType}</p>
                                <p className="text-foreground/80">{item.tip}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-b-0">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">Pro-Tips & Safety</AccordionTrigger>
                        <AccordionContent className="pt-2">
                           <div className="space-y-4">
                            {explanation.proTips.map((item, i) => (
                              <div key={i} className="p-3 rounded-md border border-border/50 bg-background/30">
                                <p className="font-semibold text-foreground">{item.title}</p>
                                 <ul className="list-disc list-outside space-y-2 pl-5 text-base text-foreground/80 mt-2">
                                  {item.points.map((point, j) => <li key={j} className="pl-2">{point}</li>)}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </>
                  ) : (
                    <>
                      <AccordionItem value="item-1" className="border-b-border">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">Step-by-Step Guide</AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ol className="list-decimal list-outside space-y-4 pl-5 text-base text-foreground/80">
                            {'steps' in explanation && explanation.steps.map((step, i) => <li key={i} className="pl-2">{step}</li>)}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-b-0">
                        <AccordionTrigger className="text-2xl font-headline hover:no-underline">Pro Tips</AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ul className="list-disc list-outside space-y-4 pl-5 text-base text-foreground/80">
                            {'proTips' in explanation && explanation.proTips.map((tip, i) => <li key={i} className="pl-2">{tip}</li>)}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
