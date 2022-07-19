INSERT INTO department (name)
VALUES
  ("Marketing"),
  ("Sales"),
  ("Programming");

INSERT INTO role (title, salary, department_id)
VALUES
  ("Manager", 60000, 1),
  ("Pitch writer", 60000, 1),
  ("Graphics", 60000, 1),
  ("Lead Sales", 60000, 2),
  ("Sales floor", 60000, 2),
  ("Lead Engineer", 60000, 3),
  ("UX designer", 60000, 3)
  ;

  INSERT INTO employee (first_name, last_name, role_id ,manager_id)
VALUES
  ("Brian", "Reed", 2, 1),
  ("Janet", "Phillips", 2, 1),
  ("Megan", "Diaz", 2, 1),
  ("Henry", "Garcia", 2, 1),
  ("Jean", "Thomas", 2, 1),
  ("Sandra", "Lee", 2, 1);