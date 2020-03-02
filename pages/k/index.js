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
      text: 'K 线图'
    },
    xAxis: {
      data: ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00']
    },
    yAxis: {},
    series: [{
      type: 'k',
      data: [
        [100, 200, 40, 250],
        [80, 90, 66, 100],
        [90, 40, 33, 110],
        [50, 60, 40, 80],
        [200, 180, 160, 200],
        [100, 200, 40, 250],
        [80, 90, 66, 100]
      ],
      itemStyle: {
        normal: {
          color: '#ff0000',
          color0: '#00ff00',
          borderWidth: 1,
          opacity: 1,
        }
      }
    }]
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
