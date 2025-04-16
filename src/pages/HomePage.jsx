import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import api from "@/api";
import toast from "react-hot-toast";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  const [formData, setformData] = useState({
    title: "",
    description: "",
  });
  const [todoItems, setTodoItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/getTodoItems`
        );
        console.log(response.data.todoItem);
        setTodoItems(response.data.todoItem || []);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/createTodo`,
        formData
      );

      const newTodo = response?.data?.todo; // assuming this is the single new item

      if (newTodo) {
        setTodoItems((prevItems) => [newTodo, ...prevItems]); // prepend new item
        toast.success(response?.data.msg);
        setformData({ title: "", description: "" });
      }

      console.log("Form Submitted: ", formData);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      setTodoItems((prevItems) =>
        prevItems.filter((items) => items._id !== id)
      );
      await api
        .delete(`${import.meta.env.VITE_BACKEND_URL}/deleteTodo/${id}`)
        .then((data) => {
          toast.success(data?.data.msg);
        });
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
      setTodoItems((prevItems) =>
        prevItems.filter((items) => items._id !== id)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Background layer */}
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 min-h-screen flex flex-col overflow-hidden">
          <Navbar userDetails={userDetails} />
          <div className="flex flex-1 w-full justify-between px-4 mt-8 gap-6 overflow-hidden">
            {/* Create Todo Card */}
            <Card className="w-[400px] bg-white/15 backdrop-blur-md  h-max">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white">
                  Create Todo
                </CardTitle>
                <CardDescription className="font-bold text-gray-300">
                  Add your work in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title" className="text-md text-white">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title of your Work"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="description"
                        className="text-md text-white"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Type description here"
                      />
                    </div>
                  </div>
                  <CardFooter className="flex justify-center mt-3">
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="w-28 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isLoading ? (
                        <ClipLoader color="#ffffff" size={30} />
                      ) : (
                        "Add"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>

            {/* Todo Items List */}
            <div className="flex flex-col gap-4 w-[1000px] max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
              {todoItems && todoItems.length > 0 ? (
                todoItems.map((items) => (
                  <Card
                    key={items._id}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md px-6 py-5 text-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-full pr-4">
                        <h3 className="text-2xl font-semibold mb-3">
                          {items.title}
                        </h3>
                        <p className="text-sm text-gray-200 whitespace-pre-wrap break-words leading-relaxed text-justify">
                          {items.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-5 items-center">
                        <Link
                          to={`/update-todo/${items._id}`}
                          state={{ todo: items }}
                        >
                          <img
                            src="/edit.png"
                            alt="Edit"
                            className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform duration-150"
                          />
                        </Link>
                        <img
                          src="/bin.png"
                          alt="Delete"
                          className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform duration-150"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this todo?"
                              )
                            ) {
                              handleDelete(items._id);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-right text-sm text-blue-400 font-medium">
                      Created At: {new Date(items.createdAt).toLocaleString()}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500 text-2xl">
                  No tasks yet. Start by adding one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
