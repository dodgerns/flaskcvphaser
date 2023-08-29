const camera = document.getElementById('camera');
const captureAndSendButton = document.getElementById('captureAndSendButton');

// Acceder a la cámara
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = stream;
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
}

// Capturar una imagen y enviar automáticamente
captureAndSendButton.addEventListener('click', async () => {
    const videoWidth = camera.videoWidth;
    const videoHeight = camera.videoHeight;

    const canvas = document.createElement('canvas');
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(camera, 0, 0, videoWidth, videoHeight);
    const imageDataURL = canvas.toDataURL('image/jpeg');

    try {
        const response = await fetch('http://localhost:5000/ship_cam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageDataURL })
        });

        if (response.ok) {
            console.log('Imagen enviada con éxito.');
        } else {
            console.error('Error al enviar la imagen:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

startCamera();
