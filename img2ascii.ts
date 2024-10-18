import * as fs from 'fs';
import { createCanvas } from 'canvas';

const canvas = createCanvas(30, 18);
const ctx = canvas.getContext('2d');

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.font = '16px sans-serif';
ctx.fillText("hi", 0, 15);

const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
let visiblePixels = [];

for (let i = 0; i < pixelData.length; i += 4) {
  let alpha = pixelData[i + 3];
  visiblePixels.push(alpha > 0 ? 1 : 0);
}

let lineToPrint = '';
let output = '\r\n';
for (let i = 0; i < visiblePixels.length; i++) {
  if (i % canvas.width === 0) {
    output += lineToPrint + '\r\n';
    lineToPrint = '';
  }
  lineToPrint += visiblePixels[i] ? '⣿' : '⠀';
}
console.log(output);
fs.writeFileSync('./output/output.txt', output);
