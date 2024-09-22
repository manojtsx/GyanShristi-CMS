import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubmitButton from "@/components/mini-component/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;
function AddCategory() {
  const {token, user} = useAuth();
  const router = useRouter();
  const { addNotification } = useNotifications(); 
  const [category, setCategory] = useState({
    user_id: "",
    title: "",
    ownerName: "",
  });

  const [users, setUsers] = useState([
    {
      name: "",
      _id: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users excluding "viewer" role
      const usersResponse = await fetch(`${API}api/user/role?role=non-viewer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const usersData = await usersResponse.json();
      if (!usersResponse.ok) throw new Error(usersData.msg);

      // Ensure usersData is an array
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        throw new Error("Users data is not an array");
      }
      
    } catch (error: any) {
      addNotification(error.message, "error");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}api/category/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      window.location.reload(); 
      addNotification(data.msg, "success");
    } catch (error: any) {
      addNotification(error.message, "error");
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={addCategory} className="flex flex-col h-screen justify-center items-center">
        <div className="w-24 relative">
          <Image
            src="/GirlProfile.jpg"
            alt="Profile Picture"
            height={500}
            width={500}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]">
          <div className="w-full flex flex-col">
            <label htmlFor="createdBy" className="w-32 text-lg">
              Created By{" "}
            </label>
            <select
              id="author"
              name="author"
              className="rounded-lg h-10 w-[200px] text-center"
              value={category.user_id}
              onChange={(e) => setCategory({ ...category, user_id: e.target.value })}
              required
            >
              <option value="">Select Author</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="title" className="w-32 text-lg">
              Title{" "}
            </label>
            <input
              name="title"
              value={category.title}
              onChange={(e) => setCategory({ ...category, title: e.target.value })}
              placeholder="Enter a title"
            />
          </div>
          <SubmitButton text="Add"/>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;