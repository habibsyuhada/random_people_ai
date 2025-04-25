import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { addUserMessage, sendMessage, generateRandomCharacter, Message } from '@/store/chatSlice'
import type { AICharacter } from '@/store/chatSlice'

const ChatUI = () => {
  const dispatch = useDispatch()
  const { character, messages, isLoading } = useSelector((state: RootState) => state.chat)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate a random character when the component mounts
  useEffect(() => {
    if (!character) {
      dispatch(generateRandomCharacter())
    }
  }, [dispatch, character])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !character) return

    // Add user message to state
    dispatch(addUserMessage(input))
    
    // Send to AI and get response
    dispatch(sendMessage({ message: input, character: character as AICharacter }))
    
    // Clear input
    setInput('')
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-screen bg-base-200">
      {/* Character info */}
      {character && (
        <div className="bg-primary text-primary-content p-4">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-sm opacity-90">{character.background}</p>
          <p className="text-xs opacity-75">Personality: {character.personality}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg: Message) => (
          <div 
            key={msg.id} 
            className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-header">
              {msg.sender === 'user' ? 'You' : character?.name}
              <time className="text-xs opacity-50 ml-1">{formatTime(msg.timestamp)}</time>
            </div>
            <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-bubble chat-bubble-secondary">
              <span className="loading loading-dots loading-md"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message here..."
            className="input input-bordered flex-grow"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <span className="loading loading-spinner"></span> : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatUI 