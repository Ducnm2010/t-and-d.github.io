import { isRef, unref } from 'vue'

export const formatTimestampIntoUnits = (val) => {
    if (!val) return
    const countDown = isRef(val) ? unref(val) : val
    const validateTimeLeft = val => val <= 0 ? 0 : val

    const days = validateTimeLeft(Math.floor(countDown / (1000 * 60 * 60 * 24)))
    const hours = validateTimeLeft(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    const minutes = validateTimeLeft(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
    const seconds = validateTimeLeft(Math.floor((countDown % (1000 * 60)) / 1000))

    return { days, hours, minutes, seconds }
};

class Formatter {

}

const formatter = new Formatter()

export default formatter;