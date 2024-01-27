

import { db } from "../connect.js"
// const Event = require('./models/Event');



export const first = async (req, res) => {
    const query = 'SELECT * FROM events';
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        const events = results.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        res.json(events);
      }
    });
  };
  


export const secound = async(req,res)=>{

    const { title, start, end, allDay } = req.body;
    const query = 'INSERT INTO events (title, start, end, allDay) VALUES (?, ?, ?, ?)';
    db.query(query, [title, start, end, allDay], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        const event = { id: results.insertId, title, start, end, allDay };
        res.json(event);
      }
    });
  }
export const third =async (req,res)=>{
    const query = 'DELETE FROM events WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.json({ message: 'Event deleted' });
      }
    });
  }