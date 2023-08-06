import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const piePatternSrc = '/img/pie-pattern.jpg';
  const bgPatternSrc = '/img/pie-bg.png';

  var option = {
    backgroundColor: {
      image: bgPatternSrc,
      repeat: 'repeat'
    },
    title: {
      text: '加载图片',
      textStyle: {
        color: '#235894'
      }
    },
    tooltip: {},
    series: [
      {
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        label: {
          fontSize: 18,
          color: '#235894'
        },
        labelLine: {
          lineStyle: {
            color: '#235894'
          }
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        itemStyle: {
          opacity: 0.7,
          color: {
            image: piePatternSrc,
            repeat: 'repeat'
          },
          borderWidth: 3,
          borderColor: '#235894'
        }
      }
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
