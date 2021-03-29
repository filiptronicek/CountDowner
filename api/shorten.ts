import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch';

export default (request: NowRequest, response: NowResponse) => {
  const { url = '/e/nwyr' } = request.query
  const fullURL : string = `https://cntd.now.sh/${url}`
  
  fetch(`https://interclip.app/includes/api?url=${fullURL}`, {}).then(r => r.json()).then(rsp => response.status(200).send({result: rsp.result}))
}
