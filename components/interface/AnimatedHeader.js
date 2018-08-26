import React, { PureComponent } from 'react';
import { Animated, View, Text, Image } from 'react-native';
import { defaultAnimationTime, lightMainBackgroundColor, mainBackgroundColor, finalAvatarDimension, HeaderStyle, screenWidth, screenHeight } from './../../assets/css/general';
import AvatarHeader from './AvatarHeader';

class AnimatedHeader extends PureComponent{

  constructor(props){
    super(props);
    this.fadeInValue = new Animated.Value(0);
    this.fadeInValueBottomText = new Animated.Value(0);
    this.avatarWidth = new Animated.Value(200);
    this.avatarHeight = new Animated.Value(200);
    this.marginTopAvatar = new Animated.Value(0);
    this.marginName = new Animated.Value(0);
    this.marginTitle = new Animated.Value(200);
    this.nameOpacity = new Animated.Value(0);
    this.titleOpacity = new Animated.Value(0);
  }

  componentDidMount(){
    this.showHideNameAndTitle(1, 10);
  }

  showHideNameAndTitle(value: number, factor: number){
    const animations = [];
    animations.push(this.fadeInNameText(value, factor));
    animations.push(this.fadeInTitleText(value, factor));
    Animated.sequence(animations).start(
      () => {
        this.textsGoToBottom();
      }
    );
  }

  textsGoToBottom(){
    const animations = [];
    animations.push(this.nameTextGoBottom());
    animations.push(this.titleTextGoBottom());
    animations.push(this.raiseAvatar());
    animations.push(this.changeScaleXAvatar());
    animations.push(this.changeScaleYAvatar());
    Animated.parallel(animations).start();
    this.showHideNameAndTitle(0, 7);
  }

  changeScaleXAvatar(){
    return Animated.timing(
      this.avatarWidth,
      {
        toValue: 80,
        duration: defaultAnimationTime * 10
      }
    );
  }

  changeScaleYAvatar(){
    return Animated.timing(
      this.avatarHeight,
      {
        toValue: 80,
        duration: defaultAnimationTime * 10
      }
    );
  }

  raiseAvatar(){
    return Animated.timing(
      this.marginTopAvatar,
      {
        toValue: -(screenHeight / 2) - 160,
        duration: defaultAnimationTime * 10
      }
    );
  }

  nameTextGoBottom(){
    return Animated.timing(
      this.marginName,
      {
        toValue: 2000,
        duration: defaultAnimationTime * 10
      }
    );
  }

  titleTextGoBottom(){
    return Animated.timing(
      this.marginTitle,
      {
        toValue: 1000,
        duration: defaultAnimationTime * 10
      }
    );
  }

  fadeInNameText(finalValue: number, factor: number){
    return Animated.timing(
      this.nameOpacity,
      {
        toValue: finalValue,
        duration: defaultAnimationTime * factor
      }
    );
  }

  fadeInTitleText(finalValue: number, factor: number){
    return Animated.timing(
      this.titleOpacity,
      {
        toValue: finalValue,
        duration: defaultAnimationTime * factor
      }
    );
  }

  render(){
    return (
      <View style={{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: lightMainBackgroundColor,
        marginTop: -20
      }}>
        <AvatarHeader opacity={1} />
        <Animated.View style={{
          position: 'absolute',
          justifyContent: 'center',
          width: screenWidth,
          height: screenHeight
        }}>
          <Animated.Image
            source={require('./../../assets/img/grs_pixel_with_circle_200.png')}
            style={{
              width: this.avatarWidth,
              height: this.avatarHeight,
              alignSelf: 'center',
              marginTop: this.marginTopAvatar
            }}
          />

          <Animated.View
            style={{
              width: screenWidth,
              height: screenHeight,
              borderRadius: 10,
              justifyContent: 'center',
              opacity: 1,
              position: 'absolute'
            }}
          >
            <Animated.View style={{marginTop: this.marginName, opacity: this.nameOpacity}}>
              <Text style={{ color: '#000000', alignSelf: 'center', fontFamily: 'CocoGothic-Bold', fontSize: 20}}>
                Gerson Montenegro
              </Text>
            </Animated.View>

            <Animated.View style={{marginTop: this.marginTitle, opacity: this.titleOpacity}}>
              <Text style={{ color: '#000000', alignSelf: 'center', fontFamily: 'CocoGothic', fontSize: 16}}>
                Mobile developer
              </Text>
            </Animated.View>
          </Animated.View>

        </Animated.View>
      </View>
    );
  }
}

export default AnimatedHeader;
