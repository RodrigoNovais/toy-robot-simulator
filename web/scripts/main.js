const form = document.querySelector('form');
const input = form?.querySelector('input');
const button = form?.querySelector('button');

form?.addEventListener('submit', event => {
    event.preventDefault();

    const message = input?.value;
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
