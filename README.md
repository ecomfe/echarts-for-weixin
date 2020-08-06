# 在微信小程序中使用 Apache ECharts (incubating)

本项目是 [Apache ECharts (incubating)](https://github.com/apache/incubator-echarts) 的微信小程序版本，以及使用的示例。

开发者可以通过熟悉的 ECharts 配置方式，快速开发图表，满足各种可视化需求。

## 体验示例小程序

在微信中扫描下面的二维码即可体验 ECharts Demo：

![ECharts Demo](img/weixin-app.jpg)

## 下载

为了兼容小程序 Canvas，我们提供了一个小程序的组件，用这种方式可以方便地使用 ECharts。

首先，下载本项目。

其中，`ec-canvas` 是我们提供的组件，其他文件是如何使用该组件的示例。

`ec-canvas` 目录下有一个 `echarts.js`，默认我们会在每次 `echarts-for-weixin` 项目发版的时候替换成最新版的 ECharts。如有必要，可以自行从 ECharts 项目中下载[最新发布版](https://github.com/ecomfe/echarts/releases)，或者从[官网自定义构建](http://echarts.baidu.com/builder.html)以减小文件大小。

## 引入组件

微信小程序的项目创建可以参见[微信公众平台官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/)。

在创建项目之后，可以将下载的 [ecomfe/echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 项目完全替换新建的项目，然后将修改代码；或者仅拷贝 `ec-canvas` 目录到新建的项目下，然后做相应的调整。

如果采用完全替换的方式，需要将 `project.config.json` 中的 `appid` 替换成在公众平台申请的项目 id。`pages` 目录下的每个文件夹是一个页面，可以根据情况删除不需要的页面，并且在 `app.json` 中删除对应页面。

如果仅拷贝 `ec-canvas` 目录，则可以参考 `pages/bar` 目录下的几个文件的写法。下面，我们具体地说明。


## 创建图表

首先，在 `pages/bar` 目录下新建以下几个文件：`index.js`、 `index.json`、 `index.wxml`、 `index.wxss`。并且在 `app.json` 的 `pages` 中增加 `'pages/bar/index'`。

`index.json` 配置如下：

```json
{
  "usingComponents": {
    "ec-canvas": "../../ec-canvas/ec-canvas"
  }
}
```

这一配置的作用是，允许我们在 `pages/bar/index.wxml` 中使用 `<ec-canvas>` 组件。注意路径的相对位置要写对，如果目录结构和本例相同，就应该像上面这样配置。

`index.wxml` 中，我们创建了一个 `<ec-canvas>` 组件，内容如下：

```xml
<view class="container">
  <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

> 注意此处的 `.container`，新建小程序项目后，其中 `app.wxss` 中默认自动生成的此 class 与本 demo 中的可能不一致，导致图表不能正常显示，只显示空白。请注意参考 `app.wxss` 修改样式，保证图表的初始化的时候是有宽度和高度的。

其中 `ec` 是一个我们在 `index.js` 中定义的对象，它使得图表能够在页面加载后被初始化并设置。`index.js` 的结构如下：

```js
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
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

### 如何使用 Tooltip？

目前，本项目已支持 ECharts Tooltip，但是由于 ECharts 相关功能尚未发版，因此需要使用当前本项目中 `ec-canvas/echarts.js`，这个文件包含了可以在微信中使用 Tooltip 的相关代码。目前在 ECharts 官网下载的 `echarts.js` 还不能直接替换使用，等 ECharts 正式发版后即可。

具体使用方法和 ECharts 相同，例子参见 `pages/line/index.js`。

目前一个已知的 bug 是，有些图表的 tooltip 会显示 `<br/>` 而非换行符。这一问题将在之后修复，暂时碰到这一问题时，开发者可以通过在 formatter 中使用 `\n` 作为换行。

### 如何保存为图片？

参见 `pages/saveCanvas` 的例子。

### 文件太大怎么办？

本项目默认提供的 ECharts 文件是最新版本的包含所有组件文件。可以下载不同版本的 [ECharts](https://github.com/apache/incubator-echarts/blob/master/dist/) 进行替换。建议调试时使用未压缩版本，发布时使用压缩版本，否则文件会太大无法发布。

发布时，如果对文件大小要求更高，可以在 [ECharts 在线定制](http://echarts.baidu.com/builder.html)网页下载仅包含必要组件的包，并且选择压缩。

下载的文件放在 `ec-canvas/echarts.js`，**注意一定需要重命名为 `echarts.js`**。

此外，还可考虑使用微信小程序的[分包策略](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/independent.html)

## 微信版本要求

### Canvas 2d 版本要求

最新版的 ECharts 微信小程序支持微信 Canvas 2d，当用户的基础库版本 >= 2.9.0 且没有设置 `force-use-old-canvas="true"` 的情况下，使用新的 Canvas 2d（默认）。

使用新的 Canvas 2d 可以提升渲染性能，解决非同层渲染问题，强烈建议开启

如果仍需使用旧版 Canvas，使用方法如下：

```html
<ec-canvas id="xxx" canvas-id="xxx" ec="{{ ec }}" force-use-old-canvas="true"></ec-canvas>
```

### 最低版本要求

支持微信版本 >= 6.6.3，对应基础库版本 >= 1.9.91。尽可能使用更高版本的基础库版本。

调试的时候，需要在微信开发者工具中，将“详情”下的“调试基础库”设为 1.9.91 及以上版本。

发布前，需要在 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 的“设置”页面，将“基础库最低版本设置”设为 1.9.91。当用户微信版本过低的时候，会提示用户更新。


## 暂不支持的功能

ECharts 中的绝大部分功能都支持小程序版本，因此这里仅说明不支持的功能，以及存在的问题。

以下功能尚不支持，如果有相关需求请在 [issue](https://github.com/ecomfe/echarts-for-weixin/issues) 中向我们反馈，对于反馈人数多的需求将优先支持：

- 图片
- 多个 zlevel 分层

此外，目前还有一些 bug 尚未修复，部分需要小程序团队配合上线支持，但不影响基本的使用。已知的 bug 包括：

- 安卓平台：transform 的问题（会影响关系图边两端的标记位置、旭日图文字位置等）
- iOS 平台：半透明略有变深的问题
- iOS 平台：渐变色出现在定义区域之外的地方

如有其它问题，也欢迎在 [issue](https://github.com/ecomfe/echarts-for-weixin/issues) 中向我们反馈，谢谢！
