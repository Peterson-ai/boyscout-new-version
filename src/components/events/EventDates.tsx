import { format, parseISO } from "date-fns";

interface EventDatesProps {
  startDate: string;
  endDate: string;
}

export const EventDates = ({ startDate, endDate }: EventDatesProps) => {
  const parsedStartDate = startDate ? parseISO(startDate) : new Date();
  const parsedEndDate = endDate ? parseISO(endDate) : new Date();

  return (
    <div className="text-sm text-gray-400">
      {format(parsedStartDate, 'MMM dd, yyyy')} - {format(parsedEndDate, 'MMM dd, yyyy')}
    </div>
  );
};