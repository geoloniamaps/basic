const puppeteer = require('puppeteer');
const httpClose = require('http-close')
const server = require('./dev-server');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const port = 9999
const threshold = 2000;

const fetchLatestStyle = async () => {
  const response = await fetch('https://geoloniamaps.github.io/basic/style.json');
  const text = await response.text();
  const style = JSON.parse(text);

  fs.writeFileSync(path.join(__dirname, '../docs/style.json'), JSON.stringify(style));
}

const getMapRenderTime = async (zoom, center) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const lng = center[0];
  const lat = center[1];

  await page.goto(`http://localhost:${port}/index.html#${zoom}/${lat}/${lng}`);
  await page.waitForSelector('.loading-geolonia-map', { hidden: true });

  const mapRenderTime = await page.evaluate(() => {
    return mapRenderedTime;
  })

  await browser.close();

  return mapRenderTime;
}

const getAverageMapRenderTime = async (zoom, center) => {

  const mapRenderedTimes = [];

  // 5回のレンダリング時間の平均を取得
  for (let i = 0; i < 5; i++) {
    const mapRenderedTime = await getMapRenderTime(zoom, center);
    mapRenderedTimes.push(mapRenderedTime);
  }

  // get average map render time
  const average = mapRenderedTimes.reduce((a, b) => a + b, 0) / mapRenderedTimes.length;
  // get min max map render time
  const min = Math.min(...mapRenderedTimes);
  const max = Math.max(...mapRenderedTimes);

  return {
    average: Math.round(average),
    min: Math.round(min),
    max: Math.round(max)
  }
};

const getMapRenderTimeDiff = async (zoom, center) => {

  const mapRenderedTime = await getAverageMapRenderTime(zoom, center);

  // fetch style.json at master branch
  fetchLatestStyle();
  const mapRenderedTimeProd = await getAverageMapRenderTime(zoom, center);

  return mapRenderedTime.average - mapRenderedTimeProd.average;

}

const getMapRenderTimeByZoom = async () => {

  server.listen(port, async () => {

    const center = [139.7671773, 35.6810755];
    // const zoomList = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
    const zoomList = [7]

    let comment = '<h3><span aria-hidden="true">✅</span> 地図レンダリング時間差分</h3>';
    comment += '<p><code>master</code> ブランチのスタイルと、この PR のスタイルの地図レンダリング速度を比較した結果を表示します。（レンダリング時間が2秒以上増加した場合テストが失敗します）</p>';
    comment += '<table><tr><th>ズームレベル</th><th>最新リリースとの差分</th></tr>';

    for (let i = 0; i < zoomList.length; i++) {

      const zoom = zoomList[i];
      const mapRenderedTimeDiff = await getMapRenderTimeDiff(zoom, center);
      const plusMinus = mapRenderedTimeDiff > 0 ? '+' : '';
      comment += `<tr><td>${zoom}</td><td>${plusMinus}${mapRenderedTimeDiff/1000}秒</td></tr>`;

      if (parseInt(mapRenderedTimeDiff) > threshold) {
        throw new Error(`Map render average time changes should be less than ${threshold}ms.`);
      }

    }

    comment += '</table>';

    process.stdout.write(comment);

    httpClose({ timeout: 1 }, server);

    process.exit(0);

  });
}

try {

  getMapRenderTimeByZoom();

} catch (error) {
  console.error(error)
  process.exit(1)

}
