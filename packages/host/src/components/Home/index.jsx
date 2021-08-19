import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

function Home() {
  return (
    <div style={{paddingTop: 100, backgroundColor: '#97eaa530', height: 'calc(100vh - 40px)', overflow: 'hidden'}}>
      <div
        style={{position: 'relative', height: 'calc(100vh - 100px)', width: 'calc(100vw - 500px)', left: 250}}
      >
        <div style={{position: 'absolute', width: 600, height: 300}}>
          <h3>生命游戏 10s</h3>
          <Bar
            data={{
              labels: ['200', '400', '800'],
              datasets: [
                  {
                    label: 'WASM',
                    data: [316.6, 316.7, 201.1],
                    backgroundColor: [
                      'rgba(95, 7, 150, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(95, 7, 150, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: 'JS',
                    data: [960.1, 987.6, 818.9],
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      // 'rgba(255, 99, 132, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }
              ]
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div style={{position: 'absolute', width: 600, height: 300, top: 400}}>
          <h3>生命游戏 100s</h3>
          <Bar
            data={{
              labels: ['200', '400', '800', '1000'],
              datasets: [
                  {
                    label: 'WASM',
                    data: [3521.5, 6396.5, 4491.3, 2689.6],
                    backgroundColor: [
                      'rgba(95, 7, 150, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(95, 7, 150, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: 'JS',
                    data: [11091.8, 19514, 14366.3, 8634.2],
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      // 'rgba(255, 99, 132, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }
              ]
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div style={{position: 'absolute', width: 600, height: 300, left: 700}}>
          <h3>最短路径合并执行</h3>
          <Bar
            data={{
              labels: ['200', '400', '800'],
              datasets: [
                  {
                    label: 'WASM',
                    data: [51.2, 282, 1859],
                    backgroundColor: [
                      'rgba(95, 7, 150, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(95, 7, 150, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: 'JS',
                    data: [64, 300, 1877],
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      // 'rgba(255, 99, 132, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }
              ]
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div style={{position: 'absolute', width: 600, height: 300, left: 700, top: 400}}>
          <h3>最短路径单步执行</h3>
          <Bar
            data={{
              labels: ['200', '400', '800'],
              datasets: [
                  {
                    label: 'WASM',
                    data: [49.4, 326.7, 2391.5],
                    backgroundColor: [
                      'rgba(95, 7, 150, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(95, 7, 150, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                  {
                    label: 'JS',
                    data: [53.5, 337.6, 2680],
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.2)',
                      // 'rgba(54, 162, 235, 0.2)',
                      // 'rgba(255, 206, 86, 0.2)',
                      // 'rgba(75, 192, 192, 0.2)',
                      // 'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      // 'rgba(255, 99, 132, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)',
                      // 'rgba(75, 192, 192, 1)',
                      // 'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  }
              ]
            }}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
