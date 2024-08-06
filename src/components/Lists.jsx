import React, { useState } from "react";
import Form from "./Form";

const Lists = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData"))
  );
  console.log(formData);

  const handleClick = () => {
    setIsEditing(true);
    console.log("Edit button clicked");
  };

  if (isEditing) {
    return <Form editdata={formData} />;
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
          <tr className="border border-solid">
            <td className="border">{formData.firstName}</td>
            <td className="border">{formData.middleName}</td>
            <td className="border">{formData.lastName}</td>
            <td className="border">{formData.age}</td>
            <td className="border">{formData.parents[0].Name}</td>
            <td className="border">{formData.parents[0].number}</td>
            <td className="border">
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleClick}
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
