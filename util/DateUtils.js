const padNumber = (number) => {
    if (number < 10) {
        return `0${number}`;
    }

    return number;
};

module.exports = {

    formatDate(date = new Date()) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.getMonth().toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}