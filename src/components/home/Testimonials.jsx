import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Chief Michael Rodriguez",
    company: "Point Pleasant Police Department",
    text: "On Point Uniform has been our go-to supplier for years. Their attention to detail and commitment to quality ensures our officers always look professional and feel confident.",
  },
  {
    name: "Captain Sarah Thompson",
    company: "Ocean County Fire Department",
    text: "The team at On Point truly understands the needs of first responders. Fast service, top-quality gear, and they always go the extra mile to get us what we need.",
  },
  {
    name: "Director James Martinez",
    company: "Regional EMS Services",
    text: "Exceptional service and products. They've helped us outfit our entire EMS team with uniforms that are both durable and comfortable. Highly recommend!",
  },
  {
    name: "Lieutenant Karen Williams",
    company: "Security Solutions Inc.",
    text: "Professional, reliable, and always delivers on time. On Point Uniform has made managing our team's uniform needs effortless.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-stone-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#c41e3a] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1a365d] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a365d] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by law enforcement, fire departments, and EMS professionals across New Jersey
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-[#c41e3a] mb-6" />
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#1a365d]">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrev}
                      className="rounded-full border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      className="rounded-full border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#c41e3a] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
