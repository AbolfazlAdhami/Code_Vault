import "reflect-metadata";
import { MetadataKeys } from "./MetaDatKeys";
import { RequestHandler } from "express";

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, des: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
