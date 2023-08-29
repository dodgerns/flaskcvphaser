import base64
from flask import Flask, request, render_template, jsonify
from cvzone.HandTrackingModule import HandDetector
import cv2
import numpy as np

app = Flask(__name__, static_folder="./static", template_folder="./templates")

detector = HandDetector(detectionCon=0.8, maxHands=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gameship')
def ship():
    return render_template('/ship/index.html')
@app.route('/ship_cam', methods=['POST'])
def imageCam():
    try:
        image_data = request.json['image']
        image_data = image_data.replace("data:image/jpeg;base64,", "")

        image_binary = base64.b64decode(image_data)
        nparr = np.frombuffer(image_binary, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        hands, _ = detector.findHands(img)  # No necesitamos la imagen procesada aquí
        
        if hands:
            hand = hands[0]  # Considerando que es la primera mano detectada
            landmarks = hand['lmList']  # Lista de landmarks de la mano

            if landmarks:
                index_finger_tip = landmarks[8]  # Coordenadas de la punta del dedo índice (x, y)
                x, y, _ = index_finger_tip

                # Haz algo con las coordenadas x e y del dedo índice
                response_data = {'x': x, 'y': y}
            else:
                response_data = {'x': -1, 'y': -1}  # Valores por defecto si no se detecta el dedo índice
        else:
            response_data = {'x': -1, 'y': -1}  # Valores por defecto si no se detecta ninguna mano
        
        print(x, y)
    except Exception as e:
        print("Error al procesar la imagen:", e)
        return 'error', 500
    finally:
        cv2.destroyAllWindows()  # Cerrar todas las ventanas abiertas

    return jsonify(response_data)

'''
@app.route('/ship_cam', methods=['POST'])
def imageCam():
    try:
        image_data = request.json['image']
        image_data = image_data.replace("data:image/jpeg;base64,", "")

        image_binary = base64.b64decode(image_data)
        with open("captured_image.jpg", "wb") as f:
            f.write(image_binary)
        img = cv2.imread("captured_image.jpg")
        h, w, _ = img.shape
        detector = HandDetector(detectionCon=0.8, maxHands=2)

        hands, img = detector.findHands(img)
        
        # Display
        #cv2.imshow("Image", img)
        cv2.imwrite("captured_image2.jpg", img)
        response_data = {'x': 600, 'y': 200}
    except Exception as e:
        print("Error al guardar la imagen:", e)
        return 'error', 500
    return jsonify(response_data)
'''

if __name__ == '__main__':
    app.run()
