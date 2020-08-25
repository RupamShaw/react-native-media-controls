/// <reference types="react" />
import { Props as MediaControlsProps } from "./MediaControls";
declare type Props = Pick<MediaControlsProps, "progress" | "duration" | "mainColor" | "onFullScreen" | "playerState" | "onSeek" | "onSeeking"> & {
    onPause: () => void;
};
declare const Slider: (props: Props) => JSX.Element;
export { Slider };
