export default function formatDate(value) {
    const date = new Date(parseInt(value));
    const dateNow = new Date();
    const yearsDif = dateNow.getFullYear() - date.getFullYear();
    if (yearsDif === 0) {
        const daysDif = dateNow.getDay() - date.getDay();
        if (daysDif === 0) {
            const hoursDif = dateNow.getHours() - date.getHours();
            if (hoursDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) return "1 min ago";
                if (minutesDif >= 5 && minutesDif < 10) return "5 mins ago";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 mins ago";
                }
                return "30 mins ago";
            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }
        return `${date.getDay()}:${date.toString("default", { month: "long" })}`;
    }
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}
