import { observable, decorate } from 'mobx';

export class AppStore {
    isDarkTheme: boolean = false;
    boxTheme: string = 'LightBox';
    theme: string = 'Light';
    changeTheme = () => {
        this.isDarkTheme = !this.isDarkTheme;
        this.boxTheme = this.isDarkTheme ? 'DarkBox' : 'LightBox';
        this.theme = this.isDarkTheme ? 'Dark' : 'Light';
    }
}
decorate(AppStore, {
    isDarkTheme: observable,
    boxTheme: observable,
    theme: observable
})