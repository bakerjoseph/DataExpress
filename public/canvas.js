const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

canvas1.width = 800;
canvas1.height = 300;
canvas2.width = 800;
canvas2.height = 300;
canvas3.height = 225;
canvas3.width = 800;
let rowhieght = 30;

const createBar = (count, name, color, questionNum) => {
    columnwidth = (questionNum * 75) - 20;
    barhieght = rowhieght * count

    let bar = {
        x: 5,
        y: columnwidth,
        height: barhieght,
        width: 20,
        name: name,
        color: color
    }
    return bar;
}

const drawBackground = () => {
    ctx1.fillStyle = '#fff';
    ctx1.fillRect(0, 0, 5, 300);

    ctx1.fillStyle = '#fff';
    ctx1.fillRect(0, 300, 300, 5);

    ctx2.fillStyle = '#fff';
    ctx2.fillRect(0, 0, 5, 300);

    ctx2.fillStyle = '#fff';
    ctx2.fillRect(0, 300, 300, 5);

    ctx3.fillStyle = '#fff';
    ctx3.fillRect(0, 0, 5, 300);

    ctx3.fillStyle = '#fff';
    ctx3.fillRect(0, 300, 300, 5);
}

const drawForegroundG1 = (countR1, countR2, countR3, countR4) => {
    bar1 = createBar(countR1, "Dog", '#226', 1)
    ctx1.fillStyle = '#fff';
    ctx1.font = '20px Arial';
    ctx1.fillText(bar1.name + " - " + countR1, 10, bar1.y - 5);
    ctx1.fillStyle = bar1.color;
    ctx1.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "Cat", '#226', 2)
    ctx1.fillStyle = '#fff';
    ctx1.font = '20px Arial';
    ctx1.fillText(bar2.name + " - " + countR2, 10, bar2.y - 5);
    ctx1.fillStyle = bar2.color;
    ctx1.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "Goat", '#226', 3)
    ctx1.fillStyle = '#fff';
    ctx1.font = '20px Arial';
    ctx1.fillText(bar3.name + " - " + countR3, 10, bar3.y - 5);
    ctx1.fillStyle = bar3.color;
    ctx1.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)

    bar4 = createBar(countR4, "Goose", '#226', 4)
    ctx1.fillStyle = '#fff';
    ctx1.font = '20px Arial';
    ctx1.fillText(bar4.name + " - " + countR4, 10, bar4.y - 5);
    ctx1.fillStyle = bar4.color;
    ctx1.fillRect(bar4.x, bar4.y, bar4.height, bar4.width)
}

const drawForegroundG2 = (countR1, countR2, countR3, countR4) => {
    bar1 = createBar(countR1, "English", '#226', 1)
    ctx2.fillStyle = '#fff';
    ctx2.font = '20px Arial';
    ctx2.fillText(bar1.name + " - " + countR1, 10, bar1.y - 5);
    ctx2.fillStyle = bar1.color;
    ctx2.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "Korean", '#226', 2)
    ctx2.fillStyle = '#fff';
    ctx2.font = '20px Arial';
    ctx2.fillText(bar2.name + " - " + countR2, 10, bar2.y - 5);
    ctx2.fillStyle = bar2.color;
    ctx2.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "Chinese", '#226', 3)
    ctx2.fillStyle = '#fff';
    ctx2.font = '20px Arial';
    ctx2.fillText(bar3.name + " - " + countR3, 10, bar3.y - 5);
    ctx2.fillStyle = bar3.color;
    ctx2.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)

    bar4 = createBar(countR4, "French", '#226', 4)
    ctx2.fillStyle = '#fff';
    ctx2.font = '20px Arial';
    ctx2.fillText(bar4.name + " - " + countR4, 10, bar4.y - 5);
    ctx2.fillStyle = bar4.color;
    ctx2.fillRect(bar4.x, bar4.y, bar4.height, bar4.width)
}

const drawForegroundG3 = (countR1, countR2, countR3) => {
    bar1 = createBar(countR1, "Yes", '#226', 1)
    ctx3.fillStyle = '#fff';
    ctx3.font = '20px Arial';
    ctx3.fillText(bar1.name + " - " + countR1, 10, bar1.y - 5);
    ctx3.fillStyle = bar1.color;
    ctx3.fillRect(bar1.x, bar1.y, bar1.height, bar1.width)

    bar2 = createBar(countR2, "No", '#226', 2)
    ctx3.fillStyle = '#fff';
    ctx3.font = '20px Arial';
    ctx3.fillText(bar2.name + " - " + countR2, 10, bar2.y - 5);
    ctx3.fillStyle = bar2.color;
    ctx3.fillRect(bar2.x, bar2.y, bar2.height, bar2.width)

    bar3 = createBar(countR3, "Maybe", '#226', 3)
    ctx3.fillStyle = '#fff';
    ctx3.font = '20px Arial';
    ctx3.fillText(bar3.name + " - " + countR3, 10, bar3.y - 5);
    ctx3.fillStyle = bar3.color;
    ctx3.fillRect(bar3.x, bar3.y, bar3.height, bar3.width)
}

const getData = async () => {
    let url = `http://localhost:3000/api`;
    const response = await fetch(url);
    const data = await response.json();

    drawBackground()
    drawForegroundG1(data.dog1, data.cat1, data.goat1, data.goose1);
    drawForegroundG2(data.english2, data.korean2, data.chinese2, data.french2);
    drawForegroundG3(data.yes3, data.no3, data.mayb3);
}

getData();
