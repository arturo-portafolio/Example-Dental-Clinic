// api/promotions.ts
export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json([
    {
      id: 1,
      title: "New Patient Special: Cleaning + Exam",
      description: "Get a complete dental exam and professional cleaning at a special introductory price.",
      validUntil: "2026-12-31",
      image: "",
    },
    {
      id: 2,
      title: "Whitening Discount",
      description: "Save on professional teeth whitening when you book this month.",
      validUntil: "2026-12-31",
      image: "",
    },
  ]);
}
