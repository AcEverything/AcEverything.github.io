/* 标题样式 title.js */
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        //离开当前页面时标签显示内容 
        document.title = ' 跑哪里去了~'; 
        clearTimeout(titleTime);
    } else {
        //返回当前页面时标签显示内容 
        document.title = ' 抓到你啦～';
        //两秒后变回正常标题 
        titleTime = setTimeout(function () { document.title = OriginTitile; }, 2000);
    }
});

/*---------------------*/

/* 纪念日---grayscale */
if (PublicSacrificeDay()) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter:gray !important;filter:grayscale(100%);-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);");
}

function PublicSacrificeDay() {
    var PSFarr = new Array("0403", "0404", "0405", "0406", "0512", "0707", "0807", "0909", "0918", "0930", "1025", "1213");
    //2020年4月4日 新冠肺炎哀悼日，清明节
    //2010年4月14日，青海玉树地震
    //2008年5月12日，四川汶川地震
    //1937年7月7日,七七事变 又称卢沟桥事变
    //2010年8月7日，甘肃舟曲特大泥石流
    //1976年9月9日，毛主席逝世
    //1931年9月18日，九一八事变
    //9月30日 烈士纪念日为每年
    //1950年10月25日，抗美援朝纪念日
    //1937年12月13日，南京大屠杀
    var currentdate = new Date();
    var str = "";
    var mm = currentdate.getMonth() + 1;
    if (currentdate.getMonth() > 9) {
        str += mm;
    } else {
        str += "0" + mm;
    }
    if (currentdate.getDate() > 9) {
        str += currentdate.getDate();
    } else {
        str += "0" + currentdate.getDate();
    }
    if (PSFarr.indexOf(str) > -1) {
        return 1;
    } else {
        return 0;
    }
}

/*---------------------*/

/* 右键菜单 */
var selectTextNow = "";
let rmWidth = document.getElementById("rightMenu").offsetWidth,
    rmHeight = document.getElementById("rightMenu").offsetHeight,
    domhref = "",
    domImgSrc = "",
    globalEvent = null,
    rm = {};

function imageToBlob(e) {
    const n = new Image,
        t = document.createElement("canvas"),
        o = t.getContext("2d");
    return n.crossOrigin = "", n.src = e, new Promise((e => {
        n.onload = function () {
            t.width = this.naturalWidth, t.height = this.naturalHeight, o.drawImage(this, 0, 0), t.toBlob((n => {
                e(n)
            }), "image/png", .75)
        }
    }))
}
async function copyImage(e) {
    const n = await imageToBlob(e),
        t = new ClipboardItem({
            "image/png": n
        });
    navigator.clipboard.write([t])
}

function stopMaskScroll() {
    if (document.getElementById("rightMenu-mask")) {
        document.getElementById("rightMenu-mask").addEventListener("mousewheel", (function (e) {
            rm.hideRightMenu()
        }), !1)
    }
    if (document.getElementById("rightMenu")) {
        document.getElementById("rightMenu").addEventListener("mousewheel", (function (e) {
            rm.hideRightMenu()
        }), !1)
    }
}

function addRightMenuClickEvent() {
    document.getElementById("rightMenu-mask").addEventListener("click", rm.hideRightMenu);
    document.getElementById("rightMenu-mask").addEventListener("contextmenu", function () {
        rm.hideRightMenu();
        return false;
    });
    document.getElementById("menu-backward").addEventListener("click", function () {
        window.history.back();
        rm.hideRightMenu();
    });
    document.getElementById("menu-forward").addEventListener("click", function () {
        window.history.forward();
        rm.hideRightMenu();
    });
    document.getElementById("menu-refresh").addEventListener("click", function () {
        rm.hideRightMenu();
        window.location.reload();
    });
    document.getElementById("menu-darkmode").addEventListener("click", function () {
        switchNightMode()
        rm.hideRightMenu()
    });
    document.getElementById("menu-reading").addEventListener("click", rm.switchReadMode);

    document.getElementById("menu-postlink").addEventListener("click", rm.copyPostUrl);
    document.getElementById("menu-copytext").addEventListener("click", function () {
        rm.rightmenuCopyText(selectTextNow);
        btf.snackbarShow("复制成功，复制和转载请标注本文地址");
    });


    document.getElementById("menu-searchBaidu").addEventListener("click", rm.searchBaidu);

    document.getElementById("menu-copylink").addEventListener("click", rm.copyLink);

    document.getElementById("menu-randomPost").addEventListener("click", function () {
        rm.hideRightMenu();
        toRandomPost();
    });
    // document.getElementById("menu-translate").addEventListener("click", rm.translate);
    document.getElementById("menu-asidehide").addEventListener("click", rm.hideAsideBtn);
}

function selceText() {
    var e;
    if (window.getSelection) {
        e = window.getSelection().toString();
    } else if (document.selection) {
        e = document.selection.createRange().text;
    }
    selectTextNow = e || "";
}

window.oncontextmenu = function (e) {
    if (document.body.clientWidth > 768) {
        let n = e.clientX + 10,
            t = e.clientY,
            p = document.querySelector(".rightMenuPost"),
            o = document.querySelector(".rightMenuOther"),
            i = document.querySelector(".rightMenuPlugin"),
            c = document.getElementById("menu-copytext"),
            // d = document.getElementById("menu-search"),
            s = document.getElementById("menu-searchBaidu"),
            u = document.getElementById("menu-copylink"),
            y = e.target.href,
            b = false;

        o.style.display = "block";
        globalEvent = e;

        if (selectTextNow && window.getSelection()) {
            b = true;
            c.style.display = "block";
            // d.style.display = "block";
            s.style.display = "block";
            p.style.display = "none";
        } else {
            c.style.display = "none";
            // d.style.display = "none";
            s.style.display = "none";
        }

        if (y) {
            b = true;
            u.style.display = "block";
            domhref = y;
            p.style.display = "none";
        } else {
            u.style.display = "none";
        }

        if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "textarea") {
            b = true;
            p.style.display = "none";
        }

        if (b) {
            o.style.display = "none";
            i.style.display = "block";
        } else {
            i.style.display = "none";
            document.querySelector("#body-wrap.post") ? p.style.display = "block" : p.style.display = "none";
        }


        rm.reloadrmSize();

        if (n + rmWidth > window.innerWidth) {
            n -= rmWidth + 10;
        }

        if (t + rmHeight > window.innerHeight) {
            t -= t + rmHeight - window.innerHeight;
        }

        rm.showRightMenu(true, t, n);
        document.getElementById("rightMenu-mask").style.display = "flex";
        return false;
    }
}
document.onmouseup = document.ondbclick = selceText

rm.showRightMenu = function (e, n = 0, t = 0) {
    const rightMenu = document.getElementById("rightMenu");
    rightMenu.style.top = n + "px";
    rightMenu.style.left = t + "px";
    if (e) {
        rightMenu.style.display = "block";
        stopMaskScroll();
    } else {
        rightMenu.style.display = "none";
    }
},
    rm.hideRightMenu = function () {
        rm.showRightMenu(false);
        document.getElementById("rightMenu-mask").style.display = "none";
    },
    rm.reloadrmSize = function () {
        rmWidth = document.getElementById("rightMenu").offsetWidth;
        rmHeight = document.getElementById("rightMenu").offsetHeight;
    },
    rm.switchDarkMode = function () {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        if (nowMode === 'light') {
            activateDarkMode()
            saveToLocal.set('theme', 'dark', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
        } else {
            activateLightMode()
            saveToLocal.set('theme', 'light', 2)
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
        }
        typeof utterancesTheme === 'function' && utterancesTheme()
        typeof FB === 'object' && window.loadFBComment()
        window.DISQUS && document.getElementById('disqus_thread')
            .children.length && setTimeout(() => window.disqusReset(), 200)

        rm.hideRightMenu()
    },
    rm.switchReadMode = function () {
        const body = document.body;
        if (!document.querySelector(".read-mode")) {
            body.classList.add('read-mode');
            const newButton = document.createElement('button');
            newButton.type = 'button';
            newButton.className = 'fas fa-sign-out-alt exit-readmode';
            body.appendChild(newButton);

            const clickFn = () => {
                body.classList.remove('read-mode');
                newButton.remove();
                newButton.removeEventListener('click', clickFn);
                document.getElementById("menu-reading").querySelector("span").textContent = "阅读模式";
            };

            newButton.addEventListener('click', clickFn);
            document.getElementById("menu-reading").querySelector("span").textContent = "退出阅读模式";
        } else {
            body.classList.remove('read-mode');
            const exitButton = document.querySelector('.exit-readmode');
            if (exitButton) {
                exitButton.remove();
            }
            document.getElementById("menu-reading").querySelector("span").textContent = "阅读模式";
        }
        rm.hideRightMenu();
    },
    rm.copyUrl = function (url) {
        const input = document.createElement("input");
        input.id = "copyVal";
        document.body.appendChild(input);
        input.value = url;
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand("copy");
        input.remove();
    },
    rm.copyPostUrl = function () {
        const url = window.location.href;
        rm.copyUrl(url);
        btf.snackbarShow("复制本页链接地址成功", false, 2000);
        rm.hideRightMenu();
    },
    rm.rightmenuCopyText = function (text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
        rm.hideRightMenu();
    },
    rm.readClipboard = function () {
        if (navigator.clipboard) {
            navigator.clipboard.readText().then((text) => rm.insertAtCaret(globalEvent.target, text));
        }
    },
    rm.insertAtCaret = function (input, text) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        if (document.selection) {
            input.focus();
            document.selection.createRange().text = text;
            input.focus();
        } else if (start || start === 0) {
            const scrollTop = input.scrollTop;
            input.value = input.value.substring(0, start) + text + input.value.substring(end, input.value.length);
            input.focus();
            input.selectionStart = start + text.length;
            input.selectionEnd = start + text.length;
            input.scrollTop = scrollTop;
        } else {
            input.value += text;
            input.focus();
        }
    },
    rm.pasteText = function () {
        rm.readClipboard();
        rm.hideRightMenu();
    },
    rm.searchBaidu = function () {
        btf.snackbarShow("即将跳转到百度搜索", false, 2000);
        setTimeout(function () {
            window.open("https://www.baidu.com/s?wd=" + selectTextNow);
        }, 2000);
        rm.hideRightMenu();
    },
    rm.copyLink = function () {
        rm.rightmenuCopyText(domhref);
        btf.snackbarShow("已复制链接地址");
    },
    rm.translate = function () {
        rm.hideRightMenu();
        document.getElementById("translateLink").click();
    },
    rm.hideAsideBtn = function () {
        const htmlDom = document.documentElement.classList;
        const saveStatus = htmlDom.contains('hide-aside') ? 'show' : 'hide';
        saveToLocal.set('aside-status', saveStatus, 2);
        htmlDom.toggle('hide-aside');
        rm.hideRightMenu();
    };
addRightMenuClickEvent();
document.addEventListener('pjax:complete', addRightMenuClickEvent);


/*---------------------*/

/* 个性定位信息展示 */

function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
        e *= PI / 180
        n *= PI / 180
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }
    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
}

function welcometxmap() {
    //请求数据
    let ipLoacation = window.saveToLocal.get('ipLocation');
    if (ipLoacation) {
        showWelcome(ipLoacation);
    }else {
        // 数据已过期或不存在
        var script = document.createElement('script');
        var url = `https://apis.map.qq.com/ws/location/v1/ip?key=D4DBZ-AFWCQ-EPO5Z-BCVZH-SYMWJ-7HBJZ&output=jsonp`;
        script.src = url;
        window.QQmap = function (data) {
            ipLoacation = data;
            // 将数据保存到 localStorage，过期时间设置为 1 天
            window.saveToLocal.set('ipLocation', ipLoacation, 1);
            document.body.removeChild(script);
            delete window.QQmap;
            showWelcome(ipLoacation);
        };
        document.body.appendChild(script);
    }
}

function showWelcome(ipLoacation) {
    let dist = getDistance(113.78247, 34.76527, ipLoacation.result.location.lng, ipLoacation.result.location.lat);
    let pos = ipLoacation.result.ad_info.nation;
    let ip;
    let posdesc;
    //根据国家、省份、城市信息自定义欢迎语
    switch (ipLoacation.result.ad_info.nation) {
        case "日本":
            posdesc = "よろしく，一起去看樱花吗";
            break;
        case "美国":
            posdesc = "Let us live in peace!";
            break;
        case "英国":
            posdesc = "想同你一起夜乘伦敦眼";
            break;
        case "俄罗斯":
            posdesc = "干了这瓶伏特加！";
            break;
        case "法国":
            posdesc = "C'est La Vie";
            break;
        case "德国":
            posdesc = "Die Zeit verging im Fluge.";
            break;
        case "澳大利亚":
            posdesc = "一起去大堡礁吧！";
            break;
        case "加拿大":
            posdesc = "拾起一片枫叶赠予你";
            break;
        case "中国":
            pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
            ip = ipLoacation.result.ip;
            switch (ipLoacation.result.ad_info.province) {
                case "北京市":
                    posdesc = "北——京——欢迎你~~~";
                    break;
                case "天津市":
                    posdesc = "讲段相声吧";
                    break;
                case "河北省":
                    posdesc = "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山";
                    break;
                case "山西省":
                    posdesc = "展开坐具长三尺，已占山河五百余";
                    break;
                case "内蒙古自治区":
                    posdesc = "天苍苍，野茫茫，风吹草低见牛羊";
                    break;
                case "辽宁省":
                    posdesc = "我想吃烤鸡架！";
                    break;
                case "吉林省":
                    posdesc = "状元阁就是东北烧烤之王";
                    break;
                case "黑龙江省":
                    posdesc = "很喜欢哈尔滨大剧院";
                    break;
                case "上海市":
                    posdesc = "众所周知，中国只有两个城市";
                    break;
                case "江苏省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "南京市":
                            posdesc = "这是我挺想去的城市啦";
                            break;
                        case "苏州市":
                            posdesc = "上有天堂，下有苏杭";
                            break;
                        default:
                            posdesc = "散装是必须要散装的";
                            break;
                    }
                    break;
                case "浙江省":
                    posdesc = "东风渐绿西湖柳，雁已还人未南归";
                    break;
                case "河南省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "郑州市":
                            posdesc = "豫州之域，天地之中";
                            break;
                        case "南阳市":
                            posdesc = "臣本布衣，躬耕于南阳此南阳非彼南阳！";
                            break;
                        case "驻马店市":
                            posdesc = "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！";
                            break;
                        case "开封市":
                            posdesc = "刚正不阿包青天";
                            break;
                        case "洛阳市":
                            posdesc = "洛阳牡丹甲天下";
                            break;
                        default:
                            posdesc = "可否带我品尝河南烩面啦？";
                            break;
                    }
                    break;
                case "安徽省":
                    posdesc = "蚌埠住了，芜湖起飞";
                    break;
                case "福建省":
                    posdesc = "井邑白云间，岩城远带山";
                    break;
                case "江西省":
                    posdesc = "落霞与孤鹜齐飞，秋水共长天一色";
                    break;
                case "山东省":
                    posdesc = "遥望齐州九点烟，一泓海水杯中泻";
                    break;
                case "湖北省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "黄冈市":
                            posdesc = "红安将军县！辈出将才！";
                            break;
                        default:
                            posdesc = "来碗热干面~";
                            break;
                    }
                    break;
                case "湖南省":
                    posdesc = "74751，长沙斯塔克";
                    break;
                case "广东省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "广州市":
                            posdesc = "看小蛮腰，喝早茶了嘛~";
                            break;
                        case "深圳市":
                            switch (ipLoacation.result.ad_info.district) {
                                case "坪山区":
                                    posdesc = "好巧！博主也在坪山区生活喔~";
                                    break;
                                default:
                                    posdesc = "今天你996了嘛~";
                                    break;
                            }
                            break;
                        case "阳江市":
                            posdesc = "阳春合水！博主家乡~ 欢迎来玩~";
                            break;
                        default:
                            posdesc = "来两斤福建人~";
                            break;
                    }
                    break;
                case "广西壮族自治区":
                    posdesc = "桂林山水甲天下";
                    break;
                case "海南省":
                    posdesc = "朝观日出逐白浪，夕看云起收霞光";
                    break;
                case "四川省":
                    posdesc = "康康川妹子";
                    break;
                case "贵州省":
                    posdesc = "茅台，学生，再塞200";
                    break;
                case "云南省":
                    posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天";
                    break;
                case "西藏自治区":
                    posdesc = "躺在茫茫草原上，仰望蓝天";
                    break;
                case "陕西省":
                    posdesc = "来份臊子面加馍";
                    break;
                case "甘肃省":
                    posdesc = "羌笛何须怨杨柳，春风不度玉门关";
                    break;
                case "青海省":
                    posdesc = "牛肉干和老酸奶都好好吃";
                    break;
                case "宁夏回族自治区":
                    posdesc = "大漠孤烟直，长河落日圆";
                    break;
                case "新疆维吾尔自治区":
                    posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风";
                    break;
                case "台湾省":
                    posdesc = "我在这头，大陆在那头";
                    break;
                case "香港特别行政区":
                    posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉";
                    break;
                case "澳门特别行政区":
                    posdesc = "性感荷官，在线发牌";
                    break;
                default:
                    posdesc = "带我去你的城市逛逛吧！";
                    break;
            }
            break;
        default:
            posdesc = "带我去你的国家逛逛吧";
            break;
    }

    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️ 早上好，一日之计在于晨~</span>";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️ 中午好，记得午休喔~</span>";
    else if (date.getHours() >= 13 && date.getHours() < 17) timeChange = "<span>🕞 下午好，饮茶先啦~</span>";
    else if (date.getHours() >= 17 && date.getHours() < 19) timeChange = "<span>🚶‍♂️ 即将下班，记得按时吃饭~</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌙 晚上好，夜生活嗨起来！</span>";
    else timeChange = "<span>🌙 夜深了，早点休息，少熬夜~</span>";

    try {
        //自定义文本和需要放的位置
        document.getElementById("welcome-info").innerHTML =
        `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离博主约 <span style="color:var(--theme-color)">${dist}</span> 公里， ${posdesc}。</b>`;
    } catch (err) {
        // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
    }
}
window.onload = welcometxmap;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', welcometxmap);
