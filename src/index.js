import { galleryItems } from './app';

export const galleryNode = document.querySelector('.js-gallery');

const markUp = galleryItems.map(item => {
    const {
        description: imageDescription,
        original: originalSizeLink,
        preview: previewSizeLink
    } = item;

    return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${originalSizeLink}"
            >
                <img
                class="gallery__image"
                src="${previewSizeLink}"
                data-source="${originalSizeLink}"
                alt="${imageDescription}"
                />
            </a>
        </li>
        `;
    })
    .join("");

galleryNode.innerHTML = markUp;

