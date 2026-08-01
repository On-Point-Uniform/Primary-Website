import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ChevronDown, ChevronUp } from "lucide-react";

// ── NOTE FOR SELF-HOSTED USE ──────────────────────────────
// In the self-hosted version, the Visual Editor saves changes
// to localStorage only (they are lost on browser refresh).
//
// To make changes permanent when self-hosting:
//   Edit lib/content.js directly — that file is the source of truth.
//   The Visual Editor is useful for previewing changes before committing.
// ─────────────────────────────────────────────────────────

export default function CMSSectionWrapper({ title, icon: Icon, fields, existingContent }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initValues = () => {
    const vals = {};
    fields.forEach((f) => {
      if (f.type === "toggle") {
        vals[f.key] = existingContent[f.key]?.enabled ?? f.fallback ?? true;
      } else {
        vals[f.key] = existingContent[f.key]?.value ?? f.fallback ?? "";
      }
    });
    return vals;
  };

  const [values, setValues] = useState(() => initValues());

  const handleSave = async () => {
    setSaving(true);

    // Save to localStorage — edit lib/content.js to make permanent
    const stored = JSON.parse(localStorage.getItem("site_content_overrides") || "{}");
    fields.forEach((f) => {
      stored[f.key] = values[f.key];
    });
    localStorage.setItem("site_content_overrides", JSON.stringify(stored));

    // Brief delay for UX feedback, then reload so changes are visible
    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      window.location.reload();
    }, 800);
  };

  return (
    <Card>
      <CardHeader className="cursor-pointer select-none" onClick={() => setOpen((o) => !o)}>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-[#c41e3a]" />}
            {title}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </CardTitle>
      </CardHeader>

      {open && (
        <CardContent className="space-y-4 pt-0">
          {fields.map((f) => (
            <div key={f.key}>
              {f.type === "toggle" ? (
                <div className="flex items-center gap-3">
                  <Switch checked={values[f.key]} onCheckedChange={(v) => setValues({ ...values, [f.key]: v })} id={f.key} />
                  <Label htmlFor={f.key}>{f.label}</Label>
                </div>
              ) : f.type === "textarea" ? (
                <div className="space-y-1">
                  <Label>{f.label}</Label>
                  <Textarea value={values[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} rows={4} className="resize-none" />
                </div>
              ) : (
                <div className="space-y-1">
                  <Label>{f.label}</Label>
                  <Input value={values[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                </div>
              )}
            </div>
          ))}
          <div className="pt-1">
            <Button onClick={handleSave} disabled={saving} className="bg-[#c41e3a] hover:bg-[#9e1830] text-white">
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Saved! Reloading..." : saving ? "Saving..." : "Save Changes"}
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              To make changes permanent, edit <code className="bg-gray-100 px-1 rounded">lib/content.js</code> directly.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
