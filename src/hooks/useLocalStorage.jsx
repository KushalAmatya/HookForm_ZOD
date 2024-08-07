import { useState } from "react";

const useLocalStorage = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("formData")) || []
  );

  const addItem = (toAdd) => {
    const newData = [...data, toAdd];
    localStorage.setItem("formData", JSON.stringify(newData));
    setData(newData);
  };

  const remove = (index) => {
    const newData = data.filter((_, i) => i !== index);
    localStorage.setItem("formData", JSON.stringify(newData));
    setData(newData);
  };

  const update = (toUpdate, index) => {
    const newData = data.map((item, i) => (i === index ? toUpdate : item));
    localStorage.setItem("formData", JSON.stringify(newData));
    setData(newData);
  };
  return { data, addItem, remove, update };
};
export default useLocalStorage;

// export const useLocalStorage = (key, defaultValue) => {
//   const [value, setValue] = useState(() => {
//     let currentValue;

//     try {
//       currentValue = JSON.parse(
//         localStorage.getItem(key) || String(defaultValue)
//       );
//     } catch (error) {
//       currentValue = defaultValue;
//     }

//     return currentValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue];
// };
