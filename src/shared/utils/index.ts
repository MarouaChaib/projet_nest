export function generateUnitValues(exist:boolean = false) : string{
    const uniqueValue = crypto.randomUUID();
    return exist ? uniqueValue.split('-')[0] : uniqueValue
}// cette fonction génère une valeur unique pour les unités, si exist est true, elle retourne la première partie de l'UUID, sinon elle retourne l'UUID complet.