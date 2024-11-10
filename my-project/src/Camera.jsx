import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import hand_landmarker_task from "../model/hand_landmarker.task";
import { Strings } from "./assets/Strings";

const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [handPresence, setHandPresence] = useState(null);
    const [HandPrediction, setHandPrediction] = useState(null);

    const [displayList, setDisplayList] = useState([]);
    const [indexList, setIndexList] = useState(0);
    const [prevIndexList, setPrevIndexList] = useState(-1);
    const previousValueRef = useRef(null);
    const timerRef = useRef(null);

    const exampleString = Strings;
    const [targetString, setTargetString] = useState(exampleString[0])
    const [targetStringIndex, setTargetStringIndex] = useState(0)

    useEffect(() => {
        if(indexList >= targetString.length){
            setTargetStringIndex(targetStringIndex + 1)
            setTargetString(exampleString[targetStringIndex]);
            setIndexList(0);
            setPrevIndexList(-1);

            setDisplayList([])
        }
    }, [indexList])

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
            console.log(targetString[indexList])
            if(HandPrediction != "No Character" && HandPrediction == targetString[indexList]){
                setDisplayList((prevList) => [...prevList, HandPrediction]);
                setPrevIndexList(prevIndexList === -1 ? 0 : indexList)
                setIndexList(indexList + 1)
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
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
                );
                handLandmarker = await HandLandmarker.createFromOptions(
                    vision, {
                        baseOptions: { modelAssetPath: hand_landmarker_task },
                        numHands: 2,
                        runningMode: "video",
                        delegate: "GPU",
                    }
                );
                detectHands();
            } catch (error) {
                console.error("Error initializing hand detection:", error);
            }
        };
    
    //drawing landmarks
    const drawLandmarkss = (landmarksArray) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set line style for hand landmarks
        ctx.strokeStyle = 'rgb(0, 255, 0)'; 
        ctx.lineWidth = 2;

        // Set fill style for landmarks
        ctx.fillStyle = 'rgb(255, 0, 0)'; 

        // Draw each hand's landmarks
        landmarksArray.forEach(landmarks => {
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
    }
    

        //call draw landmark when hand is
        const detectHands = () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
                const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
                
                if (detections.landmarks) {
                    drawLandmarkss(detections.landmarks);
                }

                // Capture frame and send to Flask API
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                // Convert canvas to Blob 
                canvas.toBlob(async (blob) => {
                    const formData = new FormData();
                    formData.append('file', blob, 'frame.jpg');

                    try {
                        const response = await fetch('http://127.0.0.1:5000/detect', {
                            method: 'POST',
                            body: formData,
                        });

                        if (response.ok) {
                            const data = await response.json();
                            console.log("Hands detected:", data.hands_detected);
                            setHandPresence(data.hands_detected);
                            setHandPrediction(data.predicted_character);
                           
                        } else {
                            console.error('Failed to process frame:', response.statusText);
                        }
                    } catch (error) {
                        console.error('Error sending frame to Flask API:', error);
                    }
                }, 'image/jpeg');

                    }
            requestAnimationFrame(detectHands);
        };

        //WEBCAM LOADING
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
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
    <>
        <div className="w-auto h-auto flex justify-center flex-row items-center">
            <div className="flex-col justify-center items-center bg-slate-600 mx-5 p-5 w-[300px]">
                <h1>Is there a Hand? {handPresence ? "Yes" : "No"}</h1>
                <h1>Hand Predicition : {HandPrediction}</h1>
            </div>
            <div className="flex-col">
                <div className="relative w-[300px] h-auto">
                    <video ref={videoRef} autoPlay playsInline className="w-full"></video>
                    <canvas
                            ref={canvasRef} 
                            style={{
                                backgroundColor: "transparent",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: 'auto',
                            }}
                        ></canvas>
                </div>
            </div>
        </div>
        <div>
        {targetString.map((char, index) => (
          <span
            key={index}
            style={{
              padding: '5px',
              color: index <= prevIndexList ? 'red' : 'black',
            }}
          >
            {char}
          </span>
          ))}   
        </div>
        <ul>
        {displayList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
    );
};

export default Camera;