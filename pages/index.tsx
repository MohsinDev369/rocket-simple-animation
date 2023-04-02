import { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefProps } from "react-lottie";
import animationData from "./data.json";

interface RocketAnimationProps {
  isPlaying: boolean;
  onAnimationComplete: () => void;
}

function RocketAnimation({
  isPlaying,
  onAnimationComplete,
}: RocketAnimationProps) {
  const animationRef = useRef<LottieRefProps>(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current?.animation?.addEventListener(
        "complete",
        onAnimationComplete
      );
      setAnimationLoaded(true);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current?.animation?.removeEventListener(
          "complete",
          onAnimationComplete
        );
      }
    };
  }, [onAnimationComplete]);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const animationSegments = isPlaying ? [0, 89] : [0, 0];

  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
      segments={animationSegments}
      isPaused={!isPlaying}
      isStopped={!isPlaying}
      eventListeners={[
        {
          eventName: "loaded",
          callback: () => setAnimationLoaded(true),
        },
      ]}
      isClickToPauseDisabled={!animationLoaded}
      ref={animationRef}
    />
  );
}

export default function App() {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationPlaying(false);
  };

  const handleLaunchButtonClick = () => {
    setIsAnimationPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <RocketAnimation
        isPlaying={isAnimationPlaying}
        onAnimationComplete={handleAnimationComplete}
      />
      <button
        className="bg-green-500 p-3 rounded-xl"
        onClick={handleLaunchButtonClick}
      >
        {isAnimationPlaying ? "Reset" : "Launch"}
      </button>
      <p>Made By Mohsin</p>
    </div>
  );
}
