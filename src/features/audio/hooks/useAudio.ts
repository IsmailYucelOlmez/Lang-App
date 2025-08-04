import { useQuery } from "@tanstack/react-query";
import speakText from "../services/google-tts";


const useAudio = (text: string) => {
    
    const { data: audio, isLoading, error, refetch } = useQuery({
        queryKey: ['audio', text],
        queryFn: () => speakText(text),
        enabled: !!text,
        retry: (failureCount, error) => {
            // Rate limit veya API anahtarı hatası varsa tekrar deneme
            if (error?.message?.includes('rate limit') || 
                error?.message?.includes('API key') ||
                error?.message?.includes('401')) {
                return false;
            }
            return failureCount < 2; // Diğer hatalar için maksimum 2 deneme
        },
        retryDelay: 2000, // 2 saniye bekle
        staleTime: 5 * 60 * 1000, // 5 dakika cache
        gcTime: 10 * 60 * 1000, // 10 dakika garbage collection
    });

    return { audio, isLoading, error, refetch };
}

export default useAudio;