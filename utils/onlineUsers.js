async function getOnlineUsersCount() {
    try {
        // Simulate online users count with some randomization
        const baseCount = 1247;
        const variation = Math.floor(Math.random() * 100) - 50;
        const timestamp = Date.now();
        
        // Add some time-based variation
        const timeVariation = Math.floor(Math.sin(timestamp / 60000) * 20);
        
        return Math.max(1000, baseCount + variation + timeVariation);
    } catch (error) {
        console.error('Error getting online users count:', error);
        return 1247; // fallback count
    }
}

// Simulate user activity tracking
function trackUserActivity() {
    try {
        const sessionData = {
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            sessionId: generateSessionId()
        };
        
        localStorage.setItem('imageConverter_session', JSON.stringify(sessionData));
        return sessionData;
    } catch (error) {
        console.error('Error tracking user activity:', error);
    }
}

function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Initialize user tracking
trackUserActivity();
