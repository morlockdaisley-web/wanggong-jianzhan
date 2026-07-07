/* 恒锐阀门 · 全站脚本:汉堡导航 / 产品筛选 / 留言表单假提交 */
(function () {
  "use strict";

  /* ---------- 汉堡导航 ---------- */
  var hanbao = document.querySelector(".hanbao");
  var cai = document.querySelector(".cai");
  if (hanbao && cai) {
    hanbao.addEventListener("click", function () {
      var kai = cai.classList.toggle("kai");
      hanbao.setAttribute("aria-expanded", kai ? "true" : "false");
    });
    // 点菜单项后自动收起(锚点跳转场景)
    cai.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        cai.classList.remove("kai");
        hanbao.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- products 页:类目筛选 ---------- */
  var shai = document.querySelector(".shaixuan");
  if (shai) {
    var kas = document.querySelectorAll(".pinka");
    var jishu = document.getElementById("shai-jishu");
    shai.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      shai.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("dang", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var lei = btn.getAttribute("data-lei");
      var n = 0;
      kas.forEach(function (ka) {
        var xian = lei === "all" || ka.getAttribute("data-lei") === lei;
        ka.classList.toggle("cang", !xian);
        if (xian) n++;
      });
      if (jishu) jishu.textContent = "当前显示 " + n + " 款";
    });
  }

  /* ---------- contact 页:留言表单假提交 ---------- */
  var biao = document.getElementById("liuyan");
  if (biao) {
    biao.addEventListener("submit", function (e) {
      e.preventDefault(); // 演示站:仅前端校验,不发起任何请求
      var ok = true;

      function yan(id, guize) {
        var input = document.getElementById(id);
        var zu = input.closest(".zu");
        var cuo = !guize(input.value.trim());
        zu.classList.toggle("youcuo", cuo);
        if (cuo) ok = false;
      }

      yan("xingming", function (v) { return v.length >= 2; });
      yan("shouji", function (v) { return /^1[3-9]\d{9}$/.test(v); });
      yan("xuqiu", function (v) { return v.length >= 5; });

      var cheng = document.getElementById("tijiao-cheng");
      if (ok) {
        cheng.classList.add("xian");
        biao.querySelector("button[type=submit]").disabled = true;
        cheng.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        cheng.classList.remove("xian");
      }
    });

    // 输入时即时清除错误态
    biao.addEventListener("input", function (e) {
      var zu = e.target.closest(".zu");
      if (zu) zu.classList.remove("youcuo");
    });
  }
})();
