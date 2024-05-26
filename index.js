/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { addRxPlugin } from 'rxdb/plugins/core';
import { RxDBReplicationCouchDBPlugin } from 'rxdb/plugins/replication-couchdb';


addRxPlugin(RxDBReplicationCouchDBPlugin);

AppRegistry.registerComponent(appName, () => App);
