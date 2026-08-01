import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { useSiteContent, get } from "@/lib/useSiteContent";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const PLATFORMS = [
  { key: "social_facebook", label: "Facebook", Icon: Facebook, color: "hover:bg-[#1877F2]" },
  { key: "social_instagram", label: "Instagram", Icon: Instagram, color: "hover:bg-[#E4405F]" },
  { key: "social_tiktok", label: "TikTok", Icon: TikTokIcon, color: "hover:bg-[#010101]" },
  { key: "social_twitter", label: "Twitter / X", Icon: Twitter, color: "hover:bg-[#1DA1F2]" },
  { key: "social_youtube", label: "YouTube", Icon: Youtube, color: "hover:bg-[#FF0000]" },
  { key: "social_linkedin", label: "LinkedIn", Icon: Linkedin, color: "hover:bg-[#0A66C2]" },
];

export default function SocialMediaLinks() {
  const { content } = useSiteContent();

  const activeLinks = PLATFORMS.filter(p => {
    const url = get(content, p.key, "");
    return url && url.trim() !== "";
  });

  if (activeLinks.length === 0) return null;

  const sectionTitle = get(content, "social_section_title", "Follow Us");
  const sectionSubtitle = get(content, "social_section_subtitle", "Stay connected with On Point Uniform & Supply on social media");

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[#1a365d] mb-3">{sectionTitle}</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">{sectionSubtitle}</p>
          <div className="flex justify-center gap-5 flex-wrap">
            {activeLinks.map(({ key, label, Icon, color }, i) => (
              <motion.a
                key={key}
                href={get(content, key, "#")}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md ${color}`}
                aria-label={label}
              >
                <Icon className="w-7 h-7" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
