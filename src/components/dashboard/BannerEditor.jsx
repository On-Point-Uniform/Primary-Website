import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Megaphone, Save } from "lucide-react";

export default function BannerEditor() {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => base44.entities.SiteSettings.filter({ key: "announcement_banner" }),
  });

  const bannerRecord = settings[0];
  const [text, setText] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [initialized, setInitialized] = useState(false);

  if (!isLoading && !initialized) {
    setText(bannerRecord?.value ?? "🎉 IT'S LIVE! Our phone number is now active — call us at 732.701.3847");
    setEnabled(bannerRecord?.enabled ?? true);
    setInitialized(true);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (bannerRecord) {
        await base44.entities.SiteSettings.update(bannerRecord.id, { value: text, enabled });
      } else {
        await base44.entities.SiteSettings.create({ key: "announcement_banner", value: text, enabled });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  if (isLoading) return <p className="text-gray-500">Loading banner settings...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          Website Announcement Banner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <Switch checked={enabled} onCheckedChange={setEnabled} id="banner-enabled" />
          <Label htmlFor="banner-enabled" className="text-sm font-medium">
            {enabled ? "Banner is visible on website" : "Banner is hidden"}
          </Label>
        </div>
        <div className="space-y-1">
          <Label htmlFor="banner-text">Banner Message</Label>
          <Input
            id="banner-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter announcement banner text..."
          />
        </div>
        <Button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="bg-[#1a365d] hover:bg-[#0f2744]"
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : saveMutation.isPending ? "Saving..." : "Save Banner"}
        </Button>
      </CardContent>
    </Card>
  );
}
