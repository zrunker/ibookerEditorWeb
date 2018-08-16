# ibookerEditorWeb
书客编辑器Web版，书客编辑器是基于markdown标记语言的一款简易，强大的富文本编辑器。

>作者：邹峰立，微博：zrunker，邮箱：zrunker@yahoo.com，微信公众号：书客创作，个人平台：[www.ibooker.cc](http://www.ibooker.cc)。

>本文选自[书客创作](http://www.ibooker.cc)平台第103篇文章。[阅读原文](http://www.ibooker.cc/article/103/detail) 。

![书客创作](http://upload-images.jianshu.io/upload_images/3480018-5af3bd9b0ac9cf3b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 以下征对书客编辑器v1.0

### 一、简介

书客编辑器是一款基于Markdown标记语言的富文本编辑器，简易界面设置，强大的操作功能，适用于几乎所有写作平台。

### 二、安装使用

书客编辑器安装和使用过程相当简洁，只需要简单的四步就可以完成。

**1、导入文件**

首先要下载相应的文件。

下载书客编辑器Web版文件，找到文件夹中ibookereditor文件，将其导入到你项目的根目录。

下载地址：
[书客编辑器官网](http://editor.ibooker.cc/editor/download)
[Github地址](https://github.com/zrunker/ibookerEditorWeb)

**2、添加布局**
```
<div id="ibooker_editor"></div>
```
需要在body体内添加以上代码。

**3、引入CSS样式**
```
<link rel="stylesheet" rev="stylesheet" href="ibookereditor/css/ibooker_editor_min.css" type="text/css" />
<link rel="stylesheet" rev="stylesheet" href="ibookereditor/css/ibooker_editor_md_min.css" type="text/css"/>
```
在head体引入以上CSS样式。

4、引入JS文件
```
<script type="text/javascript" src="ibookereditor/ibooker-editor-min-1.0.js"></script>
```
最后引入以上JS文件，这样书客编辑器就引入到你的项目当中了。

运行结果样式如下：

![书客编辑器界面](http://upload-images.jianshu.io/upload_images/3480018-918ce1fdd9128243.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 三、常用属性设置

以下是对常用的一些属性进行初始化：通过JS动态操作。
```
<script type="text/javascript">
    window.onload = function() {
        // 初始化书客编辑器
        ibookerEditor.setIbookerEditorOptions({
            isOpenPreview : true, // 否开启预览 true/false
            isHeightFullClient : true, // 编辑器高度是否充满浏览器 true/false
            compileBack : function() { // 预览回调方法 function
                // 获取输入值转义后的Html
                var htmlValue = ibookerEditor.sdConverter.getHtml();
            },
            editorWidth : "100%", // 编辑器的宽度 - 可以设置数字或者百分百
            editorHeight : "100%", // 编辑器的高度 - 可以设置数字或者百分百
            bindTextAreaId : "editor_content", // 绑定输入框ID，默认editor_content
            bindPreviewId : "editor_preview", // 绑定预览框ID，默认editor_preview
            isOpenBoldEvent : true, // 是否开启粗体事件true/false，默认true
            isOpenItalicEvent : true, // 是否开启斜体事件true/false，默认true
            isOpenUnderlineEvent : true, // 是否开启下划线事件true/false，默认true
            isOpenCapitalsEvent : true, // 是否开启单词首字母大写事件true/flase，默认true
            isOpenUppercaseEvent : true, // 是否开启单词转大写事件true/false，默认true
            isOpenLowercaseEvent : true, // 是否开启单词转小写事件true/false，默认true
            isOpenH1Event : true, // 是否开启一级标题事件true/false，默认true
            isOpenH2Event : true, // 是否开启二级标题事件true/false，默认true
            isOpenH3Event : true, // 是否开启三级标题事件true/false，默认true
            isOpenH4Event : true, // 是否开启四级标题事件true/false，默认true
            isOpenH5Event : true, // 是否开启五级标题事件true/false，默认true
            isOpenH6Event : true, // 是否开启六级标题事件true/false，默认true
            isOpenLinkEvent : true, // 是否开启链接事件true/false，默认true
            isOpenQuoteEvent : true, // 是否开启引用事件true/false，默认true
            isOpenCodeEvent : true, // 是否开启代码事件true/false，默认true
            isOpenImgEvent : true, // 是否开启图片事件true/false，默认true
            isOpenOlEvent : true, // 是否开启数字列表事件true/false，默认true
            isOpenUlEvent : true, // 是否开启普通列表事件true/false，默认true
            isOpenUnselectedEvent : true, // 是否开启列表未选中事件true/false，默认true
            isOpenSelectedEvent : true, // 是否开启列表选中事件true/false，默认true
            isOpenTableEvent : true, // 是否开启表格事件true/false，默认true
            isOpenHtmlEvent : true, // 是否开启Html事件true/false，默认true
            isOpenHrEvent : true, // 是否开启分割线事件true/false，默认true
            isOpenUndoEvent : true, // 是否开启撤销事件true/false，默认true
            isOpenRedoEvent : true, // 是否开启重做事件true/false，默认true
            isOpenHelpEvent : true, // 是否开启帮助事件true/false，默认true
            isOpenPreviewEvent : true, // 是否开启预览模式事件true/false，默认true
            isOpenLiveEvent : true, // 是否开启实况模式事件true/false，默认true
            isOpenEditEvent : true, // 是否开启编辑模式事件true/false，默认true
            isOpenZenEvent : true // 是否开启全屏事件true/false，默认true
        });
    };
</script>
```
### 四、其他属性设置

其他属性主要是针对于，书客编辑器顶部工具栏而设置的。

**1、预览相关事件**

- 手动预览
```
var textArea = document.getElementById("editor_content");
var html = ibookerEditor.sdConverter.converToHtml(textArea.value);
document.getElementById("editor_preview").innerHTML = html;
```
- 获取Html
```
var html = ibookerEditor.sdConverter.getHtml();
```
**2、粗体事件**
```
<script type="text/javascript">
    // 设置粗体事件属性
    ibookerEditor.setBoldOptions({
        boldEvent : function () {
            alert("自定义粗体事件处理方法");
        },
        addEventBefore : function () {
            alert("粗体事件之前执行方法");
        },
        addEventAfter : function () {
            alert("粗体事件之后执行方法");
        }
    });
</script>
```
**3、斜体事件**
```
<script type="text/javascript">
    // 设置斜体事件属性
    ibookerEditor.setItalicOptions({
        italicEvent : function () {
            alert("定义斜体事件处理方法");
        },
        addEventBefore : function () {
            alert("斜体事件之前执行方法");
        },
        addEventAfter : function () {
            alert("斜体事件之后执行方法");
        }
    });
</script>
```
**4、删除线事件**
```
<script type="text/javascript">
    // 设置删除线事件属性
    ibookerEditor.setStrikeoutOptions({
        strikeoutEvent : function () {
            alert("定义删除线事件处理方法");
        },
        addEventBefore : function () {
            alert("删除线事件之前执行方法");
        },
        addEventAfter : function () {
            alert("删除线事件之后执行方法");
        }
    });
</script>
```
**5、下划线事件**
```
<script type="text/javascript">
    // 设置下划线事件属性
    ibookerEditor.setUnderlineOptions({
        underlineEvent : function () {
            alert("定义下划线事件处理方法");
        },
        addEventBefore : function () {
            alert("下划线事件之前执行方法");
        },
        addEventAfter : function () {
            alert("下划线事件之后执行方法");
        }
    });
</script>
```
**6、单词首字母大写事件**
```
<script type="text/javascript">
    // 设置单词首字母大写事件属性
    ibookerEditor.setCapitalsOptions({
        capitalsEvent : function () {
            alert("定义单词首字母大写事件处理方法");
        },
        addEventBefore : function () {
            alert("单词首字母大写事件之前执行方法");
        },
        addEventAfter : function () {
            alert("单词首字母大写事件之后执行方法");
        }
    });
</script>
```
**7、单词转大写事件**
```
<script type="text/javascript">
    // 设置单词转大写事件属性
    ibookerEditor.setUppercaseOptions({
        uppercaseEvent : function () {
            alert("定义单词转大写事件处理方法");
        },
        addEventBefore : function () {
            alert("单词转大写事件之前执行方法");
        },
        addEventAfter : function () {
            alert("单词转大写事件之后执行方法");
        }
    });
</script>
```
**8、单词转小写事件**
```
<script type="text/javascript">
    // 设置单词转小写事件属性
    ibookerEditor.setLowercaseOptions({
        lowercaseEvent : function () {
            alert("定义单词转小写事件处理方法");
        },
        addEventBefore : function () {
            alert("单词转小写事件之前执行方法");
        },
        addEventAfter : function () {
            alert("单词转小写事件之后执行方法");
        }
    });
</script>
```
**9、一级标题事件**
```
<script type="text/javascript">
    // 设置一级标题事件属性
    ibookerEditor.setH1Options({
        h1Event : function () {
            alert("定义一级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("一级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("一级标题事件之后执行方法");
        }
    });
</script>
```
**10、二级标题事件**
```
<script type="text/javascript">
    // 设置二级标题事件属性
    ibookerEditor.setH2Options({
        h2Event : function () {
            alert("定义二级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("二级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("二级标题事件之后执行方法");
        }
    });
</script>
```
**11、三级标题事件**
```
<script type="text/javascript">
    // 设置三级标题事件属性
    ibookerEditor.setH3Options({
        h3Event : function () {
            alert("定义三级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("三级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("三级标题事件之后执行方法");
        }
    });
</script>
```
**12、四级标题事件**
```
<script type="text/javascript">
    // 设置四级标题事件属性
     ibookerEditor.setH4Options({
        h4Event : function () {
            alert("定义四级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("四级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("四级标题事件之后执行方法");
        }
    });
</script>
```
**13、五级标题事件**
```
<script type="text/javascript">
    // 设置五级标题事件属性
    ibookerEditor.setH5Options({
        h5Event : function () {
            alert("定义五级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("五级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("五级标题事件之后执行方法");
        }
    });
</script>
```
**14、六级标题事件**
```
<script type="text/javascript">
    // 设置六级标题事件属性
    ibookerEditor.setH6Options({
        h6Event : function () {
            alert("定义六级标题事件处理方法");
        },
        addEventBefore : function () {
            alert("六级标题事件之前执行方法");
        },
        addEventAfter : function () {
            alert("六级标题事件之后执行方法");
        }
    });
</script>
```
**15、链接事件**
```
<script type="text/javascript">
    // 设置链接事件属性
    ibookerEditor.setLinkOptions({
        linkEvent : function () {
            alert("定义链接事件处理方法");
        },
        addEventBefore : function () {
            alert("链接事件之前执行方法");
        },
        addEventAfter : function () {
            alert("链接事件之后执行方法");
        }
    });
</script>
```
**16、引用事件**
```
<script type="text/javascript">
    // 设置引用事件属性
    ibookerEditor.setQuoteOptions({
        quoteEvent : function () {
            alert("定义引用事件处理方法");
        },
        addEventBefore : function () {
            alert("引用事件之前执行方法");
        },
        addEventAfter : function () {
            alert("引用事件之后执行方法");
        }
    });
</script>
```
**17、代码事件**
```
<script type="text/javascript">
    // 设置代码事件属性
    ibookerEditor.setCodeOptions({
        codeEvent : function () {
            alert("定义代码事件处理方法");
        },
        addEventBefore : function () {
            alert("代码事件之前执行方法");
        },
        addEventAfter : function () {
            alert("代码事件之后执行方法");
        }
    });
</script>
```
**18、图片事件**
```
<script type="text/javascript">
    // 设置图片事件属性
    ibookerEditor.setImgOptions({
        imgEvent : function () {
            alert("定义图片事件处理方法");
        },
        addEventBefore : function () {
            alert("图片事件之前执行方法");
        },
        addEventAfter : function () {
            alert("图片事件之后执行方法");
        }
    });
</script>
```
**19、数字列表**
```
<script type="text/javascript">
    // 设置数字列表事件属性
    ibookerEditor.setOlOptions({
        olEvent : function () {
            alert("定义数字列表事件处理方法");
        },
        addEventBefore : function () {
            alert("数字列表事件之前执行方法");
        },
        addEventAfter : function () {
            alert("数字列表事件之后执行方法");
        }
    });
</script>
```
**20、普通列表**
```
<script type="text/javascript">
    // 设置普通列表事件属性
    ibookerEditor.setUlOptions({
        ulEvent : function () {
            alert("定义普通列表事件处理方法");
        },
        addEventBefore : function () {
            alert("普通列表事件之前执行方法");
        },
        addEventAfter : function () {
            alert("普通列表事件之后执行方法");
        }
    });
</script>
```
**21、列表未选中事件**
```
<script type="text/javascript">
    // 设置列表未选中事件属性
    ibookerEditor.setUnselectedOptions({
        unselectedEvent : function () {
            alert("定义列表未选中事件处理方法");
        },
        addEventBefore : function () {
            alert("列表未选中事件之前执行方法");
        },
        addEventAfter : function () {
            alert("列表未选中事件之后执行方法");
        }
    });
</script>
```
**22、列表选中事件**
```
<script type="text/javascript">
    // 设置列表选中事件属性
    ibookerEditor.setSelectedOptions({
        selectedEvent : function () {
            alert("定义列表选中事件处理方法");
        },
        addEventBefore : function () {
            alert("列表选中事件之前执行方法");
        },
        addEventAfter : function () {
            alert("列表选中事件之后执行方法");
        }
    });
</script>
```
**23、表格事件**
```
<script type="text/javascript">
    // 设置表格事件属性
    ibookerEditor.setTableOptions({
        tableEvent : function () {
            alert("定义表格事件处理方法");
        },
        addEventBefore : function () {
            alert("表格事件之前执行方法");
        },
        addEventAfter : function () {
            alert("表格事件之后执行方法");
        }
    });
</script>
```
**24、HTML事件**
```
<script type="text/javascript">
    // 设置Html事件属性
    ibookerEditor.setHtmlOptions({
        htmlEvent : function () {
            alert("定义Html事件处理方法");
        },
        addEventBefore : function () {
            alert("Html事件之前执行方法");
        },
        addEventAfter : function () {
            alert("Html事件之后执行方法");
        }
    });
</script>
```
**25、分割线事件**
```
<script type="text/javascript">
    // 设置分割线事件属性
    ibookerEditor.setHrOptions({
        hrEvent : function () {
            alert("定义分割线事件处理方法");
        },
        addEventBefore : function () {
            alert("分割线事件之前执行方法");
        },
        addEventAfter : function () {
            alert("分割线事件之后执行方法");
        }
    });
</script>
```
**26、撤销事件**
```
<script type="text/javascript">
    // 设置撤销事件属性
    ibookerEditor.setUndoOptions({
        undoEvent : function () {
            alert("定义撤销事件处理方法");
        },
        addEventBefore : function () {
            alert("撤销事件之前执行方法");
        },
        addEventAfter : function () {
            alert("撤销事件之后执行方法");
        }
    });
</script>
```
**27、重做事件**
```
<script type="text/javascript">
    // 设置重做事件属性
    ibookerEditor.setRedoOptions({
        redoEvent : function () {
            alert("定义重做事件处理方法");
        },
        addEventBefore : function () {
            alert("重做事件之前执行方法");
        },
        addEventAfter : function () {
            alert("重做事件之后执行方法");
        }
    });
</script>
```
**28、预览模式事件**
```
<script type="text/javascript">
    // 设置预览事件属性
    ibookerEditor.setPreviewOptions({
        previewEvent : function () {
            alert("定义预览事件处理方法");
        },
        addEventBefore : function () {
            alert("预览事件之前执行方法");
        },
        addEventAfter : function () {
            alert("预览事件之后执行方法");
        }
    });
</script>
```
**29、实况模式事件**
```
<script type="text/javascript">
    // 设置实况事件属性
    ibookerEditor.setLiveOptions({
        liveEvent : function () {
            alert("定义实况事件处理方法");
        },
        addEventBefore : function () {
            alert("实况事件之前执行方法");
        },
        addEventAfter : function () {
            alert("实况事件之后执行方法");
        }
    });
</script>
```
**30、编辑模式事件**
```
<script type="text/javascript">
    // 设置编辑事件属性
    ibookerEditor.setEditOptions({
        editEvent : function () {
            alert("定义编辑事件处理方法");
        },
        addEventBefore : function () {
            alert("编辑事件之前执行方法");
        },
        addEventAfter : function () {
            alert("编辑事件之后执行方法");
        }
    });
</script>
```
**31、全屏事件**
```
<script type="text/javascript">
    // 设置全屏事件
    ibookerEditor.setZenOptions({
        zenEvent : function () {
            alert("定义全屏事件处理方法");
        },
        addEventBefore : function () {
            alert("全屏事件之前执行方法");
        },
        addEventAfter : function () {
            alert("全屏事件之后执行方法");
        }
    });
</script>
```
### 五、修改样式

对于书客编辑器修改样式有两种方式。

**1、修改CSS文件**

通过浏览器的编译状态，查看书客编辑器Web版v1.0的HTML布局代码，这时候可以发现界面自动生成一个在id为ibooker_editor的Div标签，这个Div标签中添加了以下代码：

![书客编辑器HTML](http://upload-images.jianshu.io/upload_images/3480018-2708e5b8e80b97da.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这些代码就是自动生成书客编辑器Web版界面的代码。而要修改书客编辑器样式，就可以通过修改这些布局代码的CSS样式。其中与布局相对应的CSS样式文件为：

```
<link rel="stylesheet" rev="stylesheet" href="ibookereditor/css/ibooker_editor.css" type="text/css" />
<link rel="stylesheet" rev="stylesheet" href="ibookereditor/css/ibooker_editor_min.css" type="text/css" />
```
所以在不改变书客编辑器Web版整体布局的情况下，可以通过修改局部对应的CSS样式文件ibooker_editor.css。

**2、自定义布局**

自定义布局的意思是，摒弃掉书客编辑器Web版提供的布局，自己写一个布局，然后调用书客编辑器Web版提供的相应方法来实现。

具体的每一个事件的调用方式可以查看[书客编辑器Web版工具栏的使用](http://editor.ibooker.cc/editor/web/tools)。

[Github地址](https://github.com/zrunker/ibookerEditorWeb/)
[阅读原文](http://www.ibooker.cc/article/103/detail) 

----------
![微信公众号：书客创作](https://upload-images.jianshu.io/upload_images/3480018-71d1cde5c687b118.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
