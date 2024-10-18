const shades: { [key: number]: string } = {
	0: '⠀',
	10: '⠀',
	20: '⠀',
	30: '⠃',
	40: '⠕',
	50: '⠇',
	60: '⠏',
	70: '⠟',
	80: '⠿',
	90: '⡿',
	100: '⣿'
}

export const getShade = (luminance: number) => {
	let rounded: number = Math.round(luminance / 10) * 10;
	return shades[rounded];
}