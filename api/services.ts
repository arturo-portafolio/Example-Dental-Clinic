// api/services.ts
export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json([
    {
      id: 1,
      title: "General Cleaning",
      category: "Preventive",
      description: "Professional cleaning to keep your teeth and gums healthy with a gentle touch.",
      price: 120,
      image: "",
    },
    {
      id: 2,
      title: "Whitening",
      category: "Cosmetic",
      description: "Brighten your smile safely and quickly with modern whitening techniques.",
      price: 350,
      image: "",
    },
    {
      id: 3,
      title: "Invisalign",
      category: "Cosmetic",
      description: "Clear aligners to straighten your teeth discreetly.",
      price: 0,
      image: "",
    },
    {
      id: 4,
      title: "Dental Implants",
      category: "Restorative",
      description: "Permanent, natural-looking solution for missing teeth.",
      price: 1500,
      image: "",
    },
    {
      id: 5,
      title: "Emergency",
      category: "Urgent Care",
      description: "Fast relief for tooth pain, broken teeth, or urgent dental concerns.",
      price: 0,
      image: "",
    },
    {
      id: 6,
      title: "Consultation",
      category: "General",
      description: "Meet our specialists and get a personalized treatment plan.",
      price: 0,
      image: "",
    },
  ]);
}
