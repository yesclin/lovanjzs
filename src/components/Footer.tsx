import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <Separator className="mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium text-foreground tracking-tight mb-3">
              Mínimo
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Design com propósito.
            </p>
          </div>

          {[
            { title: "Produto", links: ["Recursos", "Preços", "Changelog"] },
            { title: "Empresa", links: ["Sobre", "Blog", "Carreiras"] },
            { title: "Legal", links: ["Privacidade", "Termos", "Contato"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-[0.15em]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />
        
        <p className="text-xs text-muted-foreground font-light text-center tracking-wide">
          © {new Date().getFullYear()} Mínimo. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
