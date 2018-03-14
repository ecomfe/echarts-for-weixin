var WxCanvas = require("../../api/wx-canvas");
var echarts = require("../../api/echarts");
Component({
  properties: {
    canvasId: {
      type: String,
      value: "ec-canvas"
    },

    ec: {
      type: Object
    },
    abc: {
      type: null
    },
    reload: {
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      observer: function(newVal, oldVal) {
        this.init();
      }
    }
  },

  data: {},

  ready: function() {
    if (!this.data.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
          'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!this.data.ec.lazyLoad) {
      this.init();
    }
  },

  methods: {
    init: function(callback) {
      const ctx = wx.createCanvasContext(this.data.canvasId, this);

      const canvas = new WxCanvas(ctx);
      echarts.setCanvasCreator(() => {
        return canvas;
      });

      var query = wx.createSelectorQuery().in(this);

      query
        .select(".ec-canvas")
        .boundingClientRect(res => {
          if (typeof callback === "function") {
            this.chart = callback(canvas, res.width, res.height);
          } else if (this.data.ec && this.data.ec.onInit) {
            this.chart = this.data.ec.onInit(canvas, res.width, res.height);
          }
        })
        .exec();
    },

    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch("mousedown", {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        this.chart._zr.handler.dispatch("mouseup", {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch("click", {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    }
  }
});
