const datesBetween = require('dates-between');


const dateMethods={
    getDatesInRange: (startDate, endDate)=> {
        const arrayOfDates = []
        for (const date of  datesBetween(new Date(startDate), new Date(endDate))) {
            arrayOfDates.push(date)
            console.log(date);
        }
        console.log(arrayOfDates)
        return arrayOfDates
    }
}
  

module.exports = dateMethods