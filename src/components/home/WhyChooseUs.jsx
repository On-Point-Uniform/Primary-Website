import { motion } from "framer-motion";
import { Award, Truck, Users, HeadphonesIcon } from "lucide-react";
import { useSiteContent, get } from "@/lib/useSiteContent";

const icons = [Award, Users, Truck, HeadphonesIcon];

export default function WhyChooseUs() {
  const { content } = useSiteContent();

  const title = get(content, "why_title", "Why Choose On Point?");
  const subtitle = get(content, "why_subtitle", "We're committed to outfitting professionals with the best uniforms and supplies");

  const features = [
    { title: get(content, "why_feature1_title", "Quality Products"), description: get(content, "why_feature1_desc", "We source only the highest quality uniforms and gear from trusted manufacturers.") },
    { title: get(content, "why_feature2_title", "Local Expertise"), description: get(content, "why_feature2_desc", "Proudly serving Point Pleasant and the surrounding NJ community with personalized service.") },
    { title: get(content, "why_feature3_title", "Fast Service"), description: get(content, "why_feature3_desc", "Quick turnaround times to get you the uniforms and equipment you need.") },
    { title: get(content, "why_feature4_title", "Expert Support"), description: get(content, "why_feature4_desc", "Our knowledgeable team is here to help you find exactly what you need.") },
  ];

  return (
    <section className="py-20 bg-[#d4c5a9]/20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#1a365d] to-[#0f2744] flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1a365d] mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
