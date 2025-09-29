import { createOpenRouter } from '@openrouter/ai-sdk-provider';


export const openRouterConfig = createOpenRouter({    
  apiKey: import.meta.env.VITE_OPEN_ROUTER,
});


