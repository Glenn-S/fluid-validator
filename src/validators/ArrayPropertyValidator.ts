import { BasePropertyValidator } from './BasePropertyValidator';

export type ArrayValidator<Key extends string, Context> = ArrayPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, any[], Context>;

export class ArrayPropertyValidator<PropKey extends string, Context>
  extends BasePropertyValidator<PropKey, any[], Context>
{
  constructor(property: PropKey, value: any[], context: Context) {
    super(property, value, context);
  }

  public isEmpty(message?: string): ArrayPropertyValidator<PropKey, Context> {
    if (this.value.length !== 0) {
      this.validationErrors.push({
        error: 'isEmpty',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: message,
      });
    }
    return this;
  }
}
