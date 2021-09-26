import countdownID from "@utils/createCountdownID";
import prisma from "@utils/prisma";
import { VercelRequest, VercelResponse } from "@vercel/node";

const createCountDownLink = async (
  name: string,
  date: number,
  timezone: string
) => {
  const duplicate = await prisma.countDown.findFirst({
    where: { timestamp: date, timezone, name },
  });
  if (!duplicate) {
    const link = await prisma.countDown.create({
      data: { slug: countdownID(7), timestamp: date, timezone, name },
    });
    return link;
  } else {
    return duplicate;
  }
};

const requestHandler = async (req: VercelRequest, res: VercelResponse) => {
  const { name, date, timezone } = req.query;
  if (name && date) {
    res
      .status(200)
      .json(
        await createCountDownLink(
          name.toString(),
          parseInt(date.toString()),
          timezone && timezone.toString()
        )
      );
  } else {
    res.status(400).json({ error: "Expected more query params" });
  }
};

export default requestHandler;
