import React, { useState } from 'react';

// --- SIMULATION OF EXPO-ROUTER HOOKS ---
// This hook simulates the navigation needed to dismiss the modal and redirect to the index tab.
const useRouter = () => ({
    dismissAll: () => {
        console.log("NAVIGATION ACTION: Router called 'dismissAll()'. Modal should close and redirect to the index tab.");
    }
});
// ----------------------------------------

// CSS for the jumping animation and scribble background pattern
const globalStyles = `
/* Keyframes for the vertical jumping animation */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-25px); }
}

.jumping-text {
    animation: bounce 1.2s ease-in-out infinite;
}

/* Scribble SVG Background Pattern (Repeated) */
.scribble-bg {
    background-color: #FFFFFF; /* Pure White Background */
    /* Repeated SVG pattern for the scribble effect */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23e0e0e0' fill-opacity='0.5' d='M40 20c0-1.8-0.6-3.5-1.7-4.9l-4.2-4.2-2.1-2.1c-1.4-1.1-3.1-1.7-4.9-1.7s-3.5 0.6-4.9 1.7l-2.1 2.1-4.2 4.2c-1.1 1.4-1.7 3.1-1.7 4.9s0.6 3.5 1.7 4.9l4.2 4.2 2.1 2.1c1.4 1.1 3.1 1.7 4.9 1.7s3.5-0.6 4.9-1.7l2.1-2.1 4.2-4.2c1.1-1.4 1.7-3.1 1.7-4.9zM20 38c-1.8 0-3.5-0.6-4.9-1.7l-2.1-2.1-4.2-4.2c-1.4-1.1-1.7-3.1-1.7-4.9s0.6-3.5 1.7-4.9l4.2-4.2 2.1-2.1c1.4-1.1 3.1-1.7 4.9-1.7s3.5 0.6 4.9 1.7l2.1 2.1 4.2 4.2c1.1 1.4 1.7 3.1 1.7 4.9s-0.6 3.5-1.7 4.9l-4.2 4.2-2.1 2.1c-1.4 1.1-3.1 1.7-4.9 1.7z'/%3E%3C/svg%3E");
    background-size: 40px 40px;
}
`;

export default function ModalScreen() {
    const router = useRouter();
    // State to control visibility for the sandbox preview
    const [isVisible, setIsVisible] = useState(true);
    const [key, setKey] = useState(0); // Key to force re-render/restart animation

    const handleNavigateAndDismiss = () => {
        // Calls the official navigation action (simulated here)
        router.dismissAll();
        // Hide the component in the simulation to show the effect
        setIsVisible(false);
    };

    // Reset function for the simulation environment
    if (!isVisible) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
                <p className="text-gray-600 mb-6 text-lg">
                    Modal dismissed. Click reset to see the animation again.
                </p>
                <button
                    onClick={() => { setIsVisible(true); setKey(k => k + 1); }}
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                    Reset Modal
                </button>
            </div>
        );
    }

    return (
        // Modal content
        <>
            <style>{globalStyles}</style>

            {/* Apply the scribble background class */}
            <div className="scribble-bg min-h-screen w-full flex items-center justify-center p-4">
                <div key={key} className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-xl flex flex-col items-center">

                    {/* The Jumping Text - Dark Blue and Centered */}
                    <h1
                        className="jumping-text text-5xl font-extrabold mb-16 text-center"
                        style={{ color: '#00008B', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >
                        THIS IS THE BEST CALORIE TRACKER
                    </h1>

                    {/* Dismiss Button */}
                    <button
                        onClick={handleNavigateAndDismiss}
                        className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg
                                   transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Go back to tracker
                    </button>
                </div>
            </div>
        </>
    );
}
