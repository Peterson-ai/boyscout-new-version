import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Event, EventType } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/button";

const eventTypes: EventType[] = ['Camp', 'Ceremony', 'Service', 'Training'];

const EventsPage = () => {
  const [selectedType, setSelectedType] = useState<EventType | 'All'>('All');

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
  });

  const { data: userRegistrations } = useQuery({
    queryKey: ['userRegistrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id');
      
      if (error) throw error;
      return data.map(reg => reg.event_id);
    },
  });

  const filteredEvents = events?.filter(event => 
    selectedType === 'All' || event.type === selectedType
  );

  if (eventsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-gray-400">Register for our upcoming scout events and activities</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <Button
          variant={selectedType === 'All' ? "default" : "outline"}
          onClick={() => setSelectedType('All')}
          className={`whitespace-nowrap ${
            selectedType === 'All'
              ? 'bg-[#6366F1] hover:bg-[#5558DD] text-white'
              : 'border-gray-700 text-gray-300 hover:bg-[#1A2235] hover:text-white'
          }`}
        >
          All Events
        </Button>
        {eventTypes.map(type => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(type)}
            className={`whitespace-nowrap ${
              selectedType === type
                ? 'bg-[#6366F1] hover:bg-[#5558DD] text-white'
                : 'border-gray-700 text-gray-300 hover:bg-[#1A2235] hover:text-white'
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            userRegistrations={userRegistrations || []}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;