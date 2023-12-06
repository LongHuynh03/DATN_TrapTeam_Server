var express = require("express");
var router = express.Router();

const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");

const firebaseConfig = {
  apiKey: "AIzaSyAfZh2FdgV9hWz0VuycRxblV2-sObMhspY",
  authDomain: "bnbtour-8e2c6.firebaseapp.com",
  projectId: "bnbtour-8e2c6",
  storageBucket: "bnbtour-8e2c6.appspot.com",
  messagingSenderId: "501822796114",
  appId: "1:501822796114:web:d3878c353551fce2f50a8b",
  measurementId: "G-XHJK148233",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

// add image to firebase storage
// http://localhost:3000/api/image/upload
router.post("/upload", [upload.single("image")], async (req, res, next) => {
  try {
    let { file } = req;
    if (file) {
      const dateTime = giveCurrentDateTime();

      const storageRef = ref(
        storage,
        `bnbtour/${req.file.originalname + "_" + dateTime}`
      );

      const metadata = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("File successfully uploaded.");

      return res.json({ imageURL: downloadURL });
    } else {
      return res.json({ imageURL: "" });
    }
  } catch (error) {
    console.log("Add image:", error);
    next(error);
  }
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = router;
