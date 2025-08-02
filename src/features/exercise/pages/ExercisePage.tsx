import GeminiSection from "../components/GeminiSection"
import AudioPlayer from "../../audio/components/AudioPlayer"

const ExercisePage = () => {
  return (
    <div>
      <AudioPlayer text="Hello, how are you?" />
      <GeminiSection text="Hello, how are you?" />
      <GeminiSection text="What is the capital of France?" />
      <GeminiSection text="What is the capital of Turkey?" />
    </div>
  )
}

export default ExercisePage
