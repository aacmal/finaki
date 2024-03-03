"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["IN"] = "in";
    TransactionType["OUT"] = "out";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var Interval;
(function (Interval) {
    // Daily = "daily",
    Interval["Weekly"] = "weekly";
    Interval["Monthly"] = "monthly";
})(Interval = exports.Interval || (exports.Interval = {}));
