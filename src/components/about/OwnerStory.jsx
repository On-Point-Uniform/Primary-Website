import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSiteContent, get } from "@/lib/useSiteContent";

export default function OwnerStory() {
  const { content } = useSiteContent();

  const sectionTitle = get(content, "founders_title", "The Founders' Story");
  const names = get(content, "founders_names", "Michele & Stephen Grady");
  const subtitle = get(content, "founders_subtitle", "Founders, On Point Uniform & Supply");
  const p1 = get(content, "founders_p1", "Hi everyone, thank you for following our page! My name is Michele Grady, and for more than two decades I worked in the private sector in banking. Over time, I felt called to pursue a path where I could serve my community more directly, which led me to begin a career in EMS. Being part of the emergency services world gave me a deep appreciation for the dedication, sacrifice, and professionalism of first responders.");
  const p2 = get(content, "founders_p2", "The thought of On Point Uniform & Supply has been a long-time goal for my husband Stephen and me. Stephen has spent over 20 years serving in a dispatch capacity, supporting first responders and the community behind the scenes every day.");
  const p3 = get(content, "founders_p3", "This truly is a family effort. Our son Thomas has also been helping behind the scenes and is incredibly excited to see this dream come to life. Together, our experiences in EMS and public safety have inspired us to build a business dedicated to supporting those who serve our communities.");
  const p4 = get(content, "founders_p4", "Our goal is to create a place where Police, Fire, and EMS professionals can find quality uniforms, gear, and a store that truly understands the work they do. We're excited to be opening in Point Pleasant, NJ, with our Grand Opening planned for May 2026.");
  const quote = get(content, "founders_quote", '"Because your uniform speaks before you do."');
  const quoteAttr = get(content, "founders_quote_attr", "— Michele & Stephen Grady");
  const photoUrl = get(content, "founders_photo_url", "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697977fd549d80c8349646ba/9beb1d3df_MicheleSteveWebsitePhoto.jpg");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-4">{sectionTitle}</h2>
          <div className="w-20 h-1 bg-[#c41e3a] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-center gap-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#1a365d] to-[#c41e3a] rounded-2xl opacity-20 blur-sm" />
              <img src={photoUrl} alt={names} className="relative w-full max-w-md rounded-2xl shadow-xl object-cover" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#1a365d]">{names}</p>
              <p className="text-[#c41e3a] font-semibold">{subtitle}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <Quote className="w-10 h-10 text-[#c41e3a]" />
            <p className="text-gray-700 leading-relaxed">{p1}</p>
            <p className="text-gray-700 leading-relaxed">{p2}</p>
            <p className="text-gray-700 leading-relaxed">{p3}</p>
            <p className="text-gray-700 leading-relaxed">{p4}</p>
            <div className="border-l-4 border-[#c41e3a] pl-5 mt-6">
              <p className="text-lg italic text-[#1a365d] font-semibold">{quote}</p>
              <p className="text-gray-500 mt-1">{quoteAttr}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
