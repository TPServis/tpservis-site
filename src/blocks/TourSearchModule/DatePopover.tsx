import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import type { JSX } from "react";
import { format } from "date-fns";
import dayjs from "dayjs";
import { cn } from "@/utilities/cn";
import type { DateRange } from "react-day-picker";

type DatePopoverProps = {
  date: DateRange | undefined;
  setDate: (date: DateRange) => void;
};

const DatePopover = ({ date, setDate }: DatePopoverProps): JSX.Element => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          id="date"
          variant="outline"
          className={cn(
            "lg:min-w-[300px] w-full justify-start text-left bg-jaffa-50 text-jaffa-900 font-bold border-none shadow-none rounded-xl",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Виберіть дату</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border-none" align="start">
        <Calendar
          initialFocus={true}
          mode="range"
          defaultMonth={date?.from}
          disabled={{
            before: dayjs().add(1, "day").toDate(),
            after: date?.from ? dayjs(date?.from).add(11, "day").toDate() : undefined,
          }}
          classNames={{
            cell: "hover:bg-jaffa-50 rounded-md",
            // biome-ignore lint: library choice
            day_disabled: "!text-gray-400 !cursor-not-allowed hover:!bg-white",
            // biome-ignore lint: library choice
            day_selected: "!font-bold",
            // biome-ignore lint: library choice
            day_range_start:
              "bg-linear-to-br from-jaffa-50 from-50% to-50% to-jaffa-100 text-jaffa-800 rounded-r-none",
            // biome-ignore lint: library choice
            day_range_end:
              "bg-linear-to-br from-jaffa-100 from-50% to-50% to-jaffa-50 text-jaffa-800 rounded-l-none",
            // biome-ignore lint: library choice
            day_range_middle: "bg-jaffa-100 text-jaffa-800 rounded-none",
            // biome-ignore lint: library choice
            day_outside: "invisible",
          }}
          selected={date}
          onSelect={(range): void => {
            setDate(
              range
                ? {
                    from: range.from,
                    to: range.to,
                  }
                : {
                    from: undefined,
                    to: undefined,
                  },
            );
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePopover };
