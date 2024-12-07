import { Calendar } from "lucide-react";

interface Event {
  title: string;
  date: string;
  location: string;
  image: string;
}

const events: Event[] = [
  {
    title: "Summer Camp",
    date: "July 15-22, 2024",
    location: "Camp Emerald Bay",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  },
  {
    title: "Merit Badge Workshop",
    date: "August 5, 2024",
    location: "Scout Center",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    title: "Leadership Training",
    date: "August 20, 2024",
    location: "Virtual Meeting",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];

export const UpcomingEvents = () => {
  return (
    <div className="bg-[#1A2235] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Calendar className="text-[#6366F1] h-5 w-5" />
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="bg-[#1E2943] rounded-lg overflow-hidden">
            <div className="h-32 w-full">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#6366F1] text-sm">{event.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};