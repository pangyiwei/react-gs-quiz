const mockTimer = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration)
    });
}

export default mockTimer;