class field {
    element;
    constructor(parent) {
        this.element = document.createElementNS('http://www.w3.org/2000/svg','svg');
        this.element.style.border = "1px solid black";
        this.element.style.borderRadius = "50%";
        this.element.setAttribute('width', '512');
        this.element.setAttribute('height', '512');
        parent.appendChild(this.element)
    }

    createCircle(x, y, r=64, color='#e6aae0') {
        this.circle = new circle(x, y, r, this.element, color);
    }

    createRect(x, y, w, h, color='#e6aae0') {
        this.rect = new rect(x, y, w, h, this.element, color);
    }

    createTraffic(x, y, tether='') {
        this.traffic = new traffic(x, y, this.element);
        if (tether) {
            this.traffic.setTether(tether)
        }
    }
}

class ultimate_relativity {
    constructor(parent, debuffParent) {
        this.field = new field(parent)
        this.coords = shiftArray([
            [256, 128],
            [344, 168],
            [384, 256],
            [344, 344],
            [256, 384],
            [168, 344],
            [128, 256],
            [168, 168]
        ],Math.floor(Math.random()*8))
        this.traffics = [
            this.field.createTraffic(this.coords[0][0],this.coords[0][1], 'gold'),
            this.field.createTraffic(this.coords[1][0],this.coords[1][1]),
            this.field.createTraffic(this.coords[2][0],this.coords[2][1], 'purple'),
            this.field.createTraffic(this.coords[3][0],this.coords[3][1], 'gold'),
            this.field.createTraffic(this.coords[4][0],this.coords[4][1]),
            this.field.createTraffic(this.coords[5][0],this.coords[5][1], 'gold'),
            this.field.createTraffic(this.coords[6][0],this.coords[6][1], 'purple'),
            this.field.createTraffic(this.coords[7][0],this.coords[7][1]),
        ]
        let rand = Math.floor(Math.random() * 10)
        let time = "";
        if (rand < 1) {
            this.fire = new debuff("ice", "21s", debuffParent)
        } else {
            if (rand < 4) {
                time = "11s";
            } else if (rand < 7) {
                time = "21s";
            } else {
                time = "31s";
            }
            this.fire = new debuff("fire", time, debuffParent)
        }
        if (rand < 7) {
            this.return = new debuff("return", "16s", debuffParent)
        } else {
            this.return = new debuff("return", "26s", debuffParent)
        }
        let stackRand = Math.floor(Math.random() * 9)
        if (0 < stackRand && stackRand < 4) {
            let time2 = stackRand + "1s";
            if (time != time2) {
                this.stack = new debuff("stack", time2, debuffParent)
            }
        } 
        let returnRand = Math.floor(Math.random() * 5)
        if (rand < 7) {
            if (returnRand < 1) {
                returnRand = "water"
            } else {
                returnRand = "eruption"
            }
        } else {
            returnRand = "eye"
        }
        this.end = new debuff(returnRand, "43s", debuffParent)
    }
}

class circle {
    c;
    constructor(x, y, r, parent, color) {
        this.c = document.createElementNS('http://www.w3.org/2000/svg','circle');
        this.c.setAttribute('r', r.toString())
        this.c.setAttribute('cx', x.toString())
        this.c.setAttribute('cy', y.toString())
        this.c.setAttribute('fill', color)
        this.c.setAttribute('stroke', 'black')
        parent.append(this.c)
    }

    set_center(x, y) {
        x -= 34
        y -= 34
        this.c.setAttribute('cx', x.toString())
        this.c.setAttribute('cy', y.toString())
    }

    set_visibility(boo) {
        if (boo) {
            this.c.setAttribute('visibility', 'visible');
        } else {
            this.c.setAttribute('visibility', 'hidden');
        }
    }
}

class rect {
    constructor(x, y, width, height, parent, color, rx=0, ry=0) {
        this.r = document.createElementNS('http://www.w3.org/2000/svg','rect');
        this.r.setAttribute('width', width.toString());
        this.r.setAttribute('height', height.toString());
        this.r.setAttribute('x', x.toString());
        this.r.setAttribute('y', y.toString());
        this.r.setAttribute('fill', color)
        this.r.setAttribute('stroke', 'black')
        this.r.setAttribute('rx', rx.toString());
        this.r.setAttribute('ry', rx.toString());
        parent.append(this.r);
    }
}

class traffic {
    x; y; rect; red; yellow; green; parent;
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.rect = new rect(x-12, y-24, 24, 48, parent, 'black', 4, 4);
        this.red = new circle(x, y-14, 7, parent, 'red')
        this.yellow = new circle(x, y, 7, parent, 'yellow')
        this.green = new circle(x, y+14, 7, parent, 'green')
    }

    setTether(color='gold') {
        this.tether = new tether(this.x, this.y, 256, 256, this.parent, color);
    }
}

class tether {
    constructor(x1, y1, x2, y2, parent, color='gold') {
        this.line = document.createElementNS('http://www.w3.org/2000/svg','line');
        this.line.setAttribute('x1', x1.toString())
        this.line.setAttribute('y1', y1.toString())
        this.line.setAttribute('x2', x2.toString())
        this.line.setAttribute('y2', y2.toString())
        this.line.setAttribute('stroke', color)
        this.line.setAttribute('stroke-width', '4')
        parent.append(this.line)
    }

    set_tether(x1, y1, x2, y2) {
        this.line.setAttribute('x1', x1.toString())
        this.line.setAttribute('y1', y1.toString())
        this.line.setAttribute('x2', x2.toString())
        this.line.setAttribute('y2', y2.toString())
    }
}

class debuff {
    constructor(icon, time, parent) {
        this.div = document.createElement('div');
        this.icon = document.createElement('img');
        this.text = document.createElement('p');

        this.div.style.margin = "4px"
        this.icon.src = 'icons/' + icon + '.png';
        this.text.innerText = time;
        this.text.style.margin = "0";
        this.text.style.fontSize = "24px";
        this.text.style.textAlign = "center";
        this.text.style.fontFamily = "Arial, Helvetica, sans-serif";

        this.div.appendChild(this.icon);
        this.div.appendChild(this.text);

        parent.appendChild(this.div);
    }
}