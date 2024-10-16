import { Browser } from 'webdriverio';
import { spawn, exec } from 'child_process'

import { APPS_INFO, LD_CONSOLE_PATH } from '../config';
import { sleep } from '../helpers';
import { ProxyType } from '../types';


class Client {
    browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    async setProxy(proxy: ProxyType): Promise<Boolean> {
        const { ip, port, protocol, login, password } = proxy;

        const isSuperProxyInstalled = await this.browser.isAppInstalled(APPS_INFO.superProxy.id)

        console.log('SuperProxy установлен: ', isSuperProxyInstalled)

        if (!isSuperProxyInstalled) {
            await this.browser.installApp(APPS_INFO.superProxy.appDir)
            console.log('SuperProxy установлен!')
        }

        const addProxyButton = await this.browser.$('//android.widget.Button[@content-desc="Add proxy"]')
        const serverInput = await this.browser.$('//android.widget.EditText[@hint="Server"]')
        const portInput = await this.browser.$('//android.widget.EditText[@hint="Port"]')
        const authenticationMethodSelect = await this.browser.$('//android.widget.EditText[@text="None"]')
        const authenticationMethodSelectLogin = await this.browser.$('//android.view.View[@content-desc="Username/Password"]')
        const saveButton = await this.browser.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View[1]/android.widget.Button[2]')
        const protocolSelect = await this.browser.$('//android.widget.EditText[@text="SOCKS5"]')
        const protocolSelectHttp = await this.browser.$('//android.view.View[@content-desc="HTTP"]')
        const protocolSelectSocks5 = await this.browser.$('//android.view.View[@content-desc="SOCKS5"]')
        const loginInput = await this.browser.$('//android.widget.EditText[@hint="Username"]')
        const passwordInput = await this.browser.$('//android.widget.EditText[@hint="Password"]')
        const startButton = await this.browser.$('//android.widget.Button[@content-desc="Start"]')
        const alertBanner = await this.browser.$('//android.widget.LinearLayout[@resource-id="android:id/title_template"]')
        const alertBannerOkButton = await this.browser.$('//android.widget.Button[@resource-id="android:id/button1"]')

        await this.browser.activateApp(APPS_INFO.superProxy.id)

        await sleep(5000)

        if (await addProxyButton.isExisting()) {
            await addProxyButton.click()
        }

        if (await serverInput.isExisting()) {
            await protocolSelect.click()

            protocol === 'http' ? await protocolSelectHttp.click() : await protocolSelectSocks5.click()

            await serverInput.click()
            await serverInput.setValue(ip)

            await portInput.click()
            await portInput.setValue(port)

            if (login && password) {
                await authenticationMethodSelect.click()
                await authenticationMethodSelectLogin.click()

                await loginInput.click()
                await loginInput.setValue(login)

                await passwordInput.click()
                await passwordInput.setValue(password)
            }

            await saveButton.click()
            await startButton.click()

            try {
                if (await alertBanner.isExisting()) {
                    await alertBannerOkButton.click()
                }
            } catch (error) { }

            console.log('Прокси установлен!')
            return true
        }

        return false
    }

    async #installTelegram(): Promise<Boolean> {
        try {
            await this.browser.installApp(APPS_INFO.telegram.appDir)
            return true
        } catch (error) {
            console.error(`Ошибка: ${error}`)
            return error
        }
    }

    async deleteTelegram(): Promise<Boolean> {
        try {
            await this.browser.removeApp(APPS_INFO.telegram.id)
            return true
        } catch (error) {
            console.error(`Ошибка: ${error}`)
            return false
        }
    }

    static launchEmulator(profileName: string) {
        const command = `${LD_CONSOLE_PATH} launch --name ${profileName}`;

        const evProcess = spawn(command, {
            shell: true,
            stdio: 'inherit',
            detached: true
        })

        return evProcess
    }

    static closeEmulator(profileName: string) {
        const command = `${LD_CONSOLE_PATH} quit --name ${profileName}`;

        exec(command)
        console.log(`Эмулятор профиля ${profileName} закрыт`)
    }
}


export { Client }