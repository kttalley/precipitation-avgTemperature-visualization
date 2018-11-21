/*
    This is a script to access xml data pertaining to annual precipitation
    and avg temperatures in Colorado from 1917-2016. Data retrieved from https://www.ndc.noaa.gov/cag
*/

var doc = app.activeDocument;
var p = doc.pathItems;

//the width and height in pixels inside artboard margins.

const inWidth = 1692;
const inHeight = 2556;

const margin = 18;

//path for this scripts folder (also containing xml files)
var currentFolder = Folder(File($.fileName).parent).fullName;
var file = new File(currentFolder+"/temperature.xml");
var file2 = new File(currentFolder+"/precipitation.xml");

var tempXML, precipXML;

//call functions to read 2 XML files (with respective data-sets)
readPrecipXMLFile(file2);
readTempXMLFile(file);

//loop through XML elements to set parameters of circles in a 10x10 grid.
let indexCounter = 0;
for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        //get precip value in the XML element associated with the current loop index.
        let precipAmount = precipXML.data[indexCounter].value;

        //map the range of precipitation values (11.85 in - 25.52 in) to a range of circle sizes in pixels.
        let diameter = 78.5 + (169.2 - 78.5) * ((precipAmount - 11.85)/(25.52 - 11.85));

        //use the current loop index and the diameter ofr hte current circle to define
        //the ellipse coordinates.
        let y = (inHeight / 6 + i * inWidth / 10);
        let x = (inWidth / 6 + i * inHeight / 10);
        let add = (inWidth/10 - diameter) / 2;

        //get the precipitation value in the XML element associated with the current loop index.
        let yrTemp = tempXML.data[indexCounter].value;


        //map the range of temps (42.5 deg - 48.3 deg) to a range of hues (blue - red).
        let hueMap = 242 + (360-242) * ((yrTemp-42.5)/(48.-42.5));

        //set values

    }
}