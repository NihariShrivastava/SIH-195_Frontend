import React, { useState, useEffect } from 'react';
import {
    Box, Typography, IconButton, Avatar, Divider, useMediaQuery, useTheme, Paper,
    Container, Grid, Card, CardContent, CardHeader, Button, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Fab, TextField, Drawer
} from '@mui/material';

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

// Assume you would import this from 'react-router-dom' in a real app
// For this mock component, we'll use a placeholder function inside the main component
// import { useNavigate } from 'react-router-dom';

// --- Configuration & THEME (Updated to match previous theme) ---
const DRAWER_WIDTH = 250;
const MAIN_BG_COLOR = '#000000'; // Deep Black
const SIDEBAR_COLOR = '#030712'; // Even darker sidebar
const CARD_BG_COLOR = 'rgba(17, 24, 39, 0.8)'; // Semi-transparent dark card
const ACCENT_COLOR = '#34d399'; // Vibrant Green
const ACCENT_HOVER_COLOR = '#10b981'; // Darker Green on hover
const TEXT_MUTED = '#9ca3af'; // Gray text for subtitles/descriptions

// GLOW_SHADOW for cards (outer shadow + lift effect)
const CARD_GLOW_SHADOW = `0 15px 30px 0 rgba(16, 185, 129, 0.2)`;
// BUTTON_GLOW_SHADOW for Quick Actions (softer outer shadow, simulating inner glow on dark bg)
const BUTTON_GLOW_SHADOW = `0 0 20px rgba(16, 185, 129, 0.4)`;

// --- Mock Data (No Changes) ---
const mockUser = {
    name: "Test User",
    email: "test@powergrid.com",
    role: "user",
    isLoggedIn: true,
};

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "My Tickets", href: "/employeeDashboardTicket", icon: AssignmentIcon },
    { name: "AI Assistant", href: "/employeeDashboardAIAssistant", icon: ChatIcon },
    { name: "Knowledge Base", href: "/employeeDashboardKnowledge", icon: BookIcon },
];

const statsData = [
    { label: "Open Tickets", value: "12", icon: AssignmentIcon, color: ACCENT_COLOR, iconColor: 'rgba(52, 211, 153, 0.2)' },
    { label: "Pending", value: "5", icon: AccessTimeIcon, color: '#f59e0b', iconColor: 'rgba(245, 158, 11, 0.2)' },
    { label: "Resolved", value: "48", icon: CheckCircleIcon, color: '#10b981', iconColor: 'rgba(16, 185, 129, 0.2)' },
    { label: "Urgent", value: "2", icon: WarningIcon, color: '#ef4444', iconColor: 'rgba(239, 68, 68, 0.2)' },
];

const recentTickets = [
    { id: "TKT-1234", title: "VPN Connection Issue", status: "Open", priority: "High", created: "2 hours ago" },
    { id: "TKT-1233", title: "Password Reset Request", status: "Resolved", priority: "Medium", created: "5 hours ago" },
    { id: "TKT-1232", title: "Software Installation", status: "In Progress", priority: "Low", created: "1 day ago" },
];

// --- Helper for Status/Priority Colors ---
const getPriorityStyles = (priority) => {
    switch (priority) {
        case "High":
            return { bgcolor: '#ef4444', color: 'white' };
        case "Medium":
            return { bgcolor: '#f59e0b', color: 'black' };
        case "Low":
        default:
            return { bgcolor: '#9ca3af', color: 'black' };
    }
};

const getStatusStyles = (status) => {
    switch (status) {
        case "Open":
            return { bgcolor: ACCENT_COLOR, color: 'black' };
        case "Resolved":
            return { bgcolor: '#10b981', color: 'white' };
        case "In Progress":
            return { bgcolor: '#3b82f6', color: 'white' };
        default:
            return { bgcolor: '#9ca3af', color: 'white' };
    }
};

// --- Mock AIChatWidget Component (Styled) ---
function AIChatWidget() {
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

    // FAB Button Style (Green Glow)
    if (!isOpen) {
        return (
            <Fab onClick={() => setIsOpen(true)}
                sx={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 1500,
                    bgcolor: ACCENT_COLOR,
                    color: 'black',
                    boxShadow: BUTTON_GLOW_SHADOW, // Apply button glow
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

    // Chat Window Style
    return (
        <Card
            sx={{
                position: 'fixed', bottom: 24, right: 24, width: 384,
                maxWidth: 'calc(100vw - 48px)', boxShadow: 10, zIndex: 1500,
                borderRadius: 3, // More rounded corners
                height: isMinimized ? 64 : 500, overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'height 0.3s ease-in-out',
                bgcolor: CARD_BG_COLOR, // Dark, semi-transparent background
                color: 'white',
                border: '1px solid rgba(16, 185, 129, 0.3)', // Green border
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
                                        p: 1.5,
                                        borderRadius: 2,
                                        maxWidth: '80%',
                                        bgcolor: msg.role === "assistant" ? 'rgba(52, 58, 64, 0.8)' : ACCENT_COLOR, // Dark grey for bot, green for user
                                        color: msg.role === "assistant" ? 'white' : 'black',
                                        boxShadow: 0,
                                        wordBreak: 'break-word',
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
                            variant="outlined"
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                            placeholder="Ask a question..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
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

// --- Sidebar Content Component (Themed) ---
function SidebarContent({ currentPath, navigate }) {
    return (
        <Box
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                bgcolor: SIDEBAR_COLOR,
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                pt: 2,
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
                    const isActive = currentPath === item.href;

                    return (
                        <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.href)} // Updated to use navigate
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
                                        width: 32,
                                        height: 32,
                                        borderRadius: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: isActive ? ACCENT_COLOR : 'transparent',
                                        mr: 1
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
                        onClick={() => navigate("/employeeDashboardSettings")} // Updated to use navigate
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

// --- Sidebar/Drawer Layout Component (No changes) ---
function Sidebar({ currentPath, navigate, isDesktop, isMobileMenuOpen, handleDrawerToggle }) {
    if (isDesktop) {
        return (
            <Box
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    borderRight: '1px solid rgba(52, 211, 153, 0.2)',
                    zIndex: 1000,
                }}
            >
                <SidebarContent currentPath={currentPath} navigate={navigate} />
            </Box>
        );
    }

    return (
        <Drawer
            variant="temporary"
            open={isMobileMenuOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: SIDEBAR_COLOR },
            }}
        >
            <SidebarContent currentPath={currentPath} navigate={navigate} />
        </Drawer>
    );
}

// --- Main Dashboard Content Component (Themed with Effects) ---
function MainDashboardContent({ navigate, user }) {

    // Style for the Card Transform and Glow Effect
    const cardTransformGlowStyle = {
        borderRadius: 3,
        color: 'white',
        background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), rgba(3, 7, 18, 0.3))',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        transition: 'border 0.3s, box-shadow 0.3s, transform 0.3s',
        '&:hover': {
            boxShadow: CARD_GLOW_SHADOW,
            borderColor: "rgba(16, 185, 129, 0.2)",
            transform: 'translateY(-6px)',
        }
    }

    // Style for the Quick Action Button Glow Effect
    const quickActionButtonStyle = {
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        borderColor: 'rgba(52, 211, 153, 0.1)',
        justifyContent: 'flex-start',
        py: 1.5,
        border: '1px solid rgba(52, 211, 153, 0.2)',
        boxShadow: 'none',
        fontWeight: 'bold',
        transition: 'box-shadow 0.3s, background-color 0.3s, border-color 0.3s',
        '&:hover': {
            borderColor: ACCENT_COLOR,
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            boxShadow: BUTTON_GLOW_SHADOW,
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Header (Title, Subtitle, Ask AI Button) */}
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "flex-start" },
                justifyContent: "space-between",
                gap: 2,
                mt: 0
            }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Employee Dashboard</Typography>
                    <Typography color={TEXT_MUTED} sx={{ mt: 0.5 }} variant="body1">Welcome back, **{user.name}**! Here's your IT support overview.</Typography>
                </Box>
                {/* Ask AI Assistant Button with Gradient Glow */}
                <Button variant="contained" onClick={() => navigate("/dashboard/chat")} // Updated to use navigate
                    startIcon={<ChatIcon sx={{ width: 18 }} />}
                    sx={{
                        background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                        color: 'black',
                        py: 1,
                        px: 2,
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        alignSelf: { xs: 'stretch', sm: 'flex-start' },
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
                        '&:hover': {
                            bgcolor: ACCENT_HOVER_COLOR,
                            boxShadow: `0 0 30px 0 rgba(52, 211, 153, 0.6)`,
                            transform: 'translateY(-2px)',
                        }
                    }}>
                    ASK AI ASSISTANT
                </Button>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3}>
                {statsData.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            {/* Stat Card with Hover Transform and Glow */}
                            <Card sx={{ ...cardTransformGlowStyle, height: '100%', minHeight: 150, minWidth:275, cursor: 'pointer' }}>
                                <CardHeader
                                    title={<Typography variant="subtitle2" color={TEXT_MUTED}>{stat.label}</Typography>}
                                    action={
                                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: stat.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.5 }}>
                                            <Icon sx={{ color: stat.color, fontSize: 20 }} />
                                        </Box>
                                    }
                                    sx={{ pb: 0, pt: 2, pr: 2 }}
                                />
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

                {/* Recent Tickets Card (Applies Transform and Glow) */}
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        ...cardTransformGlowStyle,
                        height: '100%',
                        minWidth:578,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'none', // Disable hover on container that holds list items
                        '&:hover': { boxShadow: 'none', borderColor: 'rgba(52, 211, 153, 0.2)', transform: 'none' }
                    }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="bold" color="white">Recent Tickets</Typography>}
                            subheader={<Typography variant="body2" color={TEXT_MUTED}>Your latest support requests</Typography>}
                            action={<Button size="small" sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }} onClick={() => navigate("/employeeDashboardTicket")}>View All</Button>} // Updated to use navigate
                            sx={{ pb: 0, pt: 2 }}
                        />
                        <CardContent sx={{ p: 2, pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Box>
                                {recentTickets.map((ticket, index) => (
                                    <Box
                                        key={ticket.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 2,
                                            py: 2,
                                            borderBottom: index < recentTickets.length - 1 ? '1px solid #1a1a1a' : 'none',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s',
                                            '&:hover': { bgcolor: 'rgba(52, 211, 153, 0.05)', borderRadius: 1 }
                                        }}
                                    >
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                <Typography variant="caption" color={TEXT_MUTED} fontWeight="bold">{ticket.id}</Typography>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        ...getPriorityStyles(ticket.priority),
                                                        fontSize: '0.65rem',
                                                        px: 1,
                                                        py: 0.2,
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {ticket.priority}
                                                </Box>
                                            </Box>
                                            <Typography variant="body1" fontWeight="medium" color="white" noWrap>{ticket.title}</Typography>
                                            <Typography variant="caption" color={TEXT_MUTED}>{ticket.created}</Typography>
                                        </Box>
                                        <Box
                                            component="span"
                                            sx={{
                                                ...getStatusStyles(ticket.status),
                                                fontSize: '0.7rem',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '6px',
                                                fontWeight: 'bold',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {ticket.status}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Actions Card (Applies Transform and Glow) */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        ...cardTransformGlowStyle,
                        height: '100%',
                        minWidth:573,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="bold" color="white">Quick Actions</Typography>}
                            subheader={<Typography variant="body2" color={TEXT_MUTED}>Common IT support tasks</Typography>}
                            sx={{ pb: 0, pt: 2 }}
                        />
                        <CardContent sx={{ p: 2, pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Quick Action Buttons with Inner/Soft Glow Effect */}
                            <Button variant="outlined" fullWidth startIcon={<AssignmentIcon />}
                                sx={quickActionButtonStyle}
                                onClick={() => navigate("/dashboard/tickets/new")}> {/* Updated to use navigate */}
                                CREATE NEW TICKET
                            </Button>
                            <Button variant="outlined" fullWidth startIcon={<ChatIcon />}
                                sx={quickActionButtonStyle}
                                onClick={() => navigate("/dashboard/chat")}> {/* Updated to use navigate */}
                                CHAT WITH AI ASSISTANT
                            </Button>
                            <Button variant="outlined" fullWidth startIcon={<TrendingUpIcon />}
                                sx={quickActionButtonStyle}
                                onClick={() => navigate("/dashboard/knowledge")}> {/* Updated to use navigate */}
                                BROWSE KNOWLEDGE BASE
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}


// --- Main Application Component (Themed) ---
export default function EmployeeDashboard() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [user] = useState(mockUser);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("/dashboard");

    // NOTE: This array acts as a mock for useNavigate and route changes
    // In a real application, you would import and use const navigate = useNavigate();
    const navigate = (href) => {
        setCurrentPath(href); // In a real app, this would be handled by React Router
        sessionStorage.setItem("currentPath", href);
        setIsMobileMenuOpen(false);
        console.log(`Navigating to: ${href}`);
    };

    useEffect(() => {
        const storedPath = sessionStorage.getItem("currentPath");
        if (storedPath) {
            setCurrentPath(storedPath);
        }
    }, []);

    const handleDrawerToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // --- Desktop & Responsive Layout ---
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: MAIN_BG_COLOR, color: 'white' }}>

            {/* 1. Sidebar/Drawer */}
            <Sidebar
                currentPath={currentPath}
                navigate={navigate} // Passed down the navigate function
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: '100%',
                    py: 2,
                    px: 3,
                    position: 'sticky',
                    top: 0,
                    bgcolor: MAIN_BG_COLOR,
                    zIndex: 500,
                    borderBottom: '1px solid #1a1a1a', // Subtle separation
                }}>
                    {/* Menu button for mobile */}
                    {!isDesktop && (
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{ color: ACCENT_COLOR, position: 'absolute', left: 16 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* User Info */}
                        <Box sx={{
                            display: "flex", flexDirection: 'column', alignItems: 'flex-end', mr: 2,
                            display: { xs: 'none', sm: 'flex' }
                        }}>
                            <Typography variant="body2" fontWeight="medium" color="white">{user.name}</Typography>
                            <Typography variant="caption" color={TEXT_MUTED}>{user.email}</Typography>
                        </Box>
                        {/* Avatar/Account */}
                        <IconButton onClick={() => console.log("Account menu")} sx={{ p: 0 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: ACCENT_COLOR, fontSize: 14, color: 'black' }}>{user.name.charAt(0)}</Avatar>
                        </IconButton>
                    </Box>
                </Box>

                {/* B) Main Content Body (Dashboard/Page View) */}
                <Container maxWidth="xl" sx={{ pt: 4, pb: 6, px: 3 }}>
                    {currentPath === "/dashboard" ? (
                        <MainDashboardContent navigate={navigate} user={user} />
                    ) : (
                        <Paper sx={{ p: 4, borderRadius: 3, bgcolor: CARD_BG_COLOR, border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                            <Typography variant="h5" color="white" gutterBottom>
                                {navigation.find(item => item.href === currentPath)?.name || "Page Content"}
                            </Typography>
                            <Typography variant="body1" color={TEXT_MUTED}>
                                Viewing content for: **{currentPath}**.
                            </Typography>
                        </Paper>
                    )}
                </Container>
            </Box>

            {/* 3. AI Chatbot Widget */}
            <AIChatWidget />
        </Box>
    );

}