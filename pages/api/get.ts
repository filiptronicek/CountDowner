import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import { decode } from "js-base64";

const get = (request: VercelRequest, response: VercelResponse) => {
  const { code = "" } = request.query;
  fetch(`https://interclip.app/includes/get-api?code=${code}`, {})
    .then((r) => r.json())
    .then((rsp) => {
      const URLparts = rsp.result.split("/");
      const constructedURL = `https://${URLparts[2]}/${decode(URLparts.pop())}`;
      response.status(200).send({ result: constructedURL });
    });
};

export default get;
