var faker = require("faker");

var database = {
  products: [],
  categories: [],
  carts: [],
  users: [],
  students: []
};

for (var i = 1; i <= 100; i++) {
  database.students.push({
    id: i,
    name: faker.name.findName(),
    external_id: faker.random.number(4),
    grade: faker.random.arrayElement([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]),
    arrival_location: faker.address.city(),
    dismissal_location: faker.address.city(),
    family_carpool: faker.random.number(3),
    dismissal_default: faker.random.arrayElement(['abc', 'xyz', 'def', 'mno', 'zzz']),

  });
}

for (var i = 1; i <= 200; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(100, 999, 2),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number(),
  });
}

for (var i = 1; i <= 50; i++) {
  database.categories.push({
    id: i,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  });
}

database.carts.push({
  id: 1,
  userid: 2,
  products: [],
});

database.carts.push({
  id: 2,
  userid: 1,
  products: [],
});

database.users.push({
  id: "1",
  username: "admin",
  email: "admin@3pillarglobal.com",
  isadmin: true,
});

database.users.push({
  id: "2",
  username: "sunil",
  email: "sunil@3pillarglobal.com",
  isadmin: false,
});

console.log(JSON.stringify(database));