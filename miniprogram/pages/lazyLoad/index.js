var echarts = requirePlugin("echarts");

const app = getApp();
let chart = null;
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  const option = {
    color: ["#37a2da", "#32c5e9", "#67e0e3"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ["热度", "正面", "负面"]
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        },
        axisLabel: {
          color: "#666"
        }
      }
    ],
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: [
          "汽车之家",
          "今日头条",
          "百度贴吧",
          "一点资讯",
          "微信",
          "微博",
          "知乎"
        ],
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        },
        axisLabel: {
          color: "#666"
        }
      }
    ],
    series: [
      {
        name: "热度",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "inside"
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: "正面",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: "负面",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "left"
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: res => {
    return {
      title: "ECharts 可以在微信小程序中使用啦！",
      path: "/pages/index/index",
      success: function() {},
      fail: function() {}
    };
  },

  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true,
      onInit(canvas, width, height) {
        chart = initChart(canvas, width, height);
      }
    },
    reload: 0,
    isLoaded: false,
    isDisposed: false
  },
  // 点击按钮后初始化图表
  init: function() {
    this.setData(
      {
        reload: this.data.reload + 1
      },
      () => {
        this.setData({
          isLoaded: true,
          isDisposed: false
        });
      }
    );
  },

  dispose: function() {
    if (chart) {
      chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});
