
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { useToast } from "@/hooks/use-toast";
import { X, Plus, Sparkles, Loader, Image as ImageIcon } from "lucide-react";
import { Recipe } from "@/lib/types";
import { generateCocktailImage } from "@/ai/flows/generate-cocktail-image";
import Image from "next/image";
import { useSettings } from "@/contexts/settings-context";

const recipeSchema = z.object({
  name: z.string().min(3, "Recipe name must be at least 3 characters long."),
  category: z.enum(['Spirit Forward', 'Sours', 'Highballs & Spritzes', 'Tiki, Tropical & Dessert']),
  imagePrompt: z.string().min(10, "Image prompt must be at least 10 characters long."),
  imageDataUri: z.string().optional(),
  spec: z.object({
    ingredients: z.array(z.object({
      item: z.string().min(1, "Ingredient name is required."),
      amount: z.string().min(1, "Amount is required."),
    })).min(1, "At least one ingredient is required."),
    instructions: z.array(z.string().min(1, "Instruction cannot be empty.")).min(1, "At least one instruction is required."),
  }),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export default function AddRecipePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, startTransition] = useTransition();
  const { addCustomRecipe } = useSettings();
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      imagePrompt: "",
      spec: {
        ingredients: [{ item: "", amount: "" }],
        instructions: [""],
      },
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: "spec.ingredients",
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control: form.control,
    name: "spec.instructions",
  });

  const handleGenerateImage = () => {
    const prompt = form.getValues("imagePrompt");
    if (!prompt) {
      form.setError("imagePrompt", { type: "manual", message: "Please enter a prompt for the image." });
      return;
    }
    startTransition(async () => {
      const result = await generateCocktailImage({ prompt });
      if (result.imageDataUri) {
        form.setValue("imageDataUri", result.imageDataUri);
        toast({ title: "Image generated successfully!" });
      } else {
        toast({ variant: "destructive", title: "Image generation failed." });
      }
    });
  };

  function onSubmit(data: RecipeFormValues) {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    const newRecipe: Recipe = {
      name: data.name,
      slug: slug,
      category: data.category,
      image: `custom-${slug}`,
      imageHint: data.imagePrompt,
      imageDataUri: data.imageDataUri,
      spec: data.spec,
      swap: "N/A - Custom Recipe",
      mocktail: {
        name: `Virgin ${data.name}`,
        recipe: "N/A - Custom Recipe",
      },
      kid: {
        name: `${data.name} Cooler`,
        recipe: "N/A - Custom Recipe",
      },
      custom: true,
    }
    
    addCustomRecipe(newRecipe);
    
    toast({
      title: "Recipe Added!",
      description: `Your custom cocktail "${data.name}" has been saved to your library.`,
    });
    
    router.push("/recipes");
  }

  const imageDataUri = form.watch("imageDataUri");

  return (
    <div className="flex flex-col">
      <Header title="Add a New Recipe" />
      <main className="p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Create Your Cocktail</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cocktail Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Midnight Old Fashioned" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Spirit Forward">Spirit Forward</SelectItem>
                            <SelectItem value="Sours">Sours</SelectItem>
                            <SelectItem value="Highballs & Spritzes">Highballs & Spritzes</SelectItem>
                            <SelectItem value="Tiki, Tropical & Dessert">Tiki, Tropical & Dessert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                   <div className="p-4 border rounded-lg bg-background/50 space-y-4">
                     <FormLabel>Cocktail Image</FormLabel>
                     <div className="grid md:grid-cols-2 gap-4 items-start">
                        <div className="space-y-2">
                           <FormField
                              control={form.control}
                              name="imagePrompt"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea placeholder="e.g., A cinematic photo of a dark red cocktail in a coupe glass, garnished with a single Luxardo cherry." {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Describe the image you want the AI to create. Be detailed!
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="button" onClick={handleGenerateImage} disabled={isGenerating}>
                                {isGenerating ? <Loader className="animate-spin" /> : <Sparkles />}
                                Generate Image
                            </Button>
                        </div>

                         <div className="aspect-square w-full bg-muted/50 rounded-md flex items-center justify-center overflow-hidden border">
                            {isGenerating ? (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Loader className="animate-spin h-8 w-8" />
                                <p>Generating...</p>
                              </div>
                            ) : imageDataUri ? (
                                <Image src={imageDataUri} alt="Generated cocktail image" width={400} height={400} className="object-cover w-full h-full" />
                            ): (
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <ImageIcon className="h-8 w-8" />
                                <p>Image will appear here</p>
                              </div>
                            )}
                        </div>
                     </div>
                   </div>
                </div>

                <div>
                  <FormLabel>Ingredients</FormLabel>
                  <div className="space-y-4 pt-2">
                    {ingredientFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`spec.ingredients.${index}.item`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl><Input placeholder="Ingredient Name" {...field} /></FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`spec.ingredients.${index}.amount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl><Input placeholder="Amount (e.g., 2 oz)" {...field} /></FormControl>
                            </FormItem>
                          )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeIngredient(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendIngredient({ item: "", amount: "" })}>
                      <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                    </Button>
                  </div>
                </div>

                <div>
                  <FormLabel>Instructions</FormLabel>
                  <div className="space-y-4 pt-2">
                    {instructionFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                         <span className="text-muted-foreground font-semibold">{index + 1}.</span>
                        <FormField
                          control={form.control}
                          name={`spec.instructions.${index}`}
                          render={({ field }) => (
                             <FormItem className="flex-grow">
                              <FormControl><Textarea placeholder="Describe this step..." {...field} value={field.value ?? ''}/></FormControl>
                            </FormItem>
                          )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeInstruction(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendInstruction("")}>
                      <Plus className="mr-2 h-4 w-4" /> Add Step
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                    <Button type="submit">Add Recipe</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
