import { Request } from "express";
import { User } from "src/usuarios/model/user.model";

export interface AuthRequest extends Request {
    user: User;
}