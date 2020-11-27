import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch';

export default (request: NowRequest, response: NowResponse) => {
  const { code = '' } = request.query;
  fetch(`https://link.mannoviny.cz/includes/get-api?code=${code}`, {}).then(r => r.json()).then(rsp => response.status(200).send({result: rsp.result}));
}
