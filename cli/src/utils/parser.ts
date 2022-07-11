export const Parser = (message: string): [string?, string?] => {
    const [command, args] = message.split(' ')
            .map(value => value.trim());

    return [command, args];
}
