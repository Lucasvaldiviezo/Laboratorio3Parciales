var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal;
(function (Animal) {
    var Pajaro = /** @class */ (function (_super) {
        __extends(Pajaro, _super);
        function Pajaro(nombre, tipo) {
            var _this = _super.call(this, nombre) || this;
            _this.tipo = tipo;
            return _this;
        }
        return Pajaro;
    }(Animal.Mascotas));
    Animal.Pajaro = Pajaro;
})(Animal || (Animal = {}));
