export async function handler(event, context) {
    const API_KEY = process.env.HUGGINGFACE_API_KEY;

    try {
        const user_input = JSON.parse(event.body).text;

        const response = await fetch("https://api-inference.huggingface.co/models/google/gemma-2-2b-it", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: user_input,
                parameters: {
                    max_tokens: 100,
                    temperature: 0.2,
                    top_p: 0.9,
                    repetition_penalty: 1.2
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}