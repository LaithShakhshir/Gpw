import { db } from "../connect.js"


export const visitertabel = (req, res) => {
  const q = "SELECT * FROM database_wink.passenger   ";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};


export const addvisiter = (req, res) => {
  const getUserInfoQuery = `
  SELECT  id, name, photo, email, password, money
  FROM passenger
  WHERE id IN (
    SELECT userId
    FROM taxiride
    WHERE accept = 0
  );
`;


// Execute the query
db.query(getUserInfoQuery, (error, results) => {
  if (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Error retrieving user information" });
    return;
  }

  // Send the results back as JSON
  res.status(200).json(results);
});
}





 export const register = (req, res) => {
  const visitorQuery =
    "INSERT INTO passenger (`id`, `name`, `photo`, `email`, `password`, `money`) VALUES (?, ?, ?, ?, ?, ?)";
  
  const visitorValues = [
    req.body.userID,
    req.body.name,
    req.body.photo,
    req.body.email,
    req.body.password,
    req.body.money,
  ];

  // Execute the SQL query
  db.query(visitorQuery, visitorValues, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Registration failed. Please try again.' });
    }

    // Assuming the query is successful
    console.log('Visitor registered successfully');
    return res.status(200).json({ message: ' registered successfully' });
  });
};

// Close the database connection when the server shuts down
// process.on('SIGINT', () => {
//   connection.end();
//   process.exit();
// })








  export const read = (req, res) => {
    const q = `
      SELECT v.*, p.startPosition,p.endPosition , vis.optionName, p.rideCost,p.rideDate,p.rideTime,p.userID
      FROM passenger AS v
      LEFT JOIN taxiride AS p ON v.id = p.userId
      LEFT JOIN taxiofficeoption AS vis ON p.taxiRideId = vis.taxiRideId
      WHERE v.id = ?
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
    const { name, email, password, photo, money, id } = req.body;
    const ID = parseInt(req.params.ID);
    
    if (isNaN(ID)) {
      return res.status(400).json({ Message: "Invalid ID parameter" });
    }
  
    const q = 'UPDATE passenger SET `name`=?, `email`=?, `password`=?, `photo`=?, `money`=?, `id`=? WHERE id=?';
  
    db.query(q, [name, email, password, photo, money, id, ID], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "Error updating user" });
      }
      return res.json({ Message: "User updated successfully" });
    });
};
  

  export const deleted = (req, res) => {
    const q = "DELETE FROM passenger WHERE id = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }
  

  export const delet = (req, res) => {
    const q = "DELETE FROM taxiride WHERE userId = ?";
    const ID = req.params.ID;
  
    db.query(q,[ID], (err, data) => {
      if (err) {
        return res.status(500).json({Message: "error"});
      }
      return res.json(data);
    });

  }


  //export const addvisitertosystem = (req, res) => {
    
    // const visitorID = req.params.ID;

    // // Query to get the user's information and taxi price
    // const getUserAndTaxiInfoQuery = `
    //   SELECT u.userID, t.price
    //   FROM register r
    //   JOIN userapp u ON r.userID = u.userID
    //   JOIN taxi t ON r.id = t.id
    //   WHERE r.ID = ? AND r.acceptUser = 0;
    // `;
  
    // // Execute the query
    // db.query(getUserAndTaxiInfoQuery, [visitorID], (error, results) => {
    //   if (error) {
    //     console.error("Error executing query:", error);
    //     res.status(500).json({ error: "Error retrieving user and taxi information" });
    //     return;
    //   }
  
    //   if (results.length === 0) {
    //     res.status(400).json({ error: "User not found or already accepted" });
    //     return;
    //   }
  
    //   const { userID, price } = results[0];
  
    //   // Update acceptUser to 1 in the register table
    //   const updateRegisterQuery = "UPDATE register SET acceptUser = 1 WHERE ID = ?";
  
    //   db.query(updateRegisterQuery, [visitorID], (updateError, updateResults) => {
    //     if (updateError) {
    //       console.error("Error updating acceptUser:", updateError);
    //       res.status(500).json({ error: "Error updating acceptUser" });
    //       return;
    //     }
  
    //     // Deduct money from the user's account based on taxi price
    //     const updateMoneyQuery = "UPDATE userapp SET money = money - ? WHERE userID = ?";
  
    //     db.query(updateMoneyQuery, [price, userID], (moneyError, moneyResults) => {
    //       if (moneyError) {
    //         console.error("Error updating user's money:", moneyError);
    //         res.status(500).json({ error: "Error updating user's money" });
    //         return;
    //       }
  
    //       res.sendStatus(200);
    //     });
    //   });
    // });
   



    
  //};
  export const addvisitertosystem = (req, res) => {
    const visitorID = req.params.id;
console.log("s")
    // Query to get the user's information, taxi price, and NumOFpepole
    const getUserAndTaxiInfoQuery = `
        SELECT u.id, r.rideCost
        FROM taxiride r
        JOIN passenger u ON r.userId = u.id
        WHERE r.taxiRideId = ? AND r.accept = 0;
    `;
    // Execute the query
    db.query(getUserAndTaxiInfoQuery, [visitorID], (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Error retrieving user and taxi information" });
            return;
        }
        console.log(results)
        console.log([visitorID])

        if (results.length === 0) {
            res.status(400).json({ error: "User not found or already accepted" });
            return;
        }

        const { userID, price, NumOFpepole } = results[0];

        // Update acceptUser to 1 in the register table
        const updateRegisterQuery = "UPDATE taxiride SET accept = 1 WHERE userId = ?";

        db.query(updateRegisterQuery, [visitorID], (updateError, updateResults) => {
            if (updateError) {
                console.error("Error updating acceptUser:", updateError);
                res.status(500).json({ error: "Error updating acceptUser" });
                return;
            }

            const updateMoneyQuery = "UPDATE passenger SET money = money - ? WHERE id = ?";

            db.query(updateMoneyQuery, [price, userID], (moneyError, moneyResults) => {
                if (moneyError) {
                    console.error("Error updating user's money:", moneyError);
                    res.status(500).json({ error: "Error updating user's money" });
                    return;
                }

               

                    res.sendStatus(200);
                });
          
        });
    });
};
  