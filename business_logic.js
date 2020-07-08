const {scribingData} = require('./data_acces');

function getDataPage(url) {
    return scribingData(url, 1, 10).then((data) => {
        /* Sort income data by asd */
        let dataList = data.sort((a, b) => {
            if (a.name === b.name) {
                return 0
            } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            } else {
                return -1
            }
        });

        /* Class-template for create car-object */
        class addCar {
            constructor(obj) {
                this.img = obj.img;
                this.name = obj.name;
                this.minPrice = obj.price;
                this.maxPrice = obj.price;
                this.minYear = obj.year;
                this.maxYear = obj.year;
                this.count = 1
            }
        }

        /* Sort function: in-args( sorted object, next object to sort ), change first object or create new*/
        function compareAndSwap(obj_1, obj_2) {
            if (obj_1.img === undefined) {
                obj_1.img = obj_2.img
            }
            if (obj_1.minPrice > obj_2.price) {
                obj_1.minPrice = obj_2.price
            }
            if (obj_1.maxPrice < obj_2.price) {
                obj_1.maxPrice = obj_2.price
            }
            if (obj_1.minYear > obj_2.year) {
                obj_1.minYear = obj_2.year
            }
            if (obj_1.maxYear < obj_2.year) {
                obj_1.maxYear = obj_2.year
            }
        }

        /* Create first object in final array */
        let arrResult = [new addCar(dataList[0])];

        /* Collect needed data to array */
        for (let i = 1, resultIndex = 0; i < dataList.length; i++) {
            if (arrResult[resultIndex].name === dataList[i].name) {
                compareAndSwap(arrResult[resultIndex], dataList[i]);
                arrResult[resultIndex].count += 1
            } else {
                arrResult.push(new addCar(dataList[i]));
                resultIndex++
            }
        }
        /* Prepare sorted data */
        arrResult.sort((a, b) => b.count - a.count);

        return arrResult
    });
}

module.exports = {getDataPage};