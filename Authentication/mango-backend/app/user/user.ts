export class User {
  public name: string;
  public password: string;

  constructor() {
    this.name = "";
    this.password = "";
  }

  // Method
  getFullName() {
    return `${this.name} ` + `${this.password}`;
  }
}