// api/gallery.ts
export default function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  return res.status(200).json([
    {
      id: 1,
      title: "Whitening Treatment",
      beforeImage:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=1200",
      afterImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: 2,
      title: "Invisalign Results",
      beforeImage:
        "https://images.unsplash.com/photo-1629909615184-74fbe0b9d3c9?auto=format&fit=crop&q=80&w=1200",
      afterImage:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=1200",
    },
  ]);
}
