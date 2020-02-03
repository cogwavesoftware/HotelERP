import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productstatus',
  templateUrl: './productstatus.component.html',
  styleUrls: ['./productstatus.component.scss']
})
export class ProductstatusComponent implements OnInit {
  public secLineData: any;
  public secOption: any;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.secLineData = secChart('#b71c1c', [10, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 10], 'transparent');
     this.secOption = secBuildOption();        
   }, 75);
  }

}
function secChart(a, b, f) {
  if (f == null) {
    f = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    datasets: [{
      label: '',
      borderColor: a,
      borderWidth: 2,
      hitRadius: 30,
      pointRadius: 2,
      pointHoverRadius: 4,
      pointBorderWidth: 5,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: '#000000',
      pointBorderColor: a,
      pointHoverBackgroundColor: a,
      pointHoverBorderColor: 'transparent',
      fill: true,
      lineTension: 0,
      backgroundColor: f,
      data: b,
    }]
  };
}
function secBuildOption() {
  return {
    title: {
      display: !1
    },
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false,
      yPadding: 10,
      xPadding: 10,
    },
    legend: {
      display: !1,
      labels: {
        usePointStyle: !1
      }
    },
    responsive: !0,
    maintainAspectRatio: !0,
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {
          display: !0,
          labelString: 'Value'
        },
        ticks: {
          beginAtZero: !0
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 12
      }
    },
    layout: {
      padding: {
        left: 30,
        right: 10,
        top: 20,
        bottom: 0
      }
    }
  };
}