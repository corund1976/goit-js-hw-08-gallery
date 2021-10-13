import { galleryNode } from './index';
import { galleryItems } from './app';

galleryNode.addEventListener('click', onClick);

function onClick(event) {
    event.preventDefault();
    // Проверка, что клик был именно на картинке, а не между
    if (event.target.tagName !== 'IMG') {
        return;
    }

    // Получение ссылки кликнутого изображения
    let imageOriginalSizeLink = event.target.dataset.source;

    const imageToOpenBig = document.querySelector('.lightbox__image');
    imageToOpenBig.src = imageOriginalSizeLink;

    //========== Открытие модального окна ==========
    const modalWindow = document.querySelector('.js-lightbox');
    modalWindow.classList.add('is-open');
    
    //========== Закрытие модального окна ==========
    const buttonModalWindowClose = document.querySelector('button[data-action="close-lightbox"]');
    buttonModalWindowClose.addEventListener('click', onClose);

    modalWindow.addEventListener('click', onClose);
    document.addEventListener('keydown', onKeydown);
    
    //========== Закрытие по нажатию на кнопку Х ==========
    function onClose() {
        imageToOpenBig.src = "";
        imageToOpenBig.alt = "";

        modalWindow.classList.remove('is-open');
        buttonModalWindowClose.removeEventListener('click', onClose);
        modalWindow.removeEventListener('click', onClose);
        document.removeEventListener('keydown', onKeydown);
    }

    // Формируем массив ссылок Изображений
    const galleryItemsLinks = galleryItems.map(item => {
        const {
            original: originalSizeLink,
        } = item;
        return originalSizeLink;
    }); 

    //========== Закрытие по Esc и пролистывание влево-вправо ==========
    function onKeydown(event) {
        if (event.key === 'Escape') {
            onClose();
        }
        
        let currentIndex = galleryItemsLinks.indexOf(imageOriginalSizeLink);
        let indexOfNextImage;
        let indexOfPreviousImage;

        if (event.key === 'ArrowRight') {

            if (currentIndex === galleryItemsLinks.length - 1) {
                indexOfNextImage = 0;
            } else {
                indexOfNextImage = currentIndex + 1;
            }

            imageOriginalSizeLink = galleryItemsLinks[indexOfNextImage];
        }

        if (event.key === 'ArrowLeft') {

            if (currentIndex === 0) {
                indexOfPreviousImage = galleryItemsLinks.length - 1;
            } else {
                indexOfPreviousImage = currentIndex - 1;
            }

            imageOriginalSizeLink = galleryItemsLinks[indexOfPreviousImage];
        }

        imageToOpenBig.src = imageOriginalSizeLink;
    }
}