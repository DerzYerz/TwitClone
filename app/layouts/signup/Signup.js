import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Actions } from 'react-native-router-flux';
import {View} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import TextField from '../../components/TextField';
import styles from './styles';
import { addUser } from '../../redux/reducers/users';

const mapDispatchToProps = {addUser};

async function allowCameraRollAccess() {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Yo! Let us use your camera, bro.');
  }
}

allowCameraRollAccess();

const validate = form => {
  let errorMessage = '';
  if (form.username.includes(" ")){
    errorMessage = "Username cannot contain spaces";
  }
  if (form.password.includes(" ")){
    errorMessage = "Password cannot contain spaces";
  }
  Object.keys(form).slice(0, 5).map(field => {
    if (!form[field]){
      errorMessage = 'All fields must be filled';
    }
  })
  return errorMessage;
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      image: null,
      error: '',
    };
  }

  onSubmit(){
    const error = validate(this.state);
    if (error) {
      this.setState({ error })
    } else {
      this.checkUsername(this.state.username);
    }
  }

  checkUsername(username){
    axios.get(`https://api.cosmicjs.com/v1/345a3160-1ce7-11e9-bcae-971095d5a575/objects?pretty=true&hide_metafields=true&type=users`)
    .then(res => res.data)
    .then(data => {
      if (data.objects) {
        this.setState({ error: 'Username not available'})
      } else {
        this.props.addUser(this.state);
      }
    })
  }

  uploadImage = async () => {
    allowCameraRollAccess();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render(){
    return (
      <Container style={styles.container}>
        <Content>
          <Form style={styles.mar10}>
            <TextField
              name="First Name"
              value={this.state.firstName}
              onChangeText={(text) => this.setState({firstName: text})}
            />
            <TextField
              name="Last Name"
              value={this.state.lastName}
              onChangeText={(text) => this.setState({lastName: text})}
            />
            <TextField
              name="Username"
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}
            />
            <TextField
              secureTextEntry
              name="Password"
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
          </Form>
          <Text style={styles.addPic}>Add a profile picture</Text>
          {
           !this.state.image &&
            <Button
              primary
              bordered
              onPress={this.uploadImage}
              style={styles.uploadButton}>
              <Icon
                size={30}
                name='camera'
              />
            </Button>
          }
          {
            this.state.image &&
            <Thumbnail
              size={80}
              source={{uri: this.state.image}}
              style={styles.thumbnail}
            />
          }
          <Button
            block
            style={styles.mar10}
            onPress={() => this.onSubmit()}
          >
            <Text>Create account</Text>
          </Button>
          <Text style={styles.formMsg}>{this.state.error}</Text>
          <Button
            transparent
            style={styles.loginBtn}
            onPress={() => Actions.login()}
          >
            <Text style={styles.loginTxt}>Already have an account?</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(Signup);
