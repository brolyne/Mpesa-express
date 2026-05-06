export default function getTimeStamp() {
    const date = new Date();

    const formatted = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);

    return formatted;

}