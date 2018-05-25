import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';
// import * as firebase from 'firebase';
import MapView, { Callout } from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';



export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startingPoint: {
        latitude: 40.7285722,
        longitude: -73.9978633,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      fields: [
        {
          name: "Pier 40",
          location: { latitude: 40.740657, longitude: -74.010687 }
        },
        {
          name: "Prospect Park",
          location: { latitude: 40.665535, longitude: -73.969749 }
        },
        {
          name: "East River Park Field",
          location: { latitude: 40.7122, longitude: -73.9769 }
        },
        {
          name: "Sarah D. Roosevelt Park",
          location: { latitude: 40.719258, longitude: -73.99278 }
        },
        {
          name: "Bushwick Inlet Park",
          location: { latitude: 40.7223, longitude: -73.9613 }
        }
      ]
    }
  }

  navigateToField(markerInfo){
    const markerImage = markerInfo.image
    this.props.navigation.navigate('Field', markerInfo);
  }

  render() {
    // var userId = firebase.auth().currentUser.uid;
    return (
      <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        showsMyLocationButton
        initialRegion={this.state.startingPoint}
      >{
        this.state.fields.map(marker => (
          <MapView.Marker
          key={marker.name}
            coordinate = {{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude
            }}
            title={marker.name}
            image={require('../assets/images/soccerBall.png')}
            >
            <MapView.Callout>
              <Text style={styles.markerText}>{marker.name}</Text>
              <Button
              title = 'Take me to the field!'
              onPress = {() => this.navigateToField(marker)} />
            </MapView.Callout>
            </MapView.Marker>
        ))
      }
      </MapView>
      </View>
    );
  }
  }

const styles = StyleSheet.create({
  markerText: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
