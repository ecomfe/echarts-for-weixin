import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var data = [];

  for (var i = 0; i <= 360; i++) {
    var t = i / 180 * Math.PI;
    var r = Math.sin(2 * t) * Math.cos(2 * t);
    data.push([r, i]);
  }

  var option = {
    title: {
      text: '2014年中国耕地质量',
      left: 'center',
      textStyle: {

        color: '#1a1b4e',

        fontStyle: 'normal',

        fontSize: 24
      },
      subtext: '数据来源：国土资源部'
    },
    tooltip: {
      formatter: '{b}:<br />耕地面积： {c}万公顷'
    },
    series: [{
      name: '耕地等级',
      type: 'treemap',
      visibleMin: 100,
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{b}"
          },
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      label: {
        normal: {
          fontSize: 14
        }
      },
      data: [ // 注意，最外层是一个数组，而非从某个根节点开始。
        {
          value: 13509.74,
          children: [{
            value: 2389.25, // value字段的值，对应到面积大小。
            // 也可以是数组，如 [2323, 43, 55]，则数组第一项对应到面积大小。
            // 数组其他项可以用于额外的视觉映射，详情参见 series-treemp.levels。
            id: 'someid-1', // id 不是必须设置的。
            // 但是如果想使用 API 来改变某个节点，需要用 id 来定位。
            name: '低等地  17.69%', // 显示在矩形中的描述文字。
            children: [{
              value: 1125.5,
              id: 'someid-31',
              name: '13等地',
            }, {
              value: 765.63,
              id: 'someid-32',
              name: '14等地',
            }, {
              value: 498.12,
              id: 'someid-33',
              name: '15等地',
            },],
            label: { // 此节点特殊的 label 定义（如果需要的话）。
              // ...         // label的格式参见 series-treemap.label。
            },
            itemStyle: { // 此节点特殊的 itemStyle 定义（如果需要的话）。
              // ...         // label的格式参见 series-treemap.itemStyle。
            }
          }, {
            value: 7138.52,
            id: 'someid-2',
            name: '中等地  52.84%',
            children: [{
              value: 1410.69,
              id: 'someid-31',
              name: '9等地',
            }, {
              value: 1790.55,
              id: 'someid-32',
              name: '10等地',
            }, {
              value: 2045.43,
              id: 'someid-33',
              name: '11等地',
            }, {
              value: 1891.85,
              id: 'someid-34',
              name: '12等地',
            },],

          }, {
            value: 3584.6,
            id: 'someid-3',
            name: '高等地  26.53%',
            children: [{
              value: 366.48,
              id: 'someid-31',
              name: '5等地',
            }, {
              value: 886.22,
              id: 'someid-32',
              name: '6等地',
            }, {
              value: 1143.89,
              id: 'someid-33',
              name: '7等地',
            }, {
              value: 1188.01,
              id: 'someid-34',
              name: '8等地',
            },],

          }, {
            value: 397.38,
            id: 'someid-4',
            name: '优等地  2.94%',
            children: [{
              value: 48.84,
              id: 'someid-31',
              name: '1等地',
            }, {
              value: 59.93,
              id: 'someid-32',
              name: '2等地',
            }, {
              value: 115.85,
              id: 'someid-33',
              name: '3等地',
            }, {
              value: 172.76,
              id: 'someid-34',
              name: '4等地',
            },],

          }]
        },
      ],
      leafDepth: 2,
      color: ["#FFA54F", "#FF8040", "#FFD39B", "#FF4500"]
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

  onReady() { }
});