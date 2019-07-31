import wx from 'weixin-js-sdk'
import { get, post } from './axios.tools'

const obj = {
  initWxConfig () {
    const url: string = window.location.href
    console.log(url)
    post('/wx/home/getSignPackage/pbid/1', {
      url: encodeURIComponent(url)
    }).then((res: any) => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 'wx882fc431aabb74fc', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: [
        'chooseImage',
        'uploadImage',
        'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        'updateTimelineShareData',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'hideMenuItems'
        ] // 必填，需要使用的JS接口列表
      })
    })
  },
  shareAppMessage (opt: any) {
    wx.ready(function () {
      let cheakResult: any
      wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage', 'updateTimelineShareData', 'onMenuShareTimeline'],
        success (res: any) {
          cheakResult = res
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.log(cheakResult.checkResult.updateAppMessageShareData)
          if (cheakResult.checkResult.updateAppMessageShareData) {
            wx.updateAppMessageShareData({
              title: opt.title,
              desc: opt.desc,
              link: opt.link,
              imgUrl: opt.imgUrl,
              success() {}
            })
          }
          if (cheakResult.checkResult.onMenuShareAppMessage) {
            wx.onMenuShareAppMessage({
              title: opt.title,
              desc: opt.desc,
              link: opt.link,
              imgUrl: opt.imgUrl,
              success() {}
            })
          }
          if (res.checkResult.updateTimelineShareData) {
            wx.updateTimelineShareData({
              title: opt.title,
              desc: opt.desc,
              link: opt.link,
              imgUrl: opt.imgUrl,
              success() {}
            })
          }
        }
      })
    })
  },
  hidenMenuFun () { // 隐藏分享
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      })
    })
  },
  shareTimeLine(opt: any) {
    wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
      wx.checkJsApi({
        jsApiList: ['updateTimelineShareData'],
        success (res: any) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          console.log(res.checkResult.updateTimelineShareData)
          if (res.checkResult.updateTimelineShareData) {
            wx.updateTimelineShareData({
              title: opt.title,
              desc: opt.desc,
              link: opt.link,
              imgUrl: opt.imgUrl,
              success() {}
            })
          }
        }
      })
    }) 
  },
  wxPay (opt: any, cb: any): void {
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表,
        success(res: any) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseWXPay":true},"errMsg":"checkJsApi:ok"}
          if (res.checkResult.chooseWXPay) {
            wx.chooseWXPay({
              timestamp: opt.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr:  opt.nonceStr, // 支付签名随机串，不长于 32 位
              package: opt.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: opt.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: opt.sign, // 支付签名
              success (result: any) {
              // 支付成功后的回调函数
                console.log(result)
                cb(result)
              }
            })
          }
        }
      })
    })
  }
}
export default obj
