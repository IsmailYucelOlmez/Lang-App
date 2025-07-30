
const translate = async (text: string) => {
    const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
    
    if (!apiKey) {
        throw new Error('VITE_DEEPL_API_KEY is not set');
    }

    try { 
        const response = await fetch(`/api/deepl`, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: [text],
                target_lang: 'TR',
                source_lang: 'EN'
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to translate text: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Translation error:', error);
        return null;
    }
}

export default translate;