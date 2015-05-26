var items = new vis.DataSet({
    type: { start: 'ISODate', end: 'ISODate' }
});

var projectNames = Array('first', 'second', 'third');
console.log(projectNames.length);

//var a = [{
//    id: 'first', className: projectNames[0], content:'first', subgroupOrder: 'subgroupOrder1'
//},{
//    id: 'second', className: projectNames[1], content:'second', subgroupOrder: 'subgroupOrder2' // this group has no subgroups but this would be the other method to do the sorting.
//},{
//    id: 'third', className: projectNames[3], content:'third', subgroupOrder: 'subgroupOrder3' // this group has no subgroups but this would be the other method to do the sorting.
//}];

//var groups = new vis.DataSet(a);


var i = 0;
var j = 0;
var groups = [];
while (i < projectNames.length) {
    groups.push({
        id: projectNames[i],
        className: projectNames[i] + '-company',
        content: projectNames[i],
        subgroupOrder: projectNames[i]
    });
    i++;
}
while (j < projectNames.length - 1) {
    items.add([
        {
            id: projectNames[j],
            className: projectNames[j] + '-project-class edit-project-name',
            content: projectNames[j] + '_content',
            start: '2014-01-26',
            end: '2014-02-26',
            group: projectNames[j],
            subgroup: 'sg_1',
            subgroupOrder: 1
        }

    ]);
    j++;
}
var container = document.getElementById('visualization');
var options = {

    timeAxis: {step: 2},
    orientation:'top',
    start: '2014-01-10',
    end: '2014-07-10',
    editable: {
        add: true,         // add new items by double tapping
        updateTime: true,  // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: true       // delete an item by tapping the delete button top right
    },
    onAdd: function (item, callback) {
        item.id = parseInt(projectNames.length) + 1;
        item.content = prompt('Enter text content for new item:', item.content);
        item.className = 'new-project' + parseInt(projectNames.length + 1);
        item.start = '2014-03-26';
        item.end = '2014-04-26';
        if (item.content != null) {
            callback(item); // send back adjusted new item
        }
        else {
            callback(null); // cancel item creation
        }
    },
    //onUpdate: function (item, callback) {
    //    item.content = prompt('Edit items text:', item.content);
    //    if (item.content != null) {
    //        callback(item); // send back adjusted item
    //    }
    //    else {
    //        callback(null); // cancel updating the item
    //    }
    //},


    autoResize: true,
    zoomable: false,
    moveable: false,
    showMajorLabels: false
    //showMinorLabels: false,
    //stack: false
};

var timeline = new vis.Timeline(container, items, groups, options);


/**
 * Move the timeline a given percentage to left or right
 * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
 */
function move (percentage) {
    var range = timeline.getWindow();
    var interval = range.end - range.start;


    timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end:   range.end.valueOf()   - interval * percentage
    });

}


document.getElementById('moveLeft').onclick  = function () { move( 0.4); };
document.getElementById('moveRight').onclick = function () { move(-0.4); };



//---------------------------------------------EDIT PROJECTS--------------------------------------//
function replaceHTML()
{
    console.log('ssdfg');
    oldText = $(this).html().replace(/"/g, "");
    $(this).html("").html("<form><input type=\"text\" class=\"editBox\" value=\"" + oldText + "\" /> </form><a href=\"#\" class=\"btnSave\">Save changes</a><a href=\"#\" class=\"btnDiscard\">Discard changes</a>");
}

$('.edit-project-name .vis-item-content').each(function(){
    $(this).hover(
        function(){
            $(this).addClass("editHover");
            $(".editHover").bind("dblclick", replaceHTML);
        },
        function(){
            $(this).removeClass("editHover");
            console.log(this);

            //newText = $(this).siblings("form").children(".editBox").val().replace(/"/g, "");
            //
            //$(this).parent().html(newText);
        }
    );



    //$(this).bind('dblclick', function(){
    //    oldText = $(this).html().replace(/"/g, "");
    //    $(this).html("").html("<input type=\"text\" class=\"editBox\" value=\"" + oldText + "\" />");
    //});

});

