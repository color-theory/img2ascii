import * as fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import * as path from 'path';
import { getShade } from './util/shades';
import { getLuminance } from './util/rgb';

// Change these values to adjust the size of the output image
const canvasWidth = 30;
const canvasHeight = 15;

const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');
const imgPath = path.join(__dirname, process.argv[2]);

ctx.clearRect(0, 0, canvasWidth, canvasHeight);

loadImage(imgPath).then((image) => {
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  const pixelData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  let visiblePixels = [];

  for (let i = 0; i < pixelData.length; i += 4) {
    let r = pixelData[i];
    let g = pixelData[i + 1];
    let b = pixelData[i + 2];
    let luminance = getLuminance(r, g, b);
    visiblePixels.push(getShade(luminance));
  }

  let lineToPrint = '';
  let output = '\r\n';
  for (let i = 0; i < visiblePixels.length; i++) {
    if (i % canvasWidth === 0) {
      output += lineToPrint + '\r\n';
      lineToPrint = '';
    }
    lineToPrint += visiblePixels[i];
  }
  console.log(output);
  fs.writeFileSync('./output/output.txt', output);
}).catch((err) => {
  console.error('Failed to load image:', err);
});
