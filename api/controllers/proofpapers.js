
import { db } from "../connect.js";



export const proofpapers = (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT 
      passenger.id,
      passenger.name,
      passenger.email,
      passenger.password,
      passenger.dob,
      passenger.gender,
      passenger.bio,
      passenger.photo,
      passenger.money,
      taxiride.taxiRideId AS taxiRideId,
      taxiride.userId,
      taxiride.taxiOfficeId,
      taxiride.startPosition,
      taxiride.endPosition,
      taxiride.taxiOptionId,
      taxiride.paymentMethod,
      taxiride.rideTime,
      taxiride.rideDate,
      taxiride.startPlaceName,
      taxiride.endPlaceName,
      taxiride.rideDuration,
      taxiride.rideCost,
      taxiride.rideDistance,
      taxiride.driverId,
      taxiride.rideRating,
      taxiride.rideStatus,
      taxiride.accept
    FROM passenger
    INNER JOIN taxiride ON passenger.id = taxiride.userId
    WHERE taxiride.taxiRideId = ${id}`;

  db.query(query, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const userDetails = result.map(entry => {
        return {
          taxiRideId: entry.taxiRideId,
          name: entry.name,
          email: entry.email,
          startPosition: entry.startPosition,
          endPosition: entry.endPosition,
          rideDistance: entry.rideDistance,
          rideDate: entry.rideDate,
          rideTime: entry.rideTime,
          paymentMethod: entry.paymentMethod,
          
       
          // Add other fields as needed
        };
      });

      res.json(userDetails);
    } else {
      res.status(404).json({ message: 'User details not found' });
    }
  });
};
