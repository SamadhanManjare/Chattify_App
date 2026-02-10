
export const signup = (req, res) => {
    
    const { fullname, email, password } = req.body;

    try {
        // Here you would typically add code to save the user to the database
        // For now, we'll just return a success message
        if(!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
         
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}