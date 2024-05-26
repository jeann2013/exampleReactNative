import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createDatabase, syncData } from './database';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        syncData();
        const fetchData = async () => {
            const db = await createDatabase();
            const myCollection = db.collections.mycollection;
            const result = await myCollection.find().exec();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <View>
            {data.map(item => (
                <Text key={item._id}>{item.name}</Text>
            ))}
        </View>
    );
};

export default App;
