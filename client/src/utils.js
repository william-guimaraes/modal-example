const createImageModal = (evt) => {
  evt.stopPropagation()
    
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.addEventListener('click', () => {
    modal.remove()
  })
  
  const image = document.createElement('img')
  image.classList.add('modal-image')
  image.src = evt.target.src
  
  modal.appendChild(image)
  document.body.prepend(modal)
}
  
const loopThroughImages = (actionFn) => {
  const webMessenger = document.getElementById('web-messenger-container')
  const conversationImages = webMessenger.contentDocument.getElementsByTagName("img")
  
  Array.from(conversationImages).forEach((imageElement) => {
    actionFn(imageElement)
  })
}
  
export const addImagesListeners = (cleanListeners) => {
  if (cleanListeners) {
    loopThroughImages((imageElement) => {
      imageElement.removeEventListener('click', createImageModal)
    })
  }
  loopThroughImages((imageElement) => {
    if(imageElement.alt === 'Uploaded image') { 
      imageElement.addEventListener('click', createImageModal)
    }
  })
}