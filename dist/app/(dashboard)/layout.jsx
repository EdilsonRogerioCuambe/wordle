"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Layout(_a) {
    var children = _a.children;
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2 md:px-0 px-8">
      {children}
    </div>);
}
exports.default = Layout;
