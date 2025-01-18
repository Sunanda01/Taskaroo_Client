import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
export function HomePage() {
  const [date, setDate] = useState(new Date());
   return (
    <>
      <div
        className="h-dvh overflow-y-hidden "
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
       

        <div className="flex items-center justify-evenly h-full mt-20 text-white font-bold text-xl">
        

          <Accordion type="single" collapsible className="w-72">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it Free?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s Absolutely Free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it Responsive?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s Full Responsive.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Used For?</AccordionTrigger>
              <AccordionContent>
                <ul className="hover:list-disc hover:list-inside text-md hover:text-md text-slate-600 hover:text-white">
                  <li>Create Todo</li>
                  <li>Read Todo</li>
                  <li>Update Todo</li>
                  <li>Delete Todo</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Card className=" rounded-3xl">
                <CardContent className="flex aspect-square items-center justify-center w-full max-w-xs p-0">
                  <div
                    className="flex  justify-between items-center h-80 w-80 rounded-3xl"
                    style={{
                      backgroundImage: "url('/Click Here.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" font-bold text-blue-800 w-60 flex gap-1 ">
              <DropdownMenuItem className="text-md bg-blue-200">
                <Link to="/register">Click Here To Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-md bg-blue-200 flex">
                <Link to="/login">Click Here To Login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {["/1.png", "/2.png", "/3.png"].map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 flex flex-row">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center  p-0">
                          <img
                            src={image}
                            alt={`Carousel Image ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
        </div>
      </div>
    </>
  );
}
