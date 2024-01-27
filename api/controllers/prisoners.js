import { db } from "../connect.js"
// import bcrypt from "bcryptjs";
export const registertrip = (req, res) => {

  const q = "INSERT INTO trip (`id`,`from`,`to`,`price`,`date`) VALUES (?)";
  const values=[
    req.body.id,
    req.body.from,
    req.body.to,
    req.body.price,
    req.body.date,
    
    


  ]
 
   db.query(q, [values],(err, data) => {
     if (err) return res. json(err);
     return res.json(data);
 
   });
   }
export const deletetrip = (req, res) => {
  const q = "DELETE FROM trip WHERE id = ?";
  const ID = req.params.ID;

  db.query(q,[ID], (err, data) => {
    if (err) {
      return res.status(500).json({Message: "error"});
    }
    return res.json(data);
  });

}
export const triptabel = (req, res) => {

  const q = "SELECT * FROM trip";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);

  });

 
};
export const prisonerstabel = (req, res) => {

  const q = "SELECT * FROM taxiride";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);

  });

 
};
export const register = (req, res) => {

  const q = "INSERT INTO taxiride (`taxiRideId `,`userId`,`taxiOfficeId`,`startPosition`,`endPosition`,`taxiOptionId`,`paymentMethod`,`rideTime`,`rideDate`,`startPlaceName`, `endPlaceName`,`rideDuration`,`rideCost`,`rideDistance`,`driverId`,`rideRating`,`rideStatus`	,`accept`) VALUES (?)";
  const values=[
    req.body.taxiRideId,
    req.body.userId,
    req.body.taxiOfficeId,
    req.body.startPosition,
    req.body.endPosition,
    req.body.taxiOptionId,
    req.body.paymentMethod,
    req.body.rideTime,
    req.body.rideDate,
    
    req.body.startPlaceName,
    req.body.endPlaceName,
    req.body.rideDuration,
    req.body.rideCost,
    req.body.rideDistance,
    req.body.driverId,
    req.body.rideRating,
    req.body.rideStatus,
    req.body.accept,
   
    
    
    
  ]
 
   db.query(q, [values],(err, data) => {
     if (err) return res. json(err);
     return res.json(data);
 
   });
   }

 


  export const read = (req, res) => {
    const q = `
      SELECT p.*, v.optionName , v.optionID  ,v.costKmPrice
      FROM taxiride AS p
      LEFT JOIN taxiofficeoption AS v ON p.taxiRideId = v.taxiRideId
      WHERE p.taxiRideId = ?
    `;
    const ID = req.params.ID;
  
    db.query(q, [ID], (err, data) => {
      if (err) {
        return res.status(500).json({ Message: "error" });
      }
      return res.json(data);
    });
  };
  
  
  

  
  export const edit = (req, res) => {
    const { startPosition, endPosition, rideCost, rideDate,taxiRideId } = req.body;
    const ID = parseInt(req.params.ID);
console.log(ID);
    if (isNaN(ID)) {
        return res.status(400).json({ Message: "Invalid ID parameter" });
    }

    const q = 'UPDATE taxiride SET `startPosition`=?, `endPosition`=?, `rideCost`=?, `rideDate`=? WHERE taxiRideId=?';

    db.query(q, [startPosition, endPosition, rideCost, rideDate, taxiRideId, ID], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error updating trip" });
        }
        return res.json({ Message: "Trip updated successfully" });
    });
};

  

  export const deleted = (req, res) => {
    const q = "DELETE FROM taxiride WHERE taxiRideId = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  