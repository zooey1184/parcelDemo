import $ from 'jquery'
import {appHost, isApp} from '@/common/js/business.js'
let APP_HOST = appHost()
export function wxShare(type, id = 0) {
  var share_id = id;
  var share_type = type || 'licai';
  var url = window.location.href.split('#')[0];
  var default_image = 'https://r.51gjj.com/image/static/ico_fenx.png'; //默认图片
  $.ajax({
    //获取分享的配置信息
    url: APP_HOST + "/app/share/share_info",
    type: 'get',
    data: {
      url: encodeURIComponent(window.location.href.split('#')[0]),
      share_id: 0,
      share_type: share_type
    },
    dataType: 'jsonp',
    success: function(data) {
      share_callback(data);
    }
  });

  function share_callback(data) {
    wx.config({
      appId: data.appId, //配置的微信服务号订阅号的APPID
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'jsApiList']
    });
    wx.ready(function() {
      var share_data = {
        title: data.title != '' ? data.title : $(document).attr("title"), //默认头信息
        link: data.link != '' ? data.link : url, //当前链接
        imgUrl: data.image != '' ? data.image : 'https://r.51gjj.com/image/static/ico_fenx.png', //默认链接
        desc: data.description != '' ? data.description : "51有钱",
      };
      wx.onMenuShareTimeline(share_data);
      wx.onMenuShareAppMessage(share_data);
      wx.onMenuShareQQ(share_data);
      wx.onMenuShareWeibo(share_data);
      wx.onMenuShareQZone(share_data)
    });
    window.wx = wx;
  }
}
