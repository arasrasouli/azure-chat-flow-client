export const formatTime = (date: Date): string =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
