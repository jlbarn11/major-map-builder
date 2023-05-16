// GIT Major Map Builder
"use strict";

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

// variables to store the different types of data in our JSOn file to be used in different sections of the page
let focusAreas, degrees, coreGitAll, coreBas, coreBasIwd, coreBsAll, coreUx, coreBsFs, genStudiesBasAll, generalStudiesBsAll, generalStudiesBs, generalStudiesBsFs, generalStudiesBsUx, electivesBas, electivesBasIwd, gitElectivesBs, electivesBs, electivesBsFs, electivesBsUx, fullStackElectiveOpts, focusAreaCoursesBas, focusAreaCoursesBs, photoCourses, printCourses, videoCourses, frontEndCourses, interactionDesignCourses, motionGraphicsCourses, uxCourses, allFocusCourses;

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
    degrees = json.degrees;
    coreGitAll = json.coreGitAll;
    coreBas = json.coreBas;
    coreBasIwd = json.coreBasIwd;
    coreBsAll = json.coreBsAll;
    coreUx = json.coreUx;
    coreBsFs = json.coreBsFs;
    genStudiesBasAll = json.genStudiesBasAll;
    generalStudiesBsAll = json.generalStudiesBsAll;
    generalStudiesBs = json.generalStudiesBs;
    generalStudiesBsFs = json.generalStudiesBsFs;
    generalStudiesBsUx = json.generalStudiesBsUx;
    electivesBas = json.electivesBas;
    electivesBasIwd = json.electivesBasIwd;
    gitElectivesBs = json.gitElectivesBs;
    electivesBs = json.electivesBs;
    electivesBsFs = json.electivesBsFs;
    electivesBsUx = json.electivesBsUx;
    fullStackElectiveOpts =  json.fullStackElectiveOpts;
    focusAreaCoursesBas = json.focusAreaCoursesBas;
    focusAreaCoursesBs = json.focusAreaCoursesBs;
    photoCourses = json.commercialPhoto;
    printCourses = json.commercialPrint; 
    videoCourses = json.commercialVideo; 
    frontEndCourses = json.frontEndWebDev;
    interactionDesignCourses = json.interactionDesign;
    motionGraphicsCourses = json.motionGraphics;
    uxCourses = json.userExperience; 
    allFocusCourses = json.allFocusAreas;
}

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
        $("#loc").html("<i class=\"warning\"></i>A type is required").addClass("error-text");
        $("#prog-loc ~ .error-border").removeClass("hidden");
        readyToGenerate = false;
    }else{
        $("#loc").empty().text($("#prog-loc option:selected").text()).removeClass("error-text");
        $("#prog-loc ~ .error-border").addClass("hidden");
    }

    if(prog === ""){
        $("#deg-selection").html("<i class=\"warning\"></i>A program is required").addClass("error-text");
        readyToGenerate = false;
        $("#deg-selection").removeClass("all-caps");
        $("#deg-progs ~ .error-border").removeClass("hidden");
        // based on the current value of the program, disable/enable the focus area dropdown
    }else if(prog === "git-bs" || prog === "git-bas"){
        // these programs offer focus areas, the others do not
        $("#focus-opts").selectmenu("option", "disabled", false);
        $("#deg-selection").removeClass("error-text");
        focus = $("#focus-opts option:selected").val();
        $("#deg-selection").addClass("all-caps");
        $("#deg-progs ~ .error-border").addClass("hidden");
        if(focus === ""){
            $("#focus-selection").html("<i class=\"warning\"></i>A focus area is required");
            $("#focus-selection").addClass("error-text");
            $("#focus-opts ~ .error-border").removeClass("hidden");
        }else{
            $("#focus-selection").text($("#focus-opts option:selected").text()).removeClass("error-text");
            $("#focus-opts ~ .error-border").addClass("hidden");
        }
    }else{
        $("#focus-opts").selectmenu("option", "disabled", true);
        $("#focus-selection").text("Not required for this program").removeClass("error-text");
        $("#focus-opts ~ .error-border").addClass("hidden");
    }

    // if the correct options have been selected/are valid, generate the major map and add it to the page in the div
    if(readyToGenerate){
        generateMajorMap(type, prog, focus);
    }
}

function createTermOutput(term, courses){

}


// handling a click on the generate major map button
function generateMajorMap(type, prog, focus){
    // the div where we'll add the generated major map
    let mapDiv = $("#major-map-output > div");

    // show the div that will hold the generated major map
    mapDiv.removeClass("hidden");
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

    // create the accordion in the programs section
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
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

    // Designate the major map div to be droppable so that the draggable courses we add can be moved to different semesters/terms
    $("#major-map-output > div").droppable();

    // call the function to validate the options before generating the major map when the user clicks the button
    $("#generate-map").on("click", selectChange());
});

// onload to handle the select menu items and handling events
$(function(){

});

// onload to handle loading the JSON file
$(function(){
    // get the data stored in our local JSON file so we can use it to display information to the user and create the major map builder
    fetch("scripts/courses.json")
        .then(response => response.json())
        .then(data => handleJSONfile(data));
});