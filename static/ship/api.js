export class Api{
    constructor(){
        this.urlImage = 'http://localhost:5000/ship_cam';
    }
    async sendImage(image){
        try {
            const response = await fetch(this.urlImage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: image })
            });
    
            if (response.ok) {
                console.log('Imagen enviada con éxito.');
                const data = await response.json();
                return data;
            } else {
                console.error('Error al enviar la imagen:', response.statusText);
                return {x:0, y: 0}
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
}