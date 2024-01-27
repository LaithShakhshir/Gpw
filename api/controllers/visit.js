import { db } from "../connect.js"
// import bcrypt from "bcryptjs";


export const visittabel = (req, res) => {

  const q = "SELECT * FROM taxiofficeoption";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);

  });

 
};
// SELECT * FROM `taxiofficeoption` WHERE 1 `optionID`, `taxiOfficeID`, `optionName`, `optionTime`, `optionSeats`, `optionPhoto`, `costKmUnit`, `costKmPrice`, `taxiRideId`

 
export const register = (req, res) => {
  const { optionID, taxiOfficeID, taxiRideId,optionName, costKmPrice } = req.body;

  
    const insertTaxiQuery = "INSERT INTO taxiofficeoption (`optionID`, `taxiOfficeID`, `taxiRideId`, `optionName`, `costKmPrice`) VALUES (?, ?, ?, ?, ?)";
    const taxiValues = [optionID,   taxiOfficeID, taxiRideId,optionName,costKmPrice];

    db.query(insertTaxiQuery, taxiValues, (taxiErr, taxiData) => {
      if (taxiErr) return res.json({ error: taxiErr });
      return res.json({ success: true });
    });
  // });
};




   export const read = (req, res) => {
    const q = "SELECT * FROM taxiofficeoption WHERE optionID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });
  };

  
  export const edit = (req, res) => {
    const {  taxiOfficeID, taxiRideId, optionName, costKmPrice } = req.body;
    const ID = parseInt(req.params.ID);
    
    if (isNaN(ID)) {
      return res.status(400).json({ Message: "Invalid ID parameter" });
    }
  
    const q = 'UPDATE taxiofficeoption SET `taxiOfficeID`=?, `taxiRideId`=?, `optionName`=?, `costKmPrice`=? WHERE optionID=?';
  
    db.query(q, [ taxiOfficeID, taxiRideId, optionName, costKmPrice, ID], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "Error updating taxi" });
      }
      return res.json({ Message: "Taxi updated successfully" });
    });
};

  

  export const deleted = (req, res) => {
    const q = "DELETE FROM taxiofficeoption WHERE optionID = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  