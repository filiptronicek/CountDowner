type syncResponseType = {
  status: string;
  result: {
    s: number;
    ms: number;
    unix: number;
    unix_ms: number;
  };
};

/**
 * Check the internet time (Cloudflare) and return the difference between it and the client in milliseconds.
 * This number is only approximate, because the latency is accounted for as equal in both upload and download.
 * Additionaly, the serverless function may have a cold start which may make the request take even longer, resulting in a very unreliable result.
 * To circumvent this, it's a good idea to make multiple requests and average them out.
 * @returns a promise resolving to an amount of miliseconds, which is approximetely the difference between the client and the server.
 * @author @filiptronicek
 */
const timeSync = async (): Promise<number> => {
  const currentTime = new Date().getTime();
  const syncRequest = await fetch(`https://trnck.dev/time?ts=${currentTime}`);
  const syncData: syncResponseType = await syncRequest.json();
  const nowstamp = Date.now();
  const adjustedOffset = Math.round(
    syncData.result.ms - (nowstamp - currentTime) / 2,
  );

  return adjustedOffset;
};

export default timeSync;
