import { AppRegistry } from 'react-native';
import App from './App';
// import './src/utils/LocalStorage'
import {getStorage} from './src/utils/LocalStorage'
global.storage = getStorage();

AppRegistry.registerComponent('arun', () => App);
