'use strict';

//GLOBAL VARS----------------------------------------------------------------------------------------------------------------------------

var itemParent = document.getElementById('items');
var leftItems = document.getElementById('leftItems');
var midItems = document.getElementById('midItems');
var rightItems= document.getElementById('rightItems');
var listHTML = document.getElementById('list');
var leftIndex = null;
var midIndex = null;
var rightIndex = null;

//RANDOM NUMBER---------------------------------------------------------------------------------------------------------------------------
function randomItems(){
  var randomNumber = Math.floor(Math.random() * Items.allImages.length);
  return randomNumber;
}


//CONSTRUCTOR FUNCTION----------------------------------------------------------------------------------------------------------------------
function Items(name, image){
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;

  Items.allImages.push(this);
}

//NO TRIPLE DUPLICATES----------------------------------------------------------------------------------------------------------------
function renderItems(){

  do {
    leftIndex = randomItems();
    midIndex = randomItems();
    rightIndex = randomItems();

  } while(leftIndex === rightIndex || leftIndex === midIndex || rightIndex === midIndex); //CORRECT

  //Viewed---------------------------------------------------------------------------------------------------------------------------------
  Items.allImages[leftIndex].views++;
  Items.allImages[midIndex].views++;
  Items.allImages[rightIndex].views++;


  leftItems.src = Items.allImages[leftIndex].image;
  rightItems.src = Items.allImages[rightIndex].image;
  midItems.src = Items.allImages[midIndex].image;

  // var array = [];
  // for ( var i = 0; i< Items.allImages.length; i++){
  //   Items.allImages[i].view = 1,

}


//Total Voting round-----------------------------------------------------------------------------------------------------------------------
var votes = 0;
var totalRounds = 10;

//EVENT LISTENER---------------------------------------------------------------------------------------------------------------------------
var handleClickOnItems = function(event){
  var itemClicked = event.target.id;

  if(itemClicked === 'leftItems' || itemClicked === 'rightItems' || itemClicked === 'middleItems'){
    votes++;
    if(itemClicked === 'leftItems'){
      Items.allImages[leftIndex].clicked++;
    } else if(itemClicked === 'middleItems'){
      Items.allImages[midIndex].clicked++;
    } else if(itemClicked === 'rightItems'){
      Items.allImages[rightIndex].clicked++;
    } else{
      alert('you clicked wrong');
    }
  }
  //Must Be new Items rerolled------------------------------------------------------------------------------------------------------------



  //Total round---------------------------------------------------------------------------------------------------------------------------
  if(votes === totalRounds){

    itemParent.removeEventListener('click', handleClickOnItems);
    alert('Thanks for voting!');

    var labelData = [];
    var clickData = [];
    var viewData = [];

    for(var i = 0; i < Items.allImages.length; i++){
      var item = Items.allImages[i];
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
};

// ITEMS ARRAY---------------------------------------------------------------------------------------------------------------------

Items.allImages = [];

// Instantiation-------------------------------------------------------------------------------------------------------------------
new Items('bag', '/assets/bag.jpg');
new Items('banana', '/assets/banana.jpg');
new Items('bathroom', '/assets/bathroom.jpg');
new Items('boots', '/assets/boots.jpg');
new Items('breakfast', '/assets/breakfast.jpg');
new Items('bubblegum', '/assets/bubblegum.jpg');
new Items('chair', '/assets/chair.jpg');
new Items('cthulhu', '/assets/cthulhu.jpg');
new Items('dog-duck', '/assets/dog-duck.jpg');
new Items('dragon', '/assets/dragon.jpg');
new Items('pen', '/assets/pen.jpg');
new Items('pet-sweep', '/assets/pet-sweep.jpg');
new Items('scissors', '/assets/scissors.jpg');
new Items('shark', '/assets/shark.jpg');
new Items('sweep', '/assets/sweep.png');
new Items('tauntaun', '/assets/tauntaun.jpg');
new Items('unicorn', '/assets/unicorn.jpg');
new Items('usb', '/assets/usb.gif');
new Items('water-can', '/assets/water-can.jpg');
new Items('wine-glass', '/assets/wine-glass.jpg');

renderItems();

// Event for Items-----------------------------------------------------------------------------------------------------------
itemParent.addEventListener('click', handleClickOnItems)
;




// function renderChart() {
//   var labelData = [];
//   var clickData = [];
//   var viewData = [];
//   for (var i = 0; i < Items.allImages.length; i++) {
//     labelData.push(Items.allImages[i].name);
//     clickData.push(Items.allImages[i].clicks);
//     viewData.push(Items.allImages[i].views);
//   }

//   var ctx = document.getElementById('chart').getContext('2d');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labelData,
//       datasets: [{
//         label: '# of Clicks',
//         data: labelData.clicked,
//         backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       }, {
//         label: '# of Views',
//         data: labelData.views,
//         backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }
