var timeline;
var data;

google.load("visualization", "1");

// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);

// Called when the Visualization API is loaded.
function drawVisualization() {
    // Create and populate a data table.
    data = new google.visualization.DataTable();
    data.addColumn('datetime', 'start');
    data.addColumn('datetime', 'end');
    data.addColumn('string', 'content');
    data.addColumn('string', 'group');
    data.addColumn('string', 'className');

    // create some random data
    var names = ["first", "second", "third"];
    for (var n = 0, len = names.length; n < len; n++) {
        var name = names[n];
        var now = new Date();
        var end = new Date(now.getTime() - 12 * 60 * 60 * 1000);
        for (var i = 0; i < 5; i++) {
            var start = new Date(end.getTime() + Math.round(Math.random() * 5) * 60 * 60 * 1000);
            var end = new Date(start.getTime() + Math.round(4 + Math.random() * 5) * 60 * 60 * 1000);

            var r = Math.round(Math.random() * 3);
            var availability = (r === 0 ? "Unavailable" : (r === 1 ? "Available" : "Maybe"));
            var group = availability.toLowerCase();
            var content = availability;
            data.addRow([start, end, content, name, group]);
        }
    }

    var options = {
        editable: true,
        "width":  "100%",
        "height": 'auto',
        "style": "box",
        layout: "box",
        selectable: true,
        eventMargin: 10,  // minimal margin between events
        eventMarginAxis: 20, // minimal margin beteen events and the axis
        showMajorLabels: true,
        showMinorLabels: true,
        axisOnTop: true,
        groupsChangeable : true,
        groupsOnRight: false,
        showCurrentTime: true,
        zoomable: false,
        showNavigation: true,
        showButtonNew: true,
        moveable: true,
        showCustomTime: true

    };

    // Instantiate our timeline object.
    timeline = new links.Timeline(document.getElementById('mytimeline'), options);
    timeline.setScale(links.Timeline.StepDate.SCALE.DAY, 7);

    // Add event listeners
    google.visualization.events.addListener(timeline, 'changed', onselect);
    //google.visualization.events.addListener(timeline, 'edit', onEdit);
    google.visualization.events.addListener(timeline, 'edit', onEdit);
    //google.visualization.events.addListener(timeline, 'rangechanged', onRangechanged);
    google.visualization.events.addListener(timeline, 'changed', onRangechanged);
    google.visualization.events.addListener(timeline, 'rangechange', rangechange);
    //google.visualization.events.addListener(timeline, 'add', onadd);

    // Draw our timeline with the created data and options
    timeline.draw(data);

    // Set a customized visible range
    var startPeriod = new Date(now.getTime() - (3 * 30 * 24 * 60 * 60 * 60));
    var endPeriod = new Date(now.getTime() + (3 * 30 * 24 * 60 * 60 * 60));
    timeline.setVisibleChartRange(startPeriod, endPeriod);


}

function getSelectedRow() {
    var row = undefined;
    var sel = timeline.getSelection();
    if (sel.length) {
        if (sel[0].row != undefined) {
            row = sel[0].row;
        }
    }
    return row;
}

function strip(html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
}


$(document).on('dblclick', '.timeline-event', replaceHTML);

// Make a callback function for the select event
var onEdit = function () {
    var row = getSelectedRow();
};

var onselect = function () {
    //var row = getSelectedRow();


};
var onRangechanged = function () {
    var row = getSelectedRow();

    var startData = Number(timeline.getItem(row).start);
    var endData = Number(timeline.getItem(row).end);

    if(startData == endData){
        timeline.deleteItem(row);
    }

};

//var onadd = function () {
//    var row = getSelectedRow();
//    //document.getElementById("info").innerHTML += "item " + row + " created<br>";
//    var content = data.getValue(row, 4);
//    var newContent = prompt("Enter content", content);
//    if (newContent != undefined) {
//        data.setValue(row, 2, newContent);
//        timeline.redraw();
//    }
//    else {
//        // cancel adding the item
//        timeline.cancelAdd();
//    }
//};


var rangechange = function () {
    var row = getSelectedRow();
    //console.log(row.length);

};

function replaceHTML()
{
    //if ($(this).hasClass('noPad')) return 0;
    //var oldText = $(this).text();
    //$(this).addClass("noPad")
    //    .html("<input type=\"text\" class=\"editBox\" value=\"" + oldText + "\" />")
    //    .unbind('dblclick').trigger('focus');
    //$(this).on('mousedown mousepress mouseup click', function (e) {
    //    e.stopPropagation();
    //});


    if ($(this).hasClass('noPad')) return 0;
    var oldText = $(this).text();
    $(this).addClass("noPad")
        .html("")
        .html("<input type=\"text\" class=\"editBox\" value=\"" + oldText + "\" />")
        .unbind('dblclick', replaceHTML);
    $(this).on('mousedown mousepress mouseup click', function (e) {
        e.stopPropagation();
    });



    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $('.editBox'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) {

            var newText = $(div).val();

            //console.log(div);
            //console.log(newText);

            $(div).parent()
                .html('<div class="timeline-event-content">'+newText+'</div>')
                .removeClass("noPad")
                .bind("dblclick", replaceHTML);
        }
    });


}

