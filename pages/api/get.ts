import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import { decode } from "js-base64";

const get = (req: VercelRequest, res: VercelResponse) => {
  const { code = "" } = req.query;
  fetch(`https://interclip.app/includes/get-api?code=${code}`, {})
    .then((r) => r.json())
    .then((rsp: any) => {
      const URLparts = rsp.result.split("/");
      const constructedURL = `https://${URLparts[2]}/${decode(URLparts.pop())}`;
      res.status(200).send({ result: constructedURL });
    });
};

export default get;
