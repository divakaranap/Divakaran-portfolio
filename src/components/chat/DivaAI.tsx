import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  X,
  RotateCcw,
} from 'lucide-react'
import { chatbotResponses } from '../../data/portfolio'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
}

const formatCurrentTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const quickQuestions = [
  'Tell me about projects',
  'What are your skills?',
  'Internship experience',
  'Contact info',
]

export const DivaAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am DIVA AI, your intelligent portfolio guide. Ask me anything about Divakaran's skills, projects, experience, or achievements!",
      timestamp: formatCurrentTime(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    }
  }, [isOpen, messages, isTyping])

  // Rule-based keyword parser
  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase().trim()

    if (
      q.includes('name') ||
      q.includes('who are you') ||
      q.includes('creator') ||
      q.includes('about') ||
      q.includes('who is') ||
      q.includes('divakaran')
    ) {
      return chatbotResponses.name
    }

    if (
      q.includes('education') ||
      q.includes('college') ||
      q.includes('degree') ||
      q.includes('cgpa') ||
      q.includes('gpa') ||
      q.includes('university') ||
      q.includes('study') ||
      q.includes('batch') ||
      q.includes('vel tech')
    ) {
      return chatbotResponses.education
    }

    if (
      q.includes('skill') ||
      q.includes('skills') ||
      q.includes('technologies') ||
      q.includes('tech') ||
      q.includes('stack') ||
      q.includes('python') ||
      q.includes('tools') ||
      q.includes('languages') ||
      q.includes('framework')
    ) {
      return chatbotResponses.skills
    }

    if (
      q.includes('project') ||
      q.includes('projects') ||
      q.includes('build') ||
      q.includes('work') ||
      q.includes('insider') ||
      q.includes('threat') ||
      q.includes('lexi') ||
      q.includes('rag') ||
      q.includes('undo') ||
      q.includes('app')
    ) {
      return chatbotResponses.projects
    }

    if (
      q.includes('experience') ||
      q.includes('intern') ||
      q.includes('internship') ||
      q.includes('company') ||
      q.includes('hyundai') ||
      q.includes('nsic') ||
      q.includes('work experience')
    ) {
      return chatbotResponses.experience
    }

    if (
      q.includes('achievement') ||
      q.includes('achievements') ||
      q.includes('award') ||
      q.includes('awards') ||
      q.includes('hackathon') ||
      q.includes('ambassador') ||
      q.includes('neurax') ||
      q.includes('honor')
    ) {
      return chatbotResponses.achievements
    }

    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('reach') ||
      q.includes('hire') ||
      q.includes('call') ||
      q.includes('touch') ||
      q.includes('message') ||
      q.includes('connect') ||
      q.includes('social') ||
      q.includes('linkedin') ||
      q.includes('github')
    ) {
      return chatbotResponses.contact
    }

    if (
      q.includes('resume') ||
      q.includes('cv') ||
      q.includes('curriculum') ||
      q.includes('pdf') ||
      q.includes('download')
    ) {
      return `You can download Divakaran's official ATS-optimized resume directly from the Resume section, or access it at /assets/resume/Divakaran_AP_Resume.pdf. It highlights his 8.41 CGPA, 2 industrial internships, and 12+ AI/ML projects!`
    }

    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey') ||
      q.includes('greetings')
    ) {
      return `Hello! How can I assist you with Divakaran's portfolio today? Feel free to ask about his AI/ML projects, technical skills, or industrial internships.`
    }

    return chatbotResponses.default
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim()
    if (!text || isTyping) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: formatCurrentTime(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    // Simulate 1s thinking delay
    setTimeout(() => {
      const botResponseText = getBotResponse(text)
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: formatCurrentTime(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hello! I am DIVA AI, your intelligent portfolio guide. Ask me anything about Divakaran's skills, projects, experience, or achievements!",
        timestamp: formatCurrentTime(),
      },
    ])
    setIsTyping(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9990,
          background: 'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
          color: '#000',
          border: 'none',
          borderRadius: '50px',
          padding: '0.85rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.9rem',
          letterSpacing: '0.06em',
          boxShadow: '0 0 25px rgba(0, 212, 255, 0.45)',
          transition: 'box-shadow var(--transition-base)',
        }}
      >
        <span
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? <X size={20} /> : <Bot size={20} />}
          {!isOpen && (
            <span
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 6px #10B981',
              }}
            />
          )}
        </span>
        <span>{isOpen ? 'CLOSE' : 'DIVA AI'}</span>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '84px',
              right: '24px',
              width: 'min(380px, calc(100vw - 32px))',
              height: '520px',
              maxHeight: 'calc(100vh - 120px)',
              zIndex: 9991,
              background: 'rgba(12, 12, 20, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 212, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(0, 212, 255, 0.15)',
                    border: '1px solid var(--color-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-blue)',
                    boxShadow: '0 0 14px rgba(0, 212, 255, 0.3)',
                  }}
                >
                  <Bot size={20} />
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      DIVA AI
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#10B981',
                        background: 'rgba(16, 185, 129, 0.15)',
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#10B981',
                          display: 'inline-block',
                          boxShadow: '0 0 6px #10B981',
                        }}
                      />
                      ONLINE
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.2,
                      marginTop: '1px',
                    }}
                  >
                    Your portfolio assistant
                  </div>
                </div>
              </div>

              {/* Action buttons in header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: isUser ? 'var(--gradient-blue)' : 'rgba(255, 255, 255, 0.06)',
                        color: isUser ? '#000000' : 'var(--color-text-primary)',
                        border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: isUser ? 'none' : 'blur(10px)',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        fontWeight: isUser ? 600 : 400,
                        boxShadow: isUser ? '0 4px 14px rgba(0, 212, 255, 0.25)' : 'none',
                        wordBreak: 'break-word',
                      }}
                    >
                      {msg.text}
                    </div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.25rem',
                        padding: '0 0.25rem',
                      }}
                    >
                      {msg.timestamp}
                    </span>
                  </motion.div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.65rem 1rem',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-blue)',
                      animation: 'pulse-glow 1s infinite alternate',
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-blue)',
                      animation: 'pulse-glow 1s infinite alternate 0.2s',
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-blue)',
                      animation: 'pulse-glow 1s infinite alternate 0.4s',
                    }}
                  />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div
              style={{
                padding: '0.5rem 0.85rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                  style={{
                    whiteSpace: 'nowrap',
                    background: 'rgba(0, 212, 255, 0.07)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    color: 'var(--color-text-secondary)',
                    borderRadius: '12px',
                    padding: '0.3rem 0.65rem',
                    fontSize: '0.72rem',
                    cursor: isTyping ? 'not-allowed' : 'pointer',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isTyping) {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.18)'
                      e.currentTarget.style.color = '#fff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.07)'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(18, 18, 28, 0.8)',
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem 0.65rem',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, experience..."
                  disabled={isTyping}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    padding: '0.35rem 0',
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  title="Send message"
                  style={{
                    background: inputMessage.trim() && !isTyping ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.1)',
                    color: inputMessage.trim() && !isTyping ? '#000' : 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DivaAI
