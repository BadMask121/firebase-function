// // build multiple CRUD interfaces:
// app.get("/:id", (req, res) => res.send(Widgets.getById(req.params.id)));
// app.post("/", (req, res) => res.send(Widgets.create()));
// app.put("/:id", (req, res) =>
// 	res.send(Widgets.update(req.params.id, req.body)),
// );
// app.delete("/:id", (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get("/", (req, res) => res.send(Widgets.list()));

// Expose Express API as a single Cloud Function:
