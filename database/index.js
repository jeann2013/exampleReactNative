import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBReplicationCouchDBPlugin } from 'rxdb/plugins/replication-couchdb';
import NetInfo from '@react-native-community/netinfo';

addRxPlugin(RxDBReplicationCouchDBPlugin);

const createDatabase = async () => {
    const db = await createRxDatabase({
        name: 'test',
        adapter: 'asyncstorage',
    });

    const mySchema = {
        title: 'schema name',
        version: 0,
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                primary: true,
            },
            name: {
                type: 'string',
            },
            // Define otras propiedades según tus necesidades
        },
        required: ['name'],
    };

    await db.collection({
        name: 'mycollection',
        schema: mySchema,
    });

    return db;
};

const syncData = async () => {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
        const db = await createDatabase();

        const remoteURL = 'http://localhost:5984/test';
        const myCollection = db.collections.mycollection;
        const replicationState = myCollection.sync({
            remote: remoteURL,
            waitForLeadership: true,
            direction: {
                pull: true,
                push: true,
            },
            options: {
                live: true,
                retry: true,
            },
        });

        replicationState.change$.subscribe(changeEvent => {
            console.log('Change detected:', changeEvent);
        });

        replicationState.docs$.subscribe(docData => {
            console.log('Synced document:', docData);
        });
    } else {
        console.log('No internet connection');
    }
};

export { createDatabase, syncData };
