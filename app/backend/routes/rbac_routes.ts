import { Application } from 'express';
import { getAuthChecker } from '../middlewares/rbac';
import UserController from '../controllers/rbac/userController';
import RoleController from '../controllers/rbac/roleController';
import PrivilegeController from '../controllers/rbac/privilegeController';
import ResourceController from '../controllers/rbac/resourceController';
import OperationController from '../controllers/rbac/operationController';
import ActivationController from '../controllers/activationController';

export default class RBACRoutes {
  public static route(app: Application) {
    // FIXME: the controller should be choosen depending on the scope which should be given in the request
    const baseroute = '/api/rbac';
    /**
     * USERS
     */
    app.get(
      `${baseroute}/user`,
      getAuthChecker('rbac/user:view'),
      UserController.getUser
    );
    app.post(
      `${baseroute}/user`,
      getAuthChecker('rbac/user:create'),
      UserController.createUser
    );
    app.put(
      `${baseroute}/user`,
      getAuthChecker('rbac/user:update'),
      UserController.updateUser
    );
    app.delete(
      `${baseroute}/user`,
      getAuthChecker('rbac/user:delete'),
      UserController.deleteUser
    );

    app.get(
      `${baseroute}/users`,
      getAuthChecker('rbac/users:view'),
      UserController.getUsers
    );
    /**
     * ROLE-USER
     */
    app.put(
      `${baseroute}/roleuser`,
      getAuthChecker('rbac/roleuser:create'),
      UserController.addRoleUser
    );
    app.delete(
      `${baseroute}/roleuser`,
      getAuthChecker('rbac/roleuser:delete'),
      UserController.deleteUser
    );

    /**
     *  ROLES
     */

    app.get(
      `${baseroute}/role`,
      getAuthChecker('rbac/role:view'),
      RoleController.getRole
    );
    app.post(
      `${baseroute}/role`,
      getAuthChecker('rbac/role:create'),
      RoleController.createRole
    );
    app.put(
      `${baseroute}/role`,
      getAuthChecker('rbac/role:update'),
      RoleController.updateRole
    );
    app.delete(
      `${baseroute}/role`,
      getAuthChecker('rbac/role:delete'),
      RoleController.deleteRole
    );

    app.get(
      `${baseroute}/roles`,
      getAuthChecker('rbac/roles:view'),
      RoleController.getRoles
    );

    /**
     * PRIVILEGES
     */

    app.get(
      `${baseroute}/privilege`,
      getAuthChecker('rbac/privilege:view'),
      PrivilegeController.getPrivilege
    );
    app.post(
      `${baseroute}/privilege`,
      getAuthChecker('rbac/privilege:create'),
      PrivilegeController.createPrivilege
    );
    app.put(
      `${baseroute}/privilege`,
      getAuthChecker('rbac/privilege:update'),
      PrivilegeController.updatePrivilege
    );
    app.delete(
      `${baseroute}/privilege`,
      getAuthChecker('rbac/privilege:delete'),
      PrivilegeController.deletePrivilege
    );

    app.get(
      `${baseroute}/privileges`,
      getAuthChecker('rbac/privileges:view'),
      PrivilegeController.getPrivileges
    );

    /**
     * RESOURCES
     */

    app.get(
      `${baseroute}/resource`,
      getAuthChecker('rbac/resource:view'),
      ResourceController.getResource
    );
    app.post(
      `${baseroute}/resource`,
      getAuthChecker('rbac/resource:create'),
      ResourceController.createResource
    );
    app.put(
      `${baseroute}/resource`,
      getAuthChecker('rbac/resource:update'),
      ResourceController.updateResource
    );
    app.delete(
      `${baseroute}/resource`,
      getAuthChecker('rbac/resource:delete'),
      ResourceController.deleteResource
    );

    app.get(
      `${baseroute}/resources`,
      getAuthChecker('rbac/resources:view'),
      ResourceController.getResources
    );

    /**
     * OPERATIONS
     */

    app.get(
      `${baseroute}/operation`,
      getAuthChecker('rbac/operation:view'),
      OperationController.getOperation
    );
    app.post(
      `${baseroute}/operation`,
      getAuthChecker('rbac/operation:create'),
      OperationController.createOperation
    );
    app.put(
      `${baseroute}/operation`,
      getAuthChecker('rbac/operation:update'),
      OperationController.updateOperation
    );
    app.delete(
      `${baseroute}/operation`,
      getAuthChecker('rbac/operation:delete'),
      OperationController.deleteOperation
    );

    app.get(
      `${baseroute}/operations`,
      getAuthChecker('rbac/operations:view'),
      OperationController.getOperation
    );
    // activation
    app.post(`${baseroute}/activation`, ActivationController.activate);
    app.post(
      `${baseroute}/checkactivation`,
      ActivationController.checkActivation
    );
  }
}
