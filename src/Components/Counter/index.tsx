import { useState, useEffect, useRef } from 'react';

const Counter = () => {
    const [counter, setCounter] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            // Start the counter
            intervalRef.current = setInterval(() => {
                setCounter(prev => prev + 1);
            }, 1000);
        } else {
            // Clear the interval if not stopped
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        // Cleanup to avoid the memory leak
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Start/Pause
    const toggleCounter = () => {
        setIsRunning(prev => !prev);
    };

    // Reset the counter
    const resetCounter = () => {
        setCounter(0);
        setIsRunning(false);
    };

    return (
        <div className='counter-wrapper'>
            <h1>{counter}</h1>
            <button onClick={toggleCounter}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetCounter}>Reset</button>
        </div>
    );
};

export default Counter;
