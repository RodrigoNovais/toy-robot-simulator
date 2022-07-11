export function dedent(message: string): string {
    return message.replace(/(\n)\s+/g, '$1');
}
