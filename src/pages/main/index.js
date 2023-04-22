import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";


export default function Main() {
    const DATA = [
        { id: '1', title: 'Gerar OS', nagation: 'ServiceOrdens' },
        { id: '2', title: 'Opção 2', nagation: '' },
        { id: '3', title: 'Opção 3', nagation: '' },
        { id: '4', title: 'Opção 4', nagation: '' },
    ]
    
    const Item = ({ title, onPress }) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
    
    const renderItem = ({ item }) => (
        <Item title={item.title} onPress={() => navigation.navigate(item.nagation)} />
    );

    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500}style={styles.containerHeader}>
                <Text style={styles.titleMessage}>Bem vindo User</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInLeft" style={styles.containerForm}>
                <Text style={styles.title}>Opções do Sistema</Text>
                <FlatList style={styles.list}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                />
            
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#33CCFF',
    },
    containerHeader: {
        marginBottom: '14%',
        paddingStart: '5%',
        marginBottom: '8%',
    },
    containerForm:{
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    }, 
    button: {
        backgroundColor: '#33CCFF',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#33CCFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexBasis: '43%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
    },
    list: {
        marginTop: '30%',
        marginRight: '3%'
    },
    titleMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
