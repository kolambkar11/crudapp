"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/router";

type resultProps = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleAdd = async () => {
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
      console.log(response);
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
      <div className="flex gap-4 justify-around p-4 ">
        <Input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          type="number"
          placeholder="Enter Contact"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="flex justify-around p-4 ">
        <Button
          type="button"
          onClick={handleAdd}
          className="me-3 bg-blue-400 text-dark hover:text-white"
        >
          Add Data
        </Button>
      </div>
    </div>
  );
};

export default Create;
