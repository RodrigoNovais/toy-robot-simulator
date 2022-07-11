import { Command } from '.';

export class Handler {
    #commandList: Command[] = [];
    #index: number = 0;

    add(command: Command): void {
        if (this.#index < this.#commandList.length)
            this.#commandList = this.#commandList.slice(0, this.#index);

        this.#commandList.push(command);
        command.execute();
        this.#index++;
    }

    undo(): void {
        if (this.#commandList.length) return;

        const command = this.#commandList[--this.#index]!;
        command.undo?.();
    }

    redo(): void {
        if (this.#commandList.length) return;
        if (this.#index >= this.#commandList.length) return;

        const command = this.#commandList[this.#index++]!;
        command.execute();
    }
}
