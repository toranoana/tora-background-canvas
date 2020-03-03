<template>
  <div class="canvas-background">
    <div id="canvas-target"></div>
  </div>
</template>

<script>
import * as p5 from "p5";

let intervalobj = null;

export default {
  name: "canvas-background",
  mounted() {
    //p5sketchを基に実体化
    new p5(sketch);
  },
  beforeDestroy() {
    clearInterval(intervalobj);
  }
};

class Hato {
  constructor(p, x, y, images, dir = 0) {
    this.p = p;
    this.pos = p.createVector(x, y);
    if (dir === 0) {
      this.dir = Math.random() > 0.5 ? 1 : -1;
    } else {
      this.dir = dir;
    }
    this.count = 0;
    this.images = images;
    this.anim = 1;
  }
  update() {
    this.count++;
    this.pos.x += -0.7 * this.dir;
    this.pos.y += -0.7;

    if (this.count % 10 === 0) {
      this.anim += 1;
      if (this.anim === 5) {
        this.anim = 0;
      }
    }
  }
  display() {
    this.p.push();
    this.p.scale(this.dir, 1);
    this.p.image(
      this.images[this.anim],
      this.dir * this.pos.x,
      this.pos.y,
      80,
      50
    );
    this.p.image(this.images[0], this.dir * this.pos.x, this.pos.y, 80, 50);
    this.p.scale(this.dir, 1);
    this.p.pop();
  }

  //自座標が画面外であるかを返す
  windowout(width, height) {
    if (this.pos.x < -100 || width < this.pos.x + 100) {
      return true;
    } else if (this.pos.y < -100 || height < this.pos.y + 100) {
      return true;
    } else {
      return false;
    }
  }
}

const sketch = p => {
  let images = [];
  let hatos = [];
  let posbuf = { x: 0, y: 0 };
  let flag = true;

  p.setup = async () => {
    //はと画像読み込み
    images.push(await p.loadImage("/hato-body.png"));
    images.push(await p.loadImage("/hato-wing1.png"));
    images.push(await p.loadImage("/hato-wing2.png"));
    images.push(await p.loadImage("/hato-wing3.png"));
    images.push(await p.loadImage("/hato-wing4.png"));

    p.createCanvas(window.innerWidth, window.innerHeight).parent(
      "canvas-target"
    );
    p.background("rgba(84,195,241, 1.0)");

    posbuf.x = p.mouseX;
    posbuf.y = p.mouseY;

    intervalobj = setInterval(() => {
      p.createFromTimer(p);
    }, 5000);
  };

  p.draw = () => {
    p.background("rgba(84,195,241, 0.4)");
    //p.fill("#222");

    hatos.forEach((hato, index) => {
      if (hato.windowout()) {
        hatos.splice(index, 1);
      }
    });

    hatos.forEach(hato => hato.update());
    hatos.forEach(hato => hato.display());
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
  p.mouseClicked = () => {
    hatos.push(new Hato(p, p.mouseX, p.mouseY, images));
  };
  p.mouseMoved = () => {
    if (flag) {
      if ((posbuf.x - p.mouseX) ** 2 + (posbuf.y - p.mouseY) ** 2 > 100) {
        hatos.push(new Hato(p, p.mouseX, p.mouseY, images));
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 500);
      }
    }
    posbuf.x = p.mouseX;
    posbuf.y = p.mouseY;
  };
  p.createFromTimer = p => {
    const x = Math.random() > 0.5 ? -10 : window.innerWidth + 10;
    const y = Math.random() * window.innerHeight;
    hatos.push(new Hato(p, x, y, images, x > 0 ? 1 : -1));
  };
};
</script>

<style>
.canvas-background {
  background: #eef;
  margin: 0;
  position: fixed;
  z-index: -10;
}
</style>
