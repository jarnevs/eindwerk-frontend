import { axiosAuth } from '@/services/axios-config';

export interface EventData {
  title: string;
  location: string;
  date: number;
  description: string;
}

const getEventsArtist = async (artistId: string) => {
  const { data } = await axiosAuth().get(`/events/artist/${artistId}`);
  return data;
}

const getEvent = async (eventId: string) => {
  const { data } = await axiosAuth().get(`/events/${eventId}`);
  return data;
}

const createEvent = async(event: EventData) => {
  const { data } = await axiosAuth().post(
    '/events',
    event,
  )
  return data;
}

const updateStatus = async(eventId: string, status: string) => {
  await axiosAuth().patch(`events/${eventId}`, 
    {
      status
    }
  )
}

export {
  getEventsArtist,
  createEvent,
  getEvent,
  updateStatus
}