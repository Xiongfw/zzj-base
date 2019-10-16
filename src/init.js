import DevPrintApi from './api/hardware/DevPrintApi.js';
import { error } from './lib/logger/index.js';

var hospital = null;

/** 设置html font-size大小 */
function setHtmlFontSize({ fontSize }) {
  const docEl = document.documentElement
  if (fontSize === false) return
  if (fontSize) {
    docEl.style.fontSize = fontSize
    return
  }
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 1280) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 1280) + 'px';
    }
  };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}

/* 设置标题 */
function setTitle() {
  if (hospital && hospital.hosp_name) {
    document.title = hospital.hosp_name
  }
}
/* 硬件初始化 */
async function devInit() {
  if (!hospital || !hospital.winConfig.win_ext_info) return
  const winExtInfo = JSON.parse(hospital.winConfig.win_ext_info)
  const devs = {
    'printDev': DevPrintApi,
    'readCardDev': null,
    'idCardDev': null,
    'issueCardDev': null,
    'umsDev': null,
    'cashDev': null
  }
  const devKeys = Object.keys(devs)
  for (let key of devKeys) {
    const config = winExtInfo[key]
    if (config) {
      await init(devs[key], config, key)
    }
  }
  async function init(dev, config, devType) {
    try {
      const CloseDeviceRes = await dev.CloseDevice()
      CloseDeviceRes && error(`${devType}|关闭串口失败|${CloseDeviceRes}`)
      const OpenDeviceRes = await dev.OpenDevice({ iPort: config.port, iBaud: config.baud })
      OpenDeviceRes !== 0 && error(`${devType}|打开串口失败|${OpenDeviceRes}`)
      const InitRes = await dev.Init(config)
      InitRes !== 0 && error(`${devType}|初始化失败|${InitRes}`)
    } catch (e) {
      console.error(e)
    }
  }
}

export default function init(config) {
  hospital = config.store.state.common.hospital
  setHtmlFontSize(config)
  setTitle()
  devInit()
  /* 屏蔽右键菜单 */
  document.addEventListener("contextmenu", function (e) { return false; })
  /* 禁止用户两指缩放 */
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  });
}