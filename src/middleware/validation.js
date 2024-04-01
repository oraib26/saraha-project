
const dataMethods =['body', 'query', 'headers', 'params'];

const validation = (schema) => {

  return (req, res, next) => {
    const vaidationArray = [];
    dataMethods.forEach(key=>{
        if(schema[key]){
            const validationResult = schema[key].validate(req[key], {
                abortEarly: false,
              });
              if (validationResult.error) {
                vaidationArray.push(validationResult.error)
              }

        }
    });
    if(vaidationArray.length > 0){
        res.status(400).json({message:'vaidation error', vaidationArray})
    }

    next();
  };
};

export default validation;
