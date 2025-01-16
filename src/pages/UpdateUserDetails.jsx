import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema=z.object({
    name:z.string().min(2,{message:"name must have 2 characters"}).max(50),

});

export function UpdateUserDetails(){
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"sunandasadhukhan1@gmail.com"
        },      
    });
    async function onSubmit(values){
        try{console.log(values);}
        catch(err){
            console.log(err,"Error during submission")
        }
    }
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-white " >
        <div className="w-full max-w-md p-6 drop-shadow-md rounded-md"
        style={{
            backgroundImage:"url('/Untitled design.jpg')",
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat"
        }}>
        <h1 className="text-3xl font-bold mb-5 text-center text-emerald-500 ">Update Profile</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField 
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="block text-sm font-bold text-pink-700 ">Name</FormLabel>
                            <FormControl >
                                <Input placeholder="Enter Your Name"{...field}
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-pink-500 "/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField 
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input placeholder=""{...field} disabled
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-pink-500 cursor-not-allowed "/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                
                <div className="flex justify-center">
                <Button className=" focus:outline-none py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">Update</Button>
                </div>
            </form>
        </Form>
        </div>
        </div>
    )
}
