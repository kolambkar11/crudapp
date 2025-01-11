"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the Zod schema
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
console.log(z);
const pbSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters!").max(255),
  contact: z.string().regex(phoneRegex, "Invalid phone number!"),
  email: z.string().email("Invalid email format!").min(3).max(255),
});

type PbSchemaType = z.infer<typeof pbSchema>;

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PbSchemaType>({
    resolver: zodResolver(pbSchema),
  });

  const handleAdd = async (data: PbSchemaType) => {
    try {
      const response = await axios.post(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp`,
        data
      );

      if (response.status === 201) {
        alert("Success");
        reset();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="flex gap-4 justify-around p-4">
          <div className="w-full">
            <Input
              {...register("name")}
              placeholder="Enter Name"
              className="w-full"
            />
            {errors.name && (
              <p role="alert" className="text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("contact")}
              type="text"
              placeholder="Enter Contact"
              className="w-full"
            />
            {errors.contact && (
              <p role="alert" className="text-red-400">
                {errors.contact.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("email")}
              placeholder="Enter Email"
              className="w-full"
            />
            {errors.email && (
              <p role="alert" className="text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-around p-4">
          <Button
            type="submit"
            className="me-3 bg-blue-400 text-dark hover:text-white"
            disabled={!isValid}
          >
            Add Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
