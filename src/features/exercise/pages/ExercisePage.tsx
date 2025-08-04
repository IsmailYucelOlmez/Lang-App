import GeminiSection from "../components/GeminiSection"
import AudioPlayer from "../../audio/components/AudioPlayer"
import GrammarTopics from "../components/GrammarTopics"

const ExercisePage = () => {

  const passage="Snow is falling in the mountains. The children are playing in the snow. The snow is beautiful."

  return (
    <div className="flex justify-center gap-8 mb-8">

      <div className="w-1/2 flex flex-col gap-8">
        <AudioPlayer text={passage} />
        <GeminiSection type="listening" passage={passage} placeholder="Type listened text" />
        <GeminiSection type="translate" passage={passage} placeholder="Translate text" />
        <GeminiSection type="continue" passage={passage} placeholder="Continue the text (least 5 sentences)" />
      </div>

      <div className="w-1/5">
        <GrammarTopics passage={passage} />
      </div>
      
    </div>
  )
}

export default ExercisePage
