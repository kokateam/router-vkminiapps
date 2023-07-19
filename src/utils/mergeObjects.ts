export default function mergeObjects(baseObject: object, newObject: object) {
  return {
    ...baseObject,
    ...Object.keys(baseObject).reduce(
      (acc, key) =>
        key in newObject ? { ...acc, [key]: newObject[key] } : acc,
      {}
    ),
  };
}
