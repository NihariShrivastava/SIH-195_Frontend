import React, { useState, useEffect, useMemo } from 'react';
import {
    Box, Typography, IconButton, Avatar, Divider, useMediaQuery, useTheme, Paper,
    Container, Grid, Card, CardContent, CardHeader, Button, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Fab, TextField, Drawer, Chip, InputAdornment, Link as MuiLink
} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";

// --- Standard Material UI Icons ---
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';
import Add from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

// --- Configuration & THEME ---
const DRAWER_WIDTH = 250;
const MAIN_BG_COLOR = '#000000'; 
const SIDEBAR_COLOR = '#030712'; 
const CARD_BG_COLOR = 'rgba(17, 24, 39, 0.8)'; 
const ACCENT_COLOR = '#34d399'; 
const ACCENT_HOVER_COLOR = '#10b981'; 
const TEXT_MUTED = '#9ca3af'; 
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)';
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
const MAX_CONTENT_WIDTH = 1400;

const CARD_GLOW_SHADOW = `0 15px 30px 0 rgba(16, 185, 129, 0.2)`;
const BUTTON_GLOW_SHADOW = `0 0 20px rgba(16, 185, 129, 0.4)`;

// --- Mock Data ---
const mockUser = {
    name: "Test User",
    email: "test@powergrid.com",
    role: "user",
    isLoggedIn: true,
};

// 🌟 FIX: Updated Dashboard href to /employeeDashboard
const navigation = [
    { name: "Dashboard", href: "/employeeDashboard", icon: DashboardIcon }, 
    { name: "My Tickets", href: "/employeeDashboardTicket", icon: AssignmentIcon },
    { name: "AI Assistant", href: "/employeeDashboardAIAssistant", icon: ChatIcon },
    { name: "Knowledge Base", href: "/employeeDashboardKnowledge", icon: BookIcon },
    { name: "CREATE TICKET", href: "/newtickets", icon: BookIcon },
];

const statsData = [
    { label: "Open Tickets", value: "12", icon: AssignmentIcon, color: ACCENT_COLOR, iconColor: 'rgba(52, 211, 153, 0.2)' },
    { label: "Pending", value: "5", icon: AccessTimeIcon, color: '#f59e0b', iconColor: 'rgba(245, 158, 11, 0.2)' },
    { label: "Resolved", value: "48", icon: CheckCircleIcon, color: '#10b981', iconColor: 'rgba(16, 185, 129, 0.2)' },
    { label: "Urgent", value: "2", icon: WarningIcon, color: '#ef4444', iconColor: 'rgba(239, 68, 68, 0.2)' },
];

const mockAllTickets = [
    { id: "TKT-1234", ticketNumber: "TKT-1234", title: "VPN Connection Issue", description: "Unable to connect to VPN from home.", category: "vpn", source: "web", priority: "High", status: "Open", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), tags: ["vpn", "remote-access"], created: "2 hours ago" },
    { id: "TKT-1233", ticketNumber: "TKT-1233", title: "Password Reset Request", description: "Need to reset my email password.", category: "password", source: "chatbot", priority: "Medium", status: "Resolved", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), tags: ["password", "email"], created: "5 hours ago" },
    { id: "TKT-1232", ticketNumber: "TKT-1232", title: "Software Installation", description: "Need AutoCAD 2024 installed.", category: "software", source: "email", priority: "Low", status: "In Progress", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), tags: ["software"], created: "1 day ago" },
];
const recentTickets = mockAllTickets.slice(0, 3);


// --- Helper Functions ---
const getPriorityStyles = (priority) => {
    switch (priority) {
        case "High": return { bgcolor: '#ef4444', color: 'white' };
        case "Medium": return { bgcolor: '#f59e0b', color: 'black' };
        case "Low": default: return { bgcolor: '#9ca3af', color: 'black' };
    }
};

const getStatusStyles = (status) => {
    switch (status) {
        case "Open": return { bgcolor: ACCENT_COLOR, color: 'black' };
        case "Resolved": return { bgcolor: '#10b981', color: 'white' };
        case "In Progress": return { bgcolor: '#3b82f6', color: 'white' };
        default: return { bgcolor: '#9ca3af', color: 'white' };
    }
};

const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
};


// ----------------------------------------------------------------------
// --- CONTENT COMPONENTS (Simplified Placeholders) ---
// ----------------------------------------------------------------------

function PlaceholderPage({ title, path }) {
    return (
        <Paper sx={{ p: 4, borderRadius: 3, bgcolor: CARD_BG_COLOR, border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            <Typography variant="h5" color="white" gutterBottom fontWeight="bold">{title}</Typography>
            <Typography variant="body1" color={TEXT_MUTED}>
                This is the content area for **{title}**. Current path: **{path}**.
            </Typography>
        </Paper>
    );
}

// 🌟 FIX: EmployeeTicketPage Content (Simplified for integration)
function EmployeeTicketPage() {
    // This uses the look/feel from your provided ticket page code snippet, but keeps the implementation simple.
    const [searchQuery, setSearchQuery] = useState("");
    const filteredTickets = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        if (!lowerQuery) return mockAllTickets;
        return mockAllTickets.filter(
            (t) => t.title.toLowerCase().includes(lowerQuery) || t.ticketNumber.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    return (
        <Box sx={{ maxWidth: MAX_CONTENT_WIDTH, mx: 'auto', p: 0, pt: 0 }}>
             <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
                <Grid item>
                    <Typography variant="h4" component="h1" fontWeight="bold" color="white" gutterBottom>My Tickets</Typography>
                    <Typography variant="body1" color={TEXT_MUTED}>View and manage your support requests ({filteredTickets.length})</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained" startIcon={<Add />} disableElevation
                        sx={{ background: ACCENT_COLOR, color: 'black', fontWeight: 'bold', borderRadius: 2, py: 1.5 }}
                    >Create New Ticket</Button>
                </Grid>
            </Grid>

            <Card sx={{ bgcolor: DARK_CARD_COLOR, border: "1px solid rgba(52, 211, 153, 0.15)", borderRadius: 3, mb: 4, p: 1.5 }}>
                <CardContent sx={{ p: 0 }}>
                    <TextField
                        fullWidth placeholder="Search by title or ticket number..." variant="outlined"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "white", bgcolor: "rgba(0, 0, 0, 0.7)", borderRadius: 2,
                                "& fieldset": { borderColor: "rgba(52, 211, 153, 0.2)" },
                                "&:hover fieldset": { borderColor: ACCENT_COLOR },
                                "&.Mui-focused fieldset": { borderColor: ACCENT_COLOR },
                            },
                        }}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><Search sx={{ color: ACCENT_COLOR }} /></InputAdornment>),
                            style: { height: 56, padding: 0 } 
                        }}
                    />
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pb: 4 }}>
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket, index) => (
                        <Card key={ticket.id} sx={{ bgcolor: DARK_CARD_COLOR, color: "white", border: "1px solid rgba(52, 211, 153, 0.15)", borderRadius: 3, cursor: "pointer", '&:hover': { transform: "translateY(-4px)", boxShadow: CARD_GLOW_SHADOW }}}>
                            <CardContent>
                                <Typography variant="h6" color="white">{ticket.title}</Typography>
                                <Typography variant="caption" color={TEXT_MUTED}>#{ticket.ticketNumber} | Priority: <Chip label={ticket.priority} size="small" sx={getPriorityStyles(ticket.priority)} /></Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="body2" color={TEXT_MUTED}><AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />{ticket.created}</Typography>
                                    <Chip label={ticket.status} size="small" sx={getStatusStyles(ticket.status)} />
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Paper sx={{ p: 4, textAlign: "center", bgcolor: CARD_BG_COLOR }}><Typography color={TEXT_MUTED}>No tickets found.</Typography></Paper>
                )}
            </Box>
        </Box>
    );
}

// ----------------------------------------------------------------------
// --- DASHBOARD LAYOUT & NAVIGATION COMPONENTS ---
// ----------------------------------------------------------------------

function AIChatWidget() {
    // ... (AIChatWidget implementation as provided) ...
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! Need quick help? Ask me anything about IT support." },
    ]);
    const [input, setInput] = useState("");

    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(scrollToBottom, [messages, isMinimized]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setInput("");
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "I can help! For detailed assistance, visit the AI Assistant page." },
            ]);
        }, 500);
    };

    if (!isOpen) {
        return (
            <Fab onClick={() => setIsOpen(true)}
                sx={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 1500,
                    bgcolor: ACCENT_COLOR, color: 'black', boxShadow: BUTTON_GLOW_SHADOW,
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    '&:hover': {
                        bgcolor: ACCENT_HOVER_COLOR,
                        boxShadow: `0 0 40px 0 rgba(16, 185, 129, 0.8)`,
                        transform: 'scale(1.05)',
                    }
                }}>
                <SmartToyIcon />
            </Fab>
        );
    }

    return (
        <Card
            sx={{
                position: 'fixed', bottom: 24, right: 24, width: 384,
                maxWidth: 'calc(100vw - 48px)', boxShadow: 10, zIndex: 1500,
                borderRadius: 3, height: isMinimized ? 64 : 500, overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'height 0.3s ease-in-out',
                bgcolor: CARD_BG_COLOR, color: 'white',
                border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
        >
            <CardHeader
                sx={{ p: 2, borderBottom: '1px solid #333', bgcolor: 'rgba(0, 0, 0, 0.4)' }}
                title={<Typography variant="subtitle1" fontWeight="bold" color="white">AI Assistant</Typography>}
                action={
                    <Box display="flex" gap={0.5}>
                        <IconButton size="small" onClick={() => setIsMinimized(!isMinimized)} sx={{ color: TEXT_MUTED }}><MinimizeIcon sx={{ width: 20 }} /></IconButton>
                        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: TEXT_MUTED }}><CloseIcon sx={{ width: 20 }} /></IconButton>
                    </Box>
                }
            />
            {!isMinimized && (
                <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, minHeight: 384, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {messages.map((msg, idx) => (
                            <Box key={idx} sx={{ display: 'flex', justifyContent: msg.role === "user" ? 'flex-end' : 'flex-start' }}>
                                <Paper
                                    sx={{
                                        p: 1.5, borderRadius: 2, maxWidth: '80%',
                                        bgcolor: msg.role === "assistant" ? 'rgba(52, 58, 64, 0.8)' : ACCENT_COLOR, 
                                        color: msg.role === "assistant" ? 'white' : 'black',
                                        boxShadow: 0, wordBreak: 'break-word',
                                    }}
                                >
                                    <Typography variant="body2">{msg.content}</Typography>
                                </Paper>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box sx={{ borderTop: '1px solid #333', p: 1.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant="outlined" size="small" value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                            placeholder="Ask a question..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white', bgcolor: 'rgba(0, 0, 0, 0.5)',
                                    '& fieldset': { borderColor: TEXT_MUTED },
                                    '&:hover fieldset': { borderColor: ACCENT_HOVER_COLOR },
                                    '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR },
                                },
                                '& .MuiInputBase-input::placeholder': { color: TEXT_MUTED }
                            }}
                        />
                        <Button variant="contained" onClick={handleSend}
                            sx={{
                                minWidth: 40, width: 40, height: 40, p: 0,
                                bgcolor: ACCENT_COLOR,
                                '&:hover': { bgcolor: ACCENT_HOVER_COLOR },
                                color: 'black'
                            }}>
                            <SendIcon sx={{ width: 18 }} />
                        </Button>
                    </Box>
                </CardContent>
            )}
        </Card>
    );
}

function SidebarContent({ currentPath, navigate }) {
    const location = useLocation();
    
    // 🌟 FIX: Use startsWith for generic matching, and exact match for dashboard home.
    const isActiveLink = (href) => {
        if (href === '/employeeDashboard') {
            return location.pathname === href; // Exact match for the dashboard page itself
        }
        return location.pathname.startsWith(href); // Match tickets, ai, knowledge, etc.
    }

    return (
        <Box
            sx={{
                width: DRAWER_WIDTH, flexShrink: 0, bgcolor: SIDEBAR_COLOR, color: 'white',
                height: '100%', display: 'flex', flexDirection: 'column', pt: 2,
            }}
        >
            {/* Logo */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SmartToyIcon sx={{ color: ACCENT_COLOR, fontSize: 30 }} />
                <Typography variant="h6" fontWeight="bold">POWERGRID IT</Typography>
            </Box>

            <Divider sx={{ mb: 2, bgcolor: '#333' }} />

            {/* Navigation */}
            <List sx={{ px: 1, flexGrow: 1 }}>
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveLink(item.href);

                    return (
                        <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.href)} 
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? 'rgba(52, 211, 153, 0.1)' : 'transparent',
                                    color: isActive ? ACCENT_COLOR : 'white',
                                    py: 1.5,
                                    transition: 'background-color 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        bgcolor: 'rgba(52, 211, 153, 0.15)',
                                        color: ACCENT_COLOR,
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                    <Box sx={{
                                        width: 32, height: 32, borderRadius: 1, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        bgcolor: isActive ? ACCENT_COLOR : 'transparent', mr: 1
                                    }}>
                                        <Icon sx={{ color: isActive ? 'black' : TEXT_MUTED }} />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: isActive ? 'bold' : 'medium' }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ mt: 'auto', mb: 1, bgcolor: '#333' }} />

            {/* Settings & Logout Links */}
            <List sx={{ px: 1, pb: 2 }}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                        onClick={() => navigate("/employeeDashboardSettings")}
                        sx={{ borderRadius: 2, py: 1.5, '&:hover': { bgcolor: '#1a1a1a', color: ACCENT_COLOR }, color: TEXT_MUTED }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 'medium' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                        onClick={() => navigate("/home")}
                        sx={{ borderRadius: 2, py: 1.5, '&:hover': { bgcolor: '#1a1a1a', color: '#ef4444' }, color: TEXT_MUTED }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 'medium' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

function Sidebar({ navigate, isDesktop, isMobileMenuOpen, handleDrawerToggle }) {
    if (isDesktop) {
        return (
            <Box
                sx={{
                    width: DRAWER_WIDTH, flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0,
                    borderRight: '1px solid rgba(52, 211, 153, 0.2)', zIndex: 1000,
                }}
            >
                <SidebarContent navigate={navigate} />
            </Box>
        );
    }

    return (
        <Drawer
            variant="temporary" open={isMobileMenuOpen} onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: SIDEBAR_COLOR },
            }}
        >
            <SidebarContent navigate={navigate} />
        </Drawer>
    );
}

function MainDashboardContent({ navigate, user }) {
    // ... (Styles) ...
    const cardTransformGlowStyle = { /* ... */ borderRadius: 3, color: 'white', background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), rgba(3, 7, 18, 0.3))', border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'border 0.3s, box-shadow 0.3s, transform 0.3s', '&:hover': { boxShadow: CARD_GLOW_SHADOW, borderColor: "rgba(16, 185, 129, 0.2)", transform: 'translateY(-6px)', } }
    const quickActionButtonStyle = { /* ... */ bgcolor: 'rgba(0, 0, 0, 0.4)', color: 'white', borderColor: 'rgba(52, 211, 153, 0.1)', justifyContent: 'flex-start', py: 1.5, border: '1px solid rgba(52, 211, 153, 0.2)', boxShadow: 'none', fontWeight: 'bold', transition: 'box-shadow 0.3s, background-color 0.3s, border-color 0.3s', '&:hover': { borderColor: ACCENT_COLOR, backgroundColor: 'rgba(52, 211, 153, 0.1)', boxShadow: BUTTON_GLOW_SHADOW, } }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { sm: "flex-start" }, justifyContent: "space-between", gap: 2, mt: 0 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Employee Dashboard</Typography>
                    <Typography color={TEXT_MUTED} sx={{ mt: 0.5 }} variant="body1">Welcome back, **{user.name}**! Here's your IT support overview.</Typography>
                </Box>
                {/* Ask AI Assistant Button */}
                <Button variant="contained" onClick={() => navigate("/employeeDashboardAIAssistant")}
                    startIcon={<ChatIcon sx={{ width: 18 }} />}
                    sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: 'black', py: 1, px: 2, fontSize: '0.875rem', fontWeight: 'bold', borderRadius: 2, alignSelf: { xs: 'stretch', sm: 'flex-start' }, whiteSpace: 'nowrap', transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s', '&:hover': { bgcolor: ACCENT_HOVER_COLOR, boxShadow: `0 0 30px 0 rgba(52, 211, 153, 0.6)`, transform: 'translateY(-2px)', } }}>
                    ASK AI ASSISTANT
                </Button>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3}>
                {statsData.map((stat) => { /* ... stat cards ... */
                    const Icon = stat.icon;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            <Card sx={{ ...cardTransformGlowStyle, height: '100%', minHeight: 150, minWidth:275, cursor: 'pointer' }}>
                                <CardHeader title={<Typography variant="subtitle2" color={TEXT_MUTED}>{stat.label}</Typography>}
                                    action={<Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: stat.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5 }}><Icon sx={{ color: stat.color, fontSize: 20 }} /></Box>}
                                    sx={{ pb: 0, pt: 2, pr: 2 }} />
                                <CardContent sx={{ pt: 0.5, pl: 2, pb: '16px !important' }}>
                                    <Typography variant="h3" fontWeight="bold">{stat.value}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Recent Activity Grid (2/3 Split) */}
            <Grid container spacing={3}>
                {/* Recent Tickets Card */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ ...cardTransformGlowStyle, height: '100%', minWidth:578, display: 'flex', flexDirection: 'column', transition: 'none', '&:hover': { boxShadow: 'none', borderColor: 'rgba(52, 211, 153, 0.2)', transform: 'none' }}}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="bold" color="white">Recent Tickets</Typography>}
                            subheader={<Typography variant="body2" color={TEXT_MUTED}>Your latest support requests</Typography>}
                            // 🌟 FIX: Updated path
                            action={<Button size="small" sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }} onClick={() => navigate("/employeeDashboardTicket")}>View All</Button>}
                            sx={{ pb: 0, pt: 2 }} />
                        <CardContent sx={{ p: 2, pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Box>
                                {recentTickets.map((ticket, index) => (
                                    <Box key={ticket.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 2, borderBottom: index < recentTickets.length - 1 ? '1px solid #1a1a1a' : 'none', cursor: 'pointer', transition: 'background-color 0.2s', '&:hover': { bgcolor: 'rgba(52, 211, 153, 0.05)', borderRadius: 1 } }}>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                <Typography variant="caption" color={TEXT_MUTED} fontWeight="bold">{ticket.id}</Typography>
                                                <Box component="span" sx={{ ...getPriorityStyles(ticket.priority), fontSize: '0.65rem', px: 1, py: 0.2, borderRadius: '4px', fontWeight: 'bold' }}>{ticket.priority}</Box>
                                            </Box>
                                            <Typography variant="body1" fontWeight="medium" color="white" noWrap>{ticket.title}</Typography>
                                            <Typography variant="caption" color={TEXT_MUTED}>{ticket.created}</Typography>
                                        </Box>
                                        <Box component="span" sx={{ ...getStatusStyles(ticket.status), fontSize: '0.7rem', px: 1.5, py: 0.5, borderRadius: '6px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{ticket.status}</Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Actions Card */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ ...cardTransformGlowStyle, height: '100%', minWidth:573, display: 'flex', flexDirection: 'column' }}>
                        <CardHeader title={<Typography variant="h6" fontWeight="bold" color="white">Quick Actions</Typography>} subheader={<Typography variant="body2" color={TEXT_MUTED}>Common IT support tasks</Typography>} sx={{ pb: 0, pt: 2 }} />
                        <CardContent sx={{ p: 2, pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* 🌟 FIX: Updated quick action paths */}
                            <Button variant="outlined" fullWidth startIcon={<AssignmentIcon />} sx={quickActionButtonStyle} onClick={() => navigate("/employeeDashboardTicket")}>
                                CREATE NEW TICKET
                            </Button>
                            <Button variant="outlined" fullWidth startIcon={<ChatIcon />} sx={quickActionButtonStyle} onClick={() => navigate("/employeeDashboardAIAssistant")}>
                                CHAT WITH AI ASSISTANT
                            </Button>
                            <Button variant="outlined" fullWidth startIcon={<TrendingUpIcon />} sx={quickActionButtonStyle} onClick={() => navigate("/employeeDashboardKnowledge")}>
                                BROWSE KNOWLEDGE BASE
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

// ----------------------------------------------------------------------
// --- MAIN APPLICATION COMPONENT (ENTRY) ---
// ----------------------------------------------------------------------

export default function EmployeeDashboard() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
    // 🌟 FIX: Use real React Router hooks
    const navigate = useNavigate();
    const location = useLocation();
    
    const [user] = useState(mockUser);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // No need for 'currentPath' state, use location.pathname directly
    const currentPath = location.pathname;

    const handleDrawerToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // 🌟 FIX: Content Rendering Logic based on location.pathname
    const renderContent = () => {
        switch (currentPath) {
            case "/employeeDashboard":
                return <MainDashboardContent navigate={navigate} user={user} />;
            case "/employeeDashboardTicket":
                // Renders the component you need to open on click
                return <EmployeeTicketPage />;
            case "/employeeDashboardAIAssistant":
                return <PlaceholderPage title="AI Assistant" path={currentPath} />;
            case "/employeeDashboardKnowledge":
                return <PlaceholderPage title="Knowledge Base" path={currentPath} />;
            case "/employeeDashboardSettings":
                return <PlaceholderPage title="Settings" path={currentPath} />;
            default:
                // Handle / or any other deep links
                return (
                    <Paper sx={{ p: 4, borderRadius: 3, bgcolor: CARD_BG_COLOR, border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                        <Typography variant="h5" color="white" gutterBottom>404 - Page Not Found</Typography>
                        <Typography variant="body1" color={TEXT_MUTED}>
                            No content mapped for path: **{currentPath}**.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2, bgcolor: ACCENT_COLOR, color: 'black' }} onClick={() => navigate("/employeeDashboard")}>Go to Dashboard</Button>
                    </Paper>
                );
        }
    };

    // --- Desktop & Responsive Layout ---
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: MAIN_BG_COLOR, color: 'white' }}>

            {/* 1. Sidebar/Drawer */}
            <Sidebar
                currentPath={currentPath} // Passed for highlighting
                navigate={navigate}
                isDesktop={isDesktop}
                isMobileMenuOpen={isMobileMenuOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            {/* 2. Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: isDesktop ? `${DRAWER_WIDTH}px` : 0,
                    width: isDesktop ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                    p: 0,
                    minHeight: '100vh',
                }}
            >
                {/* A) Header/User Info Row (Sticky Header) */}
                <Box sx={{
                    display: "flex", alignItems: "center", justifyContent: "flex-end", width: '100%',
                    py: 2, px: 3, position: 'sticky', top: 0, bgcolor: MAIN_BG_COLOR, zIndex: 500,
                    borderBottom: '1px solid #1a1a1a', 
                }}>
                    {/* Menu button for mobile */}
                    {!isDesktop && (
                        <IconButton onClick={handleDrawerToggle} sx={{ color: ACCENT_COLOR, position: 'absolute', left: 16 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', mr: 2 }}>
                            <Typography variant="body2" fontWeight="medium" color="white">{user.name}</Typography>
                            <Typography variant="caption" color={TEXT_MUTED}>{user.email}</Typography>
                        </Box>
                        <IconButton onClick={() => navigate("/employeeDashboardSettings")} sx={{ p: 0 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: ACCENT_COLOR, fontSize: 14, color: 'black' }}>{user.name.charAt(0)}</Avatar>
                        </IconButton>
                    </Box>
                </Box>

                {/* B) Main Content Body (Dashboard/Page View) */}
                <Container maxWidth="xl" sx={{ pt: 4, pb: 6, px: 3 }}>
                    {renderContent()} {/* <-- Renders content based on the URL */}
                </Container>
            </Box>

            {/* 3. AI Chatbot Widget */}
            <AIChatWidget />
        </Box>
    );
}