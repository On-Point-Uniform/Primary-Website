import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useSiteContent, get, isEnabled } from "@/lib/useSiteContent";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { content } = useSiteContent();

  if (dismissed) return null;
  if (!isEnabled(content, "announcement_banner_enabled", true)) return null;

  const text = get(content, "announcement_banner", "🎉 IT'S LIVE! Our phone number is now active — call us at 732.701.3847 — we'd love to hear from you!");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 relative"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Phone className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <p className="text-sm md:text-base font-semibold">{text}</p>
          </div>
          <button onClick={() => setDismissed(true)} className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0" aria-label="Close announcement">
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
