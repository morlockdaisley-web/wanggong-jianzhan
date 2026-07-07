/* ============================================================
   泰昌食品机械 · 前台脚本
   数据层:localStorage 键 wg_web_tc_v1(admin.html 写,前台读)
   ============================================================ */
(function () {
  'use strict';

  var WG_KEY = 'wg_web_tc_v1';

  /* ---------- 内置种子数据(无数据时自动写入) ---------- */
  var WG_SEED = {
    version: 1,
    company: {
      phone: '138****2856',
      address: '山东省诸城市兴华东路'
    },
    news: [
      {
        id: 'n1', date: '2026-06-18',
        title: '泰昌 TC-350 型卧式和面机通过出厂检验,首批 12 台交付华东经销商',
        summary: '本批设备逐台完成 4 小时满载试机,搅拌轴摆差、缸体焊缝着色探伤全部合格,随车附检验记录单发运。',
        body: '6 月中旬,TC-350 型卧式和面机本年度第三批次共 12 台在总装车间完成出厂检验。检验按公司企标执行:每台设备满载 150kg 面粉连续试机 4 小时,记录电机温升与噪声值;搅拌轴摆差控制在 0.15mm 以内;与物料接触的缸体焊缝逐条做着色探伤。\n本批设备已于 6 月 18 日随车附检验记录单发往华东区经销商仓库。经销商可凭设备编号在售后档案中调取对应的试机数据,便于后续维保对账。'
      },
      {
        id: 'n2', date: '2026-05-27',
        title: 'GZ-12 直线式酱料灌装线完成客户现场联调,灌装精度稳定在 ±1.5% 以内',
        summary: '针对高黏度豆瓣酱物料,调试组重新标定了活塞缸行程与下料阀开度,连续灌装 2000 瓶抽检全部合格。',
        body: '5 月下旬,售后调试组赴客户车间完成 GZ-12 直线式酱料灌装线的现场联调。该客户物料为高黏度豆瓣酱,常温流动性差,调试组针对性放大了下料阀开度并重新标定活塞缸行程,同时将灌装嘴更换为防拉丝斜口结构。\n联调阶段按 500ml 装量连续灌装 2000 瓶,逐箱抽检称重,装量偏差全部落在 ±1.5% 以内,瓶口无挂料。客户方设备科当场在联调记录上签字确认,产线转入试生产。'
      },
      {
        id: 'n3', date: '2026-05-09',
        title: '公司通过 ISO 9001:2015 质量管理体系年度监督审核',
        summary: '审核组对采购进货检验、焊接过程控制、成品出厂检验三个环节做了现场抽查,未开具不符合项。',
        body: '5 月上旬,认证机构审核组对公司质量管理体系进行年度监督审核。本次审核覆盖设计开发、采购、制造过程与售后服务全流程,重点抽查了不锈钢板材进货复验记录、压力容器焊工持证情况以及成品出厂检验单的可追溯性。\n审核结论为体系运行有效,未开具不符合项。质量部同步把本次审核中提出的两条观察项(工装台账更新周期、检具送检提醒机制)列入季度改进计划。'
      },
      {
        id: 'n4', date: '2026-04-15',
        title: '泰昌参加华东食品加工机械展,真空和面与隧道杀菌两条演示线现场运行',
        summary: '展位按小型车间布置,TC-200 真空和面机与 SJ-1000 隧道杀菌机通电运行,观众可现场查看和面筋度对比样品。',
        body: '4 月中旬,公司参加华东食品加工机械展。展位没有采用常规的静态陈列,而是按小型车间布置:TC-200 真空和面机与 SJ-1000 隧道式巴氏杀菌机全程通电运行,并准备了真空和面与常压和面的面团筋度对比样品供观众拉伸比对。\n三天展期共登记意向客户 60 余家,以烘焙中央工厂和酱料代工厂为主。展会集中反馈的小批量试产需求,已转交方案组评估小型化机型的排产可行性。'
      },
      {
        id: 'n5', date: '2026-03-22',
        title: 'SJ-1000 隧道式巴氏杀菌机升级变频温控模块,带面温差收窄至 ±1℃',
        summary: '三温区各自增配变频循环泵与独立 PID 回路,升级后带面横向温差由 ±3℃ 收窄至 ±1℃。',
        body: '3 月,技术部完成 SJ-1000 隧道式巴氏杀菌机温控系统升级:三个温区各自增配变频循环泵,喷淋水量随温差自动调节,并将原先共用的温控回路拆分为三路独立 PID。\n按新工艺文件复测,网带横向五点测温的最大温差由 ±3℃ 收窄至 ±1℃,对热敏性酱体的色泽保持有明显改善。该配置自 4 月起作为 SJ-1000 标准配置随机交付,存量设备可预约返厂或现场加装。'
      },
      {
        id: 'n6', date: '2026-02-26',
        title: '二号装配车间投产,整机年装配能力提升至 3000 台套',
        summary: '新车间布置装配线 2 条、整机试机位 8 个,灌装线类长周期订单的交付周期预计缩短 10 天左右。',
        body: '2 月底,二号装配车间正式投产。车间建筑面积 4200㎡,布置装配线 2 条、整机通电试机位 8 个,并单独隔出洁净装配间用于灌装阀组与乳化头等精密部件的装配。\n投产后公司整机年装配能力由 2000 台套提升至 3000 台套,原先排队占用试机位的灌装线类长周期订单,交付周期预计可缩短 10 天左右。'
      },
      {
        id: 'n7', date: '2026-01-15',
        title: 'TC-200 真空和面机获实用新型专利授权,面筋形成时间缩短约五分之一',
        summary: '专利涉及缸体密封结构与抽真空时序控制,实测在 −0.08MPa 工况下面筋形成时间缩短约 20%。',
        body: '1 月,公司申报的“一种真空和面机缸体密封结构”获实用新型专利授权。该结构把缸盖密封由单圈硅胶条改为双唇口组合密封,配合抽真空时序控制程序,解决了老机型在 −0.08MPa 附近保压易泄漏的问题。\n按面粉品牌分组实测,真空工况下面筋形成时间较常压和面缩短约 20%,面团断面气孔更细密。相关结构已应用于在产的 TC-200 全系机型。'
      },
      {
        id: 'n8', date: '2025-12-20',
        title: '西北某乳品企业酸奶灌装线项目通过验收,连续运行 72 小时无故障',
        summary: '整线含配料搅拌、巴氏杀菌与 GZ-24 回转灌装三段,验收按连续 72 小时运行考核,中途零停机。',
        body: '12 月中旬,公司为西北某乳品企业配套的酸奶灌装线项目通过最终验收。整线由 JB-300 配料搅拌、SJ-1000 巴氏杀菌与 GZ-24 回转式灌装三段组成,由我方承担整线工艺衔接与电控联锁设计。\n验收按合同约定连续运行 72 小时考核,期间灌装装量抽检合格率 100%,设备零停机。项目组同步向客户交付了整线操作规程与易损件清单,并完成两班次操作工培训。'
      }
    ],
    products: [
      { id: 'p1', cat: 'hemian', name: '卧式和面机', model: 'TC-350',
        capacity: '缸容 350L · 单批和面 150kg', scene: '面包中央工厂、速冻面点车间',
        detail: {
          intro: 'U 形缸体配 S 形搅拌桨,双速电机低速拌粉、高速出筋;缸体液压翻转出料,适合每天多批次连续和面的车间。',
          params: [
            ['缸体容积', '350L'],
            ['单批处理量(面粉)', '150kg'],
            ['搅拌转速', '24 / 48 r/min 双速'],
            ['电机功率', '11kW'],
            ['接料部件材质', 'SUS304 不锈钢'],
            ['外形尺寸', '1980×1150×1420mm'],
            ['整机重量', '约 860kg']
          ]
        }
      },
      { id: 'p2', cat: 'hemian', name: '双速双动和面机', model: 'TC-500',
        capacity: '缸容 500L · 单批和面 200kg', scene: '大型烘焙工厂、馒头生产线前段' },
      { id: 'p3', cat: 'hemian', name: '真空和面机', model: 'TC-200',
        capacity: '缸容 200L · 真空度 −0.08MPa', scene: '高含水面团、面条与饺子皮工厂' },
      { id: 'p4', cat: 'jiaoban', name: '行星搅拌机', model: 'JB-100',
        capacity: '容积 100L · 三档变速', scene: '奶油打发、馅料调制、连锁蛋糕房' },
      { id: 'p5', cat: 'jiaoban', name: '高剪切乳化搅拌机', model: 'JB-300',
        capacity: '有效容积 300L · 乳化头 2900r/min', scene: '沙拉酱、辣椒酱等酱体乳化' },
      { id: 'p6', cat: 'jiaoban', name: '卧式螺带混合机', model: 'JB-600',
        capacity: '有效容积 600L · 混合均匀度 CV≤5%', scene: '预拌粉、复合调味粉干混' },
      { id: 'p7', cat: 'guanzhuang', name: '直线式酱料灌装线', model: 'GZ-12',
        capacity: '12 灌装头 · 约 3000 瓶/时', scene: '豆瓣酱、蜂蜜等高黏度物料',
        detail: {
          intro: '活塞式定量灌装,伺服下料阀防拉丝滴漏;直线结构换瓶型只需更换星轮与调节导轨,适合多规格小批量的酱料工厂。',
          params: [
            ['灌装头数', '12 头'],
            ['灌装量范围', '100–1000ml 可调'],
            ['灌装精度', '±1.5%'],
            ['生产能力', '约 3000 瓶/时(按 500ml)'],
            ['适配瓶型', '圆瓶、方瓶(换模切换)'],
            ['气源要求', '0.6MPa 洁净压缩空气'],
            ['整线功率', '5.5kW']
          ]
        }
      },
      { id: 'p8', cat: 'guanzhuang', name: '回转式液体灌装机', model: 'GZ-24',
        capacity: '24 灌装头 · 约 8000 瓶/时', scene: '饮料、乳品等低黏度液体' },
      { id: 'p9', cat: 'shajun', name: '隧道式巴氏杀菌机', model: 'SJ-1000',
        capacity: '网带宽 1000mm · 65–95℃ 分区控温', scene: '瓶装酱料、酱菜巴氏杀菌',
        detail: {
          intro: '三温区独立 PID 控温,变频网带无级调速;喷淋循环水自带过滤回用,蒸汽与电加热两种热源可选。',
          params: [
            ['网带宽度', '1000mm'],
            ['温区数量', '3 区独立控温'],
            ['温控精度', '±1℃'],
            ['杀菌温度', '65–95℃ 可调'],
            ['网带速度', '变频 0.3–1.5m/min'],
            ['加热方式', '蒸汽 / 电加热可选'],
            ['箱体材质', 'SUS304 不锈钢']
          ]
        }
      },
      { id: 'p10', cat: 'shajun', name: '双层蒸汽杀菌锅', model: 'SJ-500',
        capacity: '容积 500L · 最高 121℃', scene: '罐头、真空包装熟食高温灭菌' }
    ]
  };

  var CATS = {
    hemian: '和面设备',
    jiaoban: '搅拌设备',
    guanzhuang: '灌装设备',
    shajun: '杀菌设备'
  };

  /* ---------- 数据读写 ---------- */
  function wgLoad() {
    var data = null;
    try {
      data = JSON.parse(localStorage.getItem(WG_KEY));
    } catch (e) { data = null; }
    if (!data || !data.news || !data.products || !data.company) {
      data = JSON.parse(JSON.stringify(WG_SEED));
      try { localStorage.setItem(WG_KEY, JSON.stringify(data)); } catch (e) { /* 隐私模式下降级为只读 */ }
    }
    return data;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function sortNews(list) {
    return list.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  /* 对外暴露给 admin.js 复用 */
  window.WG = { KEY: WG_KEY, SEED: WG_SEED, CATS: CATS, load: wgLoad, esc: esc, sortNews: sortNews };

  var data = wgLoad();

  /* ---------- 导航:汉堡菜单 ---------- */
  var hanbao = document.querySelector('.hanbao');
  var cai = document.querySelector('.dh-cai');
  if (hanbao && cai) {
    hanbao.addEventListener('click', function () {
      var kai = cai.classList.toggle('kai');
      hanbao.setAttribute('aria-expanded', kai ? 'true' : 'false');
      hanbao.setAttribute('aria-label', kai ? '关闭菜单' : '打开菜单');
    });
  }

  /* ---------- 页脚 / 通用联系信息注入(读 localStorage) ---------- */
  document.querySelectorAll('.js-phone').forEach(function (el) {
    el.textContent = data.company.phone;
  });
  document.querySelectorAll('.js-addr').forEach(function (el) {
    el.textContent = data.company.address;
  });

  /* ---------- index:最新新闻 3 条 ---------- */
  var zuixin = document.getElementById('zuixin-xinwen');
  if (zuixin) {
    var top3 = sortNews(data.news).slice(0, 3);
    zuixin.innerHTML = top3.map(function (n) {
      return '<a class="xinwen-ka" href="news.html#' + esc(n.id) + '">' +
        '<time datetime="' + esc(n.date) + '">' + esc(n.date) + '</time>' +
        '<h3>' + esc(n.title) + '</h3>' +
        '<p>' + esc(n.summary) + '</p>' +
        '</a>';
    }).join('');
  }

  /* ---------- products:产品卡渲染 + 详情弹层 ---------- */
  var cpYe = document.getElementById('cp-ye');
  if (cpYe) {
    Object.keys(CATS).forEach(function (cat) {
      var wang = document.querySelector('.cp-wang[data-cat="' + cat + '"]');
      if (!wang) return;
      var lie = data.products.filter(function (p) { return p.cat === cat; });
      wang.innerHTML = lie.map(function (p) {
        var niu = p.detail
          ? '<button class="niu niu-xi js-xiangqing" data-id="' + esc(p.id) + '" type="button">查看详情参数</button>'
          : '<span class="cp-chang" style="margin-top:auto">详细参数请来电索取选型样本</span>';
        return '<article class="cp-ka">' +
          '<div class="cp-tu"><svg viewBox="0 0 360 240" role="img" aria-label="' + esc(p.name) + ' 结构示意图"><use href="#svg-' + esc(p.id) + '"></use></svg></div>' +
          '<div class="cp-nei">' +
            '<div class="hang1"><h3>' + esc(p.name) + '</h3><span class="xinghao">' + esc(p.model) + '</span></div>' +
            '<p class="cp-can"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#0F8B7E" stroke-width="2"/></svg><span>' + esc(p.capacity) + '</span></p>' +
            '<p class="cp-chang">适用:' + esc(p.scene) + '</p>' +
            niu +
          '</div></article>';
      }).join('');
    });

    /* 详情弹层 */
    var zhe = document.getElementById('cp-zhe');
    var tcNei = document.getElementById('tc-nei');
    function guanbi() {
      zhe.classList.remove('kai');
      document.body.style.overflow = '';
    }
    cpYe.addEventListener('click', function (e) {
      var niu = e.target.closest('.js-xiangqing');
      if (!niu) return;
      var p = data.products.filter(function (x) { return x.id === niu.dataset.id; })[0];
      if (!p || !p.detail) return;
      tcNei.innerHTML =
        '<h3>' + esc(p.name) + ' <span class="xinghao">' + esc(p.model) + '</span></h3>' +
        '<p class="tc-jie">' + esc(p.detail.intro) + '</p>' +
        '<div class="tc-tu"><svg viewBox="0 0 360 240" role="img" aria-label="' + esc(p.name) + ' 结构示意图"><use href="#svg-' + esc(p.id) + '"></use></svg></div>' +
        '<table class="can-biao"><caption class="zhu13" style="text-align:left;padding-bottom:8px">主要技术参数(以出厂随机文件为准)</caption>' +
        p.detail.params.map(function (kv) {
          return '<tr><th scope="row">' + esc(kv[0]) + '</th><td>' + esc(kv[1]) + '</td></tr>';
        }).join('') +
        '</table>' +
        '<div class="anzu"><a class="niu niu-shi" href="contact.html#xunjia-biaodan">就该型号询价</a>' +
        '<a class="niu niu-xi" href="solutions.html">查看整线方案</a></div>';
      zhe.classList.add('kai');
      document.body.style.overflow = 'hidden';
      document.getElementById('tc-guan').focus();
    });
    document.getElementById('tc-guan').addEventListener('click', guanbi);
    zhe.addEventListener('click', function (e) { if (e.target === zhe) guanbi(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && zhe.classList.contains('kai')) guanbi();
    });
  }

  /* ---------- news:列表 + 详情 ---------- */
  var xwLie = document.getElementById('xw-lie');
  var xwXiang = document.getElementById('xw-xiang');
  if (xwLie && xwXiang) {
    var paixu = sortNews(data.news);

    function xuanLie() {
      xwXiang.hidden = true;
      xwLie.hidden = false;
      xwLie.innerHTML = paixu.map(function (n) {
        var fen = n.date.split('-'); /* [年, 月, 日] */
        return '<button class="xw-tiao js-xw" data-id="' + esc(n.id) + '" type="button">' +
          '<span class="xw-riqi"><b>' + esc(fen[2] || '') + '</b><span>' + esc(fen[0] + '.' + fen[1]) + '</span></span>' +
          '<span><h3>' + esc(n.title) + '</h3><p>' + esc(n.summary) + '</p></span>' +
          '</button>';
      }).join('');
    }

    function xuanXiang(id) {
      var n = paixu.filter(function (x) { return x.id === id; })[0];
      if (!n) { xuanLie(); return; }
      var duan = String(n.body || n.summary || '').split('\n').map(function (d) {
        return '<p>' + esc(d) + '</p>';
      }).join('');
      xwXiang.innerHTML =
        '<button class="niu niu-xi fanhui" id="xw-fanhui" type="button">← 返回新闻列表</button>' +
        '<article><time datetime="' + esc(n.date) + '">' + esc(n.date) + ' · 公司动态</time>' +
        '<h2>' + esc(n.title) + '</h2>' +
        '<div class="zhengwen">' + duan + '</div></article>';
      xwLie.hidden = true;
      xwXiang.hidden = false;
      document.getElementById('xw-fanhui').addEventListener('click', function () {
        history.replaceState(null, '', 'news.html');
        xuanLie();
        window.scrollTo({ top: 0 });
      });
      window.scrollTo({ top: 0 });
    }

    xwLie.addEventListener('click', function (e) {
      var tiao = e.target.closest('.js-xw');
      if (tiao) {
        history.replaceState(null, '', '#' + tiao.dataset.id);
        xuanXiang(tiao.dataset.id);
      }
    });

    var hash = location.hash.replace('#', '');
    if (hash) { xuanLie(); xuanXiang(hash); } else { xuanLie(); }
  }

  /* ---------- contact:联系信息卡(读 localStorage) ---------- */
  var lxDianhua = document.getElementById('lx-dianhua');
  if (lxDianhua) lxDianhua.textContent = data.company.phone;
  var lxDizhi = document.getElementById('lx-dizhi');
  if (lxDizhi) lxDizhi.textContent = data.company.address;

  /* ---------- 询价表单:前端校验 + 假提交 ---------- */
  var biaodan = document.getElementById('xunjia-form');
  if (biaodan) {
    function shePei(input, cuoEl, xian) {
      input.classList.toggle('cuo-kuang', xian);
      cuoEl.classList.toggle('xian', xian);
    }
    biaodan.addEventListener('submit', function (e) {
      e.preventDefault(); /* 演示站:仅前端反馈,不发出任何请求 */
      var ming = document.getElementById('bd-ming');
      var shouji = document.getElementById('bd-shouji');
      var mingCuo = document.getElementById('cuo-ming');
      var shoujiCuo = document.getElementById('cuo-shouji');
      var ok = true;
      if (!ming.value.trim()) { shePei(ming, mingCuo, true); ok = false; }
      else shePei(ming, mingCuo, false);
      if (!/^1[3-9]\d{9}$/.test(shouji.value.trim())) { shePei(shouji, shoujiCuo, true); ok = false; }
      else shePei(shouji, shoujiCuo, false);
      if (!ok) return;
      biaodan.hidden = true;
      var cheng = document.getElementById('bd-cheng');
      cheng.classList.add('xian');
      cheng.focus && cheng.focus();
    });
  }
})();
