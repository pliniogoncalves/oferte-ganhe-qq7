const Profile = require('../models/Profile');

//Insert new Profile
async function insertProfile(name) {
  try{
    const newProfile = await Profile.create({ name_profile: name });
    return newProfile;
  }catch(err){
    console.error('Error inserting profile:', err);
    throw err;
  }
}

//View all Profiles
async function searchProfile() {
  try{
    const profiles = await Profile.findAll();
    return profiles;
  }catch(err){
    console.error('Error querying Profiles:', err);
    throw err;
  }
}

//Search Profile by name
async function searchProfileName(name) {
  try{
    const profile = await Profile.findOne({ where: { name_profile: name } });
    return profile;
  }catch(err){
    console.error('Error searching for Profile by name:', err);
    throw err;
  }
}

//Edit Profile
async function editProfile(newName, name) {
  try{
    const [updated] = await Profile.update(
      { name_profile: newName },
      { where: { name_profile: name } }
    );

    if(updated){
      const updatedProfile = await Profile.findOne({ where: { name_profile: newName } });
      return updatedProfile;
    }
    throw new Error('Profile not found');
  }catch(err){
    console.error('Error editing profile:', err);
    throw err;
  }
}

//Remove Profile
async function removeProfile(name) {
  try{
    const deleted = await Profile.destroy({ where: { name_profile: name } });
    return deleted > 0;
  }catch(err){
    console.error('Error deleting Profile:', err);
    throw err;
  }
}

//Function counts all profiles
async function countProfiles() {
  try {
      const count = await Profile.count();
      return count;
  } catch (err) {
      console.error('Error counting profiles:', err);
      throw err;
  }
}

module.exports = {
  insertProfile,
  searchProfile,
  searchProfileName,
  editProfile,
  removeProfile,
  countProfiles
};
