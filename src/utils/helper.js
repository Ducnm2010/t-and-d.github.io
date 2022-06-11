class Helper {

    logData(data) {
        if (typeof data !== 'object')
            console.log('%c DATA:', 'background: green; color: white', data)
        else {
            const keys = Object.keys(data)
            const isMultiProps = keys.length > 1
            if (isMultiProps)
                return this.logError('Multiple props Object is not supported!')
            const key = keys[0]
            const value = Object.values(data)[0]
            console.log(`%c ${key}`, 'background: green; color: white', value)
        }
    }

    logError(error) {
        console.log('%c ERROR:', 'background: red; color: white', error?.message || error)
    }

    appendZero(number) {
        switch (number) {
            case 0:
                return ''
            case 1:
                return '0'
            case 2:
                return '00'
            case 3:
                return '000'
            case 4:
                return '0000'
            case 5:
                return '00000'
            case 6:
                return '000000'
            default:
                break;
        }
    }
}

const helper = new Helper()

export default helper;