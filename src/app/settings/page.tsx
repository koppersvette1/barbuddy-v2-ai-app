
"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/settings-context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="flex flex-col">
      <Header title="Settings" />
      <main className="p-6">
        <div className="max-w-2xl mx-auto grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your BarBuddy experience. Your changes will be saved automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
                <Label htmlFor="show-alcohol" className="flex flex-col space-y-1">
                  <span>Show Alcohol</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Display standard alcoholic cocktail recipes.
                  </span>
                </Label>
                <Switch
                  id="show-alcohol"
                  checked={settings.showAlcohol}
                  onCheckedChange={(checked) => updateSettings({ showAlcohol: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
                <Label htmlFor="show-mocktails" className="flex flex-col space-y-1">
                  <span>Show Mocktails</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Include non-alcoholic versions of cocktails.
                  </span>
                </Label>
                <Switch
                  id="show-mocktails"
                  checked={settings.showMocktails}
                  onCheckedChange={(checked) => updateSettings({ showMocktails: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
                <Label htmlFor="show-kids" className="flex flex-col space-y-1">
                  <span>Show Kids' Drinks</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Suggest fun, kid-friendly themed beverages.
                  </span>
                </Label>
                <Switch
                  id="show-kids"
                  checked={settings.showKids}
                  onCheckedChange={(checked) => updateSettings({ showKids: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
                <Label htmlFor="has-smoker" className="flex flex-col space-y-1">
                  <span>I Have a Smoker</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Enable smoke suggestions and wood pairings.
                  </span>
                </Label>
                <Switch
                  id="has-smoker"
                  checked={settings.hasSmoker}
                  onCheckedChange={(checked) => updateSettings({ hasSmoker: checked })}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Adjust settings to make the app easier to use.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="p-4 rounded-lg border">
                <Label className="flex flex-col space-y-1 mb-4">
                  <span>Font Size</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Adjust the text size for better readability.
                  </span>
                </Label>
                <RadioGroup
                  value={settings.fontSize}
                  onValueChange={(value) => updateSettings({ fontSize: value as 'small' | 'medium' | 'large' })}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="font-small" />
                    <Label htmlFor="font-small">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="font-medium" />
                    <Label htmlFor="font-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="font-large" />
                    <Label htmlFor="font-large">Large</Label>
                  </div>
                </RadioGroup>
               </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
