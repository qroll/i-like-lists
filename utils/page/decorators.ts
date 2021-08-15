import cookie from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext, Redirect } from "next";
import "reflect-metadata";
import { HttpError } from "../../lib/error/errors";
import UserModel from "../../lib/models/user";
import { decryptCookie } from "../api/cookie";
import { DataFetcher } from "./DataFetcher";

export function ServerSideProps(controller: typeof DataFetcher, context: NextPageContext): any {
  const fn = new controller(context).getServerSideProps.bind(controller);
  return fn(context);
}

const argsMetadataKey = Symbol("args");

export const User: ParameterDecorator = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
): void => {
  const parameterTypes: any[] = Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
  parameterTypes[parameterIndex] = User;
  Reflect.defineMetadata(argsMetadataKey, parameterTypes, target, propertyKey);
};

interface DataDecoratorOptions {
  authRequired?: boolean;
}

export const Data = (options?: DataDecoratorOptions) => (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void => {
  const authRequired = options?.authRequired ?? false;

  const targetMethod = descriptor.value;

  if (typeof targetMethod === "function") {
    descriptor.value = async function (context: NextPageContext) {
      const { req } = context;

      try {
        const user = await verifyAndGetUser(req);

        if (authRequired && !user) {
          throw HttpError.Unauthorised();
        }

        const parameterTypes: any[] =
          Reflect.getOwnMetadata(argsMetadataKey, target, propertyKey) || [];
        const mappedArgs = mapTypesToArgs(context, parameterTypes, user);
        return await targetMethod.apply(this, mappedArgs);
      } catch (err) {
        return webErrorHandler(err, req);
      }
    };
  }
};

const verifyAndGetUser = async (req: IncomingMessage | undefined) => {
  const cookieHeader = req?.headers.cookie || "";

  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookie.parse(cookieHeader);

  if (!cookies || !cookies.session || Object.keys(cookies.session).length === 0) {
    return undefined;
  }

  const decryptedCookie = await decryptCookie(cookies.session);
  const user = await UserModel.query().findOne("id", decryptedCookie.userId);

  if (!user) {
    return undefined;
  }

  return user;
};

const mapTypesToArgs = (
  context: NextPageContext,
  parameterTypes: any[],
  user: UserModel | undefined
) => {
  return parameterTypes.map((type) => {
    if (type.name === "User") {
      return user;
    }
  });
};

const webErrorHandler = (
  err: unknown,
  req: IncomingMessage | undefined
): { redirect: Redirect } => {
  if (err instanceof Error) {
    console.log(`[ERROR] ${err.message}`);
  } else {
    console.log(`[ERROR] ${JSON.stringify(err)}`);
  }

  if (err instanceof HttpError && err.httpCode === 401) {
    return {
      redirect: {
        destination: req?.url ? `/login?redirect=${req.url}` : "/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/error`,
        permanent: false,
      },
    };
  }
};
