import prisma from "../../lib/prisma";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function fetchCountDownInfo(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method, query } = req;
  const { slug = "" } = query;

  switch (method) {
    case "GET":
      try {
        const posts = await prisma.countDown.findUnique({
          where: { slug: slug.toString() },
        });
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching countdown" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
