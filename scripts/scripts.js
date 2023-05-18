// GIT Major Map Builder
"use strict";

// GLOBAL
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

// GLOBAL
// variables to store the different types of data in our JSOn file to be used in different sections of the page
let focusAreas, degrees, coreGitAll, coreBas, coreBasIwd, coreBsAll, coreUx, coreBsFs, genStudiesBasAll, generalStudiesBsAll, generalStudiesBs, generalStudiesBsFs, generalStudiesBsUx, electivesBas, electivesBasIwd, electivesBs, electivesBsFs, electivesBsUx, fullStackElectiveOpts, focusAreaCoursesBas, focusAreaCoursesBs, photoCourses, printCourses, videoCourses, frontEndCourses, interactionDesignCourses, motionGraphicsCourses, allFocusCourses;

// GLOBAL
// Object to represent a major map for campus programs, to be filled with data from our JSON as needed
let majorMapCampus = {
    "terms": [
        {"name": "1", "courses": []}, 
        {"name": "2", "courses": []}, 
        {"name": "3", "courses": []}, 
        {"name": "4", "courses": []}, 
        {"name": "5", "courses": []}, 
        {"name": "6", "courses": []}, 
        {"name": "7", "courses": []}, 
        {"name": "8", "courses": []}
    ]
};

// GLOBAL
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

// GLOBAL
// Function to handle parsing the JSON file of courses for display
function handleJSONfile(json){
    // log this data to the console with its type
    // console.log('json on load', json);

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
    allFocusCourses = json.allFocusAreas;

    // display the focus area courses in that section of the page
    showFocusAreas();
}

// GLOBAL
// Functions to display detail from the JSON file to different places on the page where we'll need to share that information, outside of the major map
// for the GIT Core Courses, BS and BAS
function showGitCourses(){

}

// for each focus area, create the HTML using parameters passed in and return it to the calling function
function compileFocusArea(focusArea){
    // object to hold the focus area courses we'll need to display
    let courses = null;

    // an empty string for building output
    let html = "";

    if(focusArea == "Commercial Photography"){
        courses = photoCourses;
    }else if(focusArea == "Commercial Print"){
        courses = printCourses;
    }else if(focusArea == "Commercial Videography"){
        courses = videoCourses;
    }else if(focusArea == "Front-End Web Development"){
        courses = frontEndCourses;
    }else if(focusArea == "Interaction Design"){
        courses = interactionDesignCourses;
    }else if(focusArea == "Motion Graphics"){
        courses = motionGraphicsCourses;
    }else if(focusArea == "all"){
        courses = allFocusCourses;
    }

    // we can use this variable to generate the output for prerequisite courses because they are in an array
    let prereqs = "";

    // loop through the courses collection and add each course to an output string to be appended to the page elsewhere
    for(let course of courses){
        prereqs = "";
        console.log(course.course);
        console.log(course.prerequisites);
        console.log(course.prerequisites.length);
        if(course.prerequisites.length > 0){
            for(let prerequisite of course.prerequisites){
                console.log(prerequisite);
                prereqs += prerequisite + "<br>";
            }
        }else if(course.prerequisites.length === 0){
            prereqs = "None";
        }
        html += `
        <section>
            <div class="gradient">
                <h6>${course.name}
                <span>${course.course}</span></h6>
                <dl>
                    <dt>Credits:</dt>
                    <dd>${course.credits}</dd>
                    <dt>Description:</dt>
                    <dd>${course.description}</dd>
                    <dt>Prerequisites:</dt>
                    <dd>${prereqs}</dd>
                </dl>
            </div>
        </section>`;
    }

    // console.log('courses', courses);

    return html;
}

// for the primary focus areas & courses in GIT
function showFocusAreas(){
    // console.log('focusAreas', focusAreas);

    for(let focusArea of focusAreas){
        let space = focusArea.indexOf(" ");
        let focusId = focusArea.substring(0, space).toLowerCase();
        let newSection = `
        <section id="${focusId}">
            <h5>${focusArea}</h5>
            ${compileFocusArea(focusArea)}
        </section>`;
        $("#primary > section").append(newSection);
    }

    // once we have iterated through and displayed the collections of specific focus area courses, we need to also display the courses that are fine for any focus area
    let newSection = `
        <section id="all">
            <h5>Valid for All Focus Areas</h5>
            ${compileFocusArea("all")}
        </section>`;
        $("#primary > section").append(newSection);
}

// GLOBAL
// handling a change in any of the select dropdowns related to programs or a click on the generate major map button
function selectChange(){
    // first, we'll grab the current values of all three select menu items
    let type = $("#prog-loc").val();
    let prog = $("#deg-progs").val();
    let focus;

    // the containers we'll need to add the red border on when there is an error in the program box
    let progBtn = $("#prog-loc-button");
    let degProgsBtn = $("#deg-progs-button");
    let focusOptsBtn = $("#focus-opts-button");

    // boolean to help us track whether we're ready to generate the map
    let readyToGenerate = true;

    // display the current values in the dl below the dropdowns
    $("#loc").text(type || "Choose a type");
    $("#deg-selection").text(prog || "Choose a program");

    // verify that the first two options have something selected
    if(type === ""){
        $("#loc").html("<i class=\"warning\"></i>A type is required").addClass("error-text");
        $("#prog-loc ~ .error-border").removeClass("hidden");
        progBtn.addClass("error-border");
        readyToGenerate = false;
    }else{
        $("#loc").empty().text($("#prog-loc option:selected").text()).removeClass("error-text");
        progBtn.removeClass("error-border");
        $("#prog-loc ~ .error-border").addClass("hidden");
    }

    if(prog === ""){
        $("#deg-selection").html("<i class=\"warning\"></i>A program is required").addClass("error-text");
        degProgsBtn.addClass("error-border");
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
        degProgsBtn.removeClass("error-border");
        if(focus === ""){
            $("#focus-selection").html("<i class=\"warning\"></i>A focus area is required");
            $("#focus-selection").addClass("error-text");
            focusOptsBtn.addClass("error-border");
            $("#focus-opts ~ .error-border").removeClass("hidden");
        }else{
            $("#focus-selection").text($("#focus-opts option:selected").text()).removeClass("error-text");
            focusOptsBtn.removeClass("error-border");
            $("#focus-opts ~ .error-border").addClass("hidden");
        }
    }else{
        $("#focus-opts").selectmenu("option", "disabled", true);
        $("#focus-selection").text("Not required for this program").removeClass("error-text");
        focusOptsBtn.removeClass("error-border");
        $("#focus-opts ~ .error-border").addClass("hidden");
    }

    // if the correct options have been selected/are valid, generate the major map and add it to the page in the div
    if(readyToGenerate){
        generateMajorMap(type, prog, focus);
    }
}

// GLOBAL
// convert the chosen major, location, and focus area into an object representing each term of the degree
function createTermOutput(term, courses){
    
}

// GLOBAL
// handling a click on the generate major map button
function generateMajorMap(type, prog, focus){
    // the div where we'll add the generated major map
    let mapDiv = $("#major-map-output > div");

    // show the div that will hold the generated major map
    mapDiv.removeClass("hidden");

    // an object to represent the degree plan
    let myDegree = {
        "core": {},
        "genStudies": {},
        "electives": {},
        "focusArea": {}
    };

    // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same. Let's first use them to get all of the courses that are shared by the programs
    if(type === "online"){
        // coreGitAll
        // coreBas
        // generalStudiesBasAll
        // coreBsAll
        // generalStudiesBsAll
        
    }else if(type === "campus"){
        // coreGitAll
        // coreBas
        // generalStudiesBasAll
    }

    // there are five degree programs: git-bas, git-bas-iwd, git-bs, git-bs-fs, and git-bs-ux. When we know which one we're working with, we can use the correct data to populate the major map
    // only the git-bs and git-bas require a focus area, so we will handle those as well
    if(prog === "git-bas"){
        // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same
        // electives Bas
        // focusAreaCoursesBas
        if(type === "online"){

        }else if(type === "campus"){

        }
    }else if(prog === "git-bas-iwd"){
        // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same
        // electivesBasIwd
        if(type === "online"){

        }else if(type === "campus"){

        }
    }else if(prog === "git-bs"){
        // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same
        if(type === "online"){

        }else if(type === "campus"){

        }
    }else if(prog === "git-bs-fs"){
        // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same
        if(type === "online"){

        }else if(type === "campus"){

        }
    }else if(prog === "git-bs-ux"){
        // there are two locations (online or campus) that will affect how we need to set up our terms even though the courses are the same
        if(type === "online"){

        }else if(type === "campus"){

        }
    }
}


// ONLOAD
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

// ONLOAD
// onload to handle the select menu items and handling events
$(function(){

});

// ONLOAD
// onload to handle loading the JSON file/displaying its content on page load where needed
$(function(){
    // get the data stored in our local JSON file so we can use it to display information to the user and create the major map builder
    fetch("scripts/courses.json")
        .then(response => response.json())
        .then(data => handleJSONfile(data));
});