import data from './data.json'
import { Client, Appium } from './classes'
import { sleep } from './helpers';

const main = async () => {
    // Только для теста
    const profile = data.find((acc) => acc.name === "accountName")!
    
    const appium = new Appium()
    Client.launchEmulator(profile.name)
    
    appium.launchAppium()
    
    await sleep(10000)

    const browser = await appium.getBrowser()
    const client = new Client(browser)

    // Тут можно делать любые действия

    await sleep(5000)

    Client.closeEmulator(profile.name)
    appium.stopAppium()
}

main()


