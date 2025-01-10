"use client";
import axios from "axios";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, Trash2Icon } from "lucide-react";

type resultProps = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

export default function Home() {
  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [apiData, setapiData] = useState<resultProps[]>([]);
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
      setapiData((prev) => [...prev, response.data]); // Update UI locally
      setName("");
      setEmail("");
      setContact("");
    } catch (error) {
      console.log("Error ", error);
    }
  };

  // getData
  useEffect(() => {
    const api = async () => {
      try {
        const response = await fetch(
          "https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const jsonData = await response.json();
        // console.log(jsonData);
        setapiData(jsonData);
        setapiData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.log("error", error);
      }
    };
    api();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(
          `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp/${id}`
        );

        setapiData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id: number) => {
    const dt = apiData.filter((item) => item.id === id);
    // console.log(typeof dt[0].id);
    // console.log(dt);
    setId(dt[0].id);
    setName(dt[0].name);
    setEmail(dt[0].email);
    setContact(dt[0].contact);
    setIsUpdate(true);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp/${id}`,
        {
          id,
          name,
          contact,
          email,
        }
      );

      setapiData((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      ); // Update UI locally
      setIsUpdate(false);
      setName("");
      setContact("");
      setEmail("");
    } catch (error) {
      console.error(error);
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
        {isUpdate === false ? (
          <>
            <Button
              type="button"
              onClick={handleAdd}
              className="me-3 bg-blue-400 text-dark hover:text-white"
            >
              Add Data
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-green-400 text-black hover:text-white"
              type="button"
              onClick={handleUpdate}
            >
              Update Data
            </Button>
          </>
        )}
      </div>
      <Table className="w-1/2 mx-auto border">
        <TableCaption>Phone Book</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiData ? (
            apiData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.id}</TableCell>
                <TableCell className="text-center">{data.name}</TableCell>
                <TableCell className="text-center">{data.contact}</TableCell>
                <TableCell className="text-center">{data.email}</TableCell>
                <TableCell className="text-center">
                  <Button
                    className="bg-blue-400 me-3"
                    onClick={() => {
                      handleEdit(data.id);
                    }}
                  >
                    <Edit2Icon />
                  </Button>
                  <Button
                    className="bg-red-400"
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
