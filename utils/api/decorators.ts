import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { ZodError, ZodTypeAny } from "zod";
import { HttpError } from "../../lib/error/errors";
import { ApiController } from "./ApiController";

export function Api(controller: typeof ApiController): typeof ApiController["handler"] {
  return controller.handler.bind(controller);
}

const argsMetadataKey = Symbol("args");

export const Req: ParameterDecorator = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
): void => {
  const parameterTypes: any[] = Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
  parameterTypes[parameterIndex] = Req;
  Reflect.defineMetadata(argsMetadataKey, parameterTypes, target, propertyKey);
};

export const Res: ParameterDecorator = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => {
  const parameterTypes: any[] = Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
  parameterTypes[parameterIndex] = Res;
  Reflect.defineMetadata(argsMetadataKey, parameterTypes, target, propertyKey);
};

export const Body: ParameterDecorator = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => {
  const parameterTypes: any[] = Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
  parameterTypes[parameterIndex] = Body;
  Reflect.defineMetadata(argsMetadataKey, parameterTypes, target, propertyKey);
};

interface MethodDecoratorOptions {
  bodySchema: ZodTypeAny;
}

export const Method = (options?: MethodDecoratorOptions) => (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void => {
  const bodySchema = options?.bodySchema;

  const targetMethod = descriptor.value;

  if (typeof targetMethod === "function") {
    descriptor.value = async function (req: NextApiRequest, res: NextApiResponse) {
      try {
        if (bodySchema) {
          bodySchema.parse(req.body);
        }

        const parameterTypes: any[] =
          Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
        const mappedArgs = mapTypesToArgs(req, res, parameterTypes);
        await targetMethod.apply(this, mappedArgs);
      } catch (err) {
        apiErrorHandler(err, res);
      }
    };
  }
};

const mapTypesToArgs = (req: NextApiRequest, res: NextApiResponse, parameterTypes: any[]) => {
  return parameterTypes.map((type) => {
    if (type.name === "Req") {
      return req;
    }
    if (type.name === "Res") {
      return res;
    }
    if (type.name === "Body") {
      return req.body;
    }
  });
};

const apiErrorHandler = (err: unknown, res: NextApiResponse) => {
  if (err instanceof Error) {
    console.log(`[ERROR] ${err.message}`);
  } else {
    console.log(`[ERROR] ${JSON.stringify(err)}`);
  }

  if (err instanceof ZodError) {
    res.status(400);
    res.json({
      errorCode: "ERR_INVALID_PARAMS",
      message: err.message,
    });
  } else if (err instanceof HttpError) {
    res.status(err.httpCode);
    res.json({
      errorCode: err.errorCode,
      message: err.message,
    });
  } else {
    res.status(500);
    res.json({
      message: "Unknown error",
    });
  }

  res.end();
};
