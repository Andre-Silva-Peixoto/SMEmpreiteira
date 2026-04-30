export type Project = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

/** Troque imagens e textos quando o cliente enviar o acervo oficial. */
export const projects: Project[] = [
  {
    title: "Residencial litorâneo",
    subtitle: "Itapema · SC",
    image: "/projects/placeholder-01.svg",
    alt: "Fachada moderna em renderização conceitual de obra residencial",
  },
  {
    title: "Infraestrutura urbana",
    subtitle: "Litoral PR",
    image: "/projects/placeholder-02.svg",
    alt: "Trecho de obra civil com estrutura em concreto",
  },
  {
    title: "Empreendimento multifamiliar",
    subtitle: "Região metropolitana",
    image: "/projects/placeholder-03.svg",
    alt: "Edifício em construção com andaimes",
  },
  {
    title: "Reforma institucional",
    subtitle: "Cliente corporativo",
    image: "/projects/placeholder-04.svg",
    alt: "Interior de obra com equipe em serviço",
  },
  {
    title: "Galpão industrial",
    subtitle: "Zona de expansão",
    image: "/projects/placeholder-05.svg",
    alt: "Estrutura metálica de galpão em montagem",
  },
  {
    title: "Obra pública — licitação",
    subtitle: "Execução fiscalizada",
    image: "/projects/placeholder-06.svg",
    alt: "Canteiro de obras com equipamentos e sinalização",
  },
];
