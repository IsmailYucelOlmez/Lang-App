const speakText = async (text: string) => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_TTS_API_KEY;

    if (!apiKey) {
      throw new Error('VITE_GOOGLE_TTS_API_KEY environment variable is not set');
    }

    // Metin uzunluğunu sınırla (Google TTS limit: ~5000 karakter)
    const maxLength = 4000;
    const truncatedText = text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: truncatedText
          },
          voice: {
            languageCode: 'en-US',
            name: 'en-US-Standard-A', // Kadın sesi
            ssmlGender: 'FEMALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0,
            volumeGainDb: 0.0
          }
        })
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API rate limit aşıldı. Lütfen birkaç dakika bekleyin.');
      } else if (response.status === 401) {
        throw new Error('Geçersiz API anahtarı. Lütfen API anahtarınızı kontrol edin.');
      } else if (response.status === 400) {
        throw new Error('Geçersiz istek. Metin çok uzun olabilir.');
      } else {
        throw new Error(`API Hatası: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    if (!data.audioContent) {
      throw new Error('Ses içeriği alınamadı');
    }

    // Base64'ten Blob'a çevir
    const audioData = atob(data.audioContent);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: 'audio/mp3' });
  } catch (error) {
    console.error("Error speaking text:", error);
    if (error instanceof Error) {
      throw new Error(`Google TTS Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while generating audio');
  }
};

export default speakText; 