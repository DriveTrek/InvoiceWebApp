export class GuidIDWrapperDto
 {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  toBody(): any {
    return { id: this.id };
  }
}
