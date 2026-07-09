import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-name": this.onSetNameClick,
      "click:.set-age": this.onSetAgeClick,
      "click:.save-model": this.onSaveClick,
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector(".set-name") as HTMLInputElement;
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    const input = this.parent.querySelector(".set-age") as HTMLInputElement;
    if (input) {
      const age = parseInt(input.value);
      this.model.set({ age });
    }
  };

  template(): string {
    return `
        <div>
        <input placeholder="Name" class="${this.model.get("name")}" />
        <input placeholder="Age" class="${this.model.get("age")}" />
        <button class="set-name">Change Name</button>
        </div>
        `;
  }
}
