import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { addUser, removeUser } from '../redux/features/users';

export default function UsersScreen() {

    const dispatch = useDispatch();
    const list = useSelector((state) => state.users);
    const [value, setValue] = React.useState("");

    const addItem = () =>{
        if(value.length > 0){
            dispatch(addUser(value));
            setValue("");
        }else{
            alert("Campo vacio, ingresa una tarea");
        }
    };

    const removeItem = (item) => {
        dispatch(removeUser(item));
    };

    const renderItem = ({ item }) =>{
        return(
            <View style={({flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200})}>
                <Text style={styles.text}>{item}</Text>
                <Button color="red" title='Quitar' onPress={() => removeItem(item)}></Button>
            </View>
        );
    };

    console.log(list)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis tareas del dia</Text>
            <View style={styles.addElement}>
                <TextInput 
                value={value}
                placeholder='¿Cual es la tarea del dia?'
                onChangeText={(item) => setValue(item)}
                style={{
                    width:250,
                    borderBottomWidth: 1,
                    borderBottomColor: "purple"
                }}
                />

                <Button color="purple" title="Agregar" onPress={addItem}
                />
            </View>

            <Text style={styles.title}>Lista de tareas</Text>
            
            <View>
                {
                    list.length > 0 ?
                        <FlatList
                            //style={({ width: "100%" })}
                            data={list}
                            renderItem =  {renderItem}
                            keyExtractor={item => item}
                        />
                        :
                        <Text style={styles.text}>No tienes tareas pendientes</Text>
                }
            </View>

         <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        width: "100%",
        paddingTop: 50
    },

    item: {
        backgroundColor: "gray"
    },

    title: {
        fontSize: 20,
        color: "black",
        fontStyle: "italic",
        fontWeight: "bold"
    },

    addElement: {
        width: "100%",
        paddingVertical:20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },

    text: {
        fontSize: 15,
        color: "black",
        fontStyle: "italic",
        fontWeight: "bold"
    },

    boxElement: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "purple",
        backgroundColor: "white",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});