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

        //set values for hsl
        let temp_hue = hueMap;
        let temp_saturation = 100;
        let temp_lightness = 40;

        //call color_hsl12rgb function to convert to RGB values
        let temp_rgb = olor_hs12rgb(temp_hue, temp_saturation, temp_lightness);

        //draw a circle using the x, y and diameter as defined in the current loop
        let circle = p.ellipse(y+add) * -1, x+add, diameter, diameter);
        circle.fillColor = makeColor(temp_rgb.r, temp_rgb.g, temp_rgb.b);
        indexCounter++;

    }
}

//functions to convert hue, saturation , lightness values to rgb values
function color_hsl2rgb(h, s, l) {
    var m1, m2, hue;
    var r, g, b;
    s /=100;
    l /= 100;
    if (s == 0){
        r = g = b = (l * 255);
    }else {
        if (l <= 0.5){
           m2 = l * (s + 1);
        }else{
            m2 = l + s - l * s;
        }
        m1 = l * 2 - m2;
        hue = h / 360;
        r = color_HueToRgb(m1, m2, hue + 1/3);
        g = color_HueToRgb(m1, m2, hue);
        b = color_HueToRgb(m1, m2, hue - 1/3);
    }
    return {r: r, g: g, b: b};
};