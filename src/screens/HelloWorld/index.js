import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';
import {styles} from './styles';
import {
  Background,
  Button,
  Input,
  InputMask,
  InputDatePicker,
  InputDropDown,
} from '../../components/';

const tempDropDownArray = [
  {
    title: 'test 1',
  },
  {
    title: 'test 2',
  },
  {
    title: 'test 3',
  },
  {
    title: 'test 4',
  },
  {
    title: 'test 5',
  },
  {
    title: 'test 6',
  },
  {
    title: 'test 7',
  },
  {
    title: 'test 8',
  },
  {
    title: 'test 9',
  },
];

const test = () => {
  const [message, setMessage] = useState('');
  const [currency, setCurrency] = useState('');
  const [date, setDate] = useState('');
  const [dropDown, setDropDown] = useState(null);

  const baseRef = useRef();
  const inputRef = useRef();
  const inputMaskRef = useRef();

  return (
    <Background ref={baseRef}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>hello world react native!</Text>
            <Text style={styles.sectionDescription}>
              Made with an nativego template ❤️
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  baseRef.current.showAlert(
                    'Alert',
                    'Made with an nativego template ❤️',
                    'Ok',
                  );
                }}>
                show alert
              </Button>

              <Button
                style={styles.confirmButton}
                onPress={() => {
                  baseRef.current.showConfirmationAlert(
                    'Confirmation Alert',
                    'Made with an nativego template ❤️',
                  );
                }}>
                show confirmation alert
              </Button>
            </View>
            <Input
              ref={inputRef}
              label={'Input'}
              placeholder={'message'}
              value={message}
              onChangeText={(e) => setMessage(e)}
              rightIcon={'rocket'} //used the vector icon
            />

            <Button
              style={styles.confirmButton}
              onPress={() => {
                inputRef.current.setInvalidMessage(
                  'The input value is invalid',
                );
              }}>
              show error on text input
            </Button>

            <InputMask
              ref={inputMaskRef}
              label={'InputMask'}
              placeholder={'Rupees'}
              value={currency}
              onChangeText={(e) => setCurrency(e)}
            />

            <InputDatePicker
              label={'InputDatePicker'}
              placeholder={'Date'}
              value={date}
              onChangeTime={(d) => setDate(d)}
            />

            <InputDropDown
              dataSource={tempDropDownArray}
              value={dropDown}
              title={'Select An Item '}
              label={'InputDropDown'}
              dataKey={'title'}
              onSelectItem={(i) => {
                setDropDown(i);
              }}
              placeholder={'Drop Down'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default test;
