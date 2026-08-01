import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent, get } from "@/lib/useSiteContent";

export default function HeroSection() {
  const { content } = useSiteContent();

  const title = get(content, "hero_title", "On Point Uniform & Supply");
  const tagline = get(content, "hero_tagline", '"Because Your Uniform Speaks Before You Do"');
  const description = get(content, "hero_description", "Your trusted local source for professional uniforms and equipment. Serving police, fire, EMS, security, and medical professionals with quality gear.");
  const locationBadge = get(content, "hero_location_badge", "Point Pleasant, NJ");
  const btnPrimary = get(content, "hero_btn_primary", "Browse Products");
  const btnSecondary = get(content, "hero_btn_secondary", "Contact Us");

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#0f2744] to-[#1a365d]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#c41e3a] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4c5a9] rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-[#c41e3a]/20 text-[#d4c5a9] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              {locationBadge}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title.includes("&") ? (
                <>
                  {title.split("&")[0].trim()}
                  <span className="text-[#c41e3a]"> & {title.split("&")[1]?.trim()}</span>
                </>
              ) : title}
            </h1>

            <p className="text-xl md:text-2xl text-[#d4c5a9] italic mb-8">{tagline}</p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("Products")} className="inline-flex items-center justify-center gap-2 bg-[#c41e3a] hover:bg-[#9e1830] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                {btnPrimary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to={createPageUrl("Contact")} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                {btnSecondary}
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#d4c5a9]/20 to-transparent flex items-center justify-center">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697977fd549d80c8349646ba/d8270e7b8_OPU.png" alt="On Point Uniform Badge" className="w-52 h-52 object-contain drop-shadow-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
