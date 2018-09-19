window.onload = function() {
    waterfall();

    window.onscroll = function() {
        if(checkscrollside()) {
            createBox(21, 98);
            waterfall();
        }
    }
}
function waterfall() {
    let main = document.getElementById("main");
    let boxs = document.querySelectorAll(".box");
    let boxW = boxs[0].offsetWidth;
    let num = Math.floor(document.documentElement.clientWidth / boxW);
    main.style.width = num*boxW + "px";

    let boxHArr = [];
    for(let i=0; i<boxs.length; i++) {
        let boxH = boxs[i].offsetHeight;
        if(i<num) {
            boxHArr[i] = boxH; 
        }
        else {
            let minH = Math.min.apply(null, boxHArr);
            let minHIndex = getminHIndex(boxHArr, minH);
            boxs[i].style.position = "absolute";
            boxs[i].style.top = minH + "px";
            boxs[i].style.left = boxs[minHIndex].offsetLeft + "px";
            boxHArr[minHIndex] += boxH;
        }
    }
}

function createBox(m, n) {
    let main = document.getElementById("main");
    for(let i=m; i<n; i++) {
        let box = document.createElement("div");
        let pic = document.createElement("div");
        let img = document.createElement("img");
        box.className = "box";
        pic.className = "pic";
        img.src = "images/" + i + ".jpg";
        main.appendChild(box);
        box.appendChild(pic);
        pic.appendChild(img);
    }
}

function getminHIndex(arr, minH) {
    for(let i in arr) {
        if(arr[i] === minH) {
            return i;
        }
    }
}

function checkscrollside() {
    let boxs = document.querySelectorAll(".box");
    let lastBoxH = boxs[boxs.length-1].offsetTop + Math.floor(boxs[boxs.length-1].offsetHeight/2);
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let documentH = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastBoxH < scrollTop+documentH) ? true : false;
}