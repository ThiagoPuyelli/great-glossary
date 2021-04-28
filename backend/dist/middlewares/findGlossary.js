"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (id) {
    return function (req, res, next) {
        var glossaryIndex;
        for (var i in req.body.user.glossaries) {
            if (req.body.user.glossaries[i]._id == req.params[id]) {
                glossaryIndex = i;
            }
        }
        if (!glossaryIndex)
            res.json({ error: "El glosario no existe" });
        req.body.glossaryIndex = glossaryIndex;
        next();
    };
});
