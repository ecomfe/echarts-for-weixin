import WxCanvas from './wx-canvas';
import * as echarts from './echarts';

Component({
  properties: {
    canvasId: {
      type: String,
      value: 'ec-canvas'
    },

    ec: {
      type: Object
    }
  },

  data: {

  },

  ready: function () {
    const version = wx.version.version.split('.').map(n => parseInt(n, 10));
    const isValid = version[0] > 1 || (version[0] === 1 && version[1] >= 9)
      || (version[0] === 1 && version [1] === 9 && version[2] >= 91);
    if (!isValid) {
      console.error('This version of Wexin is not supported by ECharts. '
        + 'Please update Wexin with versions after 1.9.91');
      return;
    }

    const ctx = wx.createCanvasContext(this.data.canvasId, this);

    const canvas = new WxCanvas(ctx);

    echarts.setCanvasCreator(() => {
      return canvas;
    });

    var query = wx.createSelectorQuery().in(this);
    query.select('.ec-canvas').boundingClientRect(res => {
      if (this.data.ec && this.data.ec.onInit) {
        this.chart = this.data.ec.onInit(canvas, res.width, res.height);
      }
    }).exec();
  },

  methods: {
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        this.chart._zr.handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    },

    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        this.chart._zr.handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        this.chart._zr.handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
      }
    }
  }
});
