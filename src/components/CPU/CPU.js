import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getRelativePosition, log10 } from 'chart.js/helpers';

const CPU = ({data}) => {
    const [chartData, setChartData] = useState(data);
    const chartRef = useRef(null);
    console.log(data);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00sec', '10sec', '20s ec', '30sec', '40sec', '50sec', 'July'],
        datasets: [
          {
            label: 'CPU',
            data: data,
            fill: false,
            borderColor: 'white',
            backgroundColor: 'grey',
            tension: 0.1
          }
        ]
      },
      options: {
            plugins: {
                legend: {
                    display: false,
                    
                }
            },
            scales: {
              x: {
                display: false,
                grid: {
                  display: false
                  
                },
                
              },
              y: {
                display: false,
                grid: {
                  display: false,
                  color: 'grey'
                },
                color: 'black'
              }
            },
            
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} style={{ height: '50px' }} />;
};

export default CPU;
