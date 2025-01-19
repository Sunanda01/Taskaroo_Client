import React from "react";
import { Link } from "react-router-dom"; // Correct import
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function Navbar() {
  return (
    <div className="  items-center justify-center flex mt-2">
      <div className="flex  justify-evenly items-center  w-auto gap-28 ">
        <img src="/Taskaroo.png" alt="Logo" className="h-16 w-16 " />
        <div className="  text-white flex flex-col items-center gap-1">
          <h1 className="font-bold flex text-4xl">Welcome </h1>
          <h1 className="font-semibold underline text-3xl flex">
            Sunanda Sadhukhan
          </h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-100 text-blue-700">
                <ul className="grid gap-3 p-4 max-w-[300px] w-full md:w-[400px] lg:w-[500px] lg:grid-rows-[.75fr_1fr]">
                  <ListItem
                    href="/updateUser"
                    title="Update Profile"
                  ></ListItem>
                  <ListItem
                    href="/updatePassword"
                    title="Update Password"
                  ></ListItem>
                  <ListItem href="/landing-page" title="Logout"></ListItem>
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
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
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
