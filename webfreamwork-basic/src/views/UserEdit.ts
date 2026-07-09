import { User, UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      "user-form": ".user-form",
      "user-show": ".user-show",
    };
  }

  onRender(): void {
    new UserForm(this.regions["user-form"], this.model).render();
    new UserShow(this.regions["user-show"], this.model).render();
  }
  template(): string {
    return `
      <div>
        <div class="user-form"></div>
        <div class="user-show"></div>
      </div>
    `;
  }
}
