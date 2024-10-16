import axios from 'axios';
import { type Capabilities } from "@wdio/types"
import { spawn, ChildProcess } from 'child_process'
import { remote } from 'webdriverio';

class Appium {
    private appiumProcess: ChildProcess | null = null
    private config: Capabilities.WebdriverIOConfig = {
        hostname: '127.0.0.1',
        protocol: 'http',
        port: 4723,
        path: '/wd/hub',
        logLevel: 'silent',
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
        }
    }

    launchAppium(): ChildProcess {
        const appiumCommand = `appium -a ${this.config.hostname} -p ${this.config.port} --base-path ${this.config.path}`;

        this.appiumProcess = spawn(appiumCommand, {
            shell: true,
            stdio: 'inherit',
            detached: true
        });

        this.appiumProcess.unref();

        return this.appiumProcess;
    }

    async getAppiumProcess() {
        const serverIsLaunched = await this.#checkAppiumServer()

        if (serverIsLaunched) {
            return this.appiumProcess
        }

        return this.launchAppium()
    }

    stopAppium(): void {
        if (!this.appiumProcess) {
            console.log('Сервер Appium не запущен')
            return
        }

        const taskkill = spawn('taskkill', ['/PID', `${this.appiumProcess.pid}`, '/T', '/F'], {
            shell: true
        });

        taskkill.on('close', () => {
            console.log('Appium сервер остановлен');
        });
    }

    async #checkAppiumServer(): Promise<Boolean> {
        try {
            const statusUrl = `http://${this.config.protocol}://${this.config.hostname}:${this.config.port}/${this.config.path}/status`
            const response = await axios.get(statusUrl);
            if (response.data.value.ready) {
                console.info('Appium запущен')
                return true
            }
            console.info('Appium не запущен')
            return true
        } catch (error) {
            console.error('Appium сервер не запущен или недоступен:', error.message);
            return false
        }
    }

    async getBrowser(): Promise<WebdriverIO.Browser> {
        return await remote(this.config)
    }
}

export { Appium }
