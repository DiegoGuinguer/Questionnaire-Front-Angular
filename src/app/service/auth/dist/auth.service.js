"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this._auth = false;
        this._Id = null;
        this.baseURL = sessionStorage.getItem('baseUrl');
    }
    Object.defineProperty(AuthService.prototype, "Id", {
        get: function () {
            return this._Id;
        },
        set: function (value) {
            this._Id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "auth", {
        get: function () {
            return this._auth;
        },
        set: function (value) {
            this._auth = value;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.verificarCredenciales = function (credenciales) {
        return this.http.post(this.baseURL + "/login", credenciales);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
