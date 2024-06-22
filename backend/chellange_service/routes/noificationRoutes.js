const express = require("express");
const router = express.Router();
const asyncHandler=require("express-async-handler")
const webpush = require('web-push');
const Subscribers=require("../model/subscriberModel")


webpush.setVapidDetails(
  'mailto:nnm22mc069@gmail.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

router.post('/notification/subscribe',asyncHandler( async(req, res) => {

  const subscription = req.body;
  await Subscribers.create({subscriber:subscription})
  res.status(201).json("subscribed");
  }));

  router.get('/notification/get',async(req,res)=>{
    const response=await Subscribers.find({},{_id:0})
    return res.status(400).json(response[0].subscriber)
  })
  
  // Endpoint to send notifications
  router.post('/notification/send-notification',asyncHandler(async (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'New Challenge',
        body: 'A new challenge has been added!',
        icon: 'icon-url', // Replace with your icon URL
      },
    };

    const response=await Subscribers.find({},{_id:0})
  
    const promises = response.map(sub => {
      
      return webpush.sendNotification(sub.subscriber, JSON.stringify(notificationPayload))
    }
    );
  
  
    Promise.all(promises)
      .then(() => res.status(200).json({ message: 'Notifications sent successfully' }))
      .catch(err => {
        console.error('Error sending notification, reason: ', err);
        res.sendStatus(500);
      });
  }));

  module.exports=router