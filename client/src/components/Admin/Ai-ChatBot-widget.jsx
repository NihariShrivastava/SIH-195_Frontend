import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import {
  MessageSquare as Message,
  Send,
  Sparkles,
  Minimize,
  Maximize,
  X as Close,
} from "lucide-react";

const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your POWERGRID AI Assistant. I can help you with password resets, VPN issues, software installations, and more. How can I assist you today?",
    timestamp: new Date(),
    quickActions: [
      { label: "Reset Password", action: "password-reset" },
      { label: "VPN Issues", action: "vpn-help" },
      { label: "Software Request", action: "software-request" },
    ],
  },
];

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes("password") || lower.includes("reset")) {
      return "I can help you reset your password right away. I've sent a password reset link to your registered email address. Please check your inbox and follow the instructions. The link will expire in 1 hour.";
    } else if (lower.includes("vpn")) {
      return "For VPN connection issues, please try these steps:\n1. Check your internet connection\n2. Verify VPN client is updated to the latest version\n3. Restart the VPN service\n4. If the issue persists, I'll create a ticket for our network team.";
    } else if (lower.includes("software") || lower.includes("install")) {
      return "I can help you request software installation. Please provide:\n1. Software name and version\n2. Your workstation ID\n3. Business justification\n\nI'll create a ticket and route it to the appropriate team.";
    }
    return "I understand your query. Let me create a ticket for you and assign it to the appropriate team. You'll receive updates via email and can track the progress in your dashboard.";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(inputValue), timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const map = {
      "password-reset": "I need to reset my password",
      "vpn-help": "I'm having VPN connection issues",
      "software-request": "I need to request software installation",
    };
    setInputValue(map[action] || "");
  };

  if (!isOpen)
    return (
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          width: 56,
          height: 56,
          borderRadius: "50%",
          boxShadow: 3,
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        <Message />
      </IconButton>
    );

  return (
    <Card
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        width: isMinimized ? 320 : 384,
        height: isMinimized ? 64 : 600,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1f2937",
        color: "#f9fafb",
        boxShadow: 6,
      }}
    >
      {/* Header */}
      <CardHeader
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #374151",
          p: 1.5,
        }}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              <Sparkles sx={{ fontSize: 16 }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">AI Assistant</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "#4ade80",
                    borderRadius: "50%",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <Typography variant="caption" color="#9ca3af">
                  Online
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        action={
          <Box>
            <IconButton onClick={() => setIsMinimized(!isMinimized)} sx={{ color: "#9ca3af" }}>
              {isMinimized ? <Maximize /> : <Minimize />}
            </IconButton>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: "#9ca3af" }}>
              <Close />
            </IconButton>
          </Box>
        }
      />

      {/* Content */}
      {!isMinimized && (
        <>
          <CardContent
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && (
                  <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                    <Sparkles sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "75%",
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: msg.role === "user" ? "primary.main" : "#374151",
                    color: msg.role === "user" ? "primary.contrastText" : "#f9fafb",
                    whiteSpace: "pre-line",
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                  {msg.quickActions && (
                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {msg.quickActions.map((action) => (
                        <Button
                          key={action.action}
                          size="small"
                          variant="outlined"
                          onClick={() => handleQuickAction(action.action)}
                          sx={{ textTransform: "none", borderColor: "#374151", color: "#f9fafb" }}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </Box>
                  )}
                  <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.6 }}>
                    {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
                {msg.role === "user" && (
                  <Avatar sx={{ bgcolor: "#4b5563", width: 32, height: 32, fontSize: 12 }}>You</Avatar>
                )}
              </Box>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <Box display="flex" gap={1.5}>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                  <Sparkles sx={{ fontSize: 16 }} />
                </Avatar>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: "#374151",
                    display: "flex",
                    gap: 0.5,
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#9ca3af",
                        animation: `bounce 1s infinite ${i * 0.2}s`,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <Box sx={{ borderTop: "1px solid #374151", p: 2, display: "flex", gap: 1 }}>
            <TextField
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                bgcolor: "#1f2937",
                borderColor: "#374151",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
                "& input": { color: "#f9fafb" },
              }}
            />
            <IconButton onClick={handleSendMessage} sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}>
              <Send sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </>
      )}
    </Card>
  );
}
