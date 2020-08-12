import { Application } from 'express';
import { getAuthChecker } from '../middlewares/rbac';
import UserController from '../controllers/rbac/userController';
import RoleController from '../controllers/rbac/roleController';
import PrivilegeController from '../controllers/rbac/privilegeController';
import ResourceController from '../controllers/rbac/resourceController';
import OperationController from '../controllers/rbac/operationController';

export default class RBACRoutes {
  public static route(app: Application) {
    // FIXME: the controller should be choosen depending on the scope which should be given in the request

    /**
     * USERS
     */
    app.get(
      '/api/rbac/user',
      getAuthChecker('rbac/user:view'),
      UserController.getUser
    );
    app.post(
      '/api/rbac/user',
      getAuthChecker('rbac/user:create'),
      UserController.createUser
    );
    app.put(
      'api/rbac/user',
      getAuthChecker('rbac/user:update'),
      UserController.updateUser
    );
    app.delete(
      'api/rbac/user',
      getAuthChecker('rbac/user:delete'),
      UserController.deleteUser
    );

    /**
     *  ROLES
     */

    app.get(
      '/api/rbac/role',
      getAuthChecker('rbac/role:view'),
      RoleController.getRole
    );
    app.post(
      '/api/rbac/role',
      getAuthChecker('rbac/role:create'),
      RoleController.createRole
    );
    app.put(
      'api/rbac/role',
      getAuthChecker('rbac/role:update'),
      RoleController.updateRole
    );
    app.delete(
      'api/rbac/role',
      getAuthChecker('rbac/role:delete'),
      RoleController.deleteRole
    );

    /**
     * PRIVILEGES
     */

    app.get(
      '/api/rbac/privilege',
      getAuthChecker('rbac/privilege:view'),
      PrivilegeController.getPrivilege
    );
    app.post(
      '/api/rbac/privilege',
      getAuthChecker('rbac/privilege:create'),
      PrivilegeController.createPrivilege
    );
    app.put(
      'api/rbac/privilege',
      getAuthChecker('rbac/privilege:update'),
      PrivilegeController.updatePrivilege
    );
    app.delete(
      'api/rbac/privilege',
      getAuthChecker('rbac/privilege:delete'),
      PrivilegeController.deletePrivilege
    );

    /**
     * RESOURCES
     */

    app.get(
      '/api/rbac/resource',
      getAuthChecker('rbac/resource:view'),
      ResourceController.getResource
    );
    app.post(
      '/api/rbac/resource',
      getAuthChecker('rbac/resource:create'),
      ResourceController.createResource
    );
    app.put(
      'api/rbac/resource',
      getAuthChecker('rbac/resource:update'),
      ResourceController.updateResource
    );
    app.delete(
      'api/rbac/resource',
      getAuthChecker('rbac/resource:delete'),
      ResourceController.deleteResource
    );

    /**
     * OPERATIONS
     */

    app.get(
      '/api/rbac/operation',
      getAuthChecker('rbac/operation:view'),
      OperationController.getOperation
    );
    app.post(
      '/api/rbac/operation',
      getAuthChecker('rbac/operation:create'),
      OperationController.createOperation
    );
    app.put(
      'api/rbac/operation',
      getAuthChecker('rbac/operation:update'),
      OperationController.updateOperation
    );
    app.delete(
      'api/rbac/operation',
      getAuthChecker('rbac/operation:delete'),
      OperationController.deleteOperation
    );
  }
}
