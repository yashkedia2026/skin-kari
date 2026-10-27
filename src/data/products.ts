export type ProductColor = "orange" | "blue" | "pink" | "green";
export interface EditorialProduct {
  handle: string;
  title: string;
  shortName: string;
  eyebrow: string;
  description: string;
  color: ProductColor;
  accent: string;
  background: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  concerns: string[];
  featuredIngredients: { name: string; description: string }[];
  benefits: string[];
  directions: string[];
  caution: string[];
  packaging: {
    format: string;
    netContent: string;
    source: string;
    material?: string;
  };
}
export const directions = [
  "Apply the mask on a freshly cleansed face.",
  "Keep it on for 15 minutes before removing gently.",
  "Pat the excess serum into your face and neck.",
];
const caution = [
  "For external use. Keep out of reach of children.",
  "Avoid direct contact with eyes. If contact occurs, rinse well with water.",
  "Do not apply to wounds or damaged skin. Discontinue use if irritation or rash appears.",
  "Store in a cool, dry place away from direct sunlight. Use immediately after opening.",
  "Consult a specialist if symptoms such as red spots, swelling or itching occur after sun exposure during or after use.",
];
const shared = { directions, caution };
export const products: EditorialProduct[] = [
  {
    ...shared,
    handle: "vitamin-c-radiance-face-mask",
    title: "Vitamin C Radiance Face Mask",
    shortName: "Vitamin C",
    eyebrow: "A little brighter",
    description:
      "A refreshing sheet mask that helps brighten dull-looking skin, replenish moisture and enhance natural radiance. For skin that feels softer, smoother and revived.",
    color: "orange",
    accent: "#b83d0c",
    background: "#ffdfab",
    image: "/images/products/vitamin-c.webp",
    imageAlt:
      "Vitamin C Radiance Face Mask packaging with orange citrus artwork and an illustrated portrait",
    concerns: ["Dullness", "Uneven tone"],
    benefits: [
      "Helps reduce dullness",
      "Boosts the appearance of radiance",
      "Hydrates and softens",
    ],
    featuredIngredients: [
      {
        name: "Vitamin C",
        description: "Named on the radiance-focused formula.",
      },
      {
        name: "Niacinamide",
        description: "A featured ingredient on this mask’s packaging.",
      },
      {
        name: "Licorice extract",
        description: "A botanical ingredient named on the pack.",
      },
    ],
    packaging: {
      format: "1 sheet mask",
      netContent: "20 ml",
      source: "VITAMIN C ACID FACE SHEET MASK_SKINKARI_231026.pdf",
    },
  },
  {
    ...shared,
    handle: "hyaluronic-acid-face-mask",
    title: "Hyaluronic Acid Face Mask",
    shortName: "Hyaluronic Acid",
    eyebrow: "A drink for your skin",
    description:
      "A moisture-focused sheet mask that helps replenish dry-feeling skin. Leaves skin feeling soft, smooth and refreshed, with a plump, supple appearance.",
    color: "blue",
    accent: "#204c92",
    background: "#d2eaf6",
    image: "/images/products/hyaluronic-acid.webp",
    imageAlt:
      "Hyaluronic Acid Face Mask packaging with blue geometric artwork and an illustrated portrait",
    concerns: ["Dryness"],
    benefits: [
      "Replenishes moisture",
      "Supports the skin’s moisture barrier",
      "Leaves skin feeling plump and supple",
    ],
    featuredIngredients: [
      {
        name: "Hyaluronic acid",
        description: "Featured in this moisture-focused formula.",
      },
      { name: "Ceramides", description: "Named on this mask’s packaging." },
      {
        name: "Panthenol",
        description: "A featured ingredient listed on the front of the pack.",
      },
      {
        name: "Aloe vera",
        description: "A botanical ingredient named on the pack.",
      },
    ],
    packaging: {
      format: "1 sheet mask",
      netContent: "20 ml",
      source: "HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf",
    },
  },
  {
    ...shared,
    handle: "collagen-peptide-face-mask",
    title: "Collagen & Peptide Face Mask",
    shortName: "Collagen & Peptide",
    eyebrow: "Hello, happy bounce",
    description:
      "A nourishing sheet mask that helps restore moisture and softness to tired-looking skin. Supports a smoother, firmer-looking complexion and a fresh, healthy-looking glow.",
    color: "pink",
    accent: "#9c2747",
    background: "#f7d9e1",
    image: "/images/products/collagen-peptide.webp",
    imageAlt:
      "Collagen and Peptide Face Mask packaging with pink and coral illustrated artwork",
    concerns: ["Fine lines", "Dullness"],
    benefits: [
      "Supports the appearance of elasticity",
      "Promotes smoother-looking skin",
      "Restores moisture and softness",
    ],
    featuredIngredients: [
      {
        name: "Collagen",
        description: "Featured in this nourishing sheet mask.",
      },
      { name: "Peptides", description: "Named on the formula’s packaging." },
      {
        name: "Squalane",
        description: "A featured ingredient on the front of the pack.",
      },
    ],
    packaging: {
      format: "1 sheet mask",
      netContent: "20 ml",
      source: "COLLAGEN & PEPTIDE FACE SHEET MASK_SKINKARI_231026.pdf",
    },
  },
  {
    ...shared,
    handle: "detan-face-mask",
    title: "Detan Face Mask",
    shortName: "Detan",
    eyebrow: "Fresh starts here",
    description:
      "A refreshing sheet mask that helps reduce the appearance of sun tan, dullness and uneven skin tone. Nourishes and hydrates for soft, smooth, revitalized-feeling skin.",
    color: "green",
    accent: "#24583b",
    background: "#dbe7c5",
    image: "/images/products/detan.webp",
    imageAlt:
      "Detan Face Mask packaging with green botanical artwork and a geometric illustrated portrait",
    concerns: ["Uneven tone", "Dullness"],
    benefits: [
      "Helps improve the appearance of uneven tone",
      "Refreshes tired-looking skin",
      "Nourishes and hydrates",
    ],
    featuredIngredients: [
      {
        name: "Activated charcoal",
        description: "A featured ingredient on the Detan pack.",
      },
      {
        name: "Green tea extract",
        description: "Named alongside a soothing claim on the packaging.",
      },
      {
        name: "Aloe vera",
        description: "Named alongside a hydration claim on the packaging.",
      },
      {
        name: "Niacinamide",
        description: "Named alongside an even-tone appearance claim.",
      },
    ],
    packaging: {
      format: "1 sheet mask",
      netContent: "20 ml",
      source: "DETAN FACE SHEET MASK_SKINKARI_231026.pdf",
    },
  },
];
export function getEditorialProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}
