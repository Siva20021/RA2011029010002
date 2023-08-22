import React from 'react'
import {useState,useEffect} from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const TrainDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const trainNumber = searchParams.get("trainNum");
    const[details,setDetails]=useState({});
    console.log(trainNumber);
    const fetchDetails=async()=>{
        try{
            console.log(`http://localhost:8000/train?trainNum=${trainNumber}`);
            const response=await axios.get(`http://localhost:8000/train?trainNum=${trainNumber}`);
            setDetails(response.data);
            
            console.log(details);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchDetails();
    },[]);
    return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
  <div className="flex items-start sm:gap-8">
    <div
      className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1">
        <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
        <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
      </div>
    </div>

    <div>
      <strong
        className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
      >
        # {trainNumber}
      </strong>

      <h3 className="mt-4 text-lg font-medium sm:text-xl">
        <a href="" className="hover:underline">{details?.trainName} </a>
      </h3>

      <p className="mt-1 text-sm text-gray-700">
        Seats Available:
        <div className='flex flex-row space-x-6 mb-5'>
        <div className='flex flex-col gap-2'>
              <span>{"Sleeper : " + details?.price?.sleeper}</span>
              <span>{"AC : " + details?.price?.AC}</span>
        </div>
          
            <div className='flex flex-col gap-2'>
              <span>{"Sleeper : " + details?.seatsAvailable
?.sleeper}</span>
              <span>{"AC : " + details?.seatsAvailable
?.AC}</span>
            </div>
        </div>
        
      </p>

      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <p className="text-xs font-medium">{details?.departureTime?.Hours}:{details?.departureTime?.Minutes}:{details?.departureTime?.Seconds}</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
           Delayed By:<a href="#" className=" hover:text-gray-700">{details?.delayedBy}</a>,
          
        </p>
      </div>
    </div>
  </div>
</article>
  )
}

export default TrainDetail