import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const shorten = (request: VercelRequest, response: VercelResponse) => {
  const { url = "/e/nwyr" } = request.query;
  const fullURL: string = `https://cntd.now.sh/${url}`;

  fetch(`https://interclip.app/includes/api?url=${fullURL}`, {})
    .then((r: { json: () => any }) => r.json())
    .then((rsp: { result: any }) =>
      response.status(200).send({ result: rsp.result })
    );
};

export default shorten;
