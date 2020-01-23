'use strict';

//GLOBAL VARS----------------------------------------------------------------------------------------------------------------------------
var allItems = JSON.parse(localStorage.getItem('item'));

var itemParent = document.getElementById('items');
var leftItems = document.getElementById('leftItems');
var midItems = document.getElementById('midItems');
var rightItems= document.getElementById('rightItems');
// var listHTML = document.getElementById('list');
// var getChart = document.getElementById('chart');
var leftIndex = null;
var midIndex = null;
var rightIndex = null;

//RANDOM NUMBER---------------------------------------------------------------------------------------------------------------------------
var currentPic = []; // this
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

  currentPic = [leftIndex, midIndex,rightIndex];

}


//Total Voting round-----------------------------------------------------------------------------------------------------------------------
var Totalvotes = 0;
var totalRounds = 10;

//EVENT LISTENER---------------------------------------------------------------------------------------------------------------------------
var handleClickOnItems = function(event){
  event.preventDefault();

  var itemClicked = event.target.id;
  //  console.log(itemClicked);
  if(itemClicked === 'leftItems' || itemClicked === 'rightItems' || itemClicked === 'midItems'){
    Totalvotes++;

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
function endRounds (){
  console.log(Totalvotes, totalRounds);
  if(Totalvotes === totalRounds){
    itemParent.removeEventListener('click', handleClickOnItems);
    alert('Thanks for voting!');
    generateChart();
  }
  else{
    renderItems();
  } updateStorage();
  console.log('number of clicks');
}


//CHART------------------------------------------------------------------------------------------------------------------------------
function generateChart() {
  // getChart.textContent= '';
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
          backgroundColor: ['Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', ],
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
    // var ctx = document.getElementById('chart').getContext('2d');

    // // eslint-disable-next-line no-undef
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: labelData,
    //     datasets: [{
    //       label: '# of Clicks',
    //       data: clickData,
    //       backgroundColor: ['Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', 'Red', ],
    //     }, {
    //       label: '# of Views',
    //       data: viewData,
    //       backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue'],
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
  }}


// ITEMS ARRAY---------------------------------------------------------------------------------------------------------------------


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

function updateStorage () {
  var arrayItems = JSON.stringify(allItems);
  localStorage.setItem('item', arrayItems);

}

function getItems(){
  if(localStorage.length > 0){
    var itemObjects = localStorage.getItem('item');
    var dataItems = JSON.parse(itemObjects);
    allItems = dataItems;
  }
  renderItems();
}

// Event for Items-----------------------------------------------------------------------------------------------------------
itemParent.addEventListener('click', handleClickOnItems)
;

getItems();


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
