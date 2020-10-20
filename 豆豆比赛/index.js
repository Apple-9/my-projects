var beginBtn = document.querySelector('.beginGame .beginBtn'); //开始比赛按钮
var addPlay = document.querySelector('.addPlay .addPlayerBtn'); //添加选手按钮
var container = document.getElementById('container');
var plays = document.getElementsByClassName('play'); //所有的选手的信息
var showAreas = document.getElementsByClassName('showLeft'); //显示区域
var players = document.getElementsByTagName('img'); // 选手对应的图片汇总
var sel_speed = document.getElementsByClassName('sel-speed'); // 选手对应的速度汇总
var switchBtn = document.querySelector('.play .selArea button'); //更换角色按钮
var playER = document.querySelector(".player"); //选手
var tip = document.getElementsByClassName('tip'); //提示词
var num = 1; //记录选手
var imgSwitch = 1; //当前的图片
var imgArr = [
    'imgs/1.png',
    'imgs/2.png',
    'imgs/3.png',
    'imgs/4.png',
    'imgs/5.png',
    'imgs/6.png',
    'imgs/7.png',
    'imgs/8.png',
];
//1.⭐视口一变化，选手超出赛道一些，所以一开始就获取视口的大小
document.body.style.width = window.innerWidth + "px"; //防止滚动条
container.style.width = window.innerWidth + "px"; //防止滚动条
var runLength = playER.offsetWidth - players[0].offsetWidth; //赛道的长度

start();

/**
 * 事件监听入口
 */
function start() {
    addPlay.addEventListener('click', addPlayer)
    switchBtn.addEventListener('click', switchPlayer)
    beginBtn.addEventListener('click', beginGame)
}

/**;
/**
 * 添加选手
 */

function addPlayer() {
    num++;
    console.dir(plays[0]);
    //⭐.克隆节点
    var item = plays[0].cloneNode(true); //深度克隆元素
    item.setAttribute('my-name', num); //给item附加my-name属性===》属性名不可以为大小驼峰命名法
    console.log(item.getAttribute("my-name"));
    item.children[2].children[0].innerHTML = `${num}号`;
    container.append(item);
    console.dir(item);
    console.log(switchBtn);
    var switchBtns = document.querySelectorAll('.play .selArea button');
    for (var i = 0; i < switchBtns.length; i++) {
        switchBtns[i].addEventListener('click', switchPlayer);
    };
}

/**
 * 开始游戏
 */
//⭐⭐⭐⭐⭐
function beginGame() {
    //判断参赛选手是否至少有两位
    if (players.length === 1) {
        createTip({ type: "error", text: "至少要有两位选手才能进行比赛" }, 3000);
        return;
    }
    var speedArr = [];
    for (let i = 0; i < sel_speed.length; i++) {
        console.log(Number(sel_speed[i].value));
        console.log(sel_speed[i].value);
        if (!sel_speed[i].value) {
            createTip({ type: "error", text: "您有选手未输入速度" }, 3000);
            return;
        } else if (Number(sel_speed[i].value) < 1 || Number(sel_speed[i].value) > 10) {
            createTip({ type: "error", text: `${i+1}号选手速度未在规定范围内` }, 3000);
            return; //所有不能运动
        }
        speedArr.push(Number(sel_speed[i].value));
    }
    moveAllPlayers(speedArr);
}
/**
 * 切换选手
 */

function switchPlayer() {
    imgSwitch++;
    if (imgSwitch > imgArr.length) {
        imgSwitch = 1;
    };

    var img = this.parentElement.parentElement.children[2].children[1];
    img.src = imgArr[imgSwitch - 1];
    console.log(imgSwitch);
}

/**
 * 根据传的速度数组进行运动
 * @param {*} speedArr 速度数组
 */
function moveAllPlayers(speedArr) {
    for (let i = 0; i < players.length; i++) {
        moveDom(players[i], {
            left: [0, runLength],
        }, runLength / (Number(sel_speed[i].value)), () => {
            createTip({ type: "gameBegin", text: "游戏开始" }, 1000);
        }, () => {
            console.log(length / (Number(sel_speed[i].value)));
            // apply和call都是函数身上特有的
            if (Math.max.apply(null, speedArr) === Number(sel_speed[i].value)) {
                createTip({ type: "gameOver", text: `游戏结束,${getMaxPlayer()}` }, 3000);
            }
            return;
        }, (newValue) => {
            // console.log(showAreas[i])
            showAreas[i].innerText = newValue + '米';
        }); //⭐⭐遍历注册事件的时候，所有i为同个值===>用let 声明i 就形成了块级作用域了，遍历的每个i都有自己的作用域
    };
}

/**
 * 运动函数 ⭐⭐⭐⭐⭐
 * @param {*} dom 元素
 * @param {*} obj 需要改变css的属性区间对象
 * @param {*} duration 运动完成所需要的时间
 * @param {*} startCallback 开始回调函数
 * @param {*} endCallback 结束回调函数
 * @param {*} movingcallback 移动回调函数
 */
function moveDom(dom, obj, duration, startcallback, endcallback, movingcallback) {
    var inter = 16;
    var moveNum = Math.ceil(duration / inter);
    var changeObj = {};
    for (var prop in obj) {
        var distanceSum = obj[prop][1] - obj[prop][0];
        changeObj[prop] = distanceSum / moveNum;
    }
    // console.log(changeObj);
    var curTime = 0;
    startcallback();
    var timer = setInterval(function() {
        if (curTime >= moveNum) {
            for (var prop in obj) {
                var newValue = obj[prop][1];
                movingcallback && movingcallback(newValue);
                dom.style[prop] = prop === "opacity" ? newValue : newValue + 'px';
            };
            clearInterval(timer);
            endcallback && endcallback();
        } else {
            for (var prop in changeObj) {
                var newValue = prop === "opacity" ? changeObj[prop] * curTime + obj[prop][0] : parseInt(changeObj[prop] * curTime + obj[prop][0]);
                movingcallback && movingcallback(newValue);
                dom.style[prop] = prop === "opacity" ? newValue : newValue + 'px';
            };
        }
        curTime++;
    }, inter);
}

/**
 * 得到选手获胜
 */
function getMaxPlayer() {
    var speedArr = Array.from(sel_speed); //得到了新数组
    var max = Number(speedArr[0].value);
    console.log(max, "选手")
    var maxElement = "";

    //第一种情况，都不一样，大的获胜
    //第二种情况，全都一样，平手
    //第三种情况，有2到n位选手速度一样，而且都是最大的，2，3，4号选手获胜
    // [1, 2, 3, 4] === [3] //1
    // [2, 2, 2] === [0, 1, 2] //2
    // [1, 2, 5, 5, 3, 2] === [2, 3] //3

    var sppedNumArr = speedArr.map(el => +el.value);
    var winIndexs = getMaxIndexs(sppedNumArr);
    for (var i = 0; i < winIndexs.length; i++) {
        if (i === winIndexs.length - 1) {
            maxElement += winIndexs[i] + 1 + "号"
        } else {
            maxElement += winIndexs[i] + 1 + "号,"
        }
    }
    maxElement += "选手获胜"
    return maxElement;
}


function getMaxIndexs(arr) {
    // [1, 2, 33, 22, 33, 6] === [2, 5];
    var max = arr[0];
    // 第一步， 获取数组里的最大值
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    // 第二步， 判断数组里有没有和最大值一样的， 有的话这个值的索引加入到数组里
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === max) {
            newArr.push(i);
        }
    }
    return newArr;
}


/**
 * 创建一个弹出框
 * @param {*} obj 弹出框的类型以及文本的内容的对象
 * @param {*} time 弹出框停留的时间
 */
function createTip(obj, time) {
    var div = document.createElement('div');

    //设置css属性
    div.style.cssText = `
        width: 250px;
        height: 45px;
        background: #008c8c;
        position: fixed;
        top: -40px;
        left: 0;
        right: 0;
        opacity: 0;
        text-align: center;
        line-height: 45px;
        margin: auto;
        border-radius:5px;
        font-weight:700;
        z-index: 100;
    `;
    if (obj.type === "gameBegin") {
        div.style.backgroundColor = "#008c8c";
        div.style.color = "#fff";
    } else if (obj.type === "gameOver") {
        // div.style.backgroundColor = "#f56c6c";
        div.style.backgroundColor = "#52c41a";
        div.style.color = "#fff";
    } else if (obj.type === "error") {
        div.style.backgroundColor = "#e6a23c";
        div.style.color = "#fff";
    }
    div.innerHTML = obj.text;
    document.body.insertBefore(div, document.querySelector('.beginGame'));

    moveDom(div, {
        top: [-40, 50],
        opacity: [0, 1]
    }, 200, function() {
        console.log("a");
        var clockTimer = setTimeout(function() { //只运行一次
            moveDom(div, {
                top: [50, -45],
                opacity: [1, 0]
            }, 200, () => {
                console.log("消失");
            });
        }, time);
    });
}