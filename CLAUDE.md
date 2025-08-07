# Chatbot Application

## Project Overview
Next.js-based chatbot application using Google Gemini AI with domain-specific knowledge, persistent chat history, and streaming responses.

## Tech Stack
- **Frontend**: Next.js 15 (React 19)
- **AI Provider**: Google Gemini API
- **State Management**: Zustand
- **Communication**: Server-Sent Events (SSE) for streaming
- **Storage**: localStorage for chat persistence
- **Styling**: Tailwind CSS v4, Daisy UI v5

## Key Commands
- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm run typecheck`: Run TypeScript checks
- `npm test`: Run test suite
- `npm run lint`: Run ESLint

## Core Architecture

### API Endpoints
- `/api/chat/stream` - POST endpoint for streaming chat responses

### Key Data Models
```typescript
interface ChatSession {
  id: string
  title: string // Auto-generated from first message
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}
```

### Zustand Store Structure
The main store handles sessions, messages, streaming state, and errors. Key actions include:
- `createNewSession()`, `loadSession()`, `addMessage()`
- `updateStreamingMessage()`, `deleteSession()`

## Domain-Specific Behavior
- **Scope**: FAQ, About Us, Navigation, Product Information only
- **Restrictions**: Politely redirect off-topic queries
- **Tone**: Professional, helpful, concise
- **Route Knowledge**: Maintain knowledge base of available routes with descriptions

## Documentation & Resources
- Use context7 MCP server any time you need documentation for external services

## Code Style Guidelines
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (e.g., `import { foo } from 'bar'`)
- TypeScript strict mode enabled
- Prefer functional components with hooks
- Use Zustand for state management (not useState for global state)

## Security Requirements
- **API Key Protection**: Server-side only, never expose in client code
- **Input Sanitization**: Always sanitize user input
- **Rate Limiting**: Implement to prevent abuse
- **No Sensitive Data**: Keep localStorage clean of sensitive information

## Streaming Implementation
- Use Server-Sent Events (SSE) for real-time responses
- Handle streaming interruptions gracefully
- Implement proper loading states and error handling
- Allow canceling ongoing requests

## Performance Considerations
- Lazy load chat history
- Optimize re-renders during streaming
- Implement message virtualization for long conversations
- Minimize API calls and payload sizes

## Storage Schema
```typescript
interface StoredData {
  sessions: ChatSession[]
  currentSessionId: string | null
  userPreferences: {
    theme?: 'light' | 'dark'
    autoScroll: boolean
  }
}
```

## Testing Strategy
- **Unit Tests**: Zustand store actions, utility functions, component rendering
- **Integration Tests**: End-to-end chat flow, session persistence, streaming
- **User Testing**: Usability, mobile, accessibility, performance

## Accessibility Requirements
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus management
- ARIA labels for interactive elements

## Common Issues & Solutions
- **Streaming Interruptions**: Implement retry logic and graceful degradation
- **Storage Quota**: Monitor localStorage usage and implement cleanup
- **API Rate Limits**: Handle Gemini API rate limits with exponential backoff
- **Mobile Responsiveness**: Test on various screen sizes

## Development Phases
1. **Phase 1**: Core chat functionality
2. **Phase 2**: Streaming implementation
3. **Phase 3**: Domain knowledge integration
4. **Phase 4**: Polish & optimization

## Workflow Guidelines
- Always typecheck when making code changes
- Test streaming functionality thoroughly
- Verify localStorage persistence works correctly
- Ensure domain restrictions are properly enforced
- Test error handling scenarios

## Environment Setup
- Node.js version: Latest LTS
- Required environment variables: `GOOGLE_GEMINI_API_KEY`
- Development server runs on port 3000 by default
```
