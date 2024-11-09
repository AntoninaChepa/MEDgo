import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ComboboxField = ({
  form,
  control,
  fieldName,
  items,
  placeholder,
}: {
  form: any;
  control: any;
  fieldName: string;
  items: Array<{ label: string; value: string }>;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {/* <FormLabel>Language</FormLabel> */}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder ?? "Select option"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[463px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No value found.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          form.setValue(fieldName, item.value);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* <FormDescription>
            This is the language that will be used in the dashboard.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
