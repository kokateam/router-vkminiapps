function findPreviousViewIndex(array, currentIndex) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (array[i].type === "view") {
      return i;
    }
  }
  return -1;
}

export default function backViews(
  stepsBack: number,
  originalArray: Array<{
    id?: string;
    type: "panel" | "view" | "popout" | "modal";
    main_view?: string | undefined;
  }>
) {
  const newArray = [...originalArray]; // Создаем копию исходного массива для модификации
  let count = Math.abs(stepsBack); // Получаем абсолютное значение переданного числа
  let currentIndex = originalArray.length - 1;

  // Удаляем объекты с типом "panel" и предшествующие им объекты с типом "view"
  while (count > 0 && currentIndex >= 0) {
    if (originalArray[currentIndex].type === "panel") {
      const viewIndex = findPreviousViewIndex(originalArray, currentIndex);
      if (viewIndex >= 0) {
        newArray.splice(viewIndex, currentIndex - viewIndex + 1);
        currentIndex = viewIndex - 1;
        count--;
      } else {
        // Не удалось найти предшествующий объект с типом "view"
        break;
      }
    }
    currentIndex--;
  }

  return newArray;
}
