const isAuthenticated = (req, res, next) => {
  if (!req.context.me) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

const isResourceOwner = (resourceModel) => async (req, res, next) => {
  const resource = await req.context.models[resourceModel].findByPk(
    req.params.userId || req.params.messageId
  );

  if (!resource) {
    return res.sendStatus(404);
  }

  if (resource.userId && resource.userId !== req.context.me.id) {
    return res.status(403).send("Forbidden");
  }
  // For user resource, check if the resource ID matches the logged-in user's ID
  if (resourceModel === 'User' && resource.id !== req.context.me.id) {
    return res.status(403).send("Forbidden");
  }

  req.resource = resource; // Attach the resource to the request for later use
  next();
};

export { isAuthenticated, isResourceOwner };