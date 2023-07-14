exports.serialize = function(rawUsers, rawCars, rawColors) {

    return rawUsers.map(user => {
        const car = rawCars && rawCars.length
            ? rawCars.filter(car => car.car_id == user.car_id)[0]
            : null;
        const color = rawColors && rawColors.length
            ? rawColors.filter(color => color.color_id == user.color_id)[0]
            : null;
        
        return {...user, color, car }
    })
}