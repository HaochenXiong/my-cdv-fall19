let data = [

    {
        "timestamp": "2019-09-09T14:52:29.066Z",
        "The Chinese Food": 5,
        "The Halal Food": 8,
        "The Western Food": 5,
        "The Salad Bar": 5,
        "The Breakfast Area": 5,
        "The Sandwich Area": 7
    },
    {
        "timestamp": "2019-09-09T14:53:51.465Z",
        "The Chinese Food": 7,
        "The Halal Food": 9,
        "The Western Food": 2,
        "The Salad Bar": 6,
        "The Breakfast Area": 6,
        "The Sandwich Area": 6
    },
    {
        "timestamp": "2019-09-09T14:56:37.756Z",
        "The Chinese Food": 4,
        "The Halal Food": 7,
        "The Western Food": 2,
        "The Salad Bar": 1,
        "The Breakfast Area": 5,
        "The Sandwich Area": 10
    },
    {
        "timestamp": "2019-09-09T15:08:25.453Z",
        "The Chinese Food": 5,
        "The Halal Food": 7,
        "The Western Food": 7,
        "The Salad Bar": 3,
        "The Breakfast Area": 5,
        "The Sandwich Area": 6
    },
    {
        "timestamp": "2019-09-09T15:10:42.885Z",
        "The Chinese Food": 1,
        "The Halal Food": 6,
        "The Western Food": 5,
        "The Salad Bar": 3,
        "The Breakfast Area": 1,
        "The Sandwich Area": 2
    },
    {
        "timestamp": "2019-09-09T15:19:59.995Z",
        "The Chinese Food": 3,
        "The Halal Food": 8,
        "The Western Food": 6,
        "The Salad Bar": 5,
        "The Breakfast Area": 7,
        "The Sandwich Area": 4
    },
    {
        "timestamp": "2019-09-09T16:24:19.799Z",
        "The Chinese Food": 3,
        "The Halal Food": 7,
        "The Western Food": 7,
        "The Salad Bar": 3,
        "The Breakfast Area": 5,
        "The Sandwich Area": 9
    },
    {
        "timestamp": "2019-09-10T00:21:03.061Z",
        "The Chinese Food": 6,
        "The Halal Food": 9,
        "The Western Food": 4,
        "The Salad Bar": 6,
        "The Breakfast Area": 5,
        "The Sandwich Area": 8
    },
    {
        "timestamp": "2019-09-10T01:25:26.490Z",
        "The Chinese Food": 6,
        "The Halal Food": 9,
        "The Western Food": 5,
        "The Salad Bar": 3,
        "The Breakfast Area": 4,
        "The Sandwich Area": 8
    },
    {
        "timestamp": "2019-09-10T01:31:54.561Z",
        "The Chinese Food": 5,
        "The Halal Food": 10,
        "The Western Food": 8,
        "The Salad Bar": 5,
        "The Breakfast Area": 7,
        "The Sandwich Area": 7
    }
]

// the function dates a data
// arrayn as an argument
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  let keys = Object.keys(data[ data.length - 1 ]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

let transformedData = averageData(data);

console.log(transformedData);


for (var i = 0; i < transformedData.length; i++) {
    let datapoint = transformedData[i];
    let food = datapoint.name;
    let average = datapoint.average;

    let bar = document.createElement("div");
    bar.className = 'bars';
    bar.style.width = Math.floor(average * 100) + "px";
    let barname = document.createElement("p");
    barname.innerHTML = food;
    barname.className = 'foods';
    bar.appendChild(barname);
    document.body.appendChild(bar);
}
