import React from 'react';
import {
  Container,
  Content,
  Text,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';


export default () => (
  <Container style={styles.container}>
    <Content>
      <View style={styles.iconBox}>
        <Icon
          style={styles.icon}
          name="rocket"
        />
        <Text style={styles.welcome}>Rokket</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          block
          style={styles.button}
          onPress={() => Actions.login()}
        >
          <Text>Log in</Text>
        </Button>
        <Text style={styles.or}>OR</Text>
        <Button
          block
          style={styles.button}
          onPress={() => Actions.signup()}
        >
          <Text>Sign up</Text>
        </Button>
      </View>
    </Content>
  </Container>
)
