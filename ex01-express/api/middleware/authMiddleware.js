const isAuthenticated = async (req, res, next) => {
  console.debug("DEBUG: Entering isAuthenticated middleware");
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.debug("DEBUG: No authorization header");
    return res.status(401).send("Unauthorized");
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    console.debug("DEBUG: No token in authorization header");
    return res.status(401).send("Unauthorized");
  }

  const blacklistedToken = await req.context.models.BlacklistedToken.findOne({
    where: { token },
  });

  if (blacklistedToken) {
    console.debug("DEBUG: Token is blacklisted");
    return res.status(401).send("Unauthorized: Token is blacklisted");
  }

  if (!req.context.me) {
    console.debug("DEBUG: No user in context");
    return res.status(401).send("Unauthorized");
  }

  console.debug("DEBUG: Exiting isAuthenticated middleware");
  next();
};

const isResourceOwner = (resourceModel) => async (req, res, next) => {
  console.debug("DEBUG: Entering isResourceOwner middleware");
  const resource = await req.context.models[resourceModel].findByPk(
    req.params.userId || req.params.messageId
  );

  if (!resource) {
    console.debug("DEBUG: Resource not found");
    return res.sendStatus(404);
  }

  if (resource.userId && resource.userId !== req.context.me.id) {
    console.debug("DEBUG: User is not the owner of the resource");
    return res.status(403).send("Forbidden");
  }

  // For user resource, check if the resource ID matches the logged-in user's ID
  if (resourceModel === "User" && resource.id !== req.context.me.id) {
    console.debug("DEBUG: User is not the owner of the resource");
    return res.status(403).send("Forbidden");
  }

  req.resource = resource; // Attach the resource to the request for later use
  console.debug("DEBUG: Exiting isResourceOwner middleware");
  next();
};

export { isAuthenticated, isResourceOwner };
