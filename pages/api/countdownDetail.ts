import prisma from "../../lib/prisma";
import { VercelRequest, VercelResponse } from "@vercel/node";

export const getCountdown = async (slug: string) => {
  const countDown = await prisma.countDown.findUnique({
    where: { slug: slug.toString() },
  });
  return countDown;
};

export default async function fetchCountDownInfo(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method, query } = req;
  const { slug = "" } = query;

  switch (method) {
    case "GET":
      try {
        const countDown = await getCountdown(slug.toString());
        res
          .status(countDown ? 200 : 404)
          .json(countDown || { error: "No countdowns match your search" });
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
