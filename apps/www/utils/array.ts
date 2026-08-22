export function split<T>(array: T[], into: number = 2): T[][] {
	const result: T[][] = Array.from({ length: into }, () => []);
	array.forEach((item, i) => {
		result[i % into]?.push(item);
	});

	return result;
}
