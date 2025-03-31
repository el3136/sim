import { BlockConfig } from "../types";
import { OpenAIIcon } from '@/components/icons';  // You can modify the icon

export const MCPBlock: BlockConfig = {
  type: "mcp",
  name: "MCP Command",
  description: "Execute a command on an MCP server",
  longDescription:
    "Send commands to an MCP server with custom arguments. Use this to interact with different MCP-compatible services.",
  category: "tools",
  bgColor: "#007bff", // Blue color to distinguish
  icon: OpenAIIcon, // You can replace this with an appropriate icon

  subBlocks: [
    {
      id: "server",
      title: "MCP Server URL",
      type: "short-input",
      layout: "full",
      placeholder: "Enter MCP server URL (e.g., http://localhost:3000/github)",
    },
    {
      id: "command",
      title: "Command",
      type: "short-input",
      layout: "full",
      placeholder: "Enter the command to execute",
    },
    {
      id: "arguments",
      title: "Arguments (JSON)",
      type: "long-input",
      layout: "full",
      placeholder: "Enter JSON-formatted arguments (optional)",
    },
    {
      id: "apiKey",
      title: "API Key",
      type: "short-input",
      layout: "full",
      placeholder: "Enter API Key (if required)",
      password: true,
    },
  ],

  tools: {
    access: ["mcp_server"],
  },

  inputs: {
    server: { type: "string", required: true },
    command: { type: "string", required: true },
    arguments: { type: "json", required: false },
    apiKey: { type: "string", required: false },
  },

  outputs: {
    response: {
      type: {json: "json"},
    },
  },
};
