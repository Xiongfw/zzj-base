import { WHTApi } from "./api/index.js"

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

/** 保存硬件信息 */
async function saveHardwareInfo({ store }) {
  const { getWinConfigId: winConfigId } = store.getters
  if (winConfigId) {
    const hardwareInfo = await WHTApi.getInfoByWinConfigId({ winConfigId })
    store.commit("setHardWare", hardwareInfo)
  }
}

export default function init(config) {
  setHtmlFontSize(config)
  saveHardwareInfo(config)
  /* 屏蔽右键菜单 */
  document.addEventListener("contextmenu", function (e) { return false; })
  /* 禁止用户两指缩放 */
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  });
}