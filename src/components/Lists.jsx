import React, { useState } from "react";
import Form from "./Form";
import useLocalStorage from "../hooks/useLocalStorage";
const Lists = () => {
  const { data, remove, update } = useLocalStorage();
  const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState(
  //   JSON.parse(localStorage.getItem("formData"))
  // );
  // console.log(formData);
  console.log(data);

  const handleClick = (index) => {
    setIsEditing(true);
    update(index);
    console.log("Edit button clicked");
  };
  const handleDelete = (index) => {
    remove(index);
    console.log("Delete button clicked");
  };

  if (isEditing) {
    return <Form />;
  }

  return (
    <div className="content-center">
      <h1 className="text-5xl text-center p-4 font-bold">Lists</h1>
      <table className="border text-3xl content-center mx-auto">
        <thead>
          <tr className="border border-l-pink-100">
            <th className="border">First Name</th>
            <th className="border">Middle Name</th>
            <th className="border">Last Name</th>
            <th className="border">Age</th>
            <th className="border">Parents Name</th>
            <th className="border">Parent's Number</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (item, index) => (
              console.log(index),
              (
                <tr key={index} className="border border-solid">
                  <td className="border">{item.firstName}</td>
                  <td className="border">{item.middleName}</td>
                  <td className="border">{item.lastName}</td>
                  <td className="border">{item.age}</td>
                  <td className="border">{item.parents[0]?.Name}</td>
                  <td className="border">{item.parents[0]?.number}</td>
                  <td className="border">
                    <button
                      className="bg-blue-500 text-white p-2 rounded-md"
                      onClick={() => handleUpdate(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
