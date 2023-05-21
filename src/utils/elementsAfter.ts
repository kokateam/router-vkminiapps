// Получаем элементы массива после указанного элемента
// Пример getElementsAfter(["test", "home", "home2", "home3"], home) => ["home2", "home3"]
export function isElementsAfter(array: Array<string>, element: string) {
  const index = array.indexOf(element);
  return index !== -1;
}

export function getElementsAfter(array, element) {
  const index = array.indexOf(element);

  if (index === -1) {
    return [];
  }

  return array.slice(index + 1);
}
