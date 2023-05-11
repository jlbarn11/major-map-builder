// GIT Major Map Builder

// handling change in window size for rendering navigation
function viewportHandler() {

    requestAnimationFrame(() => {
        // get the visualViewport object for the window
        const visualViewport = window.visualViewport;
        // get the width of that object
        const width = visualViewport.width;

        // check the width, then update nav display according to that
        if(width >= 900){
            $("nav ul").clearQueue().stop().show({
                "effect": "fold",
                "easing": "linear", 
                "duration": 500
            });
        }else{
            $("nav ul").clearQueue().stop().hide({
                "effect": "fold",
                "easing": "linear", 
                "duration": 500
            });
        }
    });
}





// jQuery onload function to create widgets/add event handlers on page load
$(function(){
    // hide or show the correct version of the nav on page load
    viewportHandler();

    // listen to viewport resize so we know which version of the navigation to show to the user
    window.visualViewport.addEventListener("resize", viewportHandler); 


    // listen for and handle a click on the hamburger icon
    $("#hamburger").click(function(){
        $("nav ul").toggle({
            "effect": "fold",
            "easing": "linear", 
            "duration": 500
        });
    });


    // Create the select menu dropdowns
    $("#prog-loc").selectmenu({
        classes: {
            "ui-selectmenu-menu": "prog-select"
        }
    });
    $("#deg-progs").selectmenu({
        classes: {
            "ui-selectmenu-menu": "deg-select"
        }
    });
    $("#focus-opts").selectmenu({
        classes: {
            "ui-selectmenu-menu": "focus-select"
        }
    });


    // get the data stored in our local JSON file so we can use it to display information to the user and create the major map builder
    // $.getJSON("scripts/courses.json", parseJSONfile(data));
//     $.getJSON("scripts/courses.json")
//     .done(console.log(data))
//     .fail(console.log("I have no idea what is happening"));

    fetch("scripts/courses.json")
        .then(response => response.json())
        .then(data => console.log(data));

    // variables to store the different types of data in our JSOn file to be used in different sections of the page
    let focusAreas, coreGitCourses, coreNonGitCourses, genStudies, gitElectives, electives, focusAreaCourses, photoCourses, printCourses, videoCourses, frontEndCourses, interactionDesignCourses, motionGraphicsCourses, uxCourses;

    // Function to handle parsing the JSON file of courses for display
    
    function parseJSONfile(json){
        let data = $.parseJSON(json);
        console.log('json data in parseJSONfile function', data);
    }
});
