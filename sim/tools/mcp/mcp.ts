import { ToolConfig, ToolResponse } from "../types";

interface McpParams {
  server: string;
  command: string;
  arguments?: Record<string, any>;
  apiKey?: string;
}

export const mcpTool: ToolConfig<McpParams> = {
  id: "mcp_server",
  name: "MCP Server",
  description: "Send commands to an MCP server with custom arguments",
  version: "1.0",

  params: {
    server: { type: "string", required: true, description: "MCP Server URL (e.g., http://localhost:3000/github)" },
    command: { type: "string", required: true, description: "Command to execute on the MCP server" },
    arguments: { type: "json", required: false, description: "Arguments for the command (JSON format)" },
    apiKey: { type: "string", required: false, description: "API Key for authentication (if needed)" },
  },

  request: {
    method: "POST",
    url: (params) => params.server,
    headers: (params) => ({
      "Content-Type": "application/json",
      ...(params.apiKey && { Authorization: `Bearer ${params.apiKey}` }), // Add API Key if provided
    }),
    body: (params) => ({
      command: params.command,
      arguments: params.arguments || {},
    }),
  },

  transformResponse: async (response: Response): Promise<ToolResponse> => {
    const data = await response.json();
    return {
      success: true,
      output: data,
    };
  },

  transformError: (error) => `MCP command execution failed: ${error.message}`,
};
