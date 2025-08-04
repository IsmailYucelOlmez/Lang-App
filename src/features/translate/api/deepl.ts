import { useQuery } from "@tanstack/react-query";
import translate from "../services/deepl";

const useTranslate = (text: string) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['translate', text],
        queryFn: () => translate(text),
        enabled: !!text,
    });

    return {data, isLoading, error};
}

export default useTranslate;



