export type Project = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

/** Fotos do portfólio em `public/projects/` (copiadas para `/projects/` no build). */
export const projects: Project[] = [
  {
    title: "Residencial litorâneo",
    subtitle: "Itapema · SC",
    image: "/projects/1.png",
    alt: "Fotografia de obra residencial no litoral — SM Empreiteira",
  },
  {
    title: "Infraestrutura urbana",
    subtitle: "Litoral PR",
    image: "/projects/2.png",
    alt: "Fotografia de infraestrutura ou obra urbana — SM Empreiteira",
  },
  {
    title: "Empreendimento multifamiliar",
    subtitle: "Região metropolitana",
    image: "/projects/3.png",
    alt: "Fotografia de empreendimento multifamiliar em obra — SM Empreiteira",
  },
  {
    title: "Reforma institucional",
    subtitle: "Cliente corporativo",
    image: "/projects/4.png",
    alt: "Fotografia de reforma ou obra institucional — SM Empreiteira",
  },
  {
    title: "Galpão industrial",
    subtitle: "Zona de expansão",
    image: "/projects/5.png",
    alt: "Fotografia de estrutura industrial ou galpão — SM Empreiteira",
  },
  {
    title: "Obra pública — licitação",
    subtitle: "Execução fiscalizada",
    image: "/projects/6.png",
    alt: "Fotografia de obra pública ou canteiro fiscalizado — SM Empreiteira",
  },
];
