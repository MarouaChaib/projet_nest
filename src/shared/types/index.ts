export class generecResponse {
    message: string
    constructor  (message : string){
        this.message = message
    } 
}// cette classe génère une réponse générique avec un message fourni lors de l'instanciation. ce qui permet de standardiser les réponses de l'API en utilisant un format commun pour les messages de succès ou d'erreur.