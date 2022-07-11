import { Commands, CommandValidator } from './commands/index.js';

const form = document.querySelector('form');
const input = form?.querySelector('input');
const button = form?.querySelector('button');

const errorPanel = document.querySelector('span');

form?.addEventListener('submit', event => {
    event.preventDefault();

    const message = input?.value;
    const error = process(message)

    if (error) {
        displayError(error);
        return;
    }

    clearError();
})

/** Prevent inputs to begin with space */
input?.addEventListener('keypress', event => {
    if (event.code !== 'Space' || !!input.value.trim())
        return true;

    event.preventDefault();
    return false;
})

/** Disable button if there's nothing written on input field */
input?.addEventListener('input', () => {
    if (!button) return;

    button.disabled = !input.value.trim();
});

/**
 * Displays an error message to the user
 *
 * @param {string=} message - error message to display
 */
export const displayError = (message) => {
    errorPanel.innerText = message;
    errorPanel?.classList.add('error')

}

/** Remove the error message */
export const clearError = () => {
    errorPanel.innerText = '';
    errorPanel?.classList.remove('error')
}

/**
 * Process the user input
 *
 * @param {string=} message - user input
 * @returns {string=}
 */
export const process = (message) => {
    if (!message) return;
    const [command, args] = message.split(' ')
            .map(value => value.trim().toUpperCase());

    if (!command) return;
    if (!CommandValidator(command)) return `"${command}" não é um comando valido`;

    const error = Commands[command](args);
    if (error) return error;
}
