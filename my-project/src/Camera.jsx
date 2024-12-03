import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../model/hand_landmarker.task";
import { Strings } from "./assets/Strings";
import Navigation from "./component/Navigation";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handPresence, setHandPresence] = useState(null);
  const [HandPrediction, setHandPrediction] = useState("No Character");

  const [displayList, setDisplayList] = useState([]);
  const [indexList, setIndexList] = useState(0);
  const [prevIndexList, setPrevIndexList] = useState(-1);
  const previousValueRef = useRef(null);
  const timerRef = useRef(null);

  const exampleString = Strings;
  const [targetString, setTargetString] = useState(exampleString[0]);
  const [targetStringIndex, setTargetStringIndex] = useState(0);
  const [Points, setPoints] = useState(0);

  useEffect(() => {
    if (
      indexList >= targetString.length &&
      targetStringIndex < exampleString.length
    ) {
      setTargetStringIndex((i) => i + 1);
      setIndexList(0);
      setPrevIndexList(-1);
      setPoints((p) => p + 100);
      setDisplayList([]);
      console.log(targetStringIndex);
    } else {
      setTargetStringIndex(0);
    }
  }, [indexList]);

  useEffect(() => {
    setTargetString(exampleString[targetStringIndex]);
  }, [targetStringIndex]);

  //CHECKING IF HANDS EQAUL TO STRING
  useEffect(() => {
    // Reset timer if variable changes
    if (previousValueRef.current !== HandPrediction) {
      previousValueRef.current = HandPrediction;

      // Clear the existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Start a new timer
      timerRef.current = setTimeout(() => {
        console.log(targetString[indexList]);
        if (
          HandPrediction != "No Character" &&
          HandPrediction == targetString[indexList]
        ) {
          setDisplayList((l) => [...l, HandPrediction]);
          setPrevIndexList(prevIndexList === -1 ? 0 : indexList);
          setIndexList((i) => i + 1);
        }
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [HandPrediction]);

  useEffect(() => {
    let handLandmarker;
    let animationFrameId;

    //initialize hand landmarker and vision
    const initializeHandDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: hand_landmarker_task },
          numHands: 2,
          runningMode: "video",
          delegate: "GPU",
        });
        detectHands();
      } catch (error) {
        console.error("Error initializing hand detection:", error);
      }
    };

    //drawing landmarks
    const drawLandmarkss = (landmarksArray) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set line style for hand landmarks
      ctx.strokeStyle = "rgb(0, 255, 0)";
      ctx.lineWidth = 2;

      // Set fill style for landmarks
      ctx.fillStyle = "rgb(255, 0, 0)";

      // Draw each hand's landmarks
      landmarksArray.forEach((landmarks) => {
        landmarks.forEach((landmark, index) => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          // Draw landmark
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw circle for each landmark
          ctx.fill();

          // Draw lines connecting landmarks (e.g., for hand segments)
          if (index < landmarks.length - 1) {
            const nextLandmark = landmarks[index + 1];
            const nextX = nextLandmark.x * canvas.width;
            const nextY = nextLandmark.y * canvas.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        });
      });
    };

    //call draw landmark when hand is
    const detectHands = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        const detections = handLandmarker.detectForVideo(
          videoRef.current,
          performance.now()
        );

        if (detections.landmarks) {
          drawLandmarkss(detections.landmarks);
        }

        // Capture frame and send to Flask API
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          try {
            const response = await fetch("http://127.0.0.1:5000/detect", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              console.log("Hands detected:", data.hands_detected);
              setHandPresence(data.hands_detected);
              setHandPrediction(data.predicted_character);
            } else {
              console.error("RESPONSE FAILED:", response.statusText);
            }
          } catch (error) {
            console.error("FETCH FAILED", error);
          }
        }, "image/jpeg");
      }
      requestAnimationFrame(detectHands);
    };

    //WEBCAM LOADING
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          const videoElement = videoRef.current;
          const canvasElement = canvasRef.current;
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
          initializeHandDetection();
        };
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();
    //CLEANUP CODE
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (handLandmarker) {
        handLandmarker.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className=' min-h-screen w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center  '>
      <Navigation classNames='py-10' />
      <p className='font-bold text-3xl text-center mt-10 mb-10'>Play Game</p>
      <div className='w-fit h-auto flex justify-center flex-row items-center  border-2  relative bg-white'>
        <div className='flex-col items-center  mx-5 p-5 w-[250px] justify-evenly text-center'>
          <p className='my-5'>Spell the word</p>
          <div className='my-5  text-xl font-bold'>
            {targetString.map((char, index) => (
              <span
                className={`${
                  index <= prevIndexList ? "text-red-500" : "text-black"
                } px-2 text-4xl `}
                key={index}
              >
                {char}
              </span>
            ))}
          </div>
          <p className='my-5'>Points : {Points} </p>
        </div>
        <div className='flex-col justify-center items-center mt-14 mr-10'>
          <div className='relative w-[300px] h-[150px] bg-red-50'>
            {/* <video
              ref={videoRef}
              autoPlay
              playsInline
              className='w-full rounded-lg'
            ></video>
            <canvas
              ref={canvasRef}
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
              }}
            ></canvas> */}
          </div>
          <div className='text-center my-5 font-bold text-2xl'>
            {HandPrediction}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
