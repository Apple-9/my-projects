//绑定整个window，因为鼠标在真个window上移动
window.onmousemove = function(e) {
        //每移动一次创建一个圈圈(div)
        var div = document.createElement('div')
        document.body.append(div) //把创建的div加到body中
        console.log(div)
        var style = getComputedStyle(div)
            //得到真正计算后的宽高，但是宽高有带单位，所以使用parseFloat()精准取出宽高的数值
        var width = parseFloat(style.width)
        var height = parseFloat(style.height)

        //我想要得到随机的背景色，但为了一定的美观性，不取太暗的颜色，所以取值为100~255
        div.style.background = `rgb(${getRandom(100,255)},${getRandom(100,255)},${getRandom(100,255)}`
            //我想要得到鼠标的在浏览器中的坐标===>e.page
        var x = e.pageX;
        var y = e.pageY

        //我想让点击的时候圈圈是在鼠标的正中心出现的===>
        // div.style.left = x + 'px'
        // div.style.top = y + 'px'
        //经过修改
        div.style.left = x - (width / 2) + 'px'
        div.style.top = y - (height / 2) + 'px'
        console.log("定位", div.style.left, div.style.top)

        //调用移动函数
        move(div, {
            opacity: [1, 0], //我想要背景图到达渐变的效果，用css属性opacity

            //圈圈一直是朝向鼠标右侧随机定位
            // top: [y - (height / 2), getRandom((y - (height / 2)) , (y - (height / 2)) * 4)],
            // left: [x - (width / 2), getRandom((x - (width / 2)), (x - (width / 2)) * 4)],

            //经处理，想要向四方移动的话，要取正负，而不是在在起源点随机定位
            top: [y - (height / 2), getRandom(-(y - (height / 2)) * 4, (y - (height / 2)) * 4)],
            left: [x - (width / 2), getRandom(-(x - (width / 2)) * 4, (x - (width / 2)) * 4)],
        }, 1000, () => {
            //浏览器卡顿了，因为页面元素太多了，所以圈圈一旦消失了，就从页面中清除掉
            div.remove(); //清除元素
            console.log("运动结束了")
        })
    }
    /**
     * 得到随机整数
     * @param {*} min 最小值
     * @param {*} max 最大值
     */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
/**
 * 移动函数
 * @param {*} dom 需要移动的元素
 * @param {*} obj 变化对象
 * @param {*} duration 定时器
 * @param {*} endcallback 回调函数
 */
function move(dom, obj, duration, endcallback) {
    //规定时间内移动的次数，因为浏览器每16ms刷新一次，
    var timeSum = Math.ceil(duration / 16) //次数只能取整数

    var curSum = 0 //记录当前的次数


    var changeObj = {} //得到changeObj = {left:50/timSum,width:90/timeSum}
    for (var prop in obj) {
        var totalDistance = obj[prop][1] - obj[prop][0] //总距离
        changeObj[prop] = totalDistance / timeSum //每次移动的距离
        console.log(changeObj)
    }
    //设置定时器，让圈圈可以随机移动一定的距离
    var timer = setInterval(function() {
        //判断是否达到次数了
        if (curSum >= timeSum) {
            //清除计时器
            clearInterval(timer)
            timer = null
                //遍历对象
            for (var prop in obj) {
                var newValue = obj[prop][1]
                dom.style[prop] = prop === "opacity" ? newValue : newValue + "px"
            }
            endcallback()
        } else {
            for (var prop in changeObj) {
                var newValue = obj[prop][0] + changeObj[prop] * curSum;
                dom.style[prop] = prop === "opacity" ? newValue : newValue + "px"

            }
        }
        curSum++;
    }, 16)
}