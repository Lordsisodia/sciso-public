export interface ClaudeExecutionRequest {
  prompt: string;
  allowedTools: string[];
  outputFormat?: 'json' | 'text';
  maxTokens?: number;
  temperature?: number;
  dangerouslySkipPermissions?: boolean;
  onProgress?: (progress: number, log: string) => void;
  onOutput?: (output: string) => void;
  onError?: (error: string) => void;
}

export interface ClaudeExecutionResult {
  success: boolean;
  output: any;
  tokenUsage: number;
  executionTimeMs: number;
  logs: string[];
  error?: string;
}

export interface ClaudeProcess {
  id: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  logs: string[];
  request: ClaudeExecutionRequest;
}

export class ClaudeCodeIntegration {
  private activeProcesses: Map<string, ClaudeProcess> = new Map();
  private isClientEnvironment = typeof window !== 'undefined';

  constructor() {
    if (this.isClientEnvironment) {
      console.log('🌐 Claude Code Integration initialized in browser mode');
    }
  }

  /**
   * Execute a task with Claude Code (Browser-safe mock implementation)
   */
  async executeTask(request: ClaudeExecutionRequest): Promise<ClaudeExecutionResult> {
    const startTime = Date.now();
    const processId = crypto.randomUUID();
    
    if (this.isClientEnvironment) {
      return this.mockExecuteTask(request, processId, startTime);
    }

    // In a real implementation, this would communicate with a backend service
    // that handles the actual Claude Code process spawning
    throw new Error('Claude Code execution not available in browser environment. Please implement backend service integration.');
  }

  /**
   * Mock execution for browser environment
   */
  private async mockExecuteTask(
    request: ClaudeExecutionRequest, 
    processId: string, 
    startTime: number
  ): Promise<ClaudeExecutionResult> {
    const logs: string[] = [];
    
    const claudeProcess: ClaudeProcess = {
      id: processId,
      status: 'running',
      startTime: new Date(),
      logs: [],
      request
    };

    this.activeProcesses.set(processId, claudeProcess);

    return new Promise((resolve) => {
      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        logs.push(`Progress: ${progress}%`);
        claudeProcess.logs.push(`Progress update: ${progress}%`);
        
        request.onProgress?.(progress, `Processing... ${progress}%`);
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          
          // Simulate completion
          const executionTimeMs = Date.now() - startTime;
          claudeProcess.endTime = new Date();
          claudeProcess.status = 'completed';
          
          const mockOutput = this.generateMockOutput(request);
          const result: ClaudeExecutionResult = {
            success: true,
            output: mockOutput,
            tokenUsage: this.estimateTokenUsage(request.prompt, mockOutput),
            executionTimeMs,
            logs
          };
          
          logs.push(`✅ Mock Claude execution completed in ${executionTimeMs}ms`);
          request.onProgress?.(100, 'Task completed successfully');
          
          resolve(result);
        }
      }, 200); // Progress updates every 200ms
    });
  }

  /**
   * Generate mock output based on request
   */
  private generateMockOutput(request: ClaudeExecutionRequest): any {
    const prompt = request.prompt.toLowerCase();
    
    if (request.outputFormat === 'json') {
      if (prompt.includes('analyze') || prompt.includes('report')) {
        return {
          analysis: 'Mock analysis completed',
          findings: ['Finding 1', 'Finding 2', 'Finding 3'],
          recommendations: ['Recommendation 1', 'Recommendation 2'],
          confidence: 0.85
        };
      } else if (prompt.includes('generate') || prompt.includes('create')) {
        return {
          generated: 'Mock content generated',
          type: 'mock',
          items: ['Item 1', 'Item 2', 'Item 3'],
          metadata: { createdAt: new Date().toISOString() }
        };
      } else {
        return {
          result: 'Mock operation completed',
          status: 'success',
          details: 'This is a mock response for browser environment'
        };
      }
    }
    
    // Text output
    if (prompt.includes('analyze')) {
      return `Mock Analysis Result:
      
Analysis completed successfully. This is a mock response generated in the browser environment.

Key Findings:
- Mock finding 1: The system is operating normally
- Mock finding 2: No critical issues detected
- Mock finding 3: Performance metrics are within acceptable ranges

Recommendations:
- Continue monitoring system health
- Consider implementing additional safeguards
- Regular maintenance schedule recommended

This analysis was generated using a mock Claude Code integration for browser compatibility.`;
    }
    
    return `Mock Claude Code Response:

Your request has been processed successfully in the browser environment.

Original request: "${request.prompt}"

This is a simulated response. In a production environment, this would:
1. Execute actual Claude Code processes
2. Provide real-time feedback
3. Return genuine AI-generated content

For full functionality, integrate with a backend service that can spawn Claude Code processes.`;
  }

  /**
   * Estimate token usage for mock responses
   */
  private estimateTokenUsage(prompt: string, output: any): number {
    const promptTokens = Math.ceil(prompt.length / 4);
    const outputTokens = Math.ceil(JSON.stringify(output).length / 4);
    return promptTokens + outputTokens;
  }

  /**
   * Stop a running Claude process
   */
  async stopProcess(processId: string): Promise<void> {
    const claudeProcess = this.activeProcesses.get(processId);
    if (claudeProcess && claudeProcess.status === 'running') {
      claudeProcess.status = 'cancelled';
      claudeProcess.endTime = new Date();
      
      console.log(`🛑 Stopped Claude process ${processId}`);
    }
  }

  /**
   * Get status of all active processes
   */
  getActiveProcesses(): ClaudeProcess[] {
    return Array.from(this.activeProcesses.values());
  }

  /**
   * Get specific process by ID
   */
  getProcess(processId: string): ClaudeProcess | undefined {
    return this.activeProcesses.get(processId);
  }

  /**
   * Test Claude Code installation (Browser-safe version)
   */
  async testInstallation(): Promise<{ installed: boolean; version?: string; error?: string }> {
    if (this.isClientEnvironment) {
      return {
        installed: true,
        version: 'Mock v1.0.0 (Browser Mode)',
        error: undefined
      };
    }
    
    // In a real implementation, this would check the backend service availability
    return {
      installed: false,
      error: 'Browser environment - backend service integration required'
    };
  }

  /**
   * Get Claude Code configuration (Browser-safe version)
   */
  async getConfiguration(): Promise<any> {
    if (this.isClientEnvironment) {
      return {
        mode: 'browser-mock',
        version: '1.0.0',
        capabilities: [
          'mock-execution',
          'progress-tracking',
          'process-management'
        ],
        limitations: [
          'No actual Claude Code execution',
          'Simulated responses only',
          'Requires backend integration for production'
        ]
      };
    }
    
    return null;
  }

  /**
   * Validate Claude Code setup (Browser-safe version)
   */
  async validateSetup(): Promise<{
    claudeInstalled: boolean;
    apiKeyConfigured: boolean;
    mcpServersAvailable: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];
    
    if (this.isClientEnvironment) {
      issues.push('Running in browser mode - limited functionality');
      issues.push('Backend service integration required for full Claude Code support');
    }
    
    // Check for environment variables (they might be available in import.meta.env)
    const hasApiKey = !!(import.meta.env.VITE_ANTHROPIC_API_KEY);
    if (!hasApiKey) {
      issues.push('VITE_ANTHROPIC_API_KEY environment variable not set');
    }
    
    return {
      claudeInstalled: this.isClientEnvironment, // Mock installation in browser
      apiKeyConfigured: hasApiKey,
      mcpServersAvailable: false, // Not available in browser
      issues
    };
  }

  /**
   * Generate automation prompt templates
   */
  generatePromptTemplate(category: string, task: string): string {
    const templates: Record<string, string> = {
      development: `As a senior developer, please help me with the following development task:

${task}

Please:
1. Analyze the current codebase structure
2. Implement the requested changes following best practices
3. Ensure proper TypeScript typing
4. Add appropriate error handling
5. Update relevant documentation
6. Run tests to verify the changes

Use dark theme styling with Tailwind CSS and maintain consistency with the existing SISO design system.`,

      testing: `As a QA engineer, please help me create comprehensive tests for:

${task}

Please:
1. Analyze the code that needs testing
2. Create unit tests covering edge cases
3. Add integration tests if applicable
4. Ensure good test coverage
5. Follow testing best practices
6. Document test scenarios

Use Jest/Vitest and React Testing Library where applicable.`,

      deployment: `As a DevOps engineer, please help me with deployment:

${task}

Please:
1. Check current deployment configuration
2. Implement the requested deployment changes
3. Ensure proper environment variable management
4. Verify security best practices
5. Test the deployment process
6. Document any changes made

Consider containerization and CI/CD best practices.`,

      analysis: `As a data analyst, please analyze:

${task}

Please:
1. Examine the relevant data/code
2. Identify patterns and insights
3. Generate comprehensive analysis
4. Provide actionable recommendations
5. Create visualizations if helpful
6. Document findings clearly

Focus on performance, usage patterns, and optimization opportunities.`,

      maintenance: `As a system maintainer, please perform maintenance on:

${task}

Please:
1. Assess current system state
2. Identify maintenance needs
3. Perform necessary cleanup/updates
4. Optimize performance where possible
5. Update dependencies safely
6. Document maintenance performed

Prioritize system stability and backward compatibility.`
    };

    return templates[category] || `Please help me with: ${task}`;
  }

  /**
   * Clean up old processes (browser-safe)
   */
  private startCleanupInterval(): void {
    if (this.isClientEnvironment) {
      // Clean up completed processes every 5 minutes
      setInterval(() => {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
        
        this.activeProcesses.forEach((process, id) => {
          if (process.endTime && process.endTime < fiveMinutesAgo) {
            this.activeProcesses.delete(id);
          }
        });
      }, 5 * 60 * 1000);
    }
  }
}