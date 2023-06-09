import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaRegister = yup.object({
    username: yup.string().required('Informe seu Nome e Sobrenome'),
    position: yup.string().required('Informe seu cargo'),
    email: yup.string().email('E-mail Invalido').required('Informe seu e-mail'),
    enterprise: yup.string().required('Informe sua Empresa'),
    branch: yup.string().required('Informe sua Filial'),
    password: yup.string().min(6, 'Sua senha deter pelo menos 6(seis) digitos').required('Informe sua senha')
})

export default function Register() {

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schemaRegister)
    })

    function saveRegidter(data) {
        console.log(data);
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <Animatable.View animation="fadeInLeft" delay={600}style={styles.containerHeader}>
                    <Text style={styles.titleMessage}>Cadastro de Usuário</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                    
                    <Text style={styles.titleForm}>Informe Seu Nome</Text>
                    <Controller
                    control={control}
                     name='username'
                     render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput 
                         style={styles.user} 
                         placeholder='Informe nome e sobrenome'
                         onBlur={onBlur}
                         onChangeText={onChange}
                         value={value}
                        />
                     )}
                    />
                    {errors.username && <Text style={styles.labelError}>{errors.username?.message}</Text>}

                    <Text style={styles.titleForm}>Cargo</Text>
                <Controller
                 control={control}
                 name='position'
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                     style={styles.user} 
                     placeholder='informe seu cargo'
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                    />
                 )}
                />
                {errors.position && <Text style={styles.labelError}>{errors.position?.message}</Text>}

                <Text style={styles.titleForm}>E-mail</Text>
                <Controller
                 control={control}
                 name='email'
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                     style={styles.user} 
                     placeholder='informe seu e-mail'
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                    />
                 )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

                <Text style={styles.titleForm}>Empresa</Text>
                <Controller
                 control={control}
                 name='enterprise'
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                     style={styles.user} 
                     placeholder='Informe sua empresa'
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                    />
                 )}
                />
                {errors.enterprise && <Text style={styles.labelError}>{errors.enterprise?.message}</Text>}

                <Text style={styles.titleForm}>Filial</Text>
                <Controller
                 control={control}
                 name='branch'
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                     style={styles.user} 
                     placeholder='Informe sua filial'
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                    />
                 )}
                />
                {errors.branch && <Text style={styles.labelError}>{errors.branch?.message}</Text>}

                <Text style={styles.titleForm}>Senha</Text>
                <Controller
                 control={control}
                 name='password'
                 render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                     style={styles.user} 
                     placeholder='Informe uma senha'
                     secureTextEntry={true}
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                    />
                 )}
                />
                {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleSubmit(saveRegidter)}>Cadastrar</Text>
                </TouchableOpacity>

                </Animatable.View>
            </ScrollView>
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
        padding: '14%',
    },
    titleMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },
    containerForm:{
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    }, 
    titleForm: {
        fontSize: 18,
        marginTop: 28,
    },
    register: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    password: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
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
    labelError: {
        alignSelf: 'flex-start',
        color: '#FF375B',
        marginBottom: 8,
    }
});