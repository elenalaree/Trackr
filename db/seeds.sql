INSERT INTO department (name)
VALUES
  ("Marketing"),
  ("Sales"),
  ("Programming");

INSERT INTO job (title, salary, department_id)
VALUES
  ("Manager", 60,000, 1),
  ("Engineer", 60,000, 3),
  ("Sales floor", 60,000, 2),
  ("Graphics", 60,000, 1),
  ("UX designer", 60,000, 3),
  ("Pitch writer", 60,000, 1);

  INSERT INTO employee (first_name, last_name, job_id ,manager_id)
VALUES
  ("Brian", "Reed", 2, 1),
  ("Janet", "Phillips", 2, 1),
  ("Megan", "Diaz", 2, 1),
  ("Henry", "Garcia", 2, 1),
  ("Jean", "Thomas", 2, 1),
  ("Sandra", "Lee", 2, 1);