window.onload = function() {
    createBox(0, 98);
}

function createBox(m, n) {
    let main = document.getElementById("main");
    let mainCont = "";
    for(let i=m; i<n; i++) {
        mainCont += `<div><img src="images/${i}.jpg"></div>`;
    }
    main.innerHTML += mainCont;
}