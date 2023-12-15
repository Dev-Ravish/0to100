/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  if(transactions.length == 0){
    return []
  }
  let result =[{
    "category" : transactions[0]["category"],
    "totalSpent" : transactions[0]["price"]
  }];

  for(let i=1; i<transactions.length; i++){
    let flag=true;
    for(let j=0; j<result.length; j++){
      if(result[j]["category"] == transactions[i]["category"]){
        result[j]["totalSpent"] += transactions[i]["price"];
        flag = false;
        break;
      }
    }

    if(flag){
      result.push({
        "category" : transactions[i]["category"],
        "totalSpent" : transactions[i]["price"]
      })
    }
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
