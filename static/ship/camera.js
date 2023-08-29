export class Camera{
    construct(){
        this.camera = null;
    }
    async startCamera() {
        try {
            this.camera = document.getElementById('camera');
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.camera.srcObject = stream;
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
        }
    }
    getImage(){
        return this.camera;
    }
}