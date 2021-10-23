'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.it = exports.describe = void 0;
console.log('ciao iulia');
function describe(title, handler) {
    console.log(title);
    handler();
}
exports.describe = describe;
function it(title, handler) {
    console.log(title);
    handler();
}
exports.it = it;
//# sourceMappingURL=index.js.map