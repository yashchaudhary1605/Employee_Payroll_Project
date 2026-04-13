const logger = (req, res, next) => {
  const logData = `${req.method} ${req.url} - ${new Date().toISOString()}`;
  console.log(logData);
  next();
};

export default logger;