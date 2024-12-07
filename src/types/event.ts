export type EventType = 'Camp' | 'Ceremony' | 'Service' | 'Training';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: string;
  max_registrations: number;
  current_registrations: number;
  imageUrl: string;
}