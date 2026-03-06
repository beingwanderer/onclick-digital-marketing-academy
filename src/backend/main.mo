import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type Lead = {
    fullName : Text;
    phoneNumber : Text;
    emailAddress : Text;
    purpose : Text;
    timestamp : Time.Time;
  };

  module Lead {
    public func compareByTimestamp(lead1 : Lead, lead2 : Lead) : Order.Order {
      Int.compare(lead1.timestamp, lead2.timestamp);
    };
  };

  let leads = List.empty<Lead>();

  public shared ({ caller }) func submitLead(fullName : Text, phoneNumber : Text, emailAddress : Text, purpose : Text) : async () {
    let newLead : Lead = {
      fullName;
      phoneNumber;
      emailAddress;
      purpose;
      timestamp = Time.now();
    };
    leads.add(newLead);
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.toArray().reverse();
  };
};
