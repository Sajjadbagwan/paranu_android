
class ParanuLog {

    static info(message) {
        ParanuLog.print(`info: ${message}`)
    }

    static debug(message) {
        ParanuLog.print(`debug: ${message}`)
    }

    static error(message) {
        ParanuLog.print(`error: ${message}`)
    }

    static print(message) {
        console.log(`Paranu Console ${message}`);
    }

}

export default ParanuLog;