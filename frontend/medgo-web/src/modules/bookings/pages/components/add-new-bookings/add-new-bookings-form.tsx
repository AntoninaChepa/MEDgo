"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBookingCommandInputSchema } from "@/modules/bookings/apis/commands/create-booking/create-booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddNewBookingFormProps = {};

const formSchema = createBookingCommandInputSchema;

export const AddNewBookingForm = (props: AddNewBookingFormProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      departure: {
        city: "",
        street: "",
      },
      arrival: {
        city: "",
        street: "",
      },
      arrival_time: "",
      seat_type: "",
    },
  });

  const seatArr = ["seated", "en pe", "lie down", "no patient"];

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <span className="block font-bold text-xl">Dati anagrafici</span>
        <div className="flex gap-4 items-center w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Write your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Write your Surname" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display Surname.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display email.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="+39 123456789" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="block font-bold text-xl">Dati viaggio</span>
        <span className="block font-bold text-lg">Partenza</span>

        <FormField
          control={form.control}
          name="departure.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Città</FormLabel>
              <FormControl>
                <Input placeholder="Cerca la città di partenza" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departure.street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo via</FormLabel>
              <FormControl>
                <Input placeholder="Cerca la via di partenza" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="block font-bold text-lg">Arrivo</span>
        <FormField
          control={form.control}
          name="arrival.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Città</FormLabel>
              <FormControl>
                <Input placeholder="Cerca la città di partenza" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrival.street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo via</FormLabel>
              <FormControl>
                <Input placeholder="Cerca la via di partenza" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display phone.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="block font-bold text-lg">Seat type</span>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select seat type" />
          </SelectTrigger>
          <SelectContent>
            {seatArr.map((item) => (
              <SelectItem value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
