/* ============================================================
   泰昌食品机械 · 内容管理后台脚本(演示版)
   依赖 js/main.js 暴露的 window.WG(数据层与转义)
   ============================================================ */
(function () {
  'use strict';

  var esc = WG.esc;
  var data = WG.load();

  function save() {
    localStorage.setItem(WG.KEY, JSON.stringify(data));
  }

  /* ---------- toast ---------- */
  var tishi = document.getElementById('tishi');
  var tishiJi = null;
  function toast(msg) {
    tishi.textContent = msg;
    tishi.classList.add('xian');
    clearTimeout(tishiJi);
    tishiJi = setTimeout(function () { tishi.classList.remove('xian'); }, 2600);
  }

  /* ---------- 模块切换 ---------- */
  var caiNius = document.querySelectorAll('.cai-niu');
  caiNius.forEach(function (niu) {
    niu.addEventListener('click', function () {
      caiNius.forEach(function (x) { x.classList.remove('huo'); });
      niu.classList.add('huo');
      document.querySelectorAll('.mokuai').forEach(function (m) {
        m.classList.toggle('huo', m.id === 'mk-' + niu.dataset.mk);
      });
    });
  });

  /* ---------- 通用弹窗 ---------- */
  var zhe = document.getElementById('zhe');
  var tan = document.getElementById('tan');
  function tanKai(html) {
    tan.innerHTML = html;
    zhe.classList.add('kai');
    document.body.style.overflow = 'hidden';
    var guan = tan.querySelector('.tan-guan');
    if (guan) guan.addEventListener('click', tanGuan);
    var quxiao = tan.querySelector('[data-quxiao]');
    if (quxiao) quxiao.addEventListener('click', tanGuan);
  }
  function tanGuan() {
    zhe.classList.remove('kai');
    document.body.style.overflow = '';
    tan.innerHTML = '';
  }
  zhe.addEventListener('click', function (e) { if (e.target === zhe) tanGuan(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && zhe.classList.contains('kai')) tanGuan();
  });

  /* ============================================================
     新闻管理
     ============================================================ */
  var xwBiao = document.getElementById('xw-tbody');

  function xwRender() {
    var lie = WG.sortNews(data.news);
    if (!lie.length) {
      xwBiao.innerHTML = '<tr><td colspan="4"><div class="kong">暂无新闻,点右上角「新增新闻」添加第一条。</div></td></tr>';
      return;
    }
    xwBiao.innerHTML = lie.map(function (n) {
      return '<tr data-id="' + esc(n.id) + '">' +
        '<td class="riqi-ge">' + esc(n.date) + '</td>' +
        '<td><b>' + esc(n.title) + '</b></td>' +
        '<td><span class="zhai">' + esc(n.summary) + '</span></td>' +
        '<td><div class="cao">' +
          '<button class="an an-ci an-xiao js-xw-bian" type="button">编辑</button>' +
          '<button class="an an-wei an-xiao js-xw-shan" type="button">删除</button>' +
        '</div></td></tr>';
    }).join('');
  }

  function xwBianKai(n) { /* n 为 null 时新增 */
    var xin = !n;
    tanKai(
      '<div class="tan-tou"><h2>' + (xin ? '新增新闻' : '编辑新闻') + '</h2>' +
      '<button class="tan-guan" type="button" aria-label="关闭">✕</button></div>' +
      '<div class="bd-hang"><label for="t-biaoti">标题</label>' +
      '<input id="t-biaoti" type="text" value="' + esc(n ? n.title : '') + '">' +
      '<p class="bd-cuo" id="t-biaoti-cuo">标题不能为空</p></div>' +
      '<div class="bd-hang"><label for="t-riqi">日期</label>' +
      '<input id="t-riqi" type="date" value="' + esc(n ? n.date : '2026-07-07') + '">' +
      '<p class="bd-cuo" id="t-riqi-cuo">请选择日期</p></div>' +
      '<div class="bd-hang"><label for="t-zhaiyao">摘要</label>' +
      '<textarea id="t-zhaiyao">' + esc(n ? n.summary : '') + '</textarea>' +
      '<p class="shuo">列表与首页新闻区显示的一句话摘要</p></div>' +
      '<div class="tan-jiao">' +
      '<button class="an an-ci" type="button" data-quxiao>取消</button>' +
      '<button class="an an-zhu" type="button" id="t-baocun">保存</button></div>'
    );
    document.getElementById('t-baocun').addEventListener('click', function () {
      var biaoti = document.getElementById('t-biaoti');
      var riqi = document.getElementById('t-riqi');
      var ok = true;
      document.getElementById('t-biaoti-cuo').classList.toggle('xian', !biaoti.value.trim());
      document.getElementById('t-riqi-cuo').classList.toggle('xian', !riqi.value);
      if (!biaoti.value.trim() || !riqi.value) return;
      var zhaiyao = document.getElementById('t-zhaiyao').value.trim();
      if (xin) {
        data.news.unshift({
          id: 'n' + Date.now(),
          title: biaoti.value.trim(),
          date: riqi.value,
          summary: zhaiyao,
          body: zhaiyao
        });
      } else {
        n.title = biaoti.value.trim();
        n.date = riqi.value;
        n.summary = zhaiyao;
      }
      save();
      xwRender();
      tanGuan();
      toast(xin ? '新闻已新增,前台刷新即生效' : '新闻已保存,前台刷新即生效');
    });
  }

  document.getElementById('xw-xinzeng').addEventListener('click', function () { xwBianKai(null); });

  xwBiao.addEventListener('click', function (e) {
    var tr = e.target.closest('tr[data-id]');
    if (!tr) return;
    var n = data.news.filter(function (x) { return x.id === tr.dataset.id; })[0];
    if (!n) return;
    if (e.target.closest('.js-xw-bian')) xwBianKai(n);
    if (e.target.closest('.js-xw-shan')) {
      /* 自定义确认弹窗(不使用阻塞式 confirm) */
      tanKai(
        '<div class="tan-tou"><h2>删除新闻</h2>' +
        '<button class="tan-guan" type="button" aria-label="关闭">✕</button></div>' +
        '<p class="ti">确定删除 <b>「' + esc(n.title) + '」</b> 吗?删除后前台不再显示,此操作不可撤销。</p>' +
        '<div class="tan-jiao">' +
        '<button class="an an-ci" type="button" data-quxiao>取消</button>' +
        '<button class="an an-wei" type="button" id="t-shanchu">确认删除</button></div>'
      );
      document.getElementById('t-shanchu').addEventListener('click', function () {
        data.news = data.news.filter(function (x) { return x.id !== n.id; });
        save();
        xwRender();
        tanGuan();
        toast('新闻已删除,前台刷新即生效');
      });
    }
  });

  /* ============================================================
     产品管理
     ============================================================ */
  var cpBiao = document.getElementById('cp-tbody');

  function cpRender() {
    cpBiao.innerHTML = data.products.map(function (p) {
      return '<tr data-id="' + esc(p.id) + '">' +
        '<td style="white-space:nowrap">' + esc(WG.CATS[p.cat] || p.cat) + '</td>' +
        '<td><b>' + esc(p.name) + '</b></td>' +
        '<td><span class="xh">' + esc(p.model) + '</span></td>' +
        '<td><span class="zhai">' + esc(p.capacity) + '</span></td>' +
        '<td><span class="zhai">' + esc(p.scene) + '</span></td>' +
        '<td><button class="an an-ci an-xiao js-cp-bian" type="button">编辑</button></td></tr>';
    }).join('');
  }

  cpBiao.addEventListener('click', function (e) {
    if (!e.target.closest('.js-cp-bian')) return;
    var tr = e.target.closest('tr[data-id]');
    var p = data.products.filter(function (x) { return x.id === tr.dataset.id; })[0];
    if (!p) return;
    tanKai(
      '<div class="tan-tou"><h2>编辑产品</h2>' +
      '<button class="tan-guan" type="button" aria-label="关闭">✕</button></div>' +
      '<div class="bd-hang"><label for="t-mingcheng">产品名称</label>' +
      '<input id="t-mingcheng" type="text" value="' + esc(p.name) + '">' +
      '<p class="bd-cuo" id="t-mingcheng-cuo">名称不能为空</p></div>' +
      '<div class="bd-hang"><label for="t-xinghao">型号</label>' +
      '<input id="t-xinghao" type="text" value="' + esc(p.model) + '">' +
      '<p class="bd-cuo" id="t-xinghao-cuo">型号不能为空</p></div>' +
      '<div class="bd-hang"><label for="t-canshu">产能参数</label>' +
      '<input id="t-canshu" type="text" value="' + esc(p.capacity) + '">' +
      '<p class="shuo">例:缸容 350L · 单批和面 150kg</p></div>' +
      '<div class="bd-hang"><label for="t-changjing">适用场景</label>' +
      '<input id="t-changjing" type="text" value="' + esc(p.scene) + '"></div>' +
      '<div class="tan-jiao">' +
      '<button class="an an-ci" type="button" data-quxiao>取消</button>' +
      '<button class="an an-zhu" type="button" id="t-baocun">保存</button></div>'
    );
    document.getElementById('t-baocun').addEventListener('click', function () {
      var mingcheng = document.getElementById('t-mingcheng');
      var xinghao = document.getElementById('t-xinghao');
      document.getElementById('t-mingcheng-cuo').classList.toggle('xian', !mingcheng.value.trim());
      document.getElementById('t-xinghao-cuo').classList.toggle('xian', !xinghao.value.trim());
      if (!mingcheng.value.trim() || !xinghao.value.trim()) return;
      p.name = mingcheng.value.trim();
      p.model = xinghao.value.trim();
      p.capacity = document.getElementById('t-canshu').value.trim();
      p.scene = document.getElementById('t-changjing').value.trim();
      save();
      cpRender();
      tanGuan();
      toast('产品已保存,前台刷新即生效');
    });
  });

  /* ============================================================
     企业信息
     ============================================================ */
  var qyDianhua = document.getElementById('qy-dianhua');
  var qyDizhi = document.getElementById('qy-dizhi');
  qyDianhua.value = data.company.phone;
  qyDizhi.value = data.company.address;

  document.getElementById('qy-baocun').addEventListener('click', function () {
    var dianhuaCuo = document.getElementById('qy-dianhua-cuo');
    var dizhiCuo = document.getElementById('qy-dizhi-cuo');
    dianhuaCuo.classList.toggle('xian', !qyDianhua.value.trim());
    dizhiCuo.classList.toggle('xian', !qyDizhi.value.trim());
    if (!qyDianhua.value.trim() || !qyDizhi.value.trim()) return;
    data.company.phone = qyDianhua.value.trim();
    data.company.address = qyDizhi.value.trim();
    save();
    toast('企业信息已保存,前台页脚与联系页刷新即生效');
  });

  /* ============================================================
     恢复演示数据
     ============================================================ */
  document.getElementById('chongzhi').addEventListener('click', function () {
    tanKai(
      '<div class="tan-tou"><h2>恢复演示数据</h2>' +
      '<button class="tan-guan" type="button" aria-label="关闭">✕</button></div>' +
      '<p class="ti">将把新闻、产品与企业信息全部恢复为出厂演示内容,你在后台做过的修改会被覆盖。确定继续?</p>' +
      '<div class="tan-jiao">' +
      '<button class="an an-ci" type="button" data-quxiao>取消</button>' +
      '<button class="an an-zhu" type="button" id="t-huifu">恢复演示数据</button></div>'
    );
    document.getElementById('t-huifu').addEventListener('click', function () {
      data = JSON.parse(JSON.stringify(WG.SEED));
      save();
      xwRender();
      cpRender();
      qyDianhua.value = data.company.phone;
      qyDizhi.value = data.company.address;
      tanGuan();
      toast('已恢复演示数据');
    });
  });

  /* ---------- 初始渲染 ---------- */
  xwRender();
  cpRender();
})();
