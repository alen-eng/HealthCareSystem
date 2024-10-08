"use client"
 
 import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserFormValidation } from "@/lib/validation";
import { Form, FormControl } from "@/components/ui/form";
import  CustomFormField, { FormFieldType }  from "../customFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ( {user}: {user: User} ) => {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

 async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try{
     const userData = { name, email, phone };

     const user = await createUser(userData);
    
     if(user) {
      router.push(`/patients/${user.$id}/register`);
     }
    }
     catch(error){
      console.log(error)
     }

    //setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1>Welcome 👋,</h1>
          <p className="text-dark-700"> Let us know more about you.</p>
        </section>

        <section className="space-y-6">
            <div className="" > 
            <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>


        <CustomFormField
        fieldType={FormFieldType.INPUT}
         control={form.control}
         name = "name"
         label='Full Name'
         placeholder = 'John Doe'
         iconSrc = '/assets/icons/user.svg'
         iconAlt = 'user'
        />


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.INPUT}
         control={form.control}
         name = "email"
         label = 'Email'
         placeholder = 'johndoe@gmail.com'
         iconSrc = '/assets/icons/email.svg'
         iconAlt = 'email'
        />

        
        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
         control={form.control}
         name = "phone"
         label = 'Phone Number'
         placeholder = '+91 555353432'
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
        fieldType={FormFieldType.DATE_PICKER}
         control={form.control}
         name = "birthdate"
         label = 'Date of Birth'
        />

        
        <CustomFormField
        fieldType={FormFieldType.SKELETON}
         control={form.control}
         name = "gender"
         label = 'Gender'
         renderSkeleton={(field) =>(
           <FormControl>
              <RadioGroup 
              className="flex h-11 gap-6 xl:justify-between" 
              onValueChange={field.onChange}
              defaultValue={field.value}
              >
               {GenderOptions.map((option, i) => (
                <div key={option+i} className="radio-group"
                >
                <RadioGroupItem value={option} id={option}/>
                <Label htmlFor={option}
                className="cursor-pointer">
                  {option}
                </Label>
                </div>
               ))}
              </RadioGroup>
           </FormControl>
         )}
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>
        <div className="flex flex-col gap-6 xl:flex-row">

        </div>


        <SubmitButton isLoading={isLoading}>
           Submit
            </SubmitButton>
        </form>
    </Form>
  )



}


export default RegisterForm