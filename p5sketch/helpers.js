function xpol(a_,r_,t_,f1_,f2_) {
	let x;
	x = ((r_) * cos(a_+t_*f1_)) + ((r_*0.5) * sin(a_+t_*f2_));
	return x;
}

function ypol(a_,r_,t_,f1_,f2_) {
	let y;
	y = ((r_) * sin(a_+t_*f1_)) + ((r_*0.5) * cos(a_+t_*f2_));
	return y;
}

function sineLine(a_,r_,t_,f_) {
	let coord = {
		x1:xpol(a_,r_,t_,f_.f1,f_.f2),
		y1:ypol(a_,r_,t_,f_.f3,f_.f4),
		x2:xpol(a_,r_,t_,f_.f5,f_.f6),
		y2:ypol(a_,r_,t_,f_.f7,f_.f8)
	}
	return coord;
}

function sinePoint(a_,r_,t_,f_) {
	let coord = {
		x:xpol(a_,r_,t_,f_.f1,f_.f2),
		y:ypol(a_,r_,t_,f_.f3,f_.f4),
	}
	return coord;
}