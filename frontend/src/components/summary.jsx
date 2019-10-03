import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Line } from 'react-chartjs-2';

class Summary extends Component {

  isDayEqual(date1, date2) {
    const d = new Date(date2);

    return  date1.getDate() === d.getDate() &&
            date1.getMonth() === d.getMonth() &&
            date1.getFullYear() === d.getFullYear();
  }

  generateLineData(title) {
    const today = new Date();
    const data = this.props.activities.filter(
        a => a.title === title && this.isDayEqual(today, a.datetime)
      ).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  
    return data.map((a, idx) => {
      const tmp_date = new Date(a.datetime);
      let hours = tmp_date.getHours() + Math.round(tmp_date.getMinutes() / 60);

      return ({
        x: hours,
        y: idx + 1
      });
    });
  }

  render() {
    const pee = this.generateLineData('Pee');
    const poop = this.generateLineData('Poop');

    const data = {
      labels: [...Array(24).keys()],
      datasets: [{
        data: pee,
        label: 'Pee',
        fill: false,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderColor: 'rgba(255, 0, 0, 0.3)',
      }, {
        data: poop,
        label: 'Poop',
        fill: false,
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        borderColor: 'rgba(0, 255, 0, 0.3)',
      }],
    };

    const options = {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Hours'
          },
        }],
        yAxes: [{
          ticks: {
            precision: 0
          },
          scaleLabel: {
            display: true,
            labelString: 'Total count today'
          },
        }]
      }
    }

    return (
      <Card className="summary-chart">
        <Line data={data} options={options}></Line>
      </Card>
    );
  }
}

export default Summary;
