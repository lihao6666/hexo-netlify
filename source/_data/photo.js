photo ={
    page: 1,
    //offset 用于设置照片数量的上限
    offset: 100,
    cosUrl: "https://blog-1257711631.cos.ap-nanjing.myqcloud.com/myblog/",
    cosUrl2: "https://blog-1257711631.cos.ap-nanjing.myqcloud.com/fellowship/",
    init: function () {
        var that = this;
        //这里设置的是刚才生成的 json 文件路径
        $.getJSON("/photos/photos-life.json", function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
        $.getJSON("/photos/photos-ship.json", function (data) {
            that.render2(that.page, data);
            //that.scroll(data);
        });

    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].split(' ')[1];
           imgName = imgNameWithPattern.split('.')[0]
           imageSize = data[i].split(' ')[0];
           imageX = imageSize.split('.')[0];
           imageY = imageSize.split('.')[1];
           width = 250*imageY/imageX
           //这里 250 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
            li += '<div class="card" style="width:250px">' +
                    '<div class="ImageInCard" style="height:'+ 250 * imageY / imageX + 'px">' +
                    //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                      '<a data-fancybox="gallery" href="'+ this.cosUrl +''+ imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
                        '<img src="'+ this.cosUrl +''+ imgNameWithPattern + '?imageView2/1/w/250/h/ '+ width +'"/>' +
                      '</a>' +
                    '</div>' +
                    // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                  '</div>'
        }
        $(".ImageGrid").append(li);
        //$(".ImageGrid").lazyload();
        this.minigrid();
    },
    render2: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
           imgNameWithPattern = data[i].split(' ')[1];
           imgName = imgNameWithPattern.split('.')[0]
           imageSize = data[i].split(' ')[0];
           imageX = imageSize.split('.')[0];
           imageY = imageSize.split('.')[1];
           width = 250*imageY/imageX
           //这里 250 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
            li += '<div class="card" style="width:250px">' +
                    '<div class="ImageInCard" style="height:'+ 250 * imageY / imageX + 'px">' +
                    //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                      '<a data-fancybox="gallery" href="'+ this.cosUrl2 +''+ imgNameWithPattern + '?raw=true" data-caption="' + imgName + '">' +
                        '<img src="'+ this.cosUrl2 +''+ imgNameWithPattern + '?imageView2/1/w/250/h/ '+ width +'"/>' +
                      '</a>' +
                    '</div>' +
                    // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                  '</div>'
        }
        $(".ImageGrid2").append(li);
        //$(".ImageGrid").lazyload();
        this.minigrid2();
    },

    minigrid: function() {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    },
    minigrid2: function() {
        var grid = new Minigrid({
            container: '.ImageGrid2',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
           grid.mount();
        });
    }
}
photo.init();