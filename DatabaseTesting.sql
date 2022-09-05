# databse created by Yohan Hmaiti - Member of Group 10 - COP4331_Small_Project
# This data presented here for testing should not be used by anyone else, it is meant for testing purposes only of the database for our 
# contact manager project. 

# some commands to create the tables needed and insert some data

# Passwords and API access points/Keys given to the team are not posted publicly in this file 

# This will be pushed to Github, yet this is property of Group 10 for the COP4331_Leinecker Contact Manager Project. Not To Be used by anyone else.
# The file has SOME! test data for the tables.

/*
    Directory Design:
    Folders: LAMPAPI CSS images JS
    FILES: index.HTML
*/

DROP TABLE IF EXISTS `Contacts`;
DROP TABLE IF EXISTS `Users`;

# I have also added a foreign key to the database to ease contact retrieval.
# The command was not shared in this file, but is handled in the database, as it was added after creating the table.

CREATE TABLE IF NOT EXISTS `COP4331_G10_db`.`Contacts` (
    `ID` INT NOT NULL AUTO_INCREMENT, 
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '', 
    `LastName` VARCHAR(50) NOT NULL DEFAULT '', 
    `Email` VARCHAR(50) NOT NULL DEFAULT '',
    `PhoneNumber` VARCHAR(50) NOT NULL DEFAULT '',
    `Address` VARCHAR(256) NOT NULL DEFAULT '',
    `City` VARCHAR(50) NOT NULL DEFAULT '',
    `State` VARCHAR(50) NOT NULL DEFAULT '',
    `Zip` VARCHAR(50) NOT NULL DEFAULT '',   
    `UserID` INT NOT NULL DEFAULT '0' , 
    `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `COP4331_G10_db`.`Users` (
    `ID` INT NOT NULL AUTO_INCREMENT, 
    `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '', 
    `LastName` VARCHAR(50) NOT NULL DEFAULT '', 
    `Login` VARCHAR(50) NOT NULL DEFAULT '', 
    `Password` VARCHAR(64) NOT NULL DEFAULT '', 
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

# This is SOME OF THE dummy data for testing purposes. I Used Much more in my database.
insert into `COP4331_G10_db`.`Users` (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','COP4331');
insert into `COP4331_G10_db`.`Users` (FirstName,LastName,Login,Password) VALUES ('Rick','Leinecker','RickL','58sdfscfdsfsdfsdfsgdfrzer2');
insert into `COP4331_G10_db`.`Users` (FirstName,LastName,Login,Password) VALUES ('Yohan','Hmaiti','ADEMOPNL','G10_TheBest');
insert into `COP4331_G10_db`.`Users` (FirstName,LastName,Login,Password) VALUES ('Ronald','McTesting','testHEHE','4554sdf575995458t558558fg78999');


# insert test Contacts table


# This data was generated and gathered online. We are not responsible for how this data is used, we only used it to teste if the datbase worked and dislayed 
# content correctly.
# Important: This data is not to be used by anyone else. 
# The order of this data is not important and was changed to test the data entry logs in our database.
INSERT INTO `COP4331_G10_db`.`Contacts` (`FirstName`, `LastName`,`PhoneNumber`, `Email`, `Address`, `Zip`, `City`, `State`,`UserID`) VALUES 
    ("Richard", "Garcia","(192) 364-5722","vitae.diam@google.org","P.O. Box 236, 2314 Curabitur St.","411271","Pernambuco", "CL", "1"), 
    ("Kirsten", "Avery","1-967-206-4362","pretium.et@icloud.net","450-5067 Dapibus Road","6419 KD","Limón",  "CL", "2"),  
    ("Richard", " Jordan","1-168-167-6654","elementum.lorem@icloud.org","584-9365 Arcu. Rd.","W8E 1H2","Umbria",  "FL", "1"),  
    ("Avram", "Hamilton","1-322-352-8811","enim@hotmail.ca","Ap #987-3064 At, St.","52557","Ulster",  "MA", "3"),  
    ("Dale", "Andrews","1-727-881-7838","tortor@yahoo.org","P.O. Box 394, 1880 Risus Road","44753","Warmińsko-mazurskie",  "PA", "4");

INSERT INTO `COP4331_G10_db`.`Contacts` (`FirstName`, `LastName`, `Email`,`PhoneNumber`,`Address`, `City`, `State`, `Zip`,`UserID`) VALUES
    ('Gerald', 'Foster', 'foster_1@email.com', '407-001-9001', '994 Transport Plaza', 'Ocala', 'FL', '34479', 1),
    ('Kevin', 'Hawkins', 'hawkins_1@email.com', '407-001-9002', '03231 Dwight Hill', 'Atlanta', 'GA', '30351', 1),
    ('Diana', 'Davis', 'davis_1@email.com', '407-001-9003', '35 Fairfield Parkway', 'Fargo', 'ND', '58122', 1),
    ('Heather', 'Gonzalez', 'email_1@email.com', '407-001-9004', '1 4th Trail', 'Albuquerque', 'NM', '87105', 1),
    ('Nancy', 'Gomez', 'email_1@email.com', '407-001-9005', '121 Southridge Lane', 'Valdosta', 'GA', '31605', 1),
    ('Terry', 'Hart', 'email_2@email.com', '407-002-9006', '353 Messerschmidt Pass', 'Burbank', 'CA', '91520', 2),
    ('Beverly', 'Wood', 'email_2@email.com', '407-002-9007', '21 Bluestem Trail', 'Washington', 'DC', '20557', 2),
    ('Fred', 'Roberts', 'email_3@email.com', '407-003-9008', '9 Main Crossing', 'Gilbert', 'AZ', '85297', 3),
    ('Maria', 'Cox', 'email_3@email.com', '407-003-9009', '1 Crest Line Pass', 'Albuquerque', 'NM', '87190', 3),
    ('Evelyn', 'Warren', 'email_3@email.com', '407-003-9010', '8589 Macpherson Way', 'Flint', 'MI', '48505', 3),
    ('Shirley', 'Vasquez', 'email_3@email.com', '407-003-9011', '0 Mallard Junction', 'Kansas City', 'MO', '64109', 3),
    ('Maria', 'Fuller', 'email_3@email.com', '407-003-9012', '05402 Badeau Crossing', 'New Orleans', 'LA', '70149', 3),
    ('Deborah', 'Parker', 'email_3@email.com', '407-003-9013', '45475 Hauk Drive', 'Toledo', 'OH', '43699', 3),
    ('Linda', 'Frazier', 'email_3@email.com', '407-003-9014', '6 Rigney Road', 'Lynn', 'MA', '01905', 3),
    ('Randy', 'Ray', 'email_3@email.com', '407-003-9015', '477 Arrowood Parkway', 'Tulsa', 'OK', '74184', 3),
    ('Nancy', 'Gomez', 'email_4@email.com', '407-004-9016', '121 Southridge Lane', 'Valdosta', 'GA', '31605', 4),
    ('Anthony', 'Tucker', 'email_4@email.com', '407-004-9017', '46 Redwing Center', 'Springfield', 'MO', '65810', 4),
    ('Lisa', 'Hanson', 'email_4@email.com', '407-004-9018', '335 Mesta Terrace', 'Wilmington', 'DE', '19805', 4);