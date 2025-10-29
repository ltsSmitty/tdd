type Vec = { x: number; y: number };

function dot(u: Vec, v: Vec) {
	return u.x * v.x + u.y * v.y;
}
function perp(v: Vec): Vec {
	return { x: -v.y, y: v.x };
}
function add(u: Vec, v: Vec): Vec {
	return { x: u.x + v.x, y: u.y + v.y };
}
function scale(s: number, v: Vec): Vec {
	return { x: s * v.x, y: s * v.y };
}
function norm2(v: Vec) {
	return v.x * v.x + v.y * v.y;
}

export function sumToTargetWeighted(
	a: Vec,
	b: Vec,
	t: Vec,
	opts?: {
		nonNegative?: boolean;
		// weights for |x| and |y|
		weights?: { w1: number; w2: number };
		// trade-off: 0 = pure geometric accuracy, larger = prefer cheaper steps
		lambda?: number;
		// how far to search around the rounded solution
		neighborhoodRadius?: number;
	}
) {
	const {
		nonNegative = false,
		weights = { w1: 1, w2: 1 },
		lambda = 0, // set e.g. 0.1, 1, 5 depending on units/magnitude
		neighborhoodRadius = 2,
	} = opts ?? {};

	const bp = perp(b);
	const ap = perp(a);
	const denomX = dot(a, bp);
	const denomY = dot(b, ap);
	if (denomX === 0 || denomY === 0) throw new Error("a and b are collinear");

	const xReal = dot(t, bp) / denomX;
	const yReal = dot(t, ap) / denomY;

	const xr = Math.round(xReal);
	const yr = Math.round(yReal);

	let best = { x: xr, y: yr };
	let bestScore = Infinity;

	// small integer neighborhood around Babai rounding
	for (let dx = -neighborhoodRadius; dx <= neighborhoodRadius; dx++) {
		for (let dy = -neighborhoodRadius; dy <= neighborhoodRadius; dy++) {
			const x = xr + dx;
			const y = yr + dy;
			if (nonNegative && (x < 0 || y < 0)) continue;

			const approx = add(scale(x, a), scale(y, b));
			const err2 = norm2({ x: approx.x - t.x, y: approx.y - t.y });

			const stepCost = weights.w1 * Math.abs(x) + weights.w2 * Math.abs(y);
			const score = err2 + lambda * stepCost;

			if (score < bestScore) {
				bestScore = score;
				best = { x, y };
			}
		}
	}

	const approx = add(scale(best.x, a), scale(best.y, b));
	const residual = { x: t.x - approx.x, y: t.y - approx.y };
	return {
		counts: best,
		approx,
		residual,
		residualNorm: Math.sqrt(norm2(residual)),
		score: bestScore,
	};
}
