$(function () {
    const COLUMN = 2; // 2列
    let arr = []; // 存储2列li
    let minHeight = [] // 存储2列的高度
    const halfScreen = $('.content').width() / 2
    let imgArr = []
    let imgArr1 = [{
            ImgSrc: './img/index/bg3.png'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/4781770b-86f0-4fc3-a5a0-68a7220cde88.jpg'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/50a3d2fd-9015-4509-99e4-6e336c14061e.jpg'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/e5d98126-3926-44f0-9b42-7164cd13da94.png'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/88b39395-e836-4ff7-aee8-7fa8e548e2c3.png'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/c210831a-2930-430b-922a-c235bc35aa86.png'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/ba53a60e-271a-4887-bc9f-9a42f87ac669.jpg'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/b9c0aa27-b62a-4061-9b76-da4bffd2fb3c.gif'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/0ed1d996-6389-482c-b252-eca0873a157d.jpeg'
        },
        {
            ImgSrc: 'https://amdttres.anruidm.com/resources/Image/0d189b18-532a-459e-9324-522af72c43ca.jpg'
        },

    ]
    imgArr = imgArr1
    create();

    function create() {
        // 创建ul li作为每一列的容器
        $("<ul></ul>").appendTo($(".content")).css("width", "100%");
        for (let i = 0; i < COLUMN; i++) {
            var li = document.createElement("li");
            $(li).appendTo($("ul"))
                .css({
                    "width": "50%",
                    "margin": "0 auto",
                }).attr("class", "box" + i);;
            arr.push(li);
            minHeight.push(0);
        }
        createImg();
    }

    function createImg() {
        let img = new Image();
        img.num = 0;
        img.src = imgArr[img.num].ImgSrc;
        $(img).css({
            "width": "100%",
            "margin": "0 auto"
        });
        // 当图片加载完后
        $(img).on("load", loadHandler);
    }

    function loadHandler() {
        // 高度数组的最小值
        let min = Math.min.apply(null, minHeight);
        // 高度数组的最小值索引
        let minIndex = minHeight.indexOf(min);
        // 克隆一份图片
        let im = this.cloneNode(true);
        // 将图片假如对应最小值索引的容器中
        // arr[minIndex].append(im);
        let str =
            `<div class="item">
                <div class="imgBox"><img src="${this.src}"></div>
                  <div class="info">
                    <p>这篇文章主要介绍了html编写edm时注意事项小结(一般发邮件需要注意的地方),需要的朋友可以参考下</p>
                    <div class="btnBox">
                        <span class="time">2023/03/01</span>
                        <div class="btn">
                            <img src="./img/pull/dianzan.png" class="dianzan">
                            <span>31</span>
                        </div>
                        <div class="btn">
                            <img src="./img/pull/pinglun.png" class="pinglun">
                            <span>31</span>
                        </div>
                  </div>
                </div>
            </div>`
        $('body ul .box' + (minIndex)).append(str)

        // 更新最小值索引的容器的高度
        minHeight[minIndex] += halfScreen / im.width * im.height + 65;
        this.num++;
        // 图片的个数只有imgArr.length张
        if (this.num >= imgArr.length) {
            $(this).off("load", loadHandler);
            return;
        }
        this.src = imgArr[this.num].ImgSrc;
    }

    // jQuery 实现触底加载更多
    //添加滚动事件
    $(window).scroll(function () {
        var docHeight = $(document).height(); //整个文档高度
        var winHeight = $(window).height(); //浏览器可视窗口高度
        var scrollTop = $(window).scrollTop(); //浏览器可视窗口顶端距离网页顶端的高度
        //滚动条+可视高度+100，距离文档高度差50的时候就要加载数据了
        if (scrollTop + winHeight + 100 > docHeight) {
            scrollTop == 0?'':createImg();
        }
    });

    $('.allDynamic').click(function () {
        $('ul').remove()
        imgArr = imgArr1
        arr = []
        minHeight = []
        create();
    })
     let isSlect = true
    $('.selectIcon').click(function () {
        isSlect?$('.selecBox').show():$('.selecBox').hide()
        isSlect = !isSlect
    })

});