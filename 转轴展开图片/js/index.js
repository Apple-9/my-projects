const wrapper = document.querySelector('.wrapper');
const timer = setTimeout(function() {
    wrapper.classList.remove("init");
}, 100);
const items = document.querySelectorAll('.item');
const closes = document.querySelectorAll('.close');
console.log(items)
    // items.forEach(el => {
    //     el.onclick = function() {
    //         wrapper.classList.add('wrapper-active');
    //         el.style.classList.add("active")
    //     }
    // })
for (let i = 0; i < items.length; i++) {
    items[i].onclick = function() {
        console.log(111111)
        wrapper.classList.add('wrapper-active');
        items[i].classList.add("active")
    }
}
for (let i = 0; i < closes.length; i++) {
    closes[i].onclick = function(e) {
        e.stopPropagation()
        wrapper.classList.remove('wrapper-active');
        // 在闪，冒泡
        items[i].classList.remove('active');
    }

};



// item.onclick = function(e) {
//     // 不冒泡
//     wrapper.classList.add("wrapper-active");
//     this.classList.add('active')
//         // 点击的照片激活状态，增加类样式
//         // if (e.target.className = "item") {
//         //     e.stopPropagation()
//         //     e.target.classList.add("active");
//         // }
//         // if(e.target.children.className = "item"){

//     //     this.children[0].children.classList.add('active');
//     // }
// }
// 这代码提示也太慢了吧