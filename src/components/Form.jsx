import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalForm from "./personalForm";

import useLocalStorage from "../hooks/useLocalStorage";
import { fileToBase64 } from "../helper/filetobase64";

const parentalSchema = z.object({
  parents: z.array(
    z.object({
      Name: z.string().min(1, "Name is required"),
      number: z
        .string()
        .min(1, "Number is required")
        .regex(/^\d{10}$/, "Enter a valid number"),
    })
  ),
});

const Form = ({ editdata }) => {
  const { addItem } = useLocalStorage();

  console.log(editdata);
  const [current, setCurrent] = useState(1);
  const [formData, setFormData] = useState({
    firstName: editdata ? editdata.firstName : "",
    middleName: editdata ? editdata.middleName : "",
    lastName: editdata ? editdata.lastName : "",
    age: editdata ? editdata.age : "",
    file: editdata ? editdata.file : "",
    parents: editdata ? editdata.parents : [{ Name: "", number: "" }],
  });

  // console.log(data);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(parentalSchema),
    defaultValues: formData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parents",
  });

  const prev = () => setCurrent((current) => current - 1);

  const onSubmit = async (data) => {
    console.log("this is form", formData);
    const combinedData = { ...formData, ...data };

    if (formData.file instanceof File) {
      const fileBase64 = await fileToBase64(formData.file);
      combinedData.file = fileBase64;
    }
    addItem(combinedData);

    console.log(combinedData);
    setCurrent((current) => current + 1);
  };

  const updateFormData = (data) => {
    console.log("this is data", data);
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <>
      <h1
        className={`text-center text-5xl p-4 mt-3 mb-4 ${
          current == 3 ? "hidden" : "block"
        }`}
      >
        Complete the Form Below
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-md mx-auto p-4 bg-slate-700 shadow-xl rounded-lg shadow-black bg-blend-darken ${
          current == 3 ? "hidden" : "block"
        }`}
      >
        {current === 1 && (
          <PersonalForm
            current={current}
            setCurrent={setCurrent}
            defaultValues={formData}
            updateFormData={updateFormData}
          />
        )}
        {current === 2 && (
          <section>
            <legend className="text-white text-center text-2xl font-bold">
              Parental Information
            </legend>
            {fields.map((field, index) => (
              <div key={field.id}>
                <label htmlFor="" className="text-gray-300">
                  Parent's Name:
                </label>
                <input
                  {...register(`parents.${index}.Name`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Parent's Name"
                />
                <p className="text-red-500">
                  {errors.parents?.[index]?.Name &&
                    errors.parents?.[index]?.Name.message}
                </p>
                <label htmlFor="" className="text-white mt-2 mb-2">
                  Phone Number:
                </label>
                <input
                  {...register(`parents.${index}.number`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter phone number"
                />
                <p className="text-red-500">
                  {errors.parents?.[index]?.number &&
                    errors.parents?.[index]?.number.message}
                </p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ Name: "", number: "" })}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200 mt-4"
            >
              Add Parent
            </button>
            <button
              type="button"
              onClick={prev}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
            >
              Prev
            </button>
            <input
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
            />
          </section>
        )}
      </form>
      {current === 3 && (
        <h1 className="text-5xl p-2 mb-2 mx-auto flex items-center text-center justify-center h-screen overflow-hidden box-border">
          Thank you for submitting the form
        </h1>
      )}
    </>
  );
};

export default Form;
