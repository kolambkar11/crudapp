"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
const Delete = () => {
  const params = useParams<{
    id: string;
    tag: string;
    item: string;
  }>();
  //   console.log(params.id);
  const router = useRouter();
  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(
          `https://675bc38f9ce247eb19374d66.mockapi.io/nco/crudapp/${id}`
        );
        router.push("/view");
      } catch (error) {
        console.error(error);
      }
    }
  };
  handleDelete(parseInt(params.id));
};

export default Delete;
