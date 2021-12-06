const canvas1 = document.getElementById('index');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('index');
const ctx2 = canvas1.getContext('2d');
const canvas3 = document.getElementById('index');
const ctx3 = canvas1.getContext('2d');

canvas1.width = 300;
canvas1.height = 300;
let rowhieght = 30;

const createBar = (count, name, color, questionNum) => {
    columnwidth = (questionNum * 75) - 10;
    if (count >= 10) {
        //row hieght interval
        rowhieght = 300 / (count + 1);
    }
    barhieght = rowhieght * count

    let bar = {
        x: columnwidth,
        y: barhieght,
        height: barhieght,
        width: 10,
        name: name,
        color: color
    }
    return bar;
}

const drawBackground = () => {
    ctx1.fillStyle = '';
    ctx1.fillRect(0, 300, 5, 300);

    ctx1.fillStyle = '';
    ctx1.fillRect(0, 300, 300, 5);
}

const drawForegroundG1 = (countR1, countR2, countR3, countR4) => {
    bar1 = createBar(countR1, "choice 1", '#226', 1)
    ctx1.fillStyle = bar1.color;
    ctx1.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "choice 2", '#226', 2)
    ctx1.fillStyle = bar2.color;
    ctx1.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "choice 3", '#226', 3)
    ctx1.fillStyle = bar3.color;
    ctx1.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)

    bar4 = createBar(countR4, "choice 4", '#226', 4)
    ctx1.fillStyle = bar4.color;
    ctx1.fillRect(bar4.x, bar4.y, bar4.height, bar4.width)
}

const drawForegroundG2 = (countR1, countR2, countR3, countR4) => {
    bar1 = createBar(countR1, "choice 1", '#226', 1)
    ctx2.fillStyle = bar1.color;
    ctx2.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "choice 2", '#226', 2)
    ctx2.fillStyle = bar2.color;
    ctx2.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "choice 3", '#226', 3)
    ctx2.fillStyle = bar3.color;
    ctx2.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)

    bar4 = createBar(countR4, "choice 4", '#226', 4)
    ctx2.fillStyle = bar4.color;
    ctx2.fillRect(bar4.x, bar4.y, bar4.height, bar4.width)
}

const drawForegroundG3 = (countR1, countR2, countR3, countR4) => {
    bar1 = createBar(countR1, "choice 1", '#226', 1)
    ctx3.fillStyle = bar1.color;
    ctx3.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "choice 2", '#226', 2)
    ctx3.fillStyle = bar2.color;
    ctx3.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "choice 3", '#226', 3)
    ctx3.fillStyle = bar3.color;
    ctx3.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)
}
