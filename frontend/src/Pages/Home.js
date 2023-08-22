import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [dataTrain, setDataTrain] = useState([
        {
          trainDetails: "",
          trainPrice: "",
          trainTime: "",
        }
      ]);
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      const navigate = useNavigate();
    
      useEffect(() => {
        async function getTrainDetails() {
          try {
            const response = await axios.get("http://localhost:8000/getDetails");
            setDataTrain(response.data)
            setLoading(false);
          } catch (error) {
            console.error(error);
            setError(error);
            setLoading(false);
          }
        }
        getTrainDetails();
      }, []);
    
      const viewDets = (trainNumber) => {
        navigate("/train?trainNum=" + trainNumber);
      }
    
      useEffect(() => {
        console.log(dataTrain);
      }, [dataTrain]);
  return (
    <div class="flex justify-center items-center max-h-screen">
        <div className="w-[800px] rounded-lg border border-gray-200 max-w-full ">
  {loading?<h1>Loading</h1>:(
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Train Number
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Train Details
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Train Price
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Train Time
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          available

        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 ">
    {
        dataTrain.map((item, index) => {
          return (
            <tr key={index} className='m-auto'>
              <td className='m-auto'>{item.trainNumber}</td>
              <td>{item.trainDetails}</td>
              <td>₹{item.trainPrice}</td>
              <td>{item.trainTime}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td><button className="cursor-pointer" onClick={() => viewDets(item.trainNumber)}>View</button></td>
            </tr>
          )
    })}
    </tbody>

    
    
  </table>
  )}
  
</div>
    </div>
    
  )
}

export default Home