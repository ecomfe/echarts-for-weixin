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
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    title: {
      text: 'Graph 简单示例'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          normal: {
            show: true
          }
        },
        // edgeSymbol: ['circle', 'arrow'],
        // edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: [{
          name: '节点1',
          x: 300,
          y: 300,
          itemStyle: {
            color: '#37A2DA'
          }
        }, {
          name: '节点2',
          x: 800,
          y: 300,
          itemStyle: {
            color: '#32C5E9'
          }
        }, {
          name: '节点3',
          x: 550,
          y: 100,
          itemStyle: {
            color: '#9FE6B8'
          }
        }, {
          name: '节点4',
          x: 550,
          y: 500,
          itemStyle: {
            color: '#FF9F7F'
          }
        }],
        // links: [],
        links: [{
          source: 0,
          target: 1,
          symbolSize: [5, 20],
          label: {
            normal: {
              show: true
            }
          },
          lineStyle: {
            normal: {
              width: 4,
              curveness: 0.2
            }
          }
        }, {
          source: '节点2',
          target: '节点1',
          label: {
            normal: {
              show: true
            }
          },
          lineStyle: {
            normal: { curveness: 0.2 }
          }
        }, {
          source: '节点1',
          target: '节点3'
        }, {
          source: '节点2',
          target: '节点3'
        }, {
          source: '节点2',
          target: '节点4'
        }, {
          source: '节点1',
          target: '节点4'
        }],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
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
