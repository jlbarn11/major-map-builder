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

    fetch("scripts/courses.json")
        .then(response => response.json())
        .then(data => handleJSONfile(data));

    // variables to store the different types of data in our JSOn file to be used in different sections of the page
    let focusAreas, coreGitCourses, coreNonGitCourses, genStudies, gitElectives, electives, focusAreaCourses, photoCourses, printCourses, videoCourses, frontEndCourses, interactionDesignCourses, motionGraphicsCourses, uxCourses;

    // Object to represent a major map for campus programs, to be filled with data from our JSON as needed
    let majorMapCampus = {
        "terms": [
            {"name": 1, "courses": []}, {"name": 2, "courses": []}, {"name": 3, "courses": []}, {"name": 4, "courses": []}, {"name": 5, "courses": []}, {"name": 6, "courses": []}, {"name": 7, "courses": []}, {"name": 8, "courses": []}
        ]
    };

    // Object to represent a major map for online programs, to be filled with data from our JSON as needed
    let majorMapOnline = {
        "terms": [
            {"name": "1A", "courses": []}, {"name": "1B", "courses": []}, {"name": "2A", "courses": []}, {"name": "2B", "courses": []}, {"name": "3A", "courses": []}, {"name": "3B", "courses": []}, {"name": "4A", "courses": []}, {"name": "4B", "courses": []}, {"name": "5A", "courses": []}, {"name": "5B", "courses": []}, {"name": "6A", "courses": []}, {"name": "6B", "courses": []}, {"name": "7A", "courses": []}, {"name": "7B", "courses": []}, {"name": "8A", "courses": []}, {"name": "8B", "courses": []}
        ]
    };

    // Function to handle parsing the JSON file of courses for display
    function handleJSONfile(json){
        // add the different parts of the JSON to the variables we created above
        focusAreas = json.focusAreas;
        coreGitCourses = json.coreGit;
        coreNonGitCourses = json.coreNonGit;
        genStudies = json.generalStudies;
        gitElectives = json.gitElectives;
        electives = json.electives;
        focusAreaCourses = json.focusAreaCourses;
        photoCourses = json.commercialPhoto;
        printCourses = json.commercialPrint;
        videoCourses = json.commercialVideo;
        frontEndCourses = json.frontEndWebDev;
        interactionDesignCourses = json.interactionDesign;
        motionGraphicsCourses = json.motionGraphics;
        uxCourses = json.userExperience;
    }
});
