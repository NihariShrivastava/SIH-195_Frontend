import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";

// --- Theme Constants (from previous components) ---
const ACCENT_COLOR = "#34d399"; // Vibrant Green
const ACCENT_HOVER_COLOR = "#10b981"; // Darker Green on hover
const TEXT_MUTED = "#9ca3af"; // Gray text for subtitles/descriptions
const MAIN_BG_COLOR = "#000000"; // Deep Black
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; // Very dark, slight transparent background

const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;
// const BUTTON_GLOW_SHADOW = `0 0 15px rgba(16, 185, 129, 0.5)`;

// Mock DashboardLayout placeholder
const DashboardLayout = ({ children }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: MAIN_BG_COLOR, color: "white", p: { xs: 2, sm: 4 } }}>
    {children}
  </Box>
);

// --- Mock Data Dependencies (Simplified) ---
const searchKnowledgeArticles = (query) => {
    const lowerQuery = query.toLowerCase();
    const articles = [
        { title: "Troubleshooting Common VPN Errors", category: "Network", views: 345, helpful: 89, keywords: ["vpn", "error"] },
        { title: "Self-Service Password Reset Guide", category: "Account", views: 567, helpful: 95, keywords: ["password", "reset", "forgot"] },
        { title: "Requesting New Software Access", category: "Software", views: 122, helpful: 70, keywords: ["software", "request", "install"] },
    ];
    return articles.filter(a => a.keywords.some(k => lowerQuery.includes(k)) || a.title.toLowerCase().includes(lowerQuery));
};

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI IT Support Assistant. I can help you with password resets, VPN issues, software installations, and more. How can I assist you today?",
      timestamp: new Date(),
      suggestions: ["Reset my password", "VPN not connecting", "Request software installation", "Printer issues"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- AI Response Logic (kept as is) ---
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Password reset
    if (lowerMessage.includes("password") && (lowerMessage.includes("reset") || lowerMessage.includes("forgot"))) {
      return "I can help you reset your password right away! Here's what you need to do:\n\n1. Go to the self-service portal at portal.powergrid.com\n2. Click 'Forgot Password'\n3. Enter your employee ID\n4. Answer your security questions\n5. Create a new password\n\nYour new password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.\n\nWould you like me to create a ticket for manual password reset instead?"
    }

    // VPN issues
    if (lowerMessage.includes("vpn")) {
      return "I see you're having VPN connection issues. Let me help troubleshoot:\n\n**Quick Fixes:**\n1. Check your internet connection\n2. Update your VPN client to the latest version\n3. Restart your computer\n4. Verify your credentials\n\n**For Error 809:**\n- Check firewall settings\n- Ensure VPN service is running\n- Try connecting from a different network\n\nIf the issue persists, I can create a high-priority ticket for our Network team. Would you like me to do that?"
    }

    // Software installation
    if (lowerMessage.includes("software") || lowerMessage.includes("install") || lowerMessage.includes("application")) {
      return "I can help you request software installation. To proceed, I'll need:\n\n1. Software name and version\n2. Business justification\n3. Manager approval (if required)\n\n**Typical Timeline:**\n- Standard software: 2-3 business days\n- Licensed software: 5-7 business days\n\nWould you like me to create a software installation ticket for you?"
    }

    // Printer issues
    if (lowerMessage.includes("printer") || lowerMessage.includes("print")) {
      return "Let's troubleshoot your printer issue:\n\n**Common Solutions:**\n1. Check if printer is powered on and connected\n2. Clear any paper jams\n3. Restart the printer\n4. Check printer queue on your computer\n5. Reinstall printer drivers\n\nWhich printer are you having issues with? I can create a ticket for our Hardware team if needed."
    }

    // Network issues
    if (lowerMessage.includes("network") || lowerMessage.includes("internet") || lowerMessage.includes("wifi")) {
      return "I understand you're experiencing network connectivity issues. Here's what to try:\n\n1. Restart your router/modem\n2. Check if others are affected (building-wide issue?)\n3. Forget and reconnect to WiFi network\n4. Run network diagnostics\n\nIf this is affecting multiple people or a conference room, I should create an urgent ticket. What's your location?"
    }

    // Email issues
    if (lowerMessage.includes("email") || lowerMessage.includes("outlook")) {
      return "I can help with email issues. Common problems and solutions:\n\n**Cannot Send/Receive:**\n- Check internet connection\n- Verify email settings\n- Clear email cache\n\n**Storage Full:**\n- Archive old emails\n- Empty deleted items\n- Request storage increase\n\nWhat specific email issue are you experiencing?"
    }

    // Access requests
    if (lowerMessage.includes("access") || lowerMessage.includes("permission")) {
      return "For access requests, I'll need to create a ticket with:\n\n1. System/application name\n2. Type of access needed\n3. Business justification\n4. Manager approval\n\nAccess requests typically take 1-2 business days for approval and provisioning. Shall I create this ticket for you?"
    }

    // Create ticket
    if (lowerMessage.includes("create ticket") || lowerMessage.includes("raise ticket")) {
      return "I'll help you create a ticket. Please provide:\n\n1. Brief description of the issue\n2. Priority (Low/Medium/High/Urgent)\n3. Any error messages or screenshots\n\nYou can also use the 'Create New Ticket' option from the My Tickets page for more detailed submissions."
    }

    // Knowledge base search
    const kbResults = searchKnowledgeArticles(userMessage);
    if (kbResults.length > 0) {
      const articles = kbResults.slice(0, 2);
      return `I found some helpful articles that might answer your question:\n\n${articles.map((a) => `**${a.title}**\nCategory: ${a.category}\nViews: ${a.views} | Helpful: ${a.helpful}\n`).join("\n")}\n\nWould you like me to provide more details or create a ticket for personalized assistance?`
    }

    // Default response
    return (
      "I understand you need help with: " +
      userMessage +
      "\n\nI can assist with:\n- Password resets\n- VPN troubleshooting\n- Software installations\n- Hardware issues\n- Network problems\n- Email support\n- Access requests\n\nCould you provide more details about your issue, or would you like me to create a ticket for specialized support?"
    );
  };

  // --- Send Handler ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSend(); // Auto-send the suggestion as a message
  };

  // --- MUI Component Styles ---

  const chatCardStyle = {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...{ // Apply card theme styles
        borderRadius: 3,
        background: DARK_CARD_COLOR,
        border: '1px solid rgba(52, 211, 153, 0.2)',
        boxShadow: CARD_GLOW_SHADOW
    },
  };

  const messageBoxStyle = {
    maxWidth: '80%',
    px: 2,
    py: 1.5,
    borderRadius: 2,
    whiteSpace: 'pre-wrap', // Respects newlines in mock AI responses
    lineHeight: 1.5,
    fontSize: 14,
  };
  
  const assistantMessageStyle = {
    ...messageBoxStyle,
    bgcolor: 'rgba(52, 211, 153, 0.15)', // Light green tint
    color: 'white',
    border: '1px solid rgba(52, 211, 153, 0.3)',
    alignSelf: 'flex-start',
  };
  
  const userMessageStyle = {
    ...messageBoxStyle,
    bgcolor: ACCENT_COLOR, // Solid green
    color: 'black',
    alignSelf: 'flex-end',
    fontWeight: 'medium',
  };

  const inputAreaStyle = {
    borderTop: '1px solid rgba(52, 211, 153, 0.2)',
    p: 2,
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  };

  const sendButtonStyle = {
    bgcolor: ACCENT_COLOR,
    color: 'black',
    minWidth: 50, // Slightly wider for better UX
    width: 50,
    height: 50,
    borderRadius: 2, // Squared button
    '&:hover': {
        bgcolor: ACCENT_HOVER_COLOR,
    },
    '&.Mui-disabled': {
        bgcolor: 'rgba(52, 211, 153, 0.4)',
        color: '#333'
    }
  };

  const themedInputStyle = {
    '& .MuiInputBase-input': {
      color: 'white',
      fontSize: 16, // Slightly larger font in chat input
      py: 1.5,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: 50, // Set height to match button
      '& fieldset': {
        borderColor: 'rgba(52, 211, 153, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: ACCENT_COLOR,
      },
      '&.Mui-focused fieldset': {
        borderColor: ACCENT_COLOR,
      },
    },
  };

  return (
    <DashboardLayout>
      {/* Centered Content Container */}
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 0, height: 'calc(100vh - 12rem)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box sx={{ width: 40, height: 40, bgcolor: 'rgba(52, 211, 153, 0.1)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot style={{ color: ACCENT_COLOR }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold">AI Support Assistant</Typography>
              <Typography variant="body2" sx={{ color: TEXT_MUTED }}>Instant help for common IT issues</Typography>
            </Box>
          </Box>
        </Box>

        {/* Chat Messages Card */}
        <Card sx={chatCardStyle}>
          
          {/* Messages Container */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {messages.map((message) => (
              <Box key={message.id} sx={{ display: 'flex', flexDirection: message.role === "user" ? 'row-reverse' : 'row', gap: 2, alignItems: 'flex-start' }}>
                
                {/* Avatar */}
                <Box sx={{ 
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    bgcolor: message.role === "assistant" ? 'rgba(52, 211, 153, 0.1)' : ACCENT_COLOR,
                    color: message.role === "assistant" ? ACCENT_COLOR : 'black',
                }}>
                  {message.role === "assistant" ? <Bot size={18} /> : <Typography variant="button">U</Typography>}
                </Box>
                
                {/* Content */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  
                  {/* Message Bubble */}
                  <Paper elevation={0} sx={message.role === "assistant" ? assistantMessageStyle : userMessageStyle}>
                    <Typography variant="body2">{message.content}</Typography>
                  </Paper>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {message.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outlined"
                          size="small"
                          onClick={() => handleSuggestionClick(suggestion)}
                          sx={{ 
                            color: ACCENT_COLOR, 
                            borderColor: ACCENT_COLOR, 
                            fontSize: 12, 
                            py: 0.5,
                            px: 1,
                            borderRadius: 2,
                            bgcolor: 'rgba(52, 211, 153, 0.05)',
                            '&:hover': {
                                borderColor: ACCENT_HOVER_COLOR,
                                bgcolor: 'rgba(52, 211, 153, 0.1)',
                            }
                          }}
                          startIcon={<Sparkles size={12} />}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </Box>
                  )}
                  
                  {/* Timestamp */}
                  <Typography variant="caption" sx={{ color: TEXT_MUTED, mt: 0.5 }}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
              </Box>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                <Box sx={{ width: 32, height: 32, bgcolor: 'rgba(52, 211, 153, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={18} style={{ color: ACCENT_COLOR }} />
                </Box>
                <Paper elevation={0} sx={{ bgcolor: 'rgba(52, 211, 153, 0.15)', px: 2, py: 1.5, borderRadius: 2 }}>
                  <CircularProgress size={18} sx={{ color: TEXT_MUTED }} />
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={inputAreaStyle}>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', flex: 1, gap: 16 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your IT issue..."
                disabled={isLoading}
                sx={themedInputStyle}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} sx={sendButtonStyle}>
                <Send size={18} />
              </Button>
            </form>
            <Typography variant="caption" sx={{ color: TEXT_MUTED, position: 'absolute', bottom: 8, left: 24 }}>
              AI can make mistakes. For critical issues, please create a ticket.
            </Typography>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
}