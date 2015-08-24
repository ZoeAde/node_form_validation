var express = require('express');
var router = express.Router();
var puppyArray = [];
var personArray = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/dog', function(req, res, next) {
  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;

  var errors = puppyValidationCheck(puppyInputName, puppyInputID);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  }
  else {
    puppyArray.push({
      name: req.body.puppyName,
      id: req.body.puppyID
    });
    res.render('dog', {
      puppies: puppyArray,
      success: "The puppy was saved successfully!"
    });
  }
});

router.post('/people', function(req, res, next) {
  var personInputName = req.body.personName;
  var personInputHobby = req.body.personHobby;

  var errors = personValidationCheck(personInputName, personInputHobby);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  }
  else {
    personArray.push({
      name: req.body.personName,
      hobby: req.body.personHobby
    });
    res.render('people', {
      people: personArray,
      success: "The person was saved successfully!"
    });
  }
});

function puppyValidationCheck(puppyName, puppyID) {
  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyIDTrimmed = puppyID.trim();

//puppy name validations
  if(puppyNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

//puppy id validations
  if(puppyIDTrimmed === '') {
    errorArray.push('ID cannot be blank.');
  } else if (puppyIDTrimmed.length < 3) {
    errorArray.push('An ID must be at least 3 characters long.');
  }
  return errorArray;
}

function personValidationCheck(personName, personHobby) {
  console.log(personName);
  console.log(personHobby);
  var errorArray = [];
  var personNameTrimmed = personName.trim();
  var personHobbyTrimmed = personHobby.trim();

//person name validations
  if(personNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

//person id validations
  if(personHobbyTrimmed === '') {
    errorArray.push('ID cannot be blank.');
  } else if (personHobbyTrimmed.length < 3) {
    errorArray.push('A hobby must be at least 3 characters long.');
  }
  return errorArray;
}


module.exports = router;
