import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct import
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/api";
import toast from "react-hot-toast";
function Navbar({ userDetails }) {
  if (!userDetails) {
    return <div>Loading.........</div>;
  }
  const navigate = useNavigate();
  // const location=useLocation();
  // const profilePicture = localStorage.getItem("ProfileImage");
  async function handleLogout() {
    try {
      await api
        .post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
        .then((data) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userData");
          navigate("/login");
          toast.success(data?.data?.msg);
        });
    } catch (err) {
      const message=err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
    }
  }
  console.log("userDetails", userDetails);

  return (
    <div className="  items-center justify-center flex mt-2">
      <div className="flex  justify-evenly items-center  w-auto gap-28 ">
        <img src="/Taskaroo.png" alt="Logo" className="h-16 w-16 " />
        <div className="  text-white flex flex-col items-center gap-1">
          <h1 className="font-bold flex text-4xl">Welcome </h1>
          <h1 className="font-semibold underline text-3xl text-lime-500 flex">
            {userDetails.name}
          </h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src={userDetails.profileImg} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-100 text-blue-700">
                <ul className="grid gap-3 p-4 max-w-[300px] w-full md:w-[400px] lg:w-[500px] lg:grid-rows-[.75fr_1fr]">
                  <ListItem
                    to="/updateUser"
                    title="Update Profile"
                    state={{ userDetails }}
                  ></ListItem>
                  <ListItem
                    to="/updatePassword"
                    title="Update Password"
                    state={{ userDetails }}
                  ></ListItem>
                  <ListItem
                    onClick={() => handleLogout()}
                    title="Logout"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
const ListItem = React.forwardRef(
  ({ className, title, children, to, state, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={to}
            state={state}
            className={`block  select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default Navbar;
