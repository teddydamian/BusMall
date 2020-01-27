'use strict';

//GLOBAL VARS----------------------------------------------------------------------------------------------------------------------------
var allItems=[];
var itemParent = document.getElementById('items');
var leftItems = document.getElementById('leftItems');
var midItems = document.getElementById('midItems');
var rightItems= document.getElementById('rightItems');
var leftIndex = null;
var midIndex = null;
var rightIndex = null;

//RANDOM NUMBER---------------------------------------------------------------------------------------------------------------------------
var currentPic = [];
function randomItems(){
  do{
    var randomNumber = Math.floor(Math.random() * allItems.length);
  }
  while (currentPic.includes(randomNumber));
  // console.log(currentPic);
  return randomNumber;
}

//CONSTRUCTOR FUNCTION----------------------------------------------------------------------------------------------------------------------
function Items(name, image){
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;

  if (!allItems){
    allItems=[];
  }

  allItems.push(this);
  updateStorage();
}


//NO TRIPLE DUPLICATES----------------------------------------------------------------------------------------------------------------
function renderItems(){

  do {
    leftIndex = randomItems();
    midIndex = randomItems();
    rightIndex = randomItems();

  } while(leftIndex === rightIndex || leftIndex === midIndex || rightIndex === midIndex); //CORRECT

  //Viewed---------------------------------------------------------------------------------------------------------------------------------
  allItems[leftIndex].views++;
  allItems[midIndex].views++;
  allItems[rightIndex].views++;


  leftItems.src = allItems[leftIndex].image;
  rightItems.src = allItems[rightIndex].image;
  midItems.src = allItems[midIndex].image;

  currentPic= [leftIndex, midIndex, rightIndex];
}


//Total Voting round-----------------------------------------------------------------------------------------------------------------------
var votes = 0;
var totalRounds = 25;

//EVENT LISTENER---------------------------------------------------------------------------------------------------------------------------
var handleClickOnItems = function(event){
  var itemClicked = event.target.id;

  if(itemClicked === 'leftItems' || itemClicked === 'rightItems' || itemClicked === 'midItems'){
    votes++;
    if(itemClicked === 'leftItems'){
      allItems[leftIndex].clicked++;
    } else if(itemClicked === 'midItems'){
      allItems[midIndex].clicked++;
    } else if(itemClicked === 'rightItems'){
      allItems[rightIndex].clicked++;
    } else{
      alert('you clicked wrong');
    }
  }
  endRounds();
};


//Total round---------------------------------------------------------------------------------------------------------------------------
function endRounds(){
  if(votes === totalRounds){

    itemParent.removeEventListener('click', handleClickOnItems);
    alert('Thanks for voting!');

    var labelData = [];
    var clickData = [];
    var viewData = [];

    for(var i = 0; i < allItems.length; i++){
      var item = allItems[i];
      labelData.push(item.name);
      clickData.push(item.clicked);
      viewData.push(item.views);

      var ctx = document.getElementById('chart').getContext('2d');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labelData,
          datasets: [{
            label: '# of Clicks',
            data: clickData,
            backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue'],
          }, {
            label: '# of Views',
            data: viewData,
            backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue'],
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }
  else{
    renderItems();
  }
}updateStorage();


// Instantiation-------------------------------------------------------------------------------------------------------------------
new Items('bag', 'assets/bag.jpg');
new Items('banana', 'assets/banana.jpg');
new Items('bathroom', 'assets/bathroom.jpg');
new Items('boots', 'assets/boots.jpg');
new Items('breakfast', 'assets/breakfast.jpg');
new Items('bubblegum', 'assets/bubblegum.jpg');
new Items('chair', 'assets/chair.jpg');
new Items('cthulhu', 'assets/cthulhu.jpg');
new Items('dog-duck', 'assets/dog-duck.jpg');
new Items('dragon', 'assets/dragon.jpg');
new Items('pen', 'assets/pen.jpg');
new Items('pet-sweep', 'assets/pet-sweep.jpg');
new Items('scissors', 'assets/scissors.jpg');
new Items('shark', 'assets/shark.jpg');
new Items('sweep', 'assets/sweep.png');
new Items('tauntaun', 'assets/tauntaun.jpg');
new Items('unicorn', 'assets/unicorn.jpg');
new Items('usb', 'assets/usb.gif');
new Items('water-can', 'assets/water-can.jpg');
new Items('wine-glass', 'assets/wine-glass.jpg');

renderItems();

// Event for Items-----------------------------------------------------------------------------------------------------------
itemParent.addEventListener('click', handleClickOnItems)
;

function updateStorage () {
  var arrayItems = JSON.stringify(allItems);
  localStorage.setItem('item', arrayItems);
}

function getItems(){
  if(localStorage.length > 0){
    var itemObjects = localStorage.getItem('item');
    allItems = JSON.parse(itemObjects);
  }
  renderItems();
}


