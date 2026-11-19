export type ProductType = "physical" | "digital" | "license";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceEur: number;
  discountPercent: number;
  type: ProductType;
};

export const PRODUCTS: Product[] = [
  {
    id: "tshirt-cyber-locarness",
    name: 'T-Shirt Edição Limitada "Cyber-Locarness"',
    description: "Peça exclusiva em edição limitada, impressão gráfica cyberpunk.",
    priceEur: 45,
    discountPercent: 20,
    type: "physical",
  },
  {
    id: "sample-pack-stems-vol1",
    name: "Sample Pack & Stems Vol. 1 (Digital)",
    description: "Stems e samples originais usados nas produções de Locarness.",
    priceEur: 25,
    discountPercent: 20,
    type: "digital",
  },
  {
    id: "arte-3d-visual-loop",
    name: "Arte 3D Exclusiva / Visual Loop (Licença)",
    description: "Licença de uso de um visual loop 3D exclusivo para projetos pessoais.",
    priceEur: 60,
    discountPercent: 20,
    type: "license",
  },
];
