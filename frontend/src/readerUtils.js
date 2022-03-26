class ReaderUtils {
   elementsOnPage = page => {
      //TODO: use state of component instead of DOM prop
      return document.querySelectorAll(`[page='${page}']`);
      // const pageNumber = this.state.pageNumber;
      // return (
      // 	this.state.paragraphs.filter((value, index) => {
      // 		return value.page === pageNumber;
      // 	})
      // )
   }

   isInBounds = bounding => {
      return (bounding.bottom <= (.95 * window.innerHeight));
   }

   hideParagraphs = paragraphs => {
      for (let i of paragraphs) {
         i.classList.replace('visible', 'hidden');
      }
   }
}