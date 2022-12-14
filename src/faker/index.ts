
// import faker from "faker";
// import  faker  from 'faker/locale/zh_CN';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { SchemaWithoutRef } from "../_types_/common";
import { mapValues, isArray } from "lodash";
import {formatDate} from '../utils'
faker.locale = 'zh_CN'

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
// const dateTimeGenerator = () => faker.date.past().toISOString();
// const dateGenerator = () => dateTimeGenerator().slice(0, 10);
// const timeGenerator = () => dateTimeGenerator().slice(11);
// const urlGenerator = () => faker.internet.url();
// const ipv4Generator = () => faker.internet.ip();
// const emailGenerator = () => faker.internet.email();

/**
 * @description: type => string
 * date yyyy/MM/dd
 * date-time yyyy/MM/dd hh:mm:ss
 */
const strGenerator = {
  'date': () => formatDate(faker.date.past(), 'yyyy/MM/dd'),
  'date-time': () => formatDate(faker.date.past(), 'yyyy/MM/dd hh:mm:ss'),
  'email': () => faker.internet.email(),
  'url': () => faker.internet.url(),
  'ipv4': () => faker.internet.ip()
}


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
    const types = ['date', 'date-time', 'email', 'url']
    if(types.includes(schema.format)) {
      return strGenerator[schema.format]?.()
    }

    if (schema.format === 'enum' || schema.enum) {
      return stringGenerator(schema.enum);
    }

    return stringGenerator();
  }

  return null;
};
