import { streamText } from 'ai';
import { openRouterConfig } from '../config/open-router';

export default {
    async generateRecipe(prompt: string){
        const response = streamText({
            model: openRouterConfig("x-ai/grok-4-fast:free"),
            prompt: prompt
        });

        return response.textStream;
    }
}