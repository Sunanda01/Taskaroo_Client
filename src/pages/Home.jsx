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
import { Button } from "@/components/ui/button";
const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
];

export function Home() {
  return (
    
      <NavigationMenu className=" bg-yellow-300 w-full">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-20 w-36 mt-2" />{" "}
          {/* Adjust size as needed */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link
                  to="/docs"
                  className="block p-3 rounded-md hover:bg-accent"
                >
                  Documentation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/register">
                  <Button>SignUp</Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 max-w-[300px] w-full md:w-[400px] lg:w-[500px] lg:grid-rows-[.75fr_1fr]">
                  <ListItem href="/" title="Update Profile"></ListItem>
                  <ListItem href="/" title="Update Password"></ListItem>
                  <ListItem href="/" title="Logout"></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    
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
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
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
