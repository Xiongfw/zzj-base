import globalConfig from '../../globalConfig.js'

const audio = new Audio();
const defaultExtension = '.wav'

/** 播放 */
function play(filename = "") {
  return new Promise(resolve => {
    if (filename.startsWith('http')) {
      audio.src = filename
    } else if (filename.includes('.')) {
      audio.src = globalConfig.audio.baseUrl + filename
    } else {
      audio.src = globalConfig.audio.baseUrl + filename + defaultExtension
    }
    audio.play()
    audio.onended = e => resolve(e)
  })
}

function pause() {
  // 没有播放完成就暂停
  if (!audio.ended) {
    audio.pause()
  }
}

export default {
  play,
  pause
}