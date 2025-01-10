"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import Datatable from "../components/Datatable";

type resultProps = {
  id: number;
  name: string;
  email: string;
  contact: string;
};
const ViewPage = () => {
  const [id] = useState(1);
  const [apiData, setapiData] = useState<resultProps[]>([]);
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

  return (
    <div>
      <h1 className="text-center my-4 text-2xl font-bold ">View Phonebook</h1>

      {/* <Datatable apiData={apiData} /> */}
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
            apiData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell className="text-center">{data.id}</TableCell>
                <TableCell className="text-center">{data.name}</TableCell>
                <TableCell className="text-center">{data.contact}</TableCell>
                <TableCell className="text-center">{data.email}</TableCell>
                <TableCell className="text-center flex gap-2">
                  <Link
                    href={`/update/` + data.id}
                    key={index}
                    className="bg-red-400 p-1 rounded-lg text-sm text-white"
                  >
                    <Edit2Icon />
                  </Link>
                  <Link
                    href={`/delete/` + data.id}
                    key={data.id}
                    className="bg-blue-400 p-1 rounded-lg text-sm text-white"
                  >
                    <Trash2Icon />
                  </Link>
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
};

export default ViewPage;
