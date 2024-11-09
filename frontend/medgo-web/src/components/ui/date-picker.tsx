import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

type DatePickerProps = {
  date: Date | null;
  setDate: (date: Date | null) => void;
};
export default function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ?? new Date()}
          onSelect={(date) => {
            if (!date) setDate(null);
            setDate(date ?? null);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
