function createFluid(fluid_,s_,x_,y_,color_) {
  if (fluid_ == "None") {return}
	let f;
	if (fluid_ == "Drip") {
		f = new Drip(s_,x_,y_);
	} else if (fluid_=="Splat") {
		f = new Splat(s_,x_,y_);
	} else if (fluid_=="Smudge") {
		f = new Smudge(s_,x_,y_);
	} else if (fluid_=="Blobby") {
		f = new Blobby(s_,x_,y_);
	} else if (fluid_=="Doodle") {
		f = new Doodle(s_,x_,y_);
  }
  f.color(color_);
	fluids.push(f);
}

function displayFluid(fluid_,t_) {
	if (fluid_ instanceof Blobby) {
		fluid_.define(1,0,2);
	} else if (fluid_ instanceof Drip) {
		fluid_.define();
	} else {
		fluid_.define(t_);
  }
	fluid_.show();
}

class Blobby {
	constructor(size_,x_,y_) {
		this.graphics = createGraphics(canvasW,canvasH);
		this.x = x_;
		this.y = y_;
		this.sizing = size_;
		this.xphase = 0;
		this.yphase = 0;
		this.positions = {
			x:[],
			y:[]
		};
		this.positionsl = {
			x:[],
			y:[]
		};
		this.seed = random(255);
	}

	define(xPhaseIncrement_,yPhaseIncrement_,noiseMax_) {
		this.positions.x = [];
		this.positions.y = [];
		this.positionsl.x = [];
		this.positionsl.y = [];

		for (let i=0;i<360+10;i+=1) {
			let xoff = map(cos(i+this.xphase),-1,1,0,noiseMax_);
			let yoff = map(sin(i+this.yphase),-1,1,0,noiseMax_);
			let n = map(noise(xoff+this.seed,yoff+this.seed),0,1,this.sizing/4,this.sizing);
			let x = n*cos(i);
			let y = n*sin(i);
			let xl = n*cos(i+10);
			let yl = n*sin(i+10);

			this.positions.x.push(x);
			this.positions.y.push(y);
			this.positionsl.x.push(xl);
			this.positionsl.y.push(yl);

			this.xphase+=map(xPhaseIncrement_,0,1,0,0.001);
			this.yphase+=map(yPhaseIncrement_,0,1,0,0,0.001);
		}
	}

	color(a_,b_,c_) {
		this.graphics.colorMode(RGB);
		if (a_) {
			if (b_) {
				this.graphics.colorMode(HSB);
				this.graphics.fill(a_,b_,c_);
			} else {
				this.graphics.fill(a_);
			}
		} else {
			this.graphics.fill(0);
		}
	}

	showLine() {
		this.graphics.colorMode(HSB);
		this.graphics.noFill();
		this.graphics.stroke(20);
		this.graphics.strokeWeight(this.sizing/30);
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		this.graphics.beginShape();
		for (let i=0;i<this.positionsl.x.length;i++) {
			this.graphics.vertex(this.positionsl.x[i],this.positionsl.y[i]);
		}
		this.graphics.endShape();
		this.graphics.pop();
	}

	show() {
		this.graphics.clear();
		this.graphics.noStroke();
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		this.graphics.beginShape();
		for (let i=0;i<this.positions.x.length;i++) {
			this.graphics.vertex(this.positions.x[i],this.positions.y[i]);
		}
		this.graphics.endShape();
		this.graphics.pop();
		image(this.graphics,0,0);
	}

	change(size_,x_,y_) {
		this.sizing = size_;
		this.x = x_;
		this.y = y_;
	}
}

class Smudge {
	constructor(r_,x_,y_) {
		this.graphics = createGraphics(canvasW,canvasH);
		this.r = r_;
		this.x = x_;
		this.y = y_;
		this.group = [];
		this.iterations = 10;
		this.resolution = 1;
		this.beginning = random(360);

		this.frecuencies = {
			f1:random(),
			f2:random(5)+5,
			f3:random(),
			f4:random(5)+5,
			f5:random(),
			f6:random(5)+5,
			f7:random(),
			f8:random(5)+5
		}
	}

	define(t_) {
		this.group = [];
		for (let i=0;i<this.iterations;i+=this.resolution) {
			this.group.push(sineLine(i-this.beginning,this.r,t_,this.frecuencies));
		}
	}

	color(a_,b_,c_) {
		this.graphics.colorMode(RGB);
		if (a_) {
			if (b_) {
				this.graphics.colorMode(HSB);
				this.graphics.stroke(a_,b_,c_);
			} else {
				this.graphics.stroke(a_);
			}
		} else {
			this.graphics.stroke(0);
		}
	}

	show() {
		this.graphics.strokeWeight(this.r/10);
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		for (let i=0;i<this.iterations;i+=this.resolution) {
			this.graphics.line(this.group[i].x1,
				 this.group[i].y1,
				 this.group[i].x2,
				 this.group[i].y2);
		}
		this.graphics.pop();
		image(this.graphics,0,0);
	}

	change(r_,x_,y_) {
		this.r = r_;
		this.x = x_;
		this.y = y_;
	}
}

class Doodle {
	constructor(r_,x_,y_) {
		this.graphics = createGraphics(canvasW,canvasH);
		this.r = r_;
		this.x = x_;
		this.y = y_;
		this.group = [];
		this.iterations = 3;
		this.resolution = 1;
		this.beginning = random(360);

		this.frecuencies = {
			f1:random(),
			f2:random(5)+5,
			f3:random(),
			f4:random(5)+5
		}
	}

	define(t_) {
		this.group = [];
		for (let i=0;i<this.iterations;i+=this.resolution) {
			this.group.push(sinePoint(i-this.beginning,this.r,t_+100,this.frecuencies));
		}
	}

	color(a_,b_,c_) {
		this.graphics.colorMode(RGB);
		if (a_) {
			if (b_) {
				this.graphics.colorMode(HSB);
				this.graphics.stroke(a_,b_,c_);
			} else {
				this.graphics.stroke(a_);
			}
		} else {
			this.graphics.stroke(0);
		}
	}

	show() {
		this.graphics.strokeWeight(this.r/20+random(this.r/15));
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		for (let i=0;i<this.iterations;i+=this.resolution) {
			this.graphics.point(this.group[i].x,this.group[i].y);
		}
		this.graphics.pop();
		image(this.graphics,0,0);
	}

	change(r_,x_,y_) {
		this.r = r_;
		this.x = x_;
		this.y = y_;
	}
}

class Splat {
	constructor(r_,x_,y_) {
		this.graphics = createGraphics(canvasW,canvasH);
		this.r = r_/2;
		this.x = x_;
		this.y = y_;
		this.group = [];
		this.iterations = 4;
		this.resolution = 1;
		this.beginning = random(360);

		this.frecuencies = {
			f1:random(),
			f2:random(10)+5,
			f3:random(),
			f4:random(10)+5
		}
	}

	define(t_) {
		this.group = [];
		for (let i=0;i<this.iterations;i+=this.resolution) {
			//this.group.push(sinePoint(i-this.beginning,random(this.r*3+this.r),t_+random(250),this.frecuencies));
			this.group.push(sinePoint(i-this.beginning,randomGaussian(0,this.r),t_+random(250),this.frecuencies));
		}
	}

	color(a_,b_,c_) {
		this.graphics.colorMode(RGB);
		if (a_) {
			if (b_) {
				this.graphics.colorMode(HSB);
				this.graphics.stroke(a_,b_,c_);
			} else {
				this.graphics.stroke(a_);
			}
		} else {
			this.graphics.stroke(0);
		}
	}

	show() {
		this.graphics.strokeWeight(this.r/20+random(this.r/10));
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		for (let i=0;i<this.iterations;i+=this.resolution) {
			this.graphics.point(this.group[i].x,this.group[i].y);
		}
		this.graphics.pop();
		image(this.graphics,0,0);
	}

	change(r_,x_,y_) {
		this.r = r_;
		this.x = x_;
		this.y = y_;
	}
}

class Drip {
	constructor(size_,x_,y_) {
		this.graphics = createGraphics(canvasW,canvasH);
		this.gap = 2;
		this.listSize = size_/this.gap;
		this.x = x_-(this.listSize);
		this.y = y_;
		this.thickness = 0.8;
		this.list = [];
		this.force = [];

		for (let i=0;i<this.listSize;i++) {
			this.list[i] = 1;
			this.force[i] = random(10);
			if (this.force[i]<map(this.thickness,0,1,8,9.9)) {
				this.force[i]=random(0.1);
			} 
		}
	}

	define() {
		for (let i=0;i<this.listSize;i++) {
			if (i==0) {
				this.force[i]=0;
				this.force[this.listSize]=0;
			}
			if (this.force[i-1] && this.force[i+1]) {
				this.force[i] = ((this.force[i+1]+this.force[i]+this.force[i-1])/3);
			}

			this.force[i]*=0.9995;
			this.list[i]+=this.force[i];
		}
	}

	color(a_,b_,c_) {
		this.graphics.colorMode(RGB);
		if (a_) {
			if (b_) {
				this.graphics.colorMode(HSB);
				this.graphics.fill(a_,b_,c_);
			} else {
				this.graphics.fill(a_);
			}
		} else {
			this.graphics.fill(0);
		}
	}

	show(h_,s_,b_) {		
		this.graphics.noStroke();
		this.graphics.push();
		this.graphics.translate(this.x,this.y);
		this.graphics.beginShape();
		for (let i=0;i<this.listSize;i++) {
			this.graphics.vertex((this.listSize-i)*this.gap,noise(i*0.01)*-40);
		}
		for (let i=0;i<this.listSize;i++) {
			this.graphics.vertex(i*this.gap+random(),this.list[i]);
		}
		this.graphics.endShape();
		this.graphics.pop();
		image(this.graphics,0,0);
	}

	change(r_,x_,y_) {
		this.r = r_;
		this.x = x_;
		this.y = y_;
	}
}