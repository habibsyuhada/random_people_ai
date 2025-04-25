import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface AICharacter {
  name: string
  background: string
  personality: string
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: number
}

interface ChatState {
  character: AICharacter | null
  messages: Message[]
  isLoading: boolean
  error: string | null
}

const initialState: ChatState = {
  character: null,
  messages: [],
  isLoading: false,
  error: null,
}

// Generate random AI character
export const generateRandomCharacter = createAsyncThunk(
  'chat/generateRandomCharacter',
  async () => {
    // Normally we would fetch from an API, but for now we'll just return a static example
    const names = ['Aria', 'Max', 'Luna', 'Zack', 'Nova', 'Leo', 'Sofia', 'Jake']
    const backgrounds = [
      'Space explorer from the Andromeda galaxy',
      'Time traveler from the 22nd century',
      'Underwater marine biologist',
      'Former chess grandmaster',
      'Desert nomad and storyteller'
    ]
    const personalities = [
      'Curious and enthusiastic',
      'Witty and sarcastic',
      'Calm and thoughtful',
      'Energetic and dramatic',
      'Mysterious and poetic'
    ]

    return {
      name: names[Math.floor(Math.random() * names.length)],
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)]
    }
  }
)

// Send message to AI API
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, character }: { message: string, character: AICharacter }, { getState }) => {
    // In a real app, we would make an API call to Google Labs here
    // For now, we'll simulate a response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // This would be where we send to AI API with character context
    return {
      id: Date.now().toString(),
      text: `As ${character.name}, a ${character.background} who is ${character.personality}, I would respond: This is a simulated response! In a real app, this would come from the Google Labs AI API.`,
      sender: 'ai' as const,
      timestamp: Date.now()
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now().toString(),
        text: action.payload,
        sender: 'user',
        timestamp: Date.now()
      })
    },
    clearChat: (state) => {
      state.messages = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateRandomCharacter.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(generateRandomCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.character = action.payload
        // Add welcome message
        state.messages = [{
          id: Date.now().toString(),
          text: `Hi! I'm ${action.payload.name}. I'm ${action.payload.background} and I'm ${action.payload.personality}. How can I help you today?`,
          sender: 'ai',
          timestamp: Date.now()
        }]
      })
      .addCase(generateRandomCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to generate character'
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.push(action.payload)
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to send message'
      })
  }
})

export const { addUserMessage, clearChat } = chatSlice.actions
export default chatSlice.reducer 