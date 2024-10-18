export const getLuminance = (r: number, g: number, b: number) => {
	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let l = (max + min) / 2;
	return l * 100;
}