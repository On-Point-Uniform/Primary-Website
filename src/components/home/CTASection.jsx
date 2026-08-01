import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useSiteContent, get } from "@/lib/useSiteContent";

export default function CTASection() {
  const { content } = useSiteContent();

  const title = get(content, "cta_title", "Ready to Get Started?");
  const subtitle = get(content, "cta_subtitle", "Contact us today to discuss your uniform and supply needs. We're here to help outfit your team with quality gear.");
  const phoneHref = get(content, "cta_phone_href", "732-701-3847");
  const phoneBtnLabel = get(content, "cta_btn_phone_label", "Call 732.701.3847");
  const messageBtnLabel = get(content, "cta_btn_message_label", "Send a Message");

  return (
    <section className="py-20 bg-[#1a365d] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c41e3a] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4c5a9] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${phoneHref}`} className="inline-flex items-center justify-center gap-3 bg-[#c41e3a] hover:bg-[#9e1830] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              <Phone className="w-5 h-5" />
              {phoneBtnLabel}
            </a>
            <Link to={createPageUrl("Contact")} className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#1a365d] px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              {messageBtnLabel}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
