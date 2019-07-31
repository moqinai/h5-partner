export default function () {
  const doc: any = window.document
  const docEle: any = doc.documentElement
  let viewport: any = doc.querySelector('meta[name=viewport]')
  let scale: number = 0
  let dpr: number = 0
  let m: any

  if (viewport) {
    // 根据视口配置设置缩放比例，而不是自适应。
    m = viewport.getAttribute('content').match(/initial-scale=([\d.]+)/)
    if (m) {
      scale = +m[1]
      dpr = ~~(1 / scale)
    }
  } else {
    m = window.navigator.userAgent.match(/iPhone|iPod|iPad/)
    if (m) {
      dpr = ~~window.devicePixelRatio
      dpr = dpr >= 3 ? 3 : dpr
      dpr = dpr <= 1 ? 1 : dpr
    } else {
      dpr = 1
    }
    scale = 1 / dpr

    viewport = doc.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', ['initial-scale', 'maximum-scale', 'minimum-scale', 'user-scalable=no'].join('=' + scale + ', '))

    if (docEle.firstElementChild) {
      docEle.firstElementChild.appendChild(viewport)
      viewport = null
    }
  }

  let tid: any = null
  let rem: number = 12
  const forceRefresh = () => {
    // 刷新 dpr 对应的 rem 字号大小
    let w = docEle.getBoundingClientRect().width
    if (w / dpr > 540) {
      w = 540 * dpr
    }
    rem = w / 375 * 100
    docEle.style.fontSize = rem + 'px';
    (window as any).viewportHeight = Math.round(docEle.clientHeight / rem * 1000) / 1000
  }
  const refresh = () => {
    clearTimeout(tid)
    tid = setTimeout(forceRefresh, 300)
  }

  window.addEventListener('resize', refresh, false)
  window.addEventListener('pageshow', refresh, false)

  forceRefresh()
  docEle.setAttribute('data-dpr', dpr)
}
