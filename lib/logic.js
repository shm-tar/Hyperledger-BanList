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
      newPost.description = person.bannedPersonId + ", " + person.ban + ", " + person.banDuration;
      newPost.airlineThatBanned = airline;

      return postAssetRegistry.add(newPost);
  })
}

function getRandomId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}
