import { axiosAuth } from '@/services/axios-config';

export interface CarpoolData {
  concert: string,
  seats: number,
  time: number,
  location: string,
}

const getCarpoolSpotsEvent = async (eventId: string) => {
  const { data } = await axiosAuth().get(`/carpool/event/${eventId}`);
  return data;
}

const createCarpoolSpot = async(carpoolData: CarpoolData) => {
  const { data } = await axiosAuth().post(
    '/carpool',
    carpoolData,
  )

  return data;
}

const changeUserStatusCarpool = async(spotId: string, status: boolean) => {
  await axiosAuth().patch(`carpool/${spotId}`, 
    {
      status
    }
  )
}

export {
  createCarpoolSpot,
  getCarpoolSpotsEvent,
  changeUserStatusCarpool,
}