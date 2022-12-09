import faker from "faker";
import { SchemaWithoutRef } from "__types__/common";
import { mapValues, isArray } from "lodash";

const booleanGenerator = () => faker.datatype.boolean();
const stringGenerator = (enums?: any[]) => {
  const getRandomArrayItem = (items: any[]) => items[Math.floor(Math.random() * items.length)];
  return enums ? getRandomArrayItem(enums) : faker.random.words();
};
const numberGenerator = (max?: number, min?: number) =>
  faker.datatype.number({
    min,
    max,
  });
const fileGenerator = () => faker.system.mimeType();
const dateTimeGenerator = () => faker.date.past().toISOString();
const dateGenerator = () => dateTimeGenerator().slice(0, 10);
const timeGenerator = () => dateTimeGenerator().slice(11);
const urlGenerator = () => faker.internet.url();
const ipv4Generator = () => faker.internet.ip();
const ipv6Generator = () => faker.internet.ipv6();
const emailGenerator = () => faker.internet.email();

const fixedFakeData = {
  boolean: true,
  string: "fake string",
  number: 123,
  file: "video/jpm",
  dateTime: "2020-10-17T06:27:33.963Z",
  date: "2021-04-16",
  time: "19:01:06.839Z",
  url: "https://hilda.name",
  ipv4: "10.88.109.17",
  ipv6: "b2f5:9c63:52b2:640b:0360:0e45:9451:0c82",
  email: "john@example.com",
};

const fakerObject = (schema: SchemaWithoutRef) => {
  return mapValues(schema.properties, (item) => fakeData(item));
};

const fakerArray = (schema: SchemaWithoutRef): ReturnType<any> => {
  if (isArray(schema.items)) {
    return schema.items.map((item) => fakerObject(item));
  }

  return [fakeData(schema.items!)];
};

export const fakeData = (schema: SchemaWithoutRef): ReturnType<any> => {
  if (!schema) {
    return schema;
  }

  if(schema.example) return schema.example

  if (schema.type === "object" || schema.properties) {
    return fakerObject(schema);
  }

  if (schema.type === "array") {
    return schema.items ? fakerArray(schema) : [];
  }

  if (schema.type === "boolean") {
    return booleanGenerator();
  }

  if (schema.type === "integer" || schema.type === "number") {
    return numberGenerator();
  }

  if (schema.type === "string") {
    if (schema.format === "date") {
      return dateGenerator();
    }

    if (schema.format === "time") {
      return timeGenerator();
    }

    if (schema.format === "date-time") {
      return dateTimeGenerator();
    }
    if (schema.format === "uri") {
      return urlGenerator();
    }

    if (schema.format === "ipv4") {
      return ipv4Generator();
    }

    if (schema.format === "email") {
      return emailGenerator();
    }

    if (schema.format === 'enums') {
      return stringGenerator(schema.enums);
    }

    return stringGenerator();
  }

  return null;
};

export class FakeDataGenerator {
  // constructor(private isFixed: boolean) {}

  // static of(isFixed: boolean = false) {
  //   return new FakeDataGenerator(isFixed);
  // }

  // boolean = () => {
  //   if (this.isFixed) {
  //     return fixedFakeData.boolean;
  //   }

  //   return booleanGenerator();
  // };

  // string = (enums?: any[]) => {
  //   if (this.isFixed) {
  //     return fixedFakeData.string;
  //   }

  //   return stringGenerator(enums);
  // };

  

}
