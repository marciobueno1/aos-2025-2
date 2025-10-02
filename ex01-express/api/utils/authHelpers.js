const isAuthorized = (req, res) => {
  if (!req.context.me) {
    res.status(401).send("Unauthorized");
    return false;
  }
  return true;
};

const isOwner = (req, res, resource) => {
  if (resource.userId && resource.userId !== req.context.me.id) {
    res.status(403).send("Forbidden");
    return false;
  }
  if (resource.id && resource.id !== req.context.me.id) { // For user resource
    res.status(403).send("Forbidden");
    return false;
  }
  return true;
};

export { isAuthorized, isOwner };