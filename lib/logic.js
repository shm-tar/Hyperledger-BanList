'use strict';
/**
 * Sample transaction processor function.
 * @param {org.example.mynetwork.RegisterBannedPerson} person The sample transaction instance.
 * @transaction 
 */
async function registerBannedPerson(person) {
  var airline = getCurrentParticipant();
  var factory = getFactory();
  return getAssetRegistry("org.example.mynetwork.BannedPerson")
  .then(function(postAssetRegistry) {
      var pId = getRandomId();
      newPost = factory.newResource("org.example.mynetwork", "BannedPerson", pId);
      newPost.description = person.description;
      newPost.airlineThatBanned = person.airlineThatBanned;
      newPost.passportId = person.passportId;
      newPost.firstName = person.firstName;
      newPost.lastName = person.lastName;
      newPost.nationality = person.nationality;
      newPost.address = person.address;
      newPost.banDatetime = person.banDatetime;
      newPost.ban = person.ban;
      newPost.banDuration = person.banDuration;

      return postAssetRegistry.add(newPost);
  })
}

function getRandomId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}
