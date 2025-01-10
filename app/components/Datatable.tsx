import React from "react";
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

type phoneData = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

const Datatable = (apiData: phoneData[]) => {
  console.log(apiData);
  return (
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
          apiData.map((data: any, index: number) => (
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
  );
};

export default Datatable;
