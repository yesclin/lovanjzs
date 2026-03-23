import { motion } from "framer-motion";
import { Layers, Feather, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Feather,
    title: "Design Refinado",
    description: "Cada detalhe é pensado para criar uma experiência visual harmoniosa e memorável.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Velocidade e eficiência sem comprometer a qualidade do design ou da experiência.",
  },
  {
    icon: Layers,
    title: "Escalável",
    description: "Arquitetura flexível que cresce junto com as necessidades do seu projeto.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Proteção robusta integrada em cada camada da aplicação.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-medium">
            Recursos
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground">
            O essencial, bem feito
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-4xl mx-auto border border-border rounded-lg overflow-hidden">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-10 md:p-12 group hover:bg-accent/50 transition-colors duration-500"
            >
              <feature.icon className="h-5 w-5 text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-500" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-foreground mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
