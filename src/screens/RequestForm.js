import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Picker,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import config from '../config';
import endpoint from '../config/endpoint'
import scale from '../config/scale';
import {textStyles} from '../config/styles';
import TextInput from '../components/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialState = {
  judulRequest: '',
  tipeRequest: 'Perizinan',
  alasan: '',
  isSubmitting: false,
  isSuccess: false,
};

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  onChangeText_judulRequest = text => {
    this.setState({judulRequest: text});
  };

  onChangeText_alasan = text => {
    this.setState({alasan: text});
  };

  submittingData = async () => {
    const {
      judulRequest, 
      tipeRequest, 
      alasan
    } = this.state;

    const data = {
      judulRequest, 
      tipeRequest, 
      alasan
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const url = `${config.api}${endpoint.submit}`;
    const requestBody = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      timeout: 500,
    };

    const result = await fetch(url, requestBody)
      .then(response => response.json())
      .then(responseJson => {
        return (
          responseJson.status === 200 &&
          responseJson.message === 'Success created'
        );
      })
      .catch(error => {
        console.error(error);
        return false;
      });

    if (result) {
      Alert.alert('Pemberitahuan', 'Data berhasil dikirim.');
      this.setState({
        ...initialState,
        isSubmitting: false,
        isSuccess: true,
      });
    } else {
      Alert.alert('Pemberitahuan', 'Data gagal dikirim.');
      this.setState({
        isSubmitting: false,
        isSuccess: false,
      });
    }
  };

  onSubmit = () => {
    this.setState({isSubmitting: true}, () => this.submittingData());
  };

  _renderSubmitButton = () => {
    const {isSubmitting} = this.state;

    return (
      <TouchableOpacity
        disabled={isSubmitting}
        style={styles.saveButton}
        onPress={() => this.onSubmit()}>
        {isSubmitting ? (
          <ActivityIndicator
            color={config.color.common.white}
            size={config.fontSize.xlarge}
          />
        ) : (
          <Text style={styles.saveButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {judulRequest, tipeRequest, alasan} = this.state;
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={config.color.background}
        />
        <View style={styles.mainContainer}>
          <View style={styles.centeredContent}>
          <Icon name="rocket" size={50} color={config.color.common.darkRed} />
            <Text style={styles.text}>Request Form</Text>
          </View>

          <TextInput
            placeholder={'Judul Request'}
            onChangeText={text => this.onChangeText_judulRequest(text)}
            value={judulRequest}
          />

          <View style={styles.lokasi}>
            <Text style={{flex: 1}}>Tipe Request</Text>
            <Picker
              // mode={'dropdown'}
              selectedValue={tipeRequest}
              style={{flex: 3, height: 50}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({tipeRequest: itemValue})
              }>
              <Picker.Item label="Perizinan" value="Perizinan" />
              <Picker.Item label="Pengajuan" value="Pengajuan" />
              <Picker.Item label="Lain-lain" value="Lain-lain" />
            </Picker>
          </View>

          <TextInput
            placeholder={'Alasan'}
            onChangeText={text => this.onChangeText_alasan(text)}
            value={alasan}
          />

          {this._renderSubmitButton()}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: scale(30),
    backgroundColor: config.color.background,
  },
  lokasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(6),
  },
  centeredContent: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...textStyles.main,
    fontSize: config.fontSize.xlarge,
    marginTop: scale(8),
    marginBottom: scale(32),
  },
  saveButton: {
    // borderRadius: scale(16),
    backgroundColor: config.color.common.darkRed,
    padding: scale(12),
    margin: scale(5),
    marginTop: scale(32),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: config.fontSize.medium,
    textAlign: 'center',
  },
});
