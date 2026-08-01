import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Shield, Flame, Heart, Lock, Stethoscope, Target } from "lucide-react";

const categories = [
  {
    id: "police",
    name: "Police",
    description: "Professional law enforcement uniforms and gear",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=600&h=400&fit=crop",
  },
  {
    id: "fire",
    name: "Fire & Rescue",
    description: "High-quality firefighter uniforms and equipment",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=600&h=400&fit=crop",
  },
  {
    id: "ems",
    name: "EMS",
    description: "Emergency medical services apparel",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
  },
  {
    id: "security",
    name: "Security",
    description: "Professional security uniforms and accessories",
    icon: Lock,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    id: "medical",
    name: "Medical",
    description: "Scrubs and medical professional attire",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
  },
  {
    id: "tactical",
    name: "Tactical",
    description: "Tactical gear and accessories",
    icon: Target,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&h=400&fit=crop",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">
            What We Supply
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We supply uniforms and equipment for all first responders and professional services
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl(`Products?category=${category.id}`)}
                className="group block relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d] via-[#1a365d]/60 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#c41e3a] flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
