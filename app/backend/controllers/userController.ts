// import { Request, Response } from 'express';
// import {
//   insufficientParameters,
//   dbError,
//   successResponse,
//   failureResponse,
// } from '../modules/common/service';
// import { IUser } from '../modules/users/model';
// import UserService from '../modules/users/service';

// export default class UserController {
//   private user_service: UserService = new UserService();

//   public create_user(req: Request, res: Response) {
//     if (
//       req.body.name &&
//       req.body.name.first_name &&
//       req.body.name.last_name &&
//       req.body.email &&
//       req.body.phone_number &&
//       req.body.gender
//     ) {
//       const user_params: IUser = {
//         name: {
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//         },
//         email: req.body.email,
//         phone_number: req.body.phone_number,
//         gender: req.body.gender,
//         modification_notes: [
//           {
//             modified_on: new Date(Date.now()),
//             modified_by: '', // change this later
//             modification_note: 'New user created',
//           },
//         ],
//       };

//       this.user_service(user_params, (err: any, user_data: IUser) => {
//         if (err) dbError(err, res);
//         else successResponse('create user successfull', user_data, res);
//       });
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public get_user(req: Request, res: Response) {
//     if (req.params.id) {
//       const user_filter = { _id: req.params.id };
//       this.user_service.filterUser(
//         user_filter,
//         (err: any, user_data: IUser) => {
//           if (err) {
//             dbError(err, res);
//           } else {
//             successResponse('get user seccessfull', user_data, res);
//           }
//         }
//       );
//     } else {
//       insufficientParameters(res);
//     }
//   }

//   public update_user(req: Request, res: Response) {
//     if (
//       (req.params.id && req.body.name) ||
//       req.body.name.first_name ||
//       req.body.name.middle_name ||
//       req.body.name.last_name ||
//       req.body.email ||
//       req.body.phone_number ||
//       req.body.gender
//     ) {
//       const user_filter = { _id: req.params.id };
//       this.user_service.filterUser(
//         user_filter,
//         (err: any, user_data: IUser) => {
//           if (err) {
//             dbError(err, res);
//           } else if (user_data) {
//             user_data.modification_notes.push({});
//           } else {
//             failureResponse('invalid user', null, res);
//           }
//         }
//       );
//     }
//   }
// }
