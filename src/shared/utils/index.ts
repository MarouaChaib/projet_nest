export function generateUnitValues(exist:boolean = false) : string{
    const uniqueValue = crypto.randomUUID();
    return exist ? uniqueValue.split('-')[0] : uniqueValue
}