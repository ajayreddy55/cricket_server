--creating table
CREATE TABLE cricket_team (
    player_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    player_name TEXT,
    jersey_number INTEGER,
    role TEXT
);

PRAGMA TABLE_INFO(cricket_team);

INSERT INTO
    cricket_team(player_name, jersey_number, role)
VALUES
    ('Mahindra', 7, 'Wicket keeper'),
    ('Ravindra', 12, 'All rounder'),
    ('Sachin', 10, 'Batsman'),
    ('Asish', 27, 'Fast Bowler'),
    ('Jasprit', 12, 'Fast Bowler'),
    ('David', 40, 'Batsman'),
    ('Harry', 13, 'Batsman'),
    ('Suresh', 42, 'Batsman'),
    ('Hardik', 79, 'All rounder'),
    ('Krunal', 198, 'All rounder'),
    ('Andre', 123, 'All rounder'),
    ('Laxman', 111, 'Batsman'),
    ('Kuldeep', 999, 'Spin Bowler'),
    ('Ashwin', 222, 'All rounder'),
    ('Rohit', 45, 'Batsman'),
    ('Virat', 11, 'Batsman'),
    ('Ben', 75, 'All rounder'),
    ('Mitchel', 98, 'Fast Bowler'),
    ('Tilak', 23, 'Batsman'),
    ('Arsdeep', 124, 'Fast Bowler'),
    ('Rahul', 763, 'Spin Bowler'),
    ('Lokesh Rahul', 25, 'Batsman'),
    ('Rishab', 289, 'Wicket keeper'),
    ('Heinrich', 888, 'Wicket keeper'),
    ('Bhuvaneswar', 199, 'Fast Bowler'),
    ('shami', 762, 'Fast Bowler'),
    ('Rashid', 555, 'Spin Bowler');


SELECT * FROM cricket_team;



