 function weekStarterEnderFinder(){
    const currentDate = new Date();

    // Calculate the start of the week (Sunday)
    let  startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    // Calculate the end of the week (Saturday)
    let endOfWeek = new Date(currentDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfWeeki=startOfWeek.toISOString().split('T')[0];
    const endOfWeeki=endOfWeek.toISOString().split('T')[0];
    return [new Date(startOfWeeki),new Date(endOfWeeki)]
}

module.exports=weekStarterEnderFinder