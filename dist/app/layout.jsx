"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
var google_1 = require("next/font/google");
require("./globals.css");
var react_hot_toast_1 = require("react-hot-toast");
var inter = (0, google_1.Inter)({ subsets: ['latin'] });
exports.metadata = {
    title: 'Adivinhe a Palavra',
    description: 'Tente adivinhar a palavra secreta!',
    icons: {
        icon: '/favicon.ico',
    },
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="pt">
      <body className={"".concat(inter.className, " bg-[#333333] text-[#f5f5f5]")}>
        {children}
        <react_hot_toast_1.Toaster position="top-center"/>
      </body>
    </html>);
}
exports.default = RootLayout;
