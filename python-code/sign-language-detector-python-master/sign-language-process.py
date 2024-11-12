from flask import Flask, request, jsonify, send_file
import mediapipe as mp
import cv2
import numpy as np
import tempfile
import os
from flask_cors import CORS
import pickle

model_dict = pickle.load(open('./python-code/model.p', 'rb'))
model = model_dict['model']

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

labels_dict = {0: 'A', 1: 'C', 2: 'F'}

@app.route('/detect', methods=['POST'])
def process_image():
    # Check if an image file was uploaded
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Read the image file
    file_bytes = np.fromstring(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Convert the image to RGB as required by MediaPipe
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Process the image and find hands
    results = hands.process(img_rgb)

    if(results.multi_hand_landmarks):
        data_aux = []
        x_ = []
        y_ = []

        for hand_landmarks in results.multi_hand_landmarks:
            for landmark in hand_landmarks.landmark:
                x_.append(landmark.x)
                y_.append(landmark.y)

            for landmark in hand_landmarks.landmark:
                data_aux.append(landmark.x - min(x_))
                data_aux.append(landmark.y - min(y_))

        prediction = model.predict([np.asarray(data_aux)])
        predicted_character = labels_dict[int(prediction[0])]


        # hands_detected = bool(results.multi_hand_landmarks)
        return jsonify({"predicted_character": predicted_character, "hands_detected" : bool(results.multi_hand_landmarks) })
    else:
        return jsonify({"predicted_character": "No Character"})

  

if __name__ == '__main__':
    app.run(debug=True)
