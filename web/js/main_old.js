
var items = new vis.DataSet({
    type: { start: 'ISODate', end: 'ISODate' }
});

var projectNames = Array('first', 'second', 'third');



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
            className: projectNames[j] + '-project-class',
            content: projectNames[j] + '_content',
            start: '2015-04-26',
            end: '2015-06-26',
            group: projectNames[j],
            subgroup: 'sg_1',
            subgroupOrder: 1
        }

    ]);
    j++;
}
var container = document.getElementById('visualization');
var countProjects = parseInt(projectNames.length);
var options = {

    timeAxis: {step: 2},
    orientation:'top',
    start: '2015-01-10',
    end: '2015-07-10',
    clickToUse: true,
    showCurrentTime: true,
    autoResize: true,
    zoomable: false,
    moveable: false,
    showMajorLabels: false,
    showMinorLabels: true,
    format: {
        minorLabels: {
            day:        'D'
        }
    },
    //showMinorLabels: false,
    //stack: false
    editable: {
        add: true,         // add new items by double tapping
        updateTime: true,  // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: true       // delete an item by tapping the delete button top right
    },
    onAdd: function (item, callback) {
        countProjects++;
        console.log(countProjects);
        item.id = countProjects;
        //item.content = prompt('Enter text content for new item:', item.content);
        item.className = 'new-project' + countProjects;
        item.start = '2015-03-26';
        item.end = '2015-04-26';
        if (item.content != null) {
            callback(item); // send back adjusted new item
        }
        else {
            callback(null); // cancel item creation
        }
    },
    onUpdate: function (item) {

        //console.log(parseInt(item.end) - parseInt(item.start));
        //console.log(item);
        //console.log(item.end);

        //item.content = prompt('Edit items text:', item.content);
        //if (item.content != null) {
        //    callback(item); // send back adjusted item
        //}
        //else {
        //    callback(null); // cancel updating the item
        //}
    },
    onMove: function(item){

var startData = Number(item.start);
var endData = Number(item.end);

        console.log(item.start);
        console.log(item.end);

        if(startData == endData){

            //timeline.destroy();
            //var a = timeline.item;
            //console.log(item.id);
            //console.log('.' + item.className);

            //setTimeout(function(){
            //    $('.first-company').remove();
            //$("[class=-project-class]")

            //timeline.hammer._destroy(item.id);
                $('.' + item.className).remove();
                //delete $('.' + item.className);
            //}, 200);

            //timeline.item.remove();

            //if (this.dom.deleteButton.parentNode) {
            //    this.dom.deleteButton.parentNode.removeChild(this.dom.deleteButton);
            //}

            //console.log(item);
            //item.parent().delete();
            //console.log($('.' + item.className).find('.vis-delete'));
            //
            //$('.' + item.className).find('.vis-delete').trigger('click');
        }


    }

};

$('.first-project-class').remove();

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
$( document ).ready(function() {

});
//---------------------------------------------EDIT PROJECTS--------------------------------------//




