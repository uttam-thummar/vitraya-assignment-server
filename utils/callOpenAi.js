import { OpenAI } from 'openai';

const callOpenAI = async (content) => {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        let model = "gpt-4o";
        const response = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'user',
                    content
                },
            ],
            max_tokens: 2000,
        });

        return response?.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Error in callOpenAI:', error);
        throw error;
    }
}

export { callOpenAI };