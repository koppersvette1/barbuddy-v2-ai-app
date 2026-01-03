
"use client";

import { useState } from "react";
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
import { X, Plus } from "lucide-react";
import { useSettings } from "@/contexts/settings-context";
import { Recipe } from "@/lib/types";

const recipeSchema = z.object({
  name: z.string().min(3, "Recipe name must be at least 3 characters long."),
  category: z.enum(['Spirit Forward', 'Sours', 'Highballs & Spritzes', 'Tiki, Tropical & Dessert']),
  image: z.string().min(3, "Image ID must be at least 3 characters long."),
  imageHint: z.string().optional(),
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
  // In a real app, you would have a function to persist this data.
  // For now, we'll just log it to the console and show a toast.
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
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

  function onSubmit(data: RecipeFormValues) {
    const newRecipe: Recipe = {
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      swap: 'N/A',
      mocktail: { name: 'N/A', recipe: 'N/A' },
      kid: { name: 'N/A', recipe: 'N/A' },
      custom: true,
    }
    
    console.log("New Recipe Submitted:", newRecipe);
    
    toast({
      title: "Recipe Submitted!",
      description: `The recipe for "${data.name}" has been logged. In a real app, I would save this to the database.`,
    });
    
    router.push("/recipes");
  }

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
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., custom-old-fashioned" {...field} />
                        </FormControl>
                         <FormDescription>
                          A unique ID for the placeholder image. I will generate an image for you later.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Hint</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., whiskey glass" {...field} />
                        </FormControl>
                         <FormDescription>
                          Two keywords to help find the right image (e.g., "dark cocktail").
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
