/* 立衡律师事务所 · 交互脚本(无外部依赖) */
(function () {
  'use strict';

  /* ---------- 移动端菜单 ---------- */
  var hanbao = document.querySelector('.hanbao');
  var daohang = document.querySelector('.daohang');

  if (hanbao && daohang) {
    hanbao.addEventListener('click', function () {
      var kai = daohang.classList.toggle('kai');
      hanbao.setAttribute('aria-expanded', kai ? 'true' : 'false');
      hanbao.setAttribute('aria-label', kai ? '关闭菜单' : '打开菜单');
      document.body.classList.toggle('suoding', kai);
    });

    // 点击菜单内链接后收起(锚点跳转场景)
    daohang.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        daohang.classList.remove('kai');
        hanbao.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('suoding');
      }
    });
  }

  /* ---------- 预约表单:前端校验 + 假提交 ---------- */
  var biao = document.getElementById('yuyue-form');

  if (biao) {
    var shoujiZQ = /^1[3-9]\d{9}$/;

    function baocuo(id, you) {
      var zu = document.getElementById(id).closest('.biao-zu');
      var tishi = document.getElementById('cuowu-' + id);
      zu.classList.toggle('cuo', you);
      if (tishi) { tishi.hidden = !you; }
    }

    biao.addEventListener('submit', function (e) {
      e.preventDefault(); // 演示站:禁止真实请求

      var chenghu = document.getElementById('chenghu');
      var dianhua = document.getElementById('dianhua');
      var shixiang = document.getElementById('shixiang');

      var cuoChenghu = chenghu.value.trim() === '';
      var cuoDianhua = !shoujiZQ.test(dianhua.value.trim());
      var cuoShixiang = shixiang.value === '';

      baocuo('chenghu', cuoChenghu);
      baocuo('dianhua', cuoDianhua);
      baocuo('shixiang', cuoShixiang);

      if (cuoChenghu || cuoDianhua || cuoShixiang) {
        var shouCuo = biao.querySelector('.biao-zu.cuo input, .biao-zu.cuo select');
        if (shouCuo) { shouCuo.focus(); }
        return;
      }

      // 成功态:隐藏表单,显示回执
      biao.hidden = true;
      var chenggong = document.getElementById('chenggong');
      if (chenggong) {
        chenggong.hidden = false;
        chenggong.scrollIntoView({ block: 'center' });
      }
    });

    // 输入时即时清除错误态
    ['chenghu', 'dianhua', 'shixiang'].forEach(function (id) {
      var kong = document.getElementById(id);
      kong.addEventListener('input', function () { baocuo(id, false); });
      kong.addEventListener('change', function () { baocuo(id, false); });
    });
  }
})();
