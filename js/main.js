/* ============================================================
   王工建站 · 交互脚本
   只做三件事:
   ① 点击 CTA → 复制店名「王工文档铺」→ 浮出提示
   ② 滚动时区块淡入(IntersectionObserver,轻量,带降级)
   ③ 移动端无任何阻塞交互(不用 alert / prompt / confirm)
   —— 无外部请求、无第三方脚本 ——
   ============================================================ */
(function () {
  "use strict";

  /* ---------- ① 复制店名 + toast 提示 ---------- */
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-show");
    }, 2600);
  }

  function copyText(text) {
    // 优先用现代剪贴板 API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // 兜底:execCommand(适配 file:// 或非安全上下文)
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("execCommand failed"));
      } catch (e) {
        reject(e);
      }
    });
  }

  var copyBtns = document.querySelectorAll("[data-copy]");
  Array.prototype.forEach.call(copyBtns, function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      copyText(text).then(
        function () {
          showToast("店名已复制,请打开淘宝 APP 搜索");
        },
        function () {
          // 复制失败也给出引导,保证转化不断链
          showToast("请在淘宝 APP 搜索:" + text);
        }
      );
    });
  });

  /* ---------- ② 滚动淡入(IntersectionObserver,带降级) ---------- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    Array.prototype.forEach.call(reveals, function (el) {
      io.observe(el);
    });
  } else {
    // 不支持则直接全部显示,杜绝内容被隐藏
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add("is-visible");
    });
  }
})();
