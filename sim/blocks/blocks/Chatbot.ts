import { OpenAIIcon } from '@/components/icons';  // You can modify the icon based on LLM
import { BlockConfig } from '../types';

// type OutputType = "string" | { string: "string" };

export const ChatbotBlock: BlockConfig = {
  type: 'chatbot',
  name: 'AI Chatbot',
  description: 'Chat with an AI model',
  longDescription:
    'Send a message to the AI chatbot and get a response. This block also allows you to provide additional context for the chatbot.',
  category: 'tools',
  bgColor: '#28a745',  // You can use a custom color
  icon: OpenAIIcon,    // You can create or modify the icon as per requirement

  subBlocks: [
    {
      id: 'userMessage',
      title: 'User Message',
      type: 'long-input',
      layout: 'full',
      placeholder: 'Enter your message to the AI chatbot',
    },
    {
      id: 'contextData',
      title: 'Context Data',
      type: 'long-input',
      layout: 'full',
      placeholder: 'Enter context or past conversation...',
    },
    {
      id: 'apiKey',
      title: 'API Key',
      type: 'short-input',
      layout: 'full',
      placeholder: 'Enter your LLM API key',
      password: true,
    },
  ],

  tools: {
    access: ['chatbot_tool'],
  },

  inputs: {
    userMessage: { type: 'string', required: true },
    contextData: { type: 'string', required: false },
    apiKey: { type: 'string', required: true },
  },

  outputs: {
    response: {
      // type: "string",              // expected outcome
      type: { string: "string" }, // does not work
    },
  },
};
