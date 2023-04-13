var isStart = true
var isEnd = false
let i = 0;
let t = 0;
let num = null
init()
function init(){
  let settingInfo = JSON.parse(localStorage.getItem('settingInfo'))
  console.log(settingInfo);
  for(var i = 0; i<settingInfo.lotteryInfo.length;i++){
    var id = settingInfo.lotteryInfo[i].id
    $('.prize-name'+id).html(settingInfo.lotteryInfo[i].prizeName)
    $('.prize-num'+id).html(settingInfo.lotteryInfo[i].prizeNum)
    settingInfo.lotteryInfo[i].prizePic?$('.prize-img'+id).attr('src', settingInfo.lotteryInfo[i].prizePic):''
  }
}
// 抽中的奖品 返回1-9的整数，包含1，不包含9
function getRandomNum(n, m) {
  return parseInt((m - n) * Math.random() + n);
}
$('#end').on('click', function () {
  if (!isEnd) {
    return false
  }
  isEnd = false
  num = getRandomNum(1, 8) //得到一个随机数（即奖品）
  $('.pop-title').show()
  if (i < num) {
    time = (num - i) * 200
  } else {
    time = (8 - i + num) * 200
  }
  timer = setInterval(function () {
    clearInterval(timer)
    clearInterval(change)
    popShow = setInterval(() => {
      var prize = $('.prize-name'+num).text()
      if(prize !== '谢谢参与'){
        $('.pop-title').text('恭喜你获得了')
        $('.pop-prize').text(prize)
      }else{
        $('.pop-title').text('啊哦，没有中奖哦')
      }
      $('.mask').show()
      clearInterval(popShow)
      isStart = true
      isEnd = false
      $('#end').removeClass('active')
      $('#star').addClass('active')
    }, 500)
  }, time)
})
$('#star').on('click', function () {
  $('#star').removeClass('active')
  $('#end').addClass('active')
  if (!isStart) {
    return false
  }
  isStart = false
  isEnd = true
  change = setInterval(function () {
    i++;
    if (i > 8) {
      i = 1;
      t++;
    }
    $('.lottery-Pic').removeClass('active')
    $('.prize-Pic' + i).addClass('active')

  }, 200)
})
$('.closePop').on('click', function () {
  $('.mask').hide()
  $('.pop-prize').text('')
  $('.pop-title').text('啊哦，没有中奖哦')
})