const getSelectedElement = (event) => {
  const selectedElement = event.target.parentNode;
  const elements = selectedElement.parentElement.childNodes;

  elements.forEach(element => (
    element.classList.remove('selected')
  ));

  selectedElement.classList.toggle('selected');
};

export default getSelectedElement;
