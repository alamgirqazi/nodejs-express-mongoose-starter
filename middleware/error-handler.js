  module.exports = (req, res, next) => {
    const error = {
      status: 404,
      message: 'This URL doesnot exists'
    }
    next(error);
};