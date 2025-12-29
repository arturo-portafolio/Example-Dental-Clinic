// api/faqs.ts
export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json([
    {
      id: 1,
      question: "Do you accept insurance?",
      answer:
        "Yes. We work with most major providers. Bring your insurance card and we’ll verify coverage before treatment.",
    },
    {
      id: 2,
      question: "How often should I get a dental cleaning?",
      answer:
        "Most patients benefit from a cleaning every 6 months, but your dentist may recommend a different schedule based on your needs.",
    },
    {
      id: 3,
      question: "Is teeth whitening safe?",
      answer:
        "Yes, professional whitening is safe when done as directed. We’ll recommend the best option for your enamel and sensitivity level.",
    },
    {
      id: 4,
      question: "Do you offer Invisalign?",
      answer:
        "Yes. We offer clear aligners (including Invisalign) and we’ll evaluate if you’re a good candidate during a consultation.",
    },
  ]);
}
