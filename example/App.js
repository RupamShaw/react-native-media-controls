// @ts-check
/** @type {import("./react-native-media-controls/index")} */

import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import MediaControls, {
  PLAYER_STATES,
} from "./react-native-media-controls/react-native-media-controls.esm";

const noop = () => {};
const fadeOutDelay = 2000;
const App = () => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showSlider, setShowSlider] = useState(true);

  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
// let timer=undefined
  const onSeek = seek => {
    // setShowSlider(true);
    // setTimeout(() => {
    //   setShowSlider(false);
    // }, fadeOutDelay);
    videoPlayer?.current.seek(seek);
  };

  const onPaused = playerState => {
    // clearTimer()
    setPaused(!paused);
    setPlayerState(playerState);
    // setShowSlider(true)
    // startTimer()
  };

  const onProgress = data => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };
  
  // const startTimer = () => { 
  //   timer = setTimeout(() => { 
  //     setShowSlider(false)
  //   }, fadeOutDelay)
  // }

  // const showSliderOnTap = () => { 
  //   // clearTimer()
  //   // setShowSlider(true)
  //   startTimer()
  // }

// const clearTimer = () =>{
//     // Handle an undefined timer rather than null
//     // eslint-disable-next-line no-unused-expressions
//     timer !== undefined ? clearTimeout(timer) : null
//   }
  
  const onMedia = () => {
    // Alert.alert("onMedia", " onMediaMessage");
    // setShowSlider(true);
    // setTimeout(() => {
    //   setShowSlider(false);
    // }, fadeOutDelay);

    if (playerState === PLAYER_STATES.ENDED) {
    
      return onReplay();
    }

    onPaused(paused ? 1 : 0);
    setPlayerState(paused ? 0 : 1);
  };

  const onReplay = () => {
    // clearTimer()
    setPlayerState(PLAYER_STATES.PLAYING);

    // setShowSlider(true)
    // startTimer()
    videoPlayer?.current.seek(0);

  };

  const onSeeking = currentTime => setCurrentTime(currentTime);
  // console.log("showSlider", showSlider);
  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={ref => (videoPlayer.current = ref)}
        resizeMode="cover"
        source={{
          uri:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        repeat
        style={styles.mediaPlayer}
        volume={0.0}
      />
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 20,
          backgroundColor: "yellow",
        }}
      >
        <Button
          color="#841584"
          title={
            // eslint-disable-next-line no-nested-ternary
            playerState === 2
              ? "ios-refresh"
              : paused
              ? "ios-play"
              : "ios-pause"
          }
          // underlayColor="rgba(76,146,202,1)"
          onPress={onMedia}
        />
      </View>
      <View
        style={{
          // flex:1,
          // borderColor: "red",
          // borderWidth: 1,
          justifyContent: "flex-start",
          marginTop: 0,
          paddingTop: 100,
          paddingVertical: 0,
          paddingBottom: 100,
          marginBottom: 100,
          backgroundColor: "transparent",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{backgroundColor: "transparent", height: 40}}
          activeOpacity={1}
          // onPress={showSliderOnTap}
          >
        <MediaControls
          isControlVisible={false}
          isFullScreen={isFullScreen}
          duration={duration}
          isLoading={isLoading}
          mainColor="orange"
          onFullScreen={noop}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
            progress={currentTime}
            showOnStart
          showSlider //={showSlider}
            // fadeOutDelay={fadeOutDelay}
            
        >
          {/* <MediaControls.Toolbar>
            <View style={styles.toolbar}>
              <Text>I'm a custom toolbar </Text>
            </View>
          </MediaControls.Toolbar> */}
          </MediaControls>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  bkgnd: {
    //   flex: 1,
    position: "absolute",
    // height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    // bottom: 540 - 570,
    bottom: -70,
    //  bottom: 0,
    // right: -30,
    backgroundColor: "black",
    width: "100%",
    // marginTop: 0,
    zIndex: -2,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
  },
});

export default App;
