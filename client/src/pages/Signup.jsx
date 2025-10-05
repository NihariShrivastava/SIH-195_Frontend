import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Bot, UserPlus } from "lucide-react"; // Added UserPlus icon
import axios from "axios";
import { toast } from "react-hot-toast"; // Using react-hot-toast for consistency
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection

// --- Theme Styles Mapping (reusing the dark/green theme) ---
const themeStyles = {
  // Main container background and text color
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000", // Black background
    color: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    p: 2,
  },
  // Dark card style with green accents (inspired by featureCard)
  card: {
    borderRadius: "1rem",
    background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.6))', // Dark, semi-transparent background
    border: '1px solid rgba(16, 185, 129, 0.3)', // Subtle green border
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1), 0 0 10px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    p: 3,
  },
  // Input field styles (TextField and Select)
  inputField: {
    borderRadius: "0.5rem",
    backgroundColor: "rgba(17, 24, 39, 0.7)", // Darker input background
    border: "1px solid rgba(16, 185, 129, 0.2)", // Thin green border
    boxShadow: "none",
    fontSize: 14,
    color: "white",
    "&::placeholder": { fontSize: 12, color: "rgba(255,255,255,0.6)" },
    "& fieldset": { border: "none" }, // Hide default MUI border
  },
  // Primary button style (green gradient)
  primaryButton: {
    mt: 2,
    textTransform: "none",
    borderRadius: "0.5rem",
    fontSize: 14,
    py: 1.2,
    background: 'linear-gradient(to right, #34d399, #10b981)', // Green gradient
    color: '#000000',
    fontWeight: 600,
    transition: 'all 0.3s',
    "&:hover": {
        background: 'linear-gradient(to right, #10b981, #059669)',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
        transform: 'translateY(-2px)',
    },
    "&.Mui-disabled": {
      background: 'rgba(52, 211, 153, 0.5)',
      color: '#333333',
    }
  },
  // Logo Icon Container
  logoIconContainer: {
    width: 48,
    height: 48,
    background: 'linear-gradient(to bottom right, #34d399, #10b981, #14b8a6)',
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 1,
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)', // Green glow
    overflow: 'hidden',
    position: 'relative',
  },
  // Typography
  titleText: {
    fontWeight: 800,
    fontSize: 28,
    background: 'linear-gradient(to right, #f3f4f6, #ffffff, #d1d5db)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitleText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: 300,
  },
  linkText: {
    color: "#34d399", // Green link color
    textDecoration: "underline",
    "&:hover": {
      color: "#10b981",
    }
  },
  // Floating Orbs for the landing page theme
  floatingOrb1: {
    position: 'absolute',
    top: '5rem',
    left: '25%',
    width: '24rem',
    height: '24rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'floatingGlow 4s ease-in-out infinite',
    zIndex: 0,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: 0,
    right: '25%',
    width: '24rem',
    height: '24rem',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    animation: 'floatingGlow 4s ease-in-out infinite',
    animationDelay: '2s',
    zIndex: 0,
  }
};


export default function SignupPage() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Changed default to 'employee'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !employeeId || !password) {
        toast.error("All fields are required ❌");
        return;
    }

    setIsLoading(true);

    try {
      // NOTE: Using environment variable for backend URL if possible, otherwise keep hardcoded for now
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

      const res = await axios.post(`${backendUrl}/api/register`, {
        name,
        email,
        employeeId,
        password,
        role,
      });

      console.log(res.data);
      // NOTE: You generally don't log in the user on signup; you redirect them to login.
      // Keeping this line commented out: localStorage.setItem("user", JSON.stringify(res.data.user));
      
      toast.success(res.data.message || "Registration successful! Please log in. ✅");
      navigate("/login"); 
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={themeStyles.container}>
      {/* CSS Keyframes (replicate from LandingPage) */}
      <style>{`
        @keyframes floatingGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.6;
          }
        }
        .MuiFormLabel-root { color: #9ca3af !important; } /* Label color */
        .MuiInputLabel-shrink { color: #34d399 !important; } /* Focused label color */
      `}</style>

      {/* Background Orbs */}
      <Box sx={themeStyles.floatingOrb1} />
      <Box sx={themeStyles.floatingOrb2} />

      <Box sx={{ width: "100%", maxWidth: 400, position: 'relative', zIndex: 10 }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4, mt: 0 }}>
          <Box sx={themeStyles.logoIconContainer}>
            <Bot size={24} color="black" strokeWidth={2.5} />
          </Box>
          <Typography variant="h4" sx={themeStyles.titleText}>
            POWERGRID IT Support
          </Typography>
          <Typography variant="body2" sx={themeStyles.subtitleText}>
            Create your unified account
          </Typography>
        </Box>

        {/* Signup Card */}
        <Card sx={themeStyles.card}>
          <CardHeader
            sx={{ pt: 1, pb: 2 }}
            title={
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", color: "white", fontWeight: 600, fontSize: 22 }}
              >
                Get Started
              </Typography>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "flex", justifyContent: "center", color: "#6b7280", fontSize: 12 }}
              >
                Register to access the unified ticketing system
              </Typography>
            }
          />
          <CardContent sx={{ py: 1 }}>
            <form onSubmit={handleSubmit}>
              {/* Fields Array */}
              {[
                { label: "Full Name", value: name, setter: setname, placeholder: "Your Full Name", type: "text" },
                { label: "Email Address", value: email, setter: setEmail, placeholder: "employee@powergrid.com", type: "email" },
                { label: "Employee ID", value: employeeId, setter: setEmployeeId, placeholder: "Your Employee ID", type: "text" },
                { label: "Password", value: password, setter: setPassword, placeholder: "Create a secure password", type: "password" },
              ].map((field, i) => (
                <Box sx={{ mb: 2 }} key={i}>
                  <TextField
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    fullWidth
                    margin="dense"
                    InputProps={{ sx: themeStyles.inputField }}
                  />
                </Box>
              ))}

              {/* Role Dropdown */}
              <Box sx={{ mb: 2 }}>
                              <FormControl fullWidth>
                                <InputLabel id="role-select-label" sx={{ color: '#9ca3af' }}>Role</InputLabel>
                                <Select
                                  labelId="role-select-label"
                                  id="role-select"
                                  value={role}
                                  label="Role"
                                  onChange={(e) => setRole(e.target.value)}
                                  MenuProps={{ PaperProps: { sx: { backgroundColor: '#111827', color: 'white' } } }}
                                  sx={{
                                    ...themeStyles.inputField,
                                    "& .MuiSelect-select": { py: '12.5px' },
                                    "& .MuiSelect-icon": { color: "#34d399" }, // Green icon
                                  }}
                                >
                                  <MenuItem value="admin">Admin</MenuItem>
                                  <MenuItem value="employee">Employee</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>

              {/* Sign Up Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={themeStyles.primaryButton}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" sx={{ color: 'black' }} />
                ) : (
                  <>
                    <UserPlus size={18} style={{ marginRight: 8 }} /> Sign Up
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center", mb: 1, py: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: 12 }}>
              Already have an account?{" "}
              <a href="/login" style={themeStyles.linkText}>
                Login
              </a>
            </Typography>
          </CardActions>
        </Card>
      </Box>

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 8,
          textAlign: "center",
          color: "#4b5563",
          fontSize: 11,
          width: "100%",
        }}
      >
        For IT support issues, contact <a href="mailto:helpdesk@powergrid.com" style={{ color: "#34d399" }}>helpdesk@powergrid.com</a>
      </Typography>
    </Box>
  );
}