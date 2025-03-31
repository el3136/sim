import { ToolConfig, ToolResponse } from '../types';

interface ChatbotParams {
  userMessage: string;
  contextData?: string;  // Context for the chatbot to remember
  apiKey: string;
}

interface ChatbotResponse extends ToolResponse {
  output: {
    response: string;  // The AI's response
  };
}

export const ChatbotTool: ToolConfig<ChatbotParams, ChatbotResponse> = {
  id: 'chatbot_tool',
  name: 'Chatbot Tool',
  description: 'Sends a message to the AI chatbot and retrieves a response.',
  version: '1.0.0',

  params: {
    userMessage: {
      type: 'string',
      required: true,
      description: 'Message to send to the chatbot',
    },
    contextData: {
      type: 'string',
      required: false,
      description: 'Additional context for the chatbot to understand the conversation better',
    },
    apiKey: {
      type: 'string',
      required: true,
      description: 'API key for authenticating the request with LLM',
    },
  },

  request: {
    method: 'POST',
    url: () => 'https://api.openrouter.ai/v1/chat/completions', // LLM API endpoint
    headers: (params) => ({
      Authorization: `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json',
    }),
    body: (params) => ({
      messages: [
        { role: 'system', content: `Context: ${params.contextData || ''}` },
        { role: 'user', content: params.userMessage },
      ],
      model: 'meta-llama/llama-3.3-70b-instruct:free', // Or any model you want to use
    }),
  },

  transformResponse: async (response: Response) => {
    const data = await response.json();
    // Log the trace after receiving the response
    console.log('Trace: Received response from OpenRouter API');
    return {
      success: true,
      output: { response: data.choices[0].message.content },
    };
  },

  transformError: (error) => {
    // Log errors as well
    console.error('Trace: Error occurred in OpenRouter API call:', error);
    return error.message || 'An error occurred while processing the LLM chatbot request';
  },
};
