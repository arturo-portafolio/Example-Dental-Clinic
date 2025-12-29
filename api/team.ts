export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json([
    {
      id: 1,
      name: "Dr. Sarah Bennett",
      role: "Lead Dentist",
      bio: "Dr. Bennett has over 15 years of experience in restorative and cosmetic dentistry. She loves creating confident smiles.",
      image: "",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      bio: "Specializing in Invisalign and braces, Dr. Chen helps patients of all ages achieve a straighter, healthier smile.",
      image: "",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Hygienist",
      bio: "Emily focuses on preventive care and patient comfort, ensuring every visit is smooth and informative.",
      image: "",
    },
  ]);
}


