// набор функции для поддержки подсказок поиска адреса

var suggest_count=0;
var suggest_selected=0;
var input_initial_value='';
var search_suggestion_url="http://suggest-maps.yandex.ru/suggest-geo?callback=show_suggestion&_=1302005670080&lang=ru-RU&ll=37.617671%2C55.755768&spn=2.399139%2C0.624969&highlight=1&fullpath=1&sep=1&search_type=all&part=";
var this_element;
var current_Address = 1;

//function reposition_search_suggestion(pa){
//    //var rr=getDim(pa);
//    //var pos_left = rr.x;
//    //var pos_top = (rr.y + pa.offsetHeight);
//    // перепишем значения на абсолютные
//    pos_left = 0;
//    pos_top = 30;
//    $('#search_suggestion').css({'left':pos_left,'top':Math.ceil(pos_top)});
//}

$(window).load(function(){
    if(!search_suggestion_url)return;
    var typingTimer;                //timer identifier
    var doneTypingInterval = 42;  //time in ms

//    if(document.getElementById('search_suggestion')===null){
//        $('<ul id="search_suggestion"></ul>').appendTo('body').css({'display':'none','position':'absolute'});
//    }

    //Если keyup, start the countdown
    $("#toText").keyup(function(I){
        keyupToTextBox(I);
        current_Address = 1;
    });
    $("#to2Text").keyup(function(I){
        keyupToTextBox(I);
        current_Address = 2;
    });
    $("#to3Text").keyup(function(I){
        keyupToTextBox(I);
        current_Address = 3;
    });

    // ввод текста в текстбокс
    function keyupToTextBox(I){
        switch(I.keyCode) {
            case 18:case 9: break;
            case 38:case 40:break;
            default: typingTimer = setTimeout(doneTyping, doneTypingInterval);
                break;
        }
    }

    $('html').click(function(){
        $('#search_suggestion').hide();
    });


    $('#search_suggestion').click(function(event){
        if(suggest_count)
            $('#search_suggestion').show();
        event.stopPropagation();
    });

    // фокус на текстбокс
    $("#toText").focusin(function(){
        this_element=this;
        focusinToTextBox();
    });

    $("#to2Text").focusin(function(){
        this_element=this;
        focusinToTextBox();
    });

    $("#to3Text").focusin(function(){
        this_element=this;
        focusinToTextBox();
    });

    function focusinToTextBox(){
        if(suggest_count)
            $('#search_suggestion').show();
    }

    // клик
    $("#toText").click(function(event){
        this_element=this;
        clickToTextBox(event);
    });
    $("#to2Text").click(function(event){
        this_element=this;
        clickToTextBox(event);
    });
    $("#to3Text").click(function(event){
        this_element=this;
        clickToTextBox(event);
    });

    // клик в текстбокс
    function clickToTextBox(event){
        if(suggest_count)
            $('#search_suggestion').show();
        if(suggest_selected>0){
            $('#search_suggestion li').eq(suggest_selected-1).removeClass('active');
            suggest_selected=0;
            $(this).attr('value',input_initial_value);
        }
        event.stopPropagation();
    }

    $("#toText").keypress(function(J) {
        keypressToTextBox(J);
        current_Address = 1;
    });
    $("#to2Text").keypress(function(J) {
        keypressToTextBox(J);
        current_Address = 2;
    });
    $("#to3Text").keypress(function(J) {
        keypressToTextBox(J);
        current_Address = 3;
    });

    // ввод текста в текстбокс
    function keypressToTextBox(J)    {
        switch(J.keyCode) {
            case 13:
                if(suggest_selected===0)
                    $(this).closest("form").submit();
                else {
                    confirm_search();
                    J.preventDefault();
                }
                return false;
            case 27:
                return false;
        }
    }

    //on keydown, clear the countdown
//    $("#toText").keydown(function(I){
//        this_element=this;
//        reposition_search_suggestion(this);
//        switch(I.keyCode) {
//            case 18:case 9: $('#search_suggestion').hide();break;
//            case 38:case 40:
//            I.preventDefault();
//            if(suggest_count)
//                key_activate(I.keyCode-39)
//            break;
//            case 13:break;
//            case 27:
//                $(this).click();
//                break;
//            default:
//                clearTimeout(typingTimer);
//                break;
//        }
//    });

    function doneTyping (){
        $("body").append($('<script charset="utf-8" src="'+search_suggestion_url+escape((encode_utf8($(this_element).attr("value"))))+'">'));
    }
});

function confirm_search(value){
    $('#search_suggestion').hide();
    if(value)
        $(this_element).attr('value',value);
    suggest_selected=0;
    suggest_count=0;

    // проводим изменения в интерфейсе
    switch (current_Address){
        case 1:
            $('#toNumberText')[0].value = '';
            $('#orderSpan')[0].style.display = "none";
            $('#routeSpan')[0].style.display = "inline";
            $('#orderSection')[0].style.visibility = "collapse";
            $('#routeButton')[0].disabled = false;
            break;
        case 2:
            $('#toNumber2Text')[0].value = '';
            break;
        case 3:
            $('#toNumber3Text')[0].value = '';
            break;
    }
}

function getDim(el){
    for (var lx=0,ly=0;el!=null;
         lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
    return {x:lx,y:ly};
}

function chr(code){
    return String.fromCharCode(code);
}

function encode_utf8(s){
    return unescape(encodeURIComponent( s ));
}

function show_suggestion(res){
    if(res[1] && res[1].length){
        input_initial_value=res[0];
        suggest_count=res[1].length;
        suggest_selected=0;
        $('#search_suggestion li').each(function(){$(this).remove()});
        for(var i in res[1]){
            if(typeof res[1][i][2]==='undefined')
                continue;
            var option = document.createElement("li")
            option.innerHTML='<a href="#" onclick="confirm_search(this.innerHTML);return false;">'+res[1][i][2]+'</a>';
            document.getElementById('search_suggestion').appendChild(option);
        }

        // выставляем сдвиг для подсказки
        switch (current_Address){
            case 1:
                $('#search_suggestion').css({'left':0,'top':35});
                break;
            case 2:
                $('#search_suggestion').css({'left':0,'top':70});
                break;
            case 3:
                $('#search_suggestion').css({'left':0,'top':105});
                break;
        }

        $('#search_suggestion').show(500);
    }
    else {
        suggest_count=0;
        $('#search_suggestion').hide();

        // проводим изменения в интерфейсе
        switch (current_Address){
            case 1:
                $('#toNumberText')[0].value = '';
                $('#orderSpan')[0].style.display = "none";
                $('#routeSpan')[0].style.display = "inline";
                $('#orderSection')[0].style.visibility = "collapse";
                $('#routeButton')[0].disabled = true;
                break;
            case 2:
                $('#toNumber2Text')[0].value = '';
                break;
            case 3:
                $('#toNumber3Text')[0].value = '';
                break;
        }
    }
}

function key_activate(n){
    $('#search_suggestion li').eq(suggest_selected-1).removeClass('active');
    if(n===1 && suggest_selected<suggest_count){
        suggest_selected++;
    }
    if(n===-1 && suggest_selected>0){
        suggest_selected--;
    }
    if(suggest_selected>0){
        $('#search_suggestion li').eq(suggest_selected-1).addClass('active');
        $(this_element).attr("value",$('#search_suggestion li a').eq(suggest_selected-1).text());
        $(item_price_element).attr("value",$('#search_suggestion li b').eq(suggest_selected-1).text());
    }
    else {
        $(this_element).attr("value",input_initial_value);
    }
}

function unhtml(s){
    return s.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
}
