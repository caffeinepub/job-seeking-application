import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldContactInfo = {
    email : Text;
    phone : Text;
  };

  type OldCustomization = {
    bio : Text;
    contactInfo : OldContactInfo;
  };

  type OldUserProfile = {
    name : Text;
    role : {
      #employer;
      #candidate;
    };
    email : Text;
    customization : OldCustomization;
  };

  type NewCustomization = {
    bio : Text;
    contactInfo : OldContactInfo;
    profilePicture : ?Storage.ExternalBlob;
  };

  type NewUserProfile = {
    name : Text;
    role : {
      #employer;
      #candidate;
    };
    email : Text;
    customization : NewCustomization;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldUserProfile) {
        {
          oldUserProfile with
          customization = {
            oldUserProfile.customization with
            profilePicture = null;
          };
        };
      }
    );
    { userProfiles = newUserProfiles };
  };
};
