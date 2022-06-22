"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuariosModule = void 0;
var common_1 = require("@nestjs/common");
var usuarios_service_1 = require("../service/usuarios.service");
var usuarios_controller_1 = require("../controllers/usuarios.controller");
var UsuariosModule = /** @class */ (function () {
    function UsuariosModule() {
    }
    UsuariosModule = __decorate([
        (0, common_1.Module)({
            controllers: [usuarios_controller_1.UsuariosController],
            providers: [usuarios_service_1.UsuariosService]
        })
    ], UsuariosModule);
    return UsuariosModule;
}());
exports.UsuariosModule = UsuariosModule;
