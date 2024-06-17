import axios from 'axios';

const baseUrl='https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;
export const imagePath="https://image.tmdb.org/t/p/w500";
export const imagePathOriginal= "https://image.tmdb.org/t/p/original";

export const fetchTrending = async(time_window='day')=>{
  const {data}= await axios.get(`${baseUrl}/trending/all/${time_window}?api_key=${apiKey}`);
   return data?.results;
}
export const fetchDetails = async(type,id)=>{
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
}
export const fetchCredits = async(type,id)=>{
  const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
  return res?.data;
}
