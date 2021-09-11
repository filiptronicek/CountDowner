// Check the internet time and return the difference between it and the client in milliseconds
const timeSync = async (): Promise<number> => {
  const currentTime = new Date().getTime();
  const syncRequest = await fetch(`https://trnck.dev/time?ts=${currentTime}`);
  const syncData = await syncRequest.json();
  const nowstamp = Date.now();
  const adjustedOffset = Math.round(
    syncData.result.ms - (nowstamp - currentTime) / 2
  );

  return adjustedOffset;
};

export default timeSync;
