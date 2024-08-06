import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const personalSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/\d+/, "Age should be a number"),
});

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

const Form = () => {
  const [current, setCurrent] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(current === 1 ? personalSchema : parentalSchema),
    defaultValues: { parents: [{ Name: "", number: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parents",
  });

  const prev = () => {
    setCurrent((current) => current - 1);
  };

  const next = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    setCurrent((current) => current + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-slate-700 shadow-xl rounded-lg shadow-black bg-blend-darken"
    >
      {current === 1 && (
        <section>
          <legend className="text-white text-center text-2xl font-bold ">
            Personal Information
          </legend>
          <label htmlFor="" className="text-gray-300 mt-2 mb-2">
            First Name:
          </label>
          <input
            {...register("firstName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md mt-2 mb-2"
            placeholder="Enter your First Name"
          />
          <p className="text-red-500">
            {errors.firstName && errors.firstName.message}
          </p>
          <label htmlFor="" className="text-gray-300 mt-2 mb-2">
            Middle Name:
          </label>
          <input
            {...register("middleName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2 mb-2"
            placeholder="Enter Your Middle Name"
          />
          <label htmlFor="" className="text-gray-300 mt-2 mb-2">
            Last Name:
          </label>
          <input
            {...register("lastName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2 mb-2"
            placeholder="Enter Your Last Name"
          />
          <p className="text-red-500">
            {errors.lastName && errors.lastName.message}
          </p>
          <label htmlFor="" className="text-gray-300 mt-2 mb-2">
            Age:
          </label>
          <input
            {...register("age")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2 mb-2"
            placeholder="Enter Your Age"
          />
          <span className="text-red-500">
            {errors.age && errors.age.message}
          </span>
          <button
            type="button"
            onClick={next}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
          >
            Next
          </button>
        </section>
      )}
      {current === 2 && (
        <section>
          <legend className="text-white text-center text-2xl font-bold">
            Paternal Information
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
  );
};

export default Form;
