// This website never authenticates users or calls the debate/AI server.
(() => {
  const value = window.HUMANITIES_WEBSITE_CONFIG?.downloadUrl
  if (value == null) return
  let url
  try {
    url = new URL(value)
    if (typeof value !== 'string' || url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('INVALID_DOWNLOAD_URL')
  } catch {
    document.querySelectorAll('[data-download-area] > span').forEach(node => {
      node.textContent = '다운로드 주소를 확인할 수 없습니다. 확인된 공식 주소가 등록될 때까지 기다려 주세요.'
    })
    return
  }
  document.querySelectorAll('[data-download-area]').forEach(area => {
    const button = area.querySelector('button')
    if (!button) return
    const link = document.createElement('a')
    link.href = url.href
    link.textContent = 'Windows 설치 파일 다운로드'
    link.rel = 'noopener noreferrer'
    link.target = '_blank'
    button.replaceWith(link)
    const status = area.querySelector('span')
    if (status) status.textContent = `다운로드 출처: ${url.hostname} · 파일 이름과 해시를 확인하세요.`
  })
  document.querySelectorAll('[data-download-note]').forEach(node => {
    node.textContent = '아래 공식 다운로드 링크에서 파일을 받을 수 있습니다.'
  })
  document.querySelectorAll('[data-download-summary]').forEach(node => {
    node.textContent = node.dataset.readyText
  })
})()
