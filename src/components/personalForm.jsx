import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const personalSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/\d+/, "Age should be a number"),
});

const PersonalForm = ({
  current,
  setCurrent,
  defaultValues,
  updateFormData,
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) return;

    updateFormData(data);
    setCurrent(current + 1);
  };

  return (
    <section>
      <legend className="text-white text-center text-2xl font-bold">
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
      <span className="text-red-500">{errors.age && errors.age.message}</span>
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
      >
        Next
      </button>
    </section>
  );
};

export default PersonalForm;
