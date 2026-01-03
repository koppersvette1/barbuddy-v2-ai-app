"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/contexts/settings-context";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="flex flex-col">
      <Header title="Settings" />
      <main className="p-6">
        <Card className="max-w-2xl mx-auto">
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
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="show-beta" className="flex flex-col space-y-1">
                <span>Show Beta Features</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Access advanced techniques like fat washing and infusions.
                </span>
              </Label>
              <Switch
                id="show-beta"
                checked={settings.showBeta}
                onCheckedChange={(checked) => updateSettings({ showBeta: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
