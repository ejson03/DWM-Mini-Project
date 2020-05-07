const lineOptions = {
    scales: {
      xAxes: [{
        gridLines: {
          display: true,
        },
      }],
      yAxes: [{
        gridLines: {
          display: true,
        }
      }],
    },
    legend: {
      display: true,
    },
    tooltips: {
      enabled: false,
    },

};
  
  
const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

var dataset = {
    fill: false,
    lineTension: 0.1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10
}

const style = {
  marginRight : '20px',
  width: '30%',
  height: '15%'
}

export {lineOptions};
export {styles};
export {dataset};
export {style};


  