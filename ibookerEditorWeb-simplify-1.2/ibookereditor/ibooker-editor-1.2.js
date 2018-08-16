/**
 * 书客编辑器v1.2 - 基于showdown.js
 * 
 * @author 邹峰立
 */
// 判断字符串是否为数字 
// 判断正整数 /^[1-9]+[0-9]*]*$/ 
function isNumber(value) {
	var reg = /^[0-9]+.?[0-9]*$/;
	return reg.test(value);
};

// 获取事件
function getEvent(){
	if(window.event){return window.event;}
    func = getEvent.caller;
    while(func != null){
        var arg0 = func.arguments[0];
        if(arg0){
            if((arg0.constructor == Event 
            	|| arg0.constructor == MouseEvent
                || arg0.constructor== KeyboardEvent)
                ||(typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)){
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
};

// 阻止冒泡
function cancelBubble() {
    var e = getEvent();
    if(window.event){
        //e.returnValue=false;// 阻止自身行为
        e.cancelBubble=true;// 阻止冒泡
    }else if(e.preventDefault){
        //e.preventDefault();// 阻止自身行为
        e.stopPropagation();// 阻止冒泡
    }
};

// 书客编辑器-相关引用
document.write("<script type='text/javascript' src='ibookereditor/js/showdown.min.js'></script>");

// 编辑器的默认高度和宽度
var ibookerEditorHeight = 0, ibookerEditorWidth = 0;
// 编辑器的高度是否始终等于浏览器的高度 - 默认是充满浏览器
var isEditorHeightFullClient = true;
// 输入框 / 预览框
var editorC, editorP;

// 当页面加载完毕时进行加载
if (window.attachEvent) {
	window.attachEvent("onload", init);
} else {
	window.addEventListener("load", init, false);
}

/**
 * 初始化IbookerEditor
 */
function init() {
	// 构建编辑器界面
	ibookerEditor.createView();
	// 初始化输入框和预览框
	initEditorCP();
	// 绑定事件
	bindEvent();
	// 设置是否开启预览
	ibookerEditor.sdConverter.setCanHtmlCompile(true);
	// 重置输入框和浏览框的高度
	setEditorHeight();
}

/**
 * 初始化输入框和预览框
 */
function initEditorCP() {
	// 初始化输入框
	if (editorC == null || editorC == undefined || editorC == "") {
		editorC= document.getElementById("editor_content");
	}
	// 初始化预览框
	if (editorP == null || editorP == undefined || editorP == "") {
		editorP = document.getElementById("editor_preview");
		editorP.setAttribute("class", "ibooker_editor_content");
	}
}

/**
 * 设置输入框/浏览框高度
 */
function setEditorHeight() {
	// 计算对比高度
	var cHeight = 0;
	if (isEditorHeightFullClient) {
		cHeight = document.documentElement.clientHeight;// 浏览器的高度
	} else {
		cHeight = document.getElementById("ibooker_editor").offsetHeight;
	}
	// 设置输入框/浏览框高度
	var wactop = 0;
	if (document.getElementById("ibooker_editor_top")) {
		wactop = document.getElementById("ibooker_editor_top").offsetHeight;
	} else if (document.getElementById("ibooker_editor_tools")) {
		wactop = document.getElementById("ibooker_editor_tools").offsetHeight;
	}
	// 初始化输入框和预览框
	initEditorCP();
	var eheight = cHeight - wactop;
	if (editorC != null && editorC != undefined && editorC != "") {
		editorC.style.height = eheight + "px";
	}
	if (editorP != null && editorP != undefined && editorP != "") {
		editorP.style.height = (eheight - 30) + "px";
	}
	// 计算编辑器的高度/宽度
	if (ibookerEditorHeight <= 0) {
		ibookerEditorHeight = document.getElementById("ibooker_editor").offsetHeight;
	}
	if (ibookerEditorWidth <= 0) {
		ibookerEditorWidth = document.getElementById("ibooker_editor").offsetWidth;
	}
};

/**
 * 绑定事件
 */
function bindEvent() {
	// 初始化输入框和预览框
	initEditorCP();
	// 绑定事件
	if (editorC != null && editorC != undefined && editorC != "") {
		// 粗体
		if (document.getElementById("editor_bold") && !ibookerEditor.isBindToolsEvent.isBindBoldEvent) {
			document.getElementById("editor_bold").onclick = function() {
				ibookerEditor.boldEvent(editorC, null, null, null);
			};
		}
		// 斜体
		if (document.getElementById("editor_italic") && !ibookerEditor.isBindToolsEvent.isBindItalicEvent) {
			document.getElementById("editor_italic").onclick = function() {
				ibookerEditor.italicEvent(editorC, null, null, null);
			};
		}
		// 删除线
		if (document.getElementById("editor_strikeout") && !ibookerEditor.isBindToolsEvent.isBindStrikeoutEvent) {
			document.getElementById("editor_strikeout").onclick = function() {
				ibookerEditor.strikeoutEvent(editorC, null, null, null);
			};
		}
		// 下划线
		if (document.getElementById("editor_underline") && !ibookerEditor.isBindToolsEvent.isBindUnderlineEvent) {
			document.getElementById("editor_underline").onclick = function() {
				ibookerEditor.underlineEvent(editorC, null, null, null);
			};
		}
		// 一级标题
		if (document.getElementById("editor_h1") && !ibookerEditor.isBindToolsEvent.isBindH1Event) {
			document.getElementById("editor_h1").onclick = function() {
				ibookerEditor.h1Event(editorC, null, null, null);
			};
		}
		// 二级标题
		if (document.getElementById("editor_h2") && !ibookerEditor.isBindToolsEvent.isBindH2Event) {
			document.getElementById("editor_h2").onclick = function() {
				ibookerEditor.h2Event(editorC, null, null, null);
			};
		}
		// 三级标题
		if (document.getElementById("editor_h3") && !ibookerEditor.isBindToolsEvent.isBindH3Event) {
			document.getElementById("editor_h3").onclick = function() {
				ibookerEditor.h3Event(editorC, null, null, null);
			};
		}
		// 四级标题
		if (document.getElementById("editor_h4") && !ibookerEditor.isBindToolsEvent.isBindH4Event) {
			document.getElementById("editor_h4").onclick = function() {
				ibookerEditor.h4Event(editorC, null, null, null);
			};
		}
		// 五级标题
		if (document.getElementById("editor_h5") && !ibookerEditor.isBindToolsEvent.isBindH5Event) {
			document.getElementById("editor_h5").onclick = function() {
				ibookerEditor.h5Event(editorC, null, null, null);
			};
		}
		// 六级标题
		if (document.getElementById("editor_h6") && !ibookerEditor.isBindToolsEvent.isBindH6Event) {
			document.getElementById("editor_h6").onclick = function() {
				ibookerEditor.h6Event(editorC, null, null, null);
			};
		}
		// 列表复选框未选中
		if (document.getElementById("editor_unselected") && !ibookerEditor.isBindToolsEvent.isBindUnselectedEvent) {
			document.getElementById("editor_unselected").onclick = function() {
				ibookerEditor.unselectedEvent(editorC, null, null, null);
			};
		}
		// 列表复选框选中
		if (document.getElementById("editor_selected") && !ibookerEditor.isBindToolsEvent.isBindSelectedEvent) {
			document.getElementById("editor_selected").onclick = function() {
				ibookerEditor.selectedEvent(editorC, null, null, null);
			};
		}
		// 表格
		if (document.getElementById("editor_table") && !ibookerEditor.isBindToolsEvent.isBindTableEvent) {
			document.getElementById("editor_table").onclick = function() {
				ibookerEditor.tableEvent(editorC, null, null, null);
			};
		}
		// HTML
		if (document.getElementById("editor_html") && !ibookerEditor.isBindToolsEvent.isBindHtmlEvent) {
			document.getElementById("editor_html").onclick = function() {
				ibookerEditor.htmlEvent(editorC, null, null, null);
			};
		}
		// 超链接
		if (document.getElementById("editor_link") && !ibookerEditor.isBindToolsEvent.isBindLinkEvent) {
			document.getElementById("editor_link").onclick = function() {
				ibookerEditor.linkEvent(editorC, null, null, null);
			};
		}
		// 引用
		if (document.getElementById("editor_quote") && !ibookerEditor.isBindToolsEvent.isBindQuoteEvent) {
			document.getElementById("editor_quote").onclick = function() {
				ibookerEditor.quoteEvent(editorC, null, null, null);
			};
		}
		// 代码
		if (document.getElementById("editor_code") && !ibookerEditor.isBindToolsEvent.isBindCodeEvent) {
			document.getElementById("editor_code").onclick = function() {
				ibookerEditor.codeEvent(editorC, null, null, null);
			};
		}
		// 图片
		if (document.getElementById("editor_img") && !ibookerEditor.isBindToolsEvent.isBindImgEvent) {
			document.getElementById("editor_img").onclick = function() {
				ibookerEditor.imgEvent(editorC, null, null, null);
			};
		}
		// 数字列表
		if (document.getElementById("editor_ol") && !ibookerEditor.isBindToolsEvent.isBindOlEvent) {
			document.getElementById("editor_ol").onclick = function() {
				ibookerEditor.olEvent(editorC, null, null, null);
			};
		}
		// 普通列表
		if (document.getElementById("editor_ul") && !ibookerEditor.isBindToolsEvent.isBindUlEvent) {
			document.getElementById("editor_ul").onclick = function() {
				ibookerEditor.ulEvent(editorC, null, null, null);
			};
		}
		// 字母转大写
		if (document.getElementById("editor_uppercase") && !ibookerEditor.isBindToolsEvent.isBindUppercaseEvent) {
			document.getElementById("editor_uppercase").onclick = function() {
				ibookerEditor.uppercaseEvent(editorC, null, null, null);
			};
		}
		// 字母转小写
		if (document.getElementById("editor_lowercase") && !ibookerEditor.isBindToolsEvent.isBindLowercaseEvent) {
			document.getElementById("editor_lowercase").onclick = function() {
				ibookerEditor.lowercaseEvent(editorC, null, null, null);
			};
		}
		// 单词首字母大写
		if (document.getElementById("editor_capitals") && !ibookerEditor.isBindToolsEvent.isBindCapitalsEvent) {
			document.getElementById("editor_capitals").onclick = function() {
				ibookerEditor.capitalsEvent(editorC, null, null, null);
			};
		}
		// 撤销
		if (document.getElementById("editor_undo") && !ibookerEditor.isBindToolsEvent.isBindUndoEvent) {
			document.getElementById("editor_undo").onclick = function() {
				ibookerEditor.undoEvent(null, null, null);
			};
		}
		// 重做
		if (document.getElementById("editor_redo") && !ibookerEditor.isBindToolsEvent.isBindRedoEvent) {
			document.getElementById("editor_redo").onclick = function() {
				ibookerEditor.redoEvent(null, null, null);
			};
		}
		// 标题
		if (document.getElementById("editor_title")) {
			document.getElementById("editor_title").onclick = function() {
				ibookerEditor.editorEvent.title(editorC);
				// event.stopPropagation();
				cancelBubble();
			};
		}
		// 分割线
		if (document.getElementById("editor_hr") && !ibookerEditor.isBindToolsEvent.isBindHrEvent) {
			document.getElementById("editor_hr").onclick = function() {
				ibookerEditor.hrEvent(editorC, null, null, null);
			};
		}
		// emoji表情
		if (document.getElementById("editor_emoji") && !ibookerEditor.isBindToolsEvent.isBindEmojiEvent) {
			document.getElementById("editor_emoji").onclick = function() {
				ibookerEditor.emojiEvent(editorC, null, null, null);
			};
		}
		// 预览模式
		if (document.getElementById("editor_preview_mod") && !ibookerEditor.isBindToolsEvent.isBindPreviewEvent) {
			document.getElementById("editor_preview_mod").onclick = function() {
				ibookerEditor.previewEvent(editorC, editorP, null, null, null);
			};
		}
		// 编辑模式
		if (document.getElementById("editor_edit_mod") && !ibookerEditor.isBindToolsEvent.isBindEditEvent) {
			document.getElementById("editor_edit_mod").onclick = function() {
				ibookerEditor.editEvent(editorC, editorP, null, null, null);
			};
		}
		// 实况模式
		if (document.getElementById("editor_live_mod") && !ibookerEditor.isBindToolsEvent.isBindLiveEvent) {
			document.getElementById("editor_live_mod").onclick = function() {
				ibookerEditor.liveEvent(editorC, editorP, null, null, null);
			};
		}
		// 全屏显示和退出全屏
		if (document.getElementById("editor_zen_mod") && !ibookerEditor.isBindToolsEvent.isBindZenEvent) {
			document.getElementById("editor_zen_mod").onclick = function() {
				ibookerEditor.zenEvent(null, null, null);
			};
		}
		// textarea的输入事件 - Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
		editorC.oninput = function () {
			ibookerEditor.sdConverter.htmlCompile();
			// event.stopPropagation();
			cancelBubble();
		};
		// textarea的输入事件 - IE
		editorC.onpropertychange = function () {
			ibookerEditor.sdConverter.htmlCompile();
			// event.stopPropagation();
			cancelBubble();
		};
		// 监听键盘事件
//		editorC.onkeydown = function(ev) {// 屏蔽onkeydown
//			// Prevent the default browser action (W3C)
//			if ( ev && ev.preventDefault )
//				ev.preventDefault();
//			else
//				// A shortcut for stoping the browser action in IE
//				window.event.returnValue = false;
//			return false;
//		};
		editorC.onkeyup = function(ev) {// 执行onkeyup
			var currKey = 0, e = ev || event || window.event || arguments.callee.caller.arguments[0];
			currKey = e.keyCode || e.which || e.charCode;
//			var keyName = String.fromCharCode(currKey);
//			alert("按键码: " + currKey + " 字符: " + keyName);
			if (currKey == 13) {// enter键+‘ \n’-分段（两个空格+一个换行符）
				ibookerEditor.editorEvent.newLine(editorC, "  \n");
			} else {
				if (e.shiftKey && e.ctrlKey) {
					switch (currKey) {
						case 65:// Ctrl+Shift+A -触发一级标题按钮点击事件
							document.getElementById("editor_h1").click();
							break;
						case 66:// Ctrl+Shift+B -触发二级标题按钮点击事件
							document.getElementById("editor_h2").click();
							break;
						case 67:// Ctrl+Shift+C -触发三级标题按钮点击事件
							document.getElementById("editor_h3").click();
							break;
						case 68:// Ctrl+Shift+D -触发四级标题按钮点击事件
							document.getElementById("editor_h4").click();
							break;
						case 69:// Ctrl+Shift+E -触发五级标题按钮点击事件
							document.getElementById("editor_h5").click();
							break;
						case 70:// Ctrl+Shift+F -触发六级标题按钮点击事件
							document.getElementById("editor_h6").click();
							break;
						case 75:// Ctrl+Shift+K -触发单词首字母大写按钮点击事件
							document.getElementById("editor_capitals").click();
							break;
						case 72:// Ctrl+Shift+H -触发单词转大写按钮点击事件
							document.getElementById("editor_uppercase").click();
							break;
						case 76:// Ctrl+Shift+L -触发单词转小写按钮点击事件
							document.getElementById("editor_lowercase").click();
							break;
						case 85:// Ctrl+Shift+U -触发普通列表按钮点击事件
							document.getElementById("editor_ul").click();
							break;
						case 79:// Ctrl+Shift+O -触发数字列表按钮点击事件
							document.getElementById("editor_ol").click();
							break;
						default:
							break;
					}
				} else if (e.ctrlKey) {
					switch (currKey) {
						case 66:// Ctrl+B -触发粗体按钮点击事件
							document.getElementById("editor_bold").click();
							break;
						case 73:// Ctrl+I -触发斜体按钮点击事件
							document.getElementById("editor_italic").click();
							break;
						case 83:// Ctrl+S -触发删除线按钮点击事件
							document.getElementById("editor_strikeout").click();
							break;
						case 76:// Ctrl+L -触发链接按钮点击事件
							document.getElementById("editor_link").click();
							break;
						case 81:// Ctrl+Q -触发引用按钮点击事件
							document.getElementById("editor_quote").click();
							break;
						case 75:// Ctrl+K -触发代码按钮点击事件
							document.getElementById("editor_code").click();
							break;
						case 71:// Ctrl+G -触发图片按钮点击事件
							document.getElementById("editor_img").click();
							break;
						case 85:// Ctrl+U -触发下划线按钮点击事件
							document.getElementById("editor_underline").click();
							break;
						case 72:// Ctrl+H -触发Html按钮点击事件
							document.getElementById("editor_html").click();
							break;
						case 77:// Ctrl+M -触发列表未选中按钮点击事件
							document.getElementById("editor_unselected").click();
							break;
						case 78:// Ctrl+N -触发列表选中按钮点击事件
							document.getElementById("editor_selected").click();
							break;
						case 82:// Ctrl+R -触发分割线按钮点击事件
							document.getElementById("editor_hr").click();
							break;
						case 84:// Ctrl+T -触发表格按钮点击事件
							document.getElementById("editor_table").click();
							break;
						case 90:// Ctrl+Z -触发撤销按钮点击事件
							document.getElementById("editor_undo").click();
							break;
						case 89:// Ctrl+Y -触发重做按钮点击事件
							document.getElementById("editor_redo").click();
							break;
						case 69:// Ctrl+E -触发emoji表情按钮点击事件
							document.getElementById("editor_emoji").click();
							break;
						default:
							break;
					}
				}
			}
			// 预览
			ibookerEditor.sdConverter.htmlCompile();
			// event.stopPropagation();
			cancelBubble();
		};
		// 监听页面大小变化
		window.onresize = function(e) {
			if (isFullScreen) {
				var elem = document.getElementById("ibooker_editor");
				// 获取控件自身宽和高
				var mHeight = elem.offsetHeight;
				var mWidth = elem.offsetWidth;
				requestFullScreen(elem, mWidth, mHeight);
			} else {
				// 重置输入框和预览框的高度
				setEditorHeight();
			}
			// 预览
			ibookerEditor.sdConverter.htmlCompile();
			// event.stopPropagation();
			cancelBubble();
		};
	}
};

/**
 * 全屏显示和退出全屏
 */
var isFullScreen = false;
function requestFullScreen(element, mWidth, mHeight) {
	/* 获取页面可视区域的宽度和高度，宽度和页面宽度一样 */
	document.documentElement.style.overflowY = 'hidden';
	var wHeight = document.documentElement.clientHeight;
	var wWidth = document.documentElement.clientWidth;
	if ((wHeight > mHeight || wWidth > mWidth) && !isFullScreen) {
		// 显示全屏
		element.style.height = wHeight + "px";
		element.style.width = wWidth + "px";
		element.style.position = "fixed";
		element.style.top = 0;
		element.style.left = 0;
		element.style.right = 0;
		element.style.bottom = 0;
		element.style.zIndex = 1000;
		document.getElementById("editor_zen_mod").style.backgroundPosition = "-560px 0px";
		document.getElementById("editor_zen_mod").title = "退出全屏";

		isFullScreen = true;
	} else {
		// 退出全屏
		document.documentElement.style.overflowY = 'auto';
		element.style.height = ibookerEditorHeight + "px";
		element.style.width = ibookerEditorWidth + "px";
		element.style.position = "static";
		element.style.top = "auto";
		element.style.left = "auto";
		element.style.right = "auto";
		element.style.bottom = "auto";
		element.style.zIndex = "auto";
		document.getElementById("editor_zen_mod").style.backgroundPosition = "-540px 0px";
		document.getElementById("editor_zen_mod").title = "全屏";

		isFullScreen = false;
	}

	setEditorHeight();
};

/**
 * 创建命名空间ibookerEditor
 */
var ibookerEditor = {};

/**
 * 构建编辑器界面
 */
ibookerEditor.createView = function() {
	var ibookerEditorHtml = "";
	ibookerEditorHtml += "<div id='ibooker_editor_tools'>";
	ibookerEditorHtml += "<ul class='ibooker-editor-mode'>";
	ibookerEditorHtml += "<li class='ibooker-pull-right ibooker_help' title='帮助'><a id='editor_help' class='ibooker-editor-help' href='http://www.ibooker.cc/article/1/detail' target='_blank'></a></li>";
	ibookerEditorHtml += "<li class='ibooker-pull-right' title='预览模式'><a id='editor_preview_mod' class='ibooker-editor-menu-preview'></a></li>";
	ibookerEditorHtml += "<li class='ibooker-pull-right' title='实况模式'><a id='editor_live_mod' class='ibooker-editor-menu-live muted'></a></li>";
	ibookerEditorHtml += "<li class='ibooker-pull-right' title='编辑模式'><a id='editor_edit_mod' class='ibooker-editor-menu-edit'></a></li>";
	ibookerEditorHtml += "<li class='ibooker-pull-right' title='全屏'><a id='editor_zen_mod' class='ibooker-editor-menu-zen'></a></li>";
	ibookerEditorHtml += "</ul>";
	ibookerEditorHtml += "<ul class='ibooker-editor-menu'>";
	ibookerEditorHtml += "<li title='加粗 <strong> Ctrl+B'><a id='editor_bold' class='ibooker-editor-menu-bold'></a></li>";
	ibookerEditorHtml += "<li title='斜体 <em> Ctrl+I'><a id='editor_italic' class='ibooker-editor-menu-italic'></a></li>";
	ibookerEditorHtml += "<li title='删除线 <del> Ctrl+S'><a id='editor_strikeout' class='ibooker-editor-menu-strikeout'></a></li>";
	ibookerEditorHtml += "<li title='下划线 <u> Ctrl+U'><a id='editor_underline' class='ibooker-editor-menu-underline'></a></li>";
	ibookerEditorHtml += "<li title='单词首字母大写 Ctrl+Shift+K'><a id='editor_capitals' class='ibooker-editor-menu-capitals'></a></li>";
	ibookerEditorHtml += "<li title='单词转大写 Ctrl+Shift+H'><a id='editor_uppercase' class='ibooker-editor-menu-uppercase'></a></li>";
	ibookerEditorHtml += "<li title='单词转小写 Ctrl+Shift+L'><a id='editor_lowercase' class='ibooker-editor-menu-lowercase'></a></li>";
	ibookerEditorHtml += "<li title='一级标题 <h1> Ctrl+Shift+A'><a id='editor_h1' class='ibooker-editor-menu-h1'></a></li>";
	ibookerEditorHtml += "<li title='二级标题 <h2> Ctrl+Shift+B'><a id='editor_h2' class='ibooker-editor-menu-h2'></a></li>";
	ibookerEditorHtml += "<li title='三级标题 <h3> Ctrl+Shift+C'><a id='editor_h3' class='ibooker-editor-menu-h3'></a></li>";
	ibookerEditorHtml += "<li title='四级标题 <h4> Ctrl+Shift+D'><a id='editor_h4' class='ibooker-editor-menu-h4'></a></li>";
	ibookerEditorHtml += "<li title='五级标题 <h5> Ctrl+Shift+E'><a id='editor_h5' class='ibooker-editor-menu-h5'></a></li>";
	ibookerEditorHtml += "<li title='六级标题 <h6> Ctrl+Shift+F'><a id='editor_h6' class='ibooker-editor-menu-h6'></a></li>";
	ibookerEditorHtml += "<li title='链接 <a> Ctrl+L'><a id='editor_link' class='ibooker-editor-menu-link'></a></li>";
	ibookerEditorHtml += "<li title='引用 <blockquote> Ctrl+Q'><a id='editor_quote' class='ibooker-editor-menu-quote'></a></li>";
	ibookerEditorHtml += "<li title='代码 <pre><code> Ctrl+K'><a id='editor_code' class='ibooker-editor-menu-code'></a></li>";
	ibookerEditorHtml += "<li title='图片 <img> Ctrl+G'><a id='editor_img' class='ibooker-editor-menu-img'></a></li>";
	ibookerEditorHtml += "<li title='数字列表 <ol> Ctrl+Shift+O'><a id='editor_ol' class='ibooker-editor-menu-ol'></a></li>";
	ibookerEditorHtml += "<li title='普通列表 <ul> Ctrl+Shift+U'><a id='editor_ul' class='ibooker-editor-menu-ul'></a></li>";
	ibookerEditorHtml += "<li title='列表未选中 <check> Ctrl+M'><a id='editor_unselected' class='ibooker-editor-menu-unselected'></a></li>";
	ibookerEditorHtml += "<li title='列表选中 <check> Ctrl+N'><a id='editor_selected' class='ibooker-editor-menu-selected'></a></li>";
	ibookerEditorHtml += "<li title='表格 <table> Ctrl+T'><a id='editor_table' class='ibooker-editor-menu-table'></a></li>";
	ibookerEditorHtml += "<li title='HTML <html> Ctrl+H'><a id='editor_html' class='ibooker-editor-menu-html'></a></li>";
	ibookerEditorHtml += "<li title='分割线 <hr> Ctrl+R'><a id='editor_hr' class='ibooker-editor-menu-hr'></a></li>";
	ibookerEditorHtml += "<li title='表情 <emoji> Ctrl+E'><a id='editor_emoji' class='ibooker-editor-menu-emoji'></a></li>";
	ibookerEditorHtml += "<li title='撤销 - Ctrl+Z'><a id='editor_undo' class='ibooker-editor-menu-undo'></a></li>";
	ibookerEditorHtml += "<li title='重做 - Ctrl+Y'><a id='editor_redo' class='ibooker-editor-menu-redo'></a></li>";
	ibookerEditorHtml += "</ul>";
	ibookerEditorHtml += "</div>";
	ibookerEditorHtml += "<div id='ibooker_editor_area'>";
	ibookerEditorHtml += "<textarea id='editor_content' placeholder='书客编辑，从这里开始！' maxlength='5600000'></textarea>";
	ibookerEditorHtml += "<div id='editor_preview' class='ibooker_editor_content'></div>";
	ibookerEditorHtml += "</div>";
	var ibookerEditorElem = document.getElementById("ibooker_editor");
	if (ibookerEditorElem) {
		ibookerEditorElem.innerHTML = ibookerEditorHtml;
	}
};

/**
 * 设置书客编辑器属性
 * 
 * @param editorOptions - json
 * 1、editorOptions.isOpenPreview 否开启预览 true/false
 * 2、editorOptions.isHeightFullClient 编辑器高度是否充满浏览器 true/false
 * 3、editorOptions.compileBack 预览回调方法 function
 * 4、editorOptions.editorWidth 编辑器的宽度
 * 5、editorOptions.editorHeight 编辑器的高度
 * 6、editorOptions.bindTextAreaId 绑定输入框ID
 * 7、editorOptions.bindPreviewId 绑定预览框ID
 * 8、editorOptions.isOpenBoldEvent 是否开启粗体事件true/false，默认true
 * 9、editorOptions.isOpenItalicEvent 是否开启斜体事件true/false，默认true
 * 10、editorOptions.isOpenUnderlineEvent 是否开启下划线事件true/false，默认true
 * 11、editorOptions.isOpenCapitalsEvent 是否开启单词首字母大写事件true/flase，默认true
 * 12、editorOptions.isOpenUppercaseEvent 是否开启单词转大写事件true/false，默认true
 * 13、editorOptions.isOpenLowercaseEvent 是否开启单词转小写事件true/false，默认true
 * 14、editorOptions.isOpenH1Event 是否开启一级标题事件true/false，默认true
 * 15、editorOptions.isOpenH2Event 是否开启二级标题事件true/false，默认true
 * 16、editorOptions.isOpenH3Event 是否开启三级标题事件true/false，默认true
 * 17、editorOptions.isOpenH4Event 是否开启四级标题事件true/false，默认true
 * 18、editorOptions.isOpenH5Event 是否开启五级标题事件true/false，默认true
 * 19、editorOptions.isOpenH6Event 是否开启六级标题事件true/false，默认true
 * 20、editorOptions.isOpenLinkEvent 是否开启链接事件true/false，默认true
 * 21、editorOptions.isOpenQuoteEvent 是否开启引用事件true/false，默认true
 * 22、editorOptions.isOpenCodeEvent 是否开启代码事件true/false，默认true
 * 23、editorOptions.isOpenImgEvent 是否开启图片事件true/false，默认true
 * 24、editorOptions.isOpenOlEvent 是否开启数字列表事件true/false，默认true
 * 25、editorOptions.isOpenUlEvent 是否开启普通列表事件true/false，默认true
 * 26、editorOptions.isOpenUnselectedEvent 是否开启列表未选中事件true/false，默认true
 * 27、editorOptions.isOpenSelectedEvent 是否开启列表选中事件true/false，默认true
 * 28、editorOptions.isOpenTableEvent 是否开启表格事件true/false，默认true
 * 29、editorOptions.isOpenHtmlEvent 是否开启Html事件true/false，默认true
 * 30、editorOptions.isOpenHrEvent 是否开启分割线事件true/false，默认true
 * 31、editorOptions.isBindEmojiEvent 是否开启emoji表情事件true/false，默认true
 * 32、editorOptions.isOpenUndoEvent 是否开启撤销事件true/false，默认true
 * 33、editorOptions.isOpenRedoEvent 是否开启重做事件true/false，默认true
 * 34、editorOptions.isOpenHelpEvent 是否开启帮助事件true/false，默认true
 * 35、editorOptions.isOpenPreviewEvent 是否开启预览模式事件true/false，默认true
 * 36、editorOptions.isOpenLiveEvent 是否开启实况模式事件true/false，默认true
 * 37、editorOptions.isOpenEditEvent 是否开启编辑模式事件true/false，默认true
 * 38、editorOptions.isOpenZenEvent 是否开启全屏事件true/false，默认true
 */
ibookerEditor.setIbookerEditorOptions = function(editorOptions) {
	if (editorOptions != null && editorOptions != undefined && editorOptions != "") {
		var isOpenPreview = editorOptions.isOpenPreview;
		var isSupportMathJax = editorOptions.isSupportMathJax;
		var isHeightFullClient = editorOptions.isHeightFullClient;
		var compileBack = editorOptions.compileBack;
		var editorWidth = editorOptions.editorWidth;
		var editorHeight = editorOptions.editorHeight;
		var bindTextAreaId = editorOptions.bindTextAreaId;
		var bindPreviewId = editorOptions.bindPreviewId;
		var isOpenBoldEvent = editorOptions.isOpenBoldEvent;
		var isOpenItalicEvent = editorOptions.isOpenItalicEvent;
		var isOpenStrikeoutEvent = editorOptions.isOpenStrikeoutEvent;
		var isOpenUnderlineEvent = editorOptions.isOpenUnderlineEvent;
		var isOpenCapitalsEvent = editorOptions.isOpenCapitalsEvent;
		var isOpenUppercaseEvent = editorOptions.isOpenUppercaseEvent;
		var isOpenLowercaseEvent = editorOptions.isOpenLowercaseEvent;
		var isOpenH1Event = editorOptions.isOpenH1Event;
		var isOpenH2Event = editorOptions.isOpenH2Event;
		var isOpenH3Event = editorOptions.isOpenH3Event;
		var isOpenH4Event = editorOptions.isOpenH4Event;
		var isOpenH5Event = editorOptions.isOpenH5Event;
		var isOpenH6Event = editorOptions.isOpenH6Event;
		var isOpenLinkEvent = editorOptions.isOpenLinkEvent;
		var isOpenQuoteEvent = editorOptions.isOpenQuoteEvent;
		var isOpenCodeEvent = editorOptions.isOpenCodeEvent;
		var isOpenImgEvent = editorOptions.isOpenImgEvent;
		var isOpenOlEvent = editorOptions.isOpenOlEvent;
		var isOpenUlEvent = editorOptions.isOpenUlEvent;
		var isOpenUnselectedEvent = editorOptions.isOpenUnselectedEvent;
		var isOpenSelectedEvent = editorOptions.isOpenSelectedEvent;
		var isOpenTableEvent = editorOptions.isOpenTableEvent;
		var isOpenHtmlEvent = editorOptions.isOpenHtmlEvent;
		var isOpenHrEvent = editorOptions.isOpenHrEvent;
		var isBindEmojiEvent = editorOptions.isBindEmojiEvent;
		var isOpenUndoEvent = editorOptions.isOpenUndoEvent;
		var isOpenRedoEvent = editorOptions.isOpenRedoEvent;
		var isOpenHelpEvent = editorOptions.isOpenHelpEvent;
		var isOpenPreviewEvent = editorOptions.isOpenPreviewEvent;
		var isOpenLiveEvent = editorOptions.isOpenLiveEvent;
		var isOpenEditEvent = editorOptions.isOpenEditEvent;
		var isOpenZenEvent = editorOptions.isOpenZenEvent;

		// 设置是否支持MathJax
		if (isSupportMathJax != null && isSupportMathJax != undefined && isSupportMathJax != ""
			&& (isSupportMathJax == true || isSupportMathJax == "true" || isSupportMathJax == false || isSupportMathJax == "false")) {
			ibookerEditor.sdConverter.setSupportMathJax(isSupportMathJax);
		}

		// 设置是否开启全屏事件
		if (isOpenZenEvent != null && isOpenZenEvent != undefined && isOpenZenEvent != ""
			&& (isOpenZenEvent == false || isOpenZenEvent == "false")) {
			document.getElementById("editor_zen_mod").style.display = "none";
		} else {
			document.getElementById("editor_zen_mod").style.display = "block";
		}

		// 设置是否开启编辑模式事件
		if (isOpenEditEvent != null && isOpenEditEvent != undefined && isOpenEditEvent != ""
			&& (isOpenEditEvent == false || isOpenEditEvent == "false")) {
			document.getElementById("editor_edit_mod").style.display = "none";
		} else {
			document.getElementById("editor_edit_mod").style.display = "block";
		}

		// 设置是否开启实况模式事件
		if (isOpenLiveEvent != null && isOpenLiveEvent != undefined && isOpenLiveEvent != ""
			&& (isOpenLiveEvent == false || isOpenLiveEvent == "false")) {
			document.getElementById("editor_live_mod").style.display = "none";
		} else {
			document.getElementById("editor_live_mod").style.display = "block";
		}

		// 设置是否开启预览事件
		if (isOpenPreviewEvent != null && isOpenPreviewEvent != undefined && isOpenPreviewEvent != ""
			&& (isOpenPreviewEvent == false || isOpenPreviewEvent == "false")) {
			document.getElementById("editor_preview_mod").style.display = "none";
		} else {
			document.getElementById("editor_preview_mod").style.display = "block";
		}

		// 设置是否开启帮助事件
		if (isOpenHelpEvent != null && isOpenHelpEvent != undefined && isOpenHelpEvent != ""
			&& (isOpenHelpEvent == false || isOpenHelpEvent == "false")) {
			document.getElementById("editor_help").style.display = "none";
		} else {
			document.getElementById("editor_help").style.display = "block";
		}

		// 设置是否开启重做事件
		if (isOpenRedoEvent != null && isOpenRedoEvent != undefined && isOpenRedoEvent != ""
			&& (isOpenRedoEvent == false || isOpenRedoEvent == "false")) {
			document.getElementById("editor_redo").style.display = "none";
		} else {
			document.getElementById("editor_redo").style.display = "block";
		}

		// 设置是否开启撤销事件
		if (isOpenUndoEvent != null && isOpenUndoEvent != undefined && isOpenUndoEvent != ""
			&& (isOpenUndoEvent == false || isOpenUndoEvent == "false")) {
			document.getElementById("editor_undo").style.display = "none";
		} else {
			document.getElementById("editor_undo").style.display = "block";
		}

		// 设置是否开启emoji表情事件
		if (isBindEmojiEvent != null && isBindEmojiEvent != undefined && isBindEmojiEvent != ""
			&& (isBindEmojiEvent == false || isBindEmojiEvent == "false")) {
			document.getElementById("editor_emoji").style.display = "none";
		} else {
			document.getElementById("editor_emoji").style.display = "block";
		};

		// 设置是否开启分割线事件
		if (isOpenHrEvent != null && isOpenHrEvent != undefined && isOpenHrEvent != ""
			&& (isOpenHrEvent == false || isOpenHrEvent == "false")) {
			document.getElementById("editor_hr").style.display = "none";
		} else {
			document.getElementById("editor_hr").style.display = "block";
		}

		// 设置是否开启Html事件
		if (isOpenHtmlEvent != null && isOpenHtmlEvent != undefined && isOpenHtmlEvent != ""
			&& (isOpenHtmlEvent == false || isOpenHtmlEvent == "false")) {
			document.getElementById("editor_html").style.display = "none";
		} else {
			document.getElementById("editor_html").style.display = "block";
		}

		// 设置是否开启表格事件
		if (isOpenTableEvent != null && isOpenTableEvent != undefined && isOpenTableEvent != ""
			&& (isOpenTableEvent == false || isOpenTableEvent == "false")) {
			document.getElementById("editor_table").style.display = "none";
		} else {
			document.getElementById("editor_table").style.display = "block";
		}

		// 设置是否开启类别选中事件
		if (isOpenSelectedEvent != null && isOpenSelectedEvent != undefined && isOpenSelectedEvent != ""
			&& (isOpenSelectedEvent == false || isOpenSelectedEvent == "false")) {
			document.getElementById("editor_selected").style.display = "none";
		} else {
			document.getElementById("editor_selected").style.display = "block";
		}

		// 设置是否开启列表未选中事件
		if (isOpenUnselectedEvent != null && isOpenUnselectedEvent != undefined && isOpenUnselectedEvent != ""
			&& (isOpenUnselectedEvent == false || isOpenUnselectedEvent == "false")) {
			document.getElementById("editor_unselected").style.display = "none";
		} else {
			document.getElementById("editor_unselected").style.display = "block";
		}

		// 设置是否开启普通列表事件
		if (isOpenUlEvent != null && isOpenUlEvent != undefined && isOpenUlEvent != ""
			&& (isOpenUlEvent == false || isOpenUlEvent == "false")) {
			document.getElementById("editor_ul").style.display = "none";
		} else {
			document.getElementById("editor_ul").style.display = "block";
		}

		// 设置是否开启数字列表事件
		if (isOpenOlEvent != null && isOpenOlEvent != undefined && isOpenOlEvent != ""
			&& (isOpenOlEvent == false || isOpenOlEvent == "false")) {
			document.getElementById("editor_ol").style.display = "none";
		} else {
			document.getElementById("editor_ol").style.display = "block";
		}

		// 设置是否开启图片事件
		if (isOpenImgEvent != null && isOpenImgEvent != undefined && isOpenImgEvent != ""
			&& (isOpenImgEvent == false || isOpenImgEvent == "false")) {
			document.getElementById("editor_img").style.display = "none";
		} else {
			document.getElementById("editor_img").style.display = "block";
		}

		// 设置是否开启代码事件
		if (isOpenCodeEvent != null && isOpenCodeEvent != undefined && isOpenCodeEvent != ""
			&& (isOpenCodeEvent == false || isOpenCodeEvent == "false")) {
			document.getElementById("editor_code").style.display = "none";
		} else {
			document.getElementById("editor_code").style.display = "block";
		}

		// 设置是否开启引用事件
		if (isOpenQuoteEvent != null && isOpenQuoteEvent != undefined && isOpenQuoteEvent != ""
			&& (isOpenQuoteEvent == false || isOpenQuoteEvent == "false")) {
			document.getElementById("editor_quote").style.display = "none";
		} else {
			document.getElementById("editor_quote").style.display = "block";
		}

		// 设置是否开启链接事件
		if (isOpenLinkEvent != null && isOpenLinkEvent != undefined && isOpenLinkEvent != ""
			&& (isOpenLinkEvent == false || isOpenLinkEvent == "false")) {
			document.getElementById("editor_link").style.display = "none";
		} else {
			document.getElementById("editor_link").style.display = "block";
		}

		// 设置是否开启六级标题事件
		if (isOpenH6Event != null && isOpenH6Event != undefined && isOpenH6Event != ""
			&& (isOpenH6Event == false || isOpenH6Event == "false")) {
			document.getElementById("editor_h6").style.display = "none";
		} else {
			document.getElementById("editor_h6").style.display = "block";
		}

		// 设置是否开启五级标题事件
		if (isOpenH5Event != null && isOpenH5Event != undefined && isOpenH5Event != ""
			&& (isOpenH5Event == false || isOpenH5Event == "false")) {
			document.getElementById("editor_h5").style.display = "none";
		} else {
			document.getElementById("editor_h5").style.display = "block";
		}

		// 设置是否开启四级标题事件
		if (isOpenH4Event != null && isOpenH4Event != undefined && isOpenH4Event != ""
			&& (isOpenH4Event == false || isOpenH4Event == "false")) {
			document.getElementById("editor_h4").style.display = "none";
		} else {
			document.getElementById("editor_h4").style.display = "block";
		}

		// 设置是否开启三级标题事件
		if (isOpenH3Event != null && isOpenH3Event != undefined && isOpenH3Event != ""
			&& (isOpenH3Event == false || isOpenH3Event == "false")) {
			document.getElementById("editor_h3").style.display = "none";
		} else {
			document.getElementById("editor_h3").style.display = "block";
		}

		// 设置是否开启二级标题事件
		if (isOpenH2Event != null && isOpenH2Event != undefined && isOpenH2Event != ""
			&& (isOpenH2Event == false || isOpenH2Event == "false")) {
				document.getElementById("editor_h2").style.display = "none";
			} else {
				document.getElementById("editor_h2").style.display = "block";
			}

		// 设置是否开启一级标题事件
		if (isOpenH1Event != null && isOpenH1Event != undefined && isOpenH1Event != ""
			&& (isOpenH1Event == false || isOpenH1Event == "false")) {
			document.getElementById("editor_h1").style.display = "none";
		} else {
			document.getElementById("editor_h1").style.display = "block";
		}

		// 设置是否开启单词字母转小写事件
		if (isOpenLowercaseEvent != null && isOpenLowercaseEvent != undefined && isOpenLowercaseEvent != ""
			&& (isOpenLowercaseEvent == false || isOpenLowercaseEvent == "false")) {
			document.getElementById("editor_lowercase").style.display = "none";
		} else {
			document.getElementById("editor_lowercase").style.display = "block";
		}

		// 设置是否开启单词字母转大写事件
		if (isOpenUppercaseEvent != null && isOpenUppercaseEvent != undefined && isOpenUppercaseEvent != ""
			&& (isOpenUppercaseEvent == false || isOpenUppercaseEvent == "false")) {
			document.getElementById("editor_uppercase").style.display = "none";
		} else {
			document.getElementById("editor_uppercase").style.display = "block";
		}

		// 设置是否开启单词首字母大写事件
		if (isOpenCapitalsEvent != null && isOpenCapitalsEvent != undefined && isOpenCapitalsEvent != ""
			&& (isOpenCapitalsEvent == false || isOpenCapitalsEvent == "false")) {
			document.getElementById("editor_capitals").style.display = "none";
		} else {
			document.getElementById("editor_capitals").style.display = "block";
		}

		// 设置是否开启下划线
		if (isOpenUnderlineEvent != null && isOpenUnderlineEvent != undefined && isOpenUnderlineEvent != ""
			&& (isOpenUnderlineEvent == false || isOpenUnderlineEvent == "false")) {
			document.getElementById("editor_underline").style.display = "none";
		} else {
			document.getElementById("editor_underline").style.display = "block";
		}

		// 设置是否开启删除线事件
		if (isOpenStrikeoutEvent != null && isOpenStrikeoutEvent != undefined && isOpenStrikeoutEvent != ""
			&& (isOpenStrikeoutEvent == false || isOpenStrikeoutEvent == "false")) {
			document.getElementById("editor_strikeout").style.display = "none";
		} else {
			document.getElementById("editor_strikeout").style.display = "block";
		}

		// 设置是否开启粗体事件
		if (isOpenBoldEvent != null && isOpenBoldEvent != undefined && isOpenBoldEvent != ""
			&& (isOpenBoldEvent == false || isOpenBoldEvent == "false")) {
			document.getElementById("editor_bold").style.display = "none";
		} else {
			document.getElementById("editor_bold").style.display = "block";
		}

		// 是否开启斜体事件
		if (isOpenItalicEvent != null && isOpenItalicEvent != undefined && isOpenItalicEvent != ""
			&& (isOpenItalicEvent == false || isOpenItalicEvent == "false")) {
			document.getElementById("editor_italic").style.display = "none";
		} else {
			document.getElementById("editor_italic").style.display = "block";
		}
		
		// 设置是否开启预览
		if (isOpenPreview != null && isOpenPreview != undefined && isOpenPreview != ""
			&& (isOpenPreview == true || isOpenPreview == "true" || isOpenPreview == false || isOpenPreview == "false")) {
			ibookerEditor.sdConverter.setCanHtmlCompile(isOpenPreview);
		}
		
		// 设置编辑器高度是否充满浏览器
		if (isHeightFullClient != null && isHeightFullClient != undefined 
				&& (isHeightFullClient == true || isHeightFullClient == "true" || isHeightFullClient == false || isHeightFullClient == "false")) {
			// isEditorHeightFullClient赋值
			isEditorHeightFullClient = isHeightFullClient;
			// 重置输入框和浏览框的高度
			setEditorHeight();
		}
		
		// 设置书客编辑器预览回调
		if (compileBack != null && compileBack != undefined && compileBack != "") {
			ibookerEditor.sdConverter.setCompile(compileBack);
		}
		
		// 设置编辑器的宽度 - 注意 % 和 数字的区别    宽度最大不能大于浏览器的宽度
		if (editorWidth != null && editorWidth != undefined && isNumber(editorWidth)) {
			if (editorWidth > 1) {
				var cWidth = document.documentElement.clientWidth;// 浏览器的宽度
				if (cWidth < editorWidth) {
					document.getElementById("ibooker_editor").style.width = cWidth + "px";
				} else {
					document.getElementById("ibooker_editor").style.width = editorWidth + "px";
				}
			} else {
				document.getElementById("ibooker_editor").style.width = editorWidth;
			}
		}
		
		// 设置编辑器的高度 - 注意 % 和 数字的区别
		if (editorHeight != null && editorHeight != undefined && isNumber(editorHeight)) {
			if (editorHeight > 1) {
				document.getElementById("ibooker_editor").style.height = editorHeight + "px";
			} else {
				document.getElementById("ibooker_editor").style.height = editorHeight;
			}
			// isEditorHeightFullClient赋值
			isEditorHeightFullClient = false;
			// 重置输入框和浏览框的高度
			setEditorHeight();
		}
		
		// 设置编辑器的输入框
		if (bindTextAreaId != null && bindTextAreaId != undefined && bindTextAreaId != "") {
			editorC = document.getElementById(bindTextAreaId);
			// 绑定事件
			bindEvent();
			// 重置输入框和浏览框的高度
			setEditorHeight();
		}
		
		// 设置编辑器的预览框
		if (bindPreviewId != null && bindPreviewId != undefined && bindPreviewId != "") {
			editorP = document.getElementById(bindPreviewId);
			editorP.setAttribute("class", "ibooker_editor_content");
			// 绑定事件
			bindEvent();
			// 重置输入框和浏览框的高度
			setEditorHeight();
		}
	}
};

/**
 * 标记对应事件是否绑定，默认为未绑定-false
 */
ibookerEditor.isBindToolsEvent = {
		isBindBoldEvent : false,
		isBindItalicEvent : false,
		isBindStrikeoutEvent : false,
		isBindUnderlineEvent : false,
		isBindCapitalsEvent : false,
		isBindUppercaseEvent : false,
		isBindLowercaseEvent : false,
		isBindH1Event : false,
		isBindH2Event : false,
		isBindH3Event : false,
		isBindH4Event : false,
		isBindH5Event : false,
		isBindH6Event : false,
		isBindLinkEvent : false,
		isBindQuoteEvent : false,
		isBindCodeEvent : false,
		isBindImgEvent : false,
		isBindOlEvent : false,
		isBindUlEvent : false,
		isBindUnselectedEvent : false,
		isBindSelectedEvent : false,
		isBindTableEvent : false,
		isBindHtmlEvent : false,
		isBindHrEvent : false,
		isBindUndoEvent : false,
		isBindRedoEvent : false,
		isBindPreviewEvent : false,
		isBindLiveEvent : false,
		isBindEditEvent : false,
		isBindZenEvent : false
};

/**
 * 粗体事件
 */
ibookerEditor.boldEvent = function(editorC, boldEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义粗体事件处理方法。
	if (boldEvent != null && boldEvent != undefined &&  typeof boldEvent === "function") {
		boldEvent();
	} else {
		ibookerEditor.editorEvent.bold(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 斜体事件
 */
ibookerEditor.italicEvent = function(editorC, italicEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义斜体事件处理方法。
	if (italicEvent != null && italicEvent != undefined &&  typeof italicEvent === "function") {
		italicEvent();
	} else {
		ibookerEditor.editorEvent.italic(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 删除线事件
 */
ibookerEditor.strikeoutEvent = function(editorC, strikeoutEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义删除线事件处理方法。
	if (strikeoutEvent != null && strikeoutEvent != undefined &&  typeof strikeoutEvent === "function") {
		strikeoutEvent();
	} else {
		ibookerEditor.editorEvent.strikethrough(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 下划线事件
 */
ibookerEditor.underlineEvent = function(editorC, underlineEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义下划线事件处理方法。
	if (underlineEvent != null && underlineEvent != undefined &&  typeof underlineEvent === "function") {
		underlineEvent();
	} else {
		ibookerEditor.editorEvent.underline(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 单词首字母大写事件
 */
ibookerEditor.capitalsEvent = function(editorC, capitalsEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义单词首字母大写事件处理方法。
	if (capitalsEvent != null && capitalsEvent != undefined &&  typeof capitalsEvent === "function") {
		capitalsEvent();
	} else {
		ibookerEditor.editorEvent.capitals(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 单词转大写事件
 */
ibookerEditor.uppercaseEvent = function(editorC, uppercaseEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义单词转大写事件处理方法。
	if (uppercaseEvent != null && uppercaseEvent != undefined &&  typeof uppercaseEvent === "function") {
		uppercaseEvent();
	} else {
		ibookerEditor.editorEvent.uppercase(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 单词转小写事件
 */
ibookerEditor.lowercaseEvent = function(editorC, lowercaseEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义单词转小写事件处理方法。
	if (lowercaseEvent != null && lowercaseEvent != undefined &&  typeof lowercaseEvent === "function") {
		lowercaseEvent();
	} else {
		ibookerEditor.editorEvent.lowercase(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 一级标题事件
 */
ibookerEditor.h1Event = function(editorC, h1Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义一级标题事件处理方法。
	if (h1Event != null && h1Event != undefined &&  typeof h1Event === "function") {
		h1Event();
	} else {
		ibookerEditor.editorEvent.h1(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 二级标题
 */
ibookerEditor.h2Event = function(editorC, h2Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义二级标题事件处理方法。
	if (h2Event != null && h2Event != undefined &&  typeof h2Event === "function") {
		h2Event();
	} else {
		ibookerEditor.editorEvent.h2(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 三级标题
 */
ibookerEditor.h3Event = function(editorC, h3Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义三级标题事件处理方法。
	if (h3Event != null && h3Event != undefined &&  typeof h3Event === "function") {
		h3Event();
	} else {
		ibookerEditor.editorEvent.h3(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 四级标题
 */
ibookerEditor.h4Event = function(editorC, h4Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义四级标题事件处理方法。
	if (h4Event != null && h4Event != undefined &&  typeof h4Event === "function") {
		h4Event();
	} else {
		ibookerEditor.editorEvent.h4(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 五级标题
 */
ibookerEditor.h5Event = function(editorC, h5Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义五级标题事件处理方法。
	if (h5Event != null && h5Event != undefined &&  typeof h5Event === "function") {
		h5Event();
	} else {
		ibookerEditor.editorEvent.h5(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 六级标题事件
 */
ibookerEditor.h6Event = function(editorC, h6Event, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义六级标题事件处理方法。
	if (h6Event != null && h6Event != undefined &&  typeof h6Event === "function") {
		h6Event();
	} else {
		ibookerEditor.editorEvent.h6(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 链接事件
 */
ibookerEditor.linkEvent = function(editorC, linkEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义链接事件处理方法。
	if (linkEvent != null && linkEvent != undefined &&  typeof linkEvent === "function") {
		linkEvent();
	} else {
		ibookerEditor.editorEvent.link(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 引用事件
 */
ibookerEditor.quoteEvent = function(editorC, quoteEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义引用事件处理方法。
	if (quoteEvent != null && quoteEvent != undefined &&  typeof quoteEvent === "function") {
		quoteEvent();
	} else {
		ibookerEditor.editorEvent.quote(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 代码事件
 */
ibookerEditor.codeEvent = function(editorC, codeEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义代码事件处理方法。
	if (codeEvent != null && codeEvent != undefined &&  typeof codeEvent === "function") {
		codeEvent();
	} else {
		ibookerEditor.editorEvent.code(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 图片事件
 */
ibookerEditor.imgEvent = function(editorC, imgEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义图片事件处理方法。
	if (imgEvent != null && imgEvent != undefined &&  typeof imgEvent === "function") {
		imgEvent();
	} else {
		ibookerEditor.editorEvent.img(editorC, "图片地址");
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 数字列表
 */
ibookerEditor.olEvent = function(editorC, olEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义数字列表事件处理方法。
	if (olEvent != null && olEvent != undefined &&  typeof olEvent === "function") {
		olEvent();
	} else {
		ibookerEditor.editorEvent.ol(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 普通列表事件
 */
ibookerEditor.ulEvent = function(editorC, ulEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义普通列表事件处理方法。
	if (ulEvent != null && ulEvent != undefined &&  typeof ulEvent === "function") {
		ulEvent();
	} else {
		ibookerEditor.editorEvent.ul(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 列表未选中事件
 */
ibookerEditor.unselectedEvent = function(editorC, unselectedEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义列表未选中事件处理方法。
	if (unselectedEvent != null && unselectedEvent != undefined &&  typeof unselectedEvent === "function") {
		unselectedEvent();
	} else {
		ibookerEditor.editorEvent.tasklistsUnChecked(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 列表选中事件
 */
ibookerEditor.selectedEvent = function(editorC, selectedEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义列表选中事件处理方法。
	if (selectedEvent != null && selectedEvent != undefined &&  typeof selectedEvent === "function") {
		selectedEvent();
	} else {
		ibookerEditor.editorEvent.tasklistsChecked(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 表格事件
 */
ibookerEditor.tableEvent = function(editorC, tableEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义表格事件处理方法。
	if (tableEvent != null && tableEvent != undefined &&  typeof tableEvent === "function") {
		tableEvent();
	} else {
		ibookerEditor.editorEvent.tables(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * Html事件
 */
ibookerEditor.htmlEvent = function(editorC, htmlEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义Html事件处理方法。
	if (htmlEvent != null && htmlEvent != undefined &&  typeof htmlEvent === "function") {
		htmlEvent();
	} else {
		ibookerEditor.editorEvent.html(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 分割线事件
 */
ibookerEditor.hrEvent = function(editorC, hrEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义分割线事件处理方法。
	if (hrEvent != null && hrEvent != undefined &&  typeof hrEvent === "function") {
		hrEvent();
	} else {
		ibookerEditor.editorEvent.hr(editorC);
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * emoji表情事件
 */
ibookerEditor.emojiEvent = function(editorC, emojiEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义表情事件处理方法。
	if (emojiEvent != null && emojiEvent != undefined &&  typeof emojiEvent === "function") {
		emojiEvent();
	} else {
		// emojiDialog显示，并设置回调方法
		ibookerEditorEmojiDailog.showDialog(function(selectTxt) {
			ibookerEditor.editorEvent.addEnd(editorC, selectTxt);
			// 预览
			ibookerEditor.sdConverter.htmlCompile();// 预览
		});
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 撤销事件
 */
ibookerEditor.undoEvent = function(undoEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义撤销事件处理方法。
	if (undoEvent != null && undoEvent != undefined &&  typeof undoEvent === "function") {
		undoEvent();
	} else {
		document.execCommand("undo", false, null);
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 重做事件
 */
ibookerEditor.redoEvent = function(redoEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义重做事件处理方法。
	if (redoEvent != null && redoEvent != undefined &&  typeof redoEvent === "function") {
		redoEvent();
	} else {
		document.execCommand('redo', false, null);
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 预览事件
 */
ibookerEditor.previewEvent = function(editorC, editorP, previewEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义预览事件处理方法。
	if (previewEvent != null && previewEvent != undefined &&  typeof previewEvent === "function") {
		previewEvent();
	} else {
		if (editorC != null && editorC != undefined && editorC != "") {
			editorC.style.display = "none";
		}
		if (editorP != null && editorP != undefined && editorP != "") {
			editorP.style.width = "97%";
			editorP.style.display = "block";
		}
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 实况事件
 */
ibookerEditor.liveEvent = function(editorC, editorP, liveEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义预览事件处理方法。
	if (liveEvent != null && liveEvent != undefined &&  typeof liveEvent === "function") {
		liveEvent();
	} else {
		if (editorC != null && editorC != undefined && editorC != "") {
			editorC.style.display = "block";
			editorC.style.width = "50%";
			editorC.style.borderRight = "1px solid #DEDEDE";
		}
		if (editorP != null && editorP != undefined && editorP != "") {
			editorP.style.display = "block";
			editorP.style.width = "47%";
		}
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 编辑事件
 */
ibookerEditor.editEvent = function(editorC, editorP, editEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义编辑事件处理方法。
	if (editEvent != null && editEvent != undefined &&  typeof editEvent === "function") {
		editEvent();
	} else {
		if (editorC != null && editorC != undefined && editorC != "") {
			editorC.style.display = "block";
			editorC.style.width = "100%";
			editorC.style.borderRight = "none";
		}
		if (editorP != null && editorP != undefined && editorP != "") {
			editorP.style.display = "none";
		}
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 全屏事件
 */
ibookerEditor.zenEvent = function(zenEvent, addEventBefore, addEventAfter) {
	// 执行前
	if (addEventBefore != null && addEventBefore != undefined && typeof addEventBefore === "function") {
		addEventBefore();
	}
	// 定义全屏事件处理方法。
	if (zenEvent != null && zenEvent != undefined &&  typeof zenEvent === "function") {
		zenEvent();
	} else {
		var elem = document.getElementById("ibooker_editor");
		// 获取控件自身宽和高
		var mHeight = elem.offsetHeight;
		var mWidth = elem.offsetWidth;
		requestFullScreen(elem, mWidth, mHeight);
		ibookerEditor.sdConverter.htmlCompile();// 预览
	}
	// 执行后
	if (addEventAfter != null && addEventAfter != undefined && typeof addEventAfter === "function") {
		addEventAfter();
	}
	// event.stopPropagation();
	cancelBubble();
};

/**
 * 粗体事件属性设置
 * 
 * @param boldOptions - json
 * 1、boldEvent  定义粗体事件处理方法。
 * 2、addEventBefore  定义在执行粗体事件之前执行方法。
 * 3、addEventAfter  定义在执行粗体事件之后执行方法。
 */
ibookerEditor.setBoldOptions = function(boldOptions) {
	if (boldOptions != null && boldOptions != undefined && boldOptions != "") {
		var boldEvent = boldOptions.boldEvent;
		if (boldEvent != null && boldEvent != undefined && boldEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindBoldEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindBoldEvent = false;
		}
		var addEventBefore = boldOptions.addEventBefore;
		var addEventAfter = boldOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定粗体事件
		document.getElementById("editor_bold").onclick = function() {
			ibookerEditor.boldEvent(editorC, boldEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 斜体事件属性设置
 * 
 * @param italicOptions - json
 * 1、italicEvent 定义斜体事件处理方法。
 * 2、addEventBefore 定义在执行斜体事件之前执行方法。
 * 3、addEventAfter 定义在执行斜体事件之后执行方法。
 */
ibookerEditor.setItalicOptions = function(italicOptions) {
	if (italicOptions != null && italicOptions != undefined && italicOptions != "") {
		var italicEvent = italicOptions.italicEvent;
		if (italicEvent != null && italicEvent != undefined && italicEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindItalicEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindItalicEvent = false;
		}
		var addEventBefore = italicOptions.addEventBefore;
		var addEventAfter = italicOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定斜体事件
		document.getElementById("editor_italic").onclick = function() {
			ibookerEditor.italicEvent(editorC, italicEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 删除线事件属性设置
 * 
 * @param strikeoutOptions - json
 * 1、strikeoutEvent 定义删除线事件处理方法。
 * 2、addEventBefore 定义在执行删除线事件之前执行方法。
 * 3、addEventAfter 定义在执行删除线事件之后执行方法。
 */
ibookerEditor.setStrikeoutOptions = function(strikeoutOptions) {
	if (strikeoutOptions != null && strikeoutOptions != undefined && strikeoutOptions != "") {
		var strikeoutEvent = strikeoutOptions.strikeoutEvent;
		if (strikeoutEvent != null && strikeoutEvent != undefined && strikeoutEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindStrikeoutEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindStrikeoutEvent = false;
		}
		var addEventBefore = strikeoutOptions.addEventBefore;
		var addEventAfter = strikeoutOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定斜体事件
		document.getElementById("editor_strikeout").onclick = function() {
			ibookerEditor.strikeoutEvent(editorC, strikeoutEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 下划线事件属性设置
 * 
 * @param underlineOptions - json
 * 1、underlineEvent 定义下划线事件处理方法。
 * 2、addEventBefore 定义在执行下划线事件之前执行方法。
 * 3、addEventAfter 定义在执行下划线事件之后执行方法。
 */
ibookerEditor.setUnderlineOptions = function(underlineOptions) {
	if (underlineOptions != null && underlineOptions != undefined && underlineOptions != "") {
		var underlineEvent = underlineOptions.underlineEvent;
		if (underlineEvent != null && underlineEvent != undefined && underlineEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindUnderlineEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindUnderlineEvent = false;
		}
		var addEventBefore = underlineOptions.addEventBefore;
		var addEventAfter = underlineOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定下划线事件
		document.getElementById("editor_underline").onclick = function() {
			ibookerEditor.underlineEvent(editorC, underlineEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 单词首字母大写事件属性设置
 * 
 * @param capitalsOptions - json
 * 1、capitalsEvent 定义单词首字母大写事件处理方法。
 * 2、addEventBefore 定义在执行单词首字母大写事件之前执行方法。
 * 3、addEventAfter 定义在执行单词首字母大写事件之后执行方法。
 */
ibookerEditor.setCapitalsOptions = function(capitalsOptions) {
	if (capitalsOptions != null && capitalsOptions != undefined && capitalsOptions != "") {
		var capitalsEvent = capitalsOptions.capitalsEvent;
		if (capitalsEvent != null && capitalsEvent != undefined && capitalsEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindCapitalsEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindCapitalsEvent = false;
		}
		var addEventBefore = capitalsOptions.addEventBefore;
		var addEventAfter = capitalsOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定单词首字母大写事件
		document.getElementById("editor_capitals").onclick = function() {
			ibookerEditor.capitalsEvent(editorC, capitalsEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 单词转大写事件属性设置
 * 
 * @param uppercaseOptions - json
 * 1、uppercaseEvent 定义单词转大写事件处理方法。
 * 2、addEventBefore 定义在执行单词转大写事件之前执行方法。
 * 3、addEventAfter 定义在执行单词转大写事件之后执行方法。
 */
ibookerEditor.setUppercaseOptions = function(uppercaseOptions) {
	if (uppercaseOptions != null && uppercaseOptions != undefined && uppercaseOptions != "") {
		var uppercaseEvent = uppercaseOptions.uppercaseEvent;
		if (uppercaseEvent != null && uppercaseEvent != undefined && uppercaseEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindUppercaseEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindUppercaseEvent = false;
		}
		var addEventBefore = uppercaseOptions.addEventBefore;
		var addEventAfter = uppercaseOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定单词转大写事件
		document.getElementById("editor_uppercase").onclick = function() {
			ibookerEditor.uppercaseEvent(editorC, uppercaseEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 单词转小写事件属性设置
 * 
 * @param lowercaseOptions - json
 * 1、lowercaseEvent 定义单词转小写事件处理方法。
 * 2、addEventBefore 定义在执行单词转小写事件之前执行方法。
 * 3、addEventAfter 定义在执行单词转小写事件之后执行方法。
 */
ibookerEditor.setLowercaseOptions = function(lowercaseOptions) {
	if (lowercaseOptions != null && lowercaseOptions != undefined && lowercaseOptions != "") {
		var lowercaseEvent = lowercaseOptions.lowercaseEvent;
		if (lowercaseEvent != null && lowercaseEvent != undefined && lowercaseEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindLowercaseEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindLowercaseEvent = false;
		}
		var addEventBefore = lowercaseOptions.addEventBefore;
		var addEventAfter = lowercaseOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定单词转小写事件
		document.getElementById("editor_lowercase").onclick = function() {
			ibookerEditor.lowercaseEvent(editorC, lowercaseEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 一级标题事件属性设置
 * 
 * @param h1Options - json
 * 1、h1Event 定义一级标题事件处理方法。
 * 2、addEventBefore 定义在执行一级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行一级标题事件之后执行方法。
 */
ibookerEditor.setH1Options = function(h1Options) {
	if (h1Options != null && h1Options != undefined && h1Options != "") {
		var h1Event = h1Options.h1Event;
		if (h1Event != null && h1Event != undefined && h1Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH1Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH1Event = false;
		}
		var addEventBefore = h1Options.addEventBefore;
		var addEventAfter = h1Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定一级标题事件
		document.getElementById("editor_h1").onclick = function() {
			ibookerEditor.h1Event(editorC, h1Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 二级标题事件属性设置
 * 
 * @param h2Options - json
 * 1、h2Event 定义二级标题事件处理方法。
 * 2、addEventBefore 定义在执行二级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行二级标题事件之后执行方法。
 */
ibookerEditor.setH2Options = function(h2Options) {
	if (h2Options != null && h2Options != undefined && h2Options != "") {
		var h2Event = h2Options.h2Event;
		if (h2Event != null && h2Event != undefined && h2Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH2Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH2Event = false;
		}
		var addEventBefore = h2Options.addEventBefore;
		var addEventAfter = h2Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定二级标题事件
		document.getElementById("editor_h2").onclick = function() {
			ibookerEditor.h2Event(editorC, h2Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 三级标题事件属性设置
 * 
 * @param h3Options - json
 * 1、h3Event 定义三级标题事件处理方法。
 * 2、addEventBefore 定义在执行三级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行三级标题事件之后执行方法。
 */
ibookerEditor.setH3Options = function(h3Options) {
	if (h3Options != null && h3Options != undefined && h3Options != "") {
		var h3Event = h3Options.h3Event;
		if (h3Event != null && h3Event != undefined && h3Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH3Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH3Event = false;
		}
		var addEventBefore = h3Options.addEventBefore;
		var addEventAfter = h3Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定三级标题事件
		document.getElementById("editor_h3").onclick = function() {
			ibookerEditor.h3Event(editorC, h3Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 四级标题事件属性设置
 * 
 * @param h4Options - json
 * 1、h4Event 定义四级标题事件处理方法。
 * 2、addEventBefore 定义在执行四级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行四级标题事件之后执行方法。
 */
ibookerEditor.setH4Options = function(h4Options) {
	if (h4Options != null && h4Options != undefined && h4Options != "") {
		var h4Event = h4Options.h4Event;
		if (h4Event != null && h4Event != undefined && h4Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH4Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH4Event = false;
		}
		var addEventBefore = h4Options.addEventBefore;
		var addEventAfter = h4Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定四级标题事件
		document.getElementById("editor_h4").onclick = function() {
			ibookerEditor.h4Event(editorC, h4Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 五级标题事件属性设置
 * 
 * @param h5Options - json
 * 1、h5Event 定义五级标题事件处理方法。
 * 2、addEventBefore 定义在执行五级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行五级标题事件之后执行方法。
 */
ibookerEditor.setH5Options = function(h5Options) {
	if (h5Options != null && h5Options != undefined && h5Options != "") {
		var h5Event = h5Options.h5Event;
		if (h5Event != null && h5Event != undefined && h5Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH5Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH5Event = false;
		}
		var addEventBefore = h5Options.addEventBefore;
		var addEventAfter = h5Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定五级标题事件
		document.getElementById("editor_h5").onclick = function() {
			ibookerEditor.h5Event(editorC, h5Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 六级标题事件属性设置
 * 
 * @param h6Options - json
 * 1、h6Event 定义六级标题事件处理方法。
 * 2、addEventBefore 定义在执行六级标题事件之前执行方法。
 * 3、addEventAfter 定义在执行六级标题事件之后执行方法。
 */
ibookerEditor.setH6Options = function(h6Options) {
	if (h6Options != null && h6Options != undefined && h6Options != "") {
		var h6Event = h6Options.h6Event;
		if (h6Event != null && h6Event != undefined && h6Event != "") {
			ibookerEditor.isBindToolsEvent.isBindH6Event = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindH6Event = false;
		}
		var addEventBefore = h6Options.addEventBefore;
		var addEventAfter = h6Options.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定六级标题事件
		document.getElementById("editor_h6").onclick = function() {
			ibookerEditor.h6Event(editorC, h6Event, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 链接事件属性设置
 * 
 * @param linkOptions - json
 * 1、linkEvent 定义链接事件处理方法。
 * 2、addEventBefore 定义在执行链接事件之前执行方法。
 * 3、addEventAfter 定义在执行链接事件之后执行方法。
 */
ibookerEditor.setLinkOptions = function(linkOptions) {
	if (linkOptions != null && linkOptions != undefined && linkOptions != "") {
		var linkEvent = linkOptions.linkEvent;
		if (linkEvent != null && linkEvent != undefined && linkEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindLinkEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindLinkEvent = false;
		}
		var addEventBefore = linkOptions.addEventBefore;
		var addEventAfter = linkOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定链接事件
		document.getElementById("editor_link").onclick = function() {
			ibookerEditor.linkEvent(editorC, linkEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 引用事件属性设置
 * 
 * @param quoteOptions - json
 * 1、quoteEvent 定义引用事件处理方法。
 * 2、addEventBefore 定义在执行引用事件之前执行方法。
 * 3、addEventAfter 定义在执行引用事件之后执行方法。
 */
ibookerEditor.setQuoteOptions = function(quoteOptions) {
	if (quoteOptions != null && quoteOptions != undefined && quoteOptions != "") {
		var quoteEvent = quoteOptions.quoteEvent;
		if (quoteEvent != null && quoteEvent != undefined && quoteEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindQuoteEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindQuoteEvent = false;
		}
		var addEventBefore = quoteOptions.addEventBefore;
		var addEventAfter = quoteOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定引用事件
		document.getElementById("editor_quote").onclick = function() {
			ibookerEditor.quoteEvent(editorC, quoteEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 代码事件属性设置
 * 
 * @param codeOptions - json
 * 1、codeEvent 定义代码事件处理方法。
 * 2、addEventBefore 定义在执行代码事件之前执行方法。
 * 3、addEventAfter 定义在执行代码事件之后执行方法。
 */
ibookerEditor.setCodeOptions = function(codeOptions) {
	if (codeOptions != null && codeOptions != undefined && codeOptions != "") {
		var codeEvent = codeOptions.codeEvent;
		if (codeEvent != null && codeEvent != undefined && codeEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindCodeEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindCodeEvent = false;
		}
		var addEventBefore = codeOptions.addEventBefore;
		var addEventAfter = codeOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定代码事件
		document.getElementById("editor_code").onclick = function() {
			ibookerEditor.codeEvent(editorC, codeEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 图片事件属性设置
 * 
 * @param imgOptions - json
 * 1、imgEvent 定义图片事件处理方法。
 * 2、addEventBefore 定义在执行图片事件之前执行方法。
 * 3、addEventAfter 定义在执行图片事件之后执行方法。
 */
ibookerEditor.setImgOptions = function(imgOptions) {
	if (imgOptions != null && imgOptions != undefined && imgOptions != "") {
		var imgEvent = imgOptions.imgEvent;
		if (imgEvent != null && imgEvent != undefined && imgEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindImgEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindImgEvent = false;
		}
		var addEventBefore = imgOptions.addEventBefore;
		var addEventAfter = imgOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定图片事件
		document.getElementById("editor_img").onclick = function() {
			ibookerEditor.imgEvent(editorC, imgEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 数字列表事件属性设置
 * 
 * @param olOptions - json
 * 1、olEvent 定义数字列表事件处理方法。
 * 2、addEventBefore 定义在执行数字列表事件之前执行方法。
 * 3、addEventAfter 定义在执行数字列表事件之后执行方法。
 */
ibookerEditor.setOlOptions = function(olOptions) {
	if (olOptions != null && olOptions != undefined && olOptions != "") {
		var olEvent = olOptions.olEvent;
		if (olEvent != null && olEvent != undefined && olEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindOlEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindOlEvent = false;
		}
		var addEventBefore = olOptions.addEventBefore;
		var addEventAfter = olOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定数字列表事件
		document.getElementById("editor_ol").onclick = function() {
			ibookerEditor.olEvent(editorC, olEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 普通列表事件属性设置
 * 
 * @param ulOptions - json
 * 1、ulEvent 定义普通列表事件处理方法。
 * 2、addEventBefore 定义在执行普通列表事件之前执行方法。
 * 3、addEventAfter 定义在执行普通列表事件之后执行方法。
 */
ibookerEditor.setUlOptions = function(ulOptions) {
	if (ulOptions != null && ulOptions != undefined && ulOptions != "") {
		var ulEvent = ulOptions.ulEvent;
		if (ulEvent != null && ulEvent != undefined && ulEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindUlEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindUlEvent = false;
		}
		var addEventBefore = ulOptions.addEventBefore;
		var addEventAfter = ulOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定普通列表事件
		document.getElementById("editor_ul").onclick = function() {
			ibookerEditor.ulEvent(editorC, ulEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 列表未选中事件属性设置
 * 
 * @param unselectedOptions - json
 * 1、unselectedEvent 定义列表未选中事件处理方法。
 * 2、addEventBefore 定义在执行列表未选中事件之前执行方法。
 * 3、addEventAfter 定义在执行列表未选中事件之后执行方法。
 */
ibookerEditor.setUnselectedOptions = function(unselectedOptions) {
	if (unselectedOptions != null && unselectedOptions != undefined && unselectedOptions != "") {
		var unselectedEvent = unselectedOptions.unselectedEvent;
		if (unselectedEvent != null && unselectedEvent != undefined && unselectedEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindUnselectedEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindUnselectedEvent = false;
		}
		var addEventBefore = unselectedOptions.addEventBefore;
		var addEventAfter = unselectedOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定列表未选中事件
		document.getElementById("editor_unselected").onclick = function() {
			ibookerEditor.unselectedEvent(editorC, unselectedEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 列表选中事件属性设置
 * 
 * @param selectedOptions - json
 * 1、selectedEvent 定义列表选中事件处理方法。
 * 2、addEventBefore 定义在执行列表选中事件之前执行方法。
 * 3、addEventAfter 定义在执行列表选中事件之后执行方法。
 */
ibookerEditor.setSelectedOptions = function(selectedOptions) {
	if (selectedOptions != null && selectedOptions != undefined && selectedOptions != "") {
		var selectedEvent = selectedOptions.selectedEvent;
		if (selectedEvent != null && selectedEvent != undefined && selectedEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindSelectedEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindSelectedEvent = false;
		}
		var addEventBefore = selectedOptions.addEventBefore;
		var addEventAfter = selectedOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定列表选中事件
		document.getElementById("editor_selected").onclick = function() {
			ibookerEditor.selectedEvent(editorC, selectedEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 表格事件属性设置
 * 
 * @param tableOptions - json
 * 1、tableEvent 定义列表选中事件处理方法。
 * 2、addEventBefore 定义在执行列表选中事件之前执行方法。
 * 3、addEventAfter 定义在执行列表选中事件之后执行方法。
 */
ibookerEditor.setTableOptions = function(tableOptions) {
	if (tableOptions != null && tableOptions != undefined && tableOptions != "") {
		var tableEvent = tableOptions.tableEvent;
		if (tableEvent != null && tableEvent != undefined && tableEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindTableEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindTableEvent = false;
		}
		var addEventBefore = tableOptions.addEventBefore;
		var addEventAfter = tableOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定表格事件
		document.getElementById("editor_table").onclick = function() {
			ibookerEditor.tableEvent(editorC, tableEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * Html事件属性设置
 * 
 * @param htmlOptions - json
 * 1、htmlEvent 定义Html事件处理方法。
 * 2、addEventBefore 定义在执行Html事件之前执行方法。
 * 3、addEventAfter 定义在执行Html事件之后执行方法。
 */
ibookerEditor.setHtmlOptions = function(htmlOptions) {
	if (htmlOptions != null && htmlOptions != undefined && htmlOptions != "") {
		var htmlEvent = htmlOptions.htmlEvent;
		if (htmlEvent != null && htmlEvent != undefined && htmlEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindHtmlEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindHtmlEvent = false;
		}
		var addEventBefore = htmlOptions.addEventBefore;
		var addEventAfter = htmlOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定Html事件
		document.getElementById("editor_html").onclick = function() {
			ibookerEditor.htmlEvent(editorC, htmlEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 分割线事件属性设置
 * 
 * @param hrOptions - json
 * 1、hrEvent 定义分割线事件处理方法。
 * 2、addEventBefore 定义在执行分割线事件之前执行方法。
 * 3、addEventAfter 定义在执行分割线事件之后执行方法。
 */
ibookerEditor.setHrOptions = function(hrOptions) {
	if (hrOptions != null && hrOptions != undefined && hrOptions != "") {
		var hrEvent = hrOptions.hrEvent;
		if (hrEvent != null && hrEvent != undefined && hrEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindHrEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindHrEvent = false;
		}
		var addEventBefore = hrOptions.addEventBefore;
		var addEventAfter = hrOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定分割线事件
		document.getElementById("editor_hr").onclick = function() {
			ibookerEditor.hrEvent(editorC, hrEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * Emoji事件属性设置
 * 
 * @param emojiOptions - json
 * 1、emojiEvent 定义Emoji事件处理方法。
 * 2、addEventBefore 定义在执行撤销事件之前执行方法。
 * 3、addEventAfter 定义在执行撤销事件之后执行方法。
 */
ibookerEditor.setEmojiOptions = function(emojiOptions) {
	if (emojiOptions != null && emojiOptions != undefined && emojiOptions != "") {
		var emojiEvent = emojiOptions.emojiEvent;
		if (emojiEvent != null && emojiEvent != undefined && emojiEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindEmojiEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindEmojiEvent = false;
		}
		var addEventBefore = emojiOptions.addEventBefore;
		var addEventAfter = emojiOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		// 绑定Emoji事件
		document.getElementById("editor_emoji").onclick = function() {
			ibookerEditor.emojiEvent(editorC, emojiEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 撤销事件属性设置
 * 
 * @param undoOptions - json
 * 1、undoEvent 定义撤销事件处理方法。
 * 2、addEventBefore 定义在执行撤销事件之前执行方法。
 * 3、addEventAfter 定义在执行撤销事件之后执行方法。
 */
ibookerEditor.setUndoOptions = function(undoOptions) {
	if (undoOptions != null && undoOptions != undefined && undoOptions != "") {
		var undoEvent = undoOptions.undoEvent;
		if (undoEvent != null && undoEvent != undefined && undoEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindUndoEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindUndoEvent = false;
		}
		var addEventBefore = undoOptions.addEventBefore;
		var addEventAfter = undoOptions.addEventAfter;
		// 绑定撤销事件
		document.getElementById("editor_undo").onclick = function() {
			ibookerEditor.undoEvent(undoEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 重做事件属性设置
 * 
 * @param redoOptions - json
 * 1、redoEvent 定义重做事件处理方法。
 * 2、addEventBefore 定义在执行重做事件之前执行方法。
 * 3、addEventAfter 定义在执行重做事件之后执行方法。
 */
ibookerEditor.setRedoOptions = function(redoOptions) {
	if (redoOptions != null && redoOptions != undefined && redoOptions != "") {
		var redoEvent = redoOptions.redoEvent;
		if (redoEvent != null && redoEvent != undefined && redoEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindRedoEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindRedoEvent = false;
		}
		var addEventBefore = redoOptions.addEventBefore;
		var addEventAfter = redoOptions.addEventAfter;
		// 绑定重做事件
		document.getElementById("editor_redo").onclick = function() {
			ibookerEditor.redoEvent(redoEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 预览事件属性设置
 * 
 * @param previewOptions - json
 * 1、previewEvent 定义预览事件处理方法。
 * 2、addEventBefore 定义在执行预览事件之前执行方法。
 * 3、addEventAfter 定义在执行预览事件之后执行方法。
 */
ibookerEditor.setPreviewOptions = function(previewOptions) {
	if (previewOptions != null && previewOptions != undefined && previewOptions != "") {
		var previewEvent = previewOptions.previewEvent;
		if (previewEvent != null && previewEvent != undefined && previewEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindPreviewEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindPreviewEvent = false;
		}
		var addEventBefore = previewOptions.addEventBefore;
		var addEventAfter = previewOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		if (editorP == null || editorP == undefined || editorP == "") {
			editorP = document.getElementById("editor_preview");
			editorP.setAttribute("class", "ibooker_editor_content");
		}
		// 绑定预览事件
		document.getElementById("editor_preview_mod").onclick = function() {
			ibookerEditor.previewEvent(editorC, editorP, previewEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 实况事件属性设置
 * 
 * @param liveOptions - json
 * 1、liveEvent 定义实况事件处理方法。
 * 2、addEventBefore 定义在执行实况事件之前执行方法。
 * 3、addEventAfter 定义在执行实况事件之后执行方法。
 */
ibookerEditor.setLiveOptions = function(liveOptions) {
	if (liveOptions != null && liveOptions != undefined && liveOptions != "") {
		var liveEvent = liveOptions.liveEvent;
		if (liveEvent != null && liveEvent != undefined && liveEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindLiveEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindLiveEvent = false;
		}
		var addEventBefore = liveOptions.addEventBefore;
		var addEventAfter = liveOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		if (editorP == null || editorP == undefined || editorP == "") {
			editorP = document.getElementById("editor_preview");
			editorP.setAttribute("class", "ibooker_editor_content");
		}
		// 绑定实况事件
		document.getElementById("editor_live_mod").onclick = function() {
			ibookerEditor.liveEvent(editorC, editorP, liveEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 编辑事件属性设置
 * 
 * @param editOptions - json
 * 1、editEvent 定义编辑事件处理方法。
 * 2、addEventBefore 定义在执行编辑事件之前执行方法。
 * 3、addEventAfter 定义在执行编辑事件之后执行方法。
 */
ibookerEditor.setEditOptions = function(editOptions) {
	if (editOptions != null && editOptions != undefined && editOptions != "") {
		var editEvent = editOptions.editEvent;
		if (editEvent != null && editEvent != undefined && editEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindEditEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindEditEvent = false;
		}
		var addEventBefore = editOptions.addEventBefore;
		var addEventAfter = editOptions.addEventAfter;
		if (editorC == null || editorC == undefined || editorC == "") {
			editorC = document.getElementById("editor_content");
		}
		if (editorP == null || editorP == undefined || editorP == "") {
			editorP = document.getElementById("editor_preview");
			editorP.setAttribute("class", "ibooker_editor_content");
		}
		// 绑定编辑事件
		document.getElementById("editor_edit_mod").onclick = function() {
			ibookerEditor.editEvent(editorC, editorP, editEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 全屏事件属性设置
 * 
 * @param zenOptions - json
 * 1、zenEvent 定义全屏事件处理方法。
 * 2、addEventBefore 定义在执行全屏事件之前执行方法。
 * 3、addEventAfter 定义在执行全屏事件之后执行方法。
 */
ibookerEditor.setZenOptions = function(zenOptions) {
	if (zenOptions != null && zenOptions != undefined && zenOptions != "") {
		var zenEvent = zenOptions.zenEvent;
		if (zenEvent != null && zenEvent != undefined && zenEvent != "") {
			ibookerEditor.isBindToolsEvent.isBindZenEvent = true;
		} else {
			ibookerEditor.isBindToolsEvent.isBindZenEvent = false;
		}
		var addEventBefore = zenOptions.addEventBefore;
		var addEventAfter = zenOptions.addEventAfter;
		// 绑定全屏事件
		document.getElementById("editor_zen_mod").onclick = function() {
			ibookerEditor.zenEvent(zenEvent, addEventBefore, addEventAfter);
		};
	}
};

/**
 * 集成showdown对象-闭包
 */
ibookerEditor.sdConverter = (function() {
	// 私有成员
	eConverter = null;
	// 预览回调
	eCompile = null;
	// 是否可以执行预览
	isCanHtmlCompile = true;
	// 是否支持MathJax
	isSupportMathJax = true;
	// 构建锁机制
	lock = false;
	// 记录上一次Text内容
	preText = null;
	// 记录上一次Html内容
	preHtml = null;

	// 私有函数，初始化Converter-单例
	function initConverter() {
		if (eConverter == null) {
			eConverter = new showdown.Converter();
			// 设置属性
			eConverter.setOption('omitExtraWLInCodeBlocks', true);
			eConverter.setOption("customizedHeaderId", true);
			eConverter.setOption('rawPrefixHeaderId', true);
			eConverter.setOption('parseImgDimensions', true);
			eConverter.setOption('literalMidWordUnderscores', false);
			eConverter.setOption('simplifiedAutoLink', true);
			eConverter.setOption('excludeTrailingPunctuationFromURLs', true);
			eConverter.setOption('underline', true);
			eConverter.setOption('strikethrough', true);
			eConverter.setOption('tables', true);
			eConverter.setOption('tablesHeaderId', true);
			eConverter.setOption('ghCodeBlocks', true);
			eConverter.setOption('tasklists', true);
			eConverter.setOption('smoothLivePreview', true);
			eConverter.setOption('smartIndentationFix', true);
			eConverter.setOption('simpleLineBreaks', true);
			eConverter.setOption('disableForced4SpacesIndentedSublists', true);
			eConverter.setOption('openLinksInNewWindow', true);
			eConverter.setOption('backslashEscapesHTMLTags', true);
			eConverter.setOption('emoji', true);
//			eConverter.setOption("completeHTMLDocument", true);
			eConverter.setOption("metadata", true);
			eConverter.setOption("splitAdjacentBlockquotes", true);
			eConverter.setFlavor('github');
		}
		return eConverter;
	}
	
	// 初始化预览回调
	function initCompile(compile) {
		if (compile) {
			eCompile = compile;
		}
	}
	
	// 设置是否关闭预览
	function initCanHtmlCompile(bool) {
		isCanHtmlCompile = bool;
	}

	// 设置是否支持MathJax
	function initSupportMathJax(bool) {
		isSupportMathJax = bool;
	}
	
	// 执行预览
	function compile() {
		if (lock == false || lock == "false") {
			lock = true;
			try {
				// 初始化输入框和预览框
				initEditorCP();
				if (editorC != null && editorC != undefined && editorC != "" && editorP != null && editorP != undefined && editorP != "") {
					if (preText === editorC.value) {
						lock = false;
						return;
					}

					preText = editorC.value;
					var html = ibookerEditor.sdConverter.converToHtml(preText);
					if (preHtml === html) {
						lock = false;
						return;
					}
					preHtml = html;
					editorP.innerHTML = preHtml;

					// MathJax进行转换
					if ( isSupportMathJax == false || isSupportMathJax == "false") {
						// 不进行Math
					} else {
						MathJax.Hub.Queue(
		    				["Typeset",MathJax.Hub, editorP.innerHTML],
		    				["resetEquationNumbers", MathJax.InputJax.TeX]
		   				);
					}
					
					// 重置输入框的高度
					var pHeight = editorP.offsetHeight;
					var height = editorC.offsetHeight;
					if (height < pHeight) {
						editorC.style.minHeight = (pHeight + 15) + "px";
					};
				}
			} catch(e){}
			lock = false;
		}
	};

	// 对外提供执行转换函数
	return {
		// 转换html
		converToHtml : function(source) {
			return initConverter().makeHtml(source);
		},
		// 获取转换后的Html
		getHtml : function() {
			return initConverter().makeHtml(editorC.value);
		},
		// 设置预览回调
		setCompile : function(callback) {
			initCompile(callback);
		},
		// 设置是否关闭预览
		setCanHtmlCompile : function(bool) {
			initCanHtmlCompile(bool);
			if (bool || bool == true || bool == "true") {
				ibookerEditor.sdConverter.htmlCompile();
			}
		},
		// 设置是否支持MathJax
		setSupportMathJax : function(bool) {
			initSupportMathJax(bool);
		},
		// 执行预览
		htmlCompile : function() {
			if (isCanHtmlCompile && (isCanHtmlCompile == true || isCanHtmlCompile == "true")) {
				isCanHtmlCompile = false;
				// 执行预览
				compile();
				// 执行回调
				if (eCompile && typeof eCompile === "function"){
					eCompile(); 
			    }
			    // 延迟100毫秒
				setTimeout(function (){
					isCanHtmlCompile = true;
				}, 100);
			};
		}
	};
})();

/**
 * makedown样式菜单操作对象
 */
ibookerEditor.editorEvent = {
	// 获取鼠标选中文字，以及鼠标位置
	getTxPostion : function(textarea) {
		var rangeData = {
			text : "",
			start : 0,
			end : 0,
			bookmark : ""
		};
		if (textarea.setSelectionRange) {// W3C
			textarea.focus();
			rangeData.start = textarea.selectionStart;
			rangeData.end = textarea.selectionEnd;
			rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
		} else if (document.selection) {// IE
			textarea.focus();
			var i, oS = document.selection.createRange(), oR = document.body.createTextRange();
			oR.moveToElementText(textarea);
			rangeData.text = oS.text;
			rangeData.bookmark = oS.getBookmark();
			for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
				if (textarea.value.charAt(i) == '\r') {
					i++;
				}
			}
			rangeData.start = i;
			rangeData.end = rangeData.text.length + rangeData.start;
		}
		return rangeData;
	},

	// 赋值鼠标选中文字，以及鼠标位置
	setTxPostion : function(textarea, rangeData) {
		var oR;
		if (!rangeData) {
			// 必须首先获取鼠标位置
		}
		textarea.focus();
		if (textarea.setSelectionRange) {// W3C
			textarea.setSelectionRange(rangeData.start, rangeData.end);
		} else if (textarea.createTextRange) {// IE
			oR = textarea.createTextRange();
			if (textarea.value.length === rangeData.start) {
				oR.collapse(false);
				oR.select();
			} else {
				oR.moveToBookmark(rangeData.bookmark);
				oR.select();
			}
		}
	},

	// 首尾添加text
	add : function(textarea, rangeData, text) {
		var oValue, nValue, sR, nStart, nEnd, st;
		this.setTxPostion(textarea, rangeData);

		if (textarea.setSelectionRange) {// W3C
			oValue = textarea.value;
			nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
			nStart = nEnd = rangeData.start + text.length;
			st = textarea.scrollTop;
			textarea.value = nValue;
			if (textarea.scrollTop != st) {
				textarea.scrollTop = st;
			}
			textarea.setSelectionRange(nStart, nEnd);
		} else if (textarea.createTextRange) {// IE
			sR = document.selection.createRange();
			sR.text = text;
			sR.setEndPoint('StartToEnd', sR);
			sR.select();
		}
	},

	// 在尾部添加text
	addEnd : function(textarea, selectTxt) {
		var rangeData = this.getTxPostion(textarea);
		var text = textarea.value;
		var a = rangeData.start;
		var b = rangeData.end;
		var finalTxt = text.substring(0, a) + selectTxt + text.substring(b, text.length);
		textarea.value = finalTxt;
		// 设置光标位置
		rangeData.start = rangeData.end = a + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 换行
	newLine : function(textarea, selectTxt) {
		var rangeData = this.getTxPostion(textarea);
		var text = textarea.value;
		var a = rangeData.start;
		var b = rangeData.end;
		var temp = text.substring(0, a);
		var temp2 = temp.substring(0, temp.length - 1) + selectTxt;
		var finalTxt = temp2
				.replace(new RegExp(/( *\n)/g), "\n")
				.replace(new RegExp(/(``` *\n)/g), "```\n")
				+ text.substring(b, text.length);
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = a + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 加粗
	bold : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt = "";
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		if (selectTxt.match(/^[\*]+.*[\*]+$/)) {
			// 如果已加粗，去掉
			selectTxt = selectTxt.replace(/^[\*]+([^\*]*)[\*]+$/, "$1");
			finalTxt = text.substring(0, a) + selectTxt + text.substring(b, text.length);
		} else {
			finalTxt = text.substring(0, a) + '**' + (selectTxt == "" ? '加粗' : text.substring(a, b)) + '**' + text.substring(b, text.length);
		}
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 斜体
	italic : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		if (selectTxt.match(/^[\*]+.*[\*]+$/)) {
			// 如果已斜体，去掉
			selectTxt = selectTxt.replace(/^[\*]+([^\*]*)[\*]+$/, "$1");
			finalTxt = text.substring(0, a) + selectTxt + text.substring(b, text.length);
		} else {
			finalTxt = text.substring(0, a) + '*' + (selectTxt == "" ? '斜体' : text.substring(a, b)) + '*' + text.substring(b, text.length);
		}
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 删除线
	strikethrough : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		if (selectTxt.match(/^[\~]+.*[\~]+$/)) {
			// 如果已删除线，去掉
			selectTxt = selectTxt.replace(/^[\~]+([^\~]*)[\~]+$/, "$1");
			finalTxt = text.substring(0, a) + selectTxt + text.substring(b, text.length);
		} else {
			finalTxt = text.substring(0, a) + '~~' + (selectTxt == "" ? '删除线' : text.substring(a, b)) + '~~' + text.substring(b, text.length);
		}
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 下划线
	underline : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		if (selectTxt.match(/^[\_]+.*[\_]+$/)) {
			// 如果已下划线，去掉
			selectTxt = selectTxt.replace(/^[\_]+([^\_]*)[\_]+$/, "$1");
			finalTxt = text.substring(0, a) + selectTxt + text.substring(b, text.length);
		} else {
			finalTxt = text.substring(0, a) + '__' + (selectTxt == "" ? '下划线' : text.substring(a, b)) + '__' + text.substring(b, text.length);
		}
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 字母转大写
	uppercase : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		finalTxt = text.substring(0, a) + selectTxt.toUpperCase() + text.substring(b, text.length);
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 字母转小写
	lowercase : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		finalTxt = text.substring(0, a) + selectTxt.toLowerCase() + text.substring(b, text.length);
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 单词首字母大写
	capitals : function(textarea) {
		var finalTxt = "", a = 0, b = 0, text = "", selectTxt;
		var rangeData = this.getTxPostion(textarea);
		a = rangeData.start;
		b = rangeData.end;
		text = textarea.value;
		selectTxt = rangeData.text;
		finalTxt = text.substring(0, a) + selectTxt.toLowerCase().replace(/\b[a-z]/g, function(s){return s.toUpperCase();}) + text.substring(b, text.length);
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 超链接
	link : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline += '\n[链接描述](http://www.ibooker.cc)';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 引用
	quote : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^>.*$/)) {
			thisline = thisline.replace(/^>(.*)$/, "$1");
		} else {
			thisline = '>' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 代码
	code : function(textarea) {
		var finalTxt = '';
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
//		var temp = text.substring(0, a);
//		var line = temp.split('\n').length - 1;
//		var thisline = text.split('\n')[line];
//		var allLine = text.split('\n');
		var selectTxt = rangeData.text;
//		if (selectTxt.match(/\n/)) {
			if (selectTxt.match(/^`{3}[\s\S]*`{3}$/)) {
				finalTxt = text.substring(0, a) + selectTxt.replace(/^`{3}[\n]([\s\S]*)[\n]`{3}$/, "$1") + text.substring(b, text.length);
			} else {
				finalTxt = text.substring(0, a) + '\n```\n' + selectTxt + '\n```\n' + text.substring(b, text.length);
			}
//		} else {
//			if (thisline.match(/^\s{4}.*$/)) {
//				thisline = thisline.replace(/^\s{4}(.*)$/, "$1");
//			} else {
//				thisline = '    ' + thisline;// 四个空格
//			}
//			allLine[line] = thisline;
//			finalTxt = allLine.join('\n');
//		}
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length - 5;
		this.setTxPostion(textarea, rangeData);
	},

	// 复选框选中
	tasklistsChecked : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^-\s+\[x\]\s+.*$/)) {
			thisline = thisline.replace(/^-\s+\[x\]\s+(.*)$/, "$1");
		} else {
			thisline = '- [x] ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 复选框未选中
	tasklistsUnChecked : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^-\s+\[\s{0,1}\]\s+.*$/)) {
			thisline = thisline.replace(/^-\s+\[\s{0,1}\]\s+(.*)$/, "$1");
		} else {
			thisline = '- [ ] ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 图片
	img : function(textarea, src) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline += '\n![图片描述](' + src + ')';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		this.setTxPostion(textarea, rangeData);
	},

	// 数字列表
	ol : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		var j = 1;
		for (var i = 0; i <= line; i++) {
			if (i == line && allLine[i].match(/^\d+\.\s([^\s]*)$/)) {
				allLine[i] = allLine[i].replace(/^\d+\.\s([^\s]*)$/, "$1");
				continue;
			}
			if (allLine[i].trim().match(/^\d+\.\s([^\s]*)$/)) {
				allLine[i] = allLine[i].replace(/^\d+\.\s([^\s]*)$/, (j++) + '. ' + "$1");
				continue;
			}
			if (i == line) {
				allLine[i] = (j++) + '. ' + thisline;
				continue;
			}
			if (allLine[i - 1] == '' && allLine[i] != '' && !allLine[i].match(/^\d+\.\s([^\s]*)$/)) {
				j = 1;
			}
		}
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 普通列表
	ul : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^-\s.*$/)) {
			thisline = thisline.replace(/^-\s(.*)$/, "$1");
		} else {
			thisline = '- ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 标题
	title : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline = thisline + '\n--';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		this.setTxPostion(textarea, rangeData);
	},

	// 一级标题
	h1 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^#\s.*$/)) {
			thisline = thisline.replace(/^#\s(.*)$/, "$1");
		} else {
			thisline = '# ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 二级标题
	h2 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^##\s.*$/)) {
			thisline = thisline.replace(/^##\s(.*)$/, "$1");
		} else {
			thisline = '## ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 三级标题
	h3 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^###\s.*$/)) {
			thisline = thisline.replace(/^###\s(.*)$/, "$1");
		} else {
			thisline = '### ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 四级标题
	h4 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^####\s.*$/)) {
			thisline = thisline.replace(/^####\s(.*)$/, "$1");
		} else {
			thisline = '#### ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 五级标题
	h5 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^#####\s.*$/)) {
			thisline = thisline.replace(/^#####\s(.*)$/, "$1");
		} else {
			thisline = '##### ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 六级标题
	h6 : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var b = rangeData.end;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		if (thisline.match(/^######\s.*$/)) {
			thisline = thisline.replace(/^######\s(.*)$/, "$1");
		} else {
			thisline = '###### ' + thisline;
		}
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		rangeData.start = rangeData.end = b + finalTxt.length - text.length;
		this.setTxPostion(textarea, rangeData);
	},

	// 表格
	tables : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline += '\n|  h1   |    h2   |      h3 |'
				+ '\n|:------|:-------:|--------:|'
				+ '\n| 100   | [a][1]  | ![b][2] |'
				+ '\n| *foo* | **bar** | ~~baz~~ |';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		this.setTxPostion(textarea, rangeData);
	},

	// Html
	html : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline += '\n<html>' + '\n<!--在这里插入内容-->' + '\n</html>';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		this.setTxPostion(textarea, rangeData);
	},

	// 分割线
	hr : function(textarea) {
		var rangeData = this.getTxPostion(textarea);
		var a = rangeData.start;
		var text = textarea.value;
		var temp = text.substring(0, a);
		var line = temp.split('\n').length - 1;
		var thisline = text.split('\n')[line];
		var allLine = text.split('\n');
		thisline = thisline + '\n***';
		allLine[line] = thisline;
		var finalTxt = allLine.join('\n');
		textarea.value = finalTxt;
		// 预览
		ibookerEditor.sdConverter.htmlCompile();
		// 设置光标位置
		this.setTxPostion(textarea, rangeData);
	}
};