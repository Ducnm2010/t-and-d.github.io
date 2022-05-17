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
}

const helper = new Helper()

export default helper;