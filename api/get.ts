import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "node-fetch";
import { atob, btoa } from 'Base64';

function decodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  // from: https://attacomsian.com/blog/javascript-base64-encode-decode
  return decodeURIComponent(atob(str).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

export default (request: NowRequest, response: NowResponse) => {
  const { code = "" } = request.query;
  fetch(`https://link.mannoviny.cz/includes/get-api?code=${code}`, {})
    .then((r) => r.json())
    .then((rsp) => {
      console.log(decodeUnicode("4pi6"));
      const URLparts = rsp.result.split("/");
      const constructedURL = `https://${URLparts[2]}/${atob(URLparts.pop())}`
      console.log(constructedURL);
      response.status(200).send({ result: constructedURL });
    });
};
