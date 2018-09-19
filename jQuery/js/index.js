$(window).on("load", function() {
    waterfall();

    let dataInt = Array.from({length:98}, (v, k) => k);
    window.onscroll = function() {
        if(checkscrollside()) {
            $.each(dataInt, function(i, item) {
                let $box = $("<div>").addClass("box").appendTo($("#main"));
                let $pic = $("<div>").addClass("pic").appendTo($box);
                $("<img>").attr("src", "images/" + item + ".jpg").appendTo($pic);
                console.log(item);
            });
            waterfall();
        }
    }
})

function waterfall() {
    let $boxs = $("#main>div");
    let boxW = $boxs.eq(0).outerWidth();
    let num = Math.floor($(window).width() / boxW);
    $("#main").css({
        "width" : boxW*num
    });
    
    let boxHArr = [];
    $boxs.each(function(index, value) {
        let boxH = $boxs.eq(index).outerHeight();
        if(index<num) {
            boxHArr[index] = boxH;
        }
        else {
            let minH = Math.min.apply(null, boxHArr);
            let minHIndex = $.inArray(minH, boxHArr);
            $(value).css({
                "position": "absolute",
                "top": minH,
                "left": $boxs.eq(minHIndex).position().left
            });
            boxHArr[minHIndex] += boxH;
        }
    });
}

function checkscrollside() {
    let $boxs = $("#main>div");
    let lastBoxH = $boxs.last().offset().top + Math.floor($boxs.last().outerHeight()/2);
    let scrollTop = $(window).scrollTop();
    let documentH = $(window).height();
    return (lastBoxH < scrollTop+documentH) ? true : false;
}