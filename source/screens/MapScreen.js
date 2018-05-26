import React from 'react';
import * as firebase from 'firebase';
import {View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component{
    renderMarkers(){
        return this.props.places.map((place, i) => (
            <Marker key={i} title={place.name} coordinate={place.coords}/>
        ))
    }

    render(){
        const { fields } = this.props
        return(
            <MapView
            style={styles.mapContainer}
            field = {field}
            showsUserLocation
            showsMyLocationButton
            >
            {this.renderMarkers()}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
      width: '100%',
      height: '80%'
    }
  })