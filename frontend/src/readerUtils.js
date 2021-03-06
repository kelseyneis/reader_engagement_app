export function elementsOnPage(page) {
   //TODO: use state of component instead of DOM prop
   return document.querySelectorAll(`[page='${page}']`);
}

export function isInBounds(bounding) {
   return (bounding.bottom <= (.95 * window.innerHeight));
}

export function hideParagraphs(paragraphs) {
   for (let i of paragraphs) {
      i.classList.replace('visible', 'hidden');
   }
}