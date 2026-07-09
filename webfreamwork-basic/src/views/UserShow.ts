import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <h1>User Show</h1>
      <p>Name: ${this.model.get("name")}</p>
      <p>Age: ${this.model.get("age")}</p>
    `;
  }
}
