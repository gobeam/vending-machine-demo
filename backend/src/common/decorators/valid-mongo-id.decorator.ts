import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Types as MongooseTypes } from 'mongoose';

export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return MongooseTypes.ObjectId.isValid(value);
        },
      },
    });
  };
}
