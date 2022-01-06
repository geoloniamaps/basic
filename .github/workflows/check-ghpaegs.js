const axios = require('axios');
const Axios = axios.create({
  headers: {'Cache-Control': 'no-cache'}
});

const deployPreviewUrl = process.argv[2];
const maxFetchTryCount = 15;

const isUrlLive = async (deployPreviewUrl) => {
  let status;
  try {
    const res = await Axios.get(`${deployPreviewUrl}?timestamp=${new Date().getTime()}`);
    if (res.status === 200 && res.statusText === 'OK') {
      status = true;
    }
  } catch (error) {
    status = false;
  }
  return status;
}

let count = 0;
const intervalId = setInterval(async() => {
  const status = await isUrlLive(deployPreviewUrl);
  if (status) {
    clearInterval(intervalId);
    console.log(`Success: the ${deployPreviewUrl} is now live!`)
    process.exit()
  } else if (count > maxFetchTryCount) {
    console.error(`Fail: ${deployPreviewUrl} has not published yet. Please check your GitHub Pages settings.`);
    process.exit(1)
  }
  count++;
}, 3000);