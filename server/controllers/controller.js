import axios from "axios";
const auth = {
    "companyName": "SRM",
    "clientID": "36c1da69-68b1-4c84-9c27-79111fdfca22",
    "clientSecret": "xnVnrwguMCziEzIE",
    "ownerName": "Sivaramakrishnan",
    "ownerEmail": "sm2482@srmist.edu.in",
    "rollNo": "RA2011029010002"
}

export const getTrainDetails = (req, res) => {
    console.log(auth);
    axios.post("http://20.244.56.144/train/auth", auth).then(
      (response) => {
        console.log(response.data);
        var data1 = response.data;
        var accessToken = data1.access_token;
        axios.get("http://20.244.56.144/train/trains", {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(
          (response) => {
            console.log(response.data);
            const trainData = [];
            for (let i = 0; i < response.data.length; i++) {
              const { trainName, price, seatsAvailable, departureTime, trainNumber } = response.data[i];
              const trainTime = `${departureTime.Hours}:${departureTime.Minutes}`;
              const trainTimeinMin = departureTime.Hours * 60 + departureTime.Minutes;
              const currentTime = new Date();
              const currentHour = currentTime.getHours();
              const currentMin = currentTime.getMinutes();
              const currentTimeinMin = currentHour * 60 + currentMin;
              const timeDiff = trainTimeinMin - currentTimeinMin;
              const train = {
                trainDetails: trainName,
                trainPrice: price.sleeper,
                trainSeat: seatsAvailable,
                trainTime: trainTime,
                trainNumber : trainNumber, 
                available: timeDiff < 30 ? false : true
              };
              trainData.push(train);
            }
            const pricesOrderSleeper = [];
            for (let i = 0; i < response.data.length; i++) {
              pricesOrderSleeper.push(response.data[i].price.sleeper);
            }
            pricesOrderSleeper.sort((a, b) => a - b);
            console.log(pricesOrderSleeper);
  
            const pricesOrderAC = [];
  
            for (let i = 0; i < response.data.length; i++) {
              pricesOrderAC.push(response.data[i].price.AC);
            }
            pricesOrderAC.sort((a, b) => a - b);
            console.log(pricesOrderAC);
            res.send(trainData);
          }
        )
      });
};

export const getParticularDetails = async (req, res) => {
    const {trainNum} = req.query;
    console.log(trainNum);
    axios.post("http://20.244.56.144/train/auth", auth).then(
      (response) => {
        console.log(response.data);
        var data1 = response.data;
        var accessToken = data1.access_token;
        axios.get(`http://20.244.56.144/train/trains/${trainNum}`, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(
          (response) => {
            res.status(200).send(response.data);
          }
        )
      });
  }