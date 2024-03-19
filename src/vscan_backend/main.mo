import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

actor {
  type ProductEntry = {
    id : Text;
    caseIds : [Text];
  };

  var products = TrieMap.TrieMap<Text, ProductEntry>(Text.equal, Text.hash);

  public shared func createProductEntry(args : ProductEntry) : async () {
    products.put(args.id, args);
  };

  public shared query func getProductEntry(id : Text) : async Result.Result<ProductEntry, Text> {
    switch (products.get(id)) {
      case (null) {
        return #err("Product entry not found");
      };
      case (?productEntry) {
        return #ok(productEntry);
      };
    };
  };

  public shared query func getAllProductEntries() : async [ProductEntry] {
    return Iter.toArray(products.vals());
  };
};
