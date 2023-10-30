import Realm, { type ObjectSchema } from "realm";

class Task extends Realm.Object<Task> {
  _id!: number;
  name!: string;
  status?: string;
  owner_id?: string;

  static schema: ObjectSchema = {
    name: "Task",
    properties: {
      _id: "int",
      name: "string",
      status: "string?",
      owner_id: "string?",
    },
    primaryKey: "_id",
  };
}
// :snippet-end:

const realm = await Realm.open({
  schema: [Task],
});
// :snippet-end:

// expect(realm.isClosed).toBe(false);
console.log(`realm.isClosed: ${ realm.isClosed }`);

// Add default test object to realm.
realm.write(() => {
  realm.create(Task, {
    _id: 0,
    name: "wake up",
    status: "Open",
  });
});

// :snippet-start: find-sort-and-filter-objects
// Query for specific obect using primary key.
const specificTask = realm.objectForPrimaryKey(Task, 0);

// Query realm for all instances of the "Task" type.
const tasks = realm.objects(Task);

// Filter for all tasks with a status of "Open".
const openTasks = tasks.filtered("status = 'Open'");

// Sort tasks by name in ascending order.
const tasksByName = tasks.sorted("name");
// :snippet-end:

// expect(specificTask).toBeTruthy();
// expect(tasks.length).toBe(1);
// expect(openTasks.length).toBe(1);
// expect(tasksByName[0].name).toBe("wake up");
console.log(`specificTask: ${ JSON.stringify(specificTask, null, 2) }`);
console.log(`tasks.length: ${ tasks.length }`);
console.log(`openTasks.length: ${ openTasks.length }`);
console.log(`tasksByName[0].name: ${ tasksByName[0].name }`);


// Define the collection notification listener.
const listener = (
  tasks: Realm.OrderedCollection<Task>,
  changes: Realm.CollectionChangeSet
) => {
  if (changes.newModifications.length > 0) {
    taskHasBeenModified = true;
  }
  if (changes.deletions.length > 0) {
    taskHasBeenDeleted = true;
  }
  // Update UI in response to deleted objects.
  changes.deletions.forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
    console.log(`A task was deleted at the ${ index } index.`);
  });

  // Update UI in response to inserted objects.
  changes.insertions.forEach((index) => {
    const insertedTasks = tasks[index];
    console.log(`insertedTasks: ${ JSON.stringify(insertedTasks, null, 2) }`);
  });

  // Update UI in response to modified objects.
  // `newModifications` contains an index to the modified object's position
  // in the collection after all deletions and insertions have been applied.
  changes.newModifications.forEach((index) => {
    const modifiedTask = tasks[index];
    console.log(`modifiedTask: ${ JSON.stringify(modifiedTask, null, 2) }`);
  });
};

// Observe collection notifications.
tasks.addListener(listener);

// :snippet-start: create-modify-delete
const allTasks = realm.objects(Task);

// Add a couple of Tasks in a single, atomic transaction.
realm.write(() => {
  realm.create(Task, {
    _id: 1,
    name: "go grocery shopping",
    status: "Open",
  });

  realm.create(Task, {
    _id: 2,
    name: "go exercise",
    status: "Open",
  });
});

// expect(tasks.length).toBe(3);
// expect(openTasks.length).toBe(3);
// expect(tasksByName[0].name).toBe("go exercise");
// expect(tasksByName[1].name).toBe("go grocery shopping");
// expect(tasksByName[2].name).toBe("wake up");
console.log(`tasks.length: ${ tasks.length }`);
console.log(`openTasks.length: ${ openTasks.length }`);
console.log(`tasksByName[0].name: ${ tasksByName[0].name }`);
console.log(`tasksByName[1].name: ${ tasksByName[1].name }`);
console.log(`tasksByName[2].name: ${ tasksByName[2].name }`);

let taskHasBeenModified = false;
let taskHasBeenDeleted = false;

const task1 = allTasks.find((task) => task._id == 1);
// expect(task1).toBeTruthy();
console.log(`task1: ${ JSON.stringify(task1, null, 2) }`);
const task2 = allTasks.find((task) => task._id == 2);
// expect(task2).toBeTruthy();
console.log(`task2: ${ JSON.stringify(task2, null, 2) }`);

realm.write(() => {
  // Modify an object.
  task1!.status = "InProgress";

  // Delete an object.
  realm.delete(task2!);
});
// :snippet-end:

// expect(task1!.status).toBe("InProgress");
console.log(`task1!.status: ${ task1!.status }`);

// Wait 1 second until the collection listener has registered the
// modification and deletion events.
setTimeout(() => {
  // expect(taskHasBeenModified).toBe(true);
  // expect(taskHasBeenDeleted).toBe(true);
  console.log(`taskHasBeenModified: ${ taskHasBeenModified }`);
  console.log(`taskHasBeenDeleted: ${ taskHasBeenDeleted }`);
}, 1000);

// Clear all objects from realm.
realm.write(() => {
  realm.deleteAll();
});

// Close the realm.
realm.close();
console.log(`realm.isClosed: ${ realm.isClosed }`);