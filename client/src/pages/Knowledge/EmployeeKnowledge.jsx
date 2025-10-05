import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Grid,
  Paper,
  InputAdornment, // Added for the search icon
} from "@mui/material";
import { Search, BookOpen, ThumbsUp, ThumbsDown, Eye, TrendingUp } from "lucide-react";

// --- Theme Constants (from previous components) ---
const ACCENT_COLOR = "#34d399"; // Vibrant Green
const ACCENT_HOVER_COLOR = "#10b981"; // Darker Green on hover
const TEXT_MUTED = "#9ca3af"; // Gray text for subtitles/descriptions
const MAIN_BG_COLOR = "#000000"; // Deep Black
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; // Very dark, slight transparent background

const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;
const BUTTON_GLOW_SHADOW = `0 0 15px rgba(16, 185, 129, 0.5)`;

// --- Mock Data (Simplified Structure) ---
const mockKnowledgeArticles = [
  { id: "kb-001", title: "How to Reset Your Password", content: "Detailed steps for self-service password reset.", category: "Password", tags: ["password", "self-service", "security"], views: 1250, helpful: 98, notHelpful: 5, published: true },
  { id: "kb-002", title: "VPN Connection Troubleshooting", content: "Solutions for VPN errors like 809 and 720.", category: "Vpn", tags: ["vpn", "connection", "network"], views: 890, helpful: 75, notHelpful: 8, published: true },
  { id: "kb-003", title: "Requesting and Installing New Software", content: "Guide to submitting a software request ticket.", category: "Software", tags: ["installation", "software", "license"], views: 650, helpful: 65, notHelpful: 2, published: true },
  { id: "kb-004", title: "Setting up Two-Factor Authentication (2FA)", content: "Steps to enable 2FA on your work account.", category: "Security", tags: ["2fa", "security", "multifactor"], views: 450, helpful: 90, notHelpful: 1, published: true },
  { id: "kb-005", title: "Resolving Printer Queue Issues", content: "Tips for clearing jammed print jobs.", category: "Hardware", tags: ["printer", "troubleshoot"], views: 150, helpful: 55, notHelpful: 8, published: true },
];

// Mock DashboardLayout placeholder
const DashboardLayout = ({ children }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: MAIN_BG_COLOR, color: "white", p: { xs: 2, sm: 4 } }}>
    {children}
  </Box>
);

// --- Custom Component Styles ---

const themedCardStyle = {
  borderRadius: 3,
  background: DARK_CARD_COLOR,
  width:"35vw",
  border: '1px solid rgba(52, 211, 153, 0.2)',
  transition: 'border 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: CARD_GLOW_SHADOW,
    borderColor: "rgba(52, 211, 153, 0.4)",
  },
};

const searchInputStyle = {
    // Styles for the Input element itself, matching the dark full-width bar
    bgcolor: 'rgba(50, 50, 50, 0.3)', // Slightly lighter dark background for the bar
    borderRadius: 2,
    p: 1.5,
    '& .MuiInputBase-root': {
        color: 'white',
        fontSize: 16,
        '& fieldset': { border: 'none' }, // Remove default border
        '&:hover fieldset': { border: 'none' },
        '&.Mui-focused fieldset': { border: 'none' },
    },
    '& .MuiOutlinedInput-input': {
        pl: 1, // Reduced padding as icon is handled by Adornment
        pb: 0.5,
        pt: 0.5
    },
};

const categoryButtonStyle = (isSelected) => ({
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderRadius: 1, // Sharper corners for buttons in the image
    py: 0.7,
    px: 2,
    fontSize: '0.8rem',
    minWidth: 0,
    transition: 'background-color 0.3s, box-shadow 0.3s',
    ...{
        // Style matching the screenshot: Selected = Dark button, Unselected = White/Gray text on dark
        color: isSelected ? 'black' : 'white', // Text color
        borderColor: 'transparent',
        bgcolor: isSelected ? ACCENT_COLOR : 'rgba(50, 50, 50, 0.3)', // Dark unselected background
        border: `1px solid transparent`,
        '&:hover': {
            bgcolor: isSelected ? ACCENT_HOVER_COLOR : 'rgba(50, 50, 50, 0.5)',
            boxShadow: 'none',
            borderColor: 'transparent',
        }
    }
});

const tagBadgeStyle = {
    borderRadius: '4px',
    fontSize: '0.75rem',
    px: 1,
    py: 0.25,
    fontWeight: 'medium',
    textTransform: 'lowercase',
    color: ACCENT_COLOR,
    border: `1px solid ${ACCENT_COLOR}`,
    bgcolor: 'rgba(52, 211, 153, 0.1)',
};

const statIconStyle = {
    color: TEXT_MUTED, 
    width: 16, 
    height: 16,
    mt: -0.2 // Slight alignment correction
};

// --- Article Component for reuse ---
const ArticleItem = ({ article }) => (
    // Card acts as the clickable area
    <Card 
        sx={{ 
            ...themedCardStyle, 
            p: 2, 
            '&:hover': { bgcolor: 'rgba(52, 211, 153, 0.05)', boxShadow: CARD_GLOW_SHADOW },
            cursor: 'pointer'
        }}
        onClick={() => console.log(`Navigating to article: ${article.id}`)} // Simulate click
    >
        <Box sx={{ pb: 1 }}>
            {/* Title */}
            <Typography variant="h6" component="p" fontWeight="bold" sx={{ fontSize: '1.15rem', color: 'white' }}>
                {article.title}
            </Typography>
            
            {/* Tags/Badges */}
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mt={1}>
                {article.tags.map((tag) => (
                    <Box key={tag} component="span" sx={tagBadgeStyle}>
                        {tag}
                    </Box>
                ))}
            </Box>
        </Box>
        
        {/* Stats Row */}
        <Box display="flex" alignItems="center" gap={3} sx={{ color: TEXT_MUTED, fontSize: '0.875rem', pt: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
                <Eye style={statIconStyle} />
                <Typography variant="body2">{article.views}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
                <ThumbsUp style={statIconStyle} />
                <Typography variant="body2">{article.helpful}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
                <ThumbsDown style={statIconStyle} />
                <Typography variant="body2">{article.notHelpful}</Typography>
            </Box>
        </Box>
    </Card>
);

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dynamically derive categories and prepend 'All' (using mock article categories)
  const articleCategories = ["All", ...new Set(mockKnowledgeArticles.map((a) => a.category))];

  const filteredArticles = mockKnowledgeArticles.filter((article) => {
    const lowerSearch = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(lowerSearch) ||
      article.content.toLowerCase().includes(lowerSearch) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerSearch));
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory && article.published;
  });

  // Since the screenshot uses specific popular titles, hardcode the top 3 based on mock data IDs
  const popularArticleData = [
    { title: "How to Reset Your Password", views: 1250 },
    { title: "VPN Connection Troubleshooting", views: 890 },
    { title: "Software Installation Requests", views: 650 },
  ];
  
  // Custom button styles for quick links (matching screenshot style)
  const quickLinkStyle = {
    textTransform: 'none', 
    justifyContent: 'flex-start', 
    fontWeight: 'medium',
    bgcolor: 'transparent',
    color: 'white',
    border: '1px solid transparent',
    '&:hover': {
        bgcolor: 'rgba(52, 211, 153, 0.1)',
        borderColor: 'rgba(52, 211, 153, 0.3)',
    }
  };


  return (
    <DashboardLayout>
      {/* Contained and Centered Content Wrapper */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 0 }}> 
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          
          {/* Header */}
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
              Knowledge Base
            </Typography>
            <Typography sx={{ color: TEXT_MUTED }}>
              Find answers to common IT support questions
            </Typography>
          </Box>

          {/* Search Bar (Full Width, Dark) */}
          <Box sx={searchInputStyle}>
            <TextField
              fullWidth
              placeholder="Search articles, guides, and solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search style={{ color: TEXT_MUTED, width: 20, height: 20 }} />
                  </InputAdornment>
                ),
                disableUnderline: true, // Hide MUI's default underline if using standard variant
              }}
            />
          </Box>

          {/* Categories */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {articleCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                sx={categoryButtonStyle(selectedCategory === category)}
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Article List and Sidebar Grid */}
          <Grid container spacing={4}>
            
            {/* Articles List (Left 2/3) */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Typography variant="h6" fontWeight="semibold" sx={{ mb: 1, color: 'white' }}>
                  All Articles
                </Typography>
                
                {filteredArticles.length === 0 ? (
                  <Card sx={themedCardStyle}>
                    <CardContent sx={{ py: 6, textAlign: 'center' }}>
                      <BookOpen style={{ width: 48, height: 48, margin: '0 auto', color: TEXT_MUTED, marginBottom: 16 }} />
                      <Typography sx={{ color: TEXT_MUTED }}>No articles found</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  filteredArticles.map((article) => (
                    <ArticleItem key={article.id} article={article} />
                  ))
                )}
              </Box>
            </Grid>

            {/* Sidebar (Right 1/3) */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                
                {/* Popular Articles Card */}
                <Card sx={themedCardStyle}>
                  <CardHeader sx={{ pb: 1, pt: 2 }}
                    title={
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
                        <TrendingUp size={20} style={{ color: ACCENT_COLOR }} />
                        Popular Articles
                      </Typography>
                    }
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1, pb: 2 }}>
                    {popularArticleData.map((article, idx) => (
                        <Box key={idx} 
                            component="a" 
                            href={`/dashboard/knowledge/${idx + 1}`} 
                            sx={{ textDecoration: 'none', color: 'inherit', p: 1, borderRadius: 2, '&:hover': { bgcolor: 'rgba(52, 211, 153, 0.05)' } }}
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6" fontWeight="bold" sx={{ color: ACCENT_COLOR }}>{idx + 1}</Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" fontWeight="medium" sx={{ lineHeight: 1.4, color: 'white' }}>{article.title}</Typography>
                                    <Typography variant="caption" sx={{ color: TEXT_MUTED, fontSize: '0.7rem' }}>{article.views} views</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Links Card */}
                <Card sx={themedCardStyle}>
                  <CardHeader 
                    title={<Typography variant="subtitle1" fontWeight="bold" color="white">Need More Help?</Typography>}
                    sx={{ pb: 1, pt: 2 }}
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1, pb: 2 }}>
                    <Button fullWidth variant="outlined" sx={quickLinkStyle} startIcon={<BookOpen size={16} />}>
                      Ask AI Assistant
                    </Button>
                    <Button fullWidth variant="outlined" sx={quickLinkStyle} startIcon={<BookOpen size={16} />}>
                      Create Support Ticket
                    </Button>
                  </CardContent>
                </Card>
                
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}