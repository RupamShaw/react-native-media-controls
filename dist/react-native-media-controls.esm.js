import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Image, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import RNSlider from 'react-native-slider';

var containerBackgroundColor = "transparent";
var playButtonBorderColor = "rgba(255,255,255,0.5)";
var white = "#fff";
var styles = /*#__PURE__*/StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center"
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20
  },
  playButton: {
    alignItems: "center",
    borderColor: playButtonBorderColor,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 50,
    justifyContent: "center",
    width: 50
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22
  },
  progressColumnContainer: {
    flex: 1
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -25
  },
  progressSlider: {
    alignSelf: "stretch"
  },
  replayIcon: {
    height: 20,
    resizeMode: "stretch",
    width: 25
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 50,
    borderWidth: 3,
    height: 20,
    width: 20
  },
  timeRow: {
    alignSelf: "stretch"
  },
  timerLabel: {
    color: white,
    fontSize: 12
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  track: {
    borderRadius: 1,
    height: 5
  }
});

var PLAYER_STATES;

(function (PLAYER_STATES) {
  PLAYER_STATES[PLAYER_STATES["PLAYING"] = 0] = "PLAYING";
  PLAYER_STATES[PLAYER_STATES["PAUSED"] = 1] = "PAUSED";
  PLAYER_STATES[PLAYER_STATES["ENDED"] = 2] = "ENDED";
})(PLAYER_STATES || (PLAYER_STATES = {}));

var humanizeVideoDuration = function humanizeVideoDuration(seconds) {
  var _ref = seconds >= 3600 ? [11, 8] : [14, 5],
      begin = _ref[0],
      end = _ref[1];

  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(begin, end);
};
var getPlayerStateIcon = function getPlayerStateIcon(playerState) {
  switch (playerState) {
    case PLAYER_STATES.PAUSED:
      return require("./assets/ic_play.png");

    case PLAYER_STATES.PLAYING:
      return require("./assets/ic_pause.png");

    case PLAYER_STATES.ENDED:
      return require("./assets/ic_replay.png");

    default:
      return null;
  }
};

var Controls = function Controls(props) {
  var isLoading = props.isLoading,
      mainColor = props.mainColor,
      playerState = props.playerState,
      onReplay = props.onReplay,
      onPause = props.onPause;
  var icon = getPlayerStateIcon(playerState);
  var pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
  var content = isLoading ? React.createElement(ActivityIndicator, {
    size: "large",
    color: "#FFF"
  }) : React.createElement(TouchableOpacity, {
    style: [styles.playButton, {
      backgroundColor: mainColor
    }],
    onPress: pressAction
  }, React.createElement(Image, {
    source: icon,
    style: styles.playIcon
  }));
  return React.createElement(View, {
    style: [styles.controlsRow]
  }, content);
};

var fullScreenImage = /*#__PURE__*/require("./assets/ic_fullscreen.png");

var Slider = function Slider(props) {
  var duration = props.duration,
      mainColor = props.mainColor,
      onFullScreen = props.onFullScreen,
      onPause = props.onPause,
      progress = props.progress; // const {
  //   // containerStyle = {},
  //   trackStyle: customTrackStyle = {},
  //   thumbStyle: customThumbStyle = {},
  // } = customSliderStyle;

  var dragging = function dragging(value) {
    var onSeeking = props.onSeeking,
        playerState = props.playerState;
    onSeeking(value);

    if (playerState === PLAYER_STATES.PAUSED) {
      return;
    }

    onPause();
  };

  var seekVideo = function seekVideo(value) {
    props.onSeek(value);
    onPause();
  };

  return React.createElement(View, {
    style: [styles.controlsRow, styles.progressContainer]
  }, React.createElement(View, {
    style: styles.progressColumnContainer
  }, React.createElement(View, {
    style: [styles.timerLabelsContainer]
  }, React.createElement(Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(progress)), React.createElement(Text, {
    style: styles.timerLabel
  }, humanizeVideoDuration(duration))), React.createElement(RNSlider, {
    style: [styles.progressSlider],
    onValueChange: dragging,
    onSlidingComplete: seekVideo,
    maximumValue: Math.floor(duration),
    value: Math.floor(progress),
    // trackStyle={[styles.track, customTrackStyle]}
    trackStyle: styles.track,
    //  customThumbStyle,
    thumbStyle: [styles.thumb, {
      borderColor: mainColor
    }],
    minimumTrackTintColor: mainColor
  })), Boolean(onFullScreen) && React.createElement(TouchableOpacity, {
    style: styles.fullScreenContainer,
    onPress: onFullScreen
  }, React.createElement(Image, {
    source: fullScreenImage
  })));
};

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children;
  return React.createElement(React.Fragment, null, children);
};

var MediaControls = function MediaControls(props) {
  var children = props.children,
      duration = props.duration,
      _props$isLoading = props.isLoading,
      isLoading = _props$isLoading === void 0 ? false : _props$isLoading,
      _props$mainColor = props.mainColor,
      mainColor = _props$mainColor === void 0 ? "rgba(12, 83, 175, 0.9)" : _props$mainColor,
      onFullScreen = props.onFullScreen,
      onReplayCallback = props.onReplay,
      onSeek = props.onSeek,
      onSeeking = props.onSeeking,
      playerState = props.playerState,
      progress = props.progress,
      _props$showOnStart = props.showOnStart,
      showOnStart = _props$showOnStart === void 0 ? true : _props$showOnStart,
      _props$toolbarStyle = props.toolbarStyle,
      customToolbarStyle = _props$toolbarStyle === void 0 ? {} : _props$toolbarStyle,
      showSlider = props.showSlider,
      _props$isControlVisib = props.isControlVisible,
      isControlVisible = _props$isControlVisib === void 0 ? true : _props$isControlVisib;

  var _ref = function () {
    if (showOnStart) {
      return {
        initialOpacity: 1,
        initialIsVisible: true
      };
    }

    return {
      initialOpacity: 0,
      initialIsVisible: false
    };
  }(),
      initialOpacity = _ref.initialOpacity,
      initialIsVisible = _ref.initialIsVisible;

  var _useState = useState(new Animated.Value(initialOpacity)),
      opacity = _useState[0];

  var _useState2 = useState(initialIsVisible),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1]; // const fadeOutControls = (delay = 0) => {
  //   Animated.timing(opacity, {
  //     toValue: 0,
  //     duration: 300,
  //     delay,
  //     useNativeDriver: false,
  //   }).start(result => {
  //     /* I noticed that the callback is called twice, when it is invoked and when it completely finished
  //     This prevents some flickering */
  //     if (result.finished) {
  //       setIsVisible(false);
  //     }
  //   });
  // };


  React.useEffect(function () {
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []); // const fadeInControls = (loop = true) => {
  //   setIsVisible(true);
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 300,
  //     delay: 0,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     if (loop) {
  //       fadeOutControls(fadeOutDelay);
  //     }
  //   });
  // };

  var onReplay = function onReplay() {
    // fadeOutControls(fadeOutDelay);
    onReplayCallback();
  };

  var cancelAnimation = function cancelAnimation() {
    return opacity.stopAnimation(function () {
      return setIsVisible(true);
    });
  };

  var onPause = function onPause() {
    var playerState = props.playerState,
        onPaused = props.onPaused;
    var PLAYING = PLAYER_STATES.PLAYING,
        PAUSED = PLAYER_STATES.PAUSED;

    switch (playerState) {
      case PLAYING:
        {
          cancelAnimation();
          break;
        }
    }

    var newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  var toggleControls = function toggleControls() {// Alert.alert("message", "hi" )
    // value is the last value of the animation when stop animation was called.
    // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
    // opacity.stopAnimation((value: number) => {
    //   setIsVisible(!!value);
    //   return value ? fadeOutControls() : fadeInControls();
    // });
  };

  return React.createElement(TouchableWithoutFeedback, {
    onPress: toggleControls
  }, React.createElement(Animated.View, {
    style: [styles.container, {
      opacity: opacity
    }]
  }, isVisible && React.createElement(View, {
    style: [styles.container]
  }, React.createElement(View, {
    style: [styles.controlsRow, styles.toolbarRow, customToolbarStyle]
  }, children), isControlVisible && React.createElement(Controls, {
    onPause: onPause,
    onReplay: onReplay,
    isLoading: isLoading,
    mainColor: mainColor,
    playerState: playerState
  }), showSlider && React.createElement(Slider, {
    progress: progress,
    duration: duration,
    mainColor: mainColor,
    onFullScreen: onFullScreen,
    playerState: playerState,
    onSeek: onSeek,
    onSeeking: onSeeking,
    onPause: onPause
  }))));
};

MediaControls.Toolbar = Toolbar;

export default MediaControls;
export { PLAYER_STATES };
//# sourceMappingURL=react-native-media-controls.esm.js.map
