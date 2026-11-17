// Local, user-initiated video playback only; no authentication or AI requests.
(() => {
  const video = document.getElementById('program-demo')
  const button = document.querySelector('.demo-play')
  const status = document.querySelector('[data-demo-status]')
  if (!video || !button) return
  button.hidden = false
  button.addEventListener('click', event => {
    if (status) status.textContent = ''
    video.play().then(() => {
      // Move keyboard focus after playback starts, so the activation key cannot
      // also toggle the newly focused native video controls.
      if (event.detail === 0) video.focus()
    }).catch(() => {
      if (status) status.textContent = '영상을 재생하지 못했습니다. 인터넷 연결을 확인한 뒤 영상 하단의 재생 버튼으로 다시 시도해주세요.'
    })
  })
  video.addEventListener('play', () => {
    button.hidden = true
    if (status) status.textContent = ''
  })
  video.addEventListener('pause', () => { button.hidden = false })
  video.addEventListener('ended', () => { button.hidden = false })
})()
