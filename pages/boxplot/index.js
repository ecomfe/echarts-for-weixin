import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: 'Dispersion of house price\naccording to the number of bedrooms',
      x: 'center',
      y: 10,
      textStyle: {
        color: '#3259B8',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '15%',
      right: '10%',

    },
    xAxis: {
      type: 'category',
      data: ['1 bedroom', '2 bedrooms', '3 bedrooms', '4 bedrooms', '5 bedrooms', '6 bedrooms'],

      nameTextStyle: {
        color: '#3259B8',
        fontSize: 14,

      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#3259B8',
        }
      },
      splitLine: {
        show: false
      }
    },

    yAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#3259B8',
        fontSize: 14,
      },
      axisLabel: {
        formatter: '{value}\nCNY/㎡',
      },
      axisLine: {
        lineStyle: {
          color: '#3259B8',
        }
      },
      splitLine: {
        lineStyle: {
          color: '#A7BAFA',
        },
      }

    },
    series: [{
      name: 'boxplot',
      type: 'boxplot',
      data: [
        [30645,
          53490,
          66640.5,
          89123,
          159949,
        ],
        [19464,
          46454,
          59139,
          83479,
          179440,
        ],
        [16704,
          46041,
          60155,
          86818,
          159980,
        ],
        [21543,
          41619.75,
          58819.5,
          87540,
          159978,
        ],
        [15202,
          35757,
          44721,
          59916.5,
          159825,
        ],
        [22158,
          34754.5,
          49718,
          71637,
          139972,
        ],
      ],
      itemStyle: {
        normal: {
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#F02FC2' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#3EACE5' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          borderWidth: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(240,47,194,0.7)' // 0% 处的颜色
            }, {
              offset: 1,
              color: 'rgba(62,172,299,0.7)' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
        }
      },
      tooltip: {
        formatter: function (param) {
          return [
            'Upper: ' + param.data[5] + ' CNY/㎡',
            'Q3: ' + param.data[4] + ' CNY/㎡',
            'Median: ' + param.data[3] + ' CNY/㎡',
            'Q1: ' + param.data[2] + ' CNY/㎡',
            'Lower: ' + param.data[1] + ' CNY/㎡'
          ].join('<br/>')
        }
      }
    },

    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
