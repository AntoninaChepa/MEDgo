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
import { fromPlaces, toPlaces } from "./types";

import AppComboBox from "@/components/app-combo-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBookingCommandInputSchema } from "@/modules/bookings/apis/commands/create-booking/create-booking.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
            name="user.first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Write your name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Write your last name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display Surname.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="user.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
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
          name="user.phone"
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

        {/* departure.city */}
        <AppComboBox
          dataArr={[
            ...new Set(
              fromPlaces.map((place) => {
                return { label: place, value: place };
              })
            ),
          ]}
          name="departure.city"
          label="Departure city"
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
        <AppComboBox
          control={form.control}
          dataArr={[
            ...new Set(
              toPlaces.map((place) => {
                return { label: place, value: place };
              })
            ),
          ]}
          name="arrival.city"
          label="Arrival city"
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
