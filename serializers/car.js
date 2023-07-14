exports.serialize = function(rawCars, rawColors, rawCarColors=null) {

    hasMultipleCar = !!rawCarColors;

    return rawCars.map(car => {
        let colorIds = [];

        if (hasMultipleCar) {
            colorIds = rawCarColors
                .filter(carColor => car.car_id == carColor.car_id)
                .map(carColor => carColor.color_id);
        }

        return {
            ...car,
            colors: hasMultipleCar
                ? rawColors.filter(color => colorIds.includes(color.color_id))
                : rawColors
        }
    })
}