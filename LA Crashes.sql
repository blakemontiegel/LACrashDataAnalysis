DROP TABLE Crashes;
DROP TABLE InvolvedParties;
DROP TABLE Victims;

CREATE TABLE Crashes
    (CaseID INTEGER NOT NULL,
    CrashDate DATE,
    CrashTime TIMESTAMP,
    WeatherCondition1 VARCHAR2(10),
    WeatherCondition2 VARCHAR2(10),
    CollisionSeverity INTEGER,
    NumberInjured INTEGER,
    ViolationCategory VARCHAR2(60),
    CollisionType VARCHAR2(20),
    City VARCHAR2(20),
    PRIMARY KEY (CaseID));
    
CREATE TABLE InvolvedParties
    (CaseID INTEGER NOT NULL,
    PartyNumber INTEGER NOT NULL,
    PartyType VARCHAR2(30),
    AtFault CHAR(1),
    VehicleType VARCHAR2(40),
    PRIMARY KEY (PartyNumber),
    FOREIGN KEY (CaseID) REFERENCES Crashes(CaseID));
    
CREATE TABLE Victims
    (CaseID INTEGER NOT NULL,
    PartyNumber INTEGER NOT NULL,
    VictimNumber INTEGER NOT NULL,
    VictimRole VARCHAR2(20),
    Gender CHAR(1),
    Age INTEGER,
    DegreeOfInjury VARCHAR2(30),
    SafetyEquipment1 VARCHAR2(40),
    SafetyEquipment2 VARCHAR2(40),
    PRIMARY KEY (VictimNumber),
    FOREIGN KEY (CaseID) REFERENCES Crashes(CaseID),
    FOREIGN KEY (PartyNumber) REFERENCES InvolvedParties(PartyNumber));

INSERT INTO Crashes VALUES (${row['CASE_ID']}, ${row['CrashDate']}, ${row['CrashTime']},
                            ${row['WeatherCondition1']}, ${row['WeatherCondition2']},
                            ${row['CollisionSeverity']}, ${row['NumberInjured']},
                            ${row['ViolationCategory']}, ${row['CollisionType']},
                            ${row['City']});

INSERT INTO InvolvedParties VALUES (${row['CaseID']}, ${row['PartyNumber']},
                                    ${row['PartyType']}, ${row['AtFault']},
                                    ${row['VehicleType']});

INSERT INTO Victims VALUES (${row['CaseID']}, ${row['PartyNumber']},
                            ${row['VictimNumber']}, ${row['VictimRole']},
                            ${row['Gender']}, ${row['Age']},
                            ${row['DegreeOfInjury']}, ${row['SafetyEquipment1']},
                            ${row['SafetyEquipment2']});