import { ComboboxField } from "@/components/form-combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBookingCommandInputSchema } from "@/modules/bookings/apis/commands/create-booking/create-booking.schema";
import { useCreateBooking } from "@/modules/bookings/hooks/mutations/use-create-booking";
import {
  availableCities,
  availableStreets,
} from "@/modules/bookings/schemas/locations";
import { bookingSeats, bookingTypes } from "@/modules/bookings/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddNewBookingFormProps = {};

const formSchema = createBookingCommandInputSchema;

export const AddNewBookingForm = (props: AddNewBookingFormProps) => {
  const createMutation = useCreateBooking({
    onSettled: () => {},
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: {
        first_name: "Evan",
        last_name: "Christensen",
        email: "christensenevan@gmail.com",
        phone: "+393471234567",
      },
      departure: {
        city: "BRIXEN",
        street: "DRUSUSALLEE",
      },
      arrival: {
        city: "BOZEN",
        street: "KRANKENHAUS",
      },
      arrival_time: "10:10",
      booking_type: "scheduled",
      seat_type: "seated",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("## form ", values);
    createMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* booking settings */}
        <div className="flex flex-col justify-start items-start gap-2">
          <span className="block font-semibold text-md">
            {"Booking settings"}
          </span>

          {/* booking_type */}
          <FormField
            control={form.control}
            name="booking_type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Booking type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bookingTypes.map((item) => (
                      <SelectItem value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* seat type */}
          <FormField
            control={form.control}
            name="seat_type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seat type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bookingSeats.map((item) => (
                      <SelectItem value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* arrival_time */}
          <FormField
            control={form.control}
            name="arrival_time"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="time" placeholder="10:00" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* user info */}
        <div className="flex flex-col w-full justify-start items-start gap-2">
          <span className="block font-semibold text-md">{"Customer"}</span>

          <div className="flex gap-4 flex-row justify-start items-center w-full">
            <FormField
              control={form.control}
              name="user.first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 items-center w-full">
            <FormField
              control={form.control}
              name="user.email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="+39 123456789" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* trip info */}
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <span className="block font-semibold text-md">{"Route"}</span>

          <div className="grid grid-cols-1 gap-4 w-full">
            {/* departure */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <span className="block font-medium text-sm">{"Departure"}</span>
              <ComboboxField
                form={form}
                control={form.control}
                fieldName={"departure.city"}
                // label="Departure city"
                items={[
                  ...availableCities.map((place) => {
                    return { label: place, value: place };
                  }),
                ]}
                placeholder="Select city..."
              />

              <ComboboxField
                form={form}
                control={form.control}
                fieldName={"departure.street"}
                // label="Departure street"
                items={[
                  ...availableStreets.map((place) => {
                    return { label: place, value: place };
                  }),
                ]}
                placeholder="Select street..."
              />
            </div>

            {/* arrival */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <span className="block font-medium text-sm">{"Arrival"}</span>
              <ComboboxField
                form={form}
                control={form.control}
                fieldName={"arrival.city"}
                // label="Arrival city"
                items={[
                  ...availableCities.map((place) => {
                    return { label: place, value: place };
                  }),
                ]}
                placeholder="Select city..."
              />

              <ComboboxField
                form={form}
                control={form.control}
                fieldName={"arrival.street"}
                // label="Arrival street"
                items={[
                  ...availableStreets.map((place) => {
                    return { label: place, value: place };
                  }),
                ]}
                placeholder="Select street..."
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {createMutation.isPending ? (
            <>
              <LoadingSpinner /> {"Creating..."}
            </>
          ) : (
            <>
              {"Create booking"}
              <ArrowRightIcon className="w-4 h-4 ml-0" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
