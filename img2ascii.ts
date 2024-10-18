import * as fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import * as path from 'path';

const canvas = createCanvas(30, 17);
const ctx = canvas.getContext('2d');
const imgPath = path.join(__dirname, process.argv[2]);

ctx.clearRect(0, 0, canvas.width, canvas.height);

loadImage(imgPath).then((image) => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let visiblePixels = [];

  for (let i = 0; i < pixelData.length; i += 4) {
    let alpha = pixelData[i + 3];
    visiblePixels.push(alpha > 0 ? 1 : 0);
  }

  let lineToPrint = '';
  let output = '\r\n';
  for (let i = 0; i < visiblePixels.length; i++) {
    if (visiblePixels[i] === 1) {
      console.log('i:', i);
    }
    if (i % canvas.width === 0) {
      output += lineToPrint + '\r\n';
      lineToPrint = '';
    }
    lineToPrint += visiblePixels[i] ? '⣿' : '⠀';
  }
  console.log(output);
  fs.writeFileSync('./output/output.txt', output);
}).catch((err) => {
  console.error('Failed to load image:', err);
});


