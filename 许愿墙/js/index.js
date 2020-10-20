var container = document.getElementById('container')
var textInput = document.getElementById('textInput') //获取文本框
var cardWidth = 150,
    cardHeight = 150;
var i = 0 //记录z-index的值
var cardInfo = ["只要有我在，你就不要长大", "创智牛逼", "祝你可爱，祝你漂亮，祝你一生被爱"]
for (var j = 0; j < cardInfo.length; j++) {
    creatElement(cardInfo[j])
}
//监听textInput
textInput.onkeydown = function(e) {
    if (textInput.value !== "") {
        //1.输入文本，要按回车===>键盘事件 KeyboardEvent()
        e.key
        if (e.key === "Enter") {
            creatElement(textInput.value)
            textInput.value = "" //清除文本框的内容
        }
    }
}

/**
 * 创建一个愿望
 */

function creatElement(content) {
    var card = document.createElement('div')
    card.classList.add('card')
    var info = document.createElement('div')
    info.classList.add('info')
    info.innerText = content;
    var deleteDiv = document.createElement('span')
    deleteDiv.innerText = "X"
    deleteDiv.classList.add('deleteDiv')
    card.append(info, deleteDiv)
    container.append(card)
    setItemStyle(card)
    deleteElement(card, deleteDiv)
}

/**
 * 删除card
 * @param {*} card 
 * @param {*} deleteDiv 删除
 */
function deleteElement(card, deleteDiv) {
    deleteDiv.onclick = function(e) {
        if (e.button !== 0) {
            return
        }
        card.remove()
    }
}
//点击哪个卡片z-index 增加1
container.onclick = function(e) {
    if (e.target.tagName === "DIV") {
        //2.z-Index
        e.target.style.zIndex = i
    }
    i++;
}

/**
 * 判断元素是否有className为card的属性
 * @param {*} card 
 */

function getcardMove(card) {
    if (card.className === "card") {
        return card
    }
    return
}
//拖拽效果⭐⭐⭐⭐⭐⭐⭐⭐
window.onmousedown = function(e) {
    if (e.button !== 0) {
        return
    }
    var cardMove = getcardMove(e.target)
    if (!cardMove) {
        return
    }

    //鼠标移动
    var x = e.pageX,
        y = e.pageY
    var style = getComputedStyle(cardMove)
    var cardLeft = parseFloat(style.left)
    var cardTop = parseFloat(style.top)
    window.onmousemove = function(e) {
            var tx = e.pageX - x
            var ty = e.pageY - y
                //重新获取
            var disX = cardLeft + tx
            var disY = cardTop + ty
                // if (cardLeft + tx < 0) {
                //     cardLeft = 0
                // }
                // if (cardTop + ty < 0) {
                //     cardTop = 0
                // }
            if (disX < 0) {
                disX = 0;
            }
            // ty + cardTop = 0 //报错

            //移动的边界
            if (disX > document.documentElement.clientWidth - cardWidth) {
                disX = document.documentElement.clientWidth - cardWidth;
            }
            if (disY < 0) {
                disY = 0;
            }
            if (disY > document.documentElement.clientHeight - cardHeight - 80) {
                disY = document.documentElement.clientHeight - cardHeight - 80;
            }
            cardMove.style.left = tx + cardLeft + 'px'
            cardMove.style.top = ty + cardTop + 'px'
            cardMove.style.left = disX + 'px'
            cardMove.style.top = disY + 'px'
            console.log("移动")
        }
        //
    window.onmouseup = function() {
        //1111.没有移出掉，所以需要移除掉元素跟随鼠标移动
        window.onmousemove = null
        console.log("消失")
    }

}

/**
 * 获取随机的整数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


/**
 * 设置卡片的样式
 * @param {*} card 当前创建的item
 */

function setItemStyle(card) {

    var style = getComputedStyle(card)
    card.style.width = style.width
    card.style.height = style.height
    var cardWidth = parseFloat(card.style.width);
    var cardHeight = parseFloat(card.style.height)
        // console.log(cardWidth, cardHeight)
        // console.log(cardWidth, cardHeight)
        //卡片的边界⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐====>没有初始化页面
    var cardMaxLeft = document.documentElement.clientWidth - cardWidth
    var cardMaxTop = document.documentElement.clientHeight - cardHeight * 2
        //console.log(cardMaxTop) //544
    var cardLeft = getRandom(0, cardMaxLeft)
    var cardTop = getRandom(0, cardMaxTop)
        //console.log("宽", cardMaxLeft, "左", cardLeft)
        // console.log(cardMaxLeft, cardMaxTop)
        // console.log(cardLeft, cardTop)
    var r = getRandom(100, 200)
    var g = getRandom(100, 200)
    var b = getRandom(100, 200)
        //console.log(card.style)
        //数值一直覆盖在第一个元素上
    card.style.left = cardLeft + 'px'
    card.style.top = cardTop + 'px'
    card.style.backgroundColor = `rgb(${r},${g},${b})`
}