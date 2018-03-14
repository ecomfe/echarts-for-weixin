# 在微信小程序中使用 ECharts

本项目是 ECharts 的微信小程序版本，以及使用的示例。

开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。

## 体验示例小程序

在微信中扫描下面的二维码即可体验 ECharts Demo：

![ECharts Demo](img/weixin-app.jpg)

## 使用

Echarts 小程序版，可以通过微信小程序的插件模式使用，在 app.json 的末尾添加如下配置即可使用 Echarts 插件：

```json
"echarts": {
  "version": "1.0.0",
  "provider": "wxee40007e9b62f5d0"
}
```

## 自主构建

如果有必要，可以自主构建 Echarts 插件。

首先，你必须要在公众平台开通小程序插件功能，目前这个功能仅允许企业用户开通。

其次，下载本项目。

把 `project.config.json` 中的 `appid` 替换成在公众平台申请的插件 id，同样在 `miniprogram/app.json` 中的 `plugins.echarts.provider` 替换成同样的插件 id。

`plugin/api` 目录下有一个 `echarts.js`，默认我们会在每次 `echarts-for-weixin` 项目发版的时候替换成最新版的 ECharts。可以自行从 ECharts 项目中下载[最新发布版](https://github.com/ecomfe/echarts/releases)，或者从[官网自定义构建](http://echarts.baidu.com/builder.html)以减小文件大小。

直接替换 `echarts.js` 文件即可完成自主构建插件。

## 创建图表

首先，在 `pages/bar` 目录下新建以下几个文件：`index.js`、 `index.json`、 `index.wxml`、 `index.wxss`。并且在 `app.json` 的 `pages` 中增加 `'pages/bar/index'`。

`index.json` 配置如下：

```json
{
  "usingComponents": {
    "ec-canvas": "plugin://echarts/ec-canvas"
  }
}
```

这一配置的作用是，允许我们在 `pages/bar/index.wxml` 中使用 `<ec-canvas>` 组件。

`index.wxml` 中，我们创建了一个 `<ec-canvas>` 组件，内容如下：

```xml
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

其中 `ec` 是一个我们在 `index.js` 中定义的对象，它使得图表能够在页面加载后被初始化并设置。`index.js` 的结构如下：

```js
const echarts = requirePlugin("echarts");

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  let option = {
    ...
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});
```

这对于所有 ECharts 图表都是通用的，用户只需要修改上面 `option` 的内容，即可改变图表。`option` 的使用方法参见 [ECharts 配置项文档](http://echarts.baidu.com/option.html)。对于不熟悉 ECharts 的用户，可以参见 [5 分钟上手 ECharts](http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts) 教程。

完整的例子请参见 [ecomfe/echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 项目。

## FAQ

### 如何获取图表实例？

`echarts.init` 返回的即为图表实例，可以参考 [pages/bar/index.js](/blob/master/pages/bar/index.js) 的写法。

### 如何延迟加载图表？

参见 `pages/lazyLoad` 的例子，可以在获取数据后再初始化数据。

### 如何在一个页面中加载多个图表？

参见 `pages/multiCharts` 的例子。

### 为什么不支持 Tooltip？

因为 ECharts 中 tooltip 的实现是使用 HTML 渲染的，小程序不支持 DOM 操作，如果要支持的话，需要重新实现基于 Canvas 的 tooltip。这功能的工作量较大，不过用户反馈的需求也很大，所以接下来准备支持，需要等待一定时间。

## 微信版本要求

支持微信版本 >= 6.6.3，对应基础库版本 >= 1.9.93。

调试的时候，需要在微信开发者工具中，将“详情”下的“调试基础库”设为 1.9.91 及以上版本。

发布前，需要在 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 的“设置”页面，将“基础库最低版本设置”设为 1.9.91。当用户微信版本过低的时候，会提示用户更新。

## 暂不支持的功能

ECharts 中的绝大部分功能都支持小程序版本，因此这里仅说明不支持的功能，以及存在的问题。

以下功能尚不支持，如果有相关需求请在 [issue](https://github.com/ecomfe/echarts-for-weixin/issues) 中向我们反馈，对于反馈人数多的需求将优先支持：

* Tooltip
* 图片
* 多个 zlevel 分层

此外，目前还有一些 bug 尚未修复，部分需要小程序团队配合上线支持，但不影响基本的使用。已知的 bug 包括：

* 安卓平台：transform 的问题（会影响关系图边两端的标记位置、旭日图文字位置等）
* iOS 平台：半透明略有变深的问题
* iOS 平台：渐变色出现在定义区域之外的地方

如有其它问题，也欢迎在 [issue](https://github.com/ecomfe/echarts-for-weixin/issues) 中向我们反馈，谢谢！
