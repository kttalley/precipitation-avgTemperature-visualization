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