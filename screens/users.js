import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { addUser, removeUser } from '../redux/features/users';

export default function UsersScreen() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.users);
    const [value, setValue] = React.useState("");

    const addItem = () => {
        if (value.length > 0) {
            dispatch(addUser(value));
            setValue("");
        } else {
            alert("Campo vacío, ingresa una tarea");
        }
    };

    const removeItem = (item) => {
        dispatch(removeUser(item));
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.boxElement}>
                <Text style={styles.text}>{item}</Text>
                <Button color="#14DE04" title='Completar' onPress={() => removeItem(item)}></Button>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
            <Text style={styles.supTitle}>Mis tareas del día</Text>
            </View>

            <View style={styles.overlayContainer}>

                <View style={styles.contentContainer}>
                    <View style={styles.addElement}>
                        <TextInput
                            value={value}
                            placeholder='¿Cuál es la tarea del día?'
                            onChangeText={(item) => setValue(item)}
                            style={{
                                width: 250,
                                borderBottomWidth: 1,
                                borderBottomColor: "purple"
                            }}
                        />
                        <Button color="#54B9FC" title="Agregar" onPress={addItem} />
                    </View>

                    <Text style={styles.title}>Lista de tareas</Text>

                    {list.length > 0 ? (
                        <FlatList
                            data={list}
                            renderItem={renderItem}
                            keyExtractor={item => item}
                        />
                    ) : (
                        <Text style={styles.text}>No tienes tareas pendientes</Text>
                    )}
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    supTitle: {
        fontSize: 20,
        color: "black",
        fontStyle: "italic",
        fontWeight: "bold",
        padding: 50,
        left: 50,
        //textAlign: 'center',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
    },

    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '200%',
        backgroundColor: '#9263EA', 
        
    },

    overlayContainer: {
        flex: 0,
        height: '98%',
        width: '90%',
        backgroundColor: 'white', 
        borderRadius: 15, 
        overflow: 'hidden',
    },

    contentContainer: {
        padding: 20,
    },

    title: {
        fontSize: 20,
        color: "black",
        fontStyle: "italic",
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center', 
        
        
    },

    addElement: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20,
    },

    text: {
        fontSize: 15,
        color: "black",
        fontStyle: "italic",
        fontWeight: "bold",
    },

    boxElement: {
        borderBottomWidth: 1,
        borderBottomColor: "purple",
        backgroundColor: "white",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
