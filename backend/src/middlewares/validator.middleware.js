export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};

//error solucionado, cambiar el {messaje: [array]} por array.

//este codigo entrega un objeto y necesitaba devolver un array:
/* export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((error) => error.message) });
  }
};
 */