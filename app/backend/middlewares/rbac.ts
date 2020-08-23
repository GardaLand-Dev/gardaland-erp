/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable no-console */
/**
 * RBAC middleware module
 */
/**
 * INITIALIZING
 */
// TODO: change privileges name to scope

import { Response, NextFunction, Request } from 'express';
import AsyncLock from 'async-lock';
import {
  Operation,
  Resource,
  Privilege,
  Role,
  User,
  dbInit,
} from '../db/models';
import { JwtRequest } from './authCheck';
import { unauthorizedRequest } from '../controllers/common/service';

export type RBACInitConf = {
  roles: Array<{
    name: string;
    privileges: Array<string | undefined>;
  }>;
};

const privilegeValidator = new RegExp('((\\w)+\\/(\\w)+)+:\\w+');

/**
 *  TODO: either a constant or get from the DB
 */
const defaultInitConf: RBACInitConf = {
  roles: [
    {
      name: 'rbac_admin',
      privileges: [
        'rbac/resource:view',
        'rbac/resource:create',
        'rbac/resource:update',
        'rbac/resource:delete',
        'rbac/operation:view',
        'rbac/operation:create',
        'rbac/operation:update',
        'rbac/operation:delete',
        'rbac/role:view',
        'rbac/role:create',
        'rbac/role:update',
        'rbac/role:delete',
        'rbac/user:view',
        'rbac/user:create',
        'rbac/user:update',
        'rbac/user:delete',
        'rbac/roleuser:view',
        'rbac/roleuser:create',
        'rbac/roleuser:delete',
      ],
    },
  ],
};
export const createPrivilege = async (privilegeName: string) => {
  if (!privilegeName) throw new Error('privilege name cant be null');
  if (privilegeValidator.test(privilegeName))
    throw new Error(
      'Wrong privilege format. Should be "feature/resource:operation"'
    );
  const [rs] = await Resource.findOrBuild({
    where: { name: privilegeName?.split(':')[0] },
    defaults: { name: privilegeName?.split(':')[0] },
  });

  // console.log('logging resource: ', isc, rs.name);
  const [op] = await Operation.findOrBuild({
    where: { name: privilegeName?.split(':')[1] },
    defaults: { name: privilegeName?.split(':')[1] },
  });

  return rs
    .save()
    .then(() => op.save())
    .then(() =>
      Privilege.findOrCreate({
        where: { name: privilegeName },
        defaults: {
          name: privilegeName,
          resourceId: rs.id,
          operationId: op.id,
        },
      }).then((privData) => privData[0])
    );
};

export const createPrivilegeByIds = async (
  resourceId: string,
  operationId: string
): Promise<import('../db/models/privilege/type').Privilege> => {
  if (!resourceId || !operationId) throw new Error('Ids cant be null');

  const rs = await Resource.findByPk(resourceId);
  const op = await Operation.findByPk(operationId);
  if (!rs || !op) throw new Error('couldnt find resourceid or operationid');

  return Privilege.findOrCreate({
    where: { operationId, resourceId },
    defaults: { resourceId, operationId, name: `${rs.name}:${op.name}` },
  }).then((priv): import('../db/models/privilege/type').Privilege => {
    if (!priv[1]) throw new Error('Privilege already exists');
    return priv[0];
  });
};

export const rbacInit = async (
  dbInitiator = dbInit,
  initConf = defaultInitConf
) => {
  await dbInitiator();
  console.log('db initiated');
  /**
   * deconstracting initConf to get operations, resources, privileges and roles
   */

  /**
   * operations and resources and privs
   */
  initConf.roles.forEach(async (role) => {
    const [rl] = await Role.findOrCreate({
      where: { name: role.name },
      defaults: { name: role.name },
    });
    const lock = new AsyncLock();

    role.privileges.forEach(async (priv) => {
      await lock.acquire('role-privs', async () => {
        if (priv && privilegeValidator.test(priv)) {
          const [rs] = await Resource.findOrBuild({
            where: { name: priv?.split(':')[0] },
            defaults: { name: priv?.split(':')[0] },
          });

          // console.log('logging resource: ', isc, rs.name);
          const [op] = await Operation.findOrBuild({
            where: { name: priv?.split(':')[1] },
            defaults: { name: priv?.split(':')[1] },
          });

          await rs
            .save()
            .then(() => op.save())
            .then(() =>
              Privilege.findOrCreate({
                where: { name: priv },
                defaults: { name: priv, resourceId: rs.id, operationId: op.id },
              })
            )
            .then(([prv]) => rl.addPrivilege(prv))
            // .then(() => rl.save())
            .catch((err) =>
              console.log('cant create one of [Resource, Privlege, Role]', err)
            );
        }
      });
    });

    await lock.acquire('role-privs', async () => {
      await rl.save();
      /* DEFAULT USER */
      await User.findOrCreate({
        where: { userName: 'ADMIN' },
        defaults: {
          userName: 'ADMIN',
          password: 'ADMIN',
        },
      })
        .then(async (userData) => {
          if (!(await userData[0].hasRole(rl))) {
            await userData[0].addRole(rl);
          }
          return userData[0].save();
        })
        .catch((err) => console.log('cant create user or find', err));
    });
    console.timeLog('rbac');
  });

  /**
   * Roles
   */

  // initConf.roles.forEach((role) => {
  //   const { name } = role;
  //   const privs = [];
  //   role.privileges.forEach((priv) => {
  //     Privilege.findOne({ where: { name: priv } })
  //       .then((privdata) => {
  //         privs.push(privdata?.id);
  //         return privdata;
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // });
};

// export rbacInit;
type Options = {
  checkAllScopes?: boolean;
  failWithError?: boolean;
};

// TODO: User isnt a string, figure wat it is and fix it
export const checkRole = async (
  user: any,
  scopes: string[] | string,
  checkAll: boolean
): Promise<boolean> => {
  const userprivs = await User.findOne({
    where: { id: user.id },
    include: {
      model: Role,
      include: [Privilege],
    },
  })
    .then((userData) => {
      if (!userData || !userData.roles)
        throw new Error('Couldnt get user or roles');
      const privilegesData: any = {};
      userData.roles.forEach((roleData) => {
        privilegesData[roleData.name] = 1;
      });
      return privilegesData;
    })
    .catch((err) => console.log(err));

  if (checkAll) {
    return typeof scopes === 'string'
      ? userprivs[scopes] !== undefined
      : scopes.every((scope) => userprivs[scope] !== undefined);
  }
  let result = false;
  let i = 0;
  while (!result && i < scopes.length) {
    result = userprivs[scopes[i]] !== undefined;
    i += 1;
  }
  return result;
};

// using similar setup to https://github.com/auth0/express-jwt-authz
export const getAuthChecker = (
  scopes: Array<string> | string,
  options: Options = { failWithError: false, checkAllScopes: false }
) => {
  const checkAllScopes: boolean = options.checkAllScopes
    ? options.checkAllScopes
    : false;
  const failWithError: boolean = options.failWithError
    ? options.failWithError
    : false;
  if (failWithError) {
    // TODO: return another function pass the err throgh the res/req
    console.log('fail');
  }
  return (req: Request, res: Response, next: NextFunction) => {
    const myreq: JwtRequest = req;
    if (!myreq.auth) return unauthorizedRequest(res);
    return (
      checkRole(myreq.auth, scopes, checkAllScopes)
        // eslint-disable-next-line promise/no-callback-in-promise
        .then(next)
        .catch(() => unauthorizedRequest(res))
    );
  };
};
