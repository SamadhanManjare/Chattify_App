
export const protectRoute = async () => {

try {
    // Check for token in cookies
    const token = req.cookies.token;  
    if (!token) return res.status(401).json({ message: 'Unauthorized - No token provided' });
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded || !decoded.userId) return res.status(401).json({ message: 'Unauthorized - Invalid token' });

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'Unauthorized - User not found' });

    req.user = user;
    next();

    
} catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: 'Internal server error' });
}
}