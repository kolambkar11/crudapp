"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  contact: number;
  email: string;
}

const Create = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleAdd = async () => {
    // alert(1); check if the btn is clicked or not
    // add data to mockapi ap
    try {
      const response = await axios.post(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp`,
        {
          name,
          email,
          contact,
        }
      );
      if (response.status === 201) {
        alert("Successs");
      } else {
        alert("error");
      }

      setName("");
      setEmail("");
      setContact("");
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="flex gap-4 justify-around p-4 ">
          <div className="w-full">
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-400">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("contact", {
                required: "Contact is Required",
              })}
              type="number"
              placeholder="Enter Contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
            {errors.contact?.type === "required" && (
              <p role="alert" className="text-red-400">
                {errors.contact?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("email", {
                required: "Email is Required",
              })}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-400">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-around p-4 ">
          <Button
            type="submit"
            className="me-3 bg-blue-400 text-dark hover:text-white"
          >
            Add Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
