import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import { atob } from 'Base64';

function decodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  // from: https://attacomsian.com/blog/javascript-base64-encode-decode
  return decodeURIComponent(atob(str).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

export default (request: VercelRequest, response: VercelResponse) => {
  const { code = "" } = request.query;
  fetch(`https://interclip.app/includes/get-api?code=${code}`, {})
    .then((r) => r.json())
    .then((rsp) => {
      const URLparts = rsp.result.split("/");
      const constructedURL = `https://${URLparts[2]}/${atob(URLparts.pop())}`
      response.status(200).send({ result: constructedURL });
    });
};
