const express = require("express");
const router = express.Router();

router.get("/", (_: any, res: any) => {
  res.send("v1.0.0");
  res.end();
});

require("./modules/hello/route")(router);
require("./modules/auth/route")(router);
require("./modules/note/route")(router);
require("./modules/event/route")(router);
require("./modules/user/route")(router);
require("./modules/user/invite/route")(router);
require("./modules/company/route")(router);
require("./modules/note/tag/route")(router);
require("./modules/notelink/route")(router);

module.exports = router;
