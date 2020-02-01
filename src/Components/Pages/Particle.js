import React from "react";

class Particle extends React.Component {
  render() {
    return <canvas />;
  }
  componentDidMount() {
    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext("2d");
    const screenSefat = window.innerWidth;
    const screenRzmet = window.innerHeight;
    window.addEventListener("resize", function() {
      canvas.width = window.innerWidth + 100;
      canvas.height = window.innerHeight + 100;
    });
    class Circle {
      constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.minRadius = radius;
        this.draw = function () {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();
        };
      };
        update () {
          if (this.x + this.radius > screenSefat + 100 ||
            this.x - radius < -100) {
            this.dx = -this.dx;
          }
          if (this.y + this.radius > screenSefat + 100 ||
            this.y - radius < -100) {
            this.dy = -this.dy;
          }
          this.x += this.dx;
          this.y += this.dy;
          this.draw();
        }
    }
    class Star {
      constructor(x, y, radius, blink) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.minRadius = radius;
        this.blink = blink;
        this.light = Math.random();
        this.dir = 0.001;
      }
      draw () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "rgba(255,255,255," + this.light + ")";
        c.fill();
      };
      update () {
        if (this.blink) {
            this.light += this.dir;
            if (this.light >= 1) {
              this.light = -this.dir;
            }
            else if (this.light <= 0) {
              this.light = this.dir;
            }
          }
          this.draw();
        };
    }

    var circleArray = [];
    var starArray = [];

    for (var i = 0; i <20; i++) {
      var radius = (Math.random() + 0.2) * 1.5;
      var x = Math.random() * (screenSefat - radius * 2) + radius;
      var y = Math.random() * (screenRzmet - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 8;
      var dy = (Math.random() - 0.5) * 8;
      var color = [
        "rgba(255,255,255,1)",
        "rgba(255,255,255,0.5)",
        "rgba(255,255,255,0.3)"
      ];

      circleArray.push(
        new Circle(
          x,
          y,
          dx,
          dy,
          radius,
          color[Math.floor(Math.random() * color.length)]
        )
      );
    }

    for (var j = 0; j < screenSefat*0.25; j++) {
      var r = Math.random() + 0.0001;
      var hor = Math.random() * (screenSefat - r * 2) + r;
      var ver = Math.random() * (screenRzmet - r * 2) + r;
      var blink;
      if (Math.random() > 0.2) {
        blink = true;
      } else {
        blink = false;
      }
      starArray.push(new Star(hor, ver, r, blink));
    }
    function animate() {
      requestAnimationFrame(animate);
      c.fillStyle = "rgba(0, 0, 40,0.25)";
      c.fillRect(0, 0, screenSefat, screenRzmet);
      for (var k = 0; k < circleArray.length; k++) {
        circleArray[k].update();
      }
      for (var a = 0; a < starArray.length; a++) {
        starArray[a].update();
      }
    }
    animate();
  }
}

export default Particle;
