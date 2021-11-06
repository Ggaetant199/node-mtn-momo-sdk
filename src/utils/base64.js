export default (string) => {
    return Buffer.from(string).toString('base64');
}
