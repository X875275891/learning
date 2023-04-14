var FileUrl = ''
var lotteryInformation = []
  var loading = null
  var prizeId = null
init()
function init(){
  JSON.parse(localStorage.getItem('settingInfo')).lotteryInfo?lotteryInformation = JSON.parse(localStorage.getItem('settingInfo')).lotteryInfo:''
}
$('.addPic').click(function (e) {
  $('.addPicPop').show()
  prizeId = $(e.target).attr('data-id')
  var thisInfo = lotteryInformation.filter((item) => {
    return item.id ==  Number(prizeId)+ 1
  });
  if (thisInfo[0]) {
    $('.addPicPop .prize-name').val(thisInfo[0].prizeName)
    $('.addPicPop .prize-num').val(thisInfo[0].prizeNum)
    thisInfo[0].prizePic ? $('#afterShow').attr('src', thisInfo[0].prizePic) : $('#afterShow').hide()
    $('#delAddPic').show()
  } else {
    $('.addPicPop .prize-name').val('')
    $('.addPicPop .prize-num').val('')
    $('#afterShow').attr('src', '');
    $('#afterShow').hide()
    $('#delAddPic').hide()
  }
})
$('.closeIcon').click(() => {
  $('.addPicPop').hide()
})
// 奖品信息判断
function checkInfo() {
  if ($('.addPicPop .prize-name').val().trim() === '') {
    layer.msg('奖品名称不能为空');
    return false
  }
  if ($('.addPicPop .prize-num').val().trim() === '') {
    layer.msg('奖品数量不能小于1');
    return false
  }
  addEverPrizeInfo()
}
// 添加每个格子的信息
function addEverPrizeInfo() {
  lotteryInformation[prizeId] = {
    id: Number(prizeId) + 1,
    prizeName: $('.addPicPop .prize-name').val(),
    prizeNum: $('.addPicPop .prize-num').val(),
    prizePic: FileUrl
  }
  if (lotteryInformation[prizeId].prizePic === '') {
    $('.prize-img' + lotteryInformation[prizeId].id).hide()
  } else {
    $('.prize-img' + lotteryInformation[prizeId].id).attr('src', lotteryInformation[prizeId].prizePic);
  }
  $('.prize-name' + lotteryInformation[prizeId].id).html(lotteryInformation[prizeId].prizeName);
  $('.prize-num' + lotteryInformation[prizeId].id).html(lotteryInformation[prizeId].prizeNum);
  $('.prize-Pic' + lotteryInformation[prizeId].id).show()
  $('.addPicPop').hide()
}
$('#decideToAddPic').click(() => {
  checkInfo()
})
$('#delAddPic').click(() => {
  layer.open({
    content: '确定要删除该奖品的配置吗？',
    btn: ['确定', '取消'],
    yes: function (index, layero) {
      lotteryInformation = lotteryInformation.filter((item) => {
        return item.id !=  Number(prizeId)+ 1
      });
      $('.addPicPop').hide()
      layer.close(index);
    },
    no: function (index, layero) {
      layer.close(index);
    }
  });
})

layui.use('upload', function () {
  var upload = layui.upload,
    $ = layui.jquery;
  //上传图片
  var uploadInst = upload.render({
    elem: '#uploadPic', //绑定元素 
    url: 'https://sd.anruidm.com/sdapi/api/Upload/Upload', //上传接口
    auto: true,
    exts: 'jpg|jpeg|png|gif|',
    before: function (obj) {
      //预读本地文件示例，不支持ie8 
      // obj.preview(function (index, file, result) {
      //   $('#preShow').attr('src', result); //图片链接（base64） 
      // });
      loading = layer.load(2, {
        shade: [0.6,'#000'] //0.1透明度的白色背景
      });
    },
    done: function (res) {
      if (res.Status == 200) {
        $('#afterShow').show()
        $('#afterShow').attr('src', res.Data.FileUrl);
        FileUrl = res.Data.FileUrl
        layer.msg('上传成功');
      } else {
        layer.msg('上传失败');
      }
      layer.close(loading);//loading层消失
    },
    error: function (res) {
      layer.close(loading);
      return layer.msg(res.Message);
    }
  });
});
layui.use('laydate', function () {
  function minDate() {
    var now = new Date();
    return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  }
  var laydate = layui.laydate;
  //初始赋值
  laydate.render({
    elem: '#exact-date',
    // value: '1989-10-14',
    isInitValue: true,
    min: minDate()
  });
  // laydate.render({
  //   elem: '#hour-minute'
  //   ,type: 'time'
  //   // ,format: 'H点m1分'
  // });
});


var select = document.getElementById('hour');
for (var i = 0; i < 24; i++) {
  var option = document.createElement("option");
  option.setAttribute("value", i);
  option.innerText = i + '点';
  select.appendChild(option)
}
//渲染下拉框
layui.use('form', function () {
  var form = layui.form;
  form.render("select");
});

$('#submit').click(function () {
  var settingInfo = {
    year: $('#exact-date').val(),
    minute: $('#minute').val(),
    nameOfRecipient: $('.name-of-recipient').val(),
    contactInformation: $('.contact-information').val(),
    status: $("input[name='Number-of-winners']:checked").val(),
    statusNum: $('#' + $("input[name='Number-of-winners']:checked").val()).val(),
    dayPrize: $("#day-prize").val(),
    oncePhone: $("input[type='checkbox']").prop('checked'),
    lotteryInfo: lotteryInformation
  }
  localStorage.setItem("settingInfo", JSON.stringify(settingInfo));
})