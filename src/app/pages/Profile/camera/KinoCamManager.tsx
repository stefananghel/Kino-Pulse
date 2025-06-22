import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react"
import { PoseManager } from "./types"
import { Pose } from "@mediapipe/pose"

// Define the types for the context
interface PoseManagerContextProps {
  poseManager: PoseManager | null
  setPoseManager: (manager: PoseManager | null) => void
  poseInstance: Pose | null
  playSound: (sound: Sound) => void
}

// Create the context
const PoseManagerContext = createContext<PoseManagerContextProps | null>(null)

// Define the provider with types
interface PoseManagerProviderProps {
  children: ReactNode
}

export enum Sound {
  Confirmation = "confirmation",
  Notification = "notification",
}
/**
 * PoseManagerProvider component that provides the PoseManager context to its children.
 * It initializes a MediaPipe Pose instance and makes it available via context.
 *
 * @param {PoseManagerProviderProps} props - Contains children components that will consume the context.
 *
 * @returns {JSX.Element} The PoseManagerProvider wraps the children with the PoseManager context.
 */
export const PoseManagerProvider: React.FC<PoseManagerProviderProps> = ({
  children,
}) => {
  const [poseManager, setPoseManager] = useState<PoseManager | null>(null)
  const [poseInstance, setPoseInstance] = React.useState<Pose | null>(null)

  const soundRef = useRef<HTMLAudioElement>(null)
  const soundConfirmationRef = useRef<HTMLAudioElement>(null)

  const playSound = (sound: Sound) => {
    if (sound === Sound.Confirmation) {
      soundConfirmationRef.current?.play()
    } else {
      soundRef.current?.play()
    }
  }

  /**
   * useEffect to initialize the MediaPipe Pose instance on component mount.
   * It creates a new instance of the Pose model and configures it with specified options.
   */
  useEffect(() => {
    const win = window as any
    const winPose = Pose || win.Pose
    let newPoseModel = new winPose({
      // locateFile: (file) => `assets/mediapipe/${file}`,
      locateFile: (file) => `https://resources.kino.care/scripts/libs/${file}`,
    })
    const configPose = {
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.8,
      selfieMode: false,
      enableSegmentation: false,
      smoothSegmentation: false,
    }

    newPoseModel.setOptions(configPose as any)
    setPoseInstance(newPoseModel)

    // console.warn("Pose instance created");
  }, [])

  return (
    <PoseManagerContext.Provider
      value={{
        poseManager,
        setPoseManager,
        poseInstance,
        playSound,
      }}
    >
      {/* <audio id="notifications-sound-1" ref={soundRef}>
        <source src="../Sounds/notifications-sound-1.mp3" type="audio/mpeg" />
      </audio>
      <audio id="notifications-confirmation-sound" ref={soundConfirmationRef}>
        <source src="../Sounds/confirmation-sound.mp3" type="audio/mpeg" />
      </audio>
      <audio id="notifications-sound-1">
        <source src="sounds/notifications-sound-1.mp3" type="audio/mpeg" />
      </audio>
      <audio id="notifications-sound-2">
        <source src="sounds/notifications-sound-2.mp3" type="audio/mpeg" />
      </audio>
      <audio id="notifications-sound-video-play">
        <source src="sounds/video_start.mp3" type="audio/mpeg" />
      </audio>
      <audio id="notifications-sound-video-pause">
        <source src="sounds/video_stop.mp3" type="audio/mpeg" />
      </audio> */}

      {children}
    </PoseManagerContext.Provider>
  )
}

/**
 * Custom hook to consume the PoseManager context.
 * Provides access to the current PoseManager instance, its setter, and the MediaPipe Pose instance.
 *
 * @returns {PoseManagerContextProps} - Returns the PoseManager instance, setter function, and Pose instance.
 *
 * @throws an error if used outside of a PoseManagerProvider.
 */
export const usePoseManager = (): PoseManagerContextProps => {
  const context = useContext(PoseManagerContext)
  if (!context) {
    throw new Error("usePoseManager must be used within a PoseManagerProvider")
  }
  return context
}
