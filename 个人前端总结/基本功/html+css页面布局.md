# HTML+CSS页面布局

## 1.几种页面布局的方式

#### A.静态布局

传统的页面布局方式

#### B.流式布局

页面元素以百分比的形式设置，元素宽高能够按照屏幕分辨率适应调整，但整体的布局不变

#### C.自适应布局

应用媒体查询@media针对不同尺寸和分辨率的设备设置不同的样式，就相当于创建了多个静态布局，每一个静态布局对应一个尺寸范围的屏幕。但对于同一个设备而言还是静态布局。

#### D.弹性布局

弹性布局又称盒子布局或flex布局。给父容器添加display:flex/inline-flex;属性，即可使容器内容采用弹性布局显示，而不遵循常规文档流的显示方式；**设为flex布局以后，子元素的float，clear，vertical-align属性将失效！**

容器最核心的6个属性：

flex-direction,flex-wrap,flex-flow,justify-content,align-items,align-content

项目的6个核心属性：

order，flex-grow，flex-shrink，flex-basis，flex，align-self

#### E.响应式布局

响应式布局就是实现不同屏幕分辨率的终端上浏览网页的不同展示方式。响应式网页设计就是一个网站能够兼容多个终端-而不是为每个终端做一个特定的版本

I.设置meta标签

II.使用媒体查询和flex设置样式

III.使用rem单位设置font-size

IV.使用max-width设置图片样式

### 应用说明：

- 如果只做pc端，那么静态布局（定宽度）是最好的选择；
- 如果做移动端，且设计对高度和元素间距要求不高，那么弹性布局（rem）是最好的选择；
- 如果pc，移动要兼容，而且要求很高那么响应式布局还是最好的选择，前提是设计根据不同的高宽做不同的设计，响应式根据媒体查询做不同的布局。



## 2.怎么样让一个不定宽高的div，垂直水平居中

#### A.使用css方法

父盒子设置：display: table-cell;text-align:center;vertical-align: middle;

子盒子设置：display: inlink-block;vertical-align: middle;

#### B.使用C3transform

父盒子设置：display: relative;

子盒子设置： transform: translate(-50%, -50%); position: absolute;top: 50%; left: 50%;



## 3.清除浮动的几种方式？

##### A.父级div定义height

原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。简单、代码少、容易掌握，但只适用于高度固定的布局。

##### B.结尾处加空div标签 clear:both;

##### C.父级div定义伪类： after和zoom

```html
.clear: after{
	content: '';
	display: block;
	visibility: hidden;
	height: 0;
	line-height: 0;
	clear: both;
}
.clearfix{zoom:1};
```

原理： IE8以上和非IE浏览器才支持： after，zoom(IE转有属性)可解决IE6，IE7浮动问题，推荐使用，建议定义公共类，以减少CSS代码

##### D.父级div定义： overflow:  hidden;

超出盒子部分会被隐藏，不推荐使用。

##### E.双伪元素法：

```html
.clearfix: before, .clearfix: after {
	content: '';
	display: block;
	clear: both;
}
.clearfix{
	zoom: 1;
}
```



