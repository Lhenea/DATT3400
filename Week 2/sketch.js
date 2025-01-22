//name , volume , country
let table;
let trendData = {};
let maxName= 0;
let minName = 100;
let maxCountry= 0;
let minCountry = 100;
let minVol = 10000000;
let maxVol = 0;
let q =0; 
let w =0; 
let e =0;
function preload(){
  table = loadTable('2021_August_Trends.csv','csv','header');
}

function setup() {
  createCanvas(400, 500);
  let name;
  let country;
  let vol;

  
  //finding maxName and minName
  for (let i = 0; i < table.getRowCount(); i++){
    name = table.getString(i,'trend_name').length;
    if(name > maxName){
      maxName = name;
    }
    if(name < minName){
      minName = name;
    } 
  }
  
  //finding minCountry and maxCountry
  for (let j = 0; j < table.getRowCount(); j++){
    country  = table.getString(j,'searched_in_country').length;
    if(country > maxCountry){
      maxCountry = country;
    }
    if(country < minCountry){
      minCountry = country;
    } 
  }
  
  //finding minVol and maxVol
  for (let i = 0; i < table.getRowCount(); i++){
    vol = int(table.getString(i,'tweet_volume'));
    if (vol !== ''){
       if(vol > maxVol){
      maxVol = vol;
    }
    if(vol < minVol){
      minVol = vol;
    }
    }
  }
   
  //printing out min and max to keep track
  print(minCountry, "+", maxCountry, "+", minName, "+", maxName,"+", minVol, "+", maxVol );
  
  
  let off = 2; //offset
  
  //two for loops to access data from tables
  for(let a = 0; a < width; a+=2){
    off += 10;
    for(let b = 0; b < height; b+=2){
      //mapping data to 0-255 for rgb 
      vol = int(table.getString(b,'tweet_volume'));
      q = map(table.getString(b,'trend_name').length,minName,maxName,0,255) *2;
      w = map(table.getString(b,'searched_in_country').length,minCountry,maxCountry,0,255)*2;
      if ( vol !== '' && !isNaN(vol)){
        e = map(vol,minVol,maxVol,0,255);
      }
      
     fill(q,w,e);
     circle(a+off,b,off);
     rotate(off/20);
    }
  }
}

function draw() {
  background(220,0);
}