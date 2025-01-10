"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

type resultProps = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

const Update = () => {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [apiData, setapiData] = useState<resultProps[]>([]);
  const params = useParams<{
    id: string;
    tag: string;
    item: string;
  }>();
  const router = useRouter();

  useEffect(() => {
    const getDataForUpdate = async () => {
      try {
        const response = await fetch(
          `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp/${params.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setapiData(jsonData);
        setName(jsonData.name);
        setEmail(jsonData.email);
        setContact(jsonData.contact);

        // setapiData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.log("error", error);
      }
    };
    getDataForUpdate();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp/${id}`,
        {
          id,
          name,
          contact,
          email,
        }
      );
      router.push("/view");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Update</h1>

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
          onClick={handleUpdate}
          className="me-3 bg-blue-400 text-dark hover:text-white"
        >
          Update Data
        </Button>
      </div>
    </div>
  );
};

export default Update;
