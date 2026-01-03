'use client';

import { useState, useTransition } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader, FlaskConical, Beaker } from 'lucide-react';
import { useSettings } from '@/contexts/settings-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { explainFatWashing, type ExplainFatWashingOutput } from '@/ai/flows/explain-fat-washing';
import { explainInfusion, type ExplainInfusionOutput } from '@/ai/flows/explain-infusion';
import { Separator } from '@/components/ui/separator';

type TechniqueExplanation = ExplainFatWashingOutput | ExplainInfusionOutput;

export default function LearnPage() {
  const { settings } = useSettings();
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<TechniqueExplanation | null>(null);
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null);

  const handleExplainTechnique = (technique: 'fatWashing' | 'infusion') => {
    startTransition(async () => {
      setExplanation(null);
      setActiveTechnique(technique);
      let result;
      if (technique === 'fatWashing') {
        result = await explainFatWashing();
      } else {
        result = await explainInfusion();
      }
      setExplanation(result);
    });
  };

  if (!settings.showBeta) {
    return (
      <div className="flex flex-col">
        <Header title="Learn Advanced Techniques" />
        <main className="p-6 flex-1 flex items-center justify-center">
          <Alert className="max-w-md text-center">
            <Beaker className="h-4 w-4" />
            <AlertTitle>Beta Features Disabled</AlertTitle>
            <AlertDescription>
              This section contains advanced topics. To view this content, please enable "Show Beta Features" on the{' '}
              <a href="/settings" className="underline font-semibold">Settings</a> page.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header title="Learn Advanced Techniques" />
      <main className="p-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Technique Library</CardTitle>
              <CardDescription>Select a technique to learn more about it from our AI mixologist.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                variant={activeTechnique === 'fatWashing' ? 'default' : 'outline'}
                onClick={() => handleExplainTechnique('fatWashing')}
                disabled={isPending}
              >
                <Beaker className="mr-2" /> Fat Washing
              </Button>
              <Button
                variant={activeTechnique === 'infusion' ? 'default' : 'outline'}
                onClick={() => handleExplainTechnique('infusion')}
                disabled={isPending}
              >
                <FlaskConical className="mr-2" /> Spirit Infusions
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {isPending && (
            <div className="flex h-64 items-center justify-center gap-2 text-muted-foreground rounded-lg border">
              <Loader className="animate-spin" /> Generating Explanation...
            </div>
          )}
          
          {!isPending && !explanation && (
            <div className="flex h-64 items-center justify-center text-center text-muted-foreground rounded-lg border">
              <p>Select a technique from the library to get started.</p>
            </div>
          )}

          {explanation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{explanation.techniqueName}</CardTitle>
                <CardDescription className="text-base">{explanation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="my-4" />
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl">Step-by-Step Guide</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal list-inside space-y-3 pl-2">
                        {explanation.steps.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl">Pro Tips</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-3 pl-2">
                        {explanation.proTips.map((tip, i) => <li key={i}>{tip}</li>)}
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
