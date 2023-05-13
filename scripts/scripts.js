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
        },
        change: selectChange,
        select: selectChange
    });
    $("#deg-progs").selectmenu({
        classes: {
            "ui-selectmenu-menu": "deg-select"
        },
        change: selectChange,
        select: selectChange
    });
    $("#focus-opts").selectmenu({
        classes: {
            "ui-selectmenu-menu": "focus-select"
        },
        change: selectChange,
        select: selectChange,
        disabled: true
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
            {"name": 1, "courses": []}, 
            {"name": 2, "courses": []}, 
            {"name": 3, "courses": []}, 
            {"name": 4, "courses": []}, 
            {"name": 5, "courses": []}, 
            {"name": 6, "courses": []}, 
            {"name": 7, "courses": []}, 
            {"name": 8, "courses": []}
        ]
    };

    // Object to represent a major map for online programs, to be filled with data from our JSON as needed
    let majorMapOnline = {
        "terms": [
            {"name": "1A", "courses": []}, 
            {"name": "1B", "courses": []}, 
            {"name": "2A", "courses": []}, 
            {"name": "2B", "courses": []}, 
            {"name": "3A", "courses": []}, 
            {"name": "3B", "courses": []}, 
            {"name": "4A", "courses": []}, 
            {"name": "4B", "courses": []}, 
            {"name": "5A", "courses": []}, 
            {"name": "5B", "courses": []}, 
            {"name": "6A", "courses": []}, 
            {"name": "6B", "courses": []}, 
            {"name": "7A", "courses": []}, 
            {"name": "7B", "courses": []}, 
            {"name": "8A", "courses": []}, 
            {"name": "8B", "courses": []}
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

    // Designate the major map div to be droppable so that the draggable courses we add can be moved to different semesters/terms
    $("#major-map-output > div").droppable();

    // handling a change in any of the select dropdowns related to programs or a click on the generate major map button
    function selectChange(){
        // first, we'll grab the current values of all three select menu items
        let type = $("#prog-loc").val();
        let prog = $("#deg-progs").val();
        let focus;

        // boolean to help us track whether we're ready to generate the map
        let readyToGenerate = true;

        // display the current values in the dl below the dropdowns
        $("#loc").text(type || "Choose a type");
        $("#deg-selection").text(prog || "Choose a program");

        // verify that the first two options have something selected
        if(type === ""){
            $("#loc").text("A type is required").addClass("error-text");
            readyToGenerate = false;
        }

        if(prog === ""){
            $("#deg-selection").text("A program is required").addClass("error-text");
            readyToGenerate = false;
            // based on the current value of the program, disable/enable the focus area dropdown
        }else if(prog === "git-bs" || prog === "git-bas"){
            // these programs offer focus areas, the others do not
            $("#focus-opts").selectmenu("option", "disabled", false);
            focus = $("#focus-opts").val();
        }else{
            $("#focus-selection").text("Not required for this program");
        }
        

        // if the correct options have been selected/are valid, generate the major map and add it to the page in the div
        if(readyToGenerate){
            generateMajorMap(type, prog, focus);
        }
    }

    // call the function to validate the options before generating the major map when the user clicks the button
    $("#generate-map").on("click", selectChange());

    // handling a click on the generate major map button
    function generateMajorMap(type, prog, focus){
        // the div where we'll add the generated major map
        let mapDiv = $("#major-map-output > div");

        // show the div that will hold the generated major map
        mapDiv.removeClass("hidden");
    }
});
