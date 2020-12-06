import React from "react";
import { GestureResponderEvent, ViewStyle } from "react-native";
import { PLAYER_STATES } from "./constants/playerStates";
export declare type Props = {
    children: React.ReactNode;
    duration: number;
    fadeOutDelay?: number;
    isFullScreen: boolean;
    isLoading: boolean;
    mainColor: string;
    onFullScreen?: (event: GestureResponderEvent) => void;
    onPaused: (playerState: PLAYER_STATES) => void;
    onReplay: () => void;
    onSeek: (value: number) => void;
    onSeeking: (value: number) => void;
    playerState: PLAYER_STATES;
    progress: number;
    showOnStart?: boolean;
    toolbarStyle: ViewStyle;
    showSlider: boolean;
    isControlVisible: boolean;
};
declare const MediaControls: {
    (props: Props): JSX.Element;
    Toolbar: ({ children }: {
        children: React.ReactNode;
    }) => JSX.Element;
};
export default MediaControls;
