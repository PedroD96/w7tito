import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, ScrollView  } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import * as yup from "yup";
import { useRef, useState } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars'
import Swiper from 'react-native-swiper';

const schemaRegister = yup.object({
    username: yup.string().required('Informe seu Nome e Sobrenome'),
    position: yup.string().required('Informe seu cargo'),
    email: yup.string().email('E-mail Invalido').required('Informe seu e-mail'),
    enterprise: yup.string().required('Informe sua Empresa'),
    branch: yup.string().required('Informe sua Filial'),
    password: yup.string().min(6, 'Sua senha deter pelo menos 6(seis) digitos').required('Informe sua senha')
})

export default function ServiceOrdens() {

    const [file, setFile] = useState(null);

    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        setFile(result.uri);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('Cancelado');
        } else {
          console.log('Erro: ', err);
          throw err;
        }
      }
    };

    
    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schemaRegister)
    })

    function saveRegidter(data) {
        console.log(data);
    }

    
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 20);

    function onDateSelect(date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
    const formatDate = (date) => {
        if (!date) {
          return '';
        }
      
        const day = date.getDate();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      };
    const swiperRef = useRef(null);
    const navigation = useNavigation();
    return(
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
            <Animatable.View animation="fadeInLeft" delay={500}style={styles.containerHeader}>
                <Text style={styles.titleMessage}>Gerando Ordem de Serviço</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.titleForm}>Ordem de Serviço (OS)</Text>
                <Controller
                    control={control}
                    name='ordemDeServico'
                    render={({ field: {onChange, value} }) => (
                        <TextInput
                            style={styles.user}
                            onChangeText={onChange}
                            value={Math.random().toString().substr(2, 5)}
                            editable={false}
                        />
                    )}
                />

                <Text style={styles.titleForm}>Usuário</Text>
                <Controller
                    control={control}
                    name='nomeUsuario'
                    render={({ field: {onChange, value} }) => (
                        <TextInput
                            style={styles.user}
                            onChangeText={onChange}
                            placeholder={'Usuario puxar automatico'}
                            editable={false}
                        />
                    )}
                />

                <Text style={styles.titleForm}>Previsão de Entrega</Text>
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                    <Text style={styles.input}>{formatDate(selectedDate)}</Text>
                </TouchableOpacity>
                <Controller
                  control={control}
                  name='previsaoDeEntrega'
                  defaultValue={{ value: selectedDate }}
                  render={({ field: { onChange, value } }) => (
                    <Modal visible={showCalendar} onRequestClose={() => setShowCalendar(false)} transparent={true}>
                      <View style={[styles.calendarContainer]}>
                        <Calendar
                          onDayPress={(day) => {
                            onDateSelect(new Date(day.dateString));
                            setShowCalendar(false);
                          }}
                          markedDates={{ [selectedDate.toISOString().slice(0, 10)]: { selected: true } }}
                          minDate={new Date()}
                          maxDate={maxDate}
                        />
                      </View>
                    </Modal>
                  )}
                />

                <Text style={styles.titleForm}>Loja de Atendimento</Text>
                <Controller
                    control={control}
                    name='lojaAtendimento'
                    render={({ field: {onChange, value} }) => (
                        <TextInput
                            style={styles.user}
                            onChangeText={onChange}
                            placeholder={'Escreva o nome da loja'}
                            editable={true}
                        />
                    )}
                />

                <Text style={styles.titleForm}>Categorias</Text>
                <Controller
                    control={control}
                    name='categoria'
                    render={({ field: {onChange, value} }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={value}
                                onValueChange={onChange}
                            >
                                <Picker.Item label="Selecione a categoria" value="" />
                                <Picker.Item label="Categoria 1" value="categoria1" />
                                <Picker.Item label="Categoria 2" value="categoria2" />
                                <Picker.Item label="Categoria 3" value="categoria3" />
                            </Picker>
                        </View>
                    )}
                />

                <Text style={styles.titleForm}>Nivel de Urgencia</Text>
                <Controller
                    control={control}
                    name='nivelUrgencia'
                    render={({ field: {onChange, value} }) => (
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={value}
                                onValueChange={onChange}
                            >
                                <Picker.Item label="Selecione a categoria" value="" />
                                <Picker.Item label="Categoria 1" value="categoria1" />
                                <Picker.Item label="Categoria 2" value="categoria2" />
                                <Picker.Item label="Categoria 3" value="categoria3" />
                            </Picker>
                        </View>
                    )}
                />

                <Text style={styles.titleForm}>Descrição</Text>
                <Controller
                    control={control}
                    name='descricao'
                    render={({ field: {onChange, value} }) => (
                        <TextInput
                            style={[styles.user, styles.descricao]}
                            onChangeText={onChange}
                            value={value}
                            editable={true}
                            multiline={true}
                            textAlignVertical="top"
                        />
                    )}
                />
                <Text style={styles.titleForm}>Anexe uma imagem</Text>
                <Controller
                    control={control}
                    name='anexo'
                    render={({ field: {onChange, value} }) => (
                        <View>
                          <TouchableOpacity onPress={pickDocument}>
                            <Text style={styles.anexo}>+ Anexe uma imagem aqui</Text>
                                {file && <Text>File URI: {file}</Text>}
                          </TouchableOpacity>
                        </View>

                    )}
                />
                <TouchableOpacity style={styles.button} onPress={() => setShowCalendar(true)}>
                        <Text style={styles.txtButton}>Enviar</Text>
                </TouchableOpacity>
            </Animatable.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
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
    titleMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    titleForm: {
        fontSize: 18,
        marginTop: 28,
        fontSize: 17,
        fontWeight: 'bold',
    },
    calendarModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    width: '90%',
    maxHeight: '80%',
    marginTop: '80%', 
    marginLeft:'5%',
    justifyContent: 'center',
    },
    button: {
        backgroundColor: '#33CCFF',
        width: '95%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '10%',
        marginLeft: '2.5%',
    },
    txtButton:{
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'gray',
        overflow: 'hidden',
      },
    picker: {
        flex: 1,
        height: 50,
    },
    anexo:{
        color:'#006400',
        fontWeight: 'bold',
    },
    descricao: {
        height: 100,
        borderWidth: 0.2,
    },
})
