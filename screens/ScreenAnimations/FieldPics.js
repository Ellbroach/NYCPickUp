import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window');
const height = width * 0.7;

class FieldPics extends Component {
  constructor() {
    super()
    this.images = [
      require('../../assets/images/fieldImages/PickUp1.png'),
      require('../../assets/images/fieldImages/PickUp2.png'),
      require('../../assets/images/fieldImages/PickUp3.png'),
      require('../../assets/images/fieldImages/PickUp4.png'),
      require('../../assets/images/fieldImages/PickUp5.png'),
      require('../../assets/images/fieldImages/PickUp6.png'),
      require('../../assets/images/fieldImages/PickUp7.png'),
      require('../../assets/images/fieldImages/PickUp8.png'),
      require('../../assets/images/fieldImages/PickUp9.png'),
    ]
    this.imageIndex = Math.floor(Math.random() * (this.images.length));
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visibleSwiper: true });
    }, 0);
  }

  render() {
      return <View style={styles.scrollContainer}>
                <View style={styles.singleView}>
                  <Image style={styles.image} source={this.images[this.imageIndex]}/>
                </View>
        </View>;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height,
    width
  },
  singleView: {
    paddingLeft: width*.05 ,
    paddingRight: width*.05,
    flex: 1,
  },
  imageView: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: width*.9,
    height,
    borderWidth:3,
    borderColor:'black',
    paddingRight: 10,
  },
});

export default FieldPics;


