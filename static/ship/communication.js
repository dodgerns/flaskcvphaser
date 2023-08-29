export class Communication{
    constructor(camera, api){
        this.camera = camera;
        this.api = api;
    }
    sendImage(){
        const image = this.takeImage();
        return this.api.sendImage(image);
    }
    takeImage(){
        const videoWidth = this.camera.videoWidth;
        const videoHeight = this.camera.videoHeight;

        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        const canvasContext = canvas.getContext('2d');

        canvasContext.drawImage(this.camera, 0, 0, videoWidth, videoHeight);
        const imageDataURL = canvas.toDataURL('image/jpeg');
        return imageDataURL;
    }
}